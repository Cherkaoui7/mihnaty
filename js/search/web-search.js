const WebSearch = {
  async searchJobs(profile, forceRefresh = false) {
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      return Opportunities.filter(
        (j) =>
          !(profile.primaryDomain || profile.domain) ||
          j.sector.includes(profile.primaryDomain || profile.domain),
      );
    }

    if (!forceRefresh) {
      const cached = SearchCache.get("jobs");
      if (cached) return cached;
    }

    UI.showToast("Recherche d'opportunités sur le Web...", "info");
    const prompt = PromptBuilder.buildJobSearchPrompt(profile);

    try {
      const res = await AIManager.generateWithSearch(prompt);

      if (res.result && res.result.opportunities) {
        const uniqueUrls = new Set();
        const validJobs = res.result.opportunities
          .map((j) => ResultNormalizer.normalizeJob(j))
          .filter((j) => Validator.validateJob(j))
          .filter((j) => {
            if (uniqueUrls.has(j.url)) return false;
            uniqueUrls.add(j.url);
            return true;
          });

        validJobs.forEach((job) => {
          const matchResult = MatchingEngine.calculateJobScore(job, profile);
          job.matchScore = matchResult.score || 0;
          job.matchDetails = matchResult.explanation || [];
          job.sourceType = "web";
          job.retrievedAt = new Date().toLocaleDateString();
        });
        validJobs.sort((a, b) => b.matchScore - a.matchScore);

        SearchCache.set("jobs", validJobs);
        return validJobs;
      }
    } catch (e) {
      console.error("Erreur recherche Web (Jobs):", e);
    }
    return [];
  },

  async searchCourses(profile, forceRefresh = false) {
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      return Courses.filter(
        (c) =>
          !(profile.primaryDomain || profile.domain) ||
          c.sector.includes(profile.primaryDomain || profile.domain),
      );
    }

    if (!forceRefresh) {
      const cached = SearchCache.get("courses");
      if (cached) return cached;
    }

    UI.showToast("Recherche de formations sur le Web...", "info");
    const prompt = PromptBuilder.buildCourseSearchPrompt(profile);

    try {
      const res = await AIManager.generateWithSearch(prompt);

      if (res.result && res.result.courses) {
        const uniqueUrls = new Set();
        const validCourses = res.result.courses
          .map((c) => ResultNormalizer.normalizeCourse(c))
          .filter((c) => Validator.validateCourse(c))
          .filter((c) => {
            if (uniqueUrls.has(c.url)) return false;
            uniqueUrls.add(c.url);
            return true;
          });

        validCourses.forEach((course) => {
          const matchResult = CourseScore.calculateRelevance(course, profile);
          course.relevanceScore = matchResult.score || 0;
          course.matchDetails = matchResult.explanation || [];
          course.sourceType = "web";
          course.retrievedAt = new Date().toLocaleDateString();
        });
        validCourses.sort((a, b) => b.relevanceScore - a.relevanceScore);

        SearchCache.set("courses", validCourses);
        return validCourses;
      }
    } catch (e) {
      console.error("Erreur recherche Web (Courses):", e);
    }
    return [];
  },
};
