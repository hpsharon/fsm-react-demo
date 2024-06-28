import FSM from './fsm';
import { STATES, EVENTS } from '../../react-app/src/constants';

describe('FSM State Transitions', () => {
  let fsm: FSM;

  beforeEach(() => {
    // Initialize FSM before each test
    fsm = new FSM({
      initial: STATES.STATE_A,
      states: {
        [STATES.STATE_A]: { on: { [EVENTS.TO_B]: STATES.STATE_B } },
        [STATES.STATE_B]: { on: { [EVENTS.TO_C]: STATES.STATE_C } },
        [STATES.STATE_C]: {
          on: {
            [EVENTS.BACK_TO_B]: STATES.STATE_B,
            [EVENTS.TO_D]: STATES.STATE_D,
          },
        },
        [STATES.STATE_D]: { on: { [EVENTS.TO_E]: STATES.STATE_E } },
        [STATES.STATE_E]: { on: {} }, // State E has no further transitions
      },
    });
  });

  test('Initial state is StateA', () => {
    expect(fsm.getState()).toBe(STATES.STATE_A);
  });

  test('StateA to StateB', () => {
    fsm.transition(EVENTS.TO_B);
    expect(fsm.getState()).toBe(STATES.STATE_B);
  });

  test('StateB to StateC', () => {
    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    expect(fsm.getState()).toBe(STATES.STATE_C);
  });

  test('StateC to StateB and back to StateC', () => {
    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    fsm.transition(EVENTS.BACK_TO_B);
    expect(fsm.getState()).toBe(STATES.STATE_B);
    fsm.transition(EVENTS.TO_C);
    expect(fsm.getState()).toBe(STATES.STATE_C);
  });

  test('StateC to StateD to StateE', () => {
    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    fsm.transition(EVENTS.TO_D);
    expect(fsm.getState()).toBe(STATES.STATE_D);
    fsm.transition(EVENTS.TO_E);
    expect(fsm.getState()).toBe(STATES.STATE_E);
  });

  test('Reset from StateE returns to StateA', () => {
    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    fsm.transition(EVENTS.TO_D);
    fsm.transition(EVENTS.TO_E);
    fsm.reset();
    expect(fsm.getState()).toBe(STATES.STATE_A);
  });

  test('Reset can be triggered from any state', () => {
    fsm.transition(EVENTS.TO_B);
    fsm.reset();
    expect(fsm.getState()).toBe(STATES.STATE_A);

    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    fsm.reset();
    expect(fsm.getState()).toBe(STATES.STATE_A);

    fsm.transition(EVENTS.TO_B);
    fsm.transition(EVENTS.TO_C);
    fsm.transition(EVENTS.TO_D);
    fsm.reset();
    expect(fsm.getState()).toBe(STATES.STATE_A);
  });

  test('Attempting invalid transitions should throw an error', () => {
    expect(() => fsm.transition(EVENTS.TO_C)).toThrow();
    fsm.transition(EVENTS.TO_B);
    expect(() => fsm.transition(EVENTS.TO_E)).toThrow();
  });
});
