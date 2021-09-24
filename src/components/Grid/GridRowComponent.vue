<template>
  <div class="grid-row">
    <GridNodeComponent
      v-for="node in gridRow"
      :id="node.x + '-' + node.y"
      :key="node.id"
      :grid-node="node"
    />
  </div>
</template>

<script>
import GridNodeComponent from './GridNodeComponent';
export default {
  name: 'GridRowComponent',
  components: {
    GridNodeComponent
  },
  props: {
    gridRow: {
      type: Array,
      default: null,
    },
    rowId: {
      type: Number,
      default: null,
    }
  },
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
