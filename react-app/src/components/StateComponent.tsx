import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import fsmStore from '../stores/fsmStore';
import { EVENTS } from '../constants';

const StateComponent = observer(() => {
  useEffect(() => {
    fsmStore.fetchInitialState();
  }, []);

  const handleTransition = (event: string) => {
    fsmStore.transition(event);
  };

  const handleReset = () => {
    fsmStore.reset();
  };

  return (
    <div>
      <p>Current State: {fsmStore.currentState}</p>
      {fsmStore.error && <p>Error: {fsmStore.error}</p>}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <button onClick={() => handleTransition(EVENTS.TO_B)}>
          To State B
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => handleTransition(EVENTS.TO_C)}>
            To State C
          </button>
          <button onClick={() => handleTransition(EVENTS.BACK_TO_B)}>
            Back to State B
          </button>
        </div>
        <button onClick={() => handleTransition(EVENTS.TO_D)}>
          To State D
        </button>
        <button onClick={() => handleTransition(EVENTS.TO_E)}>
          To State E
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
});

export default StateComponent;
