window.ResponseNormalizer = {
  normalizeCVAnalysis(data) {
    if (!data) throw new Error("Les données sont vides.");
    
    const profile = data.profile || data || {};
    
    // Normalize profile to canonical structure
    const normalizedProfile = {
      firstName: profile.firstName ?? null,
      lastName: profile.lastName ?? null,
      fullName: profile.fullName ?? ([profile.firstName, profile.lastName].filter(Boolean).join(" ") || null),
      city: profile.city ?? null,
      country: profile.country ?? null,
      educationLevel: profile.educationLevel ?? null,
      primaryDomain: profile.primaryDomain ?? profile.domain ?? null,
      secondaryDomains: Array.isArray(profile.secondaryDomains) ? profile.secondaryDomains : [],
      targetRole: profile.targetRole ?? null,
      experienceYears: profile.experienceYears ?? null,
      experienceLevel: profile.experienceLevel ?? null
    };

    return {
      profile: normalizedProfile,
      skills: Array.isArray(data.skills) ? data.skills : [],
      skillsToDevelop: Array.isArray(data.skillsToDevelop) ? data.skillsToDevelop : [],
      compatibleRoles: Array.isArray(data.compatibleRoles) ? data.compatibleRoles : [],
      recommendations: data.recommendations || { courses: [], nextSteps: [] },
      summary: data.summary || "Profil généré automatiquement."
    };
  },

  normalizeJobs(data) {
    if (!Array.isArray(data)) return [];
    return data.map(job => ({
      title: job.title || "Titre inconnu",
      company: job.company || "Entreprise inconnue",
      location: job.location || "Non spécifié",
      salary: job.salary || "Non spécifié",
      description: job.description || "",
      matchReason: job.matchReason || "",
      url: job.url || null
    }));
  },

  normalizeCourses(data) {
    if (!Array.isArray(data)) return [];
    return data.map(course => ({
      title: course.title || "Titre inconnu",
      provider: course.provider || "Fournisseur inconnu",
      duration: course.duration || "Non spécifié",
      description: course.description || "",
      targetSkill: course.targetSkill || "",
      url: course.url || null
    }));
  }
};
