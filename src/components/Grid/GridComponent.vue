<template>
  <section id="grid-container" class="grid-container">
    <div id="grid" class="grid">
      <div v-for="row in grid" v-bind:key="row.id" class="grid-row">
        <div v-for="node in row" v-bind:key="node.id" v-bind:class="{ start: node.isStart, goal: node.isGoal, wall: node.isWall }" class="grid-node">

        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "GridComponent",
  props: ["grid"],
  components: {

  }
}
</script>

<style scoped>

</style>