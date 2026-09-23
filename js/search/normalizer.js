const ResultNormalizer = {
  normalizeJob(job) {
    return {
      id: job.id || this.generateId(),
      title: job.title || null,
      company: job.company || null,
      sector: job.sector || null,
      location: job.location || job.city || null,
      type: job.type || null,
      experienceLevel: job.experienceLevel || null,
      requiredSkills: Array.isArray(job.requiredSkills)
        ? job.requiredSkills
        : [],
      preferredSkills: Array.isArray(job.preferredSkills)
        ? job.preferredSkills
        : [],
      description: job.description || null,
      url: job.url || null,
      sourceDomain: job.sourceDomain || this.extractDomain(job.url),
      publishedDate: job.publishedDate || null,
    };
  },

  normalizeCourse(course) {
    return {
      id: course.id || this.generateId(),
      title: course.title || null,
      provider: course.provider || course.organization || null,
      sector: course.sector || null,
      skills: Array.isArray(course.skills) ? course.skills : [],
      level: course.level || null,
      duration: course.duration || null,
      format: course.format || null,
      price: course.price || null,
      url: course.url || null,
      sourceDomain: course.sourceDomain || this.extractDomain(course.url),
    };
  },

  extractDomain(url) {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch (e) {
      return null;
    }
  },

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },
};
