<template>
  <div class="grid-row">
    <GridNodeComponent v-for="node in gridRow" v-bind:key="node.id" v-bind:gridNode="node" v-bind:class="{ start: node.isStart, goal: node.isGoal, wall: node.isWall }" class="grid-node"></GridNodeComponent>
  </div>

</template>

<script>
import GridNodeComponent from "./GridNodeComponent";
export default {
  name: "GridRowComponent",
  props: ["gridRow"],
  components: {
    GridNodeComponent
  }
}
</script>

<style scoped>

</style>