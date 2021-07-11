import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            definePath: false,
        }
    },
    mutations: {
        toggleDefinePathState (state, value) {
            state.definePath = value;
        },
    }
})

export default store;