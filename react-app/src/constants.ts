// Define FSM states
export const STATES = {
  STATE_A: 'StateA',
  STATE_B: 'StateB',
  STATE_C: 'StateC',
  STATE_D: 'StateD',
  STATE_E: 'StateE',
} as const;

// Define FSM events
export const EVENTS = {
  TO_B: 'TO_B',
  TO_C: 'TO_C',
  BACK_TO_B: 'BACK_TO_B',
  TO_D: 'TO_D',
  TO_E: 'TO_E',
  RESET: 'RESET',
} as const;
