import type { CaseTemplate } from "../types";

export const caseDatabase: CaseTemplate[] = [
  // ========== QUICK MATH (20 questions, 30-45 seconds) ==========

  // Basic Revenue
  {
    id: "qm-revenue-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Coffee Shop Revenue",
    stem_template: "A coffee shop sells {cups} cups of coffee per day at ${price} each. What's the daily revenue?",
    inputs: ["cups", "price"],
    params: {
      cups: { min: 100, max: 400, step: 50 },
      price: { min: 3, max: 6, step: 0.5 }
    },
    decision: { type: "numeric" },
    truth_howto: "revenue = cups × price",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-profit-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Simple Profit Calculation",
    stem_template: "A store has revenue of ${revenue}, and total costs of ${costs}. What's the profit?",
    inputs: ["revenue", "costs"],
    params: {
      revenue: { min: 5000, max: 20000, step: 1000 },
      costs: { min: 3000, max: 15000, step: 1000 }
    },
    decision: { type: "numeric" },
    truth_howto: "profit = revenue - costs",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-percentage-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Discount Calculation",
    stem_template: "A laptop costs ${original}. There's a {discount}% discount. What's the final price?",
    inputs: ["original", "discount"],
    params: {
      original: { min: 600, max: 1500, step: 100 },
      discount: { min: 10, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "final = original × (1 - discount/100)",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-unit-cost-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Cost Per Unit",
    stem_template: "A company produces {units} units with total cost of ${totalCost}. What's the cost per unit?",
    inputs: ["units", "totalCost"],
    params: {
      units: { min: 100, max: 1000, step: 100 },
      totalCost: { min: 5000, max: 50000, step: 5000 }
    },
    decision: { type: "numeric" },
    truth_howto: "cost_per_unit = totalCost / units",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-margin-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Profit Margin",
    stem_template: "A product sells for ${price} and costs ${cost} to make. What's the profit per unit?",
    inputs: ["price", "cost"],
    params: {
      price: { min: 20, max: 100, step: 10 },
      cost: { min: 10, max: 70, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "profit = price - cost",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-breakeven-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Break-Even Units",
    stem_template: "Fixed costs are ${fixed}. Profit per unit is ${profit}. How many units to break even?",
    inputs: ["fixed", "profit"],
    params: {
      fixed: { min: 10000, max: 50000, step: 5000 },
      profit: { min: 10, max: 50, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "units = fixed / profit",
    time_limit_s: 35,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-total-cost-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Total Monthly Cost",
    stem_template: "Rent is ${rent}/month. Utilities are ${utilities}/month. Salaries are ${salaries}/month. What's the total monthly cost?",
    inputs: ["rent", "utilities", "salaries"],
    params: {
      rent: { min: 2000, max: 8000, step: 1000 },
      utilities: { min: 300, max: 1000, step: 100 },
      salaries: { min: 5000, max: 20000, step: 2500 }
    },
    decision: { type: "numeric" },
    truth_howto: "total = rent + utilities + salaries",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-annual-revenue-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Annual Revenue",
    stem_template: "Monthly revenue is ${monthly}. What's the annual revenue?",
    inputs: ["monthly"],
    params: {
      monthly: { min: 5000, max: 25000, step: 2500 }
    },
    decision: { type: "numeric" },
    truth_howto: "annual = monthly × 12",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-price-increase-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Price After Increase",
    stem_template: "Current price is ${current}. Price increases by {increase}%. What's the new price?",
    inputs: ["current", "increase"],
    params: {
      current: { min: 50, max: 200, step: 25 },
      increase: { min: 5, max: 20, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "new_price = current × (1 + increase/100)",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-hourly-wage-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Weekly Earnings",
    stem_template: "You work {hours} hours per week at ${wage} per hour. What are your weekly earnings?",
    inputs: ["hours", "wage"],
    params: {
      hours: { min: 10, max: 40, step: 5 },
      wage: { min: 15, max: 30, step: 2.5 }
    },
    decision: { type: "numeric" },
    truth_howto: "earnings = hours × wage",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // ========== MARKET SIZING (15 questions, 60 seconds) ==========

  {
    id: "ms-college-students-1",
    category: "market_sizing",
    difficulty: "full",
    title: "College Students Estimate",
    stem_template: "Estimate students at a university. Total population in city: {population}k. College age (18-24): {agePct}%. Enrollment rate: {enrollPct}%. How many students?",
    inputs: ["population", "agePct", "enrollPct"],
    params: {
      population: { min: 100, max: 500, step: 50 },
      agePct: { min: 8, max: 15, step: 1 },
      enrollPct: { min: 40, max: 70, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "students = population × 1000 × (agePct/100) × (enrollPct/100)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-pizza-orders-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Weekly Pizza Orders",
    stem_template: "Estimate weekly pizza orders in a college town. Students: {students}k. Order frequency: {freq} times/week per student. What's the weekly order count?",
    inputs: ["students", "freq"],
    params: {
      students: { min: 15, max: 50, step: 5 },
      freq: { min: 0.5, max: 2, step: 0.5 }
    },
    decision: { type: "numeric" },
    truth_howto: "orders = students × 1000 × freq",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-gym-memberships-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Gym Memberships in State",
    stem_template: "State population: {population}M. Adults (18-65): {adultPct}%. Gym membership rate: {memberPct}%. How many gym members?",
    inputs: ["population", "adultPct", "memberPct"],
    params: {
      population: { min: 5, max: 20, step: 5 },
      adultPct: { min: 55, max: 70, step: 5 },
      memberPct: { min: 15, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "members = population × 1e6 × (adultPct/100) × (memberPct/100)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-concert-tickets-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Annual Concert Tickets",
    stem_template: "City population: {population}k. Concert attendees: {attendPct}%. Average concerts per person per year: {freq}. How many tickets sold annually?",
    inputs: ["population", "attendPct", "freq"],
    params: {
      population: { min: 200, max: 800, step: 100 },
      attendPct: { min: 20, max: 40, step: 5 },
      freq: { min: 1, max: 4, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "tickets = population × 1000 × (attendPct/100) × freq",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-textbooks-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Textbooks Sold Per Year",
    stem_template: "University students: {students}k. Average textbooks per student: {books}. How many textbooks needed annually?",
    inputs: ["students", "books"],
    params: {
      students: { min: 20, max: 60, step: 10 },
      books: { min: 4, max: 8, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "textbooks = students × 1000 × books",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // More Quick Math Questions
  {
    id: "qm-tax-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Sales Tax Calculation",
    stem_template: "A purchase costs ${subtotal}. Sales tax is {taxRate}%. What's the total with tax?",
    inputs: ["subtotal", "taxRate"],
    params: {
      subtotal: { min: 50, max: 500, step: 50 },
      taxRate: { min: 5, max: 10, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "total = subtotal × (1 + taxRate/100)",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-tip-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Restaurant Tip",
    stem_template: "Your bill is ${bill}. You want to leave a {tipPct}% tip. How much tip should you leave?",
    inputs: ["bill", "tipPct"],
    params: {
      bill: { min: 30, max: 150, step: 10 },
      tipPct: { min: 15, max: 25, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "tip = bill × (tipPct/100)",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-split-bill-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Split the Bill",
    stem_template: "Total bill is ${total}. Split equally among {people} people. How much per person?",
    inputs: ["total", "people"],
    params: {
      total: { min: 60, max: 200, step: 20 },
      people: { min: 3, max: 8, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "perPerson = total / people",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-markup-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Retail Markup",
    stem_template: "Cost is ${cost}. Markup is {markup}%. What's the selling price?",
    inputs: ["cost", "markup"],
    params: {
      cost: { min: 20, max: 100, step: 10 },
      markup: { min: 30, max: 100, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "sellingPrice = cost × (1 + markup/100)",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-avg-sale-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Average Sale Value",
    stem_template: "Total sales: ${totalSales}. Number of transactions: {transactions}. What's the average sale value?",
    inputs: ["totalSales", "transactions"],
    params: {
      totalSales: { min: 5000, max: 25000, step: 5000 },
      transactions: { min: 50, max: 250, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "avgSale = totalSales / transactions",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-inventory-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Inventory Value",
    stem_template: "You have {units} units in stock. Each unit cost ${unitCost}. What's total inventory value?",
    inputs: ["units", "unitCost"],
    params: {
      units: { min: 100, max: 1000, step: 100 },
      unitCost: { min: 10, max: 50, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "inventoryValue = units × unitCost",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-growth-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Revenue Growth",
    stem_template: "Last year revenue: ${lastYear}. This year revenue: ${thisYear}. What's the dollar growth?",
    inputs: ["lastYear", "thisYear"],
    params: {
      lastYear: { min: 50000, max: 150000, step: 25000 },
      thisYear: { min: 60000, max: 200000, step: 25000 }
    },
    decision: { type: "numeric" },
    truth_howto: "growth = thisYear - lastYear",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-conversion-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Conversion Rate",
    stem_template: "{visitors} people visited your website. {buyers} made a purchase. What's the conversion rate in percent?",
    inputs: ["visitors", "buyers"],
    params: {
      visitors: { min: 1000, max: 5000, step: 500 },
      buyers: { min: 50, max: 500, step: 50 }
    },
    decision: { type: "numeric" },
    truth_howto: "conversionPct = (buyers / visitors) × 100",
    time_limit_s: 35,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-capacity-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Production Capacity",
    stem_template: "Factory produces {perHour} units per hour. Works {hours} hours per day. What's daily production?",
    inputs: ["perHour", "hours"],
    params: {
      perHour: { min: 50, max: 200, step: 25 },
      hours: { min: 8, max: 16, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "dailyProduction = perHour × hours",
    time_limit_s: 25,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "qm-rent-per-sqft-1",
    category: "quick_math",
    difficulty: "quick",
    title: "Cost Per Square Foot",
    stem_template: "Office rent is ${rent}/month for {sqft} square feet. What's the cost per square foot?",
    inputs: ["rent", "sqft"],
    params: {
      rent: { min: 3000, max: 12000, step: 1000 },
      sqft: { min: 500, max: 2000, step: 250 }
    },
    decision: { type: "numeric" },
    truth_howto: "costPerSqft = rent / sqft",
    time_limit_s: 30,
    max_points: 2,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // More Market Sizing Questions
  {
    id: "ms-streaming-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Streaming Subscriptions",
    stem_template: "City has {population}k people. Households average {peoplePerHH} people. {subPct}% of households have streaming. How many subscriptions?",
    inputs: ["population", "peoplePerHH", "subPct"],
    params: {
      population: { min: 200, max: 1000, step: 100 },
      peoplePerHH: { min: 2, max: 4, step: 0.5 },
      subPct: { min: 60, max: 85, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "subscriptions = (population × 1000 / peoplePerHH) × (subPct/100)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-coffee-shops-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Coffee Shop Market Size",
    stem_template: "Town population: {population}k. Coffee drinkers: {drinkerPct}%. Average spend per person per month: ${spend}. What's monthly market size?",
    inputs: ["population", "drinkerPct", "spend"],
    params: {
      population: { min: 50, max: 300, step: 50 },
      drinkerPct: { min: 40, max: 70, step: 5 },
      spend: { min: 20, max: 60, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "marketSize = population × 1000 × (drinkerPct/100) × spend",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-smartphone-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Smartphone Replacements",
    stem_template: "State population: {population}M. Smartphone ownership: {ownPct}%. Replacement cycle: every {years} years. How many phones replaced annually?",
    inputs: ["population", "ownPct", "years"],
    params: {
      population: { min: 5, max: 25, step: 5 },
      ownPct: { min: 75, max: 95, step: 5 },
      years: { min: 2, max: 4, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "replacements = (population × 1e6 × (ownPct/100)) / years",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-restaurant-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Restaurant Visits",
    stem_template: "City: {population}k people. {dineOutPct}% dine out. Average {freq} times/month. How many restaurant visits monthly?",
    inputs: ["population", "dineOutPct", "freq"],
    params: {
      population: { min: 100, max: 500, step: 100 },
      dineOutPct: { min: 50, max: 80, step: 5 },
      freq: { min: 2, max: 8, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "visits = population × 1000 × (dineOutPct/100) × freq",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-dog-food-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Dog Food Market",
    stem_template: "Region: {households}k households. Dog ownership: {dogPct}%. Avg spend/month: ${spend}. What's monthly dog food market?",
    inputs: ["households", "dogPct", "spend"],
    params: {
      households: { min: 100, max: 500, step: 100 },
      dogPct: { min: 25, max: 45, step: 5 },
      spend: { min: 30, max: 80, step: 10 }
    },
    decision: { type: "numeric" },
    truth_howto: "market = households × 1000 × (dogPct/100) × spend",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-haircuts-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Annual Haircuts",
    stem_template: "Town: {population}k people. {freq} haircuts per person per year. How many haircuts annually?",
    inputs: ["population", "freq"],
    params: {
      population: { min: 50, max: 300, step: 50 },
      freq: { min: 4, max: 12, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "haircuts = population × 1000 × freq",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-ride-share-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Ride Share Trips",
    stem_template: "City: {population}k. Adults (18+): {adultPct}%. Use ride share: {userPct}%. Avg {freq} trips/month. Monthly trips?",
    inputs: ["population", "adultPct", "userPct", "freq"],
    params: {
      population: { min: 200, max: 1000, step: 100 },
      adultPct: { min: 70, max: 85, step: 5 },
      userPct: { min: 30, max: 60, step: 5 },
      freq: { min: 2, max: 8, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "trips = population × 1000 × (adultPct/100) × (userPct/100) × freq",
    time_limit_s: 75,
    max_points: 5,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-fitness-class-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Fitness Classes Weekly",
    stem_template: "Gym has {members}k members. {attendPct}% attend classes. Avg {freq} classes/week. Weekly class attendances?",
    inputs: ["members", "attendPct", "freq"],
    params: {
      members: { min: 5, max: 20, step: 5 },
      attendPct: { min: 30, max: 60, step: 5 },
      freq: { min: 2, max: 5, step: 1 }
    },
    decision: { type: "numeric" },
    truth_howto: "attendances = members × 1000 × (attendPct/100) × freq",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-movie-tickets-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Movie Tickets Sold",
    stem_template: "City: {population}k. Moviegoers: {goerPct}%. Avg {freq} movies/year. Annual tickets sold?",
    inputs: ["population", "goerPct", "freq"],
    params: {
      population: { min: 150, max: 600, step: 100 },
      goerPct: { min: 40, max: 70, step: 5 },
      freq: { min: 3, max: 12, step: 2 }
    },
    decision: { type: "numeric" },
    truth_howto: "tickets = population × 1000 × (goerPct/100) × freq",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "ms-meal-kit-1",
    category: "market_sizing",
    difficulty: "full",
    title: "Meal Kit Subscriptions",
    stem_template: "Region: {households}k households. Interest in meal kits: {interestPct}%. Actually subscribe: {subPct}%. How many subscriptions?",
    inputs: ["households", "interestPct", "subPct"],
    params: {
      households: { min: 200, max: 800, step: 100 },
      interestPct: { min: 40, max: 70, step: 5 },
      subPct: { min: 15, max: 40, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "subscriptions = households × 1000 × (interestPct/100) × (subPct/100)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  // Some Full Case Questions (simpler than original)
  {
    id: "fc-expansion-1",
    category: "market_entry",
    difficulty: "full",
    title: "Store Expansion Decision",
    stem_template: "New store costs ${setupCost}k to open. Expected monthly profit: ${monthlyProfit}k. How many months to break even?",
    inputs: ["setupCost", "monthlyProfit"],
    params: {
      setupCost: { min: 100, max: 300, step: 50 },
      monthlyProfit: { min: 10, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "months = setupCost / monthlyProfit",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-pricing-1",
    category: "pricing",
    difficulty: "full",
    title: "Optimal Price Point",
    stem_template: "At ${price1} you sell {units1} units. At ${price2} you sell {units2} units. Which price gives higher revenue?",
    inputs: ["price1", "units1", "price2", "units2"],
    params: {
      price1: { min: 20, max: 40, step: 5 },
      units1: { min: 800, max: 1200, step: 100 },
      price2: { min: 25, max: 50, step: 5 },
      units2: { min: 500, max: 900, step: 100 }
    },
    decision: { type: "numeric" },
    truth_howto: "maxRevenue = Math.max(price1 × units1, price2 × units2)",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-cost-cutting-1",
    category: "profitability",
    difficulty: "full",
    title: "Cost Reduction Impact",
    stem_template: "Current costs: ${currentCost}k/month. Reduce by {reductionPct}%. What are annual savings?",
    inputs: ["currentCost", "reductionPct"],
    params: {
      currentCost: { min: 50, max: 200, step: 25 },
      reductionPct: { min: 10, max: 30, step: 5 }
    },
    decision: { type: "numeric" },
    truth_howto: "annualSavings = currentCost × (reductionPct/100) × 12",
    time_limit_s: 60,
    max_points: 4,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-capacity-2",
    category: "ops",
    difficulty: "full",
    title: "Warehouse Utilization",
    stem_template: "Warehouse holds {maxUnits} units. Currently {currentUnits} units stored. What % of capacity is being used?",
    inputs: ["maxUnits", "currentUnits"],
    params: {
      maxUnits: { min: 5000, max: 20000, step: 2500 },
      currentUnits: { min: 3000, max: 15000, step: 2000 }
    },
    decision: { type: "numeric" },
    truth_howto: "utilizationPct = (currentUnits / maxUnits) × 100",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  },

  {
    id: "fc-marketing-roi-1",
    category: "profitability",
    difficulty: "full",
    title: "Marketing Return",
    stem_template: "Spent ${adSpend}k on ads. Generated ${revenue}k in revenue. What's the return on ad spend (revenue/spend)?",
    inputs: ["adSpend", "revenue"],
    params: {
      adSpend: { min: 10, max: 50, step: 10 },
      revenue: { min: 30, max: 200, step: 20 }
    },
    decision: { type: "numeric" },
    truth_howto: "roas = revenue / adSpend",
    time_limit_s: 45,
    max_points: 3,
    scoring: { tolerance_bands: [0.05, 0.10, 0.20, 0.30] }
  }
];
