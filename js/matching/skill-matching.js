const SkillMatching = {
  calculateJobScore(jobSkills, userSkills) {
    if (!jobSkills || jobSkills.length === 0) return 100;

    const userSkillNames = (userSkills || []).map((s) => s.name.toLowerCase());
    let matches = 0;

    jobSkills.forEach((reqSkill) => {
      // Very simple partial matching logic
      const req = reqSkill.toLowerCase();
      const found = userSkillNames.some(
        (u) => u.includes(req) || req.includes(u),
      );
      if (found) matches++;
    });

    return Math.round((matches / jobSkills.length) * 100);
  },

  getMatchingDetails(jobSkills, userSkills) {
    const userSkillNames = (userSkills || []).map((s) => s.name.toLowerCase());
    const matching = [];
    const missing = [];

    (jobSkills || []).forEach((reqSkill) => {
      const req = reqSkill.toLowerCase();
      const found = userSkillNames.some(
        (u) => u.includes(req) || req.includes(u),
      );
      if (found) matching.push(reqSkill);
      else missing.push(reqSkill);
    });

    return { matching, missing };
  },
};
