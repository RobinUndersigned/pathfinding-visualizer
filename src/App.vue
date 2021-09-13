<template>
  <div id="visualizer">
    <div
      id="modal-overlay"
      class="modal-overlay"
    >
      <div class="modal modal-container">
        <div class="modal-header">
          Algorithmusinfo
        </div>
        <div class="modal-content-container">
          <div class="modal-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores blanditiis corporis doloremque, doloribus fuga incidunt inventore ipsam libero modi nam nisi perspiciatis possimus, quaerat saepe tempora vel voluptas voluptates?
          </div>
        </div>
      </div>
    </div>
    <HeaderComponent
      ref="headerComponent"
      @clearGrid="clearGrid"
      @visualize="visualizeAlgorithm"
    />

    <GridComponent
      ref="gridComponent"
      :grid="grid"
      :row-max="rowMax"
      :col-max="colMax"
    />
  </div>
</template>

<script>
import GridComponent from "./components/Grid/GridComponent";
import HeaderComponent from "./components/HeaderComponent";
import Node from "./lib/Node";
import {mapState} from "vuex";

export default {
  name: 'App',
  components: {
    GridComponent,
    HeaderComponent
  },
  data() {
    return {
      rowMax: 22,
      colMax: 56,
      grid: [],
    }
  },
  computed: {
    ...mapState(['shortestPathExists']),
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
      this.$store.commit('setRunningState', true);
      switch(algorithm) {
        case "dijkstra":
          await this.$refs.gridComponent.dijkstra();
          this.$refs.gridComponent.setShortestPath()
          if(this.shortestPathExists) {
            this.$store.commit('setHasShortestPath', true)
            await this.$refs.gridComponent.animateShortestPath();
          }
          break;
        case "astar":
          await this.$refs.gridComponent.aStar();
          this.$refs.gridComponent.setShortestPath()
          if(this.shortestPathExists) {
            this.$store.commit('setHasShortestPath', true)
            await this.$refs.gridComponent.animateShortestPath();
          }
          break;
      }
      console.log("test");
      this.$store.commit('setRunningState', false);
    }
  },
}
</script>

<style>
:root {
  --main-bg-color: white;
  --secondary-bg-color: #f1f1f1;
  --tertiary-bg-color: #e6e6e6;
  --text-color-main: #1b272c;
  --font-family-main: Lato,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  --background-main: #ffffff;
  --background-secondary: #001f3f;
  --node-size: 25px;
  --grid-border-color: var(--background-secondary);
  --alert-hint-bg: #fffcd1;
  --alert-hint-border: #dcbd32;
  --alert-hint-color: var(--alert-hint-border);
  --alert-success-bg: #ecfde8;
  --alert-success-border: #60b42c;
  --alert-success-color: var(--alert-success-border);
  --alert-error-bg: #ffa0a0;
  --alert-error-border: rgba(180, 44, 49, 0.91);
  --alert-error-color: var(--alert-error-border);
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
  font-size: 16px;
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
  position: relative;
}

.modal-overlay {
  position: absolute;
  inset: -100%;
  background: rgba(0,0,0,.75);
  display: flex;
  align-items: center;
  display: none;
}

.modal-container {
  background: white;
  width: 800px;
  margin: auto;
  border-radius: 5px;
  box-shadow: rgba(0,0,0,.75) 0px 0px 25px;
}

.modal-header {
  color: var(--text-color-main);
  font-size: 1.5rem;
  padding: 0.75em;
  background: var(--secondary-bg-color);
  border-bottom: var(--tertiary-bg-color) 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.modal-content-container {
  max-height: 700px;
  overflow: scroll;
}

.modal-content {
  padding: 0.75em 1.5em;
  color: var(--text-color-main);
  height: auto;
  line-height: 1.5;
}
</style>
