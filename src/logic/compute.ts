import { TruthResult } from "../types";

/**
 * Market Sizing: Iced Coffee
 * Formula: population × penPct × freq × 52 × season
 */
export function computeMarketSizing(numbers: Record<string, number>): TruthResult {
  const { population, penPct, freq, season } = numbers;
  const final = population * 1e6 * penPct * freq * 52 * season;

  return {
    final: Math.round(final),
    steps: {
      population_millions: population,
      penetration_rate: penPct,
      frequency_per_week: freq,
      weeks_per_year: 52,
      seasonality_factor: season,
      total_units: final
    }
  };
}

/**
 * Profitability: Retail Chain EBITDA Bridge
 * Revenue = traffic × convRate × aov
 * Gross Profit = revenue × (1 - cogsPct)
 * EBITDA = gross profit - fixedCosts
 */
export function computeProfitRetail(numbers: Record<string, number>): TruthResult {
  const {
    traffic, convRate, aov, cogsPct, fixedCosts,
    trafficChg, convChg, aovChg, cogsChg, fixChg
  } = numbers;

  // This year's values
  const trafficNow = traffic * (1 + trafficChg);
  const convNow = convRate + convChg;
  const aovNow = aov * (1 + aovChg);
  const cogsNow = cogsPct + cogsChg;
  const fixedNow = fixedCosts * (1 + fixChg);

  const revenue = trafficNow * convNow * aovNow;
  const grossProfit = revenue * (1 - cogsNow);
  const ebitda = grossProfit - fixedNow;

  return {
    final: Math.round(ebitda),
    steps: {
      traffic_this_year: trafficNow,
      conversion_this_year: convNow,
      aov_this_year: aovNow,
      revenue: revenue,
      cogs_pct_this_year: cogsNow,
      gross_profit: grossProfit,
      fixed_costs_this_year: fixedNow,
      ebitda: ebitda
    }
  };
}

/**
 * Pricing: Fuel Retailer Elasticity
 * %ΔQ = elasticity × %ΔP
 * New volume = base × (1 + %ΔQ)
 * Profit Δ ≈ (margin + ΔP) × newVol - margin × baseVol
 */
export function computePricingElasticity(numbers: Record<string, number>): TruthResult {
  const { priceChange, elasticity, baseVol, margin } = numbers;

  // Convert cents to dollars for calculation
  const priceChangeDollars = priceChange / 100;
  const marginDollars = margin / 100;

  // Base profit
  const baseProfit = marginDollars * baseVol;

  // Price change as percentage (assume base price is $3.00/gal as typical)
  const basePrice = 3.0;
  const percPriceChange = priceChangeDollars / basePrice;

  // Volume change
  const percVolChange = elasticity * percPriceChange;
  const newVol = baseVol * (1 + percVolChange);

  // New profit
  const newMargin = marginDollars + priceChangeDollars;
  const newProfit = newMargin * newVol;

  const profitDelta = newProfit - baseProfit;

  return {
    final: Math.round(profitDelta),
    steps: {
      base_volume: baseVol,
      base_margin: marginDollars,
      price_change: priceChangeDollars,
      perc_price_change: percPriceChange,
      perc_vol_change: percVolChange,
      new_volume: newVol,
      new_margin: newMargin,
      base_profit: baseProfit,
      new_profit: newProfit,
      profit_delta: profitDelta
    }
  };
}

/**
 * PE Screening: Dairy Operation
 * EBITDA = (price - var) × yield × 365 × herd - fixed
 * Then compare EV/EBITDA to target multiple
 * Returns MCQ choice index
 */
export function computePEscreen(numbers: Record<string, number>): TruthResult {
  const { yieldPerCow, herd, price, varCost, fixedCosts, ev, targetMult } = numbers;

  const annualRevenue = price * yieldPerCow * 365 * herd;
  const annualVarCosts = varCost * yieldPerCow * 365 * herd;
  const ebitda = annualRevenue - annualVarCosts - fixedCosts;

  const actualMult = ev / ebitda;

  // Decision logic:
  // 0: "Buy now" - if actual mult < target mult (undervalued)
  // 1: "Buy with ops plan" - if close to target (within 10%)
  // 2: "Pass" - if overvalued by >20%
  // 3: "DD first" - if moderately overvalued (10-20%)

  let correctIndex = 0;

  if (actualMult < targetMult * 0.95) {
    correctIndex = 0; // Buy now - it's a good deal
  } else if (actualMult < targetMult * 1.10) {
    correctIndex = 1; // Buy with ops plan - close to fair value
  } else if (actualMult > targetMult * 1.20) {
    correctIndex = 2; // Pass - too expensive
  } else {
    correctIndex = 3; // DD first - moderately expensive
  }

  return {
    correctIndex,
  };
}

/**
 * Grocery Pharmacy Attach: Kiosk profitability
 * Revenue = scripts × 365 × price
 * Gross profit = revenue × gmPct
 * Shrink cost = revenue × shrinkPct
 * EBITDA = gross profit - staff - rent - shrink
 * Payback = CAPEX / EBITDA
 */
export function computePharmacyKiosk(numbers: Record<string, number>): TruthResult {
  const { scripts, price, gmPct, staff, rent, shrinkPct, capex } = numbers;

  const revenue = scripts * 365 * price;
  const grossProfit = revenue * gmPct;
  const shrinkCost = revenue * shrinkPct;
  const ebitda = grossProfit - staff - rent - shrinkCost;
  const payback = ebitda > 0 ? capex / ebitda : 999;

  return {
    final: Math.round(payback * 10) / 10, // Payback in years, 1 decimal
    steps: {
      annual_revenue: revenue,
      gross_profit: grossProfit,
      shrink_cost: shrinkCost,
      staffing_cost: staff,
      rent_cost: rent,
      ebitda: ebitda,
      payback_years: payback
    }
  };
}

/**
 * Market Entry: Water Park NPV
 * Compute 3-year cash flows with share ramp
 * Simple NPV calculation
 */
export function computeWaterParkNPV(numbers: Record<string, number>): TruthResult {
  const { tam, r1, r2, r3, ticket, varCost, fixedCosts, capex, disc } = numbers;

  const shares = [r1 / 100, r2 / 100, r3 / 100];

  let npv = -capex; // Initial investment

  for (let year = 0; year < 3; year++) {
    const visits = tam * shares[year];
    const revenue = visits * ticket;
    const totalVarCost = visits * varCost;
    const cashFlow = revenue - totalVarCost - fixedCosts;

    npv += cashFlow / Math.pow(1 + disc / 100, year + 1);
  }

  // Options: 0="Open now", 1="Delay 1 year", 2="Cancel"
  // For MVP, we'll say open now if NPV > 0, delay if slightly negative, cancel if very negative
  let correctIndex = 0;
  if (npv > 0) {
    correctIndex = 0; // Open now
  } else if (npv > -capex * 0.15) {
    correctIndex = 1; // Delay (might improve)
  } else {
    correctIndex = 2; // Cancel (bad investment)
  }

  return {
    correctIndex,
  };
}
