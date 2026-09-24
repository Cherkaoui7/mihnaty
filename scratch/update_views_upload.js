const fs = require('fs');

const viewsFile = 'pages/views.js';
let viewsContent = fs.readFileSync(viewsFile, 'utf8');

const uploadStart = viewsContent.indexOf('upload: `');
const nextViewStart = viewsContent.indexOf('skills: `', uploadStart);

if (uploadStart === -1 || nextViewStart === -1) {
    console.error("Could not find upload: or skills: in views.js");
    process.exit(1);
}

const newUploadTemplate = `upload: \`
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
\`,
`;

viewsContent = viewsContent.substring(0, uploadStart) + newUploadTemplate + viewsContent.substring(nextViewStart);
fs.writeFileSync('pages/views.js', viewsContent, 'utf8');
console.log("Updated pages/views.js successfully.");
