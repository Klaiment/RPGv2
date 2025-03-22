export class DungeonRoom {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.walls = {
      N: Math.random() > 0.7,
      S: Math.random() > 0.7,
      E: Math.random() > 0.7,
      O: Math.random() > 0.7,
    }
    this.monster = null
    this.treasure = null
    this.visited = false
  }
}

