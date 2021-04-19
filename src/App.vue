<template>
    <HeaderComponent></HeaderComponent>

    <GridComponent v-bind:grid="this.grid"></GridComponent>

</template>

<script>
import GridComponent from "./components/Grid/GridComponent";
import HeaderComponent from "./components/HeaderComponent";
export default {
  name: 'App',
  components: {
    GridComponent,
    HeaderComponent
  },
  data() {
    return {
      rowMax: 20,
      colMax: 40,
      grid: []
    }
  },
  methods: {
    clearGrid() {
      this.grid.forEach(row => {
        row.forEach(node => {
          node.isStart = false;
          node.isGoal = false;
          node.isWall = false;
        })
      })
    }
  },
  mounted() {
    for(let row = 0; row < this.rowMax; row++) {
      const currentRow = []
      for(let col = 0; col < this.colMax; col++) {
        let node = {
          x: col,
          y: row,
          isStart: row == 3 && col == 5,
          isGoal: row == 14 && col == 33,
          isWall: row == 18 && col == 27
        }
        currentRow.push(node);
      }
      this.grid.push(currentRow);
    }
  }
}
</script>

<style>
:root {
  --main-bg-color: white;
  --text-color-main: #1b272c;
  --font-family-main: Lato,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  --background-main: #ffffff;
  --background-secondary: #001f3f;
  --node-size: 30px;
  --grid-border-color: #111111;
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

.grid-container {
  flex: 1 1 100%;
  display: block;
  height: 600px;
}

.grid {
  height: 600px;
  width: 1200px;
  margin: 1rem auto;
}

.grid-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 30px;
}

.grid-node {
  width: var(--node-size);
  height: var(--node-size);
  border-top: 1px solid var(--grid-border-color);
  border-left: 1px solid var(--grid-border-color);
}

.grid-node:last-of-type {
  border-right: 1px solid var(--grid-border-color);
}

.grid-row:last-of-type > .grid-node {
  border-bottom: 1px solid var(--grid-border-color);
}

.grid-node.start {
  background-color: #01FF70;
}

.grid-node.goal {
  background-color: #FF4136;
}

.grid-node.wall {
  background-color: var(--grid-border-color);
}

</style>
