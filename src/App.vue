<template>
  <main id="main-container" class="main-container">
    <header id="header-container" class="header-container">
      <div class="header-container-inner">
        Header
      </div>
    </header>
    <section id="grid" class="grid-container">
      <div v-for="row in grid" v-bind:key="row.id" class="grid-row">
        <div v-for="node in row" v-bind:key="node.id" class="grid-node">

        </div>
      </div>
    </section>
  </main>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      grid: []
    }
  },
  methods: {

  },
  mounted() {
    for(let row = 0; row < 15; row++) {
      const currentRow = []
      for(let col = 0; col < 40; col++) {
        currentRow.push({x: col, y: row});
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
  --background-secondary: #f5f5f5;
  --node-size: 30px;
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
  min-height: 100vh;
}

.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header-container {
  height: 100px;
  background: linear-gradient(360deg, var(--background-secondary), var(--background-main));
  border: 1px solid var(--background-secondary);
}

.header-container-inner {
  margin: 1rem;
}

.grid-container {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}

.grid-row {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.grid-node {
  width: var(--node-size);
  height: var(--node-size);
  border: 1px solid #1b272c;
}

</style>
