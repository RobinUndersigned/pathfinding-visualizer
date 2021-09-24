<template>
  <header
    id="header-container"
    class="header-container"
  >
    <div class="header-container-inner">
      <div
        id="logo"
        class="logo"
      >
        <h1>Pathfinding Visualizer</h1>
        <small>Entwickelt von Robin Decker im Rahmen des Independent Course 1 an der HTW Berlin</small>
      </div>
      <div
        id="header-controls-container"
        class="header-controls-container"
      >
        <div
          id="header-controls"
          class="header-controls"
        >
          <div class="header-controls-algorithm">
            <label for="algorithm">Wählen einen Algorithmus:</label>
            <select
              id="algorithm"
              v-model="selectedAlgorithm"
              :disabled="isRunning"
              name="algorithm"
            >
              <option value="dijkstra">
                Dijkstra’s Algorithm
              </option>
              <option value="astar">
                A* Search
              </option>
              <option value="3">
                Bellman-Ford’s Algorithm
              </option>
              <option value="dfs">
                Depth First Search
              </option>
            </select>
          </div>
          <label
            for="speedSlider"
            class="header-speed-slider-label"
          >
            Algorithmusgeschwindigkeit:
            <input
              id="speedSlider"
              v-model="algorithmSpeed"
              class="header-speed-slider"
              type="range"
              min="1"
              max="3"
              step="1"
            >
          </label>
          <button
            :disabled="isRunning || !hasTarget"
            @click="$emit('clearGrid')"
          >
            Grid leeren
          </button>
          <button
            :disabled="(isRunning || !hasTarget || !shortestPathExists) || hasShortestPath"
            @click="$emit('visualize', selectedAlgorithm);"
          >
            Visualisieren!
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'HeaderComponent',
  emits: ['visualize', 'clearGrid'],
  data(){
    return {
      selectedAlgorithm: "dijkstra",
      algorithmSpeed: "3",
    }
  },
  computed: {
    ...mapState(['isRunning', 'shortestPathExists', 'hasShortestPath']),
    ...mapGetters(['hasStart', 'hasTarget']),
  },
  watch: {
    selectedAlgorithm: {
      deep: true,
      handler() {
        this.$store.commit('setSelectedAlgorithm', this.selectedAlgorithm)
      },
    },
    algorithmSpeed: {
      deep: true,
      handler() {
        this.$store.commit('setAlgorithmSpeed', this.algorithmSpeed);
      },
    },
  },
}
</script>

<style scoped>
.header-container {
  min-height: 100px;
  display: block;
  background: var(--background-secondary);
  border: 1px solid var(--background-secondary);
  color: #80BFFFFF;
}

.header-container-inner {
  padding: 1em 3em;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.logo h1{
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.header-controls-container {
  flex: 1 1 0%;
  padding: 1em 0;
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-controls button {
  padding: .75em 1em;
  background-color: #01FF70;
  border-radius: 5px;
  color: white;
  border: none;
}

.header-controls button:disabled,
.header-controls button[disabled] {
  background-color: #b4b4b4;
}

.header-controls select {
  padding: .75em 1em;
  border-radius: 5px;
}

.header-controls label {
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-right: 1rem;
  font-size: 12px;
}

.header-controls {
  min-width: 80%;
  max-width: 80%;
  display: flex;
  justify-content: space-around;
}

.header-controls-algorithm {
  display: flex;
  flex-direction: row;
}

.header-speed-slider-label {
  position: relative;
  margin-top: -35px;
}

.header-speed-slider-label::before {
  color: white;
  left: 0;
  content: "langsam";
}

.header-speed-slider-label::after {
  color: white;
  right: 0;
  content: "schnell";
}

.header-speed-slider-label::before,
.header-speed-slider-label::after {
  position: absolute;
  top: 45px;
}
</style>
