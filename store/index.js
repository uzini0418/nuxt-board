import Vuex from 'vuex';
import board from './board';

const store = () => new Vuex.Store({
  state: {
    user: {
      "id": 101010,
      "name": "test"
    }
  },
  modules: {
    board
  }
})

export default store
