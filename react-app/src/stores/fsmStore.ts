import { makeAutoObservable, runInAction } from 'mobx';
import { fetchState, sendTransition, sendReset } from '../services/api';
import { STATES, EVENTS } from '../constants';

class FSMStore {
  state: string = STATES.STATE_A;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
    this.fetchInitialState();
  }

  async fetchInitialState() {
    try {
      const data = await fetchState();
      runInAction(() => {
        this.state = data.state;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch initial state';
      });
    }
  }

  async transition(event: string) {
    try {
      const data = await sendTransition(event);
      runInAction(() => {
        this.state = data.state;
        this.error = '';
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to transition state';
      });
    }
  }

  async reset() {
    try {
      const data = await sendReset();
      runInAction(() => {
        this.state = data.state;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to reset state';
      });
    }
  }

  get currentState() {
    return this.state;
  }
}

const fsmStore = new FSMStore();
export default fsmStore;
