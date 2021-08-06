class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isStart = false;
        this.isTarget = false;
        this.isWall = false;
        this.visited = false;
        this.unvisited = true;
    }

    reset() {
      this.isStart = false;
      this.isTarget = false;
      this.isWall = false;
      this.visited = false;
      this.unvisited = true;
    }
}

export default Node;
