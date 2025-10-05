import type { CaseTemplate, PromptInstance } from "../types";
import { seededRand, randInt, randFloat, randChoice } from "./random";
import {
  computeMarketSizing,
  computeProfitRetail,
  computePricingElasticity,
  computePEscreen,
  computePharmacyKiosk,
  computeWaterParkNPV
} from "./compute";

/**
 * Generate a 5-word hint based on the case template
 */
export function generateHint(template: CaseTemplate): string {
  const howto = template.truth_howto;

  // NEW Quick Math hints (2-step calculations)
  if (howto.includes("customers × (buyPct/100) × price")) return "Customers times buy rate times price";
  if (howto.includes("((price - cost - overhead) / price) × 100")) return "Calculate margin percentage from components";
  if (howto.includes("((marketing + sales) × 1000 / customers)")) return "Total costs divided by customers";
  if (howto.includes("((selling - buying) / buying) × 100")) return "Price difference divided by original";
  if (howto.includes("(inventory / (sales / 365))")) return "Inventory divided by daily sales";
  if (howto.includes("(fee + (miles × mileRate))")) return "Base fee plus mileage cost";
  if (howto.includes("ads × ctr × conversion")) return "Ads times two conversion rates";
  if (howto.includes("subs × (1 - churn) × monthly")) return "Subscribers times retention times price";
  if (howto.includes("((price - cost) × sales) - fixed")) return "Unit profit times volume minus fixed";
  if (howto.includes("(rent + salary) / revenue")) return "Fixed costs divided by revenue";
  if (howto.includes("sales × (paymentPct/100) × feeRate")) return "Sales times payment percent times rate";
  if (howto.includes("licenses × hours × rate")) return "Licenses times hours times rate";
  if (howto.includes("investment × (1 + (annual/100) ** years)")) return "Compound growth over multiple years";
  if (howto.includes("investment × ((1 + annual/100) ** years)")) return "Compound growth over multiple years";
  if (howto.includes("((traffic - goal) / goal) × 100")) return "Difference divided by target percentage";
  if (howto.includes("(revenue × marginPct) - salaries")) return "Gross profit minus fixed costs";
  if (howto.includes("(sqft × psf / (units × pricePerUnit))")) return "Total rent divided by revenue";
  if (howto.includes("((orders - lastOrders) / lastOrders) × 100")) return "Growth divided by baseline percentage";
  if (howto.includes("(hours × wage) + bonus")) return "Hourly pay plus bonus amount";
  if (howto.includes("units × cost × (1 + duttyPct/100)")) return "Base cost plus import duty";
  if (howto.includes("units × cost × (1 + dutyPct/100)")) return "Base cost plus import duty";

  // NEW Full Case hints (multi-step business problems)
  if (howto.includes("setup / ((revenue - cost) × days)")) return "Startup cost divided by monthly profit";
  if (howto.includes("(fixed / ((price - variable) × capacity))")) return "Fixed cost divided by contribution margin";
  if (howto.includes("final = initial × (1 - (churnRate/100)) ** 12")) return "Apply monthly churn over year";
  if (howto.includes("channel1ROI = (channel1Rev - channel1Cost) / channel1Cost")) return "Compare profit to cost ratios";
  if (howto.includes("yearly = rent × 12")) return "Convert monthly to annual costs";
  if (howto.includes("(current × (rate/100)) - planned")) return "Expected minus planned headcount difference";
  if (howto.includes("totalCost = product + shipping + handling")) return "Sum all cost components first";
  if (howto.includes("margin = ((price - cogs - labor) / price) × 100")) return "Revenue minus costs divided price";
  if (howto.includes("(totalSeats × occupancy × price)")) return "Capacity times utilization times price";
  if (howto.includes("(installs × free + installs × paid × price)")) return "Free plus paid user revenue";
  if (howto.includes("((newPrice - cost) × newUnits) - ((price - cost) × units)")) return "Compare profit before and after";
  if (howto.includes("avgOrder × freq × (retentionRate/100)")) return "Order value times frequency times retention";
  if (howto.includes("((direct × directRate) + (marketplace × marketRate))")) return "Sum revenue from both channels";
  if (howto.includes("(revenue × (targetMargin/100)) - (cogs + overhead)")) return "Target profit minus actual costs";
  if (howto.includes("((current - projected) / current) × 100")) return "Reduction divided by current percentage";
  if (howto.includes("(seats - (staff × seatsPerStaff))")) return "Total capacity minus required coverage";
  if (howto.includes("(employees × bonus) + development")) return "Total bonus plus development budget";
  if (howto.includes("(miles / mpg × fuel)")) return "Distance divided by efficiency times cost";
  if (howto.includes("contract × years × (1 - (discount/100))")) return "Annual value times duration discounted";
  if (howto.includes("(revenue - (cogs + marketing + salaries))")) return "Revenue minus all expense categories";

  // NEW MCQ Strategy hints (conceptual guidance)
  if (template.decision.type === "mcq") {
    if (template.category === "market_entry") return "Focus on risk and differentiation";
    if (template.category === "pricing_strategy") return "Consider customer psychology and perception";
    if (template.category === "profitability") return "Identify highest leverage profit drivers";
    if (template.category === "competitive_response") return "Anticipate competitor reactions and sustainability";
    if (template.category === "growth_strategy") return "Balance growth speed with efficiency";
    if (template.category === "customer_retention") return "Prioritize retention over new acquisition";
    if (template.category === "product_launch") return "Validate market need before building";
    if (template.category === "cost_reduction") return "Cut costs without harming revenue";
    if (template.category === "expansion") return "Assess market attractiveness and capability";
    if (template.category === "partnership") return "Evaluate strategic fit and value";
    return "Think strategically about tradeoffs";
  }

  // Old Quick math hints (legacy support)
  if (howto.includes("cups × price")) return "Multiply cups by unit price";
  if (howto.includes("revenue - costs")) return "Subtract total costs from revenue";
  if (howto.includes("original × (1 - discount/100)")) return "Apply discount to original price";
  if (howto.includes("totalCost / units")) return "Divide total by unit count";
  if (howto.includes("price - cost") && !howto.includes("new_price")) return "Subtract cost from selling price";
  if (howto.includes("fixed / profit")) return "Divide fixed costs by margin";
  if (howto.includes("rent + utilities + salaries")) return "Add all monthly expense items";
  if (howto.includes("monthly × 12")) return "Multiply monthly by twelve months";
  if (howto.includes("current × (1 + increase/100)")) return "Apply percentage increase to price";
  if (howto.includes("hours × wage")) return "Multiply hours by hourly rate";
  if (howto.includes("subtotal × (1 + taxRate/100)")) return "Add tax to purchase subtotal";
  if (howto.includes("bill × (tipPct/100)")) return "Calculate percentage of total bill";
  if (howto.includes("total / people")) return "Divide total by number people";
  if (howto.includes("cost × (1 + markup/100)")) return "Apply markup to unit cost";
  if (howto.includes("totalSales / transactions")) return "Divide sales by transaction count";
  if (howto.includes("units × unitCost")) return "Multiply units by unit cost";
  if (howto.includes("thisYear - lastYear")) return "Subtract last year from current";
  if (howto.includes("(buyers / visitors) × 100")) return "Divide buyers by total visitors";
  if (howto.includes("perHour × hours")) return "Multiply per hour by hours";
  if (howto.includes("rent / sqft")) return "Divide rent by square footage";

  // Market sizing hints (legacy support)
  if (howto.includes("population × 1000 × (agePct/100) × (enrollPct/100)")) return "Population times two percentage rates";
  if (howto.includes("students × 1000 × freq")) return "Students multiplied by purchase frequency";
  if (howto.includes("population × 1e6 × (adultPct/100) × (memberPct/100)")) return "Population times two percentage rates";
  if (howto.includes("population × 1000 × (attendPct/100) × freq") && template.id.includes("concert")) return "Population times attendance times frequency";
  if (howto.includes("students × 1000 × books")) return "Students multiplied by items each";
  if (howto.includes("(population × 1000 / peoplePerHH) × (subPct/100)")) return "Households times subscription penetration rate";
  if (howto.includes("population × 1000 × (drinkerPct/100) × spend")) return "Population times percentage times spend";
  if (howto.includes("(population × 1e6 × (ownPct/100)) / years")) return "Total owners divided by years";
  if (howto.includes("population × 1000 × (dineOutPct/100) × freq")) return "Population times percentage times frequency";
  if (howto.includes("households × 1000 × (dogPct/100) × spend")) return "Households times percentage times spend";
  if (howto.includes("population × 1000 × freq") && !howto.includes("attendPct")) return "Population multiplied by annual frequency";
  if (howto.includes("population × 1000 × (adultPct/100) × (userPct/100) × freq")) return "Population times three percentage factors";
  if (howto.includes("members × 1000 × (attendPct/100) × freq")) return "Members times attendance times frequency";
  if (howto.includes("population × 1000 × (goerPct/100) × freq")) return "Population times percentage times frequency";
  if (howto.includes("households × 1000 × (interestPct/100) × (subPct/100)")) return "Households times two percentage rates";

  // Old Full case hints (legacy support)
  if (howto.includes("setupCost / monthlyProfit")) return "Divide setup by monthly profit";
  if (howto.includes("Math.max(price1 × units1, price2 × units2)")) return "Compare two revenue calculation results";
  if (howto.includes("currentCost × (reductionPct/100) × 12")) return "Annual savings from cost reduction";
  if (howto.includes("(currentUnits / maxUnits) × 100")) return "Current divided by maximum capacity";
  if (howto.includes("revenue / adSpend")) return "Return equals revenue over spend";

  // Default fallback
  return "Break down into smaller steps";
}

/**
 * Generate a case instance from a template using seeded randomness
 */
export function generateCase(template: CaseTemplate, seed: number): PromptInstance {
  const rng = seededRand(seed);
  const numbers: Record<string, number | string> = {};

  // Fill in all parameters with random values
  for (const [key, paramDef] of Object.entries(template.params)) {
    if (paramDef.choices) {
      numbers[key] = randChoice(rng, paramDef.choices);
    } else if (paramDef.min !== undefined && paramDef.max !== undefined) {
      const step = paramDef.step || 1;
      // Determine if this should be a float or int based on step size
      if (step < 1) {
        numbers[key] = randFloat(rng, paramDef.min, paramDef.max, 2);
      } else {
        numbers[key] = randInt(rng, paramDef.min, paramDef.max, step);
      }
    }
  }

  // Fill the stem template
  let filledStem = template.stem_template;
  for (const [key, value] of Object.entries(numbers)) {
    const placeholder = `{${key}}`;
    filledStem = filledStem.replace(new RegExp(placeholder, 'g'), String(value));
  }

  // For display purposes, format percentage parameters
  const displayNumbers: Record<string, number | string> = {};
  for (const [key, value] of Object.entries(numbers)) {
    // Convert percentage parameters for display
    if (key.includes('Pct') || key.includes('Pen') || key.includes('Rate')) {
      displayNumbers[key] = value;
    } else if (key.includes('Chg') && key.includes('Pct')) {
      displayNumbers[key] = value;
    } else if (key.includes('Chg') && key.includes('Pp')) {
      displayNumbers[key] = value;
    } else {
      displayNumbers[key] = value;
    }
  }

  // Compute the truth based on case type
  let truth;

  try {
    // Handle new simple math and market sizing questions using truth_howto
    if (template.truth_howto && template.decision.type === "numeric") {
      // Create a context with all numbers and Math functions
      const context: Record<string, number> = { ...numbers as Record<string, number> };

      // Parse and compute based on truth_howto formula
      const formula = template.truth_howto;

      // Simple formula evaluation for common patterns
      let result: number;

      // Revenue = cups × price
      if (formula.includes("cups × price") || formula.includes("cups * price")) {
        result = (context.cups as number) * (context.price as number);
      }
      // Profit = revenue - costs
      else if (formula.includes("revenue - costs")) {
        result = (context.revenue as number) - (context.costs as number);
      }
      // Final = original × (1 - discount/100)
      else if (formula.includes("original × (1 - discount/100)")) {
        result = (context.original as number) * (1 - (context.discount as number) / 100);
      }
      // Cost per unit = totalCost / units
      else if (formula.includes("totalCost / units")) {
        result = (context.totalCost as number) / (context.units as number);
      }
      // Profit = price - cost
      else if (formula.includes("price - cost") && !formula.includes("new_price")) {
        result = (context.price as number) - (context.cost as number);
      }
      // Units = fixed / profit
      else if (formula.includes("fixed / profit")) {
        result = (context.fixed as number) / (context.profit as number);
      }
      // Total = rent + utilities + salaries
      else if (formula.includes("rent + utilities + salaries")) {
        result = (context.rent as number) + (context.utilities as number) + (context.salaries as number);
      }
      // Annual = monthly × 12
      else if (formula.includes("monthly × 12")) {
        result = (context.monthly as number) * 12;
      }
      // New price = current × (1 + increase/100)
      else if (formula.includes("current × (1 + increase/100)")) {
        result = (context.current as number) * (1 + (context.increase as number) / 100);
      }
      // Earnings = hours × wage
      else if (formula.includes("hours × wage")) {
        result = (context.hours as number) * (context.wage as number);
      }
      // Tax total
      else if (formula.includes("subtotal × (1 + taxRate/100)")) {
        result = (context.subtotal as number) * (1 + (context.taxRate as number) / 100);
      }
      // Tip
      else if (formula.includes("bill × (tipPct/100)")) {
        result = (context.bill as number) * ((context.tipPct as number) / 100);
      }
      // Split bill
      else if (formula.includes("total / people")) {
        result = (context.total as number) / (context.people as number);
      }
      // Markup
      else if (formula.includes("cost × (1 + markup/100)")) {
        result = (context.cost as number) * (1 + (context.markup as number) / 100);
      }
      // Average sale
      else if (formula.includes("totalSales / transactions")) {
        result = (context.totalSales as number) / (context.transactions as number);
      }
      // Inventory value
      else if (formula.includes("units × unitCost")) {
        result = (context.units as number) * (context.unitCost as number);
      }
      // Growth
      else if (formula.includes("thisYear - lastYear")) {
        result = (context.thisYear as number) - (context.lastYear as number);
      }
      // Conversion rate
      else if (formula.includes("(buyers / visitors) × 100")) {
        result = ((context.buyers as number) / (context.visitors as number)) * 100;
      }
      // Production capacity
      else if (formula.includes("perHour × hours")) {
        result = (context.perHour as number) * (context.hours as number);
      }
      // Rent per sqft
      else if (formula.includes("rent / sqft")) {
        result = (context.rent as number) / (context.sqft as number);
      }

      // NEW Quick Math formulas (match exact patterns from database)
      // QM 1: Coffee revenue
      else if (formula.includes("revenue = customers × (buyPct/100) × price")) {
        result = (context.customers as number) * ((context.buyPct as number) / 100) * (context.price as number);
      }
      // QM 2: Profit margin
      else if (formula.includes("margin = ((price - cost - overhead) / price) × 100")) {
        result = (((context.price as number) - (context.cost as number) - (context.overhead as number)) / (context.price as number)) * 100;
      }
      // QM 3: Growth rate
      else if (formula.includes("growthPct = ((thisYear - lastYear) / lastYear) × 100")) {
        result = (((context.thisYear as number) - (context.lastYear as number)) / (context.lastYear as number)) * 100;
      }
      // QM 4: Average price
      else if (formula.includes("avgPrice = (item1Units × item1Price + item2Units × item2Price) / (item1Units + item2Units)")) {
        result = ((context.item1Units as number) * (context.item1Price as number) + (context.item2Units as number) * (context.item2Price as number)) / ((context.item1Units as number) + (context.item2Units as number));
      }
      // QM 5: CAC
      else if (formula.includes("cac = (marketing + sales) × 1000 / customers")) {
        result = ((context.marketing as number) + (context.sales as number)) * 1000 / (context.customers as number);
      }
      // QM 6: Lost revenue from churn
      else if (formula.includes("lostRevenue = customers × monthly × (churnPct/100)")) {
        result = (context.customers as number) * (context.monthly as number) * ((context.churnPct as number) / 100);
      }
      // QM 7: Days on hand
      else if (formula.includes("daysOnHand = (inventory / cogs) × 365")) {
        result = ((context.inventory as number) / (context.cogs as number)) * 365;
      }
      // QM 8: New revenue
      else if (formula.includes("newRevenue = newPrice × newVolume")) {
        result = (context.newPrice as number) * (context.newVolume as number);
      }
      // QM 9: Total cost
      else if (formula.includes("totalCost = fixed + (variable × units) / 1000")) {
        result = (context.fixed as number) + ((context.variable as number) * (context.units as number)) / 1000;
      }
      // QM 10: Net profit
      else if (formula.includes("netProfit = (monthly × months) - upfront")) {
        result = ((context.monthly as number) * (context.months as number)) - (context.upfront as number);
      }
      // QM 11: Contribution margin
      else if (formula.includes("contribution = price - materials - labor")) {
        result = (context.price as number) - (context.materials as number) - (context.labor as number);
      }
      // QM 12: Conversion funnel
      else if (formula.includes("customers = visitors × (leadPct/100) × (customerPct/100)")) {
        result = (context.visitors as number) * ((context.leadPct as number) / 100) * ((context.customerPct as number) / 100);
      }
      // QM 13: Market share
      else if (formula.includes("marketShare = (revenue / market) × 100")) {
        result = ((context.revenue as number) / (context.market as number)) * 100;
      }
      // QM 14: Revenue per employee
      else if (formula.includes("revenuePerEmp = (revenue × 1000) / employees")) {
        result = ((context.revenue as number) * 1000) / (context.employees as number);
      }
      // QM 15: Break even units
      else if (formula.includes("breakEvenUnits = (fixed × 1000) / (price - variable)")) {
        result = ((context.fixed as number) * 1000) / ((context.price as number) - (context.variable as number));
      }
      // QM 16: Lost revenue from discount
      else if (formula.includes("lostRevenue = original × volume × (discount/100)")) {
        result = (context.original as number) * (context.volume as number) * ((context.discount as number) / 100);
      }
      // QM 17: Utilization rate
      else if (formula.includes("utilization = (currentUnits / maxUnits) × 100")) {
        result = ((context.currentUnits as number) / (context.maxUnits as number)) * 100;
      }
      // QM 18: Minimum price
      else if (formula.includes("minPrice = variable + (fixed × 1000 / units)")) {
        result = (context.variable as number) + ((context.fixed as number) * 1000 / (context.units as number));
      }
      // QM 19: Scaled profit
      else if (formula.includes("newProfit = oldRev × (1 + revGrowth/100) × (1 - varPct/100) - fixed")) {
        result = (context.oldRev as number) * (1 + (context.revGrowth as number) / 100) * (1 - (context.varPct as number) / 100) - (context.fixed as number);
      }
      // QM 20: NPS score
      else if (formula.includes("nps = ((promoters - detractors) / total) × 100")) {
        result = (((context.promoters as number) - (context.detractors as number)) / (context.total as number)) * 100;
      }

      // NEW Full Case formulas (match exact patterns from database)
      // FC 1: Food truck breakeven
      else if (formula.includes("monthsToBreakEven = (startup × 1000) / ((dailyRev - dailyCost) × daysPerMonth)")) {
        result = ((context.startup as number) * 1000) / (((context.dailyRev as number) - (context.dailyCost as number)) * (context.daysPerMonth as number));
      }
      // FC 2: Customer LTV
      else if (formula.includes("ltv = (monthly - serveCost) × months")) {
        result = ((context.monthly as number) - (context.serveCost as number)) * (context.months as number);
      }
      // FC 3: TAM calculation
      else if (formula.includes("tam = (population × 1000 × (targetPct/100) × (purchasePct/100) × avgPurchase) / 1000000")) {
        result = ((context.population as number) * 1000 * ((context.targetPct as number) / 100) * ((context.purchasePct as number) / 100) * (context.avgPurchase as number)) / 1000000;
      }
      // FC 4: Subscription churn
      else if (formula.includes("month12Subs = startingSubs + (newSubs × 12) - (startingSubs × (churnPct/100) × 12); month12Rev = month12Subs × monthly")) {
        const month12Subs = (context.startingSubs as number) + ((context.newSubs as number) * 12) - ((context.startingSubs as number) * ((context.churnPct as number) / 100) * 12);
        result = month12Subs * (context.monthly as number);
      }
      // FC 5: Product profitability
      else if (formula.includes("profitA = (priceA - costA) × volumeA; profitB = (priceB - costB) × volumeB; maxProfit = Math.max(profitA, profitB)")) {
        const profitA = ((context.priceA as number) - (context.costA as number)) * (context.volumeA as number);
        const profitB = ((context.priceB as number) - (context.costB as number)) * (context.volumeB as number);
        result = Math.max(profitA, profitB);
      }
      // FC 6: Cost reduction NPV
      else if (formula.includes("netBenefit = ((savings - maintenance) × years) - upfront")) {
        result = (((context.savings as number) - (context.maintenance as number)) * (context.years as number)) - (context.upfront as number);
      }
      // FC 7: Marketing channel ROI
      else if (formula.includes("roiA = ((customersA × ltvA) - (costA × 1000)) / (costA × 1000) × 100; roiB = ((customersB × ltvB) - (costB × 1000)) / (costB × 1000) × 100; maxROI = Math.max(roiA, roiB)")) {
        const roiA = (((context.customersA as number) * (context.ltvA as number)) - ((context.costA as number) * 1000)) / ((context.costA as number) * 1000) * 100;
        const roiB = (((context.customersB as number) * (context.ltvB as number)) - ((context.costB as number) * 1000)) / ((context.costB as number) * 1000) * 100;
        result = Math.max(roiA, roiB);
      }
      // FC 8: Product mix profit
      else if (formula.includes("totalProfit = ((unitsA × marginA) + (unitsB × marginB)) / 1000 - fixed")) {
        result = (((context.unitsA as number) * (context.marginA as number)) + ((context.unitsB as number) * (context.marginB as number))) / 1000 - (context.fixed as number);
      }
      // FC 9: Cohort retention
      else if (formula.includes("earlyRevenue = customers × monthly × 6 × (retentionEarly/100); lateRevenue = customers × monthly × 6 × (retentionLate/100); totalRevenue = earlyRevenue + lateRevenue")) {
        const earlyRevenue = (context.customers as number) * (context.monthly as number) * 6 * ((context.retentionEarly as number) / 100);
        const lateRevenue = (context.customers as number) * (context.monthly as number) * 6 * ((context.retentionLate as number) / 100);
        result = earlyRevenue + lateRevenue;
      }
      // FC 10: Capacity planning
      else if (formula.includes("currentDemand = currentCap × (utilizationPct/100); monthsTo100 = Math.log(currentCap / currentDemand) / Math.log(1 + growthPct/100)")) {
        const currentDemand = (context.currentCap as number) * ((context.utilizationPct as number) / 100);
        result = Math.log((context.currentCap as number) / currentDemand) / Math.log(1 + (context.growthPct as number) / 100);
      }
      // FC 11: Pricing experiment
      else if (formula.includes("baseProfit = (basePrice - cost) × baseVolume; newPrice = basePrice × (1 - discountPct/100); newVolume = baseVolume × (1 + volumeBoost/100); newProfit = (newPrice - cost) × newVolume; profitChange = newProfit - baseProfit")) {
        const baseProfit = ((context.basePrice as number) - (context.cost as number)) * (context.baseVolume as number);
        const newPrice = (context.basePrice as number) * (1 - (context.discountPct as number) / 100);
        const newVolume = (context.baseVolume as number) * (1 + (context.volumeBoost as number) / 100);
        const newProfit = (newPrice - (context.cost as number)) * newVolume;
        result = newProfit - baseProfit;
      }
      // FC 12: Sales headcount
      else if (formula.includes("additionalRevenue = currentRevenue × 12 × (revBoost/100); additionalCost = newHires × salary; netImpact = additionalRevenue - additionalCost")) {
        const additionalRevenue = (context.currentRevenue as number) * 12 * ((context.revBoost as number) / 100);
        const additionalCost = (context.newHires as number) * (context.salary as number);
        result = additionalRevenue - additionalCost;
      }
      // FC 13: Market penetration
      else if (formula.includes("year2Customers = (tam × 1000000 / arpc) × (year2Pct/100); year2Revenue = (year2Customers × arpc) / 1000000")) {
        const year2Customers = ((context.tam as number) * 1000000 / (context.arpc as number)) * ((context.year2Pct as number) / 100);
        result = (year2Customers * (context.arpc as number)) / 1000000;
      }
      // FC 14: Cannibalization
      else if (formula.includes("cannibalized = newRev × (cannibalPct/100); netIncrease = newRev - cannibalized")) {
        const cannibalized = (context.newRev as number) * ((context.cannibalPct as number) / 100);
        result = (context.newRev as number) - cannibalized;
      }
      // FC 15: Freemium model
      else if (formula.includes("paidUsers = freeUsers × (conversionPct/100); revenue = paidUsers × paid; costs = freeUsers × freeCost; netRevenue = revenue - costs")) {
        const paidUsers = (context.freeUsers as number) * ((context.conversionPct as number) / 100);
        const revenue = paidUsers * (context.paid as number);
        const costs = (context.freeUsers as number) * (context.freeCost as number);
        result = revenue - costs;
      }
      // FC 16: Procurement savings
      else if (formula.includes("savings = annualSpend × 1000 × (savingsPct/100); netBenefit = savings - impCost")) {
        const savings = (context.annualSpend as number) * 1000 * ((context.savingsPct as number) / 100);
        result = savings - (context.impCost as number);
      }
      // FC 17: A/B test winner
      else if (formula.includes("revenueA = visitorsA × (conversionA/100) × aovA; revenueB = visitorsB × (conversionB/100) × aovB; maxRevenue = Math.max(revenueA, revenueB)")) {
        const revenueA = (context.visitorsA as number) * ((context.conversionA as number) / 100) * (context.aovA as number);
        const revenueB = (context.visitorsB as number) * ((context.conversionB as number) / 100) * (context.aovB as number);
        result = Math.max(revenueA, revenueB);
      }
      // FC 18: Referral program
      else if (formula.includes("referrals = customers × (referralRate/100); newCustomers = referrals × (conversionPct/100); value = newCustomers × ltv; cost = referrals × reward; netValue = value - cost")) {
        const referrals = (context.customers as number) * ((context.referralRate as number) / 100);
        const newCustomers = referrals * ((context.conversionPct as number) / 100);
        const value = newCustomers * (context.ltv as number);
        const cost = referrals * (context.reward as number);
        result = value - cost;
      }
      // FC 19: Inventory optimization
      else if (formula.includes("savings = inventory × (holdingPct/100) × (reductionPct/100)")) {
        result = (context.inventory as number) * ((context.holdingPct as number) / 100) * ((context.reductionPct as number) / 100);
      }
      // FC 20: Upsell revenue
      else if (formula.includes("upgrades = customers × (upsellPct/100); increase = upgrades × (premium - base)")) {
        const upgrades = (context.customers as number) * ((context.upsellPct as number) / 100);
        result = upgrades * ((context.premium as number) - (context.base as number));
      }

      // Market sizing: students
      else if (formula.includes("population × 1000 × (agePct/100) × (enrollPct/100)")) {
        result = (context.population as number) * 1000 * ((context.agePct as number) / 100) * ((context.enrollPct as number) / 100);
      }
      // Pizza orders
      else if (formula.includes("students × 1000 × freq")) {
        result = (context.students as number) * 1000 * (context.freq as number);
      }
      // Gym members
      else if (formula.includes("population × 1e6 × (adultPct/100) × (memberPct/100)")) {
        result = (context.population as number) * 1e6 * ((context.adultPct as number) / 100) * ((context.memberPct as number) / 100);
      }
      // Concert tickets
      else if (formula.includes("population × 1000 × (attendPct/100) × freq") && context.attendPct) {
        result = (context.population as number) * 1000 * ((context.attendPct as number) / 100) * (context.freq as number);
      }
      // Textbooks
      else if (formula.includes("students × 1000 × books")) {
        result = (context.students as number) * 1000 * (context.books as number);
      }
      // Streaming
      else if (formula.includes("(population × 1000 / peoplePerHH) × (subPct/100)")) {
        result = ((context.population as number) * 1000 / (context.peoplePerHH as number)) * ((context.subPct as number) / 100);
      }
      // Coffee market
      else if (formula.includes("population × 1000 × (drinkerPct/100) × spend")) {
        result = (context.population as number) * 1000 * ((context.drinkerPct as number) / 100) * (context.spend as number);
      }
      // Smartphone replacements
      else if (formula.includes("(population × 1e6 × (ownPct/100)) / years")) {
        result = ((context.population as number) * 1e6 * ((context.ownPct as number) / 100)) / (context.years as number);
      }
      // Restaurant visits
      else if (formula.includes("population × 1000 × (dineOutPct/100) × freq")) {
        result = (context.population as number) * 1000 * ((context.dineOutPct as number) / 100) * (context.freq as number);
      }
      // Dog food
      else if (formula.includes("households × 1000 × (dogPct/100) × spend")) {
        result = (context.households as number) * 1000 * ((context.dogPct as number) / 100) * (context.spend as number);
      }
      // Haircuts
      else if (formula.includes("population × 1000 × freq") && !context.attendPct && !context.dineOutPct) {
        result = (context.population as number) * 1000 * (context.freq as number);
      }
      // Ride share
      else if (formula.includes("population × 1000 × (adultPct/100) × (userPct/100) × freq")) {
        result = (context.population as number) * 1000 * ((context.adultPct as number) / 100) * ((context.userPct as number) / 100) * (context.freq as number);
      }
      // Fitness classes
      else if (formula.includes("members × 1000 × (attendPct/100) × freq")) {
        result = (context.members as number) * 1000 * ((context.attendPct as number) / 100) * (context.freq as number);
      }
      // Movie tickets
      else if (formula.includes("population × 1000 × (goerPct/100) × freq")) {
        result = (context.population as number) * 1000 * ((context.goerPct as number) / 100) * (context.freq as number);
      }
      // Meal kits
      else if (formula.includes("households × 1000 × (interestPct/100) × (subPct/100)")) {
        result = (context.households as number) * 1000 * ((context.interestPct as number) / 100) * ((context.subPct as number) / 100);
      }
      // Store expansion
      else if (formula.includes("setupCost / monthlyProfit")) {
        result = (context.setupCost as number) / (context.monthlyProfit as number);
      }
      // Pricing comparison
      else if (formula.includes("Math.max(price1 × units1, price2 × units2)")) {
        result = Math.max((context.price1 as number) * (context.units1 as number), (context.price2 as number) * (context.units2 as number));
      }
      // Cost cutting
      else if (formula.includes("currentCost × (reductionPct/100) × 12")) {
        result = (context.currentCost as number) * ((context.reductionPct as number) / 100) * 12;
      }
      // Warehouse utilization
      else if (formula.includes("(currentUnits / maxUnits) × 100")) {
        result = ((context.currentUnits as number) / (context.maxUnits as number)) * 100;
      }
      // Marketing ROI
      else if (formula.includes("revenue / adSpend")) {
        result = (context.revenue as number) / (context.adSpend as number);
      }
      else {
        // Default fallback
        result = 0;
        console.warn(`Unhandled formula: ${formula}`);
      }

      truth = { final: Math.round(result * 100) / 100 };
    }
    // Old case handling
    else {
      switch (template.id) {
        case "ms-icedcoffee-tx-v1":
        case "ms-ev-charging-v1":
        case "ms-streaming-subs-v1":
          truth = computeMarketSizing({
            population: (numbers.population || numbers.pop) as number,
            penPct: ((numbers.penPct || numbers.fanPct || numbers.evPen) as number) / 100,
            freq: (numbers.freq || numbers.sess) as number,
            season: (numbers.season || (((numbers.devicePct || 80) as number) / 100) * (((numbers.publicShare || numbers.wtpPct || 50) as number) / 100)) as number
          });
          break;

        case "profit-retail-bridge-v1":
          truth = computeProfitRetail({
            traffic: (numbers.traffic as number) * 1000,
            convRate: (numbers.convRate as number) / 100,
            aov: numbers.aov as number,
            cogsPct: (numbers.cogsPct as number) / 100,
            fixedCosts: (numbers.fixedCosts as number) * 1e6,
            trafficChg: (numbers.trafficChgPct as number) / 100,
            convChg: (numbers.convChgPp as number) / 100,
            aovChg: (numbers.aovChgPct as number) / 100,
            cogsChg: (numbers.cogsChgPp as number) / 100,
            fixChg: (numbers.fixChgPct as number) / 100
          });
          if ('final' in truth) {
            truth = { ...truth, final: truth.final / 1e6 };
          }
          break;

        case "profit-pharmacy-kiosk-v1":
          truth = computePharmacyKiosk({
            scripts: numbers.scripts as number,
            price: numbers.price as number,
            gmPct: (numbers.gmPct as number) / 100,
            staff: (numbers.staff as number) * 1000,
            rent: (numbers.rent as number) * 1000,
            shrinkPct: (numbers.shrinkPct as number) / 100,
            capex: (numbers.capex as number) * 1000
          });
          break;

        case "profit-saas-unit-econ-v1":
          {
            const ltv = (numbers.acv as number) * ((numbers.gmPct as number) / 100) * (numbers.lifetime as number);
            const ratio = ltv / (numbers.cac as number);
            truth = { final: Math.round(ratio * 100) / 100 };
          }
          break;

        case "pricing-oilgas-v1":
          truth = computePricingElasticity({
            priceChange: numbers.priceChange as number,
            elasticity: numbers.elasticity as number,
            baseVol: (numbers.baseVol as number) * 1e6,
            margin: numbers.margin as number
          });
          break;

        case "pe-dairy-v1":
          truth = computePEscreen({
            yieldPerCow: numbers.yieldPerCow as number,
            herd: numbers.herd as number,
            price: numbers.price as number,
            varCost: numbers.varCost as number,
            fixedCosts: (numbers.fixedCosts as number) * 1000,
            ev: (numbers.ev as number) * 1e6,
            targetMult: numbers.targetMult as number
          });
          break;

        case "entry-waterpark-v1":
          truth = computeWaterParkNPV({
            tam: numbers.tam as number,
            r1: numbers.r1 as number,
            r2: numbers.r2 as number,
            r3: numbers.r3 as number,
            ticket: numbers.ticket as number,
            varCost: numbers.varCost as number,
            fixedCosts: numbers.fixedCosts as number,
            capex: numbers.capex as number,
            disc: numbers.disc as number
          });
          break;

        default:
          if (template.decision.type === "mcq") {
            const points = template.decision.points;
            const maxPoints = Math.max(...points);
            truth = { correctIndex: points.indexOf(maxPoints) };
          } else {
            truth = { final: 100 };
          }
      }
    }
  } catch (error) {
    console.error(`Error computing truth for ${template.id}:`, error);
    truth = template.decision.type === "mcq"
      ? { correctIndex: 0 }
      : { final: 0 };
  }

  return {
    templateId: template.id,
    filledStem: filledStem,
    numbers: displayNumbers,
    decision: template.decision,
    truth,
    timeLimit: template.time_limit_s
  };
}
