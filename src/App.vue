<template>
    <header id="header-container" class="header-container">
      <div class="header-container-inner">
        Header
      </div>
    </header>
    <section id="grid-container" class="grid-container">
      <div id="grid" class="grid">
        <div v-for="row in grid" v-bind:key="row.id" class="grid-row">
          <div v-for="node in row" v-bind:key="node.id" v-bind:class="{ start: node.isStart, goal: node.isGoal }" class="grid-node">

          </div>
        </div>
      </div>
    </section>

</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      rowMax: 20,
      colMax: 40,
      grid: []
    }
  },
  methods: {

  },
  mounted() {
    for(let row = 0; row < this.rowMax; row++) {
      const currentRow = []
      for(let col = 0; col < this.colMax; col++) {
        let node = {
          x: col,
          y: row,
          isStart: row == 3 && col == 5,
          isGoal: row == 14 && col == 33
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
  margin: 1rem;
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

</style>
