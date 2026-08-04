
const pptx = require('pptxgenjs');
const pres = new pptx();

pres.layout = 'LAYOUT_16x9';

// Color palette
const DARK_BLUE = '1B2A4A';
const ACCENT = '00B4D8';
const GREEN = '2ECC71';
const LIGHT_BG = 'F0F4F8';
const WHITE = 'FFFFFF';
const GRAY = '6B7280';
const LIGHT_GRAY = 'E5E7EB';

// ─── SLIDE 1: TITLE ────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };

  // Top accent bar
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  // Title
  slide.addText('Soutenance de Mémoire', {
    x: 0.6, y: 0.6, w: 8.8, h: 0.6,
    fontSize: 18, color: ACCENT, bold: false, fontFace: 'Calibri'
  });

  slide.addText('Optimisation Énergétique\ndes Data Centers Cloud\ngrâce à HEAT2VALUE', {
    x: 0.6, y: 1.3, w: 8.8, h: 2.2,
    fontSize: 30, color: WHITE, bold: true, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  // Divider line
  slide.addShape(pres.ShapeType.rect, { x: 0.6, y: 3.6, w: 3, h: 0.04, fill: { color: ACCENT } });

  // Info block
  slide.addText([
    { text: 'Lamia BELKADI', options: { bold: true, color: WHITE, fontSize: 14 } },
    { text: '\nM1 MIAGE — Ingénierie Logicielle pour le Web', options: { color: ACCENT, fontSize: 12 } },
    { text: '\nUniversité d\'Évry  |  ISOAR  |  2025-2026', options: { color: 'AABBD0', fontSize: 11 } },
  ], { x: 0.6, y: 3.8, w: 6, h: 1.2, fontFace: 'Calibri' });

  // Bottom accent
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 2: PLAN ───────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Plan de la présentation', {
    x: 0.5, y: 0.25, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const items = [
    { num: '01', label: 'Présentation de l\'entreprise', sub: 'ISOAR — ERP SQUALP — Missions réalisées' },
    { num: '02', label: 'Contexte et problématique', sub: 'Data Centers — Enjeux énergétiques — État de l\'art' },
    { num: '03', label: 'Solution proposée : HEAT2VALUE', sub: 'Algorithme — Architecture — KPI — HRR' },
    { num: '04', label: 'Implémentation et résultats', sub: 'Python — Tests — Comparaison — Analyse' },
    { num: '05', label: 'Conclusion et perspectives', sub: 'Limites — Améliorations futures' },
  ];

  items.forEach((item, i) => {
    const y = 1.1 + i * 0.88;

    slide.addShape(pres.ShapeType.rect, {
      x: 0.5, y: y, w: 9, h: 0.72,
      fill: { color: i % 2 === 0 ? LIGHT_BG : WHITE },
      line: { color: LIGHT_GRAY, width: 1 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0.5, y: y, w: 0.65, h: 0.72,
      fill: { color: DARK_BLUE }
    });

    slide.addText(item.num, {
      x: 0.5, y: y, w: 0.65, h: 0.72,
      fontSize: 13, bold: true, color: ACCENT, align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    slide.addText(item.label, {
      x: 1.25, y: y + 0.04, w: 7.9, h: 0.32,
      fontSize: 13, bold: true, color: DARK_BLUE, valign: 'bottom', fontFace: 'Calibri'
    });

    slide.addText(item.sub, {
      x: 1.25, y: y + 0.36, w: 7.9, h: 0.3,
      fontSize: 10, color: GRAY, valign: 'top', fontFace: 'Calibri'
    });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 3: SECTION ENTREPRISE ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('01', {
    x: 0.5, y: 1.2, w: 2, h: 1.5,
    fontSize: 80, bold: true, color: ACCENT, fontFace: 'Calibri', alpha: 30
  });

  slide.addText('Présentation\nde l\'entreprise', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('ISOAR — ERP SQUALP — Missions réalisées', {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 16, color: ACCENT, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 4: PRÉSENTATION ISOAR ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('ISOAR — Présentation', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Left column
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.95, w: 4.4, h: 4.4, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });

  slide.addText('L\'entreprise', {
    x: 0.6, y: 1.05, w: 4.1, h: 0.4,
    fontSize: 14, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.45, w: 4, h: 0.03, fill: { color: ACCENT } });

  const isoarInfo = [
    { label: 'Fondée en', val: '1992' },
    { label: 'Secteur', val: 'Informatique — Édition de logiciels ERP' },
    { label: 'Adresse', val: '11 Rue de Villeneuve, 94150 Rungis' },
    { label: 'Produit phare', val: 'ERP SQUALP (qualité industrielle)' },
    { label: 'Clients', val: 'Gascogne Bois, Polytechs, Flexelec, AGEMA, IMC, SOBIO' },
  ];

  isoarInfo.forEach((info, i) => {
    slide.addText(info.label + ' :', {
      x: 0.65, y: 1.6 + i * 0.65, w: 1.5, h: 0.35,
      fontSize: 10, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
    });
    slide.addText(info.val, {
      x: 2.2, y: 1.6 + i * 0.65, w: 2.5, h: 0.35,
      fontSize: 10, color: GRAY, fontFace: 'Calibri'
    });
  });

  // Right column
  slide.addShape(pres.ShapeType.rect, { x: 5.1, y: 0.95, w: 4.4, h: 4.4, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });

  slide.addText('Mon rôle', {
    x: 5.2, y: 1.05, w: 4.1, h: 0.4,
    fontSize: 14, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 5.2, y: 1.45, w: 4, h: 0.03, fill: { color: ACCENT } });

  slide.addText('Pôle développement informatique', {
    x: 5.2, y: 1.55, w: 4.1, h: 0.35,
    fontSize: 11, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const missions = [
    'Développement web front-end et back-end',
    'Adaptation de l\'ERP SQUALP vers le web/mobile',
    'Conception et développement d\'API REST',
    'Amélioration des interfaces utilisateurs',
    'Participation aux évolutions fonctionnelles',
    'Montée en compétences en gestion de projet',
  ];

  missions.forEach((m, i) => {
    slide.addShape(pres.ShapeType.rect, { x: 5.25, y: 2.0 + i * 0.5, w: 0.2, h: 0.2, fill: { color: ACCENT } });
    slide.addText(m, {
      x: 5.55, y: 1.97 + i * 0.5, w: 3.8, h: 0.28,
      fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri'
    });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 5: MISSIONS RÉALISÉES ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Missions réalisées chez ISOAR', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const projects = [
    {
      title: 'SQUALP Web',
      color: DARK_BLUE,
      items: ['Transfert de stocks', 'Inventaires tournant et intermittent', 'Classement des stocks', 'Ordres de services', 'Fenêtres modales pour gestion d\'articles', 'Scanner de codes-barres intégré']
    },
    {
      title: 'Projet IXAO',
      color: '6366F1',
      items: ['Système de gestion des demandes', 'Évolutions front-end', 'Modifications back-end et BDD', 'Amélioration de l\'expérience utilisateur']
    },
    {
      title: 'API REST — Gascogne Bois',
      color: '059669',
      items: ['API en JavaScript et PHP', 'Module des commandes', 'Procédures stockées SQL', 'Tests et validation avec Postman']
    }
  ];

  projects.forEach((p, i) => {
    const x = 0.3 + i * 3.25;
    slide.addShape(pres.ShapeType.rect, { x, y: 0.9, w: 3.1, h: 4.5, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x, y: 0.9, w: 3.1, h: 0.5, fill: { color: p.color } });
    slide.addText(p.title, {
      x: x + 0.1, y: 0.9, w: 2.9, h: 0.5,
      fontSize: 12, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri'
    });
    p.items.forEach((item, j) => {
      slide.addShape(pres.ShapeType.rect, { x: x + 0.2, y: 1.55 + j * 0.57, w: 0.15, h: 0.15, fill: { color: p.color } });
      slide.addText(item, {
        x: x + 0.45, y: 1.52 + j * 0.57, w: 2.55, h: 0.35,
        fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri'
      });
    });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 6: SECTION MÉMOIRE ────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('02', {
    x: 0.5, y: 1.2, w: 2, h: 1.5,
    fontSize: 80, bold: true, color: ACCENT, fontFace: 'Calibri', alpha: 30
  });

  slide.addText('Contexte\net problématique', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('Data Centers — Enjeux énergétiques — État de l\'art', {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 16, color: ACCENT, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 7: CONTEXTE ───────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Les Data Centers : un défi environnemental majeur', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 20, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Problem statement
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.9, w: 9, h: 0.9, fill: { color: DARK_BLUE } });
  slide.addText('Les Data Centers consomment des quantités massives d\'électricité et rejettent d\'énormes quantités de chaleur dans l\'atmosphère. Avec l\'essor de l\'IA, cette pression ne cesse d\'augmenter.', {
    x: 0.7, y: 0.95, w: 8.6, h: 0.8,
    fontSize: 12, color: WHITE, fontFace: 'Calibri', align: 'center', valign: 'middle'
  });

  // 3 key facts
  const facts = [
    { icon: '⚡', title: 'Énergie', text: '30 à 40% de la consommation électrique est utilisée pour le refroidissement' },
    { icon: '💧', title: 'Eau', text: 'Des millions de litres d\'eau consommés chaque année pour refroidir les serveurs' },
    { icon: '🌡️', title: 'Chaleur', text: '95% de l\'électricité consommée par les serveurs se transforme en chaleur rejetée' },
  ];

  facts.forEach((f, i) => {
    const x = 0.5 + i * 3.17;
    slide.addShape(pres.ShapeType.rect, { x, y: 2.0, w: 2.95, h: 3.4, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addText(f.icon, { x, y: 2.1, w: 2.95, h: 0.7, fontSize: 28, align: 'center', fontFace: 'Calibri' });
    slide.addText(f.title, {
      x: x + 0.1, y: 2.85, w: 2.75, h: 0.4,
      fontSize: 13, bold: true, color: DARK_BLUE, align: 'center', fontFace: 'Calibri'
    });
    slide.addShape(pres.ShapeType.rect, { x: x + 0.8, y: 3.28, w: 1.35, h: 0.03, fill: { color: ACCENT } });
    slide.addText(f.text, {
      x: x + 0.1, y: 3.35, w: 2.75, h: 1.9,
      fontSize: 10, color: GRAY, align: 'center', fontFace: 'Calibri'
    });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 8: PROBLEMATIQUE ───────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Problématique et état de l\'art', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Problematique box
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.9, w: 9, h: 1.1, fill: { color: ACCENT } });
  slide.addText('Comment optimiser la performance énergétique des Data Centers Cloud\nafin de réduire durablement leur empreinte carbone ?', {
    x: 0.7, y: 0.95, w: 8.6, h: 1.0,
    fontSize: 15, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('Les indicateurs clés', {
    x: 0.5, y: 2.15, w: 4.2, h: 0.4,
    fontSize: 13, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const kpis = [
    { name: 'PUE', desc: 'Power Usage Effectiveness', detail: 'Efficacité électrique du Data Center' },
    { name: 'CUE', desc: 'Carbon Usage Effectiveness', detail: 'Empreinte carbone réelle' },
    { name: 'WUE', desc: 'Water Usage Effectiveness', detail: 'Consommation d\'eau liée au refroidissement' },
  ];

  kpis.forEach((k, i) => {
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.65 + i * 0.95, w: 4.2, h: 0.8, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.65 + i * 0.95, w: 0.9, h: 0.8, fill: { color: DARK_BLUE } });
    slide.addText(k.name, { x: 0.5, y: 2.65 + i * 0.95, w: 0.9, h: 0.8, fontSize: 13, bold: true, color: ACCENT, align: 'center', valign: 'middle', fontFace: 'Calibri' });
    slide.addText(k.desc, { x: 1.5, y: 2.72 + i * 0.95, w: 3.0, h: 0.3, fontSize: 11, bold: true, color: DARK_BLUE, fontFace: 'Calibri' });
    slide.addText(k.detail, { x: 1.5, y: 3.02 + i * 0.95, w: 3.0, h: 0.3, fontSize: 10, color: GRAY, fontFace: 'Calibri' });
  });

  // Limite des solutions existantes
  slide.addText('Limite des solutions existantes', {
    x: 5.1, y: 2.15, w: 4.4, h: 0.4,
    fontSize: 13, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const limites = [
    'SHIELD, WaterWise, Carbon-Aware... optimisent chaque indicateur séparément',
    'Toutes traitent la chaleur comme un déchet à éliminer',
    'Aucune ne mesure la valeur de la chaleur valorisée',
    'Personne n\'a encore introduit un KPI de valorisation thermique',
  ];

  limites.forEach((l, i) => {
    slide.addShape(pres.ShapeType.rect, { x: 5.15, y: 2.65 + i * 0.73, w: 4.3, h: 0.6, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x: 5.15, y: 2.65 + i * 0.73, w: 0.12, h: 0.6, fill: { color: '6366F1' } });
    slide.addText(l, { x: 5.35, y: 2.72 + i * 0.73, w: 4.0, h: 0.46, fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri' });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 9: SECTION SOLUTION ───────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('03', {
    x: 0.5, y: 1.2, w: 2, h: 1.5,
    fontSize: 80, bold: true, color: ACCENT, fontFace: 'Calibri', alpha: 30
  });

  slide.addText('Solution proposée\nHEAT2VALUE', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('Algorithme — Architecture — KPI — HRR', {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 16, color: ACCENT, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 10: HEAT2VALUE CONCEPT ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('HEAT2VALUE — Le changement de paradigme', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Left side: before
  slide.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.9, w: 4.1, h: 4.5, fill: { color: 'FEF2F2' }, line: { color: 'FCA5A5', width: 1 } });
  slide.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.9, w: 4.1, h: 0.5, fill: { color: 'EF4444' } });
  slide.addText('Avant — Data Center classique', { x: 0.5, y: 0.9, w: 3.9, h: 0.5, fontSize: 12, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });

  const beforeItems = ['Électricité → Serveurs → Chaleur', 'Chaleur rejetée dans l\'atmosphère', 'Refroidissement très énergivore', 'Eau consommée massivement', 'Aucune valorisation de la chaleur'];
  beforeItems.forEach((item, i) => {
    slide.addText('✗  ' + item, { x: 0.6, y: 1.55 + i * 0.65, w: 3.7, h: 0.5, fontSize: 11, color: 'DC2626', fontFace: 'Calibri' });
  });

  // Arrow
  slide.addText('→', { x: 4.6, y: 2.8, w: 0.8, h: 0.7, fontSize: 30, color: ACCENT, align: 'center', fontFace: 'Calibri' });

  // Right side: after
  slide.addShape(pres.ShapeType.rect, { x: 5.5, y: 0.9, w: 4.1, h: 4.5, fill: { color: 'F0FDF4' }, line: { color: '86EFAC', width: 1 } });
  slide.addShape(pres.ShapeType.rect, { x: 5.5, y: 0.9, w: 4.1, h: 0.5, fill: { color: '059669' } });
  slide.addText('Après — HEAT2VALUE', { x: 5.6, y: 0.9, w: 3.9, h: 0.5, fontSize: 12, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });

  const afterItems = ['Chaleur → Chauffage bâtiments voisins', 'Chaleur → Stockage thermique', 'Refroidissement minimal (5%)', 'Eau économisée (0.5 L/kWh)', 'HRR jusqu\'à 80% de valorisation'];
  afterItems.forEach((item, i) => {
    slide.addText('✓  ' + item, { x: 5.7, y: 1.55 + i * 0.65, w: 3.7, h: 0.5, fontSize: 11, color: '059669', fontFace: 'Calibri' });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 11: HRR ───────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Le nouveau KPI : Heat Reuse Ratio (HRR)', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // HRR formula box
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.9, w: 9, h: 1.4, fill: { color: DARK_BLUE } });
  slide.addText('HRR  =  Chaleur réutilisée (kWh)  /  Chaleur totale produite (kWh)', {
    x: 0.7, y: 0.95, w: 8.6, h: 1.2,
    fontSize: 18, bold: true, color: ACCENT, align: 'center', valign: 'middle', fontFace: 'Calibri'
  });

  // Score H2V
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.45, w: 9, h: 1.0, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
  slide.addText('Score H2V  =  α·PUE  +  β·CUE  +  γ·WUE  −  δ·HRR', {
    x: 0.7, y: 2.5, w: 8.6, h: 0.9,
    fontSize: 15, bold: true, color: DARK_BLUE, align: 'center', valign: 'middle', fontFace: 'Calibri'
  });

  // Three states
  const states = [
    { val: 'HRR = 0', color: 'EF4444', text: 'Toute la chaleur est rejetée\n→ Data Center classique' },
    { val: 'HRR = 0.80', color: ACCENT, text: '80% de la chaleur valorisée\n→ Résultat HEAT2VALUE en hiver' },
    { val: 'HRR = 1', color: '059669', text: 'Toute la chaleur est valorisée\n→ Cas idéal théorique' },
  ];

  states.forEach((s, i) => {
    const x = 0.5 + i * 3.17;
    slide.addShape(pres.ShapeType.rect, { x, y: 3.6, w: 2.95, h: 1.8, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x, y: 3.6, w: 2.95, h: 0.5, fill: { color: s.color } });
    slide.addText(s.val, { x: x + 0.1, y: 3.6, w: 2.75, h: 0.5, fontSize: 13, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });
    slide.addText(s.text, { x: x + 0.1, y: 4.15, w: 2.75, h: 1.2, fontSize: 10, color: DARK_BLUE, align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.3 });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 12: MOTEUR DE DÉCISION ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Moteur de décision HEAT2VALUE', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  slide.addText('Évaluation toutes les 15 minutes', {
    x: 0.5, y: 0.78, w: 9, h: 0.3,
    fontSize: 11, color: GRAY, fontFace: 'Calibri'
  });

  // START box
  slide.addShape(pres.ShapeType.rect, { x: 3.8, y: 1.1, w: 2.4, h: 0.55, fill: { color: DARK_BLUE } });
  slide.addText('DÉBUT — Évaluation des conditions', { x: 3.8, y: 1.1, w: 2.4, h: 0.55, fontSize: 9, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  // Arrow down
  slide.addShape(pres.ShapeType.line, { x: 5.0, y: 1.65, w: 0, h: 0.35, line: { color: DARK_BLUE, width: 1.5 } });

  // Question 1
  slide.addShape(pres.ShapeType.rect, { x: 2.8, y: 2.0, w: 4.4, h: 0.65, fill: { color: LIGHT_BG }, line: { color: ACCENT, width: 2 } });
  slide.addText('Température extérieure < 18°C ?', { x: 2.9, y: 2.0, w: 4.2, h: 0.65, fontSize: 12, bold: true, color: DARK_BLUE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  // OUI → Option A
  slide.addShape(pres.ShapeType.line, { x: 7.2, y: 2.32, w: 1.5, h: 0, line: { color: '059669', width: 1.5 } });
  slide.addText('OUI', { x: 7.2, y: 2.1, w: 0.7, h: 0.3, fontSize: 10, bold: true, color: '059669', fontFace: 'Calibri' });
  slide.addShape(pres.ShapeType.rect, { x: 8.7, y: 1.9, w: 1.1, h: 0.85, fill: { color: '059669' } });
  slide.addText('Option A\nRéutilisation\n80%', { x: 8.7, y: 1.9, w: 1.1, h: 0.85, fontSize: 9, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  // NON arrow
  slide.addShape(pres.ShapeType.line, { x: 5.0, y: 2.65, w: 0, h: 0.4, line: { color: 'EF4444', width: 1.5 } });
  slide.addText('NON', { x: 5.1, y: 2.7, w: 0.7, h: 0.3, fontSize: 10, bold: true, color: 'EF4444', fontFace: 'Calibri' });

  // Question 2
  slide.addShape(pres.ShapeType.rect, { x: 1.8, y: 3.05, w: 6.4, h: 0.65, fill: { color: LIGHT_BG }, line: { color: ACCENT, width: 2 } });
  slide.addText('Carbone > 150 gCO₂/kWh  ET  Réservoir < 90% ?', { x: 1.9, y: 3.05, w: 6.2, h: 0.65, fontSize: 12, bold: true, color: DARK_BLUE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  // OUI → Option B
  slide.addShape(pres.ShapeType.line, { x: 8.2, y: 3.37, w: 0.5, h: 0, line: { color: '059669', width: 1.5 } });
  slide.addText('OUI', { x: 8.2, y: 3.12, w: 0.7, h: 0.3, fontSize: 10, bold: true, color: '059669', fontFace: 'Calibri' });
  slide.addShape(pres.ShapeType.rect, { x: 8.7, y: 2.95, w: 1.1, h: 0.85, fill: { color: '2563EB' } });
  slide.addText('Option B\nStockage\n70%', { x: 8.7, y: 2.95, w: 1.1, h: 0.85, fontSize: 9, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  // NON arrow
  slide.addShape(pres.ShapeType.line, { x: 5.0, y: 3.7, w: 0, h: 0.4, line: { color: 'EF4444', width: 1.5 } });
  slide.addText('NON', { x: 5.1, y: 3.75, w: 0.7, h: 0.3, fontSize: 10, bold: true, color: 'EF4444', fontFace: 'Calibri' });

  // Option C
  slide.addShape(pres.ShapeType.rect, { x: 3.5, y: 4.1, w: 3.0, h: 0.8, fill: { color: 'EF4444' } });
  slide.addText('Option C — Rejet classique\n0% valorisée', { x: 3.5, y: 4.1, w: 3.0, h: 0.8, fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 13: SECTION IMPLÉMENTATION ────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('04', {
    x: 0.5, y: 1.2, w: 2, h: 1.5,
    fontSize: 80, bold: true, color: ACCENT, fontFace: 'Calibri', alpha: 30
  });

  slide.addText('Implémentation\net résultats', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('Python — Tests — Comparaison — Analyse', {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 16, color: ACCENT, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 14: ARCHITECTURE MODULAIRE ────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Architecture modulaire en Python', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  const modules = [
    { file: 'simulateur.py', role: 'Génère les données', detail: 'Charge serveurs, puissance, chaleur, température, intensité carbone', color: DARK_BLUE },
    { file: 'decision.py', role: 'Algorithme HEAT2VALUE', detail: 'Décide à chaque pas de temps : Réutilisation, Stockage ou Rejet', color: ACCENT },
    { file: 'kpi.py', role: 'Calcule les KPI', detail: 'PUE, CUE, WUE et HRR à chaque instant', color: '059669' },
    { file: 'comparaison.py', role: 'Compare les scénarios', detail: 'Avec et sans HEAT2VALUE sur 24h', color: '6366F1' },
    { file: 'tests.py + test_jeu_donnees.py', role: 'Tests et validation', detail: 'Données réelles Electricity Maps + 12 scénarios CSV', color: 'F59E0B' },
  ];

  modules.forEach((m, i) => {
    const y = 0.95 + i * 0.92;
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y, w: 9, h: 0.78, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y, w: 2.2, h: 0.78, fill: { color: m.color } });
    slide.addText(m.file, { x: 0.6, y, w: 2.0, h: 0.78, fontSize: 10, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });
    slide.addText(m.role, { x: 2.85, y: y + 0.06, w: 2.8, h: 0.32, fontSize: 12, bold: true, color: DARK_BLUE, fontFace: 'Calibri' });
    slide.addText(m.detail, { x: 2.85, y: y + 0.38, w: 6.5, h: 0.3, fontSize: 10, color: GRAY, fontFace: 'Calibri' });

    if (i < modules.length - 1) {
      slide.addText('↓', { x: 4.8, y: y + 0.78, w: 0.5, h: 0.14, fontSize: 10, color: ACCENT, align: 'center', fontFace: 'Calibri' });
    }
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 15: RÉSULTATS ─────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Résultats — Comparaison sur 24h (scénario hiver)', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 20, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Table header
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.9, w: 9, h: 0.5, fill: { color: DARK_BLUE } });
  ['KPI', 'Sans HEAT2VALUE', 'Avec HEAT2VALUE', 'Gain', 'Amélioration'].forEach((h, i) => {
    const widths = [1.2, 2.2, 2.2, 1.4, 2.0];
    const xs = [0.5, 1.7, 3.9, 6.1, 7.5];
    slide.addText(h, { x: xs[i], y: 0.9, w: widths[i], h: 0.5, fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  });

  const rows = [
    ['PUE', '1.300', '1.050', '−0.250', '−19%'],
    ['CUE', '221 gCO₂/kWh', '44 gCO₂/kWh', '−177', '−80%'],
    ['WUE', '2.00 L/kWh', '0.50 L/kWh', '−1.50', '−75%'],
    ['HRR', '0.00', '0.80', '+0.80', '+80%'],
  ];

  rows.forEach((row, i) => {
    const bg = i % 2 === 0 ? LIGHT_BG : WHITE;
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.4 + i * 0.65, w: 9, h: 0.6, fill: { color: bg }, line: { color: LIGHT_GRAY, width: 1 } });
    const widths = [1.2, 2.2, 2.2, 1.4, 2.0];
    const xs = [0.5, 1.7, 3.9, 6.1, 7.5];
    const colors = [DARK_BLUE, 'EF4444', '059669', ACCENT, '059669'];
    row.forEach((cell, j) => {
      slide.addText(cell, {
        x: xs[j], y: 1.4 + i * 0.65, w: widths[j], h: 0.6,
        fontSize: j === 0 ? 13 : 11, bold: j === 0, color: j === 0 ? DARK_BLUE : j >= 3 ? colors[j] : GRAY,
        align: 'center', valign: 'middle', fontFace: 'Calibri'
      });
    });
  });

  // Note
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 5.05, w: 9, h: 0.4, fill: { color: LIGHT_BG } });
  slide.addText('Note : Le graphique de comparaison PUE/CUE/WUE sur 24h est présenté dans le mémoire (Figure X — Chapitre 3)', {
    x: 0.7, y: 5.05, w: 8.6, h: 0.4, fontSize: 9, color: GRAY, valign: 'middle', fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 16: RÉSULTATS 12 SCÉNARIOS ────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Résultats — Tests sur 12 scénarios variés', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 20, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // 3 groups
  const groups = [
    { title: 'Scénarios froids (7/12)', color: DARK_BLUE, bg: 'EFF6FF', items: ['Hiver typique', 'Vague de froid', 'Automne', 'Grand froid', '...'], result: 'PUE 1.05  |  CUE ≈ 0  |  WUE 0.5  |  HRR 80%' },
    { title: 'Transition (2/12)', color: '6366F1', bg: 'F5F3FF', items: ['Printemps', 'Début automne'], result: 'PUE 1.05–1.15  |  HRR 37–78%' },
    { title: 'Scénarios estivaux (3/12)', color: 'EF4444', bg: 'FEF2F2', items: ['Canicule', 'Été chaud', 'Canicule record'], result: 'PUE 1.30  |  CUE élevé  |  HRR 0%' },
  ];

  groups.forEach((g, i) => {
    const x = 0.3 + i * 3.25;
    slide.addShape(pres.ShapeType.rect, { x, y: 0.9, w: 3.1, h: 4.5, fill: { color: g.bg }, line: { color: LIGHT_GRAY, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x, y: 0.9, w: 3.1, h: 0.55, fill: { color: g.color } });
    slide.addText(g.title, { x: x + 0.1, y: 0.9, w: 2.9, h: 0.55, fontSize: 11, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });
    g.items.forEach((item, j) => {
      slide.addText('→  ' + item, { x: x + 0.15, y: 1.6 + j * 0.45, w: 2.8, h: 0.38, fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri' });
    });
    slide.addShape(pres.ShapeType.rect, { x: x + 0.1, y: 4.5, w: 2.9, h: 0.75, fill: { color: g.color } });
    slide.addText(g.result, { x: x + 0.1, y: 4.5, w: 2.9, h: 0.75, fontSize: 9, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 17: SECTION CONCLUSION ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('05', {
    x: 0.5, y: 1.2, w: 2, h: 1.5,
    fontSize: 80, bold: true, color: ACCENT, fontFace: 'Calibri', alpha: 30
  });

  slide.addText('Conclusion\net perspectives', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.3
  });

  slide.addText('Limites — Améliorations futures', {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 16, color: ACCENT, fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

// ─── SLIDE 18: CONCLUSION ────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: DARK_BLUE } });

  slide.addText('Conclusion et perspectives', {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: DARK_BLUE, fontFace: 'Calibri'
  });

  // Apports
  slide.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.9, w: 4.3, h: 4.5, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
  slide.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.9, w: 4.3, h: 0.5, fill: { color: DARK_BLUE } });
  slide.addText('Apports de HEAT2VALUE', { x: 0.5, y: 0.9, w: 4.1, h: 0.5, fontSize: 12, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });

  const apports = [
    'Nouveau paradigme : chaleur = ressource',
    'Nouveau KPI : le HRR',
    'Nouveau score environnemental global',
    'Amélioration simultanée de PUE, CUE, WUE',
    'Validé sur données réelles Electricity Maps',
    'Testé sur 12 scénarios variés',
  ];
  apports.forEach((a, i) => {
    slide.addShape(pres.ShapeType.rect, { x: 0.55, y: 1.55 + i * 0.57, w: 0.2, h: 0.2, fill: { color: '059669' } });
    slide.addText(a, { x: 0.85, y: 1.52 + i * 0.57, w: 3.7, h: 0.35, fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri' });
  });

  // Perspectives
  slide.addShape(pres.ShapeType.rect, { x: 5.1, y: 0.9, w: 4.5, h: 4.5, fill: { color: LIGHT_BG }, line: { color: LIGHT_GRAY, width: 1 } });
  slide.addShape(pres.ShapeType.rect, { x: 5.1, y: 0.9, w: 4.5, h: 0.5, fill: { color: ACCENT } });
  slide.addText('Perspectives d\'amélioration', { x: 5.2, y: 0.9, w: 4.3, h: 0.5, fontSize: 12, bold: true, color: WHITE, valign: 'middle', fontFace: 'Calibri' });

  const persp = [
    'Intégrer des prévisions météorologiques',
    'Élargir les usages de la chaleur en été',
    'Adapter dynamiquement les seuils',
    'Tester sur des pays plus carbonés (Allemagne, Pologne)',
    'Déploiement pilote dans un Data Center réel',
  ];
  persp.forEach((p, i) => {
    slide.addShape(pres.ShapeType.rect, { x: 5.25, y: 1.55 + i * 0.68, w: 0.2, h: 0.2, fill: { color: ACCENT } });
    slide.addText(p, { x: 5.55, y: 1.52 + i * 0.68, w: 3.9, h: 0.35, fontSize: 10, color: DARK_BLUE, fontFace: 'Calibri' });
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: DARK_BLUE } });
}

// ─── SLIDE 19: MERCI ─────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK_BLUE };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT } });

  slide.addText('Merci pour votre attention', {
    x: 0.5, y: 1.3, w: 9, h: 1.0,
    fontSize: 32, bold: true, color: WHITE, align: 'center', fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 3, y: 2.4, w: 4, h: 0.05, fill: { color: ACCENT } });

  slide.addText('Questions ?', {
    x: 0.5, y: 2.6, w: 9, h: 0.7,
    fontSize: 22, color: ACCENT, align: 'center', fontFace: 'Calibri'
  });

  slide.addText([
    { text: 'Lamia BELKADI', options: { bold: true, color: WHITE, fontSize: 13 } },
    { text: '\nM1 MIAGE — Ingénierie Logicielle pour le Web', options: { color: ACCENT, fontSize: 11 } },
    { text: '\nUniversité d\'Évry  |  ISOAR  |  2025-2026', options: { color: 'AABBD0', fontSize: 10 } },
  ], { x: 2.5, y: 3.5, w: 5, h: 1.2, align: 'center', fontFace: 'Calibri' });

  // Summary line
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 4.85, w: 9, h: 0.55, fill: { color: '0D1E38' } });
  slide.addText('HEAT2VALUE — Un algorithme de valorisation thermique pour l\'optimisation énergétique des Data Centers Cloud', {
    x: 0.7, y: 4.85, w: 8.6, h: 0.55, fontSize: 9, color: ACCENT, align: 'center', valign: 'middle', fontFace: 'Calibri'
  });

  slide.addShape(pres.ShapeType.rect, { x: 0, y: 5.55, w: 10, h: 0.08, fill: { color: ACCENT } });
}

pres.writeFile({ fileName: 'soutenance_HEAT2VALUE.pptx' })
  .then(() => console.log('Done'))
  .catch(e => console.error(e));

