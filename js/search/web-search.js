const WebSearch = {
  inFlightRequests: new Map(),
  quotaExhausted: false,

  async _executeWithRetry(type, profile, forceRefresh, prompt, cacheTTLMinutes, cacheKey, processResultsFn) {
    // 1. Check circuit breaker
    if (this.quotaExhausted) {
      throw new Error("Quota IA épuisé. Veuillez réessayer plus tard.");
    }

    // 2. Deduplication check
    const requestKey = `${type}_${JSON.stringify(profile)}`;
    if (!forceRefresh && this.inFlightRequests.has(requestKey)) {
      return this.inFlightRequests.get(requestKey);
    }

    const promise = (async () => {
      // 3. Cache check inside promise
      if (!forceRefresh) {
        const cached = SearchCache.get(cacheKey, cacheTTLMinutes);
        if (cached) return cached;
      }

      UI.showToast(`Recherche de ${type} sur le Web...`, "info");
      
      let attempt = 0;
      const maxRetries = 2;

      while (attempt <= maxRetries) {
        try {
          const res = await AIManager.generateWithSearch(prompt);
          const results = processResultsFn(res);
          SearchCache.set(cacheKey, results);
          return results;
        } catch (e) {
          if (e.httpStatus === 429) {
            // Determine if it's a hard quota exhaustion or a temporary rate limit
            // For simplicity in MVP without complex parsing, we assume it's temporary unless retries fail
            if (attempt < maxRetries) {
              attempt++;
              const delay = Math.pow(2, attempt) * 1000; // 2s, 4s
              console.warn(`[WebSearch] 429 Rate limit, retry in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            } else {
              this.quotaExhausted = true; // Circuit breaker
              setTimeout(() => { this.quotaExhausted = false; }, 60 * 60 * 1000); // Reset after 1h
              throw new Error("Quota IA épuisé. Veuillez réessayer plus tard.");
            }
          }
          throw e; // Rethrow other errors
        }
      }
    })();

    this.inFlightRequests.set(requestKey, promise);
    
    try {
      const result = await promise;
      return result;
    } finally {
      this.inFlightRequests.delete(requestKey);
    }
  },

  async searchJobs(profile, forceRefresh = false) {
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      return Opportunities.filter(
        (j) =>
          !(profile.primaryDomain || profile.domain) ||
          j.sector.includes(profile.primaryDomain || profile.domain),
      );
    }

    const processFn = (res) => {
      if (!res.result || !res.result.opportunities) return [];
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
      return validJobs;
    };

    return this._executeWithRetry(
      "opportunités",
      profile,
      forceRefresh,
      PromptBuilder.buildJobSearchPrompt(profile),
      10, // 10 minutes TTL
      "jobs",
      processFn
    );
  },

  async searchCourses(profile, forceRefresh = false) {
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      return Courses.filter(
        (c) =>
          !(profile.primaryDomain || profile.domain) ||
          c.sector.includes(profile.primaryDomain || profile.domain),
      );
    }

    const processFn = (res) => {
      if (!res.result || !res.result.courses) return [];
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
      return validCourses;
    };

    return this._executeWithRetry(
      "formations",
      profile,
      forceRefresh,
      PromptBuilder.buildCourseSearchPrompt(profile),
      30, // 30 minutes TTL
      "courses",
      processFn
    );
  },
};
