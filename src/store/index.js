import { createStore } from 'vuex'
import Node from "../lib/Node";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            definePath: false,
            startNode: null,
            targetNode: null,
        }
    },
  getters: {
      hasStart: (state) => {
        return state.startNode != null;
      },
      hasTarget: (state) => {
        return state.targetNode != null;
      }
  },
    mutations: {
        toggleDefinePathState (state, value) {
            state.definePath = value;
        },
        setStartNode (state, node) {
            state.startNode = node;
        },
        setTargetNode (state, node) {
            state.targetNode = node;
        },
        resetState (state) {
          state.startNode = null;
          state.targetNode = null;
        },
    }
})

export default store;
