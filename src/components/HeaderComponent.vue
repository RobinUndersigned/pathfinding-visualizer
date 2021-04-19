<template>
  <header id="header-container" class="header-container">
    <div class="header-container-inner">
      <div id="logo" class="logo">
        <h1>Pathfinding Visualizer</h1>
      </div>
      <div id="header-controls-container" class="header-controls-container">
        <div id="header-controls" class="header-controls">
          <div class="header-controls-algorithm">
            <label for="algorithm">Select algorithm:</label>
            <select name="algorithm" id="algorithm">
              <option value="1">Dijkstra’s Algorithm</option>
              <option value="2">A* Search</option>
              <option value="3">Bellman-Ford’s Algorithm</option>
              <option value="4">Depth First Search</option>
            </select>
          </div>
          <button v-on:click="clearGrid">Clear Grid</button>
          <button>Reset Pointers</button>
          <button>Visualize</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>

</style>