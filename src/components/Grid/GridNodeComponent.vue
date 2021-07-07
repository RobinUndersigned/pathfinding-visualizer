<template>
  <div class="grid-node-container">
    <div class="grid-node" v-on:mouseover="putWall" v-on:click.exact="hold = !hold" v-on:click.ctrl="update()" v-bind:class="{ start: gridNode.isStart, goal: gridNode.isGoal, wall: gridNode.isWall, visited: gridNode.visited, unvisited: !gridNode.visited }"></div>
  </div>

</template>

<script>
export default {
  name: "GridNodeComponent",
  props: ["gridNode"],
  data() {
    return {
      hold: false,
      draw: true,
    }
  },
  methods: {
    putWall() {
      if (this.hold === true && this.draw == true) {
        console.log("fire!");
        this.node.isWall = true;
      }
    }
  },
  computed: {
    node() {
      return this.gridNode;
    }
  }
}

</script>

<style scoped>
.grid-node-container {
  border-top: 1px solid var(--grid-border-color);
  border-left: 1px solid var(--grid-border-color);
}

.grid-node-container {
  width: var(--node-size);
  height: var(--node-size);
}

.grid-node {
  width: calc(var(--node-size) - 1px);
  height: calc(var(--node-size) - 1px);
}

.grid-node-container:last-of-type {
  border-right: 1px solid var(--grid-border-color);
}

.grid-row:last-of-type > .grid-node-container {
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

@keyframes visited {
  from {
    transform: scale(0.1);
    background-color: rgba(20, 31, 0, 0.89);
  }
  to {
    transform: scale(1);
    background-color: rgba(136, 247, 223, 0.699);
  }
}
.grid-node.visited {
  background-color: rgba(255, 255, 255, 0.89);
  animation-name: visited;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
</style>