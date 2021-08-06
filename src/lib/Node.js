class Node {
    constructor(x, y, isStart, isTarget, isWall, visited) {
        this.x = x;
        this.y = y;
        this.isStart = isStart;
        this.isTarget = isTarget;
        this.isWall = isWall;
        this.visited = visited;
    }
}

export default Node;