/**
 * DemoService — Simulates the real analysis pipeline with realistic delays.
 * 
 * Each method returns a Promise that resolves after a short delay
 * to simulate processing. No external API is ever called.
 */
const DemoService = {
  /**
   * Simulates CV upload validation.
   * @returns {Promise<{fileName: string, fileSize: string}>}
   */
  simulateUpload() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fileName: DemoData.cvFileName,
          fileSize: DemoData.cvFileSize,
        });
      }, 800);
    });
  },

  /**
   * Simulates local text extraction from a CV file.
   * @returns {Promise<{text: string, charCount: number}>}
   */
  simulateExtraction() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: DemoData.cvExtractedText,
          charCount: DemoData.cvExtractedText.length,
        });
      }, 1200);
    });
  },

  /**
   * Simulates AI analysis of the extracted CV text.
   * Returns the full analysis object (profile + skills + skillsToDevelop).
   * @returns {Promise<{profile: Object, skills: Array, skillsToDevelop: Array, summary: string}>}
   */
  simulateAnalysis() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          profile: DemoData.profile,
          skills: DemoData.skills,
          skillsToDevelop: DemoData.skillsToDevelop,
          summary: DemoData.summary,
        });
      }, 1800);
    });
  },

  /**
   * Returns simulated course recommendations.
   * @returns {Promise<Array>}
   */
  getCourses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DemoData.courses);
      }, 600);
    });
  },

  /**
   * Returns simulated job opportunities.
   * @returns {Promise<Array>}
   */
  getJobs() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DemoData.jobs);
      }, 600);
    });
  },

  /**
   * Returns pre-computed matching results.
   * @returns {Promise<Array>}
   */
  getMatching() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DemoData.jobs.map((j) => ({
          title: j.title,
          company: j.company,
          matchScore: j.matchScore,
        })));
      }, 400);
    });
  },
};
