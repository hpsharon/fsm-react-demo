interface StateConfig {
  on?: { [event: string]: string };
}

interface FSMConfig {
  initial: string;
  states: { [state: string]: StateConfig };
}

class FSM {
  private state: string;
  private states: { [state: string]: StateConfig };

  constructor(config: FSMConfig) {
    this.state = config.initial;
    this.states = config.states;
  }

  transition(event: string): void {
    const currentState = this.states[this.state];
    if (currentState && currentState.on && currentState.on[event]) {
      this.state = currentState.on[event];
    } else if (event === 'RESET') {
      this.reset();
    } else {
      throw new Error(`Event ${event} not valid from state ${this.state}`);
    }
  }

  reset(): void {
    this.state = 'StateA'; // Always resets to StateA
  }

  getState(): string {
    return this.state;
  }
}

export default FSM;
