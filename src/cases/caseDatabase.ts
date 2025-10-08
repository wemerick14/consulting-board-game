import type { CaseTemplate } from "../types";

export const caseDatabase: CaseTemplate[] = [
  // ========== QUICK MATH (20 questions, 2-step, 40-50 seconds) ==========

  {
    id: "qm-coffee-revenue-2step",
    category: "quick_math",
    difficulty: "quick",
    title: "Coffee Shop Daily Revenue",
    stem_template: "A coffee shop has {customers} customers per day. {buyPct}% buy coffee at ${price} each. What's the daily coffee revenue?",
    inputs: ["customers", "buyPct", "price"],
    params: {
      customers: { min: 200, max: 500, step: 50 },
      buyPct: { min: 40, max: 70, step: 5 },
      price: { min: 4, max: 6, step: 0.5 }
    },
    decision: { type: "numeric" },
    truth_howto: "revenue = customers × (buyPct/100) × price",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-profit-margin-2step",
    category: "quick_math",
    difficulty: "quick",
    title: "Product Profit Margin %",
    stem_template: "A product sells for ${price} with production cost of ${cost} and overhead of ${overhead} per unit. What's the profit margin percentage?",
    inputs: ["price", "cost", "overhead"],
    params: {
      price: { min: 50, max: 150, step: 10 },
      cost: { min: 20, max: 60, step: 5 },
      overhead: { min: 5, max: 20, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "margin = ((price - cost - overhead) / price) × 100",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-growth-rate",
    category: "quick_math",
    difficulty: "quick",
    title: "Year-over-Year Growth",
    stem_template: "Last year revenue was ${lastYear}k. This year it's ${thisYear}k. What's the growth rate as a percentage?",
    inputs: ["lastYear", "thisYear"],
    params: {
      lastYear: { min: 100, max: 300, step: 50 },
      thisYear: { min: 120, max: 400, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "growthPct = ((thisYear - lastYear) / lastYear) × 100",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-blended-price",
    category: "quick_math",
    difficulty: "quick",
    title: "Average Order Value",
    stem_template: "A store sells {item1Units} units at ${item1Price} and {item2Units} units at ${item2Price}. What's the average price per item sold?",
    inputs: ["item1Units", "item1Price", "item2Units", "item2Price"],
    params: {
      item1Units: { min: 100, max: 300, step: 50 },
      item1Price: { min: 10, max: 30, step: 5 },
      item2Units: { min: 50, max: 200, step: 50 },
      item2Price: { min: 20, max: 50, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "avgPrice = (item1Units × item1Price + item2Units × item2Price) / (item1Units + item2Units)",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-customer-acquisition",
    category: "quick_math",
    difficulty: "quick",
    title: "Customer Acquisition Cost",
    stem_template: "Spent ${marketing}k on marketing and ${sales}k on sales. Acquired {customers} new customers. What's the cost per customer?",
    inputs: ["marketing", "sales", "customers"],
    params: {
      marketing: { min: 20, max: 80, step: 10 },
      sales: { min: 10, max: 50, step: 10 },
      customers: { min: 100, max: 500, step: 100 }
    },
    decision: { type: "numeric" },
    truth_howto: "cac = (marketing + sales) × 1000 / customers",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-retention-value",
    category: "quick_math",
    difficulty: "quick",
    title: "Revenue Impact of Churn",
    stem_template: "You have {customers} customers paying ${monthly} per month. {churnPct}% cancel each month. How much monthly revenue is lost?",
    inputs: ["customers", "monthly", "churnPct"],
    params: {
      customers: { min: 500, max: 2000, step: 500 },
      monthly: { min: 20, max: 100, step: 10 },
      churnPct: { min: 5, max: 15, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "lostRevenue = customers × monthly × (churnPct/100)",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-inventory-turnover",
    category: "quick_math",
    difficulty: "quick",
    title: "Inventory Days on Hand",
    stem_template: "Annual cost of goods sold is ${cogs}k. Average inventory is ${inventory}k. How many days of inventory on hand? (Use 365 days)",
    inputs: ["cogs", "inventory"],
    params: {
      cogs: { min: 500, max: 2000, step: 250 },
      inventory: { min: 50, max: 300, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "daysOnHand = (inventory / cogs) × 365",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-price-elasticity",
    category: "quick_math",
    difficulty: "quick",
    title: "Revenue After Price Change",
    stem_template: "Current: ${currentPrice} price, {currentVolume} units sold. Increase price to ${newPrice}. Volume drops to {newVolume}. What's new revenue?",
    inputs: ["currentPrice", "currentVolume", "newPrice", "newVolume"],
    params: {
      currentPrice: { min: 20, max: 50, step: 5 },
      currentVolume: { min: 1000, max: 3000, step: 500 },
      newPrice: { min: 25, max: 60, step: 5 },
      newVolume: { min: 700, max: 2500, step: 300 }
    },
    decision: { type: "numeric" },
    truth_howto: "newRevenue = newPrice × newVolume",
    time_limit_s: 40,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-fixed-variable-costs",
    category: "quick_math",
    difficulty: "quick",
    title: "Total Cost Structure",
    stem_template: "Fixed costs: ${fixed}k/month. Variable cost: ${variable} per unit. Producing {units} units. What's total monthly cost in thousands?",
    inputs: ["fixed", "variable", "units"],
    params: {
      fixed: { min: 20, max: 100, step: 20 },
      variable: { min: 5, max: 25, step: 5 },
      units: { min: 500, max: 3000, step: 500 }
    },
    decision: { type: "numeric" },
    truth_howto: "totalCost = fixed + (variable × units) / 1000",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-payback-period",
    category: "quick_math",
    difficulty: "quick",
    title: "Investment Payback Time",
    stem_template: "Investment costs ${upfront}k. Generates ${monthly}k profit per month for {months} months. What's the net profit after payback?",
    inputs: ["upfront", "monthly", "months"],
    params: {
      upfront: { min: 50, max: 200, step: 50 },
      monthly: { min: 10, max: 30, step: 5 },
      months: { min: 12, max: 24, step: 6 }
    },
    decision: { type: "numeric" },
    truth_howto: "netProfit = (monthly × months) - upfront",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-contribution-margin",
    category: "quick_math",
    difficulty: "quick",
    title: "Contribution Margin per Unit",
    stem_template: "Selling price: ${price}. Direct materials: ${materials}. Direct labor: ${labor}. What's the contribution margin per unit?",
    inputs: ["price", "materials", "labor"],
    params: {
      price: { min: 50, max: 150, step: 10 },
      materials: { min: 15, max: 50, step: 5 },
      labor: { min: 10, max: 40, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "contribution = price - materials - labor",
    time_limit_s: 40,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-conversion-funnel",
    category: "quick_math",
    difficulty: "quick",
    title: "Funnel Conversion Math",
    stem_template: "{visitors} website visitors, {leadPct}% become leads, {customerPct}% of leads become customers. How many customers?",
    inputs: ["visitors", "leadPct", "customerPct"],
    params: {
      visitors: { min: 5000, max: 20000, step: 5000 },
      leadPct: { min: 10, max: 30, step: 5 },
      customerPct: { min: 15, max: 40, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "customers = visitors × (leadPct/100) × (customerPct/100)",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-market-share",
    category: "quick_math",
    difficulty: "quick",
    title: "Market Share Calculation",
    stem_template: "Total market size: ${market}M. Your revenue: ${revenue}M. Competitor A: ${compA}M, Competitor B: ${compB}M. What's your market share %?",
    inputs: ["market", "revenue", "compA", "compB"],
    params: {
      market: { min: 100, max: 500, step: 100 },
      revenue: { min: 10, max: 80, step: 10 },
      compA: { min: 15, max: 100, step: 15 },
      compB: { min: 10, max: 80, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "marketShare = (revenue / market) × 100",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-staff-productivity",
    category: "quick_math",
    difficulty: "quick",
    title: "Revenue Per Employee",
    stem_template: "Company has {employees} employees generating ${revenue}M annually. What's revenue per employee in thousands?",
    inputs: ["employees", "revenue"],
    params: {
      employees: { min: 50, max: 300, step: 50 },
      revenue: { min: 10, max: 100, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "revenuePerEmp = (revenue × 1000) / employees",
    time_limit_s: 40,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-break-even-volume",
    category: "quick_math",
    difficulty: "quick",
    title: "Break-Even Units Needed",
    stem_template: "Fixed costs: ${fixed}k. Selling price: ${price} per unit. Variable cost: ${variable} per unit. Units needed to break even?",
    inputs: ["fixed", "price", "variable"],
    params: {
      fixed: { min: 50, max: 200, step: 25 },
      price: { min: 30, max: 100, step: 10 },
      variable: { min: 10, max: 50, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "breakEvenUnits = (fixed × 1000) / (price - variable)",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-discount-impact",
    category: "quick_math",
    difficulty: "quick",
    title: "Discount Revenue Impact",
    stem_template: "Original price ${original}, selling {volume} units. Give {discount}% off. How much revenue is lost?",
    inputs: ["original", "volume", "discount"],
    params: {
      original: { min: 50, max: 200, step: 25 },
      volume: { min: 500, max: 2000, step: 500 },
      discount: { min: 10, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "lostRevenue = original × volume × (discount/100)",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-capacity-utilization",
    category: "quick_math",
    difficulty: "quick",
    title: "Factory Utilization Rate",
    stem_template: "Factory can produce {maxUnits} units/day working {maxHours} hours. Currently producing {currentUnits} units in {currentHours} hours. What's utilization %?",
    inputs: ["maxUnits", "maxHours", "currentUnits", "currentHours"],
    params: {
      maxUnits: { min: 1000, max: 5000, step: 1000 },
      maxHours: { min: 16, max: 24, step: 4 },
      currentUnits: { min: 600, max: 4000, step: 600 },
      currentHours: { min: 12, max: 20, step: 4 }
    },
    decision: { type: "numeric" },
    truth_howto: "utilization = (currentUnits / maxUnits) × 100",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-price-floor",
    category: "quick_math",
    difficulty: "quick",
    title: "Minimum Viable Price",
    stem_template: "Variable cost ${variable} per unit. Fixed costs ${fixed}k to cover. Selling {units} units. What minimum price per unit?",
    inputs: ["variable", "fixed", "units"],
    params: {
      variable: { min: 10, max: 40, step: 5 },
      fixed: { min: 20, max: 100, step: 20 },
      units: { min: 500, max: 2000, step: 500 }
    },
    decision: { type: "numeric" },
    truth_howto: "minPrice = variable + (fixed × 1000 / units)",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-operating-leverage",
    category: "quick_math",
    difficulty: "quick",
    title: "Operating Profit Change",
    stem_template: "Revenue increased {revGrowth}%. Fixed costs ${fixed}k, variable costs are {varPct}% of revenue. Old revenue ${oldRev}k. What's new operating profit?",
    inputs: ["revGrowth", "fixed", "varPct", "oldRev"],
    params: {
      revGrowth: { min: 10, max: 30, step: 5 },
      fixed: { min: 50, max: 150, step: 25 },
      varPct: { min: 40, max: 70, step: 5 },
      oldRev: { min: 200, max: 600, step: 100 }
    },
    decision: { type: "numeric" },
    truth_howto: "newProfit = oldRev × (1 + revGrowth/100) × (1 - varPct/100) - fixed",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-net-promoter",
    category: "quick_math",
    difficulty: "quick",
    title: "NPS Score Calculation",
    stem_template: "Surveyed {total} customers: {promoters} rated 9-10 (promoters), {detractors} rated 0-6 (detractors). What's the NPS score?",
    inputs: ["total", "promoters", "detractors"],
    params: {
      total: { min: 100, max: 300, step: 50 },
      promoters: { min: 40, max: 150, step: 10 },
      detractors: { min: 10, max: 50, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "nps = ((promoters - detractors) / total) × 100",
    time_limit_s: 50,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== FULL CASES (20 questions, 2-3 steps, 60-90 seconds) ==========

  {
    id: "fc-food-truck-breakeven",
    category: "market_entry",
    difficulty: "full",
    title: "Food Truck Break-Even Analysis",
    stem_template: "Your client, TacoTrek, is considering launching a food truck business. The CEO wants to understand the payback period before committing capital. Startup costs: ${startup}k. Projected daily revenue: ${dailyRev}, daily operating costs: ${dailyCost}. Operating {daysPerMonth} days/month. How many months until break-even?",
    inputs: ["startup", "dailyRev", "dailyCost", "daysPerMonth"],
    params: {
      startup: { min: 50, max: 150, step: 25 },
      dailyRev: { min: 800, max: 2000, step: 200 },
      dailyCost: { min: 400, max: 1200, step: 200 },
      daysPerMonth: { min: 20, max: 25, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "monthsToBreakEven = (startup × 1000) / ((dailyRev - dailyCost) × daysPerMonth)",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-saas-ltv",
    category: "profitability",
    difficulty: "full",
    title: "SaaS Customer Lifetime Value",
    stem_template: "CloudFlow, a B2B software company, has asked you to calculate customer lifetime value (LTV) to inform their customer acquisition strategy. Monthly subscription: ${monthly}. Average customer tenure: {months} months. Cost to serve each customer: ${serveCost}/month. What's the LTV per customer?",
    inputs: ["monthly", "months", "serveCost"],
    params: {
      monthly: { min: 50, max: 200, step: 25 },
      months: { min: 12, max: 36, step: 6 },
      serveCost: { min: 10, max: 50, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "ltv = (monthly - serveCost) × months",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-retail-expansion-tam",
    category: "market_sizing",
    difficulty: "full",
    title: "Retail Market Opportunity",
    stem_template: "StyleCo, an apparel retailer, is evaluating a new city for expansion. The CFO needs a quick total addressable market (TAM) estimate. City population: {population}k. Target demographic: {targetPct}% of population. Annual purchase rate among targets: {purchasePct}%. Average purchase value: ${avgPurchase}. What's the TAM in millions?",
    inputs: ["population", "targetPct", "purchasePct", "avgPurchase"],
    params: {
      population: { min: 200, max: 1000, step: 200 },
      targetPct: { min: 20, max: 50, step: 10 },
      purchasePct: { min: 30, max: 70, step: 10 },
      avgPurchase: { min: 100, max: 500, step: 100 }
    },
    decision: { type: "numeric" },
    truth_howto: "tam = (population × 1000 × (targetPct/100) × (purchasePct/100) × avgPurchase) / 1000000",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-subscription-churn-impact",
    category: "profitability",
    difficulty: "full",
    title: "Subscription Revenue Projection",
    stem_template: "StreamFit's CFO needs a revenue projection for their upcoming board meeting. Current base: {startingSubs} subscribers at ${monthly}/month. New customer growth: {newSubs} subscribers/month. Monthly churn rate: {churnPct}%. What will month 12 monthly revenue be?",
    inputs: ["startingSubs", "monthly", "newSubs", "churnPct"],
    params: {
      startingSubs: { min: 1000, max: 5000, step: 1000 },
      monthly: { min: 20, max: 100, step: 20 },
      newSubs: { min: 100, max: 500, step: 100 },
      churnPct: { min: 5, max: 15, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "month12Subs = startingSubs + (newSubs × 12) - (startingSubs × (churnPct/100) × 12); month12Rev = month12Subs × monthly",
    time_limit_s: 90,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-pricing-optimization",
    category: "pricing",
    difficulty: "full",
    title: "Price Point Comparison",
    stem_template: "TechiePro leadership is testing two pricing strategies for their new product. Option A: Price at ${priceA}, projected volume {volumeA} units, variable cost ${costA}/unit. Option B: Price at ${priceB}, volume {volumeB} units, cost ${costB}/unit. Which option maximizes total contribution margin?",
    inputs: ["priceA", "volumeA", "costA", "priceB", "volumeB", "costB"],
    params: {
      priceA: { min: 30, max: 60, step: 10 },
      volumeA: { min: 1000, max: 2000, step: 500 },
      costA: { min: 15, max: 35, step: 5 },
      priceB: { min: 40, max: 80, step: 10 },
      volumeB: { min: 600, max: 1500, step: 300 },
      costB: { min: 20, max: 45, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "profitA = (priceA - costA) × volumeA; profitB = (priceB - costB) × volumeB; maxProfit = Math.max(profitA, profitB)",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-warehouse-roi",
    category: "ops",
    difficulty: "full",
    title: "Warehouse Automation ROI",
    stem_template: "LogiCo is evaluating warehouse automation to improve margins. The COO wants to see the business case. Upfront investment: ${upfront}k. Annual labor savings: ${savings}k. Annual maintenance costs: ${maintenance}k. Useful life: {years} years. What's the total net benefit over the investment period?",
    inputs: ["upfront", "savings", "maintenance", "years"],
    params: {
      upfront: { min: 200, max: 600, step: 100 },
      savings: { min: 80, max: 200, step: 40 },
      maintenance: { min: 20, max: 60, step: 20 },
      years: { min: 5, max: 10, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "netBenefit = ((savings - maintenance) × years) - upfront",
    time_limit_s: 70,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-marketing-channel-roi",
    category: "profitability",
    difficulty: "full",
    title: "Marketing Channel Returns",
    stem_template: "GrowthLabs is comparing two customer acquisition channels to allocate next quarter's budget. Channel A: ${costA}k spend, acquired {customersA} customers, LTV ${ltvA} each. Channel B: ${costB}k spend, acquired {customersB} customers, LTV ${ltvB} each. Which channel delivers better ROI percentage?",
    inputs: ["costA", "customersA", "ltvA", "costB", "customersB", "ltvB"],
    params: {
      costA: { min: 20, max: 80, step: 20 },
      customersA: { min: 100, max: 500, step: 100 },
      ltvA: { min: 200, max: 800, step: 200 },
      costB: { min: 30, max: 100, step: 20 },
      customersB: { min: 50, max: 300, step: 50 },
      ltvB: { min: 400, max: 1200, step: 200 }
    },
    decision: { type: "numeric" },
    truth_howto: "roiA = ((customersA × ltvA) - (costA × 1000)) / (costA × 1000) × 100; roiB = ((customersB × ltvB) - (costB × 1000)) / (costB × 1000) × 100; maxROI = Math.max(roiA, roiB)",
    time_limit_s: 90,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-product-mix",
    category: "profitability",
    difficulty: "full",
    title: "Product Portfolio Profit",
    stem_template: "SnackCo needs a profitability analysis across their two-product portfolio for the CFO's quarterly review. Product A: {unitsA} units sold at ${marginA} contribution margin per unit. Product B: {unitsB} units at ${marginB} margin per unit. Shared fixed costs: ${fixed}k. What's total profit in thousands?",
    inputs: ["unitsA", "marginA", "unitsB", "marginB", "fixed"],
    params: {
      unitsA: { min: 500, max: 2000, step: 500 },
      marginA: { min: 20, max: 60, step: 10 },
      unitsB: { min: 300, max: 1500, step: 300 },
      marginB: { min: 30, max: 80, step: 10 },
      fixed: { min: 50, max: 150, step: 25 }
    },
    decision: { type: "numeric" },
    truth_howto: "totalProfit = ((unitsA × marginA) + (unitsB × marginB)) / 1000 - fixed",
    time_limit_s: 70,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-customer-cohort",
    category: "market_sizing",
    difficulty: "full",
    title: "Cohort Retention Revenue",
    stem_template: "AppCo's product team is tracking the January customer cohort to understand retention economics. Cohort size: {customers} customers at ${monthly}/month subscription. First 6 months: {retentionEarly}% retention rate. Months 7-12: {retentionLate}% retention. What's the total Year 1 revenue from this cohort?",
    inputs: ["customers", "monthly", "retentionEarly", "retentionLate"],
    params: {
      customers: { min: 100, max: 500, step: 100 },
      monthly: { min: 30, max: 100, step: 20 },
      retentionEarly: { min: 80, max: 95, step: 5 },
      retentionLate: { min: 60, max: 85, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "earlyRevenue = customers × monthly × 6 × (retentionEarly/100); lateRevenue = customers × monthly × 6 × (retentionLate/100); totalRevenue = earlyRevenue + lateRevenue",
    time_limit_s: 85,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-capacity-expansion",
    category: "ops",
    difficulty: "full",
    title: "Manufacturing Capacity Decision",
    stem_template: "ManufactureCo is planning capacity expansion but wants to time it right. The VP Operations needs to know when they'll hit constraints. Current capacity: {currentCap} units/month at {utilizationPct}% utilization. Demand growth: {growthPct}% per month. In what month will you reach 100% capacity utilization?",
    inputs: ["currentCap", "utilizationPct", "growthPct"],
    params: {
      currentCap: { min: 5000, max: 20000, step: 5000 },
      utilizationPct: { min: 60, max: 85, step: 5 },
      growthPct: { min: 3, max: 8, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "currentDemand = currentCap × (utilizationPct/100); monthsTo100 = Math.log(currentCap / currentDemand) / Math.log(1 + growthPct/100)",
    time_limit_s: 90,
    max_points: 5,
    scoring: { tolerance_bands: [0.15, 0.25, 0.35, 0.45] }
  },

  {
    id: "fc-discount-volume-tradeoff",
    category: "pricing",
    difficulty: "full",
    title: "Volume Discount Impact",
    stem_template: "RetailCo's VP of Sales is proposing a promotional discount to drive volume growth. Current pricing: ${basePrice} per unit at {baseVolume} units sold. Proposed discount: {discountPct}%, expected to boost volume by {volumeBoost}%. Variable cost per unit: ${cost}. The CFO wants to know the profit impact. What's the change in profit?",
    inputs: ["basePrice", "baseVolume", "discountPct", "volumeBoost", "cost"],
    params: {
      basePrice: { min: 50, max: 150, step: 25 },
      baseVolume: { min: 1000, max: 5000, step: 1000 },
      discountPct: { min: 10, max: 25, step: 5 },
      volumeBoost: { min: 20, max: 50, step: 10 },
      cost: { min: 20, max: 80, step: 20 }
    },
    decision: { type: "numeric" },
    truth_howto: "baseProfit = (basePrice - cost) × baseVolume; newPrice = basePrice × (1 - discountPct/100); newVolume = baseVolume × (1 + volumeBoost/100); newProfit = (newPrice - cost) × newVolume; profitChange = newProfit - baseProfit",
    time_limit_s: 90,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-hiring-productivity",
    category: "ops",
    difficulty: "full",
    title: "Headcount ROI Analysis",
    stem_template: "TalentCo's CEO is evaluating a team expansion proposal. Current team: {currentTeam} people generating ${currentRevenue}k/month in revenue. Plan: hire {newHires} new employees at ${salary}k annual salary each. Projected revenue boost: {revBoost}%. What's the net annual financial impact?",
    inputs: ["currentTeam", "currentRevenue", "newHires", "salary", "revBoost"],
    params: {
      currentTeam: { min: 10, max: 50, step: 10 },
      currentRevenue: { min: 100, max: 500, step: 100 },
      newHires: { min: 2, max: 8, step: 2 },
      salary: { min: 60, max: 120, step: 20 },
      revBoost: { min: 15, max: 40, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "additionalRevenue = currentRevenue × 12 × (revBoost/100); additionalCost = newHires × salary; netImpact = additionalRevenue - additionalCost",
    time_limit_s: 80,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-market-penetration",
    category: "market_sizing",
    difficulty: "full",
    title: "Market Penetration Growth",
    stem_template: "MarketLeader's board wants a growth projection to set investor expectations. Total addressable market (TAM): ${tam}M. Year 1 market penetration: {year1Pct}%. Year 2 target penetration: {year2Pct}%. Average revenue per customer: ${arpc}. What will Year 2 revenue be in millions?",
    inputs: ["tam", "year1Pct", "year2Pct", "arpc"],
    params: {
      tam: { min: 100, max: 500, step: 100 },
      year1Pct: { min: 2, max: 8, step: 2 },
      year2Pct: { min: 5, max: 15, step: 5 },
      arpc: { min: 100, max: 500, step: 100 }
    },
    decision: { type: "numeric" },
    truth_howto: "year2Customers = (tam × 1000000 / arpc) × (year2Pct/100); year2Revenue = (year2Customers × arpc) / 1000000",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-store-cannibalization",
    category: "market_entry",
    difficulty: "full",
    title: "New Store Cannibalization",
    stem_template: "ShopCo is considering opening a second location but worries about cannibalization. Existing store revenue: ${existingRev}k/month. Projected new store revenue: ${newRev}k/month. However, market research shows {cannibalPct}% of new store sales would come from existing customers. What's the true net monthly revenue increase?",
    inputs: ["existingRev", "newRev", "cannibalPct"],
    params: {
      existingRev: { min: 100, max: 300, step: 50 },
      newRev: { min: 80, max: 250, step: 50 },
      cannibalPct: { min: 20, max: 50, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "cannibalized = newRev × (cannibalPct/100); netIncrease = newRev - cannibalized",
    time_limit_s: 65,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-freemium-conversion",
    category: "profitability",
    difficulty: "full",
    title: "Freemium Model Economics",
    stem_template: "FreemiumApp's CFO needs to justify the freemium model to the board. Current user base: {freeUsers} free users. Conversion rate to paid tier: {conversionPct}% at ${paid}/month subscription. Cost to serve each free user: ${freeCost}/month. What's the monthly net revenue from this model?",
    inputs: ["freeUsers", "conversionPct", "paid", "freeCost"],
    params: {
      freeUsers: { min: 5000, max: 20000, step: 5000 },
      conversionPct: { min: 2, max: 8, step: 2 },
      paid: { min: 20, max: 100, step: 20 },
      freeCost: { min: 1, max: 5, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "paidUsers = freeUsers × (conversionPct/100); revenue = paidUsers × paid; costs = freeUsers × freeCost; netRevenue = revenue - costs",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-supply-chain-savings",
    category: "ops",
    difficulty: "full",
    title: "Supplier Negotiation Impact",
    stem_template: "SupplyCo's procurement team has negotiated new supplier terms and needs to quantify the value. Annual purchases: ${annualSpend}M. Negotiated discount: {savingsPct}%. Implementation cost: ${impCost}k. What's the net first-year benefit in thousands?",
    inputs: ["annualSpend", "savingsPct", "impCost"],
    params: {
      annualSpend: { min: 5, max: 20, step: 5 },
      savingsPct: { min: 5, max: 15, step: 5 },
      impCost: { min: 50, max: 200, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "savings = annualSpend × 1000 × (savingsPct/100); netBenefit = savings - impCost",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-ab-test-results",
    category: "profitability",
    difficulty: "full",
    title: "A/B Test Revenue Impact",
    stem_template: "EcommerceCo's product team ran an A/B test on their checkout page and needs to decide which version to launch. Version A: {visitorsA} visitors, {conversionA}% conversion rate, ${aovA} average order value. Version B: {visitorsB} visitors, {conversionB}% conversion, ${aovB} average order value. Which version generates more revenue?",
    inputs: ["visitorsA", "conversionA", "aovA", "visitorsB", "conversionB", "aovB"],
    params: {
      visitorsA: { min: 1000, max: 5000, step: 1000 },
      conversionA: { min: 2, max: 6, step: 1 },
      aovA: { min: 50, max: 150, step: 25 },
      visitorsB: { min: 1000, max: 5000, step: 1000 },
      conversionB: { min: 3, max: 8, step: 1 },
      aovB: { min: 40, max: 120, step: 20 }
    },
    decision: { type: "numeric" },
    truth_howto: "revenueA = visitorsA × (conversionA/100) × aovA; revenueB = visitorsB × (conversionB/100) × aovB; maxRevenue = Math.max(revenueA, revenueB)",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-referral-program-roi",
    category: "profitability",
    difficulty: "full",
    title: "Referral Program Economics",
    stem_template: "ViralCo's marketing team is pitching a referral program to the CFO. Customer base: {customers} customers. Expected referral rate: {referralRate}%. Conversion rate for referrals: {conversionPct}%. Referral reward cost: ${reward} per referral. Customer LTV: ${ltv}. What's the net value of this program?",
    inputs: ["customers", "referralRate", "conversionPct", "reward", "ltv"],
    params: {
      customers: { min: 1000, max: 5000, step: 1000 },
      referralRate: { min: 10, max: 30, step: 5 },
      conversionPct: { min: 20, max: 50, step: 10 },
      reward: { min: 20, max: 100, step: 20 },
      ltv: { min: 200, max: 800, step: 200 }
    },
    decision: { type: "numeric" },
    truth_howto: "referrals = customers × (referralRate/100); newCustomers = referrals × (conversionPct/100); value = newCustomers × ltv; cost = referrals × reward; netValue = value - cost",
    time_limit_s: 85,
    max_points: 5,
    scoring: { tolerance_bands: [0.10, 0.20, 0.30, 0.40] }
  },

  {
    id: "fc-inventory-optimization",
    category: "ops",
    difficulty: "full",
    title: "Inventory Holding Costs",
    stem_template: "WarehouseCo's COO wants to optimize working capital by reducing inventory. Current average inventory: ${inventory}k. Holding cost: {holdingPct}% per year. Target inventory reduction: {reductionPct}%. What are the annual savings?",
    inputs: ["inventory", "holdingPct", "reductionPct"],
    params: {
      inventory: { min: 100, max: 500, step: 100 },
      holdingPct: { min: 15, max: 30, step: 5 },
      reductionPct: { min: 20, max: 40, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "savings = inventory × (holdingPct/100) × (reductionPct/100)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-upsell-impact",
    category: "profitability",
    difficulty: "full",
    title: "Upsell Revenue Potential",
    stem_template: "UpgradeCo's product team is launching a premium tier to drive revenue growth. Current customer base: {customers} customers at ${base}/month. New premium tier: ${premium}/month. Expected upgrade rate: {upsellPct}%. What's the monthly revenue increase?",
    inputs: ["customers", "base", "premium", "upsellPct"],
    params: {
      customers: { min: 1000, max: 5000, step: 1000 },
      base: { min: 20, max: 60, step: 10 },
      premium: { min: 50, max: 150, step: 25 },
      upsellPct: { min: 10, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "upgrades = customers × (upsellPct/100); increase = upgrades × (premium - base)",
    time_limit_s: 65,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== MCQ STRATEGY QUESTIONS (10 questions, 60-75 seconds) ==========

  {
    id: "mcq-market-entry-decision",
    category: "market_entry",
    difficulty: "full",
    title: "Market Entry Strategy",
    stem_template: "QuickBite, a food delivery startup, has hired you to advise on entering a new city. The CEO wants a clear recommendation. Market size: ${marketSize}M. Competition: {competitors} established players holding {competitorShare}% combined market share. Customer acquisition costs are high due to saturated digital channels. What's the best market entry strategy?",
    inputs: ["marketSize", "competitors", "competitorShare"],
    params: {
      marketSize: { min: 10, max: 50, step: 10 },
      competitors: { min: 2, max: 5, step: 1 },
      competitorShare: { min: 60, max: 85, step: 5 }
    },
    decision: {
      type: "mcq",
      options: [
        "Enter immediately with aggressive discounting to gain market share quickly",
        "Start with a niche segment (e.g., healthy food only) to build a beachhead",
        "Wait and enter when a competitor fails or market grows significantly",
        "Launch in suburbs first where competition is lower"
      ],
      points: [2, 4, 1, 3]
    },
    truth_howto: "correctIndex = 1",
    time_limit_s: 70,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-pricing-psychology",
    category: "pricing",
    difficulty: "full",
    title: "Pricing Strategy Choice",
    stem_template: "ArtisanBrew, a premium coffee brand, has engaged you for pricing advice. Current price: ${currentPrice}. Recent market research confirms customers strongly associate quality with price in this category. Competitive landscape: {competitorsPct}% of competitors price below ${compPrice}. Sales growing at {growthPct}% annually. Should you adjust pricing?",
    inputs: ["currentPrice", "compPrice", "competitorsPct", "growthPct"],
    params: {
      currentPrice: { min: 15, max: 25, step: 5 },
      compPrice: { min: 10, max: 18, step: 2 },
      competitorsPct: { min: 60, max: 85, step: 5 },
      growthPct: { min: 10, max: 30, step: 5 }
    },
    decision: {
      type: "mcq",
      options: [
        "Reduce price to match competitors and increase market share",
        "Maintain current premium pricing to reinforce quality positioning",
        "Introduce a lower-priced 'value' line to capture price-sensitive customers",
        "Increase price by 10-15% to further differentiate and improve margins"
      ],
      points: [0, 4, 3, 2]
    },
    truth_howto: "correctIndex = 1",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-profitability-lever",
    category: "profitability",
    difficulty: "full",
    title: "Profit Improvement Priority",
    stem_template: "ValueMart, a retail chain, has called you in for a profitability turnaround. The CFO shows you: profit margin dropped from {oldMargin}% to {newMargin}%. Your analysis reveals: (1) Revenue down {revDown}% due to traffic decline, (2) Costs up {costUp}% from supplier price increases, (3) Average transaction value down {ticketDown}%. What should be the top priority?",
    inputs: ["oldMargin", "newMargin", "revDown", "costUp", "ticketDown"],
    params: {
      oldMargin: { min: 8, max: 15, step: 2 },
      newMargin: { min: 3, max: 8, step: 1 },
      revDown: { min: 10, max: 25, step: 5 },
      costUp: { min: 8, max: 18, step: 5 },
      ticketDown: { min: 5, max: 15, step: 5 }
    },
    decision: {
      type: "mcq",
      options: [
        "Focus on driving store traffic through marketing and promotions",
        "Renegotiate supplier contracts to reduce cost increases",
        "Increase average transaction size through upselling and bundling",
        "Cut operating expenses like staff and store hours"
      ],
      points: [4, 3, 2, 1]
    },
    truth_howto: "correctIndex = 0",
    time_limit_s: 70,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-customer-segment",
    category: "market_sizing",
    difficulty: "full",
    title: "Target Segment Selection",
    stem_template: "SalesForce360, a SaaS product startup, needs go-to-market guidance. Three potential segments: SMB ({smbSize}k companies, ${smbPrice}/month willingness to pay), Mid-market ({midSize}k companies, ${midPrice}/month), Enterprise ({entSize}k companies, ${entPrice}/month). Sales team is lean with limited resources. Which segment should you prioritize?",
    inputs: ["smbSize", "smbPrice", "midSize", "midPrice", "entSize", "entPrice"],
    params: {
      smbSize: { min: 500, max: 2000, step: 500 },
      smbPrice: { min: 50, max: 200, step: 50 },
      midSize: { min: 50, max: 200, step: 50 },
      midPrice: { min: 500, max: 2000, step: 500 },
      entSize: { min: 5, max: 20, step: 5 },
      entPrice: { min: 5000, max: 20000, step: 5000 }
    },
    decision: {
      type: "mcq",
      options: [
        "SMB - largest market size and fastest sales cycle",
        "Mid-market - balance of deal size and market size",
        "Enterprise - highest deal value and lowest churn",
        "Build self-serve for SMB, sales team for Enterprise"
      ],
      points: [2, 4, 3, 3]
    },
    truth_howto: "correctIndex = 1",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-capacity-constraint",
    category: "ops",
    difficulty: "full",
    title: "Capacity Bottleneck Solution",
    stem_template: "IndustrialCo's VP of Operations faces a capacity crunch. Current plant running at {utilizationPct}% capacity utilization. Demand growing {demandGrowth}%/quarter. Lead time to add new capacity: {leadTime} months. Investment required: ${capexCost}M. Lost sales from stockouts: ${lostSaleCost}k per month. What should you recommend?",
    inputs: ["utilizationPct", "demandGrowth", "leadTime", "capexCost", "lostSaleCost"],
    params: {
      utilizationPct: { min: 85, max: 95, step: 5 },
      demandGrowth: { min: 5, max: 15, step: 5 },
      leadTime: { min: 6, max: 12, step: 3 },
      capexCost: { min: 2, max: 10, step: 2 },
      lostSaleCost: { min: 50, max: 200, step: 50 }
    },
    decision: {
      type: "mcq",
      options: [
        "Start capacity expansion immediately before hitting 100%",
        "Optimize current operations to squeeze out 10-15% more capacity",
        "Raise prices to slow demand growth and improve margins",
        "Outsource overflow production to contract manufacturers"
      ],
      points: [4, 3, 2, 3]
    },
    truth_howto: "correctIndex = 0",
    time_limit_s: 70,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-product-launch",
    category: "market_entry",
    difficulty: "full",
    title: "New Product Launch Strategy",
    stem_template: "InnovateTech is ready to launch a new product and the CEO needs your strategic recommendation. Development cost: ${devCost}k (already sunk). Marketing budget: ${marketingBudget}k. Early testing results: {npsScore} NPS score, {churnRate}% monthly churn rate. Intelligence shows a competitor launching similar product in {competitorMonths} months. What's the best move?",
    inputs: ["devCost", "marketingBudget", "npsScore", "churnRate", "competitorMonths"],
    params: {
      devCost: { min: 100, max: 500, step: 100 },
      marketingBudget: { min: 50, max: 200, step: 50 },
      npsScore: { min: 20, max: 60, step: 10 },
      churnRate: { min: 8, max: 20, step: 3 },
      competitorMonths: { min: 3, max: 9, step: 3 }
    },
    decision: {
      type: "mcq",
      options: [
        "Launch immediately to beat competitor and gain first-mover advantage",
        "Delay launch 2-3 months to improve product and reduce churn",
        "Launch in limited beta to top customers only, gather feedback",
        "Cancel launch and focus resources on existing products"
      ],
      points: [2, 3, 4, 0]
    },
    truth_howto: "correctIndex = 2",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-sales-strategy",
    category: "profitability",
    difficulty: "full",
    title: "Sales Team Allocation",
    stem_template: "DualProduct Inc's VP of Sales needs to optimize team allocation. Current team: {salesReps} sales reps. Product A metrics: ${productAValue}k average deal size, {productAWinRate}% win rate, {productACycle}-month sales cycle. Product B metrics: ${productBValue}k deal size, {productBWinRate}% win rate, {productBCycle}-month cycle. How should you allocate the sales team?",
    inputs: ["salesReps", "productAValue", "productAWinRate", "productACycle", "productBValue", "productBWinRate", "productBCycle"],
    params: {
      salesReps: { min: 10, max: 30, step: 10 },
      productAValue: { min: 50, max: 200, step: 50 },
      productAWinRate: { min: 20, max: 40, step: 10 },
      productACycle: { min: 3, max: 6, step: 1 },
      productBValue: { min: 100, max: 400, step: 100 },
      productBWinRate: { min: 10, max: 25, step: 5 },
      productBCycle: { min: 6, max: 12, step: 3 }
    },
    decision: {
      type: "mcq",
      options: [
        "All reps sell both products to maximize flexibility",
        "Specialize: assign reps to either Product A or Product B",
        "80% on Product A (higher win rate), 20% on Product B",
        "80% on Product B (higher value), 20% on Product A"
      ],
      points: [2, 4, 3, 2]
    },
    truth_howto: "correctIndex = 1",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-churn-reduction",
    category: "profitability",
    difficulty: "full",
    title: "Customer Retention Investment",
    stem_template: "SubscribeCo's CFO is concerned about churn and wants to invest in retention. Current base: {customers} customers at ${mrr}/month. Churn rate: {churnPct}% monthly. Budget: ${budget}k to invest. Three options: (A) Customer success team (reduce churn to {optionAChurn}%), (B) Product improvements (reduce to {optionBChurn}%), (C) Loyalty program (reduce to {optionCChurn}%). Which has the best 12-month ROI?",
    inputs: ["customers", "mrr", "churnPct", "budget", "optionAChurn", "optionBChurn", "optionCChurn"],
    params: {
      customers: { min: 500, max: 2000, step: 500 },
      mrr: { min: 50, max: 200, step: 50 },
      churnPct: { min: 5, max: 12, step: 2 },
      budget: { min: 50, max: 200, step: 50 },
      optionAChurn: { min: 2, max: 5, step: 1 },
      optionBChurn: { min: 3, max: 6, step: 1 },
      optionCChurn: { min: 4, max: 7, step: 1 }
    },
    decision: {
      type: "mcq",
      options: [
        "Customer success team - direct customer relationships and proactive support",
        "Product improvements - fixes root cause of churn long-term",
        "Loyalty program - rewards and incentives for staying",
        "Split budget across all three approaches"
      ],
      points: [4, 3, 2, 2]
    },
    truth_howto: "correctIndex = 0",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-competitive-response",
    category: "pricing",
    difficulty: "full",
    title: "Competitor Price Cut Response",
    stem_template: "BrandLeader is facing an aggressive competitive move. You're the market leader with {marketShare}% share at ${yourPrice} price point. Competitor #2 ({compShare}% share) just slashed price from ${compOldPrice} to ${compNewPrice}. Your advantages: {brandLoyalty}% loyal customer base and {costAdvantage}% cost advantage. The CEO needs an immediate recommendation. How should you respond?",
    inputs: ["marketShare", "yourPrice", "compShare", "compOldPrice", "compNewPrice", "brandLoyalty", "costAdvantage"],
    params: {
      marketShare: { min: 30, max: 50, step: 10 },
      yourPrice: { min: 100, max: 200, step: 25 },
      compShare: { min: 15, max: 30, step: 5 },
      compOldPrice: { min: 90, max: 180, step: 30 },
      compNewPrice: { min: 60, max: 120, step: 20 },
      brandLoyalty: { min: 40, max: 70, step: 10 },
      costAdvantage: { min: 10, max: 25, step: 5 }
    },
    decision: {
      type: "mcq",
      options: [
        "Match their price immediately to protect market share",
        "Maintain premium pricing, emphasize quality and brand value",
        "Introduce a 'fighter brand' at their price point",
        "Offer limited-time promotions only to at-risk customers"
      ],
      points: [2, 3, 3, 4]
    },
    truth_howto: "correctIndex = 3",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  },

  {
    id: "mcq-expansion-priority",
    category: "market_entry",
    difficulty: "full",
    title: "Growth Investment Priority",
    stem_template: "GrowthCorp's board has allocated ${budget}M for expansion and needs your recommendation on where to invest. Three options: (A) New geographic market (${geoTAM}M TAM, {geoRisk}% execution risk), (B) New customer segment (${segmentTAM}M TAM, {segmentRisk}% risk), (C) New product line (${productTAM}M TAM, {productRisk}% risk). Core business currently growing {coreGrowth}%/year. What should you prioritize?",
    inputs: ["budget", "geoTAM", "geoRisk", "segmentTAM", "segmentRisk", "productTAM", "productRisk", "coreGrowth"],
    params: {
      budget: { min: 5, max: 20, step: 5 },
      geoTAM: { min: 50, max: 200, step: 50 },
      geoRisk: { min: 30, max: 60, step: 10 },
      segmentTAM: { min: 30, max: 150, step: 30 },
      segmentRisk: { min: 20, max: 50, step: 10 },
      productTAM: { min: 100, max: 300, step: 50 },
      productRisk: { min: 40, max: 70, step: 10 },
      coreGrowth: { min: 15, max: 35, step: 10 }
    },
    decision: {
      type: "mcq",
      options: [
        "New geography - expand proven model to new markets",
        "New customer segment - leverage existing market presence",
        "New product line - biggest TAM and diversification",
        "Reinvest in core business to accelerate existing growth"
      ],
      points: [3, 4, 2, 3]
    },
    truth_howto: "correctIndex = 1",
    time_limit_s: 75,
    max_points: 4,
    scoring: { tolerance_bands: [] }
  }
];
