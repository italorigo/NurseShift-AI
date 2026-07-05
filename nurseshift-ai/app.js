const STORAGE_KEY = "nurseshift-ai-v10-text-handoff";
const today = new Date().toISOString().slice(0, 10);

const options = {
  yesNo: ["", "Não", "Sim"],
  sex: ["", "Feminino", "Masculino", "Outro"],
  precaution: ["", "Nenhuma", "Contato", "Gotículas", "Aerossóis", "Reversa"],
  consciousness: ["", "Alerta", "Sonolento", "Torporoso", "Confuso", "Agitado", "Sedado", "Comatoso"],
  glasgow: ["", ...Array.from({ length: 13 }, (_, i) => String(i + 3))],
  rass: ["", "-5", "-4", "-3", "-2", "-1", "0", "+1", "+2", "+3", "+4"],
  camIcu: ["", "Negativo", "Positivo", "Não avaliado"],
  pupils: ["", "Isocóricas fotorreagentes", "Isocóricas não fotorreagentes", "Anisocóricas", "Mióticas", "Midriáticas"],
  sedation: ["", "Midazolam", "Propofol", "Dexmedetomidina", "Cetamina", "Diazepam", "Clonidina", "Não em uso"],
  analgesia: ["", "Fentanil", "Remifentanil", "Morfina", "Metadona", "Tramadol", "Dipirona", "Paracetamol", "Cetamina", "Não em uso"],
  blocker: ["", "Rocurônio", "Cisatracúrio", "Atracúrio", "Pancurônio", "Succinilcolina", "Não em uso"],
  airway: ["", "Ar ambiente", "Cateter nasal", "Máscara simples", "Máscara de Venturi", "Máscara não reinalante", "VNI", "TOT", "TQT"],
  ventilationMode: ["", "VCV", "PCV", "PSV", "SIMV", "CPAP", "BIPAP", "PRVC"],
  perfusion: ["", "Boa", "Lentificada", "Fria", "Moteada"],
  tec: ["", "<3s", ">3s"],
  vasoactive: ["", "Noradrenalina", "Adrenalina", "Dobutamina", "Dopamina", "Vasopressina", "Milrinona", "Levosimendana", "Nitroprussiato", "Nitroglicerina", "Amiodarona", "Esmolol", "Não em uso"],
  diet: ["", "Oral", "Enteral", "Parenteral", "Jejum"],
  gastricTube: ["", "Sem sonda", "SNE", "SNG", "SOG", "GTT", "GJT", "Jejunostomia"],
  urinary: ["", "Espontânea", "CVD", "CVA", "Uropen", "Fralda", "Anúria"],
  lppStage: ["", "I", "II", "III", "IV", "Não classificável", "Lesão tissular profunda"],
  deviceType: ["CVC", "PICC", "Midline", "Cateter periférico", "Cateter arterial", "Swan-Ganz", "Cateter Shilley", "Permcath", "SNE", "SNG", "SOG", "GTT", "GJT", "Jejunostomia", "TOT", "TQT", "CVD", "CVA", "Uropen", "Dreno de tórax", "Portovac", "Blake", "Jackson Pratt", "Dreno ventricular externo", "Dreno Penrose", "Bolsa de colostomia", "Bolsa de ileostomia"],
  antibiotics: ["", "Ceftriaxona", "Cefepime", "Ceftazidima", "Cefazolina", "Piperacilina-tazobactam", "Meropenem", "Imipenem", "Ertapenem", "Vancomicina", "Teicoplanina", "Linezolida", "Daptomicina", "Polimixina B", "Amicacina", "Gentamicina", "Azitromicina", "Clindamicina", "Metronidazol", "Fluconazol", "Anfotericina B", "Micafungina", "Não em uso"],
  bradenSensory: ["", "1 - Completamente limitada", "2 - Muito limitada", "3 - Levemente limitada", "4 - Nenhuma limitação"],
  bradenMoisture: ["", "1 - Constantemente úmida", "2 - Muito úmida", "3 - Ocasionalmente úmida", "4 - Raramente úmida"],
  bradenActivity: ["", "1 - Acamado", "2 - Restrito à cadeira", "3 - Anda ocasionalmente", "4 - Anda frequentemente"],
  bradenMobility: ["", "1 - Completamente imóvel", "2 - Muito limitada", "3 - Levemente limitada", "4 - Sem limitação"],
  bradenNutrition: ["", "1 - Muito pobre", "2 - Provavelmente inadequada", "3 - Adequada", "4 - Excelente"],
  bradenFriction: ["", "1 - Problema", "2 - Problema potencial", "3 - Nenhum problema aparente"],
  infectionFocus: ["", "Pulmonar", "Urinário", "Corrente sanguínea", "Abdominal", "Ferida operatória", "Pele/partes moles", "Sistema nervoso central", "Cateter", "Indefinido"],
  cultureStatus: ["", "Não coletada", "Pendente", "Negativa", "Positiva"],
  isolationType: ["", "Nenhum", "Contato", "Gotículas", "Aerossóis", "Reversa"],
  microorganisms: ["", "Klebsiella pneumoniae", "Klebsiella pneumoniae KPC", "Acinetobacter baumannii", "Pseudomonas aeruginosa", "Escherichia coli", "Enterobacter cloacae", "Staphylococcus aureus", "MRSA", "Staphylococcus epidermidis", "Enterococcus faecalis", "Enterococcus faecium", "VRE", "Candida albicans", "Candida auris", "Candida glabrata", "Aspergillus spp.", "Clostridioides difficile", "SARS-CoV-2", "Influenza", "VSR", "Outro"]
};

const tabs = [
  {
    id: "identificacao",
    label: "🪪",
    title: "Identificação",
    fields: [
      ["bed", "Leito"], ["name", "Nome"], ["age", "Idade", "number"], ["sex", "Sexo", "select", options.sex],
      ["admission", "Data de admissão", "date"], ["diagnosis", "Diagnóstico principal"], ["hypotheses", "Hipóteses diagnósticas"],
      ["comorbidities", "Comorbidades"], ["allergies", "Alergias"], ["precaution", "Tipo de precaução", "select", options.precaution]
    ]
  },
  {
    id: "neuro",
    label: "🧠",
    title: "Neurológico",
    fields: [
      ["consciousness", "Estado de consciência", "select", options.consciousness], ["glasgow", "Glasgow", "select", options.glasgow],
      ["rass", "RASS", "select", options.rass], ["camIcu", "CAM-ICU", "select", options.camIcu], ["pupils", "Pupilas", "select", options.pupils],
      ["sedation", "Sedação", "select", options.sedation], ["sedationRate", "Sedação - ml/h", "number"],
      ["analgesia", "Analgesia", "select", options.analgesia], ["analgesiaRate", "Analgesia - ml/h", "number"],
      ["blocker", "Bloqueador neuromuscular", "select", options.blocker], ["blockerRate", "Bloqueador - ml/h", "number"], ["neuroNotes", "Observações", "textarea"]
    ]
  },
  {
    id: "resp",
    label: "🫁",
    title: "Respiratório",
    fields: [
      ["airway", "Via aérea", "select", options.airway], ["ventilation", "Ventilação mecânica", "select", options.yesNo],
      ["mode", "Modo ventilatório", "select", options.ventilationMode], ["vc", "VC"], ["rr", "FR"], ["peep", "PEEP"],
      ["fio2", "FiO2 (%)", "number"], ["ps", "Pressão de suporte"], ["flow", "Fluxo"], ["spo2", "SpO2 (%)", "number"],
      ["pico", "Pico"], ["plateau", "Plateau"], ["driving", "Driving Pressure"], ["pattern", "Padrão respiratório"],
      ["suction", "Aspiração - quantidade/aspecto"], ["circuitChange", "Última troca de circuito", "date"], ["respNotes", "Observações", "textarea"]
    ]
  },
  {
    id: "cardio",
    label: "🫀",
    title: "Cardiovascular",
    fields: [
      ["hr", "FC"], ["bp", "PA"], ["map", "PAM"], ["perfusion", "Perfusão periférica", "select", options.perfusion],
      ["tec", "TEC", "select", options.tec], ["temp", "Temperatura"], ["lactate", "Lactato", "number"],
      ["vaso1", "Droga vasoativa 1", "select", options.vasoactive], ["vaso1Rate", "Vazão 1 - ml/h", "number"],
      ["vaso2", "Droga vasoativa 2", "select", options.vasoactive], ["vaso2Rate", "Vazão 2 - ml/h", "number"],
      ["cardioNotes", "Observações", "textarea"]
    ]
  },
  {
    id: "gastro",
    label: "🫄",
    title: "Gastrointestinal",
    fields: [
      ["diet", "Tipo de dieta", "select", options.diet], ["tube", "Sonda gástrica/enteral", "select", options.gastricTube],
      ["dietVolume", "Volume administrado"], ["gastricResidual", "Resíduo gástrico"], ["evacDate", "Evacuação - data", "date"],
      ["evacAspect", "Evacuação - aspecto"], ["nausea", "Náuseas", "select", options.yesNo], ["vomiting", "Vômitos", "select", options.yesNo],
      ["distension", "Distensão abdominal", "select", options.yesNo], ["npt", "NPT", "select", options.yesNo], ["gastroNotes", "Observações", "textarea"]
    ]
  },
  {
    id: "gu",
    label: "🫘",
    title: "Geniturinário",
    fields: [
      ["urineType", "Tipo de diurese", "select", options.urinary], ["urine24h", "Volume 24h (ml)", "number"], ["fluidBalance", "Balanço hídrico (ml)", "number"],
      ["dialysis", "Hemodiálise", "select", options.yesNo], ["lastDialysis", "Última sessão", "date"], ["uf", "UF"], ["guPending", "Pendências", "textarea"]
    ]
  },
  {
    id: "skin",
    label: "🩹",
    title: "Pele",
    fields: [
      ["skinIntact", "Pele íntegra", "select", options.yesNo], ["lpp", "LPP", "select", options.yesNo], ["lppStage", "Estágio", "select", options.lppStage],
      ["lppLocal", "Local"], ["dressing", "Cobertura"], ["surgicalWounds", "Lesões cirúrgicas"], ["drains", "Drenos"], ["photo", "Fotografia - referência"],
      ["bradenSensory", "Braden: percepção sensorial", "select", options.bradenSensory],
      ["bradenMoisture", "Braden: umidade", "select", options.bradenMoisture],
      ["bradenActivity", "Braden: atividade", "select", options.bradenActivity],
      ["bradenMobility", "Braden: mobilidade", "select", options.bradenMobility],
      ["bradenNutrition", "Braden: nutrição", "select", options.bradenNutrition],
      ["bradenFriction", "Braden: fricção/cisalhamento", "select", options.bradenFriction],
      ["skinNotes", "Observações", "textarea"]
    ]
  },
  { id: "devices", label: "💉", title: "Devices", fields: [] },
  {
    id: "infection",
    label: "🦠",
    title: "Vigilância infecciosa",
    fields: [
      ["infectionIsolation", "Isolamento", "select", options.isolationType], ["infectionFocus", "Foco", "select", options.infectionFocus],
      ["antibiotic", "Antibiótico 1", "select", options.antibiotics], ["atbDay", "Dia ATB 1"],
      ["antibiotic2", "Antibiótico 2", "select", options.antibiotics], ["atb2Day", "Dia ATB 2"],
      ["bloodCulture", "Hemocultura", "select", options.cultureStatus], ["urineCulture", "Urocultura", "select", options.cultureStatus], ["trachealCulture", "Secreção traqueal", "select", options.cultureStatus],
      ["microorganism", "Microrganismo", "select", options.microorganisms], ["microorganismOther", "Outro microrganismo"], ["colonization", "Colonização/alertas"], ["infectionAlerts", "Alertas infecciosos", "textarea"], ["infectionNotes", "Observações", "textarea"]
    ]
  },
  { id: "exams", label: "△", title: "Exames", fields: [["pendingExams", "Pendentes", "textarea"], ["doneExams", "Realizados", "textarea"], ["criticalResults", "Resultados críticos", "textarea"]] },
  { id: "pending", label: "☑", title: "Pendências", fields: [] }
];

const systemVisuals = {
  identificacao: {
    code: "ID",
    subtitle: "Identificação",
    color: "#0f9f9f",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="9"/><path d="M10 40c1.5-9 7-14 14-14s12.5 5 14 14H10z"/></svg>`
  },
  neuro: {
    code: "NEURO",
    subtitle: "Neurológico",
    color: "#6b32b8",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M22 10c-7-4-15 2-12 10-5 1-6 9 0 11-2 7 8 11 12 5V10z"/><path d="M26 10c7-4 15 2 12 10 5 1 6 9 0 11 2 7-8 11-12 5V10z"/><path d="M15 22h5M14 30h6M33 22h-5M34 30h-6"/></svg>`
  },
  resp: {
    code: "PULMAO",
    subtitle: "Respiratório",
    color: "#1358c8",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8v16"/><path d="M22 23C14 12 8 17 8 35c0 4 2 5 5 4 8-2 10-8 10-16z"/><path d="M26 23c8-11 14-6 14 12 0 4-2 5-5 4-8-2-10-8-10-16z"/><path d="M16 24l-6 5M32 24l6 5"/></svg>`
  },
  cardio: {
    code: "CARDIO",
    subtitle: "Cardiovascular",
    color: "#e53045",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40S7 29 7 17c0-7 9-11 17-3 8-8 17-4 17 3 0 12-17 23-17 23z"/><path d="M7 25h10l4-10 5 20 4-10h11"/></svg>`
  },
  gastro: {
    code: "GASTRO",
    subtitle: "Gastrointestinal",
    color: "#e46f08",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M21 7c0 10 7 9 10 15 4 8-2 17-11 17-8 0-12-5-12-10 0-5 4-8 9-8"/><path d="M16 7c0 7 3 9 8 11"/><path d="M8 40v-7c0-5 4-8 9-8"/></svg>`
  },
  gu: {
    code: "GENITO",
    subtitle: "Geniturinário",
    color: "#15803d",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 10c-6 0-9 6-7 12 2 6 8 6 11 2 3-5 2-14-4-14z"/><path d="M32 10c6 0 9 6 7 12-2 6-8 6-11 2-3-5-2-14 4-14z"/><path d="M20 25c0 8 8 8 8 0M24 31v9"/><path d="M18 40h12"/></svg>`
  },
  skin: {
    code: "PELE",
    subtitle: "Tegumentar",
    color: "#8b5a2b",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="11" y="7" width="26" height="34" rx="13" transform="rotate(38 24 24)"/><path d="M18 29l12-12"/><path d="M18 18l12 12"/><path d="M17 25h.1M21 21h.1M25 25h.1M29 21h.1"/></svg>`
  },
  devices: {
    code: "DEV",
    subtitle: "Devices",
    color: "#0e7490",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="12" y="8" width="16" height="28" rx="5"/><path d="M17 8V4M23 8V4M16 18h8M16 25h8M28 31c8 0 8 10 0 10-6 0-8-4-8-8"/><path d="M36 14v22M32 18h8"/></svg>`
  },
  infection: {
    code: "VIG",
    subtitle: "Infecção",
    color: "#168236",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6l16 6v10c0 10-6 17-16 20C14 39 8 32 8 22V12l16-6z"/><circle cx="24" cy="25" r="7"/><path d="M24 14v4M24 32v4M13 25h4M31 25h4M17 18l3 3M31 18l-3 3M17 32l3-3M31 32l-3-3"/></svg>`
  },
  exams: {
    code: "EXAMES",
    subtitle: "Exames",
    color: "#6b32b8",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 6h12v8l7 22c1 4-1 6-5 6H16c-4 0-6-2-5-6l7-22V6z"/><path d="M17 14h14M18 30h12"/><circle cx="21" cy="35" r="1.5"/><circle cx="29" cy="35" r="1.5"/></svg>`
  },
  pending: {
    code: "PEND",
    subtitle: "Pendências",
    color: "#1358c8",
    svg: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="12" y="10" width="24" height="32" rx="3"/><path d="M19 8h10l2 5H17l2-5z"/><path d="M18 23l3 3 6-7M18 33l3 3 6-7M31 24h5M31 34h5"/></svg>`
  }
};

const metricVisuals = {
  beds: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 30h32v8"/><path d="M8 18v20M40 22v16"/><path d="M12 24h14c5 0 8 2 8 6"/><path d="M12 24v-7h13v7"/></svg>`,
  critical: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40S8 29 8 17c0-7 9-11 16-3 7-8 16-4 16 3 0 12-16 23-16 23z"/></svg>`,
  isolation: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6l16 6v10c0 10-6 17-16 20C14 39 8 32 8 22V12l16-6z"/><path d="M18 24l4 4 9-10"/></svg>`,
  ventilation: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8v16"/><path d="M22 23C14 12 8 17 8 35c0 4 2 5 5 4 8-2 10-8 10-16z"/><path d="M26 23c8-11 14-6 14 12 0 4-2 5-5 4-8-2-10-8-10-16z"/><path d="M16 24l-6 5M32 24l6 5"/></svg>`,
  dialysis: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 10c-6 0-9 6-7 12 2 6 8 6 11 2 3-5 2-14-4-14z"/><path d="M32 10c6 0 9 6 7 12-2 6-8 6-11 2-3-5-2-14 4-14z"/><path d="M20 25c0 8 8 8 8 0M24 31v9"/></svg>`
};

const pendingOptions = ["Gasometria", "TC", "RM", "Raio-X", "Ultrassom", "Ecocardiograma", "Eletrocardiograma", "Diálise", "Coletar culturas", "Coletar exames laboratoriais", "Retirar CVC", "Trocar CVC", "Retirar CVD/CVA", "Extubação", "Teste de respiração espontânea", "Traqueostomia", "Curativo", "Mudança de decúbito", "Banho", "Higiene oral", "Troca de fixação TOT/TQT", "Reposição eletrolítica", "Glicemia capilar", "Insulina", "Hemotransfusão", "Evolução médica", "Prescrição médica", "Avaliação fisioterapia", "Nutricionista", "Fonoaudiologia", "Farmácia clínica", "Serviço social", "Profilaxia TVP", "Profilaxia úlcera", "Controle de dor", "Avaliar sedação", "Avaliar delirium", "Atualizar familiares"];

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {
  activePatient: -1,
  activeTab: "identificacao",
  totalBeds: 20,
  patients: []
};

const $ = (selector) => document.querySelector(selector);
const patient = () => state.patients[state.activePatient];
const daysBetween = (date) => date ? Math.max(0, Math.floor((new Date(today) - new Date(date)) / 86400000)) : 0;
const safe = (value, fallback = "Não informado") => value === undefined || value === null || value === "" ? fallback : value;
const present = (value) => value !== undefined && value !== null && value !== "" && value !== "Não em uso" && value !== "Nenhum";
const pointValue = (value) => Number(String(value || "").match(/^\d/)?.[0] || 0);
const hasIsolation = (p) => p.infectionIsolation && p.infectionIsolation !== "Nenhum" || p.isolation === "Sim" || p.precaution && p.precaution !== "Nenhuma";

function bradenScore(p) {
  const values = ["bradenSensory", "bradenMoisture", "bradenActivity", "bradenMobility", "bradenNutrition", "bradenFriction"].map((key) => pointValue(p[key]));
  if (values.some((value) => !value)) return null;
  const total = values.reduce((sum, value) => sum + value, 0);
  let risk = "Sem risco";
  if (total <= 9) risk = "Risco muito alto";
  else if (total <= 12) risk = "Risco alto";
  else if (total <= 14) risk = "Risco moderado";
  else if (total <= 18) risk = "Risco leve";
  return { total, risk };
}

function renderBradenSummary() {
  const box = document.querySelector("#bradenSummary");
  if (!box) return;
  const result = bradenScore(patient());
  box.innerHTML = result ? `<strong>Braden ${result.total}</strong><span>${result.risk}</span><small>≤9 muito alto · 10-12 alto · 13-14 moderado · 15-18 leve · 19-23 sem risco</small>` : `<strong>Escala de Braden</strong><span>Preencha os 6 componentes para calcular o risco.</span><small>Percepção sensorial, umidade, atividade, mobilidade, nutrição e fricção/cisalhamento.</small>`;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function severity(p) {
  const vasoRate = Math.max(Number(p.vaso1Rate) || 0, Number(p.vaso2Rate) || 0);
  if (vasoRate >= 20 || Number(p.fio2) >= 60 || Number(p.lactate) >= 4 || p.urineType === "Anúria") return "critical";
  if (p.ventilation === "Sim" || vasoRate > 0 || p.lpp === "Sim" || hasIsolation(p) || p.dialysis === "Sim") return "attention";
  return "stable";
}

function patientIcons(p) {
  const icons = [];
  if (hasIsolation(p)) icons.push(["🛡", "Isolamento"]);
  if (p.ventilation === "Sim") icons.push(["🫁", "Ventilação mecânica"]);
  if ((Number(p.vaso1Rate) || 0) > 0 || (Number(p.vaso2Rate) || 0) > 0) icons.push(["💧", "Droga vasoativa"]);
  if (p.dialysis === "Sim") icons.push(["🫘", "Hemodiálise"]);
  if (p.sedation && p.sedation !== "Não em uso") icons.push(["◐", "Sedação"]);
  if (bradenScore(p)?.total <= 12) icons.push(["⚠", "Risco Braden"]);
  if (p.lpp === "Sim") icons.push(["▦", "LPP"]);
  if ((p.pending || []).length) icons.push(["☑", "Pendências"]);
  return icons;
}

function renderMetrics() {
  const total = state.patients.length;
  const critical = state.patients.filter((p) => severity(p) === "critical").length;
  const isolation = state.patients.filter(hasIsolation).length;
  const ventilated = state.patients.filter((p) => p.ventilation === "Sim").length;
  const dialysis = state.patients.filter((p) => p.dialysis === "Sim").length;
  const bedPct = state.totalBeds ? Math.round((total / state.totalBeds) * 100) : 0;
  const stats = [
    ["Leitos ocupados", `${total} / ${state.totalBeds}`, `${bedPct}%`, "beds"],
    ["Pacientes críticos", critical, total ? `${Math.round((critical / total) * 100)}%` : "0%", "critical"],
    ["Em isolamento", isolation, total ? `${Math.round((isolation / total) * 100)}%` : "0%", "isolation"],
    ["Em ventilação mecânica", ventilated, total ? `${Math.round((ventilated / total) * 100)}%` : "0%", "ventilation"],
    ["Em hemodiálise", dialysis, total ? `${Math.round((dialysis / total) * 100)}%` : "0%", "dialysis"]
  ];
  $("#metrics").innerHTML = stats.map(([label, value, pct, icon]) => `<article class="metric">
    <div><span>${label}</span><strong>${value}</strong></div>
    <b class="metric-icon">${metricVisuals[icon]}</b>
    <small><i style="width:${pct.replace("%", "") || 0}%"></i></small>
    <em>${pct}</em>
  </article>`).join("");
}

function renderCards(list = state.patients) {
  $("#patientTotal").textContent = `(${state.patients.length})`;
  if (!list.length) {
    $("#patientCards").innerHTML = `<div class="empty-card">Nenhum paciente cadastrado. Clique em “Novo paciente” para começar a passagem.</div>`;
    return;
  }
  $("#patientCards").innerHTML = list.map((p) => {
    const index = state.patients.indexOf(p);
    const sev = severity(p);
    const label = sev === "critical" ? "Crítico" : sev === "attention" ? "Atenção" : "Estável";
    return `<button class="patient-card ${sev} ${index === state.activePatient ? "active" : ""}" data-index="${index}">
      <div class="card-head"><strong>${safe(p.bed, "Leito")}</strong><span>${label}</span></div>
      <h3>${safe(p.name, "Paciente sem nome")}</h3>
      <p>${safe(p.age, "-")} anos • ${p.ventilation === "Sim" ? "VM" : safe(p.diagnosis, "Sem diagnóstico")}</p>
      <div class="icon-strip">${patientIcons(p).map(([short, title]) => `<span title="${title}">${short}</span>`).join("")}</div>
    </button>`;
  }).join("");
  document.querySelectorAll(".patient-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.activePatient = Number(card.dataset.index);
      persist();
      renderAll();
    });
  });
}

function renderPatientHeader() {
  const p = patient();
  if (!p) {
    $("#patientHeader").innerHTML = `<div class="empty-state"><h2>NurseShift AI pronto para uso</h2><p>O app está sem informações prévias. Cadastre um paciente para liberar as abas clínicas, alertas e geração da passagem.</p><button type="button" id="emptyAdd" class="primary">Novo paciente</button></div>`;
    $("#emptyAdd").addEventListener("click", addPatient);
    return;
  }
  const sev = severity(p);
  const label = sev === "critical" ? "Crítico" : sev === "attention" ? "Atenção" : "Estável";
  $("#patientHeader").innerHTML = `<div>
    <h2>${safe(p.bed, "Leito")} · ${safe(p.name, "Paciente sem nome")} <span class="status ${sev}">${label}</span></h2>
    <p>${safe(p.age, "-")} anos • ${safe(p.sex, "-")} • Internação há ${daysBetween(p.admission)} dias • Data admissão: ${safe(p.admission, "-")}</p>
    <p><strong>Diagnóstico principal:</strong> ${safe(p.diagnosis)} • <strong>Hipótese:</strong> ${safe(p.hypotheses)} • <strong>Precaução:</strong> ${safe(p.precaution, "Nenhuma")}</p>
  </div>`;
}

function renderTabs() {
  $("#tabs").innerHTML = tabs.map((tab) => {
    const visual = systemVisuals[tab.id] || { code: tab.label, subtitle: tab.title, color: "#1657e8", svg: "" };
    return `<button type="button" class="tab ${tab.id === state.activeTab ? "active" : ""}" data-tab="${tab.id}" title="${tab.title}" aria-label="${tab.title}" style="--tab-color:${visual.color}">
      <span class="tab-icon">${visual.svg}</span>
      <span class="tab-code">${visual.code}</span>
      <small>${visual.subtitle}</small>
    </button>`;
  }).join("");
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeTab = tab.dataset.tab;
      persist();
      renderEditor();
      renderTabs();
    });
  });
}

function inputFor(field) {
  const p = patient();
  const [key, label, type = "text", fieldOptions = []] = field;
  const value = p?.[key] ?? "";
  if (type === "select") {
    return `<label>${label}<select name="${key}">${fieldOptions.map((o) => `<option value="${o}" ${o === value ? "selected" : ""}>${o || "Selecione"}</option>`).join("")}</select></label>`;
  }
  if (type === "textarea") return `<label class="full">${label}<textarea name="${key}">${value}</textarea></label>`;
  return `<label>${label}<input name="${key}" type="${type}" value="${value}" /></label>`;
}

function renderEditor() {
  const p = patient();
  if (!p) {
    $("#tabs").innerHTML = "";
    $("#patientForm").innerHTML = "";
    return;
  }
  const active = tabs.find((tab) => tab.id === state.activeTab);
  if (active.id === "pending") {
    $("#patientForm").innerHTML = `<div class="check-list">${pendingOptions.map((item) => {
      const checked = (p.pending || []).includes(item);
      return `<label><input type="checkbox" name="pending" value="${item}" ${checked ? "checked" : ""} /> ${item}</label>`;
    }).join("")}</div><label class="full">Outras pendências<textarea name="otherPending" placeholder="Digite outras pendências não listadas">${p.otherPending || ""}</textarea></label>`;
  } else if (active.id === "devices") {
    $("#patientForm").innerHTML = `<div class="device-toolbar"><button type="button" id="addDevice" class="secondary">Adicionar dispositivo</button></div>
      ${(p.devices || []).map(deviceRow).join("")}`;
    $("#addDevice").addEventListener("click", () => {
      p.devices = p.devices || [];
      p.devices.push({ type: "CVC", insertion: "", local: "", change: "", notes: "" });
      persist();
      renderAll();
    });
  } else {
    $("#patientForm").innerHTML = active.fields.map(inputFor).join("");
    if (active.id === "skin") {
      $("#patientForm").insertAdjacentHTML("beforeend", `<div id="bradenSummary" class="braden-summary full"></div>`);
      renderBradenSummary();
    }
  }
  $("#patientForm").oninput = handleFormInput;
  $("#patientForm").onchange = handleFormInput;
  document.querySelectorAll(".device-row button").forEach((button) => {
    button.addEventListener("click", () => {
      p.devices.splice(Number(button.dataset.index), 1);
      persist();
      renderAll();
    });
  });
}

function deviceRow(d, index) {
  return `<div class="device-row" data-index="${index}">
    <select data-device="type">${options.deviceType.map((o) => `<option value="${o}" ${o === d.type ? "selected" : ""}>${o}</option>`).join("")}</select>
    <input data-device="insertion" type="date" value="${d.insertion || ""}" />
    <input data-device="local" value="${d.local || ""}" placeholder="Local" />
    <input data-device="change" type="date" value="${d.change || ""}" />
    <input data-device="notes" value="${d.notes || ""}" placeholder="Observações" />
    <button type="button" data-index="${index}" title="Remover dispositivo">×</button>
  </div>`;
}

function handleFormInput(event) {
  const p = patient();
  if (!p) return;
  if (event.target.name === "pending") {
    p.pending = [...document.querySelectorAll("input[name='pending']:checked")].map((el) => el.value);
  } else if (event.target.dataset.device) {
    const row = event.target.closest(".device-row");
    p.devices[Number(row.dataset.index)][event.target.dataset.device] = event.target.value;
  } else if (event.target.name) {
    p[event.target.name] = event.target.type === "number" ? Number(event.target.value) || "" : event.target.value;
  }
  persist();
  renderStatic();
  renderBradenSummary();
}

function analyzePatient(p) {
  const alerts = [];
  const deviceDays = (type) => (p.devices || []).filter((d) => String(d.type).toLowerCase().includes(type)).map((d) => daysBetween(d.insertion));
  const hasOld = (type) => deviceDays(type).some((days) => days > 14);
  const vasoRate = Math.max(Number(p.vaso1Rate) || 0, Number(p.vaso2Rate) || 0);
  if (hasOld("cvc")) alerts.push(["danger", "CVC >14 dias. Avaliar troca ou retirada."]);
  if (hasOld("cvd") || hasOld("cva")) alerts.push(["danger", "Cateter vesical >14 dias. Reavaliar necessidade."]);
  if (hasOld("tot") || hasOld("tqt")) alerts.push(["danger", "Via aérea artificial >14 dias."]);
  if (vasoRate >= 20) alerts.push(["danger", "Vazão elevada de droga vasoativa."]);
  if (Number(p.fio2) >= 60) alerts.push(["danger", "FiO2 elevada."]);
  if (Number(p.urine24h) && Number(p.urine24h) < 500) alerts.push(["danger", "Diurese inferior ao esperado."]);
  if (Number(p.fluidBalance) > 1500) alerts.push(["warn", "Balanço hídrico positivo."]);
  if (p.lpp === "Sim" && ["III", "IV"].includes(String(p.lppStage).toUpperCase())) alerts.push(["danger", `LPP avançada${p.lppLocal ? ` em ${p.lppLocal}` : ""}.`]);
  if (p.colonization) alerts.push(["danger", `Colonização/alerta: ${p.colonization}.`]);
  if (p.infectionIsolation && p.infectionIsolation !== "Nenhum") alerts.push(["warn", `${p.infectionIsolation} obrigatório.`]);
  if ((p.pending || []).length || p.otherPending) alerts.push(["warn", `Pendências abertas: ${[...(p.pending || []), p.otherPending].filter(Boolean).join(", ")}.`]);
  return alerts;
}

function renderAlerts() {
  const p = patient();
  const alerts = p ? analyzePatient(p) : [];
  $("#aiAlerts").innerHTML = alerts.length ? alerts.map(([kind, text]) => `<div class="alert-item ${kind}">${text}</div>`).join("") : `<div class="alert-item info">Sem paciente selecionado ou sem alertas críticos.</div>`;
}

function renderPendingAndVitals() {
  const p = patient();
  const pending = p ? [...(p.pending || []), ...(p.otherPending ? [p.otherPending] : [])] : [];
  $("#pendingCount").textContent = pending.length;
  $("#patientPendingList").innerHTML = pending.length ? pending.map((item) => `<label><input type="checkbox" checked /> ${item}<span>Prioridade</span></label>`).join("") : `<p class="muted">Nenhuma pendência registrada.</p>`;
  $("#vitalSigns").innerHTML = p ? [
    ["FC", safe(p.hr, "-"), "bpm"], ["PA", safe(p.bp, "-"), "mmHg"], ["SpO2", safe(p.spo2, "-"), "%"], ["Temp.", safe(p.temp, "-"), "°C"]
  ].map(([name, value, unit]) => `<div><span>${name}</span><strong>${value}</strong><small>${unit}</small></div>`).join("") : `<p class="muted">Cadastre sinais vitais para acompanhar o plantão.</p>`;
}

function cultureLine(label, status) {
  if (!present(status)) return "";
  return `${label}: ${status}`;
}

function infectionBlock(p) {
  const lines = [];
  const atbs = [[p.antibiotic, p.atbDay], [p.antibiotic2, p.atb2Day]].filter(([name]) => present(name));
  const cultures = [cultureLine("Hemocultura", p.bloodCulture), cultureLine("Traqueal", p.trachealCulture), cultureLine("Urocultura", p.urineCulture)].filter(Boolean);
  const alerts = [p.colonization, p.infectionAlerts].filter(Boolean);
  const microorganism = p.microorganism === "Outro" ? p.microorganismOther : p.microorganism;
  if (!present(p.infectionIsolation) && !present(p.infectionFocus) && !atbs.length && !cultures.length && !present(microorganism) && !alerts.length) return "";
  lines.push("VIGILANCIA INFECCIOSA");
  lines.push("------------------------");
  if (present(p.infectionIsolation)) lines.push(`Isolamento\n${p.infectionIsolation}`);
  if (present(p.infectionFocus)) lines.push(`Foco\n${p.infectionFocus}`);
  if (atbs.length) lines.push(`Antibioticos\n${atbs.map(([name, day]) => `${name}${day ? ".".repeat(Math.max(2, 18 - name.length)) + day : ""}`).join("\n")}`);
  if (cultures.length) lines.push(`Culturas\n${cultures.join("\n")}`);
  if (present(microorganism)) lines.push(`Microrganismo\n${microorganism}`);
  if (alerts.length) lines.push(`Alertas\n${alerts.map((alert) => `- ${alert}`).join("\n")}`);
  return lines.join("\n");
}

function generateHandoff(p = patient()) {
  if (!p) return "";
  const introParts = [];
  if (present(p.bed)) introParts.push(`Paciente do ${p.bed}`);
  if (present(p.name)) introParts.push(p.name);
  if (present(p.age)) introParts.push(`${p.age} anos`);
  if (present(p.diagnosis)) introParts.push(`diagnóstico de ${p.diagnosis}`);

  const sentences = [];
  const respiratory = [];
  if (p.ventilation === "Sim") respiratory.push(`VM${p.mode ? ` modo ${p.mode}` : ""}`);
  else if (present(p.airway)) respiratory.push(p.airway);
  if (present(p.fio2)) respiratory.push(`FiO2 ${p.fio2}%`);
  if (present(p.peep)) respiratory.push(`PEEP ${p.peep}`);
  if (present(p.spo2)) respiratory.push(`SpO2 ${p.spo2}%`);
  if (respiratory.length) sentences.push(`Respiratório: ${respiratory.join(", ")}.`);

  const neuro = [];
  if (present(p.consciousness)) neuro.push(p.consciousness);
  if (present(p.glasgow)) neuro.push(`Glasgow ${p.glasgow}`);
  if (present(p.rass)) neuro.push(`RASS ${p.rass}`);
  if (present(p.camIcu)) neuro.push(`CAM-ICU ${p.camIcu}`);
  if (neuro.length) sentences.push(`Neurológico: ${neuro.join(", ")}.`);

  const neuroDrugs = [
    p.sedation && p.sedation !== "Não em uso" ? `sedação ${p.sedation}${p.sedationRate ? ` ${p.sedationRate} ml/h` : ""}` : "",
    p.analgesia && p.analgesia !== "Não em uso" ? `analgesia ${p.analgesia}${p.analgesiaRate ? ` ${p.analgesiaRate} ml/h` : ""}` : "",
    p.blocker && p.blocker !== "Não em uso" ? `bloqueador ${p.blocker}${p.blockerRate ? ` ${p.blockerRate} ml/h` : ""}` : ""
  ].filter(Boolean);
  if (neuroDrugs.length) sentences.push(`Sedoanalgesia/bloqueio: ${neuroDrugs.join(", ")}.`);

  const vasoRates = [p.vaso1 && p.vaso1 !== "Não em uso" ? `${p.vaso1}${p.vaso1Rate ? ` ${p.vaso1Rate} ml/h` : ""}` : "", p.vaso2 && p.vaso2 !== "Não em uso" ? `${p.vaso2}${p.vaso2Rate ? ` ${p.vaso2Rate} ml/h` : ""}` : ""].filter(Boolean);
  if (vasoRates.length) sentences.push(`Drogas vasoativas: ${vasoRates.join(", ")}.`);

  const diet = [];
  if (present(p.diet)) diet.push(p.diet);
  if (present(p.tube)) diet.push(p.tube);
  if (present(p.dietVolume)) diet.push(`${p.dietVolume}`);
  if (diet.length) sentences.push(`Dieta: ${diet.join(", ")}.`);

  const urinary = [];
  if (present(p.urineType)) urinary.push(p.urineType);
  if (present(p.urine24h)) urinary.push(`${p.urine24h} ml/24h`);
  if (present(p.fluidBalance)) urinary.push(`balanço ${p.fluidBalance} ml`);
  if (p.dialysis === "Sim") urinary.push(`HD${p.uf ? ` UF ${p.uf}` : ""}`);
  if (urinary.length) sentences.push(`Geniturinário: ${urinary.join(", ")}.`);

  if (p.lpp === "Sim") sentences.push(`Pele: LPP${p.lppLocal ? ` ${p.lppLocal}` : ""}${p.lppStage ? ` estágio ${p.lppStage}` : ""}.`);
  const braden = bradenScore(p);
  if (braden) sentences.push(`Braden ${braden.total} (${braden.risk}).`);

  const pending = [...(p.pending || []), p.otherPending].filter(Boolean);
  if (pending.length) sentences.push(`Pendências: ${pending.join(", ")}.`);

  const infection = infectionBlock(p);
  return [introParts.join(" · "), sentences.join(" "), infection].filter(Boolean).join("\n");
}

function renderHandoff() {
  $("#handoffText").value = state.patients.length ? state.patients.map(generateHandoff).join("\n\n") : "";
}

function runSearch() {
  const q = $("#smartSearch").value.toLowerCase().trim();
  if (!q) {
    renderCards();
    $("#searchResults").textContent = "";
    return;
  }
  let results = [];
  if (q.includes("noradrenalina")) results = state.patients.filter((p) => p.vaso1 === "Noradrenalina" || p.vaso2 === "Noradrenalina");
  else if (q.includes("vm") || q.includes("ventil")) results = state.patients.filter((p) => p.ventilation === "Sim");
  else if (q.includes("isol")) results = state.patients.filter(hasIsolation);
  else if (q.includes("diál") || q.includes("dial")) results = state.patients.filter((p) => p.dialysis === "Sim");
  else results = state.patients.filter((p) => JSON.stringify(p).toLowerCase().includes(q));
  renderCards(results);
  $("#searchResults").textContent = results.length ? `${results.length} resultado(s)` : "Nenhum paciente encontrado.";
}

function exportCsv() {
  const rows = [["Leito", "Nome", "Idade", "Diagnóstico", "VM", "DVA", "HD", "Isolamento", "Pendências"]];
  state.patients.forEach((p) => rows.push([p.bed, p.name, p.age, p.diagnosis, p.ventilation, [p.vaso1, p.vaso2].filter(Boolean).join("; "), p.dialysis, p.infectionIsolation || p.precaution || p.isolation, [...(p.pending || []), p.otherPending].filter(Boolean).join("; ")]));
  download("mapa-pacientes.csv", rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n"), "text/csv");
}

function exportWord() {
  download("passagem-uti-azul.doc", `<html><meta charset="utf-8"><body><h1>NurseShift AI - Passagem UTI Azul</h1><pre>${$("#handoffText").value}</pre></body></html>`, "application/msword");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function addPatient() {
  state.patients.push({
    bed: `Leito ${String(state.patients.length + 1).padStart(2, "0")}`,
    name: "", age: "", sex: "", admission: today, diagnosis: "", precaution: "",
    ventilation: "", diet: "", urineType: "", dialysis: "", skinIntact: "", lpp: "", isolation: "",
    pending: [], devices: []
  });
  state.activePatient = state.patients.length - 1;
  state.activeTab = "identificacao";
  persist();
  renderAll();
}

function renderStatic() {
  renderMetrics();
  renderCards();
  renderPatientHeader();
  renderAlerts();
  renderPendingAndVitals();
  renderHandoff();
}

function renderAll() {
  renderStatic();
  renderTabs();
  renderEditor();
}

function init() {
  $("#shiftDate").value = today;
  $("#humanDate").textContent = new Date(today + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  $("#openSiteCommand").addEventListener("click", () => window.open(window.location.href, "_blank", "noopener"));
  $("#addPatient").addEventListener("click", addPatient);
  $("#viewAllPatients").addEventListener("click", () => { $("#smartSearch").value = ""; runSearch(); });
  $("#generateHandoff").addEventListener("click", renderHandoff);
  $("#copyHandoff").addEventListener("click", async () => navigator.clipboard.writeText($("#handoffText").value));
  $("#runSearch").addEventListener("click", runSearch);
  $("#smartSearch").addEventListener("input", runSearch);
  $("#exportPdf").addEventListener("click", () => window.print());
  $("#exportWord").addEventListener("click", exportWord);
  $("#exportCsv").addEventListener("click", exportCsv);
  $("#saveSnapshot").addEventListener("click", persist);
  renderAll();
}

init();
