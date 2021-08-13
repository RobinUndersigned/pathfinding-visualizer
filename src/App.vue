<template>
  <div id="visualizer">
    <HeaderComponent
      ref="headerComponent"
      @clearGrid="clearGrid"
      @visualize="visualizeAlgorithm"
    />

    <GridComponent
      ref="gridComponent"
      :grid="grid"
    />
  </div>
</template>

<script>
import GridComponent from "./components/Grid/GridComponent";
import HeaderComponent from "./components/HeaderComponent";
import Node from "./lib/Node";

export default {
  name: 'App',
  components: {
    GridComponent,
    HeaderComponent
  },
  data() {
    return {
      rowMax: 32,
      colMax: 56,
      grid: [],
      selectedAlgorithm: null
    }
  },
  mounted() {
    for(let row = 0; row < this.rowMax; row++) {
      const currentRow = []
      for(let col = 0; col < this.colMax; col++) {
        const node = new Node(col, row,);
        currentRow.push(node);
      }
      this.grid.push(currentRow);
    }
  },
  methods: {
    clearGrid() {
     this.$refs.gridComponent.clearGrid();
    },

    async visualizeAlgorithm(algorithm) {
      this.$refs.gridComponent.dijkstra();
      await this.$refs.gridComponent.animateDijkstra();
      await this.$refs.gridComponent.animateShortestPath();
    }
  },
}
</script>

<style>
:root {
  --main-bg-color: white;
  --text-color-main: #1b272c;
  --font-family-main: Lato,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  --background-main: #ffffff;
  --background-secondary: #001f3f;
  --node-size: 25px;
  --grid-border-color: #111111;
  --bg-node-visizted: red;
}

* {
  box-sizing: border-box;
}

button, label, input, select {
  outline: none;
}

html {
  height: 100%;
}

body {
  color: var(--text-color-main);;
  cursor: auto;
  font-family: var(--font-family-main);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin: 0;
  padding:0;
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#visualizer {
  height: 100vh;
  width: 100vw;
}
</style>
