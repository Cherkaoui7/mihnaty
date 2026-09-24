const Utils = {
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function(match) {
      const escape = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return escape[match];
    });
  }
};

const Components = {
  renderSectorSelector(activeSectorId) {
    // Determine which sector is active based on normalization
    const active = activeSectorId ? (window.SectorsHelper ? window.SectorsHelper.normalizeSector(activeSectorId) : activeSectorId) : "it";
    
    let options = "";
    if (window.Sectors) {
        options = window.Sectors.map(s => 
          `<option value="${s.id}" ${s.id === active ? 'selected' : ''}>${s.name}</option>`
        ).join("");
    }
    
    return `
      <select id="dash-sector-select" style="background:transparent; color:white; border:none; font-weight:600; outline:none; cursor:pointer; font-size:1rem; border-bottom:1px dashed rgba(255,255,255,0.5); padding-bottom:2px;">
        ${options}
      </select>
    `;
  },

  renderSkillTag(skill) {
    const raw = Number(skill.level);
    const level = Number.isFinite(raw) ? Math.round(raw) : 50; // default 50
    // Generate a simpleicon url or generic shape based on first letter
    const iconUrl = `https://cdn.simpleicons.org/${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/1D4ED8`;
    
    return `
        <div class="skill-card-detailed">
           <div class="skill-header">
               <img src="${iconUrl}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%231D4ED8%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'" class="skill-icon" alt="icon" />
               <span class="skill-name">${Utils.escapeHTML(skill.name)}</span>
               <span class="skill-percent">${level}%</span>
           </div>
           <div class="skill-progress-bar"><div class="fill" style="width: ${level}%"></div></div>
        </div>
    `;
  },

  renderSkillToDevelop(skill) {
    const pClass = skill.priority === "high" ? "high" : skill.priority === "medium" ? "medium" : "low";
    // Generate a simpleicon url or generic shape based on first letter
    const iconUrl = `https://cdn.simpleicons.org/${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/1D4ED8`;
    // For gaps, usually level is around 30-40% in demo
    const level = Math.floor(Math.random() * 20) + 25; // Random between 25-45% for visual

    return `
        <div class="gap-card-detailed">
            <div class="gap-header">
                <img src="${iconUrl}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%222%22><path d=%22M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z%22/></svg>'" class="gap-icon" alt="icon" />
                <span class="gap-name">${Utils.escapeHTML(skill.name)}</span>
                <span class="gap-priority ${pClass}">${skill.priority}</span>
            </div>
            <div class="gap-progress">
                <div class="gap-progress-bar">
                    <div class="fill" style="width: ${level}%"></div>
                </div>
                <span class="gap-progress-val">${level}% ></span>
            </div>
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
                    <h4 style="color:var(--primary-color);">${Utils.escapeHTML(course.title)} ${sourceBadge}</h4>
                    <strong style="color:var(--purple);">${score > 0 ? score + "% pertinent" : ""}</strong>
                </div>
                
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                    <span>Fournisseur: ${Utils.escapeHTML(course.provider || course.category || course.focus || "")}</span> • 
                    <span>Niveau: ${Utils.escapeHTML(course.level || "Tous")}</span>
                    ${isLive && course.sourceDomain ? `<br>Source: <a href="${course.url}" target="_blank" style="text-decoration:underline;">${course.sourceDomain}</a>` : ""}
                    ${course.retrievedAt ? `(Vérifié le ${course.retrievedAt})` : ""}
                </div>
                <div>
                    ${(course.skills || [course.focus])
                      .filter(Boolean)
                      .map((s) => `<span class="tag">${Utils.escapeHTML(s)}</span>`)
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
                    <h4>${Utils.escapeHTML(job.title)} ${sourceBadge}</h4>
                    <div style="text-align:right;">
                        <strong style="color:${scoreColor};">${score}% compatible</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted);">Score basé sur les critères disponibles</div>
                    </div>
                </div>
                <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">
                    ${Utils.escapeHTML(job.company || "Entreprise non précisée")} • ${Utils.escapeHTML(job.location || job.city || "Remote")} • ${Utils.escapeHTML(job.type || "CDI")}
                    ${isLive && job.sourceDomain ? `<br>Source: <a href="${job.url}" target="_blank" style="text-decoration:underline;">${Utils.escapeHTML(job.sourceDomain)}</a>` : ""}
                    ${job.publishedDate ? ` (Publié le: ${job.publishedDate})` : ""}
                </div>
                
                <div class="grid-2">
                    <div>
                        <strong style="font-size:0.85rem; color:var(--green);">✓ Acquis</strong>
                        <div style="margin-top:0.5rem;">
                            ${matching.map((s) => `<span class="tag" style="background:var(--green-light); color:var(--green);">${Utils.escapeHTML(s)}</span>`).join("")}
                            ${matching.length === 0 ? '<em style="font-size:0.8rem;color:var(--text-muted)">Aucun</em>' : ""}
                        </div>
                    </div>
                    <div>
                        <strong style="font-size:0.85rem; color:var(--red);">⚠ Manquant</strong>
                        <div style="margin-top:0.5rem;">
                            ${missing.map((s) => `<span class="tag" style="background:#fee2e2; color:var(--red);">${Utils.escapeHTML(s)}</span>`).join("")}
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
