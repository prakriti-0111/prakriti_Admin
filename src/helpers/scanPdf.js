import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Set the workerSrc property for PDF.js using the local worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts text content from a PDF file given its URL
 * @param {string} verifyUrl - The verification URL (e.g., http://www.igi.org/verify.php?r=56J5627423)
 * @returns {Promise<{text: string} | {error: string}>} - Returns an object containing either the extracted text or an error message
 */
async function extractPdfData(verifyUrl) {
  try {
    // Extract the r parameter value from the URL
    const urlParams = new URLSearchParams(new URL(verifyUrl).search);
    const rValue = urlParams.get("r");

    if (!rValue) {
      throw new Error("No r parameter found in URL");
    }

    // Remove last 2 characters from r value
    const adjustedRValue = rValue;

    // Construct the PDF URL
    const pdfUrl = `https://pdf.igi.org/${adjustedRValue}.pdf`;
    console.log("Fetching PDF from:", pdfUrl);

    // Fetch the PDF as an ArrayBuffer
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();

    // Load the PDF
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log("PDF loaded, number of pages:", pdf.numPages);

    let textContent = "";

    // If PDF has 2 pages, only process the second page
    if (pdf.numPages === 2) {
      console.log("Processing second page of 2-page PDF");
      const page = await pdf.getPage(2); // Get only the second page
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      textContent = strings.join(" ") + "\n";
    } else {
      // If PDF has only 1 page, process it normally
      console.log("Processing single page PDF");
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        textContent += strings.join(" ") + "\n";
      }
    }

    console.log("Extracted text content:", textContent);
    const parsedData = parseIgiReport(textContent);
    console.log("Parsed data:", parsedData);

    return { text: parsedData };
  } catch (error) {
    console.error("Error in extractPdfData:", error);
    return { error: error.message };
  }
}

function parseIgiReport(text) {
  return {
    // Try to extract summary number if present (case-insensitive, with or without period)
    summary_number:
      text.match(/Summary No\.?\s*:\s*([A-Za-z0-9]+)/i)?.[1] || "",
    // Extract report number (case-insensitive, with or without period)
    report_number: text.match(/Report No\.?\s*:\s*([A-Za-z0-9]+)/i)?.[1] || "",
    description:
      text.match(/Description\s*:\s*(.*?)\s*Shape and Cut/i)?.[1]?.trim() || "",
    shape_cut:
      text
        .match(/Shape and Cut\s*:\s*(.*?)\s*Tot\. Est\. Weight/i)?.[1]
        ?.trim() || "",
    total_estimated_weight_carat:
      parseFloat(text.match(/Tot\. Est\. Weight\s*:\s*([\d.]+)/i)?.[1]) || null,
    color: text.match(/Color\s*:\s*([A-Za-z0-9 \-]+)/i)?.[1]?.trim() || "",
    clarity: text.match(/Clarity\s*:\s*([A-Za-z0-9]+)/i)?.[1]?.trim() || "",
    comments:
      text.match(/Comments\s*:\s*(.*?)(?:Important notice|$)/is)?.[1]?.trim() ||
      "",
  };
}

export default extractPdfData;
