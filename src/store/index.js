import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            definePath: false,
            startNode: null,
            goalNode: null,
        }
    },
    mutations: {
        toggleDefinePathState (state, value) {
            state.definePath = value;
        },
        setStartNode (state, node) {
            state.startNode = node;
        },
        setGoalNode (state, node) {
            state.goalNode = node;
        },
    }
})

export default store;