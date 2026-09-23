const DOCXParser = {
  async extractText(file) {
    if (typeof mammoth === "undefined") {
      throw new Error("Bibliothèque Mammoth.js introuvable.");
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
      return result.value;
    } catch (error) {
      console.error("Erreur DOCX:", error);
      throw new Error("Impossible d'extraire le texte du fichier DOCX.");
    }
  },
};
