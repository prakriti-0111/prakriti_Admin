import _, { isArray } from "lodash";
import secureLocalStorage from "react-secure-storage";
import imageCompression from "browser-image-compression";

/**
 * get auth token
 */
const getAuthData = (key, fromUser) => {
  let data = "";
  try {
    let auth = secureLocalStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      if (fromUser) {
        const user = auth.user;
        data = key in user ? user[key] : "";
      } else {
        data = key in auth ? auth[key] : "";
      }
    }
  } catch (err) {}
  return data;
};

/**
 * get query params from object
 */

const objectToQuery = (obj, addQuestion) => {
  return obj
    ? (addQuestion ? "?" : "") +
        Object.keys(obj)
          .map((key) => key + "=" + obj[key])
          .join("&")
    : "";
};

/**
 * Stock list search box: input longer than 6 chars is a certificate no,
 * anything shorter is a gross weight filter. Mutates nothing, returns new params.
 */
const applyStockSearch = (params) => {
  const search = (params.search || "").trim();
  if (!search) return params;
  const key = search.length > 6 ? "certificate_no" : "total_weight";
  return { ...params, [key]: search, search: "" };
};

/**
 * Get dashboard page route by role name
 */
const getUserDashboardRoute = (roleName) => {
  if (roleName == "Super Admin") {
    return "/super-admin";
  } else if (roleName == "Distributor") {
    return "/distributor";
  } else if (roleName == "Admin") {
    return "/admin";
  } else if (roleName == "Sales Executive") {
    return "/sales-executive";
  } else if (!isEmpty(roleName)) {
    return "/employee";
  }

  return "/";
};

/**
 * convert obj to formdata
 */
const convertToFormData = (data, formData, parentKey) => {
  if (data === null || data === undefined) return null;
  formData = formData || new FormData();
  if (
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) =>
      convertToFormData(
        data[key],
        formData,
        !parentKey
          ? key
          : data[key] instanceof File
            ? parentKey
            : `${parentKey}[${key}]`,
      ),
    );
  } else {
    formData.append(parentKey, data);
  }

  return formData;
};

/**
 * Compress images before converting to base64 while keeping quality as high as possible.
 */
const compressImageFile = async (file) => {
  if (!file || !file.type || !file.type.startsWith("image/")) {
    return file;
  }

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.90,
    fileType: file.type === "image/png" ? "image/png" : "image/jpeg",
    alwaysKeepResolution: false,
    exifOrientation: 1,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    if (!compressedBlob || compressedBlob.size === 0) {
      console.warn("Compression resulted in empty file, using original");
      return file;
    }
    if (compressedBlob.size < file.size) {
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type || file.type,
        lastModified: Date.now(),
      });
      console.log("Image compressed successfully", {
        original: file.size,
        compressed: compressedFile.size,
        ratio: ((1 - compressedFile.size / file.size) * 100).toFixed(2) + "%",
      });
      return compressedFile;
    }
    console.log("Image compression not beneficial, using original");
    return file;
  } catch (error) {
    console.error("Image compression failed:", error);
    return file;
  }
};

let ffmpegInstance = null;
let ffmpegUtils = null;

const compressVideoFile = async (file) => {
  if (!file || !file.type || !file.type.startsWith("video/")) {
    return file;
  }

  if (typeof window === "undefined" || typeof FileReader === "undefined") {
    return file;
  }

  const ts = Date.now();
  const inputExt = file.name.split(".").pop() || "mp4";
  const inputName = `input-${ts}.${inputExt}`;
  const outputName = `output-${ts}.mp4`;

  try {
    if (!ffmpegUtils) {
      ffmpegUtils = await Promise.all([
        import("@ffmpeg/ffmpeg"),
        import("@ffmpeg/util"),
      ]);
    }
    const [{ FFmpeg }, { fetchFile, toBlobURL }] = ffmpegUtils;

    if (!ffmpegInstance) {
      const ffmpeg = new FFmpeg();
      const baseURL =
        "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
      });
      ffmpegInstance = ffmpeg;
    }

    const isLargeVideo = file.size > 15 * 1024 * 1024;
    const resolution = isLargeVideo ? "720" : "1080";
    const fps = isLargeVideo ? "24" : "30";
    const crf = isLargeVideo ? "20" : "18";

    await ffmpegInstance.writeFile(inputName, await fetchFile(file));
    await ffmpegInstance.exec([
      "-i", inputName,
      "-vf", `scale=-2:${resolution},fps=${fps}`,
      "-c:v", "libx264",
      "-preset", "fast",
      "-crf", crf,
      "-pix_fmt", "yuv420p",
      "-c:a", "aac",
      "-b:a", "96k",
      "-movflags", "+faststart",
      outputName,
    ]);

    const data = await ffmpegInstance.readFile(outputName);
    if (!data || data.length === 0) {
      console.warn("Video compression resulted in empty file, using original");
      try {
        await ffmpegInstance.deleteFile(inputName);
        await ffmpegInstance.deleteFile(outputName);
      } catch (_) {}
      return file;
    }

    const blob = new Blob([data], { type: "video/mp4" });
    if (blob.size === 0) {
      console.warn("Blob size is 0, using original");
      try {
        await ffmpegInstance.deleteFile(inputName);
        await ffmpegInstance.deleteFile(outputName);
      } catch (_) {}
      return file;
    }

    const compressedFile = new File(
      [blob],
      file.name.replace(/\.[^.]+$/, ".mp4"),
      { type: "video/mp4", lastModified: Date.now() },
    );

    try {
      await ffmpegInstance.deleteFile(inputName);
      await ffmpegInstance.deleteFile(outputName);
    } catch (_) {}

    console.log("Video compressed successfully", {
      original: file.size,
      compressed: compressedFile.size,
      ratio: ((1 - compressedFile.size / file.size) * 100).toFixed(2) + "%",
    });

    return compressedFile.size < file.size ? compressedFile : file;
  } catch (error) {
    console.error("Video compression failed:", error);
    try {
      await ffmpegInstance?.deleteFile(inputName);
      await ffmpegInstance?.deleteFile(outputName);
    } catch (_) {}
    return file;
  }
};

const toBase64 = async (file) => {
  if (!file) {
    return "";
  }

  if (!(file instanceof File) && !(file instanceof Blob)) {
    console.error("Invalid file object:", file);
    return "";
  }

  let uploadFile = file;

  if (file.type && file.type.startsWith("image/")) {
    uploadFile = await compressImageFile(file);
  } else if (file.type && file.type.startsWith("video/")) {
    uploadFile = await compressVideoFile(file);
  }

  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(error);
      };
      reader.onabort = () => {
        console.error("FileReader aborted");
        reject(new Error("FileReader was aborted"));
      };
      reader.readAsDataURL(uploadFile);
    } catch (error) {
      console.error("Error in toBase64:", error);
      reject(error);
    }
  });
};

/**
 * get only values from array by specefic column
 */
const getValuesFromKey = (arr, col) => {
  let a = [];
  for (let i = 0; i < arr.length; i++) {
    a.push(arr[i][col]);
  }
  return a;
};

const isEmpty = (value) => {
  return (
    // null or undefined
    value == null ||
    // 0 value
    //(value == 0) ||

    // has length and it's zero
    (value.hasOwnProperty("length") && value.length === 0) ||
    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
};

const getNewlineText = (text) => {
  return text
    .split("\n")
    .map((str, i) => (
      <p
        className={"mb-0" + (i == 0 ? " mt-0" : " mt-3")}
        key={i}
        dangerouslySetInnerHTML={{ __html: str }}
      ></p>
    ));
};

const priceFormat = (p, removeBlankZero) => {
  if (typeof p !== "undefined" && p !== null && p != "") {
    p = parseFloat(p).toFixed(2);
    p = parseFloat(p);
  } else {
    p = 0.0;
  }
  if (removeBlankZero) {
    p = p.toFixed(2).replace(/[.,]00$/, "");
    p = parseFloat(p);
  }
  return isNaN(p) ? 0 : p;
};
const weightFormat = (p) => {
  if (typeof p !== "undefined" && p !== null) {
    p = parseFloat(p).toFixed(3);
    p = parseFloat(p);
  } else {
    p = 0.0;
  }
  p = p.toFixed(3).replace(/[.,]000$/, "");
  p = parseFloat(p);
  return isNaN(p) ? 0 : p;
};

const calculateAdminProductPrice = (priceInfo, materials) => {
  let sub_total = 0,
    making_charge = 0;
  if (isEmpty(priceInfo)) {
    return null;
  }

  let materialPice = [],
    total_quantity = 0,
    total_weight = 0;
  for (let i = 0; i < materials.length; i++) {
    let m = _.filter(priceInfo.material_prices, {
      material_id: materials[i].material_id,
    });
    if (m.length) {
      let p = _.filter(m[0].purities, { purity_id: materials[i].purity_id });
      if (p.length) {
        let total_gram = convertUnitToGram(
          materials[i].unit_name,
          materials[i].weight,
        );
        materialPice.push({
          rate: p[0].rate,
          amount: priceFormat(p[0].discounted_price * total_gram, true),
        });
        sub_total += p[0].discounted_price * total_gram;
        total_weight += total_gram;
        total_quantity += materials[i].quantity;
      }
    }
  }
  if (priceInfo.making_charge_type == "per_piece") {
    making_charge = priceFormat(priceInfo.making_charge, true);
  } else if (priceInfo.making_charge_type == "per_gram") {
    making_charge = priceFormat(
      total_weight * priceFormat(priceInfo.making_charge),
      true,
    );
  }
  let result = {
    sub_total: priceFormat(sub_total, true),
    making_charge: priceFormat(making_charge, true),
    total_amount: priceFormat(sub_total + making_charge, true),
    materials_price: materialPice,
    total_weight: weightFormat(total_weight, true),
  };
  return result;
};

const convertToString = (x) => {
  return x.toString();
};

const calculateProductPrice = (weight, price, unit) => {
  if (isEmpty(weight) || isEmpty(price) || isEmpty(unit)) {
    return 0;
  }
  unit = unit.toLowerCase();
  let per_price = price;
  if (unit == "carat" || unit == "carats" || unit == "ct") {
    weight = parseFloat(weight) * 5; //convert to gram
    //per_price = parseFloat(price) / 5;
  } else if (unit == "ratti" || unit == "rati") {
    weight = parseFloat(weight) / 0.182; //convert to gram
    //per_price = parseFloat(price) * 0.182;
  } else if (unit == "cent") {
    weight = parseFloat(weight) * 500; //convert to gram
    //per_price = parseFloat(price) / 500;
  } else if (unit == "gram") {
    //per_price = parseFloat(price);
  }
  return priceFormat(parseFloat(weight) * parseFloat(per_price));
};

const convertPerGramPriceToPerUnit = (price, unit) => {
  if (isEmpty(price) || isEmpty(unit)) {
    return 0;
  }
  unit = unit.toLowerCase();
  if (unit == "carat" || unit == "carats" || unit == "ct") {
    price = parseFloat(price) / 5;
  } else if (unit == "ratti" || unit == "rati") {
    price = parseFloat(price) * 0.182;
  } else if (unit == "cent") {
    price = parseFloat(price) / 500;
  } else if (unit == "gram") {
    price = parseFloat(price);
  }
  return priceFormat(price);
};

const convertUnitToGram = (unit, weight) => {
  if (isEmpty(weight)) {
    return 0;
  }
  unit = unit.toLowerCase();
  if (unit == "carat" || unit == "carats" || unit == "ct") {
    return parseFloat(weight) / 5;
  } else if (unit == "ratti" || unit == "rati") {
    return parseFloat(weight) * 0.182;
  } else if (unit == "cent") {
    return parseFloat(weight) / 500;
  } else {
    return parseFloat(weight);
  }
};

const convertGramToUnit = (unit, weight) => {
  if (isEmpty(weight)) {
    return 0;
  }
  unit = unit.toLowerCase();
  if (unit == "carat" || unit == "carats" || unit == "ct") {
    return parseFloat(weight) * 5;
  } else if (unit == "ratti" || unit == "rati") {
    return parseFloat(weight) / 0.182;
  } else if (unit == "cent") {
    return parseFloat(weight) * 500;
  } else {
    return parseFloat(weight);
  }
};

const calculateGST = (taxinfo, amount, gst_no) => {
  if (isEmpty(taxinfo) || isEmpty(amount)) {
    return null;
  }

  let gst_type = "igst";
  if (!isEmpty(gst_no)) {
    let startingWith = gst_no.substring(0, 2);
    if (startingWith == "19") {
      gst_type = "cgst_sgst";
    }
  }

  if (gst_type == "igst") {
    let igst = !isEmpty(taxinfo.igst)
      ? priceFormat((amount * parseFloat(taxinfo.igst)) / 100, true)
      : 0;
    return {
      igst: igst,
      cgst: 0,
      sgst: 0,
      total: igst,
      type: gst_type,
    };
  } else {
    let cgst = !isEmpty(taxinfo.cgst)
      ? priceFormat((amount * parseFloat(taxinfo.cgst)) / 100, true)
      : 0;
    let sgst = !isEmpty(taxinfo.sgst)
      ? priceFormat((amount * parseFloat(taxinfo.sgst)) / 100, true)
      : 0;
    return {
      igst: 0,
      cgst: cgst,
      sgst: sgst,
      total: priceFormat(cgst + sgst, true),
      type: gst_type,
    };
  }
};

const shortDescription = (str) => {
  if (!str) return str;
  return str.length > 60 ? str.substr(0, 60) + "..." : str;
};

const getRoleName = (auth) => {
  return "user" in auth && auth.user && "role_name" in auth.user
    ? auth.user.role_name
    : "";
};

const formatIndianNumber = (num) => {
  num = parseFloat(num);
  if (isNaN(num)) return "0.00";
  const isNegative = num < 0;
  num = Math.abs(num);
  const parts = num.toFixed(2).split(".");
  let intPart = parts[0];
  const decPart = parts[1];
  if (intPart.length > 3) {
    const last3 = intPart.slice(-3);
    const rest = intPart.slice(0, -3);
    intPart = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  }
  return (isNegative ? "-" : "") + intPart + "." + decPart;
};

const displayAmount = (amount, currencyText, showCurrency) => {
  amount = amount === null ? 0 : amount;
  currencyText = currencyText === true ? "Rs. " : "₹ ";
  currencyText = showCurrency === false ? "" : currencyText;
  return currencyText + formatIndianNumber(priceFormat(amount, true));
};

const isSuperAdmin = () => {
  let role = getAuthData("role_name", true);
  return (
    role == "Super Admin" ||
    (!isDistributor() && !isAdmin() && !isSalesExecutive())
  );
};

const isMainSuperAdmin = () => {
  let role = getAuthData("role_name", true);
  return role == "Super Admin";
};
const isManager = () => {
  let role = getAuthData("role_name", true);
  return role == "Manager";
};

const isEmployee = () => {
  return isSuperAdmin() && !isMainSuperAdmin();
};

const isDistributor = () => {
  let role = getAuthData("role_name", true);
  return role == "Distributor";
};

const isAdmin = () => {
  let role = getAuthData("role_name", true);
  return role == "Admin";
};

const isSalesExecutive = () => {
  let role = getAuthData("role_name", true);
  return role == "Sales Executive";
};

const getApprovalColor = (status) => {
  if (status == 1 || status == 4) {
    return "success";
  } else if (status == 2) {
    return "error";
  } else {
    return "warning";
  }
};

const getStatusColor = (status) => {
  if (status == "Pending") {
    return "warning";
  } else if (status == "Cancelled" || status == "superadmin_declined") {
    return "error";
  } else {
    return "success";
  }
};

const checkIsTokenExpired = (auth) => {
  try {
    let user = auth && "user" in auth && auth.user ? auth.user : null;
    if (user && user.role_name == "Sales Executive") {
      if (!("expiresOn" in auth)) {
        return true;
      } else {
        if (
          "loginOn" in auth &&
          auth.loginOn <=
            moment(
              moment().format("YYYY-MM-DD 10:59:59"),
              "YYYY-MM-DD HH:mm:ss",
            )
              .toDate()
              .getTime() &&
          Date.now() > auth.expiresOn
        ) {
          return true;
        }
      }
    }
  } catch (error) {}
  return false;
};

const hasPermission = (permissions, name, key, checkSuperAdmin) => {
  if (checkSuperAdmin !== false) {
    if (
      (isMainSuperAdmin() || !isSuperAdmin()) &&
      (!isDistributor() || !["expense"].includes(name))
    ) {
      return true;
    } else if (isManager() && ["workers", "stock_history"].includes(name)) {
      return true;
    }
  }
  if (isEmpty(permissions) || !isArray(permissions)) {
    if (
      checkSuperAdmin !== false &&
      (!isDistributor() || !["expense"].includes(name))
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (isArray(name)) {
      let _all = true;
      for (let i of name) {
        let p = _.filter(permissions, { name: i });
        if (!p.length) {
          _all = false;
          break;
        } else {
          if (isArray(key)) {
            for (let x of key) {
              if (!p[0][x]) {
                _all = false;
              }
            }
          } else {
            if (!p[0][key]) {
              _all = false;
            }
          }
        }
      }
      return _all;
    } else {
      let p = _.filter(permissions, { name: name });
      if (!p.length) {
        return false;
      } else {
        let _all = true;
        if (isArray(key)) {
          for (let x of key) {
            if (!p[0][x]) {
              _all = false;
            }
          }
        } else {
          if (!p[0][key]) {
            _all = false;
          }
        }
        return _all;
      }
    }
  }
};

const ucWords = (text) => {
  return !text
    ? ""
    : text.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
      );
};

const validateNumber = (event) => {
  const input = event.target;
  const value = input.value;

  // Regular expression to allow numbers and a single decimal point
  // ^\d*        - Zero or more digits at the beginning
  // (\.\d{0,2})? - Optionally, a decimal point followed by zero, one, or two digits
  // $           - End of the string
  const regex = /^\d*(\.\d{0,2})?$/;

  if (!regex.test(value)) {
    // If the input is invalid, remove the last entered character
    input.value = value.slice(0, -1);
  }
};

const validateInteger = (event) => {
  const input = event.target;
  const value = input.value;

  // Regular expression to allow numbers and no decimal point
  const regex = /^\d*$/;

  if (!regex.test(value)) {
    // If the input is invalid, remove the last entered character
    input.value = value.slice(0, -1);
  }
};

const extractCertificateJSON = (rawText) => {
  const data = {
    report_type: null,
    report_number: null,
    issue_date: null,
    jewelry: {
      type: null,
      metal: null,
      color: null,
      finish: null,
      weight_grams: null
    },
    diamonds: {
      quantity: null,
      shape: null,
      cut: null,
      color_grade: null,
      clarity_grade: null,
      total_carat_weight: null,
      origin: null
    },
    comments: [],
    engraving: null,
    verification: {
      qr_code_present: null,
      website: null,
      certificate_url: null
    },
    disclaimer: null,
    raw_text: rawText
  };

  // Split without normalization to preserve line structure
  const lines = rawText.split('\n');

  // Track if we've found the report type
  let foundReportType = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    // Extract report type (look for E-COPY first)
    if (!foundReportType && (lowerLine.includes('e-copy') || lowerLine.includes('jewelry report'))) {
      data.report_type = 'E-COPY JEWELRY REPORT';
      foundReportType = true;
    }

    // Extract report number
    if (lowerLine.includes('report no')) {
      // Check if value is on same line or next line
      let reportNumber = null;
      if (line.includes(':')) {
        const match = line.match(/:\s*([0-9A-Z]+)/);
        if (match) reportNumber = match[1].trim();
      } else if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        const match = nextLine.match(/:\s*([0-9A-Z]+)/);
        if (match) reportNumber = match[1].trim();
      }
      if (reportNumber) data.report_number = reportNumber;
    }

    // Extract jewelry description
    if (lowerLine.includes('description')) {
      // Get description from current line or next line
      let descText = line.includes(':') ? line.substring(line.indexOf(':') + 1) : (lines[i + 1] || '');

      // Continue reading until we hit next section
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().match(/^[A-Z][a-z]+\s+and/) && !lines[j].trim().match(/^Tot\.|^Color|^Clarity|^Comments/)) {
        if (lines[j].trim() && !line.includes('description')) {
          descText += ' ' + lines[j].trim();
        }
        j++;
      }

      descText = descText.trim();

      // Extract jewelry type (e.g., "One Yellow Gold Ring")
      const typeMatch = descText.match(/One\s+([A-Za-z\s]+?)(?:,|weighing)/i);
      if (typeMatch) {
        data.jewelry.type = typeMatch[1].trim();
      }

      // Extract metal type
      if (descText.toLowerCase().includes('yellow gold')) {
        data.jewelry.metal = 'Yellow Gold';
      } else if (descText.toLowerCase().includes('white gold')) {
        data.jewelry.metal = 'White Gold';
      } else if (descText.toLowerCase().includes('platinum')) {
        data.jewelry.metal = 'Platinum';
      } else if (descText.toLowerCase().includes('rose gold')) {
        data.jewelry.metal = 'Rose Gold';
      } else if (descText.toLowerCase().includes('silver')) {
        data.jewelry.metal = 'Silver';
      }

      // Extract finish (e.g., "Partly Rhodium Plated")
      const finishMatch = descText.match(/(Partly\s+[A-Za-z\s]+?)(,|weighing|$)/i);
      if (finishMatch) {
        data.jewelry.finish = finishMatch[1].trim();
      }

      // Extract weight in grams
      const weightMatch = descText.match(/weighing\s+in\s+total\s+([\d.]+)\s*g/i);
      if (weightMatch) {
        data.jewelry.weight_grams = parseFloat(weightMatch[1]);
      }

      // Extract diamond quantity from description
      const diamondQtyMatch = descText.match(/\((\d+)\)\s+Natural\s+Diamonds/i);
      if (diamondQtyMatch) {
        data.diamonds.quantity = parseInt(diamondQtyMatch[1]);
      }
    }

    // Extract shape and cut
    if (lowerLine.includes('shape and cut')) {
      const cutText = line.includes(':') ? line.substring(line.indexOf(':') + 1) : (lines[i + 1] || '');
      const match = cutText.match(/\((\d+)\)\s+([A-Za-z\s]+)/);
      if (match) {
        data.diamonds.quantity = parseInt(match[1]);
        const shapeAndCut = match[2].trim();
        const words = shapeAndCut.split(/\s+/);
        data.diamonds.shape = words[0];
        data.diamonds.cut = shapeAndCut;
      }
    }

    // Extract total carat weight, color, and clarity
    if (lowerLine.includes('tot. est. weight') || lowerLine.includes('total est. weight')) {
      // Look forward for the values on subsequent lines starting with ":"
      let j = i + 1;
      let valueIdx = 0; // 0 = weight, 1 = color, 2 = clarity

      while (j < lines.length && valueIdx < 3) {
        const currentLine = lines[j].trim();

        if (currentLine === '') {
          j++;
          continue;
        }

        if (currentLine.startsWith(':')) {
          const value = currentLine.substring(1).trim();

          if (valueIdx === 0) { // Weight
            const match = value.match(/([\d.]+)\s*(carat|ct)/i);
            if (match) {
              data.diamonds.total_carat_weight = parseFloat(match[1]);
            }
          } else if (valueIdx === 1) { // Color
            if (!value.includes('Carat')) {
              data.diamonds.color_grade = value;
            }
          } else if (valueIdx === 2) { // Clarity
            if (!value.includes('Carat')) {
              data.diamonds.clarity_grade = value;
            }
          }

          valueIdx++;
        }
        j++;
      }
    }

    // Extract comments
    if (lowerLine.includes('comments')) {
      let j = i + 1;
      let inComments = false;

      while (j < lines.length) {
        const currentLine = lines[j].trim();

        if (!inComments && currentLine.startsWith(':')) {
          // First comment line
          const commentValue = currentLine.substring(1).trim();
          if (commentValue) {
            data.comments.push(commentValue);
            inComments = true;
          }
        } else if (inComments && currentLine && !currentLine.match(/^Important|^Note|^[A-Z][a-z]+\s*:/) && !currentLine.startsWith(':')) {
          // Continuation of comments
          data.comments.push(currentLine);
        } else if (inComments && (currentLine.match(/^Important|^Note/i) || !currentLine)) {
          // End of comments section
          break;
        }
        j++;
      }
    }

    // Extract engraving info
    if (lowerLine.includes('engraved')) {
      data.engraving = true;
    }
  }

  return data;
};

const fetchCertificateDetails = async (certificateNo) => {
  if (!certificateNo) {
    return "Invalid certificate number";
  }

  // Remove last 2 digits from certificate number
  const certificateForPdf = certificateNo.slice(0, -2);
  const pdfUrl = `https://pdf.igi.org/${certificateForPdf}.pdf`;

  try {
    const response = await fetch(pdfUrl);

    if (response.status === 404) {
      return `Certificate #${certificateNo} not found in IGI database. Please verify the certificate number is correct.`;
    }

    if (!response.ok) {
      return `Error: Server returned status ${response.status}. Please try again later.`;
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return "Empty certificate data received from server";
    }

    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    const certificateData = extractCertificateJSON(fullText);

    return {
      success: true,
      data: arrayBuffer,
      certificateNo,
      certificateData,
      pageCount: pdf.numPages
    };
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return `Failed to fetch certificate: ${error.message}`;
  }
};

export {
  getAuthData,
  objectToQuery,
  applyStockSearch,
  getUserDashboardRoute,
  convertToFormData,
  toBase64,
  getValuesFromKey,
  isEmpty,
  getNewlineText,
  calculateAdminProductPrice,
  priceFormat,
  convertToString,
  calculateProductPrice,
  convertUnitToGram,
  convertGramToUnit,
  calculateGST,
  shortDescription,
  getRoleName,
  displayAmount,
  weightFormat,
  convertPerGramPriceToPerUnit,
  isSuperAdmin,
  isDistributor,
  isAdmin,
  isSalesExecutive,
  checkIsTokenExpired,
  getApprovalColor,
  getStatusColor,
  hasPermission,
  isMainSuperAdmin,
  isEmployee,
  isManager,
  ucWords,
  validateNumber,
  validateInteger,
  fetchCertificateDetails,
  formatIndianNumber,
};
