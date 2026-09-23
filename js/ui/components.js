const Components = {
  renderSkillTag(skill) {
    return `<span class="tag" style="background:var(--blue-light); color:var(--blue); border:1px solid var(--blue);">${skill.name} (${skill.level}%)</span>`;
  },

  renderSkillToDevelop(skill) {
    const pClass = skill.priority === "high" ? "tag-high" : "tag-medium";
    return `
            <div style="padding:1rem; border:1px solid var(--border-color); border-radius:var(--radius-sm); margin-bottom:1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <strong>${skill.name}</strong>
                    <span class="tag ${pClass}">Priorité: ${skill.priority}</span>
                </div>
                <p style="color:var(--text-muted); font-size:0.9rem;">${skill.reason}</p>
            </div>
        `;
  },

  renderCourseCard(course) {
    const isLive = course.sourceType === "web";
    const sourceBadge = isLive
      ? `<span class="tag" style="background:#e0f2fe; color:#0284c7;">LIVE</span>`
      : `<span class="tag tag-medium">DEMO</span>`;
    const score = course.relevanceScore || 0;

    let explanationsHtml = "";
    if (course.matchDetails && course.matchDetails.length > 0) {
      explanationsHtml = `
                <div style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <strong style="font-size:0.85rem; color:var(--text-color); display:block; margin-bottom:0.5rem;">Pourquoi ${score}% ?</strong>
                    <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8rem;">
                        ${course.matchDetails
                          .map((d) => {
                            let icon =
                              d.status.includes("Oui") ||
                              d.status.includes("Couvert")
                                ? '<span style="color:var(--green)">✓</span>'
                                : d.points > 0
                                  ? '<span style="color:#ca8a04">~</span>'
                                  : '<span style="color:var(--red)">✗</span>';
                            return `<div style="display:flex; justify-content:space-between;">
                                <span>${icon} ${d.label}</span>
                                <span style="color:var(--text-muted)">${d.status}</span>
                            </div>`;
                          })
                          .join("")}
                    </div>
                </div>
            `;
    }

    return `
            <div class="card" style="box-shadow:none; background:var(--bg-color);">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <h4 style="color:var(--primary-color);">${course.title} ${sourceBadge}</h4>
                    <strong style="color:var(--purple);">${score > 0 ? score + "% pertinent" : ""}</strong>
                </div>
                
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                    <span>Fournisseur: ${course.provider || course.category || course.focus}</span> • 
                    <span>Niveau: ${course.level || "Tous"}</span>
                    ${isLive && course.sourceDomain ? `<br>Source: <a href="${course.url}" target="_blank" style="text-decoration:underline;">${course.sourceDomain}</a>` : ""}
                    ${course.retrievedAt ? `(Vérifié le ${course.retrievedAt})` : ""}
                </div>
                <div>
                    ${(course.skills || [course.focus])
                      .filter(Boolean)
                      .map((s) => `<span class="tag">${s}</span>`)
                      .join("")}
                </div>
                
                ${explanationsHtml}
                
                ${isLive && course.url ? `<div style="margin-top:1rem;"><a href="${course.url}" target="_blank" class="btn btn-secondary" style="font-size:0.8rem;">Voir la formation</a></div>` : ""}
            </div>
        `;
  },

  renderJobCard(job, analysis) {
    let score = job.matchScore || 0;
    let scoreColor =
      score >= 80 ? "var(--green)" : score >= 50 ? "#ca8a04" : "var(--red)";

    const isLive = job.sourceType === "web";
    const sourceBadge = isLive
      ? `<span class="tag" style="background:#e0f2fe; color:#0284c7;">LIVE</span>`
      : `<span class="tag tag-medium">DEMO</span>`;

    let explanationsHtml = "";
    if (job.matchDetails && job.matchDetails.length > 0) {
      explanationsHtml = `
                <div style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <strong style="font-size:0.85rem; color:var(--text-color); display:block; margin-bottom:0.5rem;">Pourquoi ${score}% ?</strong>
                    <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8rem;">
                        ${job.matchDetails
                          .map((d) => {
                            let icon =
                              d.status.includes("Compatible") ||
                              d.status.includes("Couvert")
                                ? '<span style="color:var(--green)">✓</span>'
                                : d.points > 0
                                  ? '<span style="color:#ca8a04">~</span>'
                                  : '<span style="color:var(--red)">✗</span>';
                            return `<div style="display:flex; justify-content:space-between;">
                                <span>${icon} ${d.label}</span>
                                <span style="color:var(--text-muted)">${d.status}</span>
                            </div>`;
                          })
                          .join("")}
                    </div>
                </div>
            `;
    }

    const userSkills =
      analysis && analysis.skills
        ? analysis.skills.map((s) => s.name.toLowerCase())
        : [];
    const jobSkills = [
      ...(job.requiredSkills || []),
      ...(job.preferredSkills || []),
      ...(job.skills || []),
    ];
    const matching = [];
    const missing = [];

    jobSkills.forEach((s) => {
      const low = s.toLowerCase();
      if (userSkills.some((u) => u.includes(low) || low.includes(u)))
        matching.push(s);
      else missing.push(s);
    });

    return `
            <div class="card" style="box-shadow:none; border-left: 4px solid ${scoreColor};">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <h4>${job.title} ${sourceBadge}</h4>
                    <div style="text-align:right;">
                        <strong style="color:${scoreColor};">${score}% compatible</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted);">Score basé sur les critères disponibles</div>
                    </div>
                </div>
                <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">
                    ${job.company || "Entreprise non précisée"} • ${job.location || job.city || "Remote"} • ${job.type || "CDI"}
                    ${isLive && job.sourceDomain ? `<br>Source: <a href="${job.url}" target="_blank" style="text-decoration:underline;">${job.sourceDomain}</a>` : ""}
                    ${job.publishedDate ? ` (Publié le: ${job.publishedDate})` : ""}
                </div>
                
                <div class="grid-2">
                    <div>
                        <strong style="font-size:0.85rem; color:var(--green);">✓ Acquis</strong>
                        <div style="margin-top:0.5rem;">
                            ${matching.map((s) => `<span class="tag" style="background:var(--green-light); color:var(--green);">${s}</span>`).join("")}
                            ${matching.length === 0 ? '<em style="font-size:0.8rem;color:var(--text-muted)">Aucun</em>' : ""}
                        </div>
                    </div>
                    <div>
                        <strong style="font-size:0.85rem; color:var(--red);">⚠ Manquant</strong>
                        <div style="margin-top:0.5rem;">
                            ${missing.map((s) => `<span class="tag" style="background:#fee2e2; color:var(--red);">${s}</span>`).join("")}
                            ${missing.length === 0 ? '<em style="font-size:0.8rem;color:var(--text-muted)">Aucun</em>' : ""}
                        </div>
                    </div>
                </div>
                
                ${explanationsHtml}
                
                ${isLive && job.url ? `<div style="margin-top:1rem;"><a href="${job.url}" target="_blank" class="btn btn-secondary" style="font-size:0.8rem;">Voir l'offre</a></div>` : ""}
            </div>
        `;
  },
};
