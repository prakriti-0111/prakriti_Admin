import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Set the workerSrc property for PDF.js using the local worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts text content from a PDF file given its URL
 * @param {string} verifyUrl - The verification URL (e.g., http://www.igi.org/verify.php?r=56J5627423)
 * @returns {Promise<{text: string} | {error: string}>} - Returns an object containing either the extracted text or an error message
 */
function parseIgiReport(text) {
  return {
    summary_number: text.match(/SUMMARY NO\s*:\s*(\w+)/)?.[1] || "",
    description:
      text.match(/DESCRIPTION\s*:\s*(.*?)\s+SHAPE\/CUT/)?.[1]?.trim() || "",
    shape_cut:
      text.match(/SHAPE\/CUT\s*:\s*(.*?)\s+TOTAL EST\. WT\./)?.[1]?.trim() ||
      "",
    total_estimated_weight_carat:
      parseFloat(text.match(/TOTAL EST\. WT\.\s*:\s*([\d.]+)/)?.[1]) || null,
    color_grade: text.match(/COLOR\s*:\s*(.*?)\s+CLARITY/)?.[1]?.trim() || "",
    clarity_grade:
      text.match(/CLARITY\s*:\s*(.*?)\s+COMMENTS/)?.[1]?.trim() || "",
    comments:
      text
        .match(/COMMENTS\s*:\s*(.*?)(Style|Important notice)/s)?.[1]
        ?.trim() || "",
    style_number: text.match(/Style\s*#\s*(\S+)/)?.[1] || "",
    disclaimer: text.match(/Important notice:\s*(.*)/s)?.[1]?.trim() || "",
  };
}

async function extractPdfData(verifyUrl) {
  try {
    // Extract the r parameter value from the URL
    const urlParams = new URLSearchParams(new URL(verifyUrl).search);
    const rValue = urlParams.get("r");

    if (!rValue) {
      throw new Error("No r parameter found in URL");
    }

    // Construct the PDF URL
    const pdfUrl = `https://pdf.igi.org/${rValue}.pdf`;

    // Fetch the PDF as an ArrayBuffer
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();

    // Load the PDF
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let textContent = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      textContent += strings.join(" ") + "\n";
    }

    return { text: parseIgiReport(textContent) };
  } catch (error) {
    return { error: error.message };
  }
}

export default extractPdfData;
