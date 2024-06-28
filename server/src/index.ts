import express from 'express';
import cors from 'cors';
import FSM from './fsm';
import { STATES, EVENTS } from '../../react-app/src/constants';

const app = express();
app.use(cors());  // Enable CORS
app.use(express.json());

const fsm = new FSM({
  initial: STATES.STATE_A,
  states: {
    [STATES.STATE_A]: { on: { [EVENTS.TO_B]: STATES.STATE_B } },
    [STATES.STATE_B]: { on: { [EVENTS.TO_C]: STATES.STATE_C } },
    [STATES.STATE_C]: { on: { [EVENTS.BACK_TO_B]: STATES.STATE_B, [EVENTS.TO_D]: STATES.STATE_D } },
    [STATES.STATE_D]: { on: { [EVENTS.TO_E]: STATES.STATE_E } },
    [STATES.STATE_E]: { on: {} }  // State E has no further transitions
  }
});

app.get('/api/state', (req, res) => {
  res.json({ state: fsm.getState() });
});

app.post('/api/transition', (req, res) => {
  try {
    const { event } = req.body;
    fsm.transition(event);
    res.json({ state: fsm.getState() });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.post('/api/reset', (req, res) => {
  fsm.reset();
  res.json({ state: fsm.getState() });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});