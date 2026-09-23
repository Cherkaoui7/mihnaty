const Views = {
  dashboard: `
        <div class="header-card card" style="position:relative;">
            <div id="live-demo-badge" style="position:absolute; top:1rem; right:1rem;"></div>
            <h2>Bonjour <span id="dashboard-user-name">Visiteur</span> 👋</h2>
            <div style="margin-top:1rem; color:var(--text-muted); line-height: 1.6;">
                Profil: <strong id="dash-role" style="color:var(--text-color);">-</strong><br>
                Secteur: <strong id="dash-sector" style="color:var(--text-color);">-</strong>
            </div>
        </div>
        <div class="grid-2">
            <div class="card">
                <h3 class="card-header">Compétences Détectées (<span id="dash-skills-count">0</span>)</h3>
                <div id="dashboard-skills" style="display:flex; flex-wrap:wrap; gap:0.5rem;"><i>Aucune donnée. Analysez votre CV.</i></div>
            </div>
            <div class="card">
                <h3 class="card-header">À développer (<span id="dash-gaps-count">0</span>)</h3>
                <div id="dashboard-to-develop"><i>Aucune donnée.</i></div>
            </div>
        </div>
        <div class="grid-2">
            <div class="card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <h3 style="margin:0;">Top Opportunités</h3>
                    <a href="#" onclick="App.navigate('opportunities')" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">Voir tout</a>
                </div>
                <div id="dashboard-jobs-preview"><i>Analysez votre CV.</i></div>
            </div>
            <div class="card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <h3 style="margin:0;">Top Formations</h3>
                    <a href="#" onclick="App.navigate('courses')" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">Voir tout</a>
                </div>
                <div id="dashboard-courses-preview"><i>Analysez votre CV.</i></div>
            </div>
        </div>
    `,
  profile: `
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                <h2 class="card-header" style="margin:0; border:none; padding:0;">Mon Profil</h2>
                <span id="profile-auto-badge" class="tag" style="background:#e0f2fe; color:#0284c7; display:none;">Auto-détecté</span>
            </div>
            
            <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">
                Gérez vos informations professionnelles. Ces données sont utilisées pour personnaliser vos recommandations.
            </p>

            <form id="profile-form">
                <div class="grid-2" style="gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Prénom & Nom</label>
                        <input type="text" id="profile-name" class="form-control" placeholder="Non détecté">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Ville</label>
                        <input type="text" id="profile-city" class="form-control" placeholder="Non détectée">
                    </div>
                </div>
                <div class="grid-2" style="gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Niveau d'études</label>
                        <input type="text" id="profile-education" class="form-control" placeholder="Non détecté">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Années d'expérience</label>
                        <input type="number" id="profile-experience" class="form-control" placeholder="0">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Domaine principal (obligatoire)</label>
                    <select id="profile-domain" class="form-control" required>
                        <option value="">Sélectionnez un domaine</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Comptabilité / Finance">Comptabilité / Finance</option>
                        <option value="Ressources humaines">Ressources humaines</option>
                        <option value="Commerce / Vente">Commerce / Vente</option>
                        <option value="Gestion">Gestion</option>
                        <option value="Logistique">Logistique</option>
                        <option value="Industrie">Industrie</option>
                        <option value="Tourisme / Hôtellerie">Tourisme / Hôtellerie</option>
                        <option value="Design">Design</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Objectif Professionnel</label>
                    <input type="text" id="profile-target" class="form-control" placeholder="ex: Frontend Developer">
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
                    <button type="button" onclick="App.navigate('upload')" class="btn btn-secondary">Réanalyser mon CV</button>
                </div>
            </form>
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
                        <strong>Mod�le :</strong> <span id='ai-detected-model'>Automatique</span> <select id='ai-model-select' style='display:none; margin-left: 0.5rem; padding: 0.2rem; max-width: 200px; display: inline-block;'></select><br>
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
                        <label class="form-label">Endpoint API</label>
                        <input type="text" id="adv-endpoint" class="form-control" placeholder="Obligatoire pour Custom">
                    </div>
                    
                    <div class="form-group" id="adv-model-group">
                        <label class="form-label">Modèle</label>
                        <input type="text" id="adv-model" class="form-control" placeholder="modèle par défaut ▼">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Clé API</label>
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
        <div class="card">
            <h2 class="card-header">Analyser mon CV</h2>
            
            <p style="margin-bottom: 1.5rem; color: var(--text-muted);">
                Déposez votre CV pour découvrir :<br>
                ✓ votre profil professionnel<br>
                ✓ vos compétences<br>
                ✓ vos compétences à développer<br>
                ✓ les formations adaptées<br>
                ✓ les opportunités correspondantes
            </p>

            <div class="timeline" id="upload-timeline">
                <div class="timeline-step active" id="step-upload"><span>01 Upload</span></div>
                <div class="timeline-step" id="step-extract"><span>02 Extraction</span></div>
                <div class="timeline-step" id="step-analyze"><span>03 Analyse IA</span></div>
                <div class="timeline-step" id="step-result"><span>04 Profil détecté</span></div>
            </div>

            <!-- UPLOAD ZONE -->
            <div id="upload-zone" style="border: 2px dashed var(--border-color); padding: 3rem; text-align: center; border-radius: var(--radius-md); margin-bottom: 1.5rem; cursor: pointer;">
                <h3 style="margin-bottom:1rem;">Dépose ton CV ici</h3>
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Formats acceptés : PDF, DOCX</p>
                <input type="file" id="cv-file" accept=".pdf,.docx" style="display:none">
                <button class="btn btn-secondary" onclick="document.getElementById('cv-file').click()">Parcourir</button>
            </div>
            
            <div style="text-align:center; margin-bottom: 1.5rem;">
                <a href="#profile" style="color: var(--text-muted); font-size: 0.85rem; text-decoration: underline;">Vous préférez saisir votre profil manuellement ?</a>
            </div>

            <div id="ai-warning" style="display:none; background: var(--purple-light); padding: 1rem; border-radius: var(--radius-sm); margin-bottom:1rem;">
                <strong>Mode démo actif :</strong> Vous n'avez pas configuré de clé API. Mihnati utilisera des données simulées.
                <a href="#settings" style="color: var(--purple); font-weight:bold; margin-left: 0.5rem;">Configurer l'IA</a>
            </div>

            <button id="start-analysis-btn" class="btn btn-primary btn-lg" style="width: 100%; display:none;">Lancer l'analyse</button>
            
            <div id="analysis-logs" style="margin-top: 2rem; font-family: monospace; font-size: 0.85rem; color: var(--text-muted); background: var(--bg-color); padding: 1rem; border-radius: var(--radius-sm); display:none;">
            </div>

            <!-- PROFIL DETECTED ZONE (Hidden by default) -->
            <div id="detected-profile-zone" style="display:none; margin-top: 2rem;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                    <h3 style="margin-bottom: 1rem; color: #0f172a;">Profil détecté</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        Nous avons extrait ces informations de votre CV. Vérifiez-les avant de continuer.
                    </p>
                    <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.95rem;">
                        <div>
                            <strong>Prénom & Nom</strong><br>
                            <span id="det-name" style="color: var(--text-muted);">...</span>
                        </div>
                        <div>
                            <strong>Ville</strong><br>
                            <span id="det-city" style="color: var(--text-muted);">...</span>
                        </div>
                        <div>
                            <strong>Niveau d'études</strong><br>
                            <span id="det-edu" style="color: var(--text-muted);">...</span>
                        </div>
                        <div>
                            <strong>Domaine</strong><br>
                            <span id="det-domain" style="color: var(--text-muted);">...</span>
                        </div>
                        <div>
                            <strong>Objectif professionnel</strong><br>
                            <span id="det-target" style="color: var(--text-muted);">...</span>
                        </div>
                        <div>
                            <strong>Expérience</strong><br>
                            <span id="det-exp" style="color: var(--text-muted);">...</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button id="confirm-profile-btn" class="btn btn-primary" style="flex:1;">✓ Confirmer mon profil</button>
                        <button onclick="App.navigate('profile')" class="btn btn-secondary">Modifier</button>
                    </div>
                    <p style="text-align:center; font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem; margin-bottom: 0;">
                        Ces informations ont été détectées automatiquement à partir de votre CV.
                    </p>
                </div>
            </div>
            
            <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 2rem;">
                Votre CV est traité pour générer votre profil. Les informations sauvegardées localement restent dans votre navigateur.
            </p>
        </div>
    `,
  skills: `
        <div class="card">
            <h2 class="card-header">Mes Compétences</h2>
            <div id="skills-container"></div>
        </div>
        <div class="card">
            <h2 class="card-header">À développer</h2>
            <div id="skills-to-develop-container"></div>
        </div>
    `,
  courses: `
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <h2 class="card-header" style="margin:0; border:none; padding:0;">Formations Recommandées</h2>
                <button id="refresh-courses-btn" class="btn btn-secondary" style="font-size:0.8rem; padding: 0.25rem 0.75rem;">Actualiser (Web)</button>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Ces formations ciblent vos compétences à développer.</p>
            <div id="courses-container" class="grid-2"></div>
        </div>
    `,
  opportunities: `
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <h2 class="card-header" style="margin:0; border:none; padding:0;">Opportunités</h2>
                <button id="refresh-jobs-btn" class="btn btn-secondary" style="font-size:0.8rem; padding: 0.25rem 0.75rem;">Actualiser (Web)</button>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Correspondance basée sur vos compétences acquises et manquantes.</p>
            <div id="opportunities-container"></div>
        </div>
    `,
  feedback: `
        <div class="card">
            <h2 class="card-header">Donner votre avis</h2>
            <form id="feedback-form">
                <div class="form-group">
                    <label class="form-label">Ces recommandations sont-elles pertinentes ? (1 à 5)</label>
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
};
