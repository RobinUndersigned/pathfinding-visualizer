<template>
  <div class="grid-node-container">
    <div
      class="grid-node"
      :class="{
        start: node.isStart,
        target: node.isTarget,
        wall: node.isWall,
        visited: node.visited,
        animate: node.animateVisited,
        path: node.isOnShortestPath,
        currentNode: node.isCurrentNode,
      }"
      style="font-size: 10px; text-align: center;"
      @click="updateNodeType()"
      @mouseover="drawWall()"
      @mousedown="activateDefinePathState()"
      @mouseup="deactivateDefinePathState()"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Node from '../../lib/Node';
export default {
  name: 'GridNodeComponent',
  props: {
    gridNode: {
      type: Node,
      default: new Node(null, null),
    }
  },
  data() {
    return {
      hold: false,
      draw: true,
    }
  },
  computed: {
    ...mapState(['definePath', 'startNode', 'targetNode']),
    ...mapGetters(['hasStart', 'hasTarget']),
    node() {
      return this.gridNode;
    },
  },
  methods: {
    drawWall() {
      if (this.hasStart && this.hasTarget && this.definePath && !this.node.isWall && !this.node.isTarget && !this.node.isStart) {
        this.node.isWall = true;
      }
    },
    activateDefinePathState() {
      this.$store.commit('toggleDefinePathState', true);
      this.drawWall();
    },
    deactivateDefinePathState() {
      this.$store.commit('toggleDefinePathState', false);
    },
    updateNodeType() {
      if (!this.hasStart) {
        this.node.makeStartNode();
        this.$store.commit('setStartNode', this.node);
      } else if (this.hasStart && !this.hasTarget) {
        this.node.isTarget = true;
        this.$store.commit('setTargetNode', this.node);
      } else {
        this.node.isWall = true;
      }
    },
  },
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
  background: url('~@/assets/images/triangletwo-right.svg') center;
}

.grid-node.target {
  background: url('~@/assets/images/target.svg') center;
}

.grid-node.wall {
  background-color: var(--grid-border-color);
}

@keyframes visited {
  0% {
    transform: scale(.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75)
  }

  100% {
    transform: scale(1.0);
    background-color: rgba(0, 190, 218, 0.75);
  }
}

@keyframes shortestPath {
  0% {
    transform: scale(0.6);
    background-color: rgb(255, 254, 106);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(255, 254, 106);
  }

  100% {
    transform: scale(1);
    background-color: rgb(255, 254, 106);
  }
}

.grid-node.animate {
  animation-name: visited;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.grid-node.path {
  animation-name: shortestPath;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.grid-node.currentNode {
  background: rgb(255, 254, 106);
}
</style>
