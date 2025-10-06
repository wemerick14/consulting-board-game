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
