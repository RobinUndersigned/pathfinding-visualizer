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
            <label for="algorithm">Select algorithm:</label>
            <select
              id="algorithm"
              v-model="selectedAlgorithm"
              name="algorithm"
            >
              <option value="1">
                Dijkstra’s Algorithm
              </option>
              <option value="2">
                A* Search
              </option>
              <option value="3">
                Bellman-Ford’s Algorithm
              </option>
              <option value="4">
                Depth First Search
              </option>
            </select>
          </div>
          <button @click="$emit('clearGrid')">
            Clear Grid
          </button>
          <button>
            Reset Pointers
          </button>
          <button @click="visualize">
            Visualize
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  emits: ['visualize', 'clearGrid'],
  data(){
    return {
      selectedAlgorithm: 1,
    }
  },
  methods: {
    visualize() {
      console.log(this.selectedAlgorithm);
      this.$emit('visualize', this.selectedAlgorithm);
    }
  }
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

.header-controls select {
  padding: .75em 1em;
  border-radius: 5px;
}

.header-controls label {
  display: flex;
  align-self: center;
  flex-direction: row;
  margin-right: 1rem;
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
</style>
