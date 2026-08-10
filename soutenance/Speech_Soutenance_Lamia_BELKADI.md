# Speech de Soutenance — Lamia BELKADI
## Master 2 MIAGE — ISOAR — 2025/2026

---

## SLIDE 1 — Page de garde
*(5 secondes, laisser le jury lire)*

Bonjour à tous. Je m'appelle Lamia BELKADI, étudiante en Master 2 MIAGE parcours Ingénierie Logicielle pour le Web à l'Université d'Évry. Je suis en alternance chez ISOAR, entreprise spécialisée dans l'édition de logiciels ERP pour l'industrie. Mon mémoire porte sur l'optimisation de l'efficience énergétique et de l'empreinte carbone des Data Centers Cloud. Je vais vous présenter aujourd'hui mon activité en entreprise, puis mon travail de recherche.

---

## SLIDE 2 — Plan de la présentation
*(10 secondes)*

Ma présentation se divise en deux grandes parties. La première concerne ma synthèse en entreprise : je vous présenterai ISOAR, mon maître d'apprentissage, les missions que j'ai réalisées et mon évolution vers la gestion de projet. La deuxième partie est consacrée à mon mémoire : je vous présenterai la problématique, la solution que j'ai proposée — l'algorithme HEAT2VALUE — son implémentation et ses résultats.

---

## PARTIE 1 — SYNTHÈSE ENTREPRISE

---

## SLIDE 3 — Section Entreprise
*(3 secondes)*

Commençons par la partie entreprise.

---

## SLIDE 4 — L'entreprise ISOAR et ses clients
*(1 minute)*

ISOAR est une entreprise fondée en 1992, basée à Rungis dans le Val-de-Marne. Elle est spécialisée dans l'édition de logiciels ERP dédiés à l'industrie. Son produit phare est l'ERP SQUALP — un progiciel de gestion industrielle qui intègre la qualité à l'ensemble des processus métiers de ses clients.

J'ai intégré le pôle développement informatique, qui est au cœur de l'activité de l'entreprise. Ce département assure le développement, l'évolution et la maintenance des solutions logicielles, notamment SQUALP Web, les API REST, et les applications mobiles.

Les clients d'ISOAR sont des industriels issus de secteurs très variés. On retrouve Gascogne Bois, un grand groupe européen de l'industrie du bois coté en bourse avec environ 3000 employés. Polytechs, spécialisé dans la fabrication de polymères. Flexelec, expert en systèmes de maintien en température. AGEMA dans le secteur du bâtiment. IMC, leader du consommable médical en Algérie. Et SOBIO, qui commercialise des produits certifiés BIO.

---

## SLIDE 5 — Le maître d'apprentissage
*(40 secondes)*

Mon maître d'apprentissage est Anthony CORTEZ, développeur principal et responsable technique et projets chez ISOAR. Il est en charge du développement et de la maintenance de l'ERP SQUALP, développé en Delphi et reposant sur SQL Server. Il assure également la gestion complète des projets clients : recueil des besoins, rédaction des cahiers des charges, suivi des plannings, support technique et formation des utilisateurs.

Tout au long de mon alternance, il m'a accompagnée en me confiant des missions progressives et responsabilisantes, avec un suivi technique et méthodologique régulier. C'est grâce à lui que j'ai pu monter en compétences rapidement et m'impliquer dans des projets à fort impact.

---

## SLIDE 6 — Les travaux réalisés chez ISOAR
*(1 minute 30)*

Au cours de mon alternance, j'ai participé à quatre projets principaux.

**Le premier est SQUALP Web.** J'ai contribué à l'adaptation de l'ERP SQUALP vers une version web et mobile. Les modules sur lesquels j'ai travaillé incluent le transfert de stocks, les inventaires tournant et intermittent, le classement des stocks et les ordres de services. J'ai également développé des interfaces réactives adaptées aux usages mobiles, intégré un scanner de codes-barres pour limiter les saisies manuelles, et développé des fenêtres modales pour la gestion d'articles de manière fluide et intuitive.

**Le deuxième est le projet IXAO**, un système de gestion des demandes internes et clients. J'y ai apporté des évolutions front-end pour améliorer les interfaces, des modifications back-end incluant des ajustements en base de données, et l'ajout de nouvelles fonctionnalités répondant aux besoins exprimés.

**Le troisième est le développement d'une API REST pour le client Gascogne Bois.** J'ai conçu et développé plusieurs API en JavaScript et PHP couvrant notamment le module des commandes, en m'appuyant sur des procédures stockées SQL. Les tests et la validation ont été réalisés avec Postman.

**Le quatrième est ma mission actuelle : le module Statistiques Ventes.** Je développe un module complet de visualisation de données avec Chart.js, permettant d'afficher des graphiques interactifs — barres, camembert, courbes — avec comparaison annuelle du chiffre d'affaires, des coûts et de la marge. Le module intègre également l'export PDF et l'impression, avec des données dynamiques récupérées via des API REST connectées à SQL Server.

---

## SLIDE 7 — Évolution vers la gestion de projet & outils
*(50 secondes)*

Au fil de l'alternance, mon rôle a évolué bien au-delà du développement technique. Avec une montée en autonomie progressive, j'ai commencé à m'impliquer dans des missions de gestion de projet aux côtés de mon maître d'apprentissage. Cela m'a amenée à participer à l'analyse des besoins fonctionnels, à la priorisation des tâches, au suivi des projets et à la coordination des différentes phases de développement. Cette évolution m'a permis d'acquérir une vision beaucoup plus globale du cycle de vie d'un projet informatique en entreprise.

Sur le plan technique, j'ai utilisé principalement JavaScript, PHP, SQL et Delphi pour la lecture du code existant. En base de données, j'ai travaillé avec Microsoft SQL Server. Et comme outils : Git pour la gestion de versions, VS Code comme environnement de développement, XAMPP, Postman pour les tests d'API, SQL Server Profiler et Trello pour la gestion des tâches.

---

## PARTIE 2 — PRÉSENTATION DU MÉMOIRE

---

## SLIDE 8 — Section Mémoire
*(3 secondes)*

Passons maintenant à la présentation de mon mémoire.

---

## SLIDE 9 — Introduction & problématique
*(45 secondes)*

Les Data Centers sont les piliers invisibles de notre monde numérique. Derrière chaque email envoyé, chaque vidéo regardée, chaque transaction bancaire effectuée, il y a des milliers de serveurs qui tournent en permanence. Et ces serveurs consomment des quantités massives d'électricité. Ce qui est moins connu, c'est que 95% de cette électricité se transforme en chaleur — une chaleur qui est aujourd'hui simplement rejetée dans l'atmosphère.

Avec l'essor de l'intelligence artificielle, cette pression énergétique explose encore plus vite. Les processeurs dédiés à l'IA consomment jusqu'à trois fois plus que les serveurs classiques.

Face à ce constat, la problématique de mon mémoire est la suivante : **Comment optimiser la performance énergétique des Data Centers Cloud afin de réduire durablement leur empreinte carbone ?**

---

## SLIDE 10 — État de l'art & limites
*(1 minute)*

Pour répondre à cette question, j'ai commencé par analyser ce que la recherche scientifique propose. On retrouve quatre grandes stratégies dans la littérature récente de 2024 et 2025.

L'optimisation logicielle, avec des mécanismes comme le Power Capping et le DVFS dynamique, qui permettent de réduire la consommation électrique des processeurs. La flexibilité géographique, avec le Carbon-Aware Migration ou "Follow the Sun", qui consiste à déplacer les calculs vers les pays où l'électricité est la plus propre. L'indépendance énergétique, en couplant directement des éoliennes aux Data Centers avec des batteries BESS. Et enfin la gestion holistique avec des frameworks comme SHIELD, qui optimisent simultanément l'énergie, le carbone et l'eau.

Ces solutions sont prometteuses. Mais elles partagent toutes **une limite commune** : elles traitent la chaleur produite par les serveurs comme un déchet à éliminer. Personne ne s'est posé la question : et si on pouvait valoriser cette chaleur ?

---

## SLIDE 11 — HEAT2VALUE : le changement de paradigme
*(1 minute)*

C'est précisément le changement de perspective que je propose avec HEAT2VALUE. Au lieu de chercher à éliminer la chaleur le plus efficacement possible, je propose de la considérer comme une ressource.

Aujourd'hui, la logique est simple mais coûteuse : les serveurs consomment de l'électricité, produisent de la chaleur, et on paie une deuxième fois pour s'en débarrasser via des systèmes de climatisation. C'est du gaspillage à double niveau.

Avec HEAT2VALUE, cette chaleur peut être envoyée vers des bâtiments voisins pour les chauffer, stockée dans un réservoir thermique pour une utilisation ultérieure, ou rejetée en dernier recours seulement si aucune autre option n'est disponible.

Ce changement de paradigme permet de réduire simultanément la consommation de refroidissement, les émissions de carbone et la consommation d'eau. Et pour mesurer cette valorisation, j'ai introduit un nouvel indicateur.

---

## SLIDE 12 — Positionnement vs solutions existantes
*(30 secondes)*

Ce tableau résume le positionnement de HEAT2VALUE par rapport aux solutions existantes. On voit que SHIELD, WaterWise, Carbon-Aware Scheduling et le refroidissement par liquide couvrent chacun une partie des indicateurs classiques — PUE, CUE et WUE. Mais aucune ne valorise la chaleur. HEAT2VALUE est la seule solution à cocher les quatre cases simultanément.

---

## SLIDE 13 — Le nouveau KPI : le HRR
*(1 minute)*

Pour mesurer cette valorisation, j'ai introduit un nouveau KPI que j'appelle le **Heat Reuse Ratio**, ou HRR. Sa formule est simple :

**HRR = Chaleur réutilisée / Chaleur totale produite**

Ce qui rend ce KPI original, c'est qu'il comble un vide que personne n'avait remarqué. Le PUE, le CUE et le WUE mesurent tous ce qu'on consomme ou ce qu'on pollue. Aucun ne mesure ce qu'on valorise. Un Data Center qui chauffe un immeuble voisin en remplaçant sa chaudière à gaz évite des émissions de CO₂ réelles — mais cet impact positif est complètement invisible dans les indicateurs existants. Le HRR le rend visible et mesurable.

En pratique : un HRR de 0 correspond à un Data Center classique qui rejette tout. Un HRR de 0.80 signifie que 80% de la chaleur est valorisée — c'est le résultat que j'obtiens en conditions hivernales. Et un HRR de 1 serait le cas idéal où toute la chaleur est réutilisée.

---

## SLIDE 14 — Le nouveau score environnemental
*(40 secondes)*

Pour intégrer le HRR dans une vision globale, j'ai créé un nouveau score environnemental :

**Score H2V = α·PUE + β·CUE + γ·WUE − δ·HRR**

Les coefficients α, β et γ sont les poids accordés aux trois KPI classiques. Ils sont ajustables selon le contexte : par exemple, dans une région en stress hydrique, on augmente le poids du WUE. Le coefficient δ est le poids accordé à la valorisation thermique. Et le HRR est **soustrait** intentionnellement : plus on valorise, plus le score baisse, ce qui signifie une meilleure performance environnementale globale. C'est la première fois qu'un score unifie ces quatre dimensions en une seule valeur.

---

## SLIDE 15-16 — Architecture de l'algorithme
*(1 minute)*

L'algorithme prend en entrée trois types de données collectées toutes les 15 minutes. Les **données internes** du Data Center : la charge des serveurs, qui détermine la puissance consommée et donc la chaleur disponible. Les **données météorologiques** : la température extérieure, avec le seuil clé de 18°C en dessous duquel la réutilisation est déclenchée. Et les **données énergétiques** : l'intensité carbone du réseau, avec le seuil de 150 gCO₂/kWh au-dessus duquel le stockage est déclenché.

À chaque instant, l'algorithme dispose de trois options pour la chaleur. **L'option A** est la réutilisation immédiate : si la température est sous 18°C, 80% de la chaleur est valorisée pour chauffer des bâtiments voisins. **L'option B** est le stockage thermique : si le carbone dépasse 150 gCO₂/kWh et que le réservoir n'est pas plein à 90%, 70% de la chaleur est stockée. **L'option C** est le rejet classique : le dernier recours, 0% de valorisation.

---

## SLIDE 17 — Moteur de décision
*(30 secondes)*

Ce schéma résume toute la logique de décision. À chaque évaluation, l'algorithme pose deux questions dans l'ordre. Première question : est-ce qu'il fait froid ? Si oui, réutilisation. Si non, deuxième question : est-ce que le carbone est élevé ET le réservoir pas plein ? Si oui, stockage. Sinon, rejet. C'est simple, lisible et justifié environnementalement.

---

## SLIDE 18 — Illustration par des scénarios
*(30 secondes)*

En hiver, la température reste sous 18°C en continu, l'algorithme choisit systématiquement la réutilisation — c'est le meilleur cas. En été, la température dépasse 18°C et le carbone français est très bas, l'algorithme rejette tout — c'est la limite saisonnière que j'assume honnêtement. En période de transition comme l'automne, la température oscille autour de 18°C, les trois options s'activent dans la même journée — c'est le scénario le plus riche qui illustre la flexibilité de l'algorithme.

---

## SLIDE 19 — Choix Python
*(20 secondes)*

Pour l'implémentation, j'ai choisi Python car c'est le standard dans la recherche scientifique sur les Data Centers. Tous les travaux que j'ai étudiés — SHIELD, Carbon-Aware, Deep Reinforcement Learning — utilisent Python. Les bibliothèques NumPy, Pandas, Matplotlib et Requests couvrent exactement les quatre besoins de l'algorithme : calculer, organiser, visualiser et collecter les données.

---

## SLIDE 20-22 — Architecture modulaire & Simulation
*(45 secondes)*

L'implémentation est organisée en cinq modules Python indépendants. Le simulateur génère les données du Data Center. Le module de décision implémente l'algorithme HEAT2VALUE. Le module KPI calcule les quatre indicateurs. Le module de comparaison met en parallèle les résultats avec et sans HEAT2VALUE. Et les modules de tests valident l'algorithme sur des données réelles et des scénarios variés.

J'ai choisi la simulation car les Data Centers sont des environnements critiques où tester un algorithme en conditions réelles sans risque est impossible. Mais pour renforcer la crédibilité, j'ai enrichi les tests avec de vraies données d'intensité carbone provenant d'Electricity Maps — la plateforme qui publie ces données heure par heure pour toute l'année 2024. J'ai également créé un jeu de données de 12 scénarios construits manuellement pour couvrir des situations variées.

---

## SLIDE 23-24 — Modules simulateur & décision
*(20 secondes)*

Le simulateur génère 96 points de mesure sur 24h, toutes les 15 minutes, avec une charge réaliste faible la nuit et croissante la journée. Le module de décision applique les trois paramètres fixes et enregistre à chaque instant la décision prise et les quantités de chaleur valorisées.

---

## SLIDE 25-26 — Résultats comparaison 24h
*(1 minute)*

Voici les résultats obtenus sur le scénario de référence hivernal. La comparaison est très claire : le PUE passe de 1.30 à 1.05, soit une réduction de 25%. Le CUE est réduit de 80% grâce aux émissions évitées par la valorisation. Le WUE passe de 2.0 à 0.5 L/kWh, soit 75% de réduction de la consommation d'eau. Et le HRR atteint 0.80 — 80% de la chaleur est valorisée au lieu d'être rejetée.

Le graphique confirme visuellement ces résultats. On voit clairement que la ligne verte reste nettement sous la rouge pour le CUE, et que le PUE et le WUE sont constants et améliorés toute la journée.

---

## SLIDE 27 — Résultats données réelles
*(45 secondes)*

Sur les données réelles d'Electricity Maps pour trois journées de 2024, les résultats sont cohérents. Le 15 janvier en hiver : température entre 2 et 10°C, réutilisation systématique, HRR de 80% et CUE nul. Le 15 juillet en été : température élevée, carbone français très bas à 4.75 gCO₂/kWh, rejet total — c'est la limite saisonnière confirmée. Le 30 décembre : température froide, réutilisation systématique, mêmes excellents résultats qu'en janvier.

Une observation importante : le réseau électrique français est exceptionnellement propre — entre 4 et 50 gCO₂/kWh — grâce au nucléaire. HEAT2VALUE serait encore plus pertinent dans des pays avec un mix énergétique plus carboné, comme l'Allemagne ou la Pologne.

---

## SLIDE 28 — Résultats 12 scénarios
*(30 secondes)*

Sur les 12 scénarios du jeu de données test, trois conclusions se dégagent. Sept scénarios sur douze en saison froide donnent un HRR de 80% avec les meilleurs KPI. Le scénario de transition automne est le plus riche : il met en jeu les trois options dans la même journée avec un HRR intermédiaire de 37%. Et les quatre scénarios estivaux confirment la limite saisonnière avec un HRR nul.

---

## SLIDE 29 — Métriques et indicateurs
*(30 secondes)*

En synthèse par indicateur : le PUE est systématiquement réduit de 19% dès que la réutilisation est possible. Le CUE tend vers zéro en hiver avec un réseau propre, et reste réduit mais positif en été. Le WUE est divisé par presque 4 en mode réutilisation. Et le HRR atteint 0.80 en hiver, 37 à 78% en transition, et 0 en été. La performance globale est mesurée par le Score H2V — un score bas signifie une meilleure performance environnementale.

---

## SLIDE 30 — Limites
*(40 secondes)*

Je souhaite être honnête sur les limites de ma solution. La limite principale est **saisonnière** : en été, quand la température dépasse 18°C et que le carbone est bas, l'algorithme ne peut valoriser aucune chaleur. Il y a aussi une dépendance au contexte géographique — HEAT2VALUE est optimisé pour les régions à climat froid — et une dépendance au mix énergétique, le réseau français étant trop propre pour déclencher souvent le stockage.

Sur la validation, la charge des serveurs est simulée de façon linéaire, moins imprévisible que la réalité. Et l'infrastructure de valorisation est supposée déjà existante, ce qui représente un investissement important dans la réalité.

---

## SLIDE 31 — Perspectives
*(30 secondes)*

Ces limites ouvrent cinq perspectives concrètes. Intégrer des prévisions météorologiques pour anticiper plutôt que réagir. Élargir les usages en été : eau chaude sanitaire, climatisation par absorption, séchage industriel. Rendre les seuils adaptatifs selon le pays ou la saison. Tester l'algorithme dans des pays plus carbonés comme l'Allemagne ou la Pologne. Et enfin, déployer un pilote dans un Data Center universitaire ou une PME pour confronter les résultats à la réalité.

---

## SLIDE 32 — Conclusion
*(30 secondes)*

Pour conclure, HEAT2VALUE répond à la problématique centrale de ce mémoire. En valorisant la chaleur produite par les serveurs plutôt qu'en l'éliminant, l'algorithme améliore simultanément les quatre indicateurs environnementaux. Le HRR et le Score H2V offrent une vision unifiée et originale de la performance environnementale, jamais proposée auparavant dans la littérature. Les résultats sont cohérents sur trois types de validation : données simulées, données réelles et 12 scénarios variés. Et les limites identifiées ouvrent des perspectives concrètes de recherche et de déploiement.

---

## SLIDE 33 — Merci
*(5 secondes)*

Je vous remercie pour votre attention et reste disponible pour répondre à vos questions.

---

## DURÉE ESTIMÉE PAR PARTIE

| Partie | Durée estimée |
|---|---|
| Page de garde + plan | 15 sec |
| Synthèse entreprise | ~5 min |
| Présentation mémoire | ~12 min |
| **TOTAL** | **~17-18 min** |

