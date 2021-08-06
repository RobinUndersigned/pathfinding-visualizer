<template>
  <section
    id="grid-container"
    class="grid-container"
  >
    <div
      id="grid"
      class="grid"
    >
      <GridRowComponent
        v-for="(row, index) in grid"
        :id="'row' + '-' + index"
        :key="row.id"
        :grid-row="row"
        :row-id="index"
        class="grid-row"
      />
    </div>
  </section>
</template>

<script>

import GridRowComponent from "./GridRowComponent";

export default {
  name: "GridComponent",
  components: {
    GridRowComponent
  },
  props: {
    grid: {
      type: Array,
      default: null,
    }
  },
  methods: {
    clearGrid(){
      console.log("test");
      this.grid.forEach(row => {
        row.forEach(node => {
          node.reset()
          this.$store.commit('resetState');
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
  height: 800px;
  width: 1400px;
  margin: 1rem auto;
}
</style>
