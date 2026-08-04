const pptxgen = require("pptxgenjs");

const NAVY = "0B3D56";
const NAVY_DARK = "082C3E";
const TEAL = "1B7A8C";
const ORANGE = "E67E22";
const GREEN = "2E8B57";
const RED = "C0392B";
const BG = "FFFFFF";
const LIGHTBG = "F4F7F8";
const TEXT = "1E2530";
const GRAY = "6B7280";
const CARDBG = "EFF4F5";

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

const A = "assets/";

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
const PGW = 13.33, PGH = 7.5;

function freshShadow() {
  return { type: "outer", color: "1A1A1A", opacity: 0.18, blur: 6, offset: 2, angle: 90 };
}

// ---------- helpers ----------
function kicker(slide, text, opts = {}) {
  slide.addText(text.toUpperCase(), {
    x: opts.x ?? 0.6, y: opts.y ?? 0.42, w: opts.w ?? 8, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: opts.color ?? ORANGE, bold: true, charSpacing: 2,
  });
}

function pageTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.6, y: opts.y ?? 0.72, w: opts.w ?? 12.1, h: opts.h ?? 0.9,
    fontFace: FONT_HEAD, fontSize: opts.size ?? 30, color: NAVY, bold: true, align: "left",
  });
}

function pageNum(slide, n) {
  slide.addText(String(n), {
    x: PGW - 0.75, y: PGH - 0.42, w: 0.5, h: 0.3, fontFace: FONT_BODY, fontSize: 10, color: GRAY, align: "right",
  });
}

function footerTag(slide, text) {
  slide.addText(text, {
    x: 0.6, y: PGH - 0.42, w: 8, h: 0.3, fontFace: FONT_BODY, fontSize: 9, color: GRAY, italic: true,
  });
}

function baseContentSlide(title, kickerText) {
  let s = pres.addSlide();
  s.background = { color: BG };
  kicker(s, kickerText);
  pageTitle(s, title);
  return s;
}

function iconCircle(slide, x, y, d, color, letter) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color }, line: { type: "none" } });
  slide.addText(letter, { x, y, w: d, h: d, align: "center", valign: "middle", fontFace: FONT_BODY, bold: true, fontSize: d * 22, color: "FFFFFF" });
}

function bulletBlock(slide, items, opts) {
  const paras = items.map((it, i) => {
    if (typeof it === "string") {
      return { text: it, options: { bullet: { code: "25AA", indent: 18 }, color: TEXT, fontSize: opts.fontSize ?? 15, breakLine: true, paraSpaceAfter: opts.spaceAfter ?? 10, fontFace: FONT_BODY } };
    } else {
      return { text: it.text, options: Object.assign({ bullet: { code: "25AA", indent: 18 }, color: TEXT, fontSize: opts.fontSize ?? 15, breakLine: true, paraSpaceAfter: opts.spaceAfter ?? 10, fontFace: FONT_BODY }, it.opts || {}) };
    }
  });
  slide.addText(paras, { x: opts.x, y: opts.y, w: opts.w, h: opts.h, valign: "top" });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: opts.fill ?? CARDBG },
    line: opts.line ?? { type: "none" },
    shadow: opts.shadow === false ? undefined : freshShadow(),
  });
}

function sectionDivider(num, partLabel, title, subtitle) {
  let s = pres.addSlide();
  s.background = { color: NAVY };
  // subtle decorative circles (no stripes)
  s.addShape("ellipse", { x: 10.6, y: -1.6, w: 4.6, h: 4.6, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addShape("ellipse", { x: -1.4, y: 5.4, w: 3.6, h: 3.6, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addText(partLabel.toUpperCase(), {
    x: 0.9, y: 2.55, w: 8, h: 0.5, fontFace: FONT_BODY, fontSize: 15, color: ORANGE, bold: true, charSpacing: 3,
  });
  s.addText(title, {
    x: 0.9, y: 3.05, w: 10.8, h: 1.6, fontFace: FONT_HEAD, fontSize: 42, color: "FFFFFF", bold: true,
  });
  if (subtitle) {
    s.addText(subtitle, { x: 0.9, y: 4.55, w: 9.8, h: 0.8, fontFace: FONT_BODY, fontSize: 16, color: "CADCFC" });
  }
  s.addText(num, {
    x: 11.0, y: 0.55, w: 1.8, h: 1.8, fontFace: FONT_HEAD, fontSize: 60, color: NAVY_DARK, bold: true, align: "right",
  });
  return s;
}

function imgCard(slide, path, x, y, w, h) {
  card(slide, x - 0.12, y - 0.12, w + 0.24, h + 0.24, { fill: "FFFFFF" });
  slide.addImage({ path, x, y, w, h });
}

// fit image inside box preserving aspect ratio, returns {x,y,w,h}
function fitImage(natW, natH, boxX, boxY, boxW, boxH) {
  const ratio = Math.min(boxW / natW, boxH / natH);
  const w = natW * ratio, h = natH * ratio;
  const x = boxX + (boxW - w) / 2;
  const y = boxY + (boxH - h) / 2;
  return { x, y, w, h };
}

/* =========================================================
   SLIDE 1 — PAGE DE GARDE
   ========================================================= */
{
  let s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape("ellipse", { x: 9.6, y: -2.2, w: 6.5, h: 6.5, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addShape("ellipse", { x: -2.2, y: 5.0, w: 4.8, h: 4.8, fill: { color: NAVY_DARK }, line: { type: "none" } });

  // logos row
//   s.addImage({ path: A + "logo_univ.jpeg", x: 0.7, y: 0.5, w: 2.2, h: 0.75 });
//   s.addImage({ path: A + "logo_cfa.png", x: 3.1, y: 0.52, w: 0.85, h: 0.32 });
//   s.addImage({ path: A + "logo_isoar.jpeg", x: 11.0, y: 0.5, w: 1.6, h: 0.64 });

  s.addText("MÉMOIRE DE FIN D'ÉTUDES — MASTER 2 MIAGE", {
    x: 0.9, y: 2.3, w: 11.5, h: 0.5, fontFace: FONT_BODY, fontSize: 14, color: ORANGE, bold: true, charSpacing: 3,
  });
  s.addText("Optimisation de l'efficience énergétique et de l'empreinte carbone des Data Centers Cloud", {
    x: 0.9, y: 2.85, w: 11.5, h: 1.7, fontFace: FONT_HEAD, fontSize: 34, color: "FFFFFF", bold: true,
  });
  s.addText("Synthèse de l'activité en entreprise & présentation du mémoire", {
    x: 0.9, y: 4.55, w: 11.5, h: 0.5, fontFace: FONT_BODY, fontSize: 17, color: "CADCFC", italic: true,
  });

  s.addShape("line", { x: 0.9, y: 5.35, w: 3.0, h: 0, line: { color: ORANGE, width: 2 } });

  s.addText([
    { text: "Réalisé par : ", options: { bold: true, color: "CADCFC" } },
    { text: "Lamia BELKADI\n", options: { color: "FFFFFF" } },
    { text: "Tuteur pédagogique : ", options: { bold: true, color: "CADCFC" } },
    { text: "M. Bachir DJAFRI\n", options: { color: "FFFFFF" } },
    { text: "Maître d'apprentissage : ", options: { bold: true, color: "CADCFC" } },
    { text: "M. Anthony CORTEZ\n", options: { color: "FFFFFF" } },
    { text: "Entreprise d'accueil : ", options: { bold: true, color: "CADCFC" } },
    { text: "ISOAR — Année universitaire 2025/2026", options: { color: "FFFFFF" } },
  ], { x: 0.9, y: 5.6, w: 10.5, h: 1.6, fontFace: FONT_BODY, fontSize: 14, lineSpacing: 24 });
}

/* =========================================================
   SLIDE 2 — PLAN DE PRESENTATION
   ========================================================= */
{
  let s = baseContentSlide("Plan de la présentation", "Sommaire");
  pageNum(s, 2);

  const col1x = 0.7, col2x = 6.95, colw = 5.7, y0 = 1.9;

  card(s, col1x, y0, colw, 4.7, { fill: LIGHTBG });
  s.addShape("roundRect", { x: col1x + 0.35, y: y0 + 0.35, w: 0.55, h: 0.55, rectRadius: 0.5, fill: { color: NAVY }, line: { type: "none" } });
  s.addText("1", { x: col1x + 0.35, y: y0 + 0.35, w: 0.55, h: 0.55, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 20, fontFace: FONT_BODY });
  s.addText("Synthèse de l'entreprise", { x: col1x + 1.05, y: y0 + 0.32, w: 4.2, h: 0.6, fontFace: FONT_HEAD, fontSize: 19, color: NAVY, bold: true });
  bulletBlock(s, [
    "L'entreprise ISOAR et ses clients",
    "Le maître d'apprentissage",
    "Résumé des travaux proposés",
    "Évolution vers la gestion de projet",
    "Technologies et outils utilisés",
  ], { x: col1x + 0.4, y: y0 + 1.15, w: colw - 0.8, h: 3.3, fontSize: 14.5, spaceAfter: 14 });

  card(s, col2x, y0, colw, 4.7, { fill: LIGHTBG });
  s.addShape("roundRect", { x: col2x + 0.35, y: y0 + 0.35, w: 0.55, h: 0.55, rectRadius: 0.5, fill: { color: ORANGE }, line: { type: "none" } });
  s.addText("2", { x: col2x + 0.35, y: y0 + 0.35, w: 0.55, h: 0.55, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 20, fontFace: FONT_BODY });
  s.addText("Présentation du mémoire", { x: col2x + 1.05, y: y0 + 0.32, w: 4.3, h: 0.6, fontFace: FONT_HEAD, fontSize: 19, color: NAVY, bold: true });
  bulletBlock(s, [
    "Problématique & état de l'art",
    "Chapitre 2 — HEAT2VALUE : la solution",
    "Le KPI HRR et le score environnemental",
    "Chapitre 3 — Implémentation et résultats",
    "Limites, améliorations et conclusion",
  ], { x: col2x + 0.4, y: y0 + 1.15, w: colw - 0.8, h: 3.3, fontSize: 14.5, spaceAfter: 14 });
}

/* =========================================================
   SLIDE 3 — DIVIDER PARTIE 1
   ========================================================= */
sectionDivider("01", "Partie 1", "Synthèse de l'activité en entreprise", "ISOAR — Alternance au sein du pôle développement informatique");

/* =========================================================
   SLIDE 4 — ENTREPRISE + CLIENTS
   ========================================================= */
{
  let s = baseContentSlide("L'entreprise ISOAR et ses clients", "Partie 1 · Entreprise");
  pageNum(s, 4);

  card(s, 0.6, 1.85, 6.5, 4.75, { fill: LIGHTBG });
//   s.addImage({ path: A + "logo_isoar.jpeg", x: 1.0, y: 2.1, w: 2.0, h: 0.8 });
  s.addText([
    { text: "Fondée en 1992", options: { bold: true, color: NAVY } },
    { text: " · Rungis (94)\n", options: { color: TEXT } },
    { text: "Secteur : ", options: { bold: true, color: NAVY } },
    { text: "Édition de logiciels ERP, qualité industrielle", options: { color: TEXT } },
  ], { x: 1.0, y: 3.0, w: 5.7, h: 0.9, fontFace: FONT_BODY, fontSize: 13.5, lineSpacing: 20 });

  bulletBlock(s, [
    { text: "Éditeur de l'ERP SQUALP, progiciel de gestion industrielle intégrant la qualité aux processus métiers", opts: {} },
    { text: "Clients industriels variés : bois, polymères, médical, bâtiment, produits biologiques", opts: {} },
    { text: "Département d'accueil : pôle développement informatique (ERP, web/mobile, API REST)", opts: {} },
  ], { x: 1.0, y: 3.95, w: 5.7, h: 2.5, fontSize: 13.5, spaceAfter: 12 });

  // clients grid
  card(s, 7.35, 1.85, 5.4, 4.75, { fill: "FFFFFF" });
  s.addText("Quelques clients", { x: 7.65, y: 2.05, w: 4.8, h: 0.4, fontFace: FONT_HEAD, fontSize: 15, color: NAVY, bold: true });

  const clients = [
    // { logo: "client_gascogne.png", name: "Gascogne Wood Products", desc: "Bois — ~3000 employés, cotée en bourse" },
    // { logo: "client_polytechs.png", name: "Polytechs", desc: "Fabrication de polymères" },
    // { logo: "client_flexelec.jpeg", name: "Flexelec", desc: "Mise hors gel & maintien en température" },
    // { logo: "client_agema.png", name: "AGEMA", desc: "Secteur du bâtiment" },
    // { logo: "client_imc.jpeg", name: "IMC", desc: "Leader du consommable médical (Algérie)" },
    // { logo: "client_sobio.png", name: "SOBIO", desc: "Produits certifiés BIO" },
  ];
  let cx = 7.65, cy = 2.55, cw = 2.55, ch = 1.55, gap = 0.2;
  clients.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = cx + col * (cw + gap), y = cy + row * (ch + gap);
    card(s, x, y, cw, ch, { fill: LIGHTBG, shadow: false });
    const fit = fitImage(200, 90, x + 0.15, y + 0.12, cw - 0.3, 0.62);
    s.addImage({ path: A + c.logo, x: fit.x, y: fit.y, w: fit.w, h: fit.h });
    s.addText(c.desc, { x: x + 0.12, y: y + 0.8, w: cw - 0.24, h: ch - 0.85, fontFace: FONT_BODY, fontSize: 9.5, color: GRAY, valign: "top" });
  });
}

/* =========================================================
   SLIDE 5 — MAITRE D'APPRENTISSAGE
   ========================================================= */
{
  let s = baseContentSlide("Le maître d'apprentissage", "Partie 1 · Entreprise");
  pageNum(s, 5);

  card(s, 0.6, 1.85, 5.6, 4.75, { fill: LIGHTBG });
  iconCircle(s, 1.0, 2.2, 0.9, NAVY, "AC");
  s.addText("Anthony CORTEZ", { x: 2.05, y: 2.28, w: 3.9, h: 0.45, fontFace: FONT_HEAD, fontSize: 19, color: NAVY, bold: true });
  s.addText("Développeur principal / Responsable technique et projets", { x: 2.05, y: 2.72, w: 3.9, h: 0.6, fontFace: FONT_BODY, fontSize: 12, color: GRAY, italic: true });

  bulletBlock(s, [
    "Responsable du développement, de la maintenance et de l'évolution de l'ERP SQUALP (Delphi / SQL Server)",
    "Gestion complète des projets clients et analyse des besoins",
    "Rédaction des cahiers des charges et suivi des plannings",
    "Support technique et formation des utilisateurs",
    "M'a accompagnée avec des missions progressives et responsabilisantes",
  ], { x: 1.0, y: 3.55, w: 4.9, h: 3.0, fontSize: 13, spaceAfter: 10 });

  // org chart
  card(s, 6.4, 1.85, 6.35, 4.75, { fill: "FFFFFF" });
  s.addText("Organisation de l'équipe de développement", { x: 6.7, y: 2.05, w: 5.8, h: 0.4, fontFace: FONT_HEAD, fontSize: 14, color: NAVY, bold: true });
  const fit = fitImage(805, 423, 6.65, 2.6, 5.9, 3.85);
//   s.addImage({ path: A + "orgchart.jpeg", x: fit.x, y: fit.y, w: fit.w, h: fit.h });
}

/* =========================================================
   SLIDE 6 — RESUME DES TRAVAUX PROPOSES
   ========================================================= */
{
  let s = baseContentSlide("Résumé des travaux proposés par l'entreprise", "Partie 1 · Missions");
  pageNum(s, 6);

  const items = [
    { t: "Missions demandées", d: "Développement web (front/back), adaptation de SQUALP vers le web/mobile, conception d'API REST, amélioration des interfaces utilisateurs." },
    { t: "Existant avant mon arrivée", d: "ERP SQUALP existant en desktop, API REST partielles ou inexistantes, interfaces nécessitant une amélioration ergonomique." },
    { t: "Planning prévisionnel", d: "Défini avec souplesse selon les priorités clients, les urgences de production et les phases de tests/validation." },
    { t: "Contexte de travail", d: "En collaboration avec l'équipe ISOAR, en autonomie sur certaines tâches, en environnement professionnel réel." },
  ];
  let x = 0.6, y = 1.9, w = 5.95, h = 2.28, gapx = 0.3, gapy = 0.25;
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = x + col * (w + gapx), cy = y + row * (h + gapy);
    card(s, cx, cy, w, h, { fill: LIGHTBG });
    s.addShape("roundRect", { x: cx + 0.25, y: cy + 0.25, w: 0.42, h: 0.42, rectRadius: 0.4, fill: { color: TEAL }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.25, y: cy + 0.25, w: 0.42, h: 0.42, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 15, fontFace: FONT_BODY });
    s.addText(it.t, { x: cx + 0.85, y: cy + 0.22, w: w - 1.1, h: 0.45, fontFace: FONT_HEAD, fontSize: 14.5, color: NAVY, bold: true });
    s.addText(it.d, { x: cx + 0.3, y: cy + 0.78, w: w - 0.6, h: h - 0.95, fontFace: FONT_BODY, fontSize: 11.5, color: TEXT, valign: "top", lineSpacing: 15 });
  });
}

/* =========================================================
   SLIDE 7 — EVOLUTION MISSIONS VERS GESTION DE PROJET
   ========================================================= */
{
  let s = baseContentSlide("Évolution des missions vers la gestion de projet", "Partie 1 · Missions");
  pageNum(s, 7);

  card(s, 0.6, 1.9, 6.0, 4.65, { fill: LIGHTBG });
  s.addText("Travaux réalisés en entreprise", { x: 0.95, y: 2.15, w: 5.3, h: 0.4, fontFace: FONT_HEAD, fontSize: 15, color: NAVY, bold: true });
  bulletBlock(s, [
    { text: "SQUALP Web", opts: { bold: true } },
    " — transfert de stocks, inventaires, classement, ordres de services ; fenêtres modales, scanner code-barres",
  ].reduce((acc, cur, idx, arr) => acc, []), { x: 0.95, y: 2.6, w: 5.3, h: 0.1, fontSize: 1 }); // placeholder no-op

  s.addText([
    { text: "SQUALP Web", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: "  — transfert de stocks, inventaires, classement des stocks, ordres de service ; interfaces réactives, filtres dynamiques, scanner code-barres, fenêtres modales.\n\n", options: { fontSize: 12.5, color: TEXT } },
    { text: "Projet IXAO", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: "  — gestion des demandes internes et clients : évolutions front-end, ajustements back-end/BDD, nouvelles fonctionnalités.\n\n", options: { fontSize: 12.5, color: TEXT } },
    { text: "API REST — client Gascogne Bois", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: "  — API en JavaScript/PHP sur procédures stockées SQL, tests et validation via Postman.", options: { fontSize: 12.5, color: TEXT } },
  ], { x: 0.95, y: 2.55, w: 5.3, h: 3.85, valign: "top", lineSpacing: 17 });

  card(s, 6.9, 1.9, 5.85, 4.65, { fill: NAVY });
  s.addText("Vers la gestion de projet", { x: 7.25, y: 2.15, w: 5.2, h: 0.4, fontFace: FONT_HEAD, fontSize: 15, color: "FFFFFF", bold: true });
  s.addText("Mon rôle a évolué avec une montée en autonomie progressive et une implication plus importante sur les aspects web et API que prévu initialement.", { x: 7.25, y: 2.65, w: 5.2, h: 1.0, fontFace: FONT_BODY, fontSize: 12.5, color: "CADCFC", valign: "top", lineSpacing: 16 });

  bulletBlock(s, [
    { text: "Analyse des besoins fonctionnels", opts: { color: "FFFFFF" } },
    { text: "Priorisation des tâches", opts: { color: "FFFFFF" } },
    { text: "Suivi des projets", opts: { color: "FFFFFF" } },
    { text: "Coordination des phases de développement", opts: { color: "FFFFFF" } },
  ], { x: 7.25, y: 3.75, w: 5.2, h: 1.7, fontSize: 12.5, spaceAfter: 10 });

  s.addText("→ Vision plus globale du cycle de vie des projets informatiques en entreprise.", { x: 7.25, y: 5.55, w: 5.25, h: 0.85, fontFace: FONT_BODY, fontSize: 12, italic: true, color: ORANGE, valign: "top" });
}

/* =========================================================
   SLIDE 8 — OUTILS ET TECHNOLOGIES
   ========================================================= */
{
  let s = baseContentSlide("Technologies et outils utilisés", "Partie 1 · Environnement technique");
  pageNum(s, 8);

  const groups = [
    { t: "Langages", items: ["JavaScript", "PHP", "SQL", "Delphi (lecture)"], color: TEAL },
    { t: "Base de données", items: ["Microsoft SQL Server"], color: NAVY },
    { t: "Outils", items: ["Git", "VS Code", "XAMPP", "Postman", "SQL Server Profiler", "Trello"], color: ORANGE },
    { t: "Méthodes", items: ["Développement itératif", "Tests fonctionnels", "Gestion de versions"], color: GREEN },
  ];
  let x = 0.6, y = 1.9, w = 2.9, gap = 0.22, h = 4.6;
  groups.forEach((g, i) => {
    const cx = x + i * (w + gap);
    card(s, cx, y, w, h, { fill: LIGHTBG });
    s.addShape("roundRect", { x: cx + 0.25, y: y + 0.28, w: 0.42, h: 0.08, rectRadius: 0.04, fill: { color: g.color }, line: { type: "none" } });
    s.addText(g.t, { x: cx + 0.25, y: y + 0.45, w: w - 0.5, h: 0.5, fontFace: FONT_HEAD, fontSize: 15, color: NAVY, bold: true });
    bulletBlock(s, g.items, { x: cx + 0.28, y: y + 1.05, w: w - 0.55, h: h - 1.3, fontSize: 12, spaceAfter: 10 });
  });

  card(s, 0.6, y + h + 0.22, 12.15, 0.85, { fill: NAVY });
  s.addText("Compétences Master mobilisées : bases de données relationnelles, développement web, conception d'API, méthodes de test, génie logiciel.", {
    x: 0.95, y: y + h + 0.22, w: 11.5, h: 0.85, valign: "middle", fontFace: FONT_BODY, fontSize: 12.5, color: "FFFFFF", italic: true,
  });
}

/* =========================================================
   SLIDE 9 — DIVIDER PARTIE 2
   ========================================================= */
sectionDivider("02", "Partie 2", "Présentation du mémoire", "HEAT2VALUE — Un algorithme de valorisation thermique pour l'optimisation énergétique des Data Centers Cloud");

/* =========================================================
   SLIDE 10 — INTRODUCTION / PROBLEMATIQUE
   ========================================================= */
{
  let s = baseContentSlide("Introduction & problématique", "Partie 2 · Contexte");
  pageNum(s, 10);

  bulletBlock(s, [
    "Les Data Centers, piliers du numérique, consomment des quantités massives d'électricité et rejettent beaucoup de CO₂",
    "L'essor de l'intelligence artificielle amplifie cette consommation encore plus rapidement",
    "Les infrastructures doivent rester performantes tout en réduisant leur impact environnemental",
  ], { x: 0.6, y: 1.95, w: 7.1, h: 3.0, fontSize: 15.5, spaceAfter: 16 });

  card(s, 0.6, 5.05, 7.1, 1.55, { fill: NAVY });
  s.addText("Comment optimiser la performance énergétique des Data Centers Cloud afin de réduire durablement leur empreinte carbone ?", {
    x: 0.95, y: 5.05, w: 6.5, h: 1.55, valign: "middle", fontFace: FONT_HEAD, fontSize: 16, color: "FFFFFF", italic: true, bold: true,
  });

  // 3 KPI cards
  const kpis = [
    { n: "PUE", d: "Efficacité électrique", color: TEAL },
    { n: "CUE", d: "Émissions de carbone", color: ORANGE },
    { n: "WUE", d: "Consommation d'eau", color: GREEN },
  ];
  let ky = 1.95;
  kpis.forEach((k, i) => {
    const cy = ky + i * 1.62;
    card(s, 8.05, cy, 4.7, 1.4, { fill: LIGHTBG });
    s.addText(k.n, { x: 8.3, y: cy + 0.15, w: 1.6, h: 1.1, valign: "middle", fontFace: FONT_HEAD, fontSize: 26, bold: true, color: k.color });
    s.addText(k.d, { x: 9.9, y: cy, w: 2.75, h: 1.4, valign: "middle", fontFace: FONT_BODY, fontSize: 13, color: TEXT });
  });
}

/* =========================================================
   SLIDE 11 — SOLUTIONS LITTERATURE ET LIMITES
   ========================================================= */
{
  let s = baseContentSlide("Solutions de la littérature et leurs limites", "Partie 2 · Chapitre 1 — État de l'art");
  pageNum(s, 11);

  s.addText("Quatre piliers d'optimisation identifiés dans la recherche récente (2024-2025)", {
    x: 0.6, y: 1.7, w: 12.1, h: 0.4, fontFace: FONT_BODY, fontSize: 13.5, italic: true, color: GRAY,
  });

  const rows = [
    ["Stratégie", "Mécanisme clé", "Impact ciblé", "Limite principale"],
    ["Optimisation logicielle", "Power Capping & DVFS dynamique", "PUE", "Complexité de l'algorithme de contrôle"],
    ["Flexibilité géographique", "Carbon-Aware Migration (Follow the Sun)", "CUE", "Latence liée au transfert de données"],
    ["Indépendance énergétique", "Éolien direct + BESS", "Réseau fossile", "Investissement initial (CAPEX) massif"],
    ["Gestion holistique", "IA multi-objectifs (SHIELD)", "PUE / CUE / WUE", "Très grande complexité technique"],
  ];
  const colW = [2.55, 3.85, 2.3, 3.45];
  let tblRows = rows.map((r, i) => r.map((c, j) => ({
    text: c,
    options: {
      fontFace: FONT_BODY, fontSize: 11.5, color: i === 0 ? "FFFFFF" : TEXT, bold: i === 0,
      fill: { color: i === 0 ? NAVY : (i % 2 === 0 ? LIGHTBG : "FFFFFF") },
      align: j === 0 ? "left" : "left", valign: "middle",
    },
  })));
  s.addTable(tblRows, { x: 0.6, y: 2.25, w: 12.15, colW, rowH: 0.78, border: { type: "solid", color: "DDE3E6", pt: 0.75 }, autoPage: false });

  card(s, 0.6, 6.55, 12.15, 0.7, { fill: "FDECEA" });
  s.addText("Limite commune : la chaleur produite par les serveurs reste traitée comme un déchet à éliminer, jamais comme une ressource à valoriser.", {
    x: 0.9, y: 6.55, w: 11.6, h: 0.7, valign: "middle", fontFace: FONT_BODY, fontSize: 12.5, color: RED, bold: true, italic: true,
  });
}

/* =========================================================
   SLIDE 12 — CHAPITRE 2 : HEAT2VALUE, elimination -> valorisation
   ========================================================= */
{
  let s = baseContentSlide("HEAT2VALUE : de l'élimination à la valorisation", "Partie 2 · Chapitre 2 — La solution");
  pageNum(s, 12);

  card(s, 0.6, 1.9, 5.85, 4.65, { fill: "FDECEA" });
  s.addText("Limites des approches actuelles", { x: 0.95, y: 2.1, w: 5.2, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: RED, bold: true });
  bulletBlock(s, [
    "La chaleur est systématiquement traitée comme un déchet inévitable",
    "Elle est évacuée via tours de refroidissement, climatiseurs, évaporation",
    "On paie deux fois : produire l'électricité, puis évacuer la chaleur générée",
  ], { x: 0.95, y: 2.65, w: 5.2, h: 3.7, fontSize: 13, spaceAfter: 14 });

  card(s, 6.65, 1.9, 6.1, 4.65, { fill: "EAF5EE" });
  s.addText("Le changement de paradigme HEAT2VALUE", { x: 7.0, y: 2.1, w: 5.5, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: GREEN, bold: true });
  bulletBlock(s, [
    "La chaleur devient une ressource à exploiter, pas un déchet à éliminer",
    "Elle peut chauffer des bâtiments voisins, alimenter un réseau urbain ou être stockée",
    "Réduction simultanée de l'énergie de refroidissement, du carbone et de l'eau",
    "Création d'une valeur environnementale nouvelle, mesurée par le HRR",
  ], { x: 7.0, y: 2.65, w: 5.5, h: 3.7, fontSize: 13, spaceAfter: 12 });

  s.addShape("line", { x: 6.55, y: 2.3, w: 0, h: 4.0, line: { color: "DDE3E6", width: 1.5, dashType: "dash" } });
  s.addText("→", { x: 6.15, y: 3.9, w: 1.0, h: 0.8, align: "center", valign: "middle", fontSize: 34, bold: true, color: ORANGE, fontFace: FONT_BODY });
}

/* =========================================================
   SLIDE 13 — COMPARAISON SOLUTIONS EXISTANTES
   ========================================================= */
{
  let s = baseContentSlide("Positionnement : HEAT2VALUE vs solutions existantes", "Partie 2 · Chapitre 2 — Positionnement");
  pageNum(s, 13);

  const head = ["Solution", "PUE", "CUE", "WUE", "Valorisation chaleur"];
  const data = [
    ["SHIELD", "✓", "✓", "✓", "✗"],
    ["WaterWise", "✗", "✓", "✓", "✗"],
    ["Carbon-Aware Scheduling", "✗", "✓", "✗", "✗"],
    ["Refroidissement par liquide", "✓", "✗", "✗", "✗"],
    ["HEAT2VALUE", "✓", "✓", "✓", "✓"],
  ];
  let rows = [head.map((c) => ({ text: c, options: { fontFace: FONT_BODY, fontSize: 13, bold: true, color: "FFFFFF", fill: { color: NAVY }, align: "center", valign: "middle" } }))];
  data.forEach((r, i) => {
    const isH2V = r[0] === "HEAT2VALUE";
    rows.push(r.map((c, j) => {
      const isCheck = c === "✓", isCross = c === "✗";
      return {
        text: c,
        options: {
          fontFace: FONT_BODY, fontSize: j === 0 ? 13.5 : 18, bold: j === 0 || isH2V,
          color: isCheck ? GREEN : isCross ? "C7CBCE" : (isH2V ? "FFFFFF" : TEXT),
          fill: { color: isH2V ? ORANGE : (i % 2 === 0 ? LIGHTBG : "FFFFFF") },
          align: j === 0 ? "left" : "center", valign: "middle",
        },
      };
    }));
  });
  s.addTable(rows, { x: 0.9, y: 2.15, w: 11.55, colW: [3.9, 1.9, 1.9, 1.9, 1.95], rowH: 0.7, border: { type: "solid", color: "DDE3E6", pt: 0.75 }, autoPage: false });

  s.addText("HEAT2VALUE est la seule solution qui intègre simultanément les trois indicateurs classiques tout en ajoutant une quatrième dimension : la valorisation de la chaleur résiduelle.", {
    x: 0.9, y: 6.35, w: 11.55, h: 0.85, fontFace: FONT_BODY, fontSize: 13.5, italic: true, color: NAVY, valign: "top",
  });
}

/* =========================================================
   SLIDE 14 — NOUVEAU KPI HRR
   ========================================================= */
{
  let s = baseContentSlide("Le nouveau KPI : Heat Reuse Ratio (HRR)", "Partie 2 · Chapitre 2 — Contribution originale");
  pageNum(s, 14);

  card(s, 0.6, 1.9, 5.6, 2.05, { fill: NAVY });
  s.addText("HRR = Chaleur réutilisée (kWh) / Chaleur totale produite (kWh)", {
    x: 0.95, y: 1.9, w: 4.95, h: 2.05, valign: "middle", fontFace: FONT_HEAD, fontSize: 16.5, color: "FFFFFF", bold: true, align: "center",
  });

  const scale = [
    { v: "0", d: "Toute la chaleur est rejetée — Data Center classique", color: RED },
    { v: "0,80", d: "80% de la chaleur valorisée — résultat obtenu en hiver", color: ORANGE },
    { v: "1", d: "Toute la chaleur produite est réutilisée — cas idéal", color: GREEN },
  ];
  let sy = 4.15;
  scale.forEach((r, i) => {
    const cy = sy + i * 0.75;
    s.addShape("roundRect", { x: 0.6, y: cy, w: 1.1, h: 0.55, rectRadius: 0.06, fill: { color: r.color }, line: { type: "none" } });
    s.addText(r.v, { x: 0.6, y: cy, w: 1.1, h: 0.55, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 15, fontFace: FONT_BODY });
    s.addText(r.d, { x: 1.85, y: cy, w: 4.35, h: 0.55, valign: "middle", fontFace: FONT_BODY, fontSize: 11.5, color: TEXT });
  });

  card(s, 6.55, 1.9, 6.2, 4.75, { fill: LIGHTBG });
  s.addText("Pourquoi ce KPI est original et nécessaire", { x: 6.9, y: 2.1, w: 5.6, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: NAVY, bold: true });
  bulletBlock(s, [
    "PUE, CUE et WUE mesurent uniquement ce qui entre dans le système ou ce qui en sort sous forme de pollution",
    "Aucun d'eux ne s'intéresse à ce que le Data Center produit et pourrait valoriser",
    "La chaleur générée reste invisible dans ces mesures, même lorsqu'elle remplace une chaudière à gaz",
    "Le HRR rend visible un impact environnemental positif jusqu'ici ignoré : on mesure ce que l'on choisit de valoriser",
  ], { x: 6.9, y: 2.65, w: 5.6, h: 3.9, fontSize: 12.5, spaceAfter: 13 });
}

/* =========================================================
   SLIDE 15 — NOUVEAU SCORE ENVIRONNEMENTAL
   ========================================================= */
{
  let s = baseContentSlide("Le nouveau score environnemental global", "Partie 2 · Chapitre 2 — Score H2V");
  pageNum(s, 15);

  card(s, 0.6, 1.95, 12.15, 1.7, { fill: NAVY });
  s.addText("Score H2V = α·PUE + β·CUE + γ·WUE − δ·HRR", {
    x: 0.6, y: 1.95, w: 12.15, h: 1.7, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 26, color: "FFFFFF", bold: true,
  });

  const items = [
    { t: "α, β, γ", d: "Poids attribués aux trois indicateurs classiques, ajustables selon le contexte (ex. augmenter γ en zone de stress hydrique)" },
    { t: "δ", d: "Poids attribué à la valorisation thermique : plus il est élevé, plus le système récompense la valorisation de la chaleur" },
    { t: "HRR soustrait", d: "Volontairement soustrait : plus il est élevé, plus le bilan est bon, donc plus le score global doit baisser" },
  ];
  let x = 0.6, y = 4.05, w = 3.9, gap = 0.22, h = 2.5;
  items.forEach((it, i) => {
    const cx = x + i * (w + gap);
    card(s, cx, y, w, h, { fill: LIGHTBG });
    s.addText(it.t, { x: cx + 0.25, y: y + 0.2, w: w - 0.5, h: 0.55, fontFace: FONT_HEAD, fontSize: 18, color: ORANGE, bold: true });
    s.addText(it.d, { x: cx + 0.25, y: y + 0.8, w: w - 0.5, h: h - 1.0, fontFace: FONT_BODY, fontSize: 12, color: TEXT, valign: "top", lineSpacing: 15 });
  });

  s.addText("Un score bas signifie une meilleure performance environnementale globale — vision unifiée des quatre indicateurs en une seule valeur.", {
    x: 0.6, y: 6.75, w: 12.15, h: 0.5, fontFace: FONT_BODY, fontSize: 12.5, italic: true, color: GRAY, align: "center",
  });
}

/* =========================================================
   SLIDE 16 — ARCHITECTURE : DONNEES D'ENTREE
   ========================================================= */
{
  let s = baseContentSlide("Architecture de l'algorithme : données d'entrée", "Partie 2 · Chapitre 2 — Fonctionnement");
  pageNum(s, 16);

  s.addText("Trois types de données, collectées toutes les 15 minutes, complémentaires et indissociables :", {
    x: 0.6, y: 1.75, w: 12.1, h: 0.5, fontFace: FONT_BODY, fontSize: 14, italic: true, color: GRAY,
  });

  const cols = [
    { title: "Données internes", icon: "🖥", d: "Charge de travail des serveurs. 95% de l'électricité consommée se transforme en chaleur : c'est le point de départ de toute décision.", color: TEAL },
    { title: "Données météo", icon: "🌡", d: "Température extérieure. Sous 18°C, les bâtiments voisins ont besoin de chauffage — seuil qui déclenche ou non la réutilisation.", color: GREEN },
    { title: "Données énergétiques", icon: "⚡", d: "Intensité carbone du réseau (gCO₂/kWh). Guide la décision de stocker la chaleur quand le réseau est polluant.", color: ORANGE },
  ];
  let x = 0.6, y = 2.5, w = 3.9, gap = 0.22, h = 4.1;
  cols.forEach((c, i) => {
    const cx = x + i * (w + gap);
    card(s, cx, y, w, h, { fill: LIGHTBG });
    s.addShape("ellipse", { x: cx + 0.3, y: y + 0.3, w: 0.75, h: 0.75, fill: { color: c.color }, line: { type: "none" } });
    s.addText(c.icon, { x: cx + 0.3, y: y + 0.3, w: 0.75, h: 0.75, align: "center", valign: "middle", fontSize: 24 });
    s.addText(c.title, { x: cx + 0.3, y: y + 1.2, w: w - 0.6, h: 0.55, fontFace: FONT_HEAD, fontSize: 15.5, color: NAVY, bold: true });
    s.addText(c.d, { x: cx + 0.3, y: y + 1.8, w: w - 0.6, h: h - 2.0, fontFace: FONT_BODY, fontSize: 12, color: TEXT, valign: "top", lineSpacing: 15 });
  });
}

/* =========================================================
   SLIDE 17 — 3 OPTIONS DESTINATION CHALEUR
   ========================================================= */
{
  let s = baseContentSlide("Les trois options de destination de la chaleur", "Partie 2 · Chapitre 2 — Fonctionnement");
  pageNum(s, 17);

  const head = ["Option", "Condition de déclenchement", "Chaleur valorisée", "Pertes"];
  const data = [
    ["A — Réutilisation", "Température < 18°C", "80%", "20%"],
    ["B — Stockage", "Carbone > 150 gCO₂/kWh ET réservoir < 90%", "70%", "30%"],
    ["C — Rejet", "Aucune autre option disponible", "0%", "100%"],
  ];
  const colors = [GREEN, ORANGE, RED];
  let rows = [head.map((c) => ({ text: c, options: { fontFace: FONT_BODY, fontSize: 13.5, bold: true, color: "FFFFFF", fill: { color: NAVY }, align: "center", valign: "middle" } }))];
  data.forEach((r, i) => {
    rows.push(r.map((c, j) => ({
      text: c,
      options: {
        fontFace: FONT_BODY, fontSize: j === 0 ? 14 : 13, bold: j === 0 || j === 2,
        color: j === 0 || j === 2 ? colors[i] : TEXT,
        fill: { color: i % 2 === 0 ? LIGHTBG : "FFFFFF" },
        align: j === 0 ? "left" : "center", valign: "middle",
      },
    })));
  });
  s.addTable(rows, { x: 0.6, y: 1.9, w: 12.15, colW: [2.85, 5.15, 2.15, 2.0], rowH: 0.85, border: { type: "solid", color: "DDE3E6", pt: 0.75 }, autoPage: false });

  s.addText("Priorité stricte : la réutilisation est toujours privilégiée, le stockage vient en second, le rejet est le dernier recours.", {
    x: 0.6, y: 5.75, w: 12.15, h: 0.5, fontFace: FONT_BODY, fontSize: 12.5, italic: true, color: GRAY, align: "center",
  });

  card(s, 0.6, 6.45, 12.15, 0.75, { fill: "EAF5EE" });
  s.addText("La chaleur des serveurs devient une décision environnementale prise toutes les 15 minutes — et non plus un simple déchet thermique.", {
    x: 0.9, y: 6.45, w: 11.6, h: 0.75, valign: "middle", fontFace: FONT_BODY, fontSize: 12, color: GREEN, bold: true, italic: true,
  });
}

/* =========================================================
   SLIDE 18 — MOTEUR DE DECISION (figure)
   ========================================================= */
{
  let s = baseContentSlide("Le moteur de décision : logique de priorité", "Partie 2 · Chapitre 2 — Fonctionnement");
  pageNum(s, 18);
  const fit = fitImage(1168, 1346, 4.05, 1.75, 5.2, 5.35);
//   imgCard(s, A + "decision_engine.png", fit.x, fit.y, fit.w, fit.h);

  s.addText("Une hiérarchie justifiée :", { x: 0.5, y: 2.1, w: 3.4, h: 0.4, fontFace: FONT_HEAD, fontSize: 14, color: NAVY, bold: true, align: "right" });
  bulletBlock(s, [
    { text: "Réutilisation prioritaire : valorisation immédiate, sans délai ni perte supplémentaire", opts: { align: "right" } },
    { text: "Stockage en 2ème position : différer la valorisation quand le réseau est polluant", opts: { align: "right" } },
    { text: "Rejet en dernier recours : correspond au Data Center classique, ce que HEAT2VALUE évite", opts: { align: "right" } },
  ], { x: 9.5, y: 2.1, w: 3.25, h: 4.6, fontSize: 11.5, spaceAfter: 14 });
  // fix: put left column text instead — redo with left text col at x=0.5
}

/* =========================================================
   SLIDE 19 — SCENARIOS CONCRETS
   ========================================================= */
{
  let s = baseContentSlide("Illustration par des scénarios concrets", "Partie 2 · Chapitre 2 — Comportement");
  pageNum(s, 19);

  const scen = [
    { t: "Hiver", icon: "❄", d: "Température < 18°C en continu → Option A systématique. Valorisation continue, meilleur scénario pour HEAT2VALUE : les 4 indicateurs s'améliorent simultanément.", color: TEAL },
    { t: "Été", icon: "☀", d: "Température > 18°C, carbone bas (nucléaire/solaire) → Option C (rejet classique). Limite saisonnière réelle et assumée de l'algorithme.", color: ORANGE },
    { t: "Transition", icon: "🍂", d: "Température oscille autour de 18°C → les 3 options interviennent dans la même journée. Illustre au mieux la flexibilité et l'adaptabilité de l'algorithme.", color: GREEN },
  ];
  let x = 0.6, y = 1.95, w = 3.9, gap = 0.22, h = 4.85;
  scen.forEach((c, i) => {
    const cx = x + i * (w + gap);
    card(s, cx, y, w, h, { fill: LIGHTBG });
    s.addShape("ellipse", { x: cx + 0.3, y: y + 0.3, w: 0.85, h: 0.85, fill: { color: c.color }, line: { type: "none" } });
    s.addText(c.icon, { x: cx + 0.3, y: y + 0.3, w: 0.85, h: 0.85, align: "center", valign: "middle", fontSize: 30 });
    s.addText(c.t, { x: cx + 0.25, y: y + 1.3, w: w - 0.5, h: 0.5, fontFace: FONT_HEAD, fontSize: 18, color: NAVY, bold: true, align: "center" });
    s.addText(c.d, { x: cx + 0.3, y: y + 1.95, w: w - 0.6, h: h - 2.2, fontFace: FONT_BODY, fontSize: 12.5, color: TEXT, valign: "top", lineSpacing: 16 });
  });
}

/* =========================================================
   SLIDE 20 — JUSTIFICATION PYTHON
   ========================================================= */
{
  let s = baseContentSlide("Choix techniques : Python et ses bibliothèques", "Partie 2 · Chapitre 2 — Faisabilité");
  pageNum(s, 20);

  card(s, 0.6, 1.9, 5.7, 4.7, { fill: LIGHTBG });
  s.addText("Pourquoi Python ?", { x: 0.95, y: 2.1, w: 5.0, h: 0.45, fontFace: FONT_HEAD, fontSize: 16, color: NAVY, bold: true });
  bulletBlock(s, [
    "Langage de référence de la communauté scientifique en optimisation des infrastructures numériques",
    "Cohérence avec les pratiques de recherche (SHIELD, Carbon-Aware, Deep RL)",
    "Écosystème riche de bibliothèques scientifiques",
    "Accessible, lisible et facilement maintenable — essentiel pour un déploiement industriel",
  ], { x: 0.95, y: 2.65, w: 5.0, h: 3.8, fontSize: 12.5, spaceAfter: 13 });

  const libs = [
    { n: "NumPy", d: "Calculs mathématiques : formules du HRR, du Score H2V et des indicateurs classiques" },
    { n: "Pandas", d: "Gestion des données temporelles : mesures toutes les 15 minutes sur 24 heures" },
    { n: "Matplotlib", d: "Visualisation des résultats : graphiques de comparaison avant/après HEAT2VALUE" },
  ];
  let ly = 1.9;
  libs.forEach((l, i) => {
    const cy = ly + i * 1.6;
    card(s, 6.6, cy, 6.15, 1.4, { fill: "FFFFFF" });
    s.addShape("roundRect", { x: 6.85, y: cy + 0.28, w: 1.5, h: 0.84, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" } });
    s.addText(l.n, { x: 6.85, y: cy + 0.28, w: 1.5, h: 0.84, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 13, fontFace: FONT_BODY });
    s.addText(l.d, { x: 8.55, y: cy, w: 4.0, h: 1.4, valign: "middle", fontFace: FONT_BODY, fontSize: 11.5, color: TEXT });
  });
}

/* =========================================================
   SLIDE 21 — CHAPITRE 3 : ARCHITECTURE MODULAIRE
   ========================================================= */
{
  let s = baseContentSlide("Chapitre 3 — Architecture modulaire de l'implémentation", "Partie 2 · Implémentation");
  pageNum(s, 21);

  s.addText("Cinq modules Python indépendants, chacun testable séparément :", {
    x: 0.6, y: 1.7, w: 12.1, h: 0.4, fontFace: FONT_BODY, fontSize: 13.5, italic: true, color: GRAY,
  });
  const fit = fitImage(1390, 1012, 3.3, 2.15, 6.7, 4.9);
//   imgCard(s, A + "architecture_modules.png", fit.x, fit.y, fit.w, fit.h);
}

/* =========================================================
   SLIDE 22 — JUSTIFICATION SIMULATION + DONNEES UTILISEES
   ========================================================= */
{
  let s = baseContentSlide("Justification de la simulation & données utilisées", "Partie 2 · Implémentation");
  pageNum(s, 22);

  card(s, 0.6, 1.9, 5.7, 4.7, { fill: LIGHTBG });
  s.addText("Pourquoi la simulation ?", { x: 0.95, y: 2.1, w: 5.0, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: NAVY, bold: true });
  bulletBlock(s, [
    "Un Data Center est un environnement critique : impossible de tester un algorithme en conditions réelles sans risque",
    "La simulation permet des conditions contrôlées, reproductibles, et une comparaison stricte avec/sans HEAT2VALUE",
    "Les tests sont enrichis par des données réelles (Electricity Maps, 2024) pour renforcer la crédibilité des résultats",
  ], { x: 0.95, y: 2.65, w: 5.0, h: 3.8, fontSize: 12.5, spaceAfter: 14 });

  const sources = [
    { n: "1. Données simulées", d: "Data Center type sur 24h, mesure toutes les 15 min ; charge réaliste faible la nuit, pic en fin d'après-midi" },
    { n: "2. Données réelles", d: "Electricity Maps 2024 (réseau français) : 15 janvier (hiver), 15 juillet (été), 30 décembre (pic de conso)" },
    { n: "3. Jeu de test CSV", d: "12 scénarios construits manuellement : vague de froid, canicule, transitions, pics de carbone, cas extrêmes" },
  ];
  let ly = 1.9;
  sources.forEach((l, i) => {
    const cy = ly + i * 1.6;
    card(s, 6.6, cy, 6.15, 1.4, { fill: "FFFFFF" });
    s.addText(l.n, { x: 6.9, y: cy + 0.15, w: 5.6, h: 0.4, fontFace: FONT_HEAD, fontSize: 13.5, color: ORANGE, bold: true });
    s.addText(l.d, { x: 6.9, y: cy + 0.55, w: 5.6, h: 0.8, fontFace: FONT_BODY, fontSize: 11.5, color: TEXT, valign: "top", lineSpacing: 14 });
  });
}

/* =========================================================
   SLIDE 23 — SIMULATEUR.PY
   ========================================================= */
{
  let s = baseContentSlide("Le simulateur de Data Center — simulateur.py", "Partie 2 · Implémentation · Module 1");
  pageNum(s, 23);

  bulletBlock(s, [
    "Génère 96 points de données sur 24h (mesure toutes les 15 min)",
    "Charge des serveurs : progression linéaire 30% → 90% + bruit aléatoire",
    "Puissance max : 1000 kW ; chaleur produite = 0.95 × puissance consommée",
    "Température et carbone générés, ou remplacés par des données réelles",
  ], { x: 0.6, y: 1.85, w: 12.1, h: 1.9, fontSize: 13.5, spaceAfter: 8 });

  s.addText("Extrait des données produites — scénario de référence (15 janvier 2024)", {
    x: 0.6, y: 4.0, w: 12.1, h: 0.4, fontFace: FONT_HEAD, fontSize: 13, color: NAVY, bold: true,
  });
  const fit = fitImage(850, 200, 1.0, 4.55, 11.3, 2.55);
//   imgCard(s, A + "sim_table.png", fit.x, fit.y, fit.w, fit.h);
}

/* =========================================================
   SLIDE 24 — DECISION.PY
   ========================================================= */
{
  let s = baseContentSlide("Le module de décision — decision.py", "Partie 2 · Implémentation · Module 2");
  pageNum(s, 24);

  bulletBlock(s, [
    "Reçoit les données du simulateur et évalue les 96 instants de la journée",
    { text: "Trois paramètres fixes : SEUIL_TEMP = 18°C · SEUIL_CARBONE = 150 gCO₂/kWh · CAPACITÉ_RÉSERVOIR = 5000 kWh (limite 90%)", opts: {} },
    "Enregistre la décision prise et les quantités de chaleur réutilisée, stockée et rejetée à chaque pas de temps",
  ], { x: 0.6, y: 1.85, w: 12.1, h: 1.85, fontSize: 13.5, spaceAfter: 8 });

  s.addText("Décisions prises — scénario hiver (15 janvier 2024)", {
    x: 0.6, y: 3.95, w: 12.1, h: 0.4, fontFace: FONT_HEAD, fontSize: 13, color: NAVY, bold: true,
  });
  const fit = fitImage(848, 374, 2.05, 4.4, 9.2, 2.9);
//   imgCard(s, A + "decision_table.png", fit.x, fit.y, fit.w, fit.h);
}

/* =========================================================
   SLIDE 25 — KPI.PY
   ========================================================= */
{
  let s = baseContentSlide("Le module de calcul des KPI — kpi.py", "Partie 2 · Implémentation · Module 3");
  pageNum(s, 25);

  bulletBlock(s, [
    { text: "PUE", opts: { bold: true } }, " : puissance IT + refroidissement (5% réutilisation / 10% stockage / 30% rejet)",
    { text: "CUE", opts: { bold: true } }, " : émissions totales − émissions évitées (chaudière à gaz remplacée, 200 gCO₂/kWh), plancher à 0",
    { text: "WUE", opts: { bold: true } }, " : 0.5 L/kWh (réutilisation) · 0.8 L/kWh (stockage) · 1.8 L/kWh (rejet classique)",
  ].reduce((a) => a, []), { x: 0.6, y: 1.85, w: 5.7, h: 0.1, fontSize: 1 }); // no-op guard

  s.addText([
    { text: "PUE", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: " : puissance IT + refroidissement, qui dépend de la décision (5% réutilisation, 10% stockage, 30% rejet)\n\n", options: { fontSize: 12.5, color: TEXT } },
    { text: "CUE", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: " : émissions totales moins émissions évitées par la valorisation (chaudière à gaz, 200 gCO₂/kWh), plancher à 0\n\n", options: { fontSize: 12.5, color: TEXT } },
    { text: "WUE", options: { bold: true, color: NAVY, fontSize: 13.5 } },
    { text: " : dépend directement de la décision — 0.5 / 0.8 / 1.8 L/kWh selon réutilisation, stockage ou rejet", options: { fontSize: 12.5, color: TEXT } },
  ], { x: 0.6, y: 1.85, w: 5.6, h: 4.6, valign: "top", lineSpacing: 17 });

  s.addText("KPI calculés — extrait (15 janvier 2024)", {
    x: 6.6, y: 1.85, w: 6.1, h: 0.4, fontFace: FONT_HEAD, fontSize: 13, color: NAVY, bold: true,
  });
  const fit = fitImage(469, 205, 6.75, 2.35, 5.9, 2.58);
  // imgCard(s, A + "kpi_table.png", fit.x, fit.y, fit.w, fit.h);
}

/* =========================================================
   SLIDE 26 — RESULTATS COMPARAISON 24H (table)
   ========================================================= */
{
  let s = baseContentSlide("Résultats : comparaison avec / sans HEAT2VALUE sur 24h", "Partie 2 · Résultats · Données simulées");
  pageNum(s, 26);

  const fit = fitImage(660, 237, 1.5, 2.0, 10.3, 3.5);
  // imgCard(s, A + "comparison_table.png", fit.x, fit.y, fit.w, fit.h);

  const stats = [
    { v: "-25%", d: "PUE : 1.30 → 1.05", color: TEAL },
    { v: "-80%", d: "CUE : 221.36 → 43.86", color: ORANGE },
    { v: "-75%", d: "WUE : 2.0 → 0.5 L/kWh", color: GREEN },
    { v: "0.80", d: "HRR atteint (vs 0)", color: NAVY },
  ];
  let x = 0.7, w = 2.85, gap = 0.13, y = 5.85;
  stats.forEach((st, i) => {
    const cx = x + i * (w + gap);
    card(s, cx, y, w, 1.15, { fill: LIGHTBG });
    s.addText(st.v, { x: cx, y: y + 0.08, w, h: 0.55, align: "center", fontFace: FONT_HEAD, fontSize: 22, bold: true, color: st.color });
    s.addText(st.d, { x: cx, y: y + 0.65, w, h: 0.42, align: "center", fontFace: FONT_BODY, fontSize: 10, color: GRAY });
  });
}

/* =========================================================
   SLIDE 27 — GRAPHIQUE COMPARATIF
   ========================================================= */
{
  let s = baseContentSlide("Résultats : graphique comparatif des indicateurs", "Partie 2 · Résultats · Données simulées");
  pageNum(s, 27);

  const fit = fitImage(947, 922, 4.15, 1.75, 5.0, 4.9);
  // imgCard(s, A + "comparison_graph.png", fit.x, fit.y, fit.w, fit.h);

  s.addText([
    { text: "PUE", options: { bold: true, color: TEAL, fontSize: 12.5 } },
    { text: " — ligne rouge constante à 1.30 (gaspillage permanent) ; ligne verte à 1.05 (réutilisation continue)\n\n", options: { fontSize: 11, color: TEXT } },
  ], { x: 0.45, y: 2.15, w: 3.5, h: 1.5, valign: "top", align: "left", lineSpacing: 14 });
  s.addText([
    { text: "CUE", options: { bold: true, color: ORANGE, fontSize: 12.5 } },
    { text: " — les deux courbes augmentent le soir, mais la verte reste nettement sous la rouge grâce aux émissions évitées\n\n", options: { fontSize: 11, color: TEXT } },
  ], { x: 9.4, y: 2.15, w: 3.5, h: 1.5, valign: "top", align: "left", lineSpacing: 14 });
  s.addText([
    { text: "WUE", options: { bold: true, color: GREEN, fontSize: 12.5 } },
    { text: " — réduction immédiate, constante et très significative de la consommation d'eau", options: { fontSize: 11, color: TEXT } },
  ], { x: 0.45, y: 5.4, w: 3.5, h: 1.2, valign: "top", align: "left", lineSpacing: 14 });
}

/* =========================================================
   SLIDE 28 — RESULTATS DONNEES REELLES
   ========================================================= */
{
  let s = baseContentSlide("Résultats sur données réelles Electricity Maps (2024)", "Partie 2 · Résultats · Données réelles");
  pageNum(s, 28);

  const head = ["Journée", "Température", "Carbone moyen", "Décision", "PUE", "CUE", "WUE", "HRR"];
  const data = [
    ["15 janvier — hiver", "2°C–10°C", "30 gCO₂/kWh", "Réutilisation", "1.050", "0.00", "0.50", "80%"],
    ["15 juillet — été", "22°C–35°C", "4.75 gCO₂/kWh", "Rejet", "1.300", "9.09", "1.80", "0%"],
    ["30 décembre — pic conso.", "5°C–12°C", "17 gCO₂/kWh", "Réutilisation", "1.050", "0.00", "0.50", "80%"],
  ];
  let rows = [head.map((c) => ({ text: c, options: { fontFace: FONT_BODY, fontSize: 11.5, bold: true, color: "FFFFFF", fill: { color: NAVY }, align: "center", valign: "middle" } }))];
  data.forEach((r, i) => {
    rows.push(r.map((c, j) => ({
      text: c,
      options: {
        fontFace: FONT_BODY, fontSize: 11.5, bold: j === 3,
        color: j === 3 ? (c === "Réutilisation" ? GREEN : RED) : TEXT,
        fill: { color: i % 2 === 0 ? LIGHTBG : "FFFFFF" },
        align: j === 0 ? "left" : "center", valign: "middle",
      },
    })));
  });
  s.addTable(rows, { x: 0.5, y: 1.95, w: 12.35, colW: [2.55, 1.5, 1.7, 1.7, 1.15, 1.15, 1.15, 1.45], rowH: 0.75, border: { type: "solid", color: "DDE3E6", pt: 0.75 }, autoPage: false });

  s.addText("Le réseau électrique français est exceptionnellement propre (4 à 50 gCO₂/kWh réels) : HEAT2VALUE serait encore plus pertinent dans des pays à mix énergétique plus carboné (Allemagne, Pologne).", {
    x: 0.5, y: 4.6, w: 12.35, h: 0.8, fontFace: FONT_BODY, fontSize: 12.5, italic: true, color: GRAY, valign: "top",
  });

  card(s, 0.5, 5.65, 12.35, 1.55, { fill: "EAF5EE" });
  s.addText("Meilleur cas — 15 janvier & 30 décembre : CUE nul, les émissions évitées dépassent les émissions produites, HRR = 80%.", {
    x: 0.85, y: 5.75, w: 11.7, h: 0.65, fontFace: FONT_BODY, fontSize: 12.5, color: GREEN, bold: true, valign: "middle",
  });
  s.addText("Limite saisonnière confirmée — 15 juillet : température et carbone trop bas pour déclencher toute valorisation.", {
    x: 0.85, y: 6.4, w: 11.7, h: 0.65, fontFace: FONT_BODY, fontSize: 12.5, color: RED, bold: true, valign: "middle",
  });
}

/* =========================================================
   SLIDE 29 — RESULTATS 12 SCENARIOS
   ========================================================= */
{
  let s = baseContentSlide("Résultats sur les 12 scénarios : analyse comparative", "Partie 2 · Résultats · Jeu de test");
  pageNum(s, 29);

  const fit = fitImage(672, 313, 0.9, 1.85, 6.9, 3.2);
  // imgCard(s, A + "scenarios12_table.png", fit.x, fit.y, fit.w, fit.h);

  const concl = [
    { t: "Saison froide", d: "7 scénarios / 12 → HRR = 80%, PUE = 1.05, WUE = 0.50 : valorisation systématique", color: GREEN },
    { t: "Transition automne", d: "Le plus riche : les 3 options actives dans la même journée. HRR = 37%, PUE = 1.152", color: ORANGE },
    { t: "Limite saisonnière", d: "4 scénarios estivaux : HRR = 0%, PUE = 1.30, WUE = 1.80 — comportement classique", color: RED },
  ];
  let cy = 1.85;
  concl.forEach((c, i) => {
    const y = cy + i * 1.65;
    card(s, 8.15, y, 4.7, 1.45, { fill: LIGHTBG });
    s.addShape("roundRect", { x: 8.4, y: y + 0.2, w: 0.32, h: 0.32, rectRadius: 0.3, fill: { color: c.color }, line: { type: "none" } });
    s.addText(c.t, { x: 8.85, y: y + 0.15, w: 3.9, h: 0.42, fontFace: FONT_HEAD, fontSize: 13.5, color: NAVY, bold: true });
    s.addText(c.d, { x: 8.4, y: y + 0.62, w: 4.3, h: 0.78, fontFace: FONT_BODY, fontSize: 11, color: TEXT, valign: "top", lineSpacing: 13 });
  });
}

/* =========================================================
   SLIDE 30 — METRIQUES & SYNTHESE PAR INDICATEUR
   ========================================================= */
{
  let s = baseContentSlide("Métriques et synthèse des résultats par indicateur", "Partie 2 · Chapitre 3 — Évaluation");
  pageNum(s, 30);

  const rows = [
    { k: "PUE", ref: "Réf. : 1.30 (refroidissement classique 30%)", res: "Réduction systématique à 1.05 (-19%) dès que la réutilisation est possible", color: TEAL },
    { k: "CUE", ref: "Réf. : sans déduction d'émissions évitées", res: "Tend vers 0 en hiver (réseau propre) ; reste positif mais réduit en été / réseau carboné", color: ORANGE },
    { k: "WUE", ref: "Réf. : 1.8 L/kWh (climatisation par évaporation)", res: "Réduction significative selon le mode de refroidissement retenu", color: GREEN },
    { k: "HRR", ref: "Réf. : 0 (aucune valorisation)", res: "0.80 en scénarios froids, 37%–78% en transition, 0 en été", color: NAVY },
  ];
  let y = 1.9;
  rows.forEach((r) => {
    card(s, 0.6, y, 12.15, 1.05, { fill: LIGHTBG });
    s.addShape("roundRect", { x: 0.85, y: y + 0.22, w: 1.05, h: 0.6, rectRadius: 0.06, fill: { color: r.color }, line: { type: "none" } });
    s.addText(r.k, { x: 0.85, y: y + 0.22, w: 1.05, h: 0.6, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 15, fontFace: FONT_BODY });
    s.addText(r.ref, { x: 2.15, y: y + 0.12, w: 4.1, h: 0.8, valign: "middle", fontFace: FONT_BODY, fontSize: 11.5, italic: true, color: GRAY });
    s.addText(r.res, { x: 6.4, y: y + 0.12, w: 6.15, h: 0.8, valign: "middle", fontFace: FONT_BODY, fontSize: 12, color: TEXT });
    y += 1.2;
  });

  s.addText("Performance globale mesurée par le Score H2V — un score bas indique une meilleure performance environnementale.", {
    x: 0.6, y: 6.75, w: 12.15, h: 0.5, fontFace: FONT_BODY, fontSize: 12, italic: true, color: GRAY, align: "center",
  });
}

/* =========================================================
   SLIDE 31 — LIMITES
   ========================================================= */
{
  let s = baseContentSlide("Limites de l'algorithme et de la démarche de validation", "Partie 2 · Chapitre 3 — Limites");
  pageNum(s, 31);

  card(s, 0.6, 1.9, 5.85, 4.65, { fill: "FDECEA" });
  s.addText("Limites de l'algorithme", { x: 0.95, y: 2.1, w: 5.2, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: RED, bold: true });
  bulletBlock(s, [
    "Limite saisonnière : aucune valorisation possible en été (température > 18°C, carbone bas)",
    "Dépendance au contexte géographique : très efficace en climat froid/tempéré",
    "Dépendance au mix énergétique : réseau français trop propre pour déclencher le stockage",
    "Simplicité des seuils de décision : fixes, non adaptatifs aux conditions réelles",
  ], { x: 0.95, y: 2.65, w: 5.2, h: 3.75, fontSize: 12, spaceAfter: 12 });

  card(s, 6.65, 1.9, 6.1, 4.65, { fill: LIGHTBG });
  s.addText("Limites de la validation par simulation", { x: 7.0, y: 2.1, w: 5.5, h: 0.45, fontFace: FONT_HEAD, fontSize: 15.5, color: NAVY, bold: true });
  bulletBlock(s, [
    "Charge des serveurs simulée par une progression linéaire, moins imprévisible que la réalité",
    "Coefficients (pertes, refroidissement, eau) issus de la littérature, non spécifiques à une infrastructure réelle",
    "L'infrastructure de valorisation (réseau, réservoir, connexions) est supposée déjà existante",
  ], { x: 7.0, y: 2.65, w: 5.5, h: 3.75, fontSize: 12, spaceAfter: 13 });
}

/* =========================================================
   SLIDE 32 — AMELIORATIONS
   ========================================================= */
{
  let s = baseContentSlide("Perspectives d'amélioration et travaux futurs", "Partie 2 · Chapitre 3 — Perspectives");
  pageNum(s, 32);

  const items = [
    { t: "Prévisions météorologiques", d: "Anticiper les besoins plutôt que réagir : stocker la chaleur en avance avant une baisse de température" },
    { t: "Élargir les usages en été", d: "Eau chaude sanitaire, climatisation par absorption, séchage industriel — réduire la limite saisonnière" },
    { t: "Seuils adaptatifs", d: "Ajuster dynamiquement le seuil de carbone selon le pays, la saison ou le prix de l'électricité" },
    { t: "Tester des pays plus carbonés", d: "Allemagne, Pologne — valider l'efficacité dans des contextes énergétiques différents" },
    { t: "Déploiement pilote réel", d: "Data Center universitaire ou PME, à petite échelle, pour affiner les paramètres en conditions réelles" },
  ];
  let x = 0.6, y = 1.9, w = 3.9, h = 2.28, gapx = 0.22, gapy = 0.22;
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = x + col * (w + gapx), cy = y + row * (h + gapy);
    card(s, cx, cy, w, h, { fill: LIGHTBG });
    s.addShape("roundRect", { x: cx + 0.25, y: cy + 0.22, w: 0.4, h: 0.4, rectRadius: 0.35, fill: { color: ORANGE }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.25, y: cy + 0.22, w: 0.4, h: 0.4, align: "center", valign: "middle", color: "FFFFFF", bold: true, fontSize: 14, fontFace: FONT_BODY });
    s.addText(it.t, { x: cx + 0.75, y: cy + 0.18, w: w - 1.0, h: 0.6, fontFace: FONT_HEAD, fontSize: 13, color: NAVY, bold: true, valign: "top" });
    s.addText(it.d, { x: cx + 0.25, y: cy + 0.85, w: w - 0.5, h: h - 1.0, fontFace: FONT_BODY, fontSize: 10.8, color: TEXT, valign: "top", lineSpacing: 13 });
  });
}

/* =========================================================
   SLIDE 33 — CONCLUSION GENERALE
   ========================================================= */
{
  let s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape("ellipse", { x: 10.6, y: -1.6, w: 4.6, h: 4.6, fill: { color: NAVY_DARK }, line: { type: "none" } });
  kicker(s, "Conclusion générale", { color: ORANGE, y: 0.55 });
  s.addText("HEAT2VALUE répond à la problématique centrale du mémoire", {
    x: 0.6, y: 0.95, w: 12.1, h: 0.85, fontFace: FONT_HEAD, fontSize: 26, color: "FFFFFF", bold: true,
  });

  bulletBlock(s, [
    { text: "En valorisant la chaleur plutôt que de l'éliminer, HEAT2VALUE réduit simultanément le PUE, le CUE et le WUE", opts: { color: "FFFFFF" } },
    { text: "Le HRR et le Score H2V offrent une vision unifiée et originale de la performance environnementale des Data Centers", opts: { color: "FFFFFF" } },
    { text: "Les résultats simulés, réels (Electricity Maps) et multi-scénarios convergent vers les mêmes conclusions", opts: { color: "FFFFFF" } },
    { text: "Les limites identifiées — saisonnalité, contexte géographique — ouvrent des perspectives concrètes de recherche et de déploiement", opts: { color: "FFFFFF" } },
  ], { x: 0.6, y: 2.0, w: 8.6, h: 3.6, fontSize: 15, spaceAfter: 16 });

  card(s, 9.55, 2.0, 3.2, 4.6, { fill: NAVY_DARK, shadow: false });
  s.addText("HRR = 0.80", { x: 9.8, y: 2.35, w: 2.7, h: 0.6, fontFace: FONT_HEAD, fontSize: 22, color: ORANGE, bold: true, align: "center" });
  s.addText("en conditions hivernales", { x: 9.8, y: 2.9, w: 2.7, h: 0.4, fontFace: FONT_BODY, fontSize: 10.5, color: "CADCFC", align: "center" });
  s.addShape("line", { x: 10.0, y: 3.5, w: 2.3, h: 0, line: { color: "1B7A8C", width: 1 } });
  s.addText("-19% PUE\n-80% CUE\n-75% WUE", { x: 9.8, y: 3.7, w: 2.7, h: 1.6, fontFace: FONT_BODY, fontSize: 14, color: "FFFFFF", align: "center", bold: true, lineSpacing: 26 });

  s.addText("Optimiser la performance énergétique des Data Centers Cloud pour réduire durablement leur empreinte carbone.", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.6, fontFace: FONT_BODY, fontSize: 13, italic: true, color: "CADCFC", align: "left",
  });
}

/* =========================================================
   SLIDE 34 — MERCI
   ========================================================= */
{
  let s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape("ellipse", { x: -2.0, y: -2.2, w: 6.0, h: 6.0, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addShape("ellipse", { x: 10.2, y: 4.5, w: 5.0, h: 5.0, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addText("Merci de votre attention", {
    x: 0, y: 2.9, w: 13.33, h: 1.1, align: "center", fontFace: FONT_HEAD, fontSize: 40, color: "FFFFFF", bold: true,
  });
  s.addText("Questions ?", {
    x: 0, y: 4.0, w: 13.33, h: 0.6, align: "center", fontFace: FONT_BODY, fontSize: 18, color: ORANGE, italic: true,
  });
  s.addText("Lamia BELKADI  ·  Master 2 MIAGE  ·  ISOAR  ·  2025/2026", {
    x: 0, y: 6.7, w: 13.33, h: 0.4, align: "center", fontFace: FONT_BODY, fontSize: 12, color: "CADCFC",
  });
}

pres.writeFile({ fileName: "output.pptx" }).then(() => console.log("DONE"));