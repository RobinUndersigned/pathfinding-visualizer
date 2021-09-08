class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isStart = false;
        this.isTarget = false;
        this.isWall = false;
        this.isOnShortestPath = false;
        this.isCurrentNode = false;
        this.animateVisited = false;
        this.visited = false;
        this.manhattanDistance = Infinity;
        this.distance = Infinity;
        this.heuristicDistance = Infinity;
        this.previousNode = null;
    }

    reset() {
      this.isStart = false;
      this.isTarget = false;
      this.isWall = false;
      this.isOnShortestPath = false;
      this.isCurrentNode = false;
      this.animateVisited = false;
      this.visited = false;
      this.manhattanDistance = Infinity;
      this.distance = Infinity;
      this.heuristicDistance = Infinity;
      this.previousNode = null;
      this.animateVisited = false;
    }

    makeStartNode() {
      this.isStart = true;
      this.distance = 0;
      this.manhattanDistance = 0;
      this.heuristicDistance = 0;
    }
}

export default Node;
