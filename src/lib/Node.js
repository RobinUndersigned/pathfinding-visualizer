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
        this.distance = Infinity;
        this.previousNode = null;
    }

    reset() {
      this.isStart = false;
      this.isTarget = false;
      this.isWall = false;
      this.isOnShortestPath = false;
      this.isOnShortestPath = false;
      this.isCurrentNode = false;
      this.animateVisited = false;
      this.visited = false;
      this.distance = Infinity;
      this.previousNode = null;
      this.animateVisited = false;
    }
}

export default Node;
