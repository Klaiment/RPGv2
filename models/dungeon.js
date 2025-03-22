import { DungeonRoom } from "./dungeonRoom.js"
import { MonsterGenerator } from "./monsterGenerator.js"
import { TreasureGenerator } from "./treasureGenerator.js"

export class Dungeon {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.rooms = []
    this.currentGrid = { x: 0, y: 0 }
  }

  generate() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const room = new DungeonRoom(x, y)

        const roomContent = Math.random()
        if (roomContent < 0.3) {
          room.monster = MonsterGenerator.generateMonster(Math.floor(Math.random() * 3) + 1)
        } else if (roomContent < 0.5) {
          room.treasure = TreasureGenerator.generateTreasure()
        }

        this.rooms.push(room)
      }
    }

    const startRoom = this.getRoomAt(0, 0)
    startRoom.monster = null
    startRoom.treasure = null
    startRoom.visited = true

    this.ensureConnectivity()
  }

  ensureConnectivity() {
    for (const room of this.rooms) {
      const hasExit = !room.walls.N || !room.walls.S || !room.walls.E || !room.walls.O

      if (!hasExit) {
        const directions = ["N", "S", "E", "O"]
        const randomDirection = directions[Math.floor(Math.random() * directions.length)]
        room.walls[randomDirection] = false

        const oppositeDirection = {
          N: "S",
          S: "N",
          E: "O",
          O: "E",
        }[randomDirection]

        let adjacentX = room.x
        let adjacentY = room.y

        switch (randomDirection) {
          case "N":
            adjacentY += 1
            break
          case "S":
            adjacentY -= 1
            break
          case "E":
            adjacentX += 1
            break
          case "O":
            adjacentX -= 1
            break
        }

        if (adjacentX >= 0 && adjacentX < this.width && adjacentY >= 0 && adjacentY < this.height) {
          const adjacentRoom = this.getRoomAt(adjacentX, adjacentY)
          adjacentRoom.walls[oppositeDirection] = false
        }
      }
    }
  }

  getRoomAt(x, y) {
    return this.rooms.find((room) => room.x === x && room.y === y)
  }

  canMove(x, y, direction) {
    const room = this.getRoomAt(x, y)

    if (!room) {
      return false
    }

    if (room.walls[direction]) {
      return false
    }

    let newX = x
    let newY = y

    switch (direction) {
      case "N":
        newY += 1
        break
      case "S":
        newY -= 1
        break
      case "E":
        newX += 1
        break
      case "O":
        newX -= 1
        break
    }

    return newX >= 0 && newX < this.width && newY >= 0 && newY < this.height
  }
}

```tsx file="models/dungeonRoom.js"
export class DungeonRoom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = {
      N: Math.random() > 0.7,
      S: Math.random() > 0.7,
      E: Math.random() > 0.7,
      O: Math.random() > 0.7,
    };
    this.monster = null;
    this.treasure = null;
    this.visited = false;
  }
}

