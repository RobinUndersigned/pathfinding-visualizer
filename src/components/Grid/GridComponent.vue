<template>
  <div class="container">
    <div
      v-if="!hasStart"
      class="alert alert-hint"
    >
      Lege zunächst den Startpunkt fest!
    </div>

    <div
      v-if="hasStart && !hasTarget && (shortestPathExists || !shortestPathExists)"
      class="alert alert-hint"
    >
      Lege jetzt noch einen Zielpunkt fest!
    </div>

    <div
      v-if="hasStart && hasTarget && shortestPathExists"
      class="alert alert-success"
    >
      Du kannst per Click & Drag nun optional noch Mauern auf dem Grid platzieren.
    </div>

    <div
      v-if="!shortestPathExists"
      class="alert alert-error"
    >
      Es existiert kein kürzester Pfad, da das Ziel nicht erreicht werden kann!
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
import Node from "../../lib/Node";

export default {
  name: "GridComponent",
  components: {
    GridRowComponent
  },
  props: {
    grid: {
      type: Array,
      default: null,
    },
    rowMax: {
      type: Number,
      default: null,
    },
    colMax: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      queuedNodes: null,
      running: false,
      visitedNodesInOrder: [],
      shortestPathInOrder: [],
    };
  },
  computed: {
    ...mapState(['startNode', 'targetNode', 'algorithmSpeed', 'shortestPathExists', 'selectedAlgorithm']),
    ...mapGetters(['hasStart', 'hasTarget']),
    getGrid() {
      return this.grid;
    }
  },
  methods: {
    clearGrid(){
      this.visitedNodesInOrder = [];
      this.shortestPathInOrder = [];
      this.queuedNodes = null;
      this.grid.forEach(row => {
        row.forEach(node => {
          node.reset()
          this.$store.commit('resetState');
        })
      })
    },
    resetVisitedNodes() {
      this.visitedNodes.flatMap(node => node.reset());
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

      while (!this.queuedNodes.isEmpty()) {
        this.queuedNodes.sortByDistance();
        const closestNode = this.queuedNodes.dequeue();
        if (closestNode === this.targetNode) return;
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return;
        closestNode.visited = true;

        this.visitedNodesInOrder.push(closestNode);
        await this.animateCurrentNode(closestNode);
        await this.animateVisited(closestNode);

        const unvisitedNeighbors = this.getUnvisitedNeighbors(closestNode);
        await this.updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
      }
    },
    async aStar() {
      if (!this.startNode || !this.targetNode) return false;
      this.queuedNodes = this.queueNodes();

      while (!this.queuedNodes.isEmpty()) {
        this.queuedNodes.sortByHeuristicDistance();
        const closestNode = this.queuedNodes.dequeue();
        if (closestNode === this.targetNode) return;
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return;
        closestNode.visited = true;

        this.visitedNodesInOrder.push(closestNode);
        await this.animateCurrentNode(closestNode);
        await this.animateVisited(closestNode);

        const unvisitedNeighbors = this.getUnvisitedNeighbors(closestNode);
        await this.updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
      }
    },
    /**
     * Animates visited nodes by using a timed promise
     * @returns {Promise<Node>}
     */
    animateVisited(currentNode) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.getGrid[currentNode.y][currentNode.x].animateVisited = !currentNode.isStart;
          resolve();
        }, 10  * this.algorithmSpeed);
      })
    },
    /**
     * Animates the current node by using a timed promise
     * @returns {Promise<Node>}
     */
    animateCurrentNode(currentNode) {
      this.getGrid[currentNode.y][currentNode.x].isCurrentNode = true;
      return new Promise(resolve => {
        setTimeout(() => {
            this.getGrid[currentNode.y][currentNode.x].isCurrentNode = false;
            resolve()
        }, 10 * this.algorithmSpeed);
      })
    },
    /**
     * Animates the shortest path by using a timed promise
     * @returns {Promise<Node>}
     */
    animateShortestPath() {
      return new Promise ((resolve, reject) => {
        if (!this.shortestPathExists) reject();
        for (let i = 0; i < this.shortestPathInOrder.length; i++) {
          setTimeout(() => {
            const node = this.shortestPathInOrder[i];
            this.getGrid[node.y][node.x].isOnShortestPath = true;
          }, 50 * i);
        }
        resolve();
      })

    },
    /**
     * Updates Poperties on unvisited neighbors
     * @param node
     * @param neighbors
     * @returns {Promise<unknown>}
     */
    updateUnvisitedNeighbors(node, neighbors) {
      return new Promise(resolve => {
        for (const neighbor of neighbors) {
          this.getGrid[neighbor.y][neighbor.x].distance = node.distance + 1;
          this.getGrid[neighbor.y][neighbor.x].previousNode = node;
          if (this.selectedAlgorithm === "astar") {
            /**
             * @see: https://www.geeksforgeeks.org/a-search-algorithm/
             */
            this.getGrid[neighbor.y][neighbor.x].manhattanDistance = Math.abs(neighbor.x - this.targetNode.x) + Math.abs(neighbor.y - this.targetNode.y);
            this.getGrid[neighbor.y][neighbor.x].heuristicDistance = this.getGrid[neighbor.y][neighbor.x].distance + this.getGrid[neighbor.y][neighbor.x].manhattanDistance;
          }
        }
        resolve();
      })
    },
    /**
     * Gets neighbor nodes from grid
     * @param node
     * @returns {*[]}
     */
    getUnvisitedNeighbors(node) {
      const neighbors = [];
      const {x, y} = node;
      if (y > 0) neighbors.push(this.getGrid[y - 1][x]);
      if (y < this.getGrid.length - 1) neighbors.push(this.getGrid[y + 1][x]);
      if (x > 0) neighbors.push(this.getGrid[y][x - 1]);
      if (x < this.getGrid[0].length - 1) neighbors.push(this.getGrid[y][x + 1]);
      // Only push nodes to neighbors array that haven't been visited and aren't walls
      return neighbors.filter(neighbor => !neighbor.visited && !neighbor.isWall);
    },
    /**
     * Sets the shortest path by going through the previous nodes of the target node
     */
    setShortestPath() {
      if (this.targetNode.previousNode == null) {
        this.$store.commit('setShortestPathExists', false)
        return;
      }
      let currentNode = this.targetNode;
      while (currentNode !== null) {
        this.shortestPathInOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }
      this.$store.commit('setHasShortestPath', true)
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

.alert-error {
  background: var(--alert-error-bg);
  border-color: var(--alert-error-border);
  color: var(--alert-error-color);
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

.grid:hover + .alert {
  bottom: 500px;
}
</style>
