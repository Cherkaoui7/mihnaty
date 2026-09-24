const fs = require('fs');

const profileHtml = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 2rem;">
            <div>
                <h1 style="font-size: 2rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; display:flex; align-items:center; gap:1rem;">
                    Mon Profil 
                    <span id="profile-auto-badge" class="tag" style="background:#e0f2fe; color:#0284c7; display:none; font-size:0.8rem; height:fit-content;">Auto-détecté</span>
                </h1>
                <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px;">
                    Gérez vos informations professionnelles. Ces données sont utilisées pour personnaliser vos recommandations.
                </p>
            </div>
            <button onclick="alert('L\\'aperçu public sera disponible prochainement.')" class="btn btn-secondary" style="display:flex; align-items:center; gap:0.5rem;">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Aperçu de mon profil
            </button>
        </div>

        <!-- PROFILE HERO -->
        <div style="background: linear-gradient(135deg, var(--navy) 0%, #1e3a8a 100%); border-radius: 16px; padding: 2rem; color: white; margin-bottom: 2rem; display:flex; gap: 2rem; align-items: center; position:relative; overflow:hidden;">
            <!-- Abstract background shape -->
            <svg width="200" height="200" style="position:absolute; right:-50px; top:-50px; opacity:0.1;" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/></svg>

            <!-- Avatar -->
            <div style="position:relative; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 4px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="60" height="60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <button style="position:absolute; bottom: 0; right: 0; width:36px; height:36px; border-radius:50%; background:var(--blue); border:2px solid var(--navy); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Modifier la photo">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </button>
            </div>
            
            <!-- Info -->
            <div style="flex: 1; z-index:1;">
                <h2 id="hero-name" style="font-size: 1.8rem; margin: 0 0 0.5rem 0; font-weight: 700;">-</h2>
                <div id="hero-role" style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 1rem;">-</div>
                <div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>
                        <span id="hero-sector">-</span>
                    </span>
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>
                        <span id="hero-education">-</span>
                    </span>
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span id="hero-exp">-</span>
                    </span>
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span id="hero-location">-</span>
                    </span>
                </div>
            </div>

            <!-- About preview in Hero -->
            <div style="flex:1; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 2rem; z-index:1; position:relative;">
                <svg width="24" height="24" fill="currentColor" opacity="0.2" viewBox="0 0 24 24" style="position:absolute; top:-10px; left:1rem;"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p id="hero-about" style="font-style:italic; font-size:0.95rem; line-height:1.6; opacity:0.9; margin:0; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden;">
                    Aucune description fournie.
                </p>
                <button class="btn btn-icon" style="position:absolute; top:-10px; right:0; background:rgba(255,255,255,0.1); color:white; border:none;" title="Modifier" onclick="document.getElementById('profile-form-submit').style.display='block'; document.getElementById('profile-about').focus();">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
        </div>

        <!-- PROFILE NAVIGATION (TABS) -->
        <div style="display:flex; border-bottom: 1px solid var(--border-color); margin-bottom: 2rem; overflow-x:auto;">
            <button class="profile-tab active" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid var(--blue); color:var(--blue); font-weight:600; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Informations générales
            </button>
            <button class="profile-tab" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid transparent; color:var(--text-muted); font-weight:500; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;" onclick="alert('Module en développement')">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>
                Parcours académique
            </button>
            <button class="profile-tab" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid transparent; color:var(--text-muted); font-weight:500; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;" onclick="alert('Module en développement')">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>
                Expériences professionnelles
            </button>
            <button class="profile-tab" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid transparent; color:var(--text-muted); font-weight:500; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;" onclick="App.navigate('skills')">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Compétences
            </button>
            <button class="profile-tab" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid transparent; color:var(--text-muted); font-weight:500; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;" onclick="alert('Module en développement')">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                Objectifs
            </button>
            <button class="profile-tab" style="padding: 1rem 1.5rem; background:none; border:none; border-bottom: 3px solid transparent; color:var(--text-muted); font-weight:500; cursor:pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap;" onclick="alert('Module en développement')">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Documents
            </button>
        </div>

        <div class="grid-60-40" style="gap:2rem;">
            
            <!-- MAIN CONTENT -->
            <div style="display:flex; flex-direction:column; gap:2rem;">
                
                <form id="profile-form">
                <!-- Informations personnelles -->
                <div class="card" style="margin:0;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem;">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <div style="width:40px; height:40px; border-radius:10px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">Informations personnelles</h3>
                                <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Vos informations de base et votre localisation.</p>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-form-submit').style.display='block';">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:middle;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Modifier
                        </button>
                    </div>

                        <div class="grid-2" style="gap:1.5rem;">
                            <div class="form-group">
                                <label class="form-label">Prénom <span style="color:var(--red);">*</span></label>
                                <input type="text" id="profile-first-name" class="form-control" placeholder="Prénom" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nom <span style="color:var(--red);">*</span></label>
                                <input type="text" id="profile-last-name" class="form-control" placeholder="Nom" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <input type="email" id="profile-email" class="form-control" placeholder="adresse@email.com" style="padding-left:36px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Téléphone</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <input type="tel" id="profile-phone" class="form-control" placeholder="+212 6 XX XX XX XX" style="padding-left:36px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ville</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <input type="text" id="profile-city" class="form-control" placeholder="Ville" style="padding-left:36px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Pays</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                    <select id="profile-country" class="form-control" style="padding-left:36px;">
                                        <option value="Maroc" selected>Maroc</option>
                                        <option value="France">France</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                </div>

                <!-- Profil professionnel -->
                <div class="card" style="margin:0;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem;">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <div style="width:40px; height:40px; border-radius:10px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">Profil professionnel</h3>
                                <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Votre profil, secteur et niveau d'expérience.</p>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-form-submit').style.display='block';">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:middle;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Modifier
                        </button>
                    </div>

                        <div class="grid-2" style="gap:1.5rem;">
                            <div class="form-group">
                                <label class="form-label">Domaine principal <span style="color:var(--red);">*</span></label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <select id="profile-domain" class="form-control" style="padding-left:36px;" required>
                                        <!-- Will be populated dynamically by app.js -->
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Profil / Métier cible <span style="color:var(--red);">*</span></label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                    <input type="text" id="profile-target" class="form-control" placeholder="ex: Développeur Full Stack" style="padding-left:36px;" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Niveau d'expérience</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    <select id="profile-experience" class="form-control" style="padding-left:36px;">
                                        <option value="Étudiant">Étudiant</option>
                                        <option value="Débutant">Débutant (0-2 ans)</option>
                                        <option value="Intermédiaire">Intermédiaire (3-5 ans)</option>
                                        <option value="Confirmé">Confirmé (5-10 ans)</option>
                                        <option value="Senior">Senior (10+ ans)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Disponibilité</label>
                                <div style="position:relative;">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="position:absolute; left:12px; top:12px; color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <select id="profile-availability" class="form-control" style="padding-left:36px;">
                                        <option value="Disponible">Disponible immédiatement</option>
                                        <option value="1 mois">Préavis d'un mois</option>
                                        <option value="3 mois">Préavis de 3 mois</option>
                                        <option value="À l'écoute">À l'écoute du marché</option>
                                        <option value="En poste">En poste, non disponible</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="grid-column: span 2;">
                                <label class="form-label">Niveau d'études</label>
                                <input type="text" id="profile-education" class="form-control" placeholder="ex: Bac+3">
                            </div>
                        </div>
                </div>
                
                <!-- A propos de vous -->
                <div class="card" style="margin:0;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem;">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <div style="width:40px; height:40px; border-radius:10px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">À propos de vous</h3>
                                <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Présentez-vous et décrivez votre parcours, vos motivations et vos intérêts.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <textarea id="profile-about" class="form-control" rows="5" placeholder="Parlez-nous de vous..." oninput="document.getElementById('char-count').innerText = this.value.length; document.getElementById('profile-form-submit').style.display='flex';"></textarea>
                        <div style="text-align:right; font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
                            <span id="char-count">0</span> / 1000
                        </div>
                    </div>

                    <div id="profile-form-submit" style="display:none; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; border-top:1px solid var(--border-color); padding-top:1rem;">
                        <button type="button" class="btn btn-secondary" onclick="App.viewControllers.profile(); this.parentElement.style.display='none';">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
                    </div>
                </div>
                </form>
            </div>

            <!-- SIDEBAR -->
            <div style="display:flex; flex-direction:column; gap:2rem;">
                
                <!-- Complétude -->
                <div class="card" style="margin:0;">
                    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
                        <svg width="20" height="20" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">Complétude du profil</h3>
                    </div>
                    
                    <div style="display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem;">
                        <div style="position:relative; width:80px; height:80px;">
                            <svg viewBox="0 0 36 36" style="width:100%; height:100%;">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" stroke-width="3"/>
                                <path id="completeness-circle" class="circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                            <div style="position:absolute; top:0; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem; color:var(--navy);" id="completeness-text">0%</div>
                        </div>
                        <div>
                            <h4 id="completeness-status" style="margin:0 0 0.25rem 0; color:var(--green);">En cours</h4>
                            <p style="margin:0; font-size:0.8rem; color:var(--text-muted); line-height:1.4;">Complétez votre profil pour obtenir des recommandations plus précises.</p>
                        </div>
                    </div>
                    
                    <div id="completeness-list" style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem;">
                        <!-- Generated by JS -->
                    </div>
                </div>

                <!-- Suggestions IA -->
                <div class="card" style="margin:0; background: #faf5ff; border:1px solid #e9d5ff;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <div style="display:flex; align-items:center; gap:0.75rem;">
                            <svg width="20" height="20" fill="none" stroke="var(--purple)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                            <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">Suggestions de l'IA</h3>
                        </div>
                    </div>
                    
                    <div id="ai-suggestions-list" style="display:flex; flex-direction:column; gap:0.75rem;">
                        <!-- Generated by JS -->
                    </div>
                </div>

                <!-- Documents -->
                <div class="card" style="margin:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <div style="display:flex; align-items:center; gap:0.75rem;">
                            <svg width="20" height="20" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            <h3 style="margin:0; font-size:1.1rem; color:var(--text-dark);">Documents</h3>
                        </div>
                    </div>
                    
                    <div id="profile-documents-list" style="display:flex; flex-direction:column; gap:0.75rem;">
                        <!-- Generated by JS -->
                    </div>
                    <button class="btn btn-secondary" style="width:100%; margin-top:1rem; display:flex; justify-content:center; gap:0.5rem;" onclick="App.navigate('upload')">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        Ajouter / Mettre à jour mon CV
                    </button>
                </div>

            </div>
        </div>
`;

let viewsContent = fs.readFileSync('pages/views.js', 'utf8');
const profileStart = viewsContent.indexOf('profile: `');
const profileEnd = viewsContent.indexOf('settings: `', profileStart);

if (profileStart === -1 || profileEnd === -1) {
    console.error("Could not find profile view block");
    process.exit(1);
}

viewsContent = viewsContent.substring(0, profileStart) + 'profile: `' + profileHtml + '`,\n    ' + viewsContent.substring(profileEnd);

fs.writeFileSync('pages/views.js', viewsContent, 'utf8');
console.log("Updated views.js successfully.");
