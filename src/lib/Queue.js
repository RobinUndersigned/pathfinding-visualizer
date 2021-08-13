export class Queue {
  constructor() {
    this.a = [];
    this.b = 0;
  }
  getLength() {
    return this.a.length - this.b;
  };
  isEmpty() {
    return this.a.length == 0;
  };
  enqueue(b) {
    this.a.push(b);
  };
  dequeue() {
    if (0 != this.a.length) {
      let c = this.a[this.b];
      2 * ++this.b >= this.a.length && ((this.a = this.a.slice(this.b)), (this.b = 0));
      return c;
    }
  };
  peek() {
    return 0 < this.a.length ? this.a[this.b] : void 0;
  };
  show(){
    return this.a;
  }
  sortByDistance() {
    this.a.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
}
