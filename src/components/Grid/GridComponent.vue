<template>
  <div class="container">
    <div
      v-if="!hasStart"
      class="alert alert-hint"
    >
      Lege zunächst den Startpunkt fest!
    </div>

    <div
      v-if="hasStart && !hasTarget"
      class="alert alert-hint"
    >
      Lege jetzt noch Zielpunkt fest!
    </div>

    <div
      v-if="hasStart && hasTarget"
      class="alert alert-success"
    >
      Du kannst per Click & Drag nun optional noch Mauern auf dem Grid platzieren.
    </div>
  </div>
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
import {mapGetters, mapState} from "vuex";

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
    ...mapGetters(['hasStart', 'hasTarget']),
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
   async dijkstra() {
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
        await this.animateCurrentNode(closestNode);
        await this.animateVisited(closestNode);


        const unvisitedNeighbors = this.getUnvisitedNeighbors(closestNode);
        this.updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
      }
    },
    animateVisited(currentNode) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.getGrid[currentNode.y][currentNode.x].animateVisited = !currentNode.isStart ? true : false;
          resolve();
        }, 10);
      })
    },
    animateCurrentNode(currentNode) {
      this.getGrid[currentNode.y][currentNode.x].isCurrentNode = true;
      return new Promise(resolve => {
        setTimeout(() => {
            this.getGrid[currentNode.y][currentNode.x].isCurrentNode = false;
            resolve()
        }, 10);
      })
    },
    animateShortestPath() {
      this.setShortestPath();
      return new Promise (resolve => {
        for (let i = 0; i < this.shortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = this.shortestPathOrder[i];
            if (node) {
              this.getGrid[node.y][node.x].isOnShortestPath = true;
            } else {
              resolve();
            }
          }, 50 * i);
        }
      })

    },
    updateUnvisitedNeighbors(node, neighbors) {
      for (const neighbor of neighbors) {
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
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.alert {
  padding: 0.75rem 1rem;
  border: 1px solid;
  border-radius: 5px;
  margin: 1.5rem 0;
  box-shadow: rgba(0,0,0,0.15) 0 0 3px;
}

.alert-hint {
  background: var(--alert-hint-bg);
  border-color: var(--alert-hint-border);
  color: var(--alert-hint-color);
}

.alert-success {
  background: var(--alert-success-bg);
  border-color: var(--alert-success-border);
  color: var(--alert-success-color);
}

.grid-container {
  flex: 1 1 100%;
  display: block;
  height: 700px;
}

.grid {
  height: 700px;
  width: 1400px;
  margin: 1rem auto;
}
</style>
