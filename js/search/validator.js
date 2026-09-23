const Validator = {
  validateJob(job) {
    if (!job.title) return false;
    if (!job.url) return false;

    // Ensure URL is somewhat valid and not a dummy
    if (!this.isValidUrl(job.url)) return false;
    if (
      this.isDummyData(job.url) ||
      this.isDummyData(job.title) ||
      this.isDummyData(job.company)
    ) {
      return false;
    }

    return true;
  },

  validateCourse(course) {
    if (!course.title) return false;
    if (!course.url) return false;

    if (!this.isValidUrl(course.url)) return false;
    if (
      this.isDummyData(course.url) ||
      this.isDummyData(course.title) ||
      this.isDummyData(course.provider)
    ) {
      return false;
    }

    return true;
  },

  isValidUrl(url) {
    if (!url) return false;
    try {
      new URL(url);
      return url.startsWith("http");
    } catch (e) {
      return false;
    }
  },

  isDummyData(str) {
    if (!str) return false;
    const low = str.toLowerCase();
    const dummyKeywords = [
      "example.com",
      "dummy",
      "test",
      "your-company",
      "xyz",
      "placeholder",
    ];
    return dummyKeywords.some((keyword) => low.includes(keyword));
  },
};
