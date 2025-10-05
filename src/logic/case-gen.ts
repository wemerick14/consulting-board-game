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
          traffic: (numbers.traffic as number) * 1000, // Convert to actual count
          convRate: (numbers.convRate as number) / 100,
          aov: numbers.aov as number,
          cogsPct: (numbers.cogsPct as number) / 100,
          fixedCosts: (numbers.fixedCosts as number) * 1e6, // Convert to dollars
          trafficChg: (numbers.trafficChgPct as number) / 100,
          convChg: (numbers.convChgPp as number) / 100,
          aovChg: (numbers.aovChgPct as number) / 100,
          cogsChg: (numbers.cogsChgPp as number) / 100,
          fixChg: (numbers.fixChgPct as number) / 100
        });
        // Convert back to millions
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

      // For other cases, provide reasonable default answers based on MCQ
      default:
        if (template.decision.type === "mcq") {
          // For MCQ cases, pick the highest-scoring option as truth
          const points = template.decision.points;
          const maxPoints = Math.max(...points);
          truth = { correctIndex: points.indexOf(maxPoints) };
        } else {
          // For numeric cases without specific compute, use a simple heuristic
          truth = { final: 100 };
        }
    }
  } catch (error) {
    console.error(`Error computing truth for ${template.id}:`, error);
    // Fallback
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
