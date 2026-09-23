const PDFParser = {
  async extractText(file) {
    if (typeof pdfjsLib === "undefined") {
      throw new Error("Bibliothèque PDF.js introuvable.");
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      const maxPages = Math.min(pdf.numPages, 5); // Limit to 5 pages for performance

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\\n";
      }

      return fullText;
    } catch (error) {
      console.error("Erreur PDF:", error);
      throw new Error("Impossible d'extraire le texte du fichier PDF.");
    }
  },
};
