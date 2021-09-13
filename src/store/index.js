import { createStore } from 'vuex'
import Node from "../lib/Node";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            definePath: false,
            startNode: null,
            targetNode: null,
            shortestPathExists: true,
            hasShortestPath: false,
            algorithmSpeed: 1,
            selectedAlgorithm: "dijkstra",
            isRunning: false,
        }
    },
  getters: {
      hasStart: (state) => {
        return state.startNode != null;
      },
      hasTarget: (state) => {
        return state.targetNode != null;
      },
      algorithmSpeed: (state) => {
        return state.algorithmSpeed;
      },
      algorithm: (state) => {
        return state.selectedAlgorithm;
      }
  },
    mutations: {
        toggleDefinePathState (state, value) {
            state.definePath = value;
        },
        setRunningState (state, value) {
          state.isRunning = value;
        },
        setStartNode (state, node) {
            state.startNode = node;
        },
        setTargetNode (state, node) {
            state.targetNode = node;
        },
        setShortestPathExists (state, value) {
          state.shortestPathExists = value;
        },
        setHasShortestPath (state, value) {
          state.hasShortestPath = value;
        },
        setAlgorithmSpeed (state, algorithmSpeed) {
          switch(algorithmSpeed){
            case "1":
              state.algorithmSpeed = 25;
              break;
            case "2":
              state.algorithmSpeed = 10;
              break;
            case "3":
              state.algorithmSpeed = 1;
              break;
          }
        },
        setSelectedAlgorithm (state, selectedAlgorithm) {
          state.selectedAlgorithm = selectedAlgorithm;
        },
        resetState (state) {
          state.startNode = null;
          state.targetNode = null;
          state.isRunning = false;
          state.shortestPathExists = true;
          state.hasShortestPath = false;
        },
    }
})

export default store;
