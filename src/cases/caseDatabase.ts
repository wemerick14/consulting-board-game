import { CaseTemplate } from "../types";

export const caseDatabase: CaseTemplate[] = [
  // ========== MARKET SIZING CASES ==========
  {
    id: "ms-icedcoffee-tx-v1",
    category: "market_sizing",
    title: "Iced Coffee in Texas",
    stem_template: "Estimate annual iced coffees sold in Texas. Population: {population}M, Penetration: {penPct}%, Frequency: {freq} cups/week per drinker, Seasonality factor: {season}. What is the total annual market size?",
    inputs: ["population", "penPct", "freq", "season"],
    params: {
      population: { min: 25, max: 32, step: 1 },
      penPct: { min: 30, max: 55, step: 5 },
      freq: { min: 2, max: 5, step: 1 },
      season: { min: 0.9, max: 1.1, step: 0.05 }
    },
    decision: { type: "numeric" },
    truth_howto: "Units = population × 1e6 × (penPct/100) × freq × 52 × season",
    time_limit_s: 60,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-ev-charging-v1",
    category: "market_sizing",
    title: "EV Charging Sessions in City",
    stem_template: "Estimate annual public EV charging sessions in Austin. Households: {hh}k, EV Penetration: {evPen}%, Sessions/week per EV: {sess}, Public share: {publicShare}%. Calculate total annual sessions.",
    inputs: ["hh", "evPen", "sess", "publicShare"],
    params: {
      hh: { min: 350, max: 450, step: 10 },
      evPen: { min: 8, max: 18, step: 2 },
      sess: { min: 2, max: 4, step: 1 },
      publicShare: { min: 40, max: 70, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "EVs = hh × 1000 × (evPen/100); sessions = EVs × sess × 52 × (publicShare/100)",
    time_limit_s: 75,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-streaming-subs-v1",
    category: "market_sizing",
    title: "Streaming Subscribers TAM",
    stem_template: "Estimate paid subscribers for a new sports streaming add-on in the US. Population: {pop}M, Sports fans: {fanPct}%, Device availability: {devicePct}%, Willingness to pay: {wtpPct}%. What's the addressable market?",
    inputs: ["pop", "fanPct", "devicePct", "wtpPct"],
    params: {
      pop: { min: 320, max: 340, step: 5 },
      fanPct: { min: 35, max: 55, step: 5 },
      devicePct: { min: 75, max: 92, step: 3 },
      wtpPct: { min: 15, max: 35, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "TAM = pop × 1e6 × (fanPct/100) × (devicePct/100) × (wtpPct/100)",
    time_limit_s: 60,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== PROFITABILITY CASES ==========
  {
    id: "profit-retail-bridge-v1",
    category: "profitability",
    title: "Retail Chain EBITDA Bridge",
    stem_template: "A fashion retailer saw EBITDA decline YoY. Last year: Traffic {traffic}k, Conversion {convRate}%, AOV ${aov}, COGS {cogsPct}% of revenue, Fixed costs ${fixedCosts}M. This year: Traffic {trafficChgPct}%, Conversion {convChgPp}pp, AOV {aovChgPct}%, COGS {cogsChgPp}pp, Fixed {fixChgPct}%. What is this year's EBITDA ($M)?",
    inputs: ["traffic", "convRate", "aov", "cogsPct", "fixedCosts", "trafficChgPct", "convChgPp", "aovChgPct", "cogsChgPp", "fixChgPct"],
    params: {
      traffic: { min: 400, max: 900, step: 50 },
      convRate: { min: 8, max: 16, step: 1 },
      aov: { min: 45, max: 75, step: 5 },
      cogsPct: { min: 52, max: 68, step: 2 },
      fixedCosts: { min: 12, max: 22, step: 2 },
      trafficChgPct: { min: -15, max: 10, step: 5 },
      convChgPp: { min: -3, max: 2, step: 1 },
      aovChgPct: { min: -10, max: 12, step: 2 },
      cogsChgPp: { min: -3, max: 5, step: 1 },
      fixChgPct: { min: -5, max: 12, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "Revenue = traffic × (convRate/100) × aov; GP = revenue × (1 - cogsPct/100); EBITDA = GP - fixedCosts",
    severe_miss_rule: "opposite_sign",
    time_limit_s: 90,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "profit-pharmacy-kiosk-v1",
    category: "profitability",
    title: "Grocery Pharmacy Kiosk",
    stem_template: "A grocer adds pharmacy kiosks. Scripts/day: {scripts}, Price: ${price}, Gross margin: {gmPct}%, Staffing: ${staff}k/yr, Rent: ${rent}k/yr, Shrink: {shrinkPct}%, CAPEX: ${capex}k. What is the simple payback period in years?",
    inputs: ["scripts", "price", "gmPct", "staff", "rent", "shrinkPct", "capex"],
    params: {
      scripts: { min: 200, max: 450, step: 50 },
      price: { min: 30, max: 60, step: 5 },
      gmPct: { min: 28, max: 42, step: 2 },
      staff: { min: 150, max: 280, step: 20 },
      rent: { min: 45, max: 95, step: 10 },
      shrinkPct: { min: 0.8, max: 1.8, step: 0.2 },
      capex: { min: 450, max: 950, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "Revenue = scripts × 365 × price; GP = revenue × (gmPct/100); Shrink = revenue × (shrinkPct/100); EBITDA = GP - staff×1000 - rent×1000 - Shrink; Payback = capex×1000 / EBITDA",
    time_limit_s: 90,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "profit-saas-unit-econ-v1",
    category: "profitability",
    title: "SaaS Unit Economics",
    stem_template: "A B2B SaaS company: ACV ${acv}k, Gross margin {gmPct}%, CAC ${cac}k, Avg customer lifetime {lifetime} years. What is the LTV:CAC ratio?",
    inputs: ["acv", "gmPct", "cac", "lifetime"],
    params: {
      acv: { min: 12, max: 48, step: 4 },
      gmPct: { min: 72, max: 88, step: 2 },
      cac: { min: 8, max: 28, step: 2 },
      lifetime: { min: 2.5, max: 5.5, step: 0.5 }
    },
    decision: { type: "numeric" },
    truth_howto: "LTV = ACV × (gmPct/100) × lifetime; Ratio = LTV / CAC",
    time_limit_s: 60,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== PRICING CASES ==========
  {
    id: "pricing-oilgas-v1",
    category: "pricing",
    title: "Fuel Retailer Price Elasticity",
    stem_template: "A fuels retailer considers a {priceChange}¢/gal price change. Elasticity: {elasticity}, Base volume: {baseVol}M gal/yr, Margin: {margin}¢/gal. What is the expected annual profit delta ($)?",
    inputs: ["priceChange", "elasticity", "baseVol", "margin"],
    params: {
      priceChange: { min: -10, max: 12, step: 2 },
      elasticity: { min: -1.8, max: -0.4, step: 0.2 },
      baseVol: { min: 15, max: 65, step: 5 },
      margin: { min: 8, max: 22, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "See computePricingElasticity function",
    time_limit_s: 75,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "pricing-saas-discount-v1",
    category: "pricing",
    title: "SaaS Discount Impact",
    stem_template: "A SaaS firm tests a {disc}% discount. Base ACV: ${acv}k, Gross margin: {gmPct}%, Expected conversion lift: {convLift}pp, Churn increase: {churnInc}pp. Should they run the discount? (Annual cohort value impact)",
    inputs: ["disc", "acv", "gmPct", "convLift", "churnInc"],
    params: {
      disc: { min: 10, max: 30, step: 5 },
      acv: { min: 18, max: 42, step: 6 },
      gmPct: { min: 75, max: 88, step: 2 },
      convLift: { min: 5, max: 18, step: 2 },
      churnInc: { min: 0, max: 8, step: 2 }
    },
    decision: {
      type: "mcq",
      options: [
        "Run discount - strong positive impact",
        "Run discount - marginal positive impact",
        "Don't run - marginal negative impact",
        "Don't run - strong negative impact"
      ],
      points: [4, 3, 2, 0]
    },
    truth_howto: "Compare cohort value: (1 + convLift) × (1 - disc) × gmPct × (retention impact)",
    time_limit_s: 75
  },

  // ========== PE / FINANCE CASES ==========
  {
    id: "pe-dairy-v1",
    category: "pe",
    title: "Dairy Farm Screening",
    stem_template: "Milk yield: {yieldPerCow} gal/cow/day, Herd size: {herd}, Milk price: ${price}/gal, Variable cost: ${varCost}/gal, Fixed costs: ${fixedCosts}k/yr, EV: ${ev}M, Target multiple: {targetMult}×. What's your recommendation?",
    inputs: ["yieldPerCow", "herd", "price", "varCost", "fixedCosts", "ev", "targetMult"],
    params: {
      yieldPerCow: { min: 6, max: 9, step: 0.5 },
      herd: { min: 350, max: 850, step: 50 },
      price: { min: 3.2, max: 4.8, step: 0.2 },
      varCost: { min: 1.8, max: 3.2, step: 0.2 },
      fixedCosts: { min: 280, max: 520, step: 40 },
      ev: { min: 4.5, max: 9.5, step: 0.5 },
      targetMult: { min: 6.5, max: 8.5, step: 0.5 }
    },
    decision: {
      type: "mcq",
      options: [
        "Buy now - attractive valuation",
        "Buy with ops improvement plan",
        "Pass - overvalued",
        "Request additional due diligence first"
      ],
      points: [4, 3, 2, 1]
    },
    truth_howto: "See computePEscreen function",
    time_limit_s: 90
  },

  {
    id: "pe-rollup-synergy-v1",
    category: "pe",
    title: "PE Roll-Up Synergies",
    stem_template: "Two HVAC companies, each with revenue ${rev}M and EBITDA margin {ebitdaPct}%. Synergies: COGS improvement {cogsPp}pp, SG&A reduction {sgaPp}pp, One-time integration cost ${oneTime}M. Combined EBITDA improvement ($M)?",
    inputs: ["rev", "ebitdaPct", "cogsPp", "sgaPp", "oneTime"],
    params: {
      rev: { min: 18, max: 45, step: 3 },
      ebitdaPct: { min: 12, max: 22, step: 2 },
      cogsPp: { min: 2, max: 6, step: 1 },
      sgaPp: { min: 3, max: 8, step: 1 },
      oneTime: { min: 2, max: 6, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "Combined revenue = 2 × rev; Synergy impact = revenue × ((cogsPp + sgaPp)/100); Net = synergy - oneTime (amortized)",
    time_limit_s: 75,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== MARKET ENTRY CASES ==========
  {
    id: "entry-waterpark-v1",
    category: "market_entry",
    title: "Water Park Expansion NPV",
    stem_template: "Regional park weighs second site. TAM: {tam}M visits/yr, Share ramp: Y1 {r1}%, Y2 {r2}%, Y3 {r3}%, Ticket: ${ticket}, Var cost: ${varCost}, Fixed: ${fixedCosts}M/yr, CAPEX: ${capex}M, Discount rate: {disc}%. What's your recommendation?",
    inputs: ["tam", "r1", "r2", "r3", "ticket", "varCost", "fixedCosts", "capex", "disc"],
    params: {
      tam: { min: 2.5, max: 5.5, step: 0.5 },
      r1: { min: 3, max: 7, step: 1 },
      r2: { min: 7, max: 12, step: 1 },
      r3: { min: 10, max: 16, step: 1 },
      ticket: { min: 32, max: 58, step: 4 },
      varCost: { min: 8, max: 18, step: 2 },
      fixedCosts: { min: 4, max: 12, step: 2 },
      capex: { min: 75, max: 165, step: 15 },
      disc: { min: 8, max: 12, step: 1 }
    },
    decision: {
      type: "mcq",
      options: [
        "Open now - strong NPV",
        "Delay 1 year - marginal case",
        "Cancel - negative NPV"
      ],
      points: [4, 2, 1]
    },
    truth_howto: "See computeWaterParkNPV function",
    time_limit_s: 90
  },

  {
    id: "entry-snacks-germany-v1",
    category: "market_entry",
    title: "Snack Brand Germany Entry",
    stem_template: "US snack brand considers Germany via retail partners. TAM: {tam}M units, Feasible share: {share}%, Price: €{price}, Var cost: €{varCost}, Fixed: €{fixedCosts}M/yr, Partner fee: {partnerPct}% of revenue. Year 1 profit (€M)?",
    inputs: ["tam", "share", "price", "varCost", "fixedCosts", "partnerPct"],
    params: {
      tam: { min: 180, max: 320, step: 20 },
      share: { min: 2, max: 8, step: 1 },
      price: { min: 2.5, max: 4.5, step: 0.5 },
      varCost: { min: 1.0, max: 2.2, step: 0.2 },
      fixedCosts: { min: 3, max: 8, step: 1 },
      partnerPct: { min: 8, max: 18, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "Volume = TAM × (share/100); Revenue = volume × price; Contribution = (price - varCost) × volume; Profit = contribution - fixedCosts - (revenue × partnerPct/100)",
    time_limit_s: 75,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== OPS CASES ==========
  {
    id: "ops-throughput-defects-v1",
    category: "ops",
    title: "Factory Ops Lever Selection",
    stem_template: "Factory: Throughput {tp}k units/wk, Defect rate {dr}%, Backlog {backlog}k units. Contribution margin: ${margin}/unit. Four levers available. Which has largest 3-month EBITDA impact?",
    inputs: ["tp", "dr", "backlog", "margin"],
    params: {
      tp: { min: 45, max: 95, step: 5 },
      dr: { min: 3, max: 12, step: 1 },
      backlog: { min: 15, max: 55, step: 5 },
      margin: { min: 18, max: 42, step: 4 }
    },
    decision: {
      type: "mcq",
      options: [
        "+15% throughput (cost: $200k)",
        "-50% defect rate (cost: $180k)",
        "Clear backlog with overtime (cost: $150k)",
        "Combo: +8% throughput & -25% defects (cost: $280k)"
      ],
      points: [3, 4, 2, 3]
    },
    truth_howto: "Calculate incremental good units × margin - cost for each option",
    time_limit_s: 90
  },

  {
    id: "ops-ecommerce-funnel-v1",
    category: "ops",
    title: "E-Commerce Funnel Optimization",
    stem_template: "Monthly traffic: {traffic}k, CTR: {ctr}%, Add-to-cart: {atc}%, Checkout: {chk}%, Conversion: {conv}%, AOV: ${aov}, Margin: {margin}%. Which lever has highest monthly profit impact?",
    inputs: ["traffic", "ctr", "atc", "chk", "conv", "aov", "margin"],
    params: {
      traffic: { min: 180, max: 380, step: 20 },
      ctr: { min: 2.2, max: 4.5, step: 0.3 },
      atc: { min: 18, max: 32, step: 2 },
      chk: { min: 55, max: 75, step: 5 },
      conv: { min: 42, max: 68, step: 4 },
      aov: { min: 75, max: 145, step: 10 },
      margin: { min: 28, max: 48, step: 4 }
    },
    decision: {
      type: "mcq",
      options: [
        "+20% traffic (cost: $25k/mo)",
        "+15% CTR (cost: $18k/mo)",
        "+10% conversion (cost: $22k/mo)",
        "+12% AOV via upsells (cost: $15k/mo)"
      ],
      points: [2, 3, 4, 3]
    },
    truth_howto: "Baseline orders = traffic × CTR × ATC × CHK × CONV; Profit = orders × AOV × margin - cost",
    time_limit_s: 90
  },

  // ========== PUBLIC SECTOR CASES ==========
  {
    id: "public-edu-portfolio-v1",
    category: "public",
    title: "School System Portfolio Allocation",
    stem_template: "Budget: ${budget}M for {students}k students across 3 programs. Tutoring: ${tutorCost}/student, +{tutorLift}pp proficiency. Teacher pipeline: ${teacherCost}/student, +{teacherLift}pp. Data platform: ${dataCost}/student, +{dataLift}pp. Optimize for impact per dollar.",
    inputs: ["budget", "students", "tutorCost", "tutorLift", "teacherCost", "teacherLift", "dataCost", "dataLift"],
    params: {
      budget: { min: 15, max: 35, step: 5 },
      students: { min: 45, max: 85, step: 5 },
      tutorCost: { min: 180, max: 320, step: 20 },
      tutorLift: { min: 8, max: 15, step: 1 },
      teacherCost: { min: 250, max: 420, step: 30 },
      teacherLift: { min: 12, max: 22, step: 2 },
      dataCost: { min: 80, max: 180, step: 20 },
      dataLift: { min: 4, max: 10, step: 1 }
    },
    decision: {
      type: "mcq",
      options: [
        "100% Tutoring",
        "100% Teacher pipeline",
        "100% Data platform",
        "60% Teacher, 40% Data"
      ],
      points: [2, 3, 4, 3]
    },
    truth_howto: "Impact/$ = (lift per student) / cost; Rank options by this ratio and budget fit",
    time_limit_s: 90
  },

  {
    id: "public-city-budget-v1",
    category: "public",
    title: "City Budget Gap Closure",
    stem_template: "City faces ${gap}M deficit. Revenue options: Parking fee +${parkRev}M, Collections +${collRev}M. Expense options: Vendor renegotiation -${vendorSave}M, Overtime reduction -${otSave}M. Minimize service impact while closing gap.",
    inputs: ["gap", "parkRev", "collRev", "vendorSave", "otSave"],
    params: {
      gap: { min: 18, max: 42, step: 4 },
      parkRev: { min: 6, max: 14, step: 2 },
      collRev: { min: 4, max: 10, step: 2 },
      vendorSave: { min: 8, max: 18, step: 2 },
      otSave: { min: 5, max: 12, step: 1 }
    },
    decision: {
      type: "mcq",
      options: [
        "All revenue levers (parking + collections)",
        "All expense levers (vendor + OT)",
        "Balanced mix: vendor + parking + partial OT",
        "Aggressive: all four levers"
      ],
      points: [2, 3, 4, 2]
    },
    truth_howto: "Sum impacts and compare to gap; rank by feasibility (expense cuts > fees) and impact",
    time_limit_s: 75
  }
];
