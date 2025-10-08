export type EventType = "positive" | "negative" | "choice";

export interface GameEvent {
  id: string;
  name: string;
  type: EventType;
  description: string;
  emoji: string;

  // For simple events
  effect?: {
    pointsChange?: number;
    creditsChange?: { add60?: number; googlePeek?: number; fiveWordHint?: number };
    positionChange?: number;
    toleranceBoost?: boolean; // Double tolerance on next question
    difficultyOverride?: "quick" | "full"; // Force difficulty for next question
  };

  // For choice events
  choices?: {
    text: string;
    effect: {
      pointsChange?: number;
      positionChange?: number;
      creditsChange?: { add60?: number; googlePeek?: number; fiveWordHint?: number };
      probability?: number; // For random outcomes (0-1)
      successEffect?: any; // If probability check passes
      failEffect?: any; // If probability check fails
    };
  }[];
}

export const gameEvents: GameEvent[] = [
  // ========== POSITIVE EVENTS ==========
  {
    id: "networking-win",
    name: "Networking Happy Hour",
    type: "positive",
    description: "You made a great connection at the firm happy hour! They share some insider tips with you.",
    emoji: "🍻",
    effect: {
      creditsChange: { fiveWordHint: 1 }
    }
  },
  {
    id: "client-win",
    name: "Client Presentation Success",
    type: "positive",
    description: "Your presentation wowed the client! The partner notices your excellent work.",
    emoji: "🎯",
    effect: {
      pointsChange: 2
    }
  },
  {
    id: "mentorship",
    name: "Senior Mentor Coaching",
    type: "positive",
    description: "A senior consultant takes you under their wing and teaches you advanced techniques.",
    emoji: "🎓",
    effect: {
      toleranceBoost: true // Next question has doubled tolerance
    }
  },
  {
    id: "innovation-award",
    name: "Innovation Recognition",
    type: "positive",
    description: "Your process improvement idea wins the firm's innovation award!",
    emoji: "💡",
    effect: {
      positionChange: 1
    }
  },
  {
    id: "client-referral",
    name: "Client Referral",
    type: "positive",
    description: "Your happy client recommends you to their Fortune 500 network. Three new leads incoming!",
    emoji: "🤝",
    effect: {
      pointsChange: 2
    }
  },
  {
    id: "pro-bono-win",
    name: "Pro Bono Impact",
    type: "positive",
    description: "Your charity consulting project gets featured in the firm's annual report. Partners take notice!",
    emoji: "❤️",
    effect: {
      positionChange: 1
    }
  },
  {
    id: "case-competition",
    name: "Case Competition Victory",
    type: "positive",
    description: "You win the firm's internal case competition! Your analytical skills are recognized firm-wide.",
    emoji: "🏆",
    effect: {
      creditsChange: { fiveWordHint: 1 }
    }
  },
  {
    id: "thought-leadership",
    name: "Thought Leadership",
    type: "positive",
    description: "Your LinkedIn article on market trends goes viral. The Managing Partner shares it!",
    emoji: "✍️",
    effect: {
      pointsChange: 2
    }
  },
  {
    id: "secondment-success",
    name: "Client Secondment Success",
    type: "positive",
    description: "Your 3-month client secondment is a huge win. You return with deep industry expertise.",
    emoji: "🌟",
    effect: {
      toleranceBoost: true
    }
  },
  {
    id: "alumni-network",
    name: "Alumni Network Win",
    type: "positive",
    description: "A former colleague who went in-house refers a $5M deal. Your network pays off!",
    emoji: "📞",
    effect: {
      positionChange: 1
    }
  },
  {
    id: "training-excellence",
    name: "Training Program Excellence",
    type: "positive",
    description: "You ace the firm's leadership development program. New frameworks at your fingertips!",
    emoji: "📚",
    effect: {
      toleranceBoost: true
    }
  },
  {
    id: "conference-speaker",
    name: "Industry Conference Speaker",
    type: "positive",
    description: "You're invited to present at a major industry conference. Great visibility for the firm!",
    emoji: "🎤",
    effect: {
      pointsChange: 2
    }
  },

  // ========== NEGATIVE EVENTS ==========
  {
    id: "staffing-crunch",
    name: "Staffing Emergency",
    type: "negative",
    description: "You're pulled onto a fire drill project. No time to prepare for your next question!",
    emoji: "🔥",
    effect: {
      creditsChange: { add60: -1 } // Lose time credit
    }
  },
  {
    id: "client-crisis",
    name: "Client Escalation",
    type: "negative",
    description: "A client issue escalates. Your next challenge will be harder than expected.",
    emoji: "⚠️",
    effect: {
      difficultyOverride: "full" // Force Full Case even if they choose Quick Math
    }
  },
  {
    id: "data-room-disaster",
    name: "Data Room Disaster",
    type: "negative",
    description: "Critical Excel file corrupted overnight. You lose hours of analysis work!",
    emoji: "💾",
    effect: {
      creditsChange: { fiveWordHint: -1 }
    }
  },
  {
    id: "travel-burnout",
    name: "Travel Burnout",
    type: "negative",
    description: "Back-to-back red-eye flights have you exhausted. You're running on empty for this case.",
    emoji: "✈️",
    effect: {
      creditsChange: { add60: -1 }
    }
  },
  {
    id: "scope-creep",
    name: "Project Scope Creep",
    type: "negative",
    description: "Client adds three new workstreams mid-project. No time to prepare properly!",
    emoji: "📊",
    effect: {
      difficultyOverride: "full"
    }
  },
  {
    id: "team-conflict",
    name: "Team Conflict",
    type: "negative",
    description: "Junior analyst quits mid-project citing burnout. You're stuck picking up the slack.",
    emoji: "😤",
    effect: {
      pointsChange: -1
    }
  },
  {
    id: "client-ghosting",
    name: "Client Goes Dark",
    type: "negative",
    description: "Client stops responding to emails for two weeks. Project momentum stalls completely.",
    emoji: "👻",
    effect: {
      pointsChange: -1
    }
  },
  {
    id: "missed-deadline",
    name: "Missed Deadline",
    type: "negative",
    description: "Your slide deck is delivered 2 hours late. Partner is not happy about the client call delay.",
    emoji: "⏰",
    effect: {
      pointsChange: -2
    }
  },
  {
    id: "budget-overrun",
    name: "Budget Overrun",
    type: "negative",
    description: "Project goes 30% over budget. You're blamed for poor scope management.",
    emoji: "💸",
    effect: {
      positionChange: -1
    }
  },
  {
    id: "bad-feedback",
    name: "Harsh Client Feedback",
    type: "negative",
    description: "Client rates your work as 'below expectations' in the quarterly review. Ouch.",
    emoji: "📉",
    effect: {
      difficultyOverride: "full"
    }
  },

  // ========== CHOICE EVENTS ==========
  {
    id: "pivot-opportunity",
    name: "Career Pivot Decision",
    type: "choice",
    description: "You're offered a chance to pivot to a new practice area. It could accelerate your career... or set you back.",
    emoji: "🔄",
    choices: [
      {
        text: "Play it safe - Stay in current role (+1 point guaranteed)",
        effect: {
          pointsChange: 1
        }
      },
      {
        text: "Take the risk - Pivot to new practice (50/50: +3 points or -1 space)",
        effect: {
          probability: 0.5,
          successEffect: { pointsChange: 3 },
          failEffect: { positionChange: -1 }
        }
      }
    ]
  },
  {
    id: "promotion-review",
    name: "Early Promotion Offer",
    type: "choice",
    description: "HR offers you an early promotion review. Accept now or wait 6 months for potentially better terms?",
    emoji: "📈",
    choices: [
      {
        text: "Accept now - Guaranteed advancement (+1 space)",
        effect: {
          positionChange: 1
        }
      },
      {
        text: "Wait for better offer (60% chance: +2 spaces, 40% chance: nothing)",
        effect: {
          probability: 0.6,
          successEffect: { positionChange: 2 },
          failEffect: { pointsChange: 0 }
        }
      }
    ]
  },
  {
    id: "competing-offers",
    name: "Competing Client Demands",
    type: "choice",
    description: "Two major clients want you staffed the same week. Choose wisely - one is higher profile, the other has better margins.",
    emoji: "⚖️",
    choices: [
      {
        text: "Fortune 100 client - High visibility (guaranteed +2 points)",
        effect: {
          pointsChange: 2
        }
      },
      {
        text: "Boutique PE firm - Complex work (70% chance: +1 space + hint, 30% chance: +1 point)",
        effect: {
          probability: 0.7,
          successEffect: { positionChange: 1, creditsChange: { fiveWordHint: 1 } },
          failEffect: { pointsChange: 1 }
        }
      }
    ]
  },
  {
    id: "industry-pivot",
    name: "Industry Pivot Opportunity",
    type: "choice",
    description: "Partner asks you to switch from Tech to Healthcare practice. You'd start from scratch but it's a growth area.",
    emoji: "🏥",
    choices: [
      {
        text: "Stay in Tech - Keep your expertise (+1 point safe)",
        effect: {
          pointsChange: 1
        }
      },
      {
        text: "Pivot to Healthcare - High risk, high reward (50% chance: +2 spaces, 50% chance: -1 space)",
        effect: {
          probability: 0.5,
          successEffect: { positionChange: 2 },
          failEffect: { positionChange: -1 }
        }
      }
    ]
  },
  {
    id: "mba-decision",
    name: "MBA Leave Decision",
    type: "choice",
    description: "You're accepted to a top MBA program with firm sponsorship. Take 2 years off or stay on the partner track?",
    emoji: "🎓",
    choices: [
      {
        text: "Pursue MBA - Network + skills (guaranteed +2 spaces but lose 2 points)",
        effect: {
          positionChange: 2,
          pointsChange: -2
        }
      },
      {
        text: "Stay at firm - Keep momentum (guaranteed +2 points)",
        effect: {
          pointsChange: 2
        }
      }
    ]
  },
  {
    id: "internal-politics",
    name: "Partner Politics",
    type: "choice",
    description: "Two senior partners are competing for Practice Head. Each wants your support. Pick a side carefully.",
    emoji: "🤐",
    choices: [
      {
        text: "Support Partner A - Rising star, risky (60% chance: +3 points, 40% chance: -1 point)",
        effect: {
          probability: 0.6,
          successEffect: { pointsChange: 3 },
          failEffect: { pointsChange: -1 }
        }
      },
      {
        text: "Support Partner B - Established, safe (guaranteed +1 point)",
        effect: {
          pointsChange: 1
        }
      }
    ]
  },
  {
    id: "startup-equity",
    name: "Startup Client Equity Offer",
    type: "choice",
    description: "Cash-strapped startup offers 0.5% equity instead of consulting fees. Could be worth millions... or nothing.",
    emoji: "💰",
    choices: [
      {
        text: "Take equity - Swing for the fences (20% chance: +4 points + 1 space, 80% chance: -2 points)",
        effect: {
          probability: 0.2,
          successEffect: { pointsChange: 4, positionChange: 1 },
          failEffect: { pointsChange: -2 }
        }
      },
      {
        text: "Take cash - Play it safe (guaranteed +1 point)",
        effect: {
          pointsChange: 1
        }
      }
    ]
  },
  {
    id: "weekend-work",
    name: "Weekend Emergency Request",
    type: "choice",
    description: "Client CEO needs analysis by Monday morning. It's your anniversary weekend. What do you do?",
    emoji: "📅",
    choices: [
      {
        text: "Work the weekend - Sacrifice personal life (guaranteed +1 space)",
        effect: {
          positionChange: 1
        }
      },
      {
        text: "Delegate to junior - Risky move (50% chance: +1 point, 50% chance: -2 points)",
        effect: {
          probability: 0.5,
          successEffect: { pointsChange: 1 },
          failEffect: { pointsChange: -2 }
        }
      }
    ]
  },
  {
    id: "whistleblower",
    name: "Ethics Dilemma",
    type: "choice",
    description: "You discover a partner overbilling a client. Report it or stay quiet? Your career hangs in the balance.",
    emoji: "⚖️",
    choices: [
      {
        text: "Report it - Do the right thing (guaranteed +3 points but -1 space)",
        effect: {
          pointsChange: 3,
          positionChange: -1
        }
      },
      {
        text: "Stay quiet - Protect your career (50% chance: nothing happens, 50% chance: -3 points)",
        effect: {
          probability: 0.5,
          successEffect: { pointsChange: 0 },
          failEffect: { pointsChange: -3 }
        }
      }
    ]
  },
  {
    id: "overseas-transfer",
    name: "London Office Transfer",
    type: "choice",
    description: "Firm offers you 2 years in the London office leading European expansion. Career-defining or derailing?",
    emoji: "🌍",
    choices: [
      {
        text: "Accept transfer - High risk, high reward (65% chance: +3 spaces, 35% chance: -1 space)",
        effect: {
          probability: 0.65,
          successEffect: { positionChange: 3 },
          failEffect: { positionChange: -1 }
        }
      },
      {
        text: "Decline - Stay in home office (guaranteed +1 point)",
        effect: {
          pointsChange: 1
        }
      }
    ]
  },

  // ========== RISK PATH EVENTS ==========
  {
    id: "startup-pivot",
    name: "Startup Pivot or Burn",
    type: "choice",
    description: "The startup is running out of runway. The founders want to pivot. Stay or jump ship?",
    emoji: "🚀",
    choices: [
      {
        text: "Stay committed - Ride or die (70% chance: +4 points, 30% chance: -2 spaces)",
        effect: {
          probability: 0.7,
          successEffect: { pointsChange: 4 },
          failEffect: { positionChange: -2 }
        }
      },
      {
        text: "Jump ship - Return to consulting safely (guaranteed +1 space)",
        effect: {
          positionChange: 1
        }
      }
    ]
  },
  {
    id: "deal-closes",
    name: "M&A Deal Closing",
    type: "choice",
    description: "The M&A deal is about to close. Lead the integration or hand it off?",
    emoji: "💼",
    choices: [
      {
        text: "Lead integration - High visibility, high risk (60% chance: Skip to Partner, 40% chance: back to Director)",
        effect: {
          probability: 0.6,
          successEffect: { positionChange: 999 }, // Code will handle "skip to 18"
          failEffect: { positionChange: -1 }
        }
      },
      {
        text: "Hand it off - Play it safe (guaranteed +2 points)",
        effect: {
          pointsChange: 2
        }
      }
    ]
  }
];

/**
 * Get a random event by type, excluding recent events to avoid repetition
 */
export function getRandomEvent(type: EventType, excludeIds: string[] = []): GameEvent {
  const availableEvents = gameEvents.filter(e =>
    e.type === type && !excludeIds.includes(e.id)
  );

  if (availableEvents.length === 0) {
    // If all events used, reset and pick from all
    const allOfType = gameEvents.filter(e => e.type === type);
    return allOfType[Math.floor(Math.random() * allOfType.length)];
  }

  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

/**
 * Get event by ID
 */
export function getEventById(id: string): GameEvent | undefined {
  return gameEvents.find(e => e.id === id);
}
