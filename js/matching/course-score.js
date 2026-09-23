const CourseScore = {
  calculateRelevance(course, profile) {
    let totalWeight = 0;
    let earnedScore = 0;
    let explanation = [];

    const gaps = (profile.skillsToDevelop || []).map((s) =>
      s.name.toLowerCase(),
    );
    const courseSkills = (course.skills || []).map((s) => s.toLowerCase());

    // Skill gap coverage = 60%
    if (courseSkills.length > 0 && gaps.length > 0) {
      totalWeight += 60;
      let matchCount = 0;
      courseSkills.forEach((cs) => {
        const isMatched = gaps.some((g) => g.includes(cs) || cs.includes(g));
        if (isMatched) matchCount++;
      });
      const coverage = Math.min(matchCount / Math.max(1, gaps.length), 1);
      const p = coverage * 60;
      earnedScore += p;
      explanation.push({
        label: "Compétences ciblées",
        status: matchCount > 0 ? "Couvert" : "Non couvert",
        points: p,
        max: 60,
      });
    }

    // Sector relevance = 25%
    const domain = profile.primaryDomain || profile.domain;
    if (course.sector && domain) {
      totalWeight += 25;
      if (
        course.sector.toLowerCase().includes(domain.toLowerCase()) ||
        domain.toLowerCase().includes(course.sector.toLowerCase())
      ) {
        earnedScore += 25;
        explanation.push({
          label: "Secteur pertinent",
          status: "Oui",
          points: 25,
          max: 25,
        });
      } else {
        explanation.push({
          label: "Secteur pertinent",
          status: "Non",
          points: 0,
          max: 25,
        });
      }
    }

    if (totalWeight === 0)
      return { score: 50, explanation: [], totalWeight: 0 };

    return {
      score: Math.round((earnedScore / totalWeight) * 100),
      explanation: explanation,
      totalWeight: totalWeight,
    };
  },
};
