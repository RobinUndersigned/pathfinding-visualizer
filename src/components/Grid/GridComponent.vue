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
        v-for="(row, index) in getGrid"
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
import { Queue } from "../../lib/Queue";
import {mapState} from "vuex";

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
  data() {
    return {
      queuedNodes: null,
      visitedNodesInOrder: [],
      shortestPathOrder: [],
    };
  },
  computed: {
    ...mapState(['startNode', 'targetNode']),
    getGrid() {
      return this.grid;
    },
  },
  methods: {
    clearGrid(){
      this.grid.forEach(row => {
        row.forEach(node => {
          node.reset()
          this.$store.commit('resetState');
        })
      })
    },
    queueNodes(){
      const queue = new Queue();
      this.grid.forEach(row => {
        row.forEach(node => {
          queue.enqueue(node)
        })
      })
      return queue;
    },
   dijkstra() {
      if (!this.startNode || !this.targetNode) return false;
      this.queuedNodes = this.queueNodes();

      while (!!this.queuedNodes.getLength()) {
        this.queuedNodes.sortByDistance();
        const closestNode = this.queuedNodes.dequeue();

        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return;
        closestNode.visited = true;

        this.visitedNodesInOrder.push(closestNode);
        if (closestNode === this.targetNode) return;
        this.updateUnvisitedNeighbors(closestNode);
      }
    },
    animateDijkstra() {
      for (let i = 0; i <= this.visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = this.visitedNodesInOrder[i];
          this.getGrid[node.y][node.x].animateVisited = !node.isStart ? true : false;
        }, 10 * i);
      }
    },
    animateShortestPath() {
      this.setShortestPath();
      for (let i = 0; i < this.shortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = this.shortestPathOrder[i];
          this.getGrid[node.y][node.x].isOnShortestPath = true;
        }, 50 * i);
      }
    },
    updateUnvisitedNeighbors(node) {
      const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
      for (const neighbor of unvisitedNeighbors) {
        this.getGrid[neighbor.y][neighbor.x].distance = node.distance + 1;
        this.getGrid[neighbor.y][neighbor.x].previousNode = node;
      }
    },
    getUnvisitedNeighbors(node) {
      const neighbors = [];
      const {x, y} = node;
      if (y > 0) neighbors.push(this.getGrid[y - 1][x]);
      if (y < this.getGrid.length - 1) neighbors.push(this.getGrid[y + 1][x]);
      if (x > 0) neighbors.push(this.getGrid[y][x - 1]);
      if (x < this.getGrid[0].length - 1) neighbors.push(this.getGrid[y][x + 1]);
      return neighbors.filter(neighbor => !neighbor.visited);
    },
    setShortestPath() {
      let currentNode = this.targetNode;
      while (currentNode !== null) {
        this.shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }
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
