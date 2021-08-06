<template>
  <div class="grid-row">
    <GridNodeComponent
        v-for="node in gridRow"
        v-bind:key="node.id"
        v-bind:gridNode="node"
        :id="node.x + '-' + node.y"
    ></GridNodeComponent>
  </div>

</template>

<script>
import GridNodeComponent from "./GridNodeComponent";
export default {
  name: "GridRowComponent",
  props: ["gridRow", "rowId"],
  components: {
    GridNodeComponent
  }
}
</script>

<style scoped>
.grid-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: var(--node-size);
}
</style>