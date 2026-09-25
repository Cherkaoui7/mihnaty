const Views = {
  dashboard: `
    <div class="dashboard-container">
        <!-- Hero Card -->
        <div class="header-card card" style="padding: 2.5rem; position:relative; background: var(--navy); color: white; border-radius:16px; overflow:hidden;">
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background: radial-gradient(circle at top right, rgba(29, 78, 216, 0.4) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.2) 0%, transparent 40%); opacity:0.8; pointer-events:none;"></div>
            <div id="live-demo-badge" style="position:absolute; top:1.5rem; right:1.5rem; z-index:2;"></div>
            <div style="font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-bottom:1rem; position:relative; z-index:1;">VUE D'ENSEMBLE</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; position:relative; z-index:1;">Bonjour, <span id="dashboard-user-name" style="font-weight: 700;">Utilisateur</span> 👋</h2>
            
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem; position:relative; z-index:1; flex-wrap: wrap;">
                <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.1); padding:0.5rem 1rem; border-radius:99px; border:1px solid rgba(255,255,255,0.05); backdrop-filter: blur(4px);">
                    <svg width="18" height="18" fill="none" stroke="#93c5fd" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>Profil: <strong id="dash-role" style="color:var(--white); font-weight:600;">-</strong></span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.1); padding:0.5rem 1rem; border-radius:99px; border:1px solid rgba(255,255,255,0.05); backdrop-filter: blur(4px);">
                    <svg width="18" height="18" fill="none" stroke="#93c5fd" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <span id="dash-sector-container">Secteur: <strong id="dash-sector" style="color:var(--white); font-weight:600;">-</strong></span>
                </div>
            </div>
            
            <div style="position:absolute; right:3rem; bottom:-1rem; opacity:0.8; pointer-events:none;">
                <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="160" cy="80" r="60" fill="url(#paint0_radial)" opacity="0.5"/>
                  <rect x="20" y="40" width="120" height="80" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2" style="backdrop-filter: blur(10px);"/>
                  <path d="M40 80L60 60L90 90L120 50" stroke="url(#paint1_linear)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="120" cy="50" r="4" fill="white"/>
                  <defs>
                    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 80) rotate(90) scale(60)">
                      <stop stop-color="#3B82F6"/>
                      <stop offset="1" stop-color="#3B82F6" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="paint1_linear" x1="40" y1="80" x2="120" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#60A5FA"/>
                      <stop offset="1" stop-color="#A78BFA"/>
                    </linearGradient>
                  </defs>
                </svg>
            </div>
        </div>

        <!-- Quick Stats Grid -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <!-- Stat 1 -->
            <div class="card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.5rem; border-left: 4px solid var(--blue); margin-bottom: 0;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="color:var(--text-muted); font-size:0.9rem; font-weight:500;">Compétences</div>
                    <div style="background:var(--blue-light); color:var(--blue); padding:0.35rem; border-radius:8px;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                </div>
                <div style="font-size:2rem; font-weight:700; color:var(--text-dark);" id="dash-metric-skills">0</div>
            </div>
            <!-- Stat 2 -->
            <div class="card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.5rem; border-left: 4px solid var(--red); margin-bottom: 0;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="color:var(--text-muted); font-size:0.9rem; font-weight:500;">À développer</div>
                    <div style="background:#fff1f2; color:var(--red); padding:0.35rem; border-radius:8px;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                </div>
                <div style="font-size:2rem; font-weight:700; color:var(--text-dark);" id="dash-metric-gaps">0</div>
            </div>
            <!-- Stat 3 -->
            <div class="card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.5rem; border-left: 4px solid var(--green); margin-bottom: 0;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="color:var(--text-muted); font-size:0.9rem; font-weight:500;">Opportunités</div>
                    <div style="background:var(--green-light); color:var(--green); padding:0.35rem; border-radius:8px;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
                <div style="font-size:2rem; font-weight:700; color:var(--text-dark);" id="dash-metric-jobs">0</div>
            </div>
            <!-- Stat 4 -->
            <div class="card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.5rem; border-left: 4px solid var(--purple); margin-bottom: 0;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="color:var(--text-muted); font-size:0.9rem; font-weight:500;">Formations</div>
                    <div style="background:var(--purple-light); color:var(--purple); padding:0.35rem; border-radius:8px;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                    </div>
                </div>
                <div style="font-size:2rem; font-weight:700; color:var(--text-dark);" id="dash-metric-courses">0</div>
            </div>
        </div>

        <!-- Main Content Grids -->
        <div class="grid-60-40" style="margin-top:1.5rem;">
            <!-- Left Column -->
            <div style="display:flex; flex-direction:column; gap:1.5rem;">
                <!-- Skills -->
                <div class="card" style="padding:1.5rem; height:100%; margin-bottom: 0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h3 style="margin:0; display:flex; align-items:center; gap:0.75rem; font-size:1.15rem; color:var(--text-dark);">
                            <div style="width:36px; height:36px; background:var(--blue-light); border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--primary-color);">
                              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            Compétences clés
                        </h3>
                        <a href="#skills" onclick="App.navigate('skills')" style="font-size:0.85rem; color:var(--primary-color); text-decoration:none; font-weight:500;">Détails &gt;</a>
                    </div>
                    <div id="dashboard-skills" style="display:flex; flex-wrap:wrap; gap:0.5rem;"><i>Aucune donnée.</i></div>
                </div>
                
                <!-- Gaps -->
                <div class="card" style="padding:1.5rem; height:100%; margin-bottom: 0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                        <h3 style="margin:0; display:flex; align-items:center; gap:0.75rem; font-size:1.15rem; color:var(--text-dark);">
                            <div style="width:36px; height:36px; background:#fff1f2; border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--red);">
                              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            Compétences à développer
                        </h3>
                    </div>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1.5rem; line-height:1.5;">Les compétences essentielles pour progresser dans votre domaine.</p>
                    <div id="dashboard-to-develop" style="display:flex; flex-direction:column; gap:0.75rem;"><i>Aucune donnée.</i></div>
                </div>
            </div>

            <!-- Right Column -->
            <div style="display:flex; flex-direction:column; gap:1.5rem;">
                <!-- Opportunities -->
                <div class="card" style="padding:1.5rem; height:100%; margin-bottom: 0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h3 style="margin:0; display:flex; align-items:center; gap:0.75rem; font-size:1.15rem; color:var(--text-dark);">
                            <div style="width:36px; height:36px; background:var(--green-light); border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--green);">
                              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            Opportunités
                        </h3>
                        <a href="#opportunities" onclick="App.navigate('opportunities')" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;">Voir tout</a>
                    </div>
                    <div id="dashboard-jobs-preview" style="display:flex; flex-direction:column; gap:1rem;">
                        <!-- Loading / Empty -->
                    </div>
                </div>

                <!-- Courses -->
                <div class="card" style="padding:1.5rem; height:100%; margin-bottom: 0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h3 style="margin:0; display:flex; align-items:center; gap:0.75rem; font-size:1.15rem; color:var(--text-dark);">
                            <div style="width:36px; height:36px; background:var(--purple-light); border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--purple);">
                              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                            </div>
                            Formations
                        </h3>
                        <a href="#courses" onclick="App.navigate('courses')" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;">Voir tout</a>
                    </div>
                    <div id="dashboard-courses-preview" style="display:flex; flex-direction:column; gap:1rem;">
                        <!-- Loading / Empty -->
                    </div>
                </div>
            </div>
        </div>
    </div>
`,
  profile: `
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
            <button onclick="alert('L\'aperçu public sera disponible prochainement.')" class="btn btn-secondary" style="display:flex; align-items:center; gap:0.5rem;">
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
                        
                        <div class="form-group" style="margin-top:1.5rem;">
                            <label class="form-label">À propos de vous</label>
                            <textarea id="profile-about" class="form-control" rows="4" placeholder="Décrivez votre parcours, vos objectifs et ce qui vous motive..."></textarea>
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
`,
    settings: `
        <div class="card">
            <h2 class="card-header">Connecter mon IA</h2>
            
            <!-- ETAT: NON CONNECTÉ -->
            <div id="ai-disconnected-view">
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                    Utilisez votre propre clé API pour faire fonctionner l'intelligence artificielle de Mihnati.
                </p>
                <form id="ai-connect-form">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: bold;">Votre clé API :</label>
                        <input type="password" id="ai-key-input" class="form-control" required placeholder="Collez votre clé ici">
                    </div>
                    
                    <button type="submit" id="ai-connect-btn" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1rem;">Connecter mon IA</button>
                    
                    <div style="text-align: center; font-size: 0.85rem; color: #475569; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">🔒</span> Votre clé reste uniquement dans cette session.
                    </div>
                </form>
            </div>
            
            <!-- ETAT: CONNECTÉ -->
            <div id="ai-connected-view" style="display:none;">
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #22c55e; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                            🟢
                        </div>
                        <div>
                            <h3 style="margin: 0; color: #166534;">IA Connectée</h3>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; color: #166534; margin-bottom: 1.5rem;">
                        <strong>Fournisseur :</strong> <span id="ai-detected-provider">...</span><br>
                        <strong>Modèle :</strong> <span id='ai-detected-model'>Automatique</span> <select id='ai-model-select' style='display:none; margin-left: 0.5rem; padding: 0.2rem; max-width: 200px; display: inline-block;'></select><br>
                        <strong>Clé :</strong> <span id="ai-masked-key">••••••••••••••</span>
                    </div>
                    
                    <div style="display:flex; gap:1rem;">
                        <button id="ai-test-btn" class="btn btn-secondary">Tester</button>
                        <button id="ai-change-btn" class="btn btn-secondary">Changer</button>
                        <button id="ai-disconnect-btn" class="btn btn-secondary" style="color: var(--red); border-color: var(--red);">Supprimer</button>
                    </div>
                    <div id="bl-options" style="display:none; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer;">
                            <input type="checkbox" id="ai-free-fallback" checked>
                            Utiliser uniquement les modèles gratuits
                        </label>
                    </div>
                </div>
            </div>

            <!-- ETAT: FALLBACK / AVANCÉ -->
            <div id="ai-advanced-container" style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display:none;">
                <div style="margin-bottom: 1rem; padding: 1rem; background: #fff1f2; border-left: 4px solid #f43f5e; font-size: 0.9rem; display:none;" id="ai-detection-error">
                    Nous n'avons pas pu identifier automatiquement votre fournisseur.
                </div>
                
                <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Choisir mon fournisseur</h3>
                <form id="ai-advanced-form">
                    <div class="form-group">
                        <select id="adv-provider" class="form-control">
                            <!-- Populated dynamically -->
                        </select>
                    </div>
                    
                    <div class="form-group" id="adv-endpoint-group" style="display:none;">
                        <label for="adv-endpoint" class="form-label">Endpoint API</label>
                        <input type="text" id="adv-endpoint" class="form-control" placeholder="Obligatoire pour Custom">
                    </div>
                    
                    <div class="form-group" id="adv-model-group">
                        <label for="adv-model" class="form-label">Modèle</label>
                        <input type="text" id="adv-model" class="form-control" placeholder="modèle par défaut ▼">
                    </div>
                    
                    <div class="form-group">
                        <label for="adv-key" class="form-label">Clé API</label>
                        <input type="password" id="adv-key" class="form-control" required>
                    </div>
                    
                    <button type="submit" class="btn btn-secondary">Connecter</button>
                </form>
            </div>
        </div>
        
        <div class="card" style="margin-top: 2rem; border-color: var(--red);">
            <h2 class="card-header" style="color: var(--red);">Zone de danger</h2>
            <button id="reset-all-btn" class="btn btn-secondary" style="color: var(--red); border-color: var(--red);">Réinitialiser toutes mes données (Hard Reset)</button>
        </div>
    `,
  upload: `
<div class="upload-page" style="display: flex; flex-direction: column; gap: 1.5rem;">
    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
            <h2 style="margin:0 0 0.5rem 0; font-size: 1.8rem; color: var(--text-dark);">Analyser mon CV</h2>
            <p style="margin:0; color: var(--text-muted); font-size: 0.95rem;">Transformez votre CV en un profil professionnel clair et découvrez vos prochaines opportunités.</p>
        </div>
        <div style="background: var(--purple-light); color: var(--purple); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 500; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Analyse IA
        </div>
    </div>

    <!-- HERO -->
    <div style="background: linear-gradient(135deg, var(--navy) 0%, #1e1b4b 100%); border-radius: 16px; padding: 2.5rem 2rem; color: white; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; gap: 2rem;">
        <div style="position: relative; z-index: 2; max-width: 600px;">
            <h3 style="font-size: 1.6rem; font-weight: 600; margin: 0 0 1rem 0; line-height: 1.3;">Découvrez ce que votre CV révèle sur votre <span style="color: #a78bfa;">profil professionnel.</span></h3>
            <p style="color: #cbd5e1; font-size: 1rem; margin: 0 0 1.5rem 0; line-height: 1.5;">Mihnati analyse votre parcours, vos compétences et votre expérience afin de construire un profil personnalisé et vous proposer des formations et des opportunités adaptées.</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <span style="display:flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.1); padding:0.4rem 1rem; border-radius:20px; font-size:0.85rem;"><svg width="16" height="16" fill="none" stroke="#34d399" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Rapide et précis</span>
                <span style="display:flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.1); padding:0.4rem 1rem; border-radius:20px; font-size:0.85rem;"><svg width="16" height="16" fill="none" stroke="#34d399" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Multi-secteurs</span>
                <span style="display:flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.1); padding:0.4rem 1rem; border-radius:20px; font-size:0.85rem;"><svg width="16" height="16" fill="none" stroke="#34d399" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Recommandations personnalisées</span>
            </div>
        </div>
        <div style="position: relative; z-index: 2; flex-shrink: 0; display: none; @media(min-width: 900px){ display: block; }">
            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- CV Document -->
                <rect x="20" y="25" width="80" height="110" rx="8" fill="rgba(255,255,255,0.95)" />
                <rect x="35" y="45" width="30" height="8" rx="4" fill="#cbd5e1" />
                <rect x="35" y="65" width="50" height="6" rx="3" fill="#e2e8f0" />
                <rect x="35" y="80" width="40" height="6" rx="3" fill="#e2e8f0" />
                <rect x="35" y="95" width="50" height="6" rx="3" fill="#e2e8f0" />
                <text x="60" y="35" fill="var(--blue)" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">CV</text>
                
                <!-- Connection Line to AI -->
                <path d="M110 80 L140 80" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="4 4" />
                <path d="M135 75 L140 80 L135 85" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />
                
                <!-- AI Box -->
                <rect x="150" y="55" width="50" height="50" rx="12" fill="var(--purple)" stroke="#a78bfa" stroke-width="2" />
                <text x="175" y="85" fill="white" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">IA</text>
                
                <!-- Connection Lines to Results -->
                <path d="M210 80 L230 50" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                <path d="M210 80 L230 80" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                <path d="M210 80 L230 110" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                
                <!-- Result Nodes -->
                <circle cx="235" cy="50" r="5" fill="white" />
                <circle cx="235" cy="80" r="5" fill="#a78bfa" />
                <circle cx="235" cy="110" r="5" fill="#34d399" />
            </svg>
        </div>
        <!-- BG blobs -->
        <div style="position: absolute; width: 300px; height: 300px; background: var(--purple); filter: blur(80px); opacity: 0.3; top: -100px; right: -100px; border-radius: 50%;"></div>
        <div style="position: absolute; width: 200px; height: 200px; background: var(--blue); filter: blur(60px); opacity: 0.2; bottom: -50px; left: 10%;"></div>
    </div>

    <!-- MAIN GRID: UPLOAD + INFO -->
    <div class="grid-60-40" style="align-items: start;">
        
        <!-- LEFT: UPLOAD -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div class="card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="width: 40px; height: 40px; border-radius: 8px; background: #eff6ff; color: var(--blue); display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 0.2rem 0; font-size: 1.2rem; color: var(--text-dark);">Déposez votre CV</h3>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Formats acceptés : PDF ou DOCX</p>
                    </div>
                </div>

                <!-- DROPZONE (Visible by default) -->
                <div id="upload-zone" style="border: 2px dashed var(--border-color); background: #f8fafc; padding: 3.5rem 1.5rem; text-align: center; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                    <svg width="48" height="48" fill="none" stroke="var(--blue)" viewBox="0 0 24 24" style="margin-bottom: 1.5rem; opacity:0.8;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <h4 style="margin: 0 0 1rem 0; color: var(--text-dark); font-size: 1.15rem; font-weight: 500;">Glissez-déposez votre CV ici</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.2rem;">ou</p>
                    <button class="btn btn-primary" onclick="document.getElementById('cv-file').click()" style="pointer-events:none;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:0.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Choisir un fichier
                    </button>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin: 1.5rem 0 0 0;">PDF ou DOCX • Taille maximale : 10 Mo</p>
                    <input type="file" id="cv-file" accept=".pdf,.docx" style="display:none">
                </div>

                <!-- SELECTED FILE STATE (Hidden by default) -->
                <div id="file-selected-zone" style="display: none; border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 12px; background: white;">
                    <h4 style="margin:0 0 1rem 0; font-size: 1.05rem; color: var(--text-dark);">Fichier sélectionné</h4>
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 40px; height: 40px; border-radius: 8px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h4 id="selected-filename" style="margin: 0 0 0.2rem 0; font-size: 0.95rem; color: var(--text-dark); word-break: break-all;">cv_utilisateur.pdf</h4>
                                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
                                    <span style="color: var(--text-muted);">PDF • <span id="selected-filesize">...</span></span>
                                    <span style="color: var(--green); display: flex; align-items: center; gap: 0.2rem; font-weight: 500;">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Prêt à analyser
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-icon" id="remove-file-btn" style="background: none; border: none; color: #ef4444; padding: 0.5rem; cursor: pointer;" title="Supprimer">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                    
                    <button id="start-analysis-btn" class="btn btn-primary btn-lg" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 1.05rem;">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Analyser mon CV
                    </button>
                    <div style="text-align: center; margin-top: 1rem;">
                        <button id="replace-file-btn" style="background: none; border: none; color: var(--text-muted); text-decoration: underline; font-size: 0.9rem; cursor: pointer;">Choisir un autre fichier</button>
                    </div>
                </div>

                <!-- PROGRESS STATE -->
                <div id="analysis-progress-zone" style="display:none; border: 1px solid var(--border-color); padding: 2.5rem 1.5rem; border-radius: 12px; background: white; text-align: center;">
                    <div class="spinner" style="margin: 0 auto 1.5rem auto; border-color: #e2e8f0; border-top-color: var(--blue);"></div>
                    <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; color: var(--text-dark);">Analyse de votre CV en cours...</h3>
                    
                    <div style="text-align: left; max-width: 300px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;" id="progress-steps">
                        <div class="step-progress" id="pstep-upload" style="display:flex; align-items:center; gap:0.75rem; color:var(--text-dark);">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Lecture du document</span>
                        </div>
                        <div class="step-progress" id="pstep-extract" style="display:flex; align-items:center; gap:0.75rem; color:var(--text-muted);">
                            <div style="width:20px; height:20px; border:2px solid currentColor; border-radius:50%;"></div>
                            <span>Extraction des informations</span>
                        </div>
                        <div class="step-progress" id="pstep-analyze" style="display:flex; align-items:center; gap:0.75rem; color:var(--text-muted);">
                            <div style="width:20px; height:20px; border:2px solid currentColor; border-radius:50%;"></div>
                            <span>Analyse IA en cours</span>
                        </div>
                        <div class="step-progress" id="pstep-result" style="display:flex; align-items:center; gap:0.75rem; color:var(--text-muted);">
                            <div style="width:20px; height:20px; border:2px solid currentColor; border-radius:50%;"></div>
                            <span>Préparation des recommandations</span>
                        </div>
                    </div>
                </div>

                <!-- RESULT / SUCCESS STATE -->
                <div id="detected-profile-zone" style="display:none; border: 1px solid #bbf7d0; padding: 2rem 1.5rem; border-radius: 12px; background: #f0fdf4;">
                    <div style="display:flex; align-items:center; gap:0.75rem; color: var(--green); margin-bottom: 1rem;">
                        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 style="margin:0; font-size:1.3rem;">Analyse terminée</h3>
                    </div>
                    <p style="margin: 0 0 1.5rem 0; color: var(--text-dark); font-size: 1rem;">Votre profil professionnel a été généré avec succès.</p>
                    
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; font-size: 0.95rem;">
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.3rem;">Profil détecté</div>
                                <strong id="det-target" style="color: var(--text-dark);">...</strong>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.3rem;">Secteur</div>
                                <strong id="det-domain" style="color: var(--text-dark);">...</strong>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.3rem;">Prénom & Nom</div>
                                <strong id="det-name" style="color: var(--text-dark);">...</strong>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.3rem;">Expérience</div>
                                <strong id="det-exp" style="color: var(--text-dark);">...</strong>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button id="confirm-profile-btn" class="btn btn-primary" style="flex: 1; min-width: 200px;">Voir mon profil</button>
                        <button onclick="App.navigate('skills')" class="btn btn-secondary" style="flex: 1; min-width: 200px;">Voir mes compétences</button>
                    </div>
                </div>

                <!-- ERROR STATE -->
                <div id="error-zone" style="display:none; border: 1px solid #fecaca; padding: 2rem 1.5rem; border-radius: 12px; background: #fef2f2;">
                    <div style="display:flex; align-items:center; gap:0.75rem; color: #ef4444; margin-bottom: 1rem;">
                        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 style="margin:0; font-size:1.3rem;">Impossible d'analyser votre CV</h3>
                    </div>
                    <p id="error-message" style="margin: 0 0 1.5rem 0; color: var(--text-dark); font-size: 1rem;">Une erreur est survenue lors de la lecture de votre document.</p>
                    <button id="retry-btn" class="btn btn-secondary" style="background: white;">Réessayer</button>
                </div>

                <!-- PRIVACY WARNING -->
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; margin-top: 1rem; padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.9rem; color: var(--text-muted);">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0; margin-top:2px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <div>
                        Vos données sont utilisées uniquement pour générer votre analyse.<br>
                        Votre clé API reste stockée temporairement dans votre session locale.
                    </div>
                </div>
            </div>

            <!-- COMMENT CA MARCHE -->
            <div class="card" style="padding: 2rem;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.15rem; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Comment ça fonctionne ?
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; position: relative;">
                    <!-- Step 1 -->
                    <div style="display: flex; gap: 1rem; align-items: flex-start; position: relative; z-index: 1;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--blue); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1rem;">01</div>
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: var(--text-dark);">Importez votre CV</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Ajoutez votre CV au format PDF ou DOCX.</p>
                        </div>
                    </div>
                    <!-- Step 2 -->
                    <div style="display: flex; gap: 1rem; align-items: flex-start; position: relative; z-index: 1;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--purple-light); color: var(--purple); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1rem;">02</div>
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: var(--text-dark);">Laissez l'IA l'analyser</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Mihnati extrait et structure les informations pertinentes.</p>
                        </div>
                    </div>
                    <!-- Step 3 -->
                    <div style="display: flex; gap: 1rem; align-items: flex-start; position: relative; z-index: 1;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1rem;">03</div>
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: var(--text-dark);">Découvrez votre parcours</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Consultez votre profil, vos compétences et vos recommandations.</p>
                        </div>
                    </div>
                    <!-- Connector line -->
                    <div style="position: absolute; left: 17px; top: 36px; bottom: 36px; width: 2px; background: #e2e8f0; z-index: 0;"></div>
                </div>
            </div>
            
            <div id="ai-warning" style="display:none; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 1.25rem; border-radius: 8px;">
                <strong>Mode démo actif :</strong> Vous n'avez pas configuré de clé API. <a href="#settings" style="color: #991b1b; text-decoration: underline;">Configurer l'IA</a>
            </div>

            <div id="analysis-logs" style="display:none;"></div>
        </div>

        <!-- RIGHT: INFO SIDEBAR -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- DEMO MODE ALERT -->
            <div id="demo-mode-card" class="card" style="padding: 1.5rem; border: 1px solid var(--purple-light); background: #faf5ff;">
                <div style="display: flex; gap: 1rem;">
                    <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--purple-light); color: var(--purple); display: flex; align-items: center; justify-content: center; flex-shrink:0;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; color: var(--purple);">Mode Démo</h4>
                        <p style="margin: 0 0 1.25rem 0; font-size: 0.9rem; color: var(--text-dark);">Découvrez le fonctionnement de Mihnati avec un CV et des données simulés.</p>
                        <button onclick="App.runDemoFlow()" class="btn" style="background: white; border: 1px solid var(--border-color); color: var(--purple); padding: 0.5rem 1rem; font-size: 0.9rem; width: 100%;">
                            Lancer la démonstration →
                        </button>
                    </div>
                </div>
            </div>

            <!-- WHAT IS ANALYZED -->
            <div class="card" style="padding: 1.5rem;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.15rem; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Que va analyser Mihnati ?
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#eff6ff; color:var(--blue); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Profil professionnel</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Identification de votre métier et secteur.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#faf5ff; color:var(--purple); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Formation</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Diplômes et parcours académique.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#f0fdf4; color:#16a34a; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Expériences</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Postes, entreprises et réalisations.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Compétences</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Compétences techniques et transversales.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#fffbeb; color:#d97706; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Langues</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Langues parlées et niveaux.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <div style="width:40px; height:40px; border-radius:8px; background:#f3f4f6; color:#4b5563; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem; color: var(--text-dark);">Objectif professionnel</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Vos aspirations et objectifs de carrière.</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AFTER ANALYSIS -->
            <div class="card" style="padding: 1.5rem;">
                <h3 style="margin: 0 0 1.5rem 0; font-size: 1.15rem; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Après l'analyse, vous obtenez :
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display:flex; align-items:flex-start; gap:0.75rem;">
                        <div style="background: #eff6ff; color: var(--blue); padding: 0.25rem; border-radius: 4px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 500; color: var(--text-dark);">Un profil professionnel clair</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Votre métier et secteur détectés.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:0.75rem;">
                        <div style="background: #fef2f2; color: #ef4444; padding: 0.25rem; border-radius: 4px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 500; color: var(--text-dark);">Vos compétences détectées</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Avec les niveaux de maîtrise.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:0.75rem;">
                        <div style="background: #faf5ff; color: var(--purple); padding: 0.25rem; border-radius: 4px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 500; color: var(--text-dark);">Les compétences à développer</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Pour atteindre vos objectifs.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:0.75rem;">
                        <div style="background: #fffbeb; color: #d97706; padding: 0.25rem; border-radius: 4px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg></div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 500; color: var(--text-dark);">Des formations recommandées</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Adaptées à votre profil et secteur.</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:0.75rem;">
                        <div style="background: #f0fdf4; color: #16a34a; padding: 0.25rem; border-radius: 4px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 500; color: var(--text-dark);">Des opportunités pertinentes</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Selon votre profil et vos objectifs.</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
`,
skills: `

<div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
    <div>
        <h1 style="font-size: 1.8rem; color: var(--navy); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
            Mes Compétences
            <span id="skills-mode-badge"></span>
        </h1>
        <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px;">Consultez, gérez et développez vos compétences. Ces informations sont utilisées pour créer vos recommandations personnalisées.</p>
    </div>
    <div>
        <button id="btn-add-skill" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Ajouter une compétence
        </button>
    </div>
</div>

<!-- STATS CARDS -->
<div class="grid-4" style="margin-bottom: 2rem;">
    <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: #eff6ff; color: var(--blue); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div style="font-weight: 600; color: var(--text-dark);">Compétences totales</div>
        </div>
        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem;">
            <div id="stat-total" style="font-size: 2.5rem; font-weight: 700; color: var(--navy); line-height: 1;">0</div>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">Compétences identifiées dans votre profil</div>
    </div>
    
    <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <div style="font-weight: 600; color: var(--text-dark);">Techniques</div>
        </div>
        <div id="stat-tech" style="font-size: 2.5rem; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 1rem;">0</div>
        <div style="margin-top: auto;">
            <div style="height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; width: 100%;">
                <div id="stat-tech-bar" style="height: 100%; background: #ef4444; width: 0%; border-radius: 3px;"></div>
            </div>
            <div id="stat-tech-pct" style="font-size: 0.75rem; color: var(--text-muted); text-align: right; margin-top: 0.25rem;">0%</div>
        </div>
    </div>
    
    <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: #f0fdf4; color: #16a34a; display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div style="font-weight: 600; color: var(--text-dark);">Transversales</div>
        </div>
        <div id="stat-soft" style="font-size: 2.5rem; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 1rem;">0</div>
        <div style="margin-top: auto;">
            <div style="height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; width: 100%;">
                <div id="stat-soft-bar" style="height: 100%; background: #16a34a; width: 0%; border-radius: 3px;"></div>
            </div>
            <div id="stat-soft-pct" style="font-size: 0.75rem; color: var(--text-muted); text-align: right; margin-top: 0.25rem;">0%</div>
        </div>
    </div>
    
    <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: #faf5ff; color: var(--purple); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            </div>
            <div style="font-weight: 600; color: var(--text-dark);">Langues</div>
        </div>
        <div id="stat-lang" style="font-size: 2.5rem; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 1rem;">0</div>
        <div style="margin-top: auto;">
            <div style="height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; width: 100%;">
                <div id="stat-lang-bar" style="height: 100%; background: var(--purple); width: 0%; border-radius: 3px;"></div>
            </div>
            <div id="stat-lang-pct" style="font-size: 0.75rem; color: var(--text-muted); text-align: right; margin-top: 0.25rem;">0%</div>
        </div>
    </div>
</div>

<!-- FILTERS BAR -->
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 4px; max-width: 100%;" class="hide-scrollbar">
        <button class="btn btn-filter active" data-filter="all">Toutes <span id="tab-all-count">(0)</span></button>
        <button class="btn btn-filter" data-filter="technical">Techniques <span id="tab-tech-count">(0)</span></button>
        <button class="btn btn-filter" data-filter="soft">Transversales <span id="tab-soft-count">(0)</span></button>
        <button class="btn btn-filter" data-filter="language">Langues <span id="tab-lang-count">(0)</span></button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="position: relative; width: 250px; max-width: 100%;">
            <svg width="18" height="18" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="skills-search" placeholder="Rechercher une compétence..." style="width: 100%; padding: 0.5rem 1rem 0.5rem 2.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none;">
        </div>
        <select id="skills-sort" style="padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white; color: var(--text-dark);">
            <option value="level-desc">Trier par niveau (décroissant)</option>
            <option value="level-asc">Trier par niveau (croissant)</option>
            <option value="name-asc">Nom A &rarr; Z</option>
            <option value="name-desc">Nom Z &rarr; A</option>
        </select>
    </div>
</div>

<!-- MAIN LAYOUT -->
<div class="grid-layout-2">
    <!-- LEFT: SKILLS LIST -->
    <div>
        <h3 style="font-size: 1.25rem; color: var(--navy); margin-bottom: 1.5rem;">Liste de vos compétences</h3>
        
        <div id="skills-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
            <!-- Skills will be injected here -->
        </div>

        <div id="skills-empty-state" style="display: none; text-align: center; padding: 4rem 2rem; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
            <div style="width: 64px; height: 64px; background: #f8fafc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--text-muted);">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--navy); margin-bottom: 0.5rem;">Vos compétences apparaîtront ici</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">Analysez votre CV ou ajoutez manuellement vos premières compétences pour enrichir votre profil.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="#upload" class="btn btn-secondary">Analyser mon CV</a>
                <button class="btn btn-primary btn-add-skill-trigger">Ajouter une compétence</button>
            </div>
        </div>
        
        <div id="skills-loading-state" style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <!-- Skeletons -->
            <div class="card" style="height: 120px; width: 100%; max-width: 280px; padding: 1rem; position: relative; overflow: hidden;">
                <div class="skeleton" style="width: 40px; height: 40px; border-radius: 8px; margin-bottom: 0.75rem;"></div>
                <div class="skeleton" style="width: 60%; height: 16px; margin-bottom: 0.5rem; border-radius: 4px;"></div>
                <div class="skeleton" style="width: 100%; height: 6px; border-radius: 3px; margin-top: auto;"></div>
            </div>
            <div class="card" style="height: 120px; width: 100%; max-width: 280px; padding: 1rem; position: relative; overflow: hidden;">
                <div class="skeleton" style="width: 40px; height: 40px; border-radius: 8px; margin-bottom: 0.75rem;"></div>
                <div class="skeleton" style="width: 50%; height: 16px; margin-bottom: 0.5rem; border-radius: 4px;"></div>
                <div class="skeleton" style="width: 100%; height: 6px; border-radius: 3px; margin-top: auto;"></div>
            </div>
        </div>
    </div>
    
    <!-- RIGHT: CHARTS & GAPS -->
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card" style="padding: 1.5rem;">
            <h3 style="font-size: 1.1rem; color: var(--navy); margin-bottom: 1.5rem;">Répartition des compétences</h3>
            <div style="display: flex; align-items: center; justify-content: center; position: relative; height: 180px; margin-bottom: 1.5rem;">
                <div id="skills-donut-chart-svg"></div>
                <div id="skills-chart-center" style="position: absolute; text-align: center; pointer-events: none;">
                    <div id="chart-total-val" style="font-size: 1.8rem; font-weight: 700; color: var(--navy); line-height: 1;">0</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem;">total</div>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></div>
                        <span style="color: var(--text-dark);">Techniques</span>
                    </div>
                    <span id="chart-tech-val" style="color: var(--text-muted);">0 (0%)</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #16a34a;"></div>
                        <span style="color: var(--text-dark);">Transversales</span>
                    </div>
                    <span id="chart-soft-val" style="color: var(--text-muted);">0 (0%)</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--purple);"></div>
                        <span style="color: var(--text-dark);">Langues</span>
                    </div>
                    <span id="chart-lang-val" style="color: var(--text-muted);">0 (0%)</span>
                </div>
            </div>
        </div>
        
        <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.1rem; color: var(--navy);">Compétences à développer</h3>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Les compétences qui peuvent vous aider à atteindre votre objectif professionnel.</p>
            
            <div id="skills-gap-container" style="display: flex; flex-direction: column; gap: 1rem;">
                <!-- Skill gaps injected here -->
            </div>
        </div>
    </div>
</div>

<!-- MODAL: ADD / EDIT SKILL -->
<div id="modal-skill" class="modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 100; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
    <div class="card" style="width: 100%; max-width: 450px; margin: 1rem; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <h3 id="modal-skill-title" style="font-size: 1.25rem; color: var(--navy); margin-bottom: 1.5rem;">Ajouter une compétence</h3>
        <input type="hidden" id="modal-skill-id">
        <input type="hidden" id="modal-skill-source" value="manual">
        <input type="hidden" id="modal-skill-original-name">
        
        <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-dark); margin-bottom: 0.5rem;">Nom de la compétence <span style="color: var(--red);">*</span></label>
            <input type="text" id="modal-skill-name" placeholder="Ex: React.js, Négociation, Anglais..." style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none;">
        </div>
        
        <div style="margin-bottom: 1rem;">
            <label for="modal-skill-category" style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-dark); margin-bottom: 0.5rem;">Catégorie <span style="color: var(--red);">*</span></label>
                        <select id="modal-skill-category" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; background: white;">
                <option value="technical">Technique</option>
                <option value="soft">Transversale</option>
                <option value="language">Langue</option>
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label for="modal-skill-level" style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-dark); margin-bottom: 0.5rem;">Niveau : <span id="modal-skill-level-display" style="color: var(--blue); font-weight: 600;">50% (Intermédiaire)</span></label>
            <input type="range" id="modal-skill-level" min="0" max="100" step="5" value="50" style="width: 100%; accent-color: var(--blue);">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                <span>0%</span>
                <span>100%</span>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
            <button id="modal-skill-cancel" class="btn btn-secondary">Annuler</button>
            <button id="modal-skill-save" class="btn btn-primary">Enregistrer</button>
        </div>
    </div>
</div>

<!-- MODAL: DELETE SKILL -->
<div id="modal-delete" class="modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 100; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
    <div class="card" style="width: 100%; max-width: 400px; margin: 1rem; padding: 2rem; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h3 style="font-size: 1.25rem; color: var(--navy); margin-bottom: 0.5rem;">Supprimer cette compétence ?</h3>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">Cette action supprimera "<span id="modal-delete-skill-name" style="font-weight: 600; color: var(--text-dark);"></span>" de votre profil. Elle ne pourra pas être annulée.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="modal-delete-cancel" class="btn btn-secondary">Annuler</button>
            <button id="modal-delete-confirm" class="btn" style="background: #ef4444; color: white; border: 1px solid #ef4444;">Supprimer</button>
        </div>
    </div>
</div>

`,
  courses: `

<div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
    <div>
        <h1 style="font-size: 1.8rem; color: var(--navy); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
            Formations
            <span id="courses-mode-badge"></span>
        </h1>
        <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px;">Découvrez des formations adaptées à votre profil, vos objectifs et votre secteur.</p>
    </div>
    <div>
        <button id="btn-saved-courses" class="btn btn-secondary" style="display: flex; align-items: center; gap: 0.5rem; background: #eff6ff; color: var(--blue); border-color: #eff6ff;">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            Mes formations enregistrées
        </button>
    </div>
</div>

<!-- HERO BANNER -->
<div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 2rem; position: relative; overflow: hidden;">
    <div style="flex: 1; min-width: 300px; position: relative; z-index: 2;">
        <h2 style="color: white; font-size: 1.75rem; margin-bottom: 1rem; line-height: 1.3;">Développez vos compétences<br>pour aller plus loin.</h2>
        <p style="color: #cbd5e1; font-size: 1rem; margin-bottom: 1.5rem; max-width: 500px; line-height: 1.5;">Explorez une sélection de formations adaptées à votre profil et aux compétences que vous souhaitez développer.</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.1); color: #fff; padding: 0.4rem 0.75rem; border-radius: 20px; font-size: 0.8rem; backdrop-filter: blur(4px);">
                <svg width="14" height="14" fill="none" stroke="#4ade80" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Recommandations personnalisées
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.1); color: #fff; padding: 0.4rem 0.75rem; border-radius: 20px; font-size: 0.8rem; backdrop-filter: blur(4px);">
                <svg width="14" height="14" fill="none" stroke="#4ade80" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Multi-secteurs
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.1); color: #fff; padding: 0.4rem 0.75rem; border-radius: 20px; font-size: 0.8rem; backdrop-filter: blur(4px);">
                <svg width="14" height="14" fill="none" stroke="#4ade80" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                À jour avec le marché
            </span>
        </div>
    </div>
    <div style="flex: 1; min-width: 300px; display: flex; justify-content: flex-end; align-items: center; position: relative; z-index: 2;">
        <!-- Abstract Illustration SVG -->
        <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="40" width="80" height="100" rx="8" fill="rgba(255,255,255,0.1)" />
            <rect x="30" y="30" width="80" height="100" rx="8" fill="rgba(255,255,255,0.2)" />
            <rect x="40" y="20" width="80" height="100" rx="8" fill="#3b82f6" />
            <path d="M70 50 L90 50 M70 60 L100 60 M70 70 L95 70" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <circle cx="80" cy="90" r="10" fill="white" fill-opacity="0.5"/>
            <path d="M140 60 L180 40 L220 60 L180 80 Z" fill="#60a5fa" />
            <path d="M140 70 L180 50 L220 70 L180 90 Z" fill="#93c5fd" />
            <path d="M140 80 L180 60 L220 80 L180 100 Z" fill="white" />
            <path d="M180 100 L180 120 M180 120 C190 120 200 110 200 100" stroke="white" stroke-width="4" fill="none"/>
        </svg>
    </div>
    <!-- Decorative background elements -->
    <div style="position: absolute; top: -50%; right: -10%; width: 50%; height: 200%; background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%); border-radius: 50%; z-index: 1;"></div>
</div>

<!-- FILTERS TABS & SEARCH BAR -->
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 4px; max-width: 100%;" class="hide-scrollbar">
        <button class="btn btn-filter active" data-filter="all">Toutes <span id="courses-tab-all-count" style="margin-left:4px; opacity:0.7; font-size:0.85em;">(0)</span></button>
        <button class="btn btn-filter" data-filter="online">En ligne <span id="courses-tab-online-count" style="margin-left:4px; opacity:0.7; font-size:0.85em;">(0)</span></button>
        <button class="btn btn-filter" data-filter="offline">Présentielles <span id="courses-tab-offline-count" style="margin-left:4px; opacity:0.7; font-size:0.85em;">(0)</span></button>
        <button class="btn btn-filter" data-filter="free">Gratuites <span id="courses-tab-free-count" style="margin-left:4px; opacity:0.7; font-size:0.85em;">(0)</span></button>
        <button class="btn btn-filter" data-filter="cert">Certifiantes <span id="courses-tab-cert-count" style="margin-left:4px; opacity:0.7; font-size:0.85em;">(0)</span></button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="position: relative; width: 300px; max-width: 100%;">
            <svg width="18" height="18" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="courses-search" name="courses-search" placeholder="Rechercher une formation..." style="width: 100%; padding: 0.5rem 1rem 0.5rem 2.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white;">
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.9rem; color: var(--text-dark);">Trier par :</span>
            <select id="courses-sort" style="padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white; color: var(--text-dark); min-width: 140px;">
                <option value="relevance">Pertinence</option>
                <option value="recent">Plus récentes</option>
                <option value="duration">Durée</option>
                <option value="level">Niveau</option>
            </select>
        </div>
    </div>
</div>

<div class="grid-layout-3-1" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
    <!-- LEFT: MAIN CONTENT -->
    <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.25rem; color: var(--navy); margin: 0;">Résultats de la recherche</h3>
            <button id="refresh-courses-btn" class="btn btn-secondary" style="font-size:0.8rem; padding: 0.25rem 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Actualiser
            </button>
        </div>
        
        <!-- Courses List -->
        <div id="courses-list-container" style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Courses injected here -->
        </div>

        <!-- Loading State -->
        <div id="courses-loading-state" style="display: none; flex-direction: column; gap: 1rem;">
            <div class="card" style="padding: 1.5rem; display: flex; gap: 1.5rem;">
                <div class="skeleton" style="width: 100px; height: 100px; border-radius: 8px; flex-shrink: 0;"></div>
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
                    <div>
                        <div class="skeleton" style="width: 70%; height: 20px; border-radius: 4px; margin-bottom: 0.5rem;"></div>
                        <div class="skeleton" style="width: 30%; height: 14px; border-radius: 4px;"></div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
                        <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
                    </div>
                </div>
            </div>
            <div class="card" style="padding: 1.5rem; display: flex; gap: 1.5rem;">
                <div class="skeleton" style="width: 100px; height: 100px; border-radius: 8px; flex-shrink: 0;"></div>
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
                    <div>
                        <div class="skeleton" style="width: 80%; height: 20px; border-radius: 4px; margin-bottom: 0.5rem;"></div>
                        <div class="skeleton" style="width: 40%; height: 14px; border-radius: 4px;"></div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
                        <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div id="courses-empty-state" style="display: none; text-align: center; padding: 4rem 2rem; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
            <div style="width: 64px; height: 64px; background: #f8fafc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--text-muted);">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 id="courses-empty-title" style="font-size: 1.25rem; font-weight: 600; color: var(--navy); margin-bottom: 0.5rem;">Aucune formation ne correspond à vos critères.</h3>
            <p id="courses-empty-desc" style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">Veuillez analyser votre CV ou modifier vos critères de recherche.</p>
            <div id="courses-empty-actions" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <!-- Actions injected here -->
            </div>
        </div>

        <!-- BOTTOM GRID -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
            
            <!-- Recommandations personnalisées -->
            <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.1rem; color: var(--navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        <svg width="18" height="18" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        Recommandées pour vous
                    </h3>
                    <a href="#" style="font-size: 0.85rem; color: var(--blue); text-decoration: none;">Voir toutes &rarr;</a>
                </div>
                <div id="courses-recommended-container" style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Recommended courses injected here -->
                </div>
            </div>

            <!-- Parcours de formation -->
            <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.1rem; color: var(--navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        <svg width="18" height="18" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        Parcours de formation
                    </h3>
                </div>
                <div id="courses-path-container" style="position: relative; padding-left: 20px; border-left: 2px solid #e2e8f0; display: flex; flex-direction: column; gap: 1.25rem;">
                    <!-- Path steps injected here -->
                </div>
            </div>

            <!-- Catégories populaires -->
            <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.1rem; color: var(--navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        <svg width="18" height="18" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        Catégories populaires
                    </h3>
                    <a href="#" style="font-size: 0.85rem; color: var(--blue); text-decoration: none;">Voir toutes &rarr;</a>
                </div>
                <div id="courses-categories-container" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <!-- Categories injected here -->
                </div>
            </div>

        </div>
    </div>

    <!-- RIGHT: SIDEBAR FILTERS -->
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card" style="padding: 1.5rem; position: sticky; top: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; color: var(--navy); margin: 0;">Filtres</h3>
                <button id="btn-reset-filters" style="background: none; border: none; color: var(--blue); font-size: 0.85rem; cursor: pointer; padding: 0;">Réinitialiser</button>
            </div>
            
            <!-- Secteur -->
            <div style="margin-bottom: 1.25rem;">
                <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Secteur</label>
                <div style="position: relative;">
                    <svg width="16" height="16" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <select id="filter-sector" style="width: 100%; padding: 0.5rem 1rem 0.5rem 2.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white; appearance: none;">
                        <option value="">Tous les secteurs</option>
                    </select>
                </div>
            </div>

            <!-- Compétence cible -->
            <div style="margin-bottom: 1.25rem;">
                <label for="filter-skill" style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Compétence cible</label>
                        <select id="filter-skill" style="width: 100%; padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white;">
                    <option value="">Toutes les compétences</option>
                </select>
            </div>

            <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.25rem 0;">

            <!-- Niveau -->
            <div style="margin-bottom: 1.25rem;">
                <div style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Niveau</div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-level" name="filter-level" value="Débutant" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Débutant
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-level" name="filter-level" value="Intermédiaire" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Intermédiaire
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-level" name="filter-level" value="Avancé" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Avancé
                    </label>
                </div>
            </div>

            <!-- Type -->
            <div style="margin-bottom: 1.25rem;">
                <div style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Type</div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-type" name="filter-type" value="online" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        En ligne
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-type" name="filter-type" value="offline" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Présentielle
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-type" name="filter-type" value="free" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Gratuite
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-dark); cursor: pointer;">
                        <input type="checkbox" class="filter-type" name="filter-type" value="cert" style="accent-color: var(--blue); width: 16px; height: 16px;">
                        Certifiante
                    </label>
                </div>
            </div>

            <!-- Durée -->
            <div style="margin-bottom: 0;">
                <label for="filter-duration" style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Durée</label>
                        <select id="filter-duration" style="width: 100%; padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; background: white;">
                    <option value="">Toutes les durées</option>
                    <option value="short">< 10 heures</option>
                    <option value="medium">10-30 heures</option>
                    <option value="long">30-60 heures</option>
                    <option value="xl">60+ heures</option>
                </select>
            </div>
        </div>
    </div>
</div>

<!-- MODAL: COURSE DETAILS -->
<div id="modal-course" class="modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 100; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
    <div class="card" style="width: 100%; max-width: 600px; margin: 1rem; padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh;">
        <!-- Header -->
        <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; background: #f8fafc;">
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div id="modal-course-logo" style="width: 48px; height: 48px; border-radius: 8px; background: var(--navy); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; overflow: hidden;">
                    <!-- Logo / initial injected here -->
                </div>
                <div>
                    <h3 id="modal-course-title" style="font-size: 1.25rem; color: var(--navy); margin: 0 0 0.25rem 0; line-height: 1.3;"></h3>
                    <div id="modal-course-provider" style="font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem;">
                        <!-- Provider injected here -->
                    </div>
                </div>
            </div>
            <button id="modal-course-close" style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.25rem;">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        
        <!-- Body (Scrollable) -->
        <div style="padding: 1.5rem; overflow-y: auto;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark);">
                    <svg width="16" height="16" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    <span id="modal-course-level"></span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark);">
                    <svg width="16" height="16" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span id="modal-course-duration"></span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark);">
                    <svg width="16" height="16" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span id="modal-course-format"></span>
                </div>
                <div id="modal-course-cert-container" style="display: none; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #16a34a;">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    Certifiante
                </div>
            </div>

            <h4 style="font-size: 1rem; color: var(--navy); margin: 0 0 0.5rem 0;">Description</h4>
            <p id="modal-course-desc" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;"></p>

            <h4 style="font-size: 1rem; color: var(--navy); margin: 0 0 0.5rem 0;">Compétences visées</h4>
            <div id="modal-course-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                <!-- Tags injected here -->
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Prix</div>
                    <div id="modal-course-price" style="font-size: 1.1rem; font-weight: 600; color: var(--navy);"></div>
                </div>
                <div id="modal-course-date" style="font-size: 0.85rem; color: var(--text-muted);">
                    <!-- Date injected here -->
                </div>
            </div>
        </div>
        
        <!-- Footer Actions -->
        <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); background: #f8fafc; display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="modal-course-bookmark" class="btn btn-secondary" style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                <span class="btn-text">Enregistrer</span>
            </button>
            <a id="modal-course-link" href="#" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                Accéder à la formation
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
        </div>
    </div>
</div>

`,
  opportunities: `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 2rem;">
            <div>
                <h1 style="font-size: 2rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; display:flex; align-items:center; gap:1rem;">
                    Opportunités
                    <span id="opportunities-mode-badge"></span>
                </h1>
                <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px;">
                    Trouvez des opportunités adaptées à votre profil, vos compétences et votre secteur.
                </p>
            </div>
            <button class="btn btn-secondary" style="display:flex; align-items:center; gap:0.5rem;" onclick="document.getElementById('modal-job-alerts').style.display='flex'">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                Alertes emploi
            </button>
        </div>

        <!-- HERO BANNER -->
        <div style="background: linear-gradient(135deg, var(--navy) 0%, #1e3a8a 100%); border-radius: 16px; padding: 2.5rem; color: white; margin-bottom: 2rem; display:flex; gap: 2rem; align-items: center; position:relative; overflow:hidden;">
            <svg width="300" height="300" style="position:absolute; right:-50px; top:-100px; opacity:0.1;" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/></svg>
            <div style="flex: 1; z-index:1;">
                <h2 style="font-size: 2rem; margin: 0 0 1rem 0; font-weight: 700; line-height: 1.2;">Trouvez l'opportunité qui<br>correspond à <span style="color: #60a5fa;">votre profil</span>.</h2>
                <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 1.5rem; max-width: 500px; line-height: 1.5;">
                    Découvrez des offres d'emploi, de stage et de freelance adaptées à vos compétences et à vos objectifs professionnels.
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <span style="color: #4ade80;">✓</span> Offres personnalisées
                    </span>
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <span style="color: #4ade80;">✓</span> Multi-secteurs
                    </span>
                    <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                        <span style="color: #4ade80;">✓</span> Mises à jour régulières
                    </span>
                </div>
            </div>
            <div style="flex: 1; display:flex; justify-content:center; align-items:center; z-index:1; position:relative;">
                <!-- Abstract Illustration -->
                <div style="position:relative; width:100%; max-width:350px; height:200px;">
                    <div style="position:absolute; right:20%; top:10%; width:180px; height:120px; background:linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius:12px; transform:rotate(5deg); opacity:0.8; box-shadow:0 10px 25px rgba(0,0,0,0.2);"></div>
                    <div style="position:absolute; left:10%; top:30%; width:220px; height:140px; background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); border-radius:12px; display:flex; flex-direction:column; padding:1.5rem; gap:1rem;">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <div style="width:40px; height:40px; border-radius:8px; background:var(--blue); color:white; display:flex; align-items:center; justify-content:center;"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                            <div>
                                <div style="width:80px; height:10px; background:rgba(255,255,255,0.3); border-radius:5px; margin-bottom:6px;"></div>
                                <div style="width:120px; height:10px; background:rgba(255,255,255,0.1); border-radius:5px;"></div>
                            </div>
                        </div>
                        <div style="display:flex; gap:0.5rem;">
                            <div style="width:60px; height:20px; background:rgba(255,255,255,0.15); border-radius:10px;"></div>
                            <div style="width:80px; height:20px; background:rgba(255,255,255,0.15); border-radius:10px;"></div>
                        </div>
                        <div style="margin-top:auto; width:100%; height:8px; background:rgba(255,255,255,0.2); border-radius:4px; overflow:hidden;">
                            <div style="width:87%; height:100%; background:#4ade80;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TABS & SEARCH BAR -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; gap:1rem; overflow-x:auto; padding-bottom:0.5rem; flex:1;">
                <button class="btn-filter-opp active" data-filter="all" style="padding: 0.6rem 1.2rem; border-radius: 20px; border:none; background: var(--blue); color: white; font-weight: 500; cursor: pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap; transition:all 0.2s;">
                    Toutes <span id="opp-tab-all-count" style="background:rgba(255,255,255,0.2); padding:0.1rem 0.4rem; border-radius:10px; font-size:0.8rem;">(0)</span>
                </button>
                <button class="btn-filter-opp" data-filter="emploi" style="padding: 0.6rem 1.2rem; border-radius: 20px; border: 1px solid var(--border-color); background: white; color: var(--text-dark); font-weight: 500; cursor: pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap; transition:all 0.2s;">
                    Emploi <span id="opp-tab-emploi-count" style="color:var(--text-muted); font-size:0.8rem;">(0)</span>
                </button>
                <button class="btn-filter-opp" data-filter="stage" style="padding: 0.6rem 1.2rem; border-radius: 20px; border: 1px solid var(--border-color); background: white; color: var(--text-dark); font-weight: 500; cursor: pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap; transition:all 0.2s;">
                    Stage <span id="opp-tab-stage-count" style="color:var(--text-muted); font-size:0.8rem;">(0)</span>
                </button>
                <button class="btn-filter-opp" data-filter="freelance" style="padding: 0.6rem 1.2rem; border-radius: 20px; border: 1px solid var(--border-color); background: white; color: var(--text-dark); font-weight: 500; cursor: pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap; transition:all 0.2s;">
                    Freelance <span id="opp-tab-freelance-count" style="color:var(--text-muted); font-size:0.8rem;">(0)</span>
                </button>
                <button class="btn-filter-opp" data-filter="remote" style="padding: 0.6rem 1.2rem; border-radius: 20px; border: 1px solid var(--border-color); background: white; color: var(--text-dark); font-weight: 500; cursor: pointer; display:flex; align-items:center; gap:0.5rem; white-space:nowrap; transition:all 0.2s;">
                    Remote <span id="opp-tab-remote-count" style="color:var(--text-muted); font-size:0.8rem;">(0)</span>
                </button>
            </div>
            
            <div style="display:flex; align-items:center; gap:1rem;">
                <div class="search-box" style="width: 300px; background: white; border: 1px solid var(--border-color);">
                    <svg width="18" height="18" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input type="text" id="opp-search" name="opp-search" placeholder="Rechercher un poste, une entreprise..." style="background:transparent; border:none; outline:none; width:100%;">
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; background:white; padding:0.5rem 1rem; border-radius:8px; border:1px solid var(--border-color);">
                    <span style="font-size:0.9rem; color:var(--text-muted); white-space:nowrap;">Trier par :</span>
                    <select id="opp-sort" style="border:none; outline:none; background:transparent; font-weight:500; color:var(--navy); cursor:pointer;">
                        <option value="relevance">Pertinence</option>
                        <option value="recent">Plus récentes</option>
                        <option value="match">Correspondance</option>
                    </select>
                </div>
                <button class="btn btn-secondary btn-icon" id="refresh-opp-btn" title="Actualiser la recherche">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
            </div>
        </div>

        <div class="grid-70-30" style="gap:2rem;">
            
            <!-- LEFT COLUMN: Opportunities List -->
            <div>
                <h3 style="font-size: 1.2rem; color: var(--navy); margin-bottom: 1rem; display:flex; justify-content:space-between; align-items:center;">
                    Liste des opportunités
                </h3>
                
                <div id="opportunities-loading-state" style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem;">
                    <div style="display:flex; gap:1rem; padding:1.5rem; background:white; border-radius:12px; border:1px solid var(--border-color);">
                        <div class="skeleton" style="width:60px; height:60px; border-radius:8px;"></div>
                        <div style="flex:1;">
                            <div class="skeleton" style="width:50%; height:20px; margin-bottom:0.5rem;"></div>
                            <div class="skeleton" style="width:30%; height:15px; margin-bottom:1rem;"></div>
                            <div class="skeleton" style="width:100%; height:10px; margin-bottom:0.5rem;"></div>
                            <div class="skeleton" style="width:80%; height:10px;"></div>
                        </div>
                    </div>
                    <div style="display:flex; gap:1rem; padding:1.5rem; background:white; border-radius:12px; border:1px solid var(--border-color);">
                        <div class="skeleton" style="width:60px; height:60px; border-radius:8px;"></div>
                        <div style="flex:1;">
                            <div class="skeleton" style="width:60%; height:20px; margin-bottom:0.5rem;"></div>
                            <div class="skeleton" style="width:40%; height:15px; margin-bottom:1rem;"></div>
                            <div class="skeleton" style="width:90%; height:10px; margin-bottom:0.5rem;"></div>
                            <div class="skeleton" style="width:70%; height:10px;"></div>
                        </div>
                    </div>
                </div>

                <div id="opportunities-empty-state" style="display:none; text-align:center; padding:4rem 2rem; background:white; border-radius:12px; border:1px dashed var(--border-color); margin-top:1rem;">
                    <svg width="48" height="48" fill="none" stroke="var(--border-color)" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:1rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <h3 id="opp-empty-title" style="font-size:1.2rem; color:var(--navy); margin-bottom:0.5rem;">Aucune opportunité trouvée</h3>
                    <p id="opp-empty-desc" style="color:var(--text-muted); margin-bottom:1.5rem; max-width:400px; margin-left:auto; margin-right:auto;">
                        Modifiez vos critères de recherche ou réinitialisez les filtres.
                    </p>
                    <div id="opp-empty-actions">
                        <button class="btn btn-secondary" id="btn-reset-opp-filters">Réinitialiser les filtres</button>
                    </div>
                </div>

                <div id="opportunities-list-container" style="display:flex; flex-direction:column; gap:1rem;">
                    <!-- Cards injected via app.js -->
                </div>
            </div>

            <!-- RIGHT COLUMN: Filters & Stats -->
            <div style="display:flex; flex-direction:column; gap:1.5rem;">
                
                <!-- Filters -->
                <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1.1rem; margin:0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            Filtres
                        </h3>
                        <button id="btn-reset-filters-side" class="btn btn-icon" style="color:var(--blue); font-size:0.85rem; padding:0; background:none;">Réinitialiser</button>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:1.25rem;">
                        <div>
                            <label for="opp-filter-sector" style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-dark); margin-bottom:0.5rem;">Secteur</label>
                        <select id="opp-filter-sector" class="form-input" style="width:100%; padding:0.6rem; font-size:0.9rem;">
                                <option value="all">Tous les secteurs</option>
                                <!-- Injected dynamically -->
                            </select>
                        </div>

                        <div>
                            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-dark); margin-bottom:0.5rem;">Type de contrat</label>
                            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-contract" name="opp-filter-contract" value="cdi"> CDI
                                </label>
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-contract" name="opp-filter-contract" value="cdd"> CDD
                                </label>
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-contract" name="opp-filter-contract" value="stage"> Stage
                                </label>
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-contract" name="opp-filter-contract" value="freelance"> Freelance
                                </label>
                            </div>
                        </div>

                        <div>
                            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-dark); margin-bottom:0.5rem;">Mode de travail</label>
                            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-workmode" name="opp-filter-workmode" value="onsite"> Sur site
                                </label>
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-workmode" name="opp-filter-workmode" value="hybrid"> Hybride
                                </label>
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.85rem; color:var(--text-muted); cursor:pointer;">
                                    <input type="checkbox" class="opp-filter-workmode" name="opp-filter-workmode" value="remote"> Remote
                                </label>
                            </div>
                        </div>

                        <div>
                            <label for="opp-filter-experience" style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-dark); margin-bottom:0.5rem;">Niveau d'expérience</label>
                        <select id="opp-filter-experience" class="form-input" style="width:100%; padding:0.6rem; font-size:0.9rem;">
                                <option value="">Tous les niveaux</option>
                                <option value="Débutant">Débutant (0-2 ans)</option>
                                <option value="Intermédiaire">Intermédiaire (3-5 ans)</option>
                                <option value="Avancé">Avancé (5-8 ans)</option>
                                <option value="Senior">Senior (8+ ans)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="opp-filter-location" style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-dark); margin-bottom:0.5rem;">Localisation</label>
                        <select id="opp-filter-location" class="form-input" style="width:100%; padding:0.6rem; font-size:0.9rem;">
                                <option value="">Toutes les villes</option>
                                <option value="Casablanca">Casablanca</option>
                                <option value="Rabat">Rabat</option>
                                <option value="Marrakech">Marrakech</option>
                                <option value="Tanger">Tanger</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Statistiques -->
                <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                    <h3 style="font-size: 1.1rem; margin: 0 0 1rem 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                        Statistiques
                    </h3>
                    
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem;">
                        <div style="width:48px; height:48px; border-radius:12px; background:var(--primary-gradient); display:flex; align-items:center; justify-content:center; color:white;">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <div id="opp-stat-total" style="font-size:1.8rem; font-weight:700; color:var(--navy); line-height:1;">0</div>
                            <div style="font-size:0.85rem; color:var(--text-muted);">opportunités trouvées</div>
                        </div>
                    </div>
                    
                    <div style="display:flex; align-items:center; gap:0.5rem; padding:0.75rem; background:#f0fdf4; border-radius:8px; margin-bottom:1.5rem;">
                        <svg width="20" height="20" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        <div style="font-size:0.85rem; color:var(--text-dark);">
                            <strong style="color:#16a34a;">+12%</strong> par rapport au mois dernier
                        </div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.75rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
                            <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-dark);">
                                <svg width="16" height="16" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Emplois
                            </div>
                            <strong id="opp-stat-emploi">0</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
                            <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-dark);">
                                <svg width="16" height="16" fill="none" stroke="#ca8a04" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg> Stages
                            </div>
                            <strong id="opp-stat-stage">0</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
                            <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-dark);">
                                <svg width="16" height="16" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Freelance
                            </div>
                            <strong id="opp-stat-freelance">0</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
                            <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-dark);">
                                <svg width="16" height="16" fill="none" stroke="#8b5cf6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Remote
                            </div>
                            <strong id="opp-stat-remote">0</strong>
                        </div>
                    </div>
                </div>

                <!-- Entreprises qui recrutent -->
                <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                        <h3 style="font-size: 1.1rem; margin:0; color:var(--navy);">Entreprises qui recrutent</h3>
                        <a href="#" style="font-size:0.8rem; color:var(--blue); text-decoration:none;" onclick="event.preventDefault();">Voir toutes &rarr;</a>
                    </div>
                    <div id="opp-companies-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem;">
                        <!-- Injected dynamically -->
                    </div>
                </div>

                <!-- Alertes emploi -->
                <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none; background:#faf5ff;">
                    <h3 style="font-size: 1.1rem; margin:0 0 0.5rem 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                        <svg width="20" height="20" fill="none" stroke="#9333ea" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        Alertes emploi
                    </h3>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.5;">
                        Recevez des notifications pour les nouvelles opportunités qui correspondent à votre profil.
                    </p>
                    <button class="btn btn-secondary" style="width:100%; border:1px solid #d8b4fe; color:#9333ea; background:white;" onclick="document.getElementById('modal-job-alerts').style.display='flex'">
                        Configurer mes alertes &rarr;
                    </button>
                </div>

            </div>
        </div>

        <!-- Job Modal -->
        <div id="modal-job" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="max-width: 800px; padding: 0;">
                <div style="padding: 2rem; border-bottom: 1px solid var(--border-color); position:relative;">
                    <button id="modal-job-close" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">&times;</button>
                    
                    <div style="display:flex; gap:1.5rem; align-items:flex-start;">
                        <div id="modal-job-logo" style="width: 80px; height: 80px; border-radius: 12px; background: var(--blue); color: white; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; flex-shrink: 0; font-family: sans-serif;"></div>
                        <div style="flex:1;">
                            <h2 id="modal-job-title" style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: var(--navy);">Titre</h2>
                            <div style="font-size: 1.1rem; color: var(--text-dark); margin-bottom: 0.5rem; font-weight:500;" id="modal-job-company">Entreprise</div>
                            
                            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:1rem;">
                                <span class="tag" style="background:#f1f5f9; color:var(--text-dark);"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <span id="modal-job-location">Localisation</span></span>
                                <span class="tag" style="background:#eff6ff; color:var(--blue);"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <span id="modal-job-contract">Contrat</span></span>
                                <span class="tag" style="background:#f0fdf4; color:#16a34a;"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> <span id="modal-job-workmode">Mode</span></span>
                                <span class="tag" style="background:#fefce8; color:#ca8a04;"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:4px; vertical-align:text-bottom;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <span id="modal-job-exp">Expérience</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 2rem;">
                    <div class="grid-70-30" style="gap:2rem;">
                        <div>
                            <h3 style="font-size: 1.1rem; color: var(--navy); margin-bottom: 1rem;">Description du poste</h3>
                            <div id="modal-job-desc" style="font-size: 0.95rem; color: var(--text-dark); line-height: 1.6; white-space: pre-wrap; margin-bottom: 2rem;"></div>
                            
                            <h3 style="font-size: 1.1rem; color: var(--navy); margin-bottom: 1rem;">Compétences requises</h3>
                            <div id="modal-job-skills" style="display:flex; flex-wrap:wrap; gap:0.5rem;"></div>
                        </div>
                        
                        <div>
                            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 0.5px;">Détails</h4>
                                <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:var(--text-muted);">Secteur</span>
                                        <strong id="modal-job-sector" style="color:var(--navy); text-align:right;">-</strong>
                                    </div>
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:var(--text-muted);">Publication</span>
                                        <strong id="modal-job-date" style="color:var(--navy); text-align:right;">-</strong>
                                    </div>
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:var(--text-muted);">Source</span>
                                        <strong id="modal-job-source" style="color:var(--navy); text-align:right;">-</strong>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="modal-job-match-container" style="background: #f0fdf4; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid #bbf7d0;">
                                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                                    <span style="font-size:1.5rem; font-weight:700; color:#16a34a;" id="modal-job-match-score">87%</span>
                                    <span style="font-size:0.9rem; color:#16a34a; font-weight:600;">Compatible</span>
                                </div>
                                <p style="font-size:0.8rem; color:#15803d; margin:0; line-height:1.4;">
                                    Correspondance basée sur vos compétences et votre objectif professionnel.
                                </p>
                            </div>
                            
                            <a href="#" id="modal-job-apply" target="_blank" class="btn btn-primary" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem; padding: 0.75rem;">
                                Postuler
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alertes Modal -->
        <div id="modal-job-alerts" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="max-width: 500px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                    <h2 style="margin:0; font-size:1.3rem; color:var(--navy);">Configurer mes alertes</h2>
                    <button onclick="document.getElementById('modal-job-alerts').style.display='none'" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
                </div>
                <form id="job-alerts-form" onsubmit="event.preventDefault(); document.getElementById('modal-job-alerts').style.display='none'; UI.showToast('Vos alertes emploi ont été configurées', 'success');">
                    <div class="form-group">
                        <label for="alert-job" class="form-label">Métier / Mot-clé</label>
                            <input id="alert-job" type="text" class="form-input" placeholder="Ex: Développeur React, Chef de projet..." value="Développeur">
                    </div>
                    <div class="form-group">
                        <label for="alert-location" class="form-label">Localisation</label>
                            <input id="alert-location" type="text" class="form-input" placeholder="Ex: Rabat, Remote..." value="Rabat">
                    </div>
                    <div class="form-group">
                        <label for="alert-contract" class="form-label">Type de contrat</label>
                            <select id="alert-contract" class="form-input">
                            <option>Tous les contrats</option>
                            <option selected>CDI</option>
                            <option>Stage</option>
                            <option>Freelance</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="alert-frequency" class="form-label">Fréquence</label>
                            <select id="alert-frequency" class="form-input">
                            <option>Quotidienne</option>
                            <option selected>Hebdomadaire</option>
                            <option>Immédiate</option>
                        </select>
                    </div>
                    <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:2rem;">
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal-job-alerts').style.display='none'">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    `,
  feedback: `
        <div class="card">
            <h2 class="card-header">Donner votre avis</h2>
            <form id="feedback-form">
                <div class="form-group">
                    <label for="feedback-rating" class="form-label">Ces recommandations sont-elles pertinentes ? (1 à 5)</label>
                <select id="feedback-rating" class="form-control">
                        <option value="5">★★★★★ - Excellent</option>
                        <option value="4">★★★★☆ - Très bien</option>
                        <option value="3">★★★☆☆ - Moyen</option>
                        <option value="2">★★☆☆☆ - Passable</option>
                        <option value="1">★☆☆☆☆ - Mauvais</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Que peut-on améliorer ?</label>
                    <textarea id="feedback-text" class="form-control" rows="4"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Envoyer le feedback</button>
            </form>
        </div>
    `,
roadmap: `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 2rem; flex-wrap:wrap; gap:1rem;">
            <div>
                <h1 style="font-size: 2rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; display:flex; align-items:center; gap:1rem;">
                    Ma Feuille de route
                    <span id="roadmap-mode-badge"></span>
                </h1>
                <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px;">
                    Un plan personnalisé pour atteindre vos objectifs professionnels étape par étape.
                </p>
            </div>
            <div style="display:flex; gap:1rem;">
                <button class="btn btn-secondary" style="display:flex; align-items:center; gap:0.5rem;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Exporter mon plan
                </button>
                <button class="btn btn-primary" style="display:flex; align-items:center; gap:0.5rem;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Modifier mes objectifs
                </button>
            </div>
        </div>

        <div id="roadmap-loading-state" style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem;">
            <div style="padding:2rem; background:white; border-radius:16px; border:1px solid var(--border-color); text-align:center;">
                <div class="skeleton" style="width:100px; height:100px; border-radius:50%; margin:0 auto 1.5rem auto;"></div>
                <h3 style="color:var(--navy); margin-bottom:1rem;">Préparation de votre feuille de route...</h3>
                <div class="skeleton" style="width:60%; height:20px; margin:0 auto 1rem auto;"></div>
                <div class="skeleton" style="width:40%; height:15px; margin:0 auto;"></div>
            </div>
        </div>

        <div id="roadmap-empty-state" style="display:none; text-align:center; padding:4rem 2rem; background:white; border-radius:16px; border:1px dashed var(--border-color);">
            <svg width="48" height="48" fill="none" stroke="var(--border-color)" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:1rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            <h3 id="roadmap-empty-title" style="font-size:1.2rem; color:var(--navy); margin-bottom:0.5rem;">Votre feuille de route n'est pas encore disponible.</h3>
            <p id="roadmap-empty-desc" style="color:var(--text-muted); margin-bottom:1.5rem; max-width:400px; margin-left:auto; margin-right:auto;">
                Complétez votre profil ou analysez votre CV pour générer un parcours personnalisé.
            </p>
            <div id="roadmap-empty-actions" style="display:flex; gap:1rem; justify-content:center;">
                <button class="btn btn-primary" onclick="App.navigate('upload')">Analyser mon CV</button>
                <button class="btn btn-secondary" onclick="App.navigate('profile')">Compléter mon profil</button>
            </div>
        </div>

        <div id="roadmap-content" style="display:none; flex-direction:column; gap:2rem;">
            <!-- HERO BANNER -->
            <div style="background: linear-gradient(135deg, var(--navy) 0%, #1e3a8a 100%); border-radius: 16px; padding: 2.5rem; color: white; display:flex; gap: 2rem; align-items: center; position:relative; overflow:hidden;">
                <div style="flex: 1; z-index:1;">
                    <h2 style="font-size: 2rem; margin: 0 0 1rem 0; font-weight: 700; line-height: 1.2;">Un parcours clair vers<br><span style="color: #60a5fa;">vos objectifs professionnels</span></h2>
                    <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 1.5rem; max-width: 500px; line-height: 1.5;">
                        Mihnati génère une feuille de route personnalisée basée sur votre profil, vos compétences actuelles et les opportunités du marché.
                    </p>
                    <div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
                        <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                            <span style="color: #4ade80;">✓</span> Plan personnalisé
                        </span>
                        <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                            <span style="color: #4ade80;">✓</span> Étapes concrètes
                        </span>
                        <span class="tag" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
                            <span style="color: #4ade80;">✓</span> Adapté à votre secteur
                        </span>
                    </div>
                </div>
                <div style="flex: 1; display:flex; justify-content:center; align-items:center; z-index:1; position:relative;">
                    <!-- Abstract Illustration: Roadmap nodes -->
                    <div style="position:relative; width:100%; max-width:400px; height:200px;">
                        <!-- Winding path -->
                        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style="position:absolute; top:0; left:0;">
                            <path d="M50 150 C 100 150, 150 50, 200 50 C 250 50, 300 150, 350 100" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-dasharray="8 8" fill="none"/>
                            <path d="M50 150 C 100 150, 150 50, 200 50" stroke="#60a5fa" stroke-width="4" fill="none"/>
                        </svg>
                        
                        <!-- Nodes -->
                        <div style="position:absolute; left:50px; top:150px; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
                            <div style="width:36px; height:36px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--navy); box-shadow:0 4px 10px rgba(0,0,0,0.2);">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <span style="background:rgba(0,0,0,0.5); padding:2px 8px; border-radius:10px; font-size:0.7rem;">Profil</span>
                        </div>
                        
                        <div style="position:absolute; left:200px; top:50px; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
                            <div style="width:36px; height:36px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--blue); box-shadow:0 4px 10px rgba(0,0,0,0.2);">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <span style="background:rgba(0,0,0,0.5); padding:2px 8px; border-radius:10px; font-size:0.7rem;">Compétences</span>
                        </div>
                        
                        <div style="position:absolute; left:350px; top:100px; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
                            <div style="width:44px; height:44px; background:#4ade80; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--navy); box-shadow:0 4px 15px rgba(74,222,128,0.4); border:3px solid white;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <span style="background:rgba(0,0,0,0.5); padding:2px 8px; border-radius:10px; font-size:0.7rem; font-weight:bold; color:#4ade80;">Objectif</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TIMELINE HEADER -->
            <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none; overflow-x:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; min-width:800px; position:relative;">
                    <div style="position:absolute; top:24px; left:40px; right:40px; height:2px; background:var(--border-color); z-index:0;"></div>
                    <div id="roadmap-progress-line" style="position:absolute; top:24px; left:40px; width:20%; height:2px; background:var(--green); z-index:1; transition:width 0.5s;"></div>
                    
                    <div class="timeline-step active" style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:120px; text-align:center;">
                        <div style="width:48px; height:48px; border-radius:50%; background:var(--blue); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; border:4px solid white; box-shadow:0 0 0 1px var(--blue);">1</div>
                        <div style="font-size:0.85rem; font-weight:600; color:var(--navy);">Compétences de base</div>
                    </div>
                    <div class="timeline-step" style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:120px; text-align:center;">
                        <div style="width:48px; height:48px; border-radius:50%; background:#f1f5f9; color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; border:4px solid white; box-shadow:0 0 0 1px var(--border-color);">2</div>
                        <div style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">Compétences avancées</div>
                    </div>
                    <div class="timeline-step" style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:120px; text-align:center;">
                        <div style="width:48px; height:48px; border-radius:50%; background:#f1f5f9; color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; border:4px solid white; box-shadow:0 0 0 1px var(--border-color);">3</div>
                        <div style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">Formations</div>
                    </div>
                    <div class="timeline-step" style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:120px; text-align:center;">
                        <div style="width:48px; height:48px; border-radius:50%; background:#f1f5f9; color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; border:4px solid white; box-shadow:0 0 0 1px var(--border-color);">4</div>
                        <div style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">Expérience pratique</div>
                    </div>
                    <div class="timeline-step" style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:120px; text-align:center;">
                        <div style="width:48px; height:48px; border-radius:50%; background:#f1f5f9; color:var(--text-muted); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; border:4px solid white; box-shadow:0 0 0 1px var(--border-color);">5</div>
                        <div style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">Opportunités</div>
                    </div>
                </div>
            </div>

            <!-- MAIN GRID -->
            <div class="grid-70-30" style="gap:2rem;">
                
                <!-- LEFT COL -->
                <div style="display:flex; flex-direction:column; gap:2rem;">
                    
                    <!-- Roadmap Details Accordion -->
                    <div class="card" style="padding: 0; border:1px solid var(--border-color); box-shadow:none; overflow:hidden;">
                        <div style="padding:1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; background:#f8fafc;">
                            <div>
                                <h3 style="font-size: 1.1rem; margin:0 0 0.25rem 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                                    <svg width="20" height="20" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                                    Détail de ma feuille de route
                                </h3>
                                <p style="font-size:0.9rem; color:var(--text-muted); margin:0;">Suivez les étapes recommandées et complétez chaque objectif pour progresser.</p>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:var(--text-dark); background:white; padding:0.5rem 1rem; border-radius:8px; border:1px solid var(--border-color);">
                                Vue détaillée
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        
                        <div id="roadmap-steps-container" style="display:flex; flex-direction:column;">
                            <!-- Injected dynamically -->
                        </div>
                    </div>
                    
                    <!-- Formations et Opportunités -->
                    <div class="grid-2" style="gap:1.5rem;">
                        <!-- Formations -->
                        <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                                <h3 style="font-size: 1rem; margin:0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                                    <svg width="18" height="18" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                                    Formations recommandées
                                </h3>
                                <a href="#courses" onclick="App.navigate('courses')" style="font-size:0.8rem; color:var(--blue); text-decoration:none; display:flex; align-items:center; gap:0.25rem;">Voir toutes <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>
                            </div>
                            <div id="roadmap-recommended-courses" style="display:flex; flex-direction:column; gap:1rem;">
                                <!-- Injected dynamically -->
                            </div>
                        </div>
                        
                        <!-- Opportunités -->
                        <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                                <h3 style="font-size: 1rem; margin:0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                                    <svg width="18" height="18" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    Opportunités correspondantes
                                </h3>
                                <a href="#opportunities" onclick="App.navigate('opportunities')" style="font-size:0.8rem; color:var(--blue); text-decoration:none; display:flex; align-items:center; gap:0.25rem;">Voir toutes <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>
                            </div>
                            <div id="roadmap-recommended-jobs" style="display:flex; flex-direction:column; gap:1rem;">
                                <!-- Injected dynamically -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COL -->
                <div style="display:flex; flex-direction:column; gap:2rem;">
                    
                    <!-- Global Progression -->
                    <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                        <h3 style="font-size: 1.1rem; margin: 0 0 1.5rem 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            Progression globale
                        </h3>
                        
                        <div style="display:flex; align-items:center; gap:1.5rem;">
                            <div style="position:relative; width:80px; height:80px; flex-shrink:0;">
                                <svg width="80" height="80" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="10"></circle>
                                    <circle id="roadmap-progress-circle" cx="50" cy="50" r="40" fill="none" stroke="var(--green)" stroke-width="10" stroke-dasharray="251.2" stroke-dashoffset="251.2" stroke-linecap="round" transform="rotate(-90 50 50)" style="transition: stroke-dashoffset 1s ease-out;"></circle>
                                </svg>
                                <div id="roadmap-progress-text" style="position:absolute; top:0; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700; color:var(--navy);">
                                    0%
                                </div>
                            </div>
                            <div>
                                <h4 style="margin:0 0 0.25rem 0; font-size:1rem; color:var(--green);" id="roadmap-progress-status">En cours</h4>
                                <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">
                                    Continuez à avancer pour atteindre vos objectifs professionnels.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Objectifs Professionnels -->
                    <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.1rem; margin: 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                Mes objectifs
                            </h3>
                            <button class="btn btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px;" onclick="App.navigate('profile')">Modifier</button>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:1rem;">
                            <div style="display:flex; gap:0.75rem; align-items:flex-start;">
                                <div style="color:var(--blue); margin-top:2px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                                <div>
                                    <div style="font-size:0.8rem; font-weight:600; color:var(--navy);">Métier cible</div>
                                    <div style="font-size:0.9rem; color:var(--text-dark);" id="roadmap-obj-role">-</div>
                                </div>
                            </div>
                            <div style="display:flex; gap:0.75rem; align-items:flex-start;">
                                <div style="color:var(--green); margin-top:2px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>
                                <div>
                                    <div style="font-size:0.8rem; font-weight:600; color:var(--navy);">Secteur</div>
                                    <div style="font-size:0.9rem; color:var(--text-dark);" id="roadmap-obj-sector">-</div>
                                </div>
                            </div>
                            <div style="display:flex; gap:0.75rem; align-items:flex-start;">
                                <div style="color:var(--blue); margin-top:2px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                                <div>
                                    <div style="font-size:0.8rem; font-weight:600; color:var(--navy);">Type de contrat</div>
                                    <div style="font-size:0.9rem; color:var(--text-dark);" id="roadmap-obj-contract">-</div>
                                </div>
                            </div>
                            <div style="display:flex; gap:0.75rem; align-items:flex-start;">
                                <div style="color:#ca8a04; margin-top:2px;"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                                <div>
                                    <div style="font-size:0.8rem; font-weight:600; color:var(--navy);">Localisation souhaitée</div>
                                    <div style="font-size:0.9rem; color:var(--text-dark);" id="roadmap-obj-location">-</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions Prioritaires -->
                    <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.1rem; margin: 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Actions prioritaires
                            </h3>
                            <a href="#" onclick="event.preventDefault(); document.querySelectorAll('.roadmap-step-header')[0].click();" style="font-size:0.8rem; color:var(--blue); text-decoration:none;">Voir tout &rarr;</a>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:1rem;" id="roadmap-priority-actions">
                            <!-- Injected dynamically -->
                        </div>
                    </div>

                    <!-- Ressources Utiles -->
                    <div class="card" style="padding: 1.5rem; border:1px solid var(--border-color); box-shadow:none; background:#f8fafc;">
                        <h3 style="font-size: 1.1rem; margin: 0 0 1rem 0; color:var(--navy); display:flex; align-items:center; gap:0.5rem;">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            Ressources utiles
                        </h3>
                        
                        <div style="display:flex; flex-direction:column; gap:0.75rem;" id="roadmap-resources">
                            <!-- Dynamically populated or static fallback -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `,
};
