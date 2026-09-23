const MatchingEngine = {
  calculateJobScore(job, profile) {
    let totalWeight = 0;
    let earnedScore = 0;
    let explanation = [];

    const userProfile = State.profile || {};
    const userSkills = (profile.skills || []).map((s) => s.name.toLowerCase());
    const jobSkills = [
      ...(job.requiredSkills || []),
      ...(job.preferredSkills || []),
    ].map((s) => s.toLowerCase());

    // 1. Skills match = 50 points
    if (jobSkills.length > 0) {
      totalWeight += 50;
      let matchCount = 0;
      jobSkills.forEach((req) => {
        const isMatched = userSkills.some(
          (u) => u.includes(req) || req.includes(u),
        );
        if (isMatched) matchCount++;
      });
      const p = (matchCount / jobSkills.length) * 50;
      earnedScore += p;
      explanation.push({
        label: "Compétences",
        status:
          matchCount === jobSkills.length
            ? "Compatible"
            : matchCount > 0
              ? "Partiel"
              : "Manquant",
        points: p,
        max: 50,
      });
    }

    // 2. Experience level = 20 points
    if (job.experienceLevel && profile.experienceLevel) {
      totalWeight += 20;
      if (
        job.experienceLevel.toLowerCase() ===
        profile.experienceLevel.toLowerCase()
      ) {
        earnedScore += 20;
        explanation.push({
          label: "Expérience",
          status: "Compatible",
          points: 20,
          max: 20,
        });
      } else {
        earnedScore += 10; // Partial score
        explanation.push({
          label: "Expérience",
          status: "Partiel",
          points: 10,
          max: 20,
        });
      }
    }

    // 3. Target Role / Objective = 10 points
    if (job.title && profile.targetRole) {
      totalWeight += 10;
      const tTitle = job.title.toLowerCase();
      const tRole = profile.targetRole.toLowerCase();
      if (tTitle.includes(tRole) || tRole.includes(tTitle)) {
        earnedScore += 10;
        explanation.push({
          label: "Rôle visé",
          status: "Compatible",
          points: 10,
          max: 10,
        });
      } else {
        earnedScore += 5;
        explanation.push({
          label: "Rôle visé",
          status: "Partiel",
          points: 5,
          max: 10,
        });
      }
    }

    // 4. Location = 10 points
    if (job.location && userProfile.city) {
      totalWeight += 10;
      const jLoc = job.location.toLowerCase();
      const pLoc = userProfile.city.toLowerCase();
      if (
        jLoc.includes("remote") ||
        jLoc.includes("télétravail") ||
        jLoc.includes(pLoc) ||
        pLoc.includes(jLoc)
      ) {
        earnedScore += 10;
        explanation.push({
          label: "Localisation",
          status: "Compatible",
          points: 10,
          max: 10,
        });
      } else {
        explanation.push({
          label: "Localisation",
          status: "Différente",
          points: 0,
          max: 10,
        });
      }
    }

    if (totalWeight === 0) return { score: 0, explanation: [], totalWeight: 0 };

    return {
      score: Math.round((earnedScore / totalWeight) * 100),
      explanation: explanation,
      totalWeight: totalWeight,
    };
  },
};
