<template>
  <section id="grid-container" class="grid-container">
    <div id="grid" class="grid">
      <GridRowComponent v-for="(row, index) in grid" v-bind:key="row.id" v-bind:gridRow="row" v-bind:rowId="index" :id="'row' + '-' + index"  class="grid-row"></GridRowComponent>
    </div>
  </section>
</template>

<script>

import GridRowComponent from "./GridRowComponent";

export default {
  name: "GridComponent",
  props: ["grid"],
  components: {
    GridRowComponent
  },
  methods: {
    clearGrid(){
      this.grid.forEach(row => {
        row.forEach(node => {
          node.isStart = false;
          node.isGoal = false;
          node.isWall = false;
          node.visited = false;
          node.unvisited = true;
        })
      })
    }
  }
}
</script>

<style scoped>
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
</style>