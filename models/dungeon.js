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
        const room = {
          x,
          y,
          walls: {
            N: Math.random() > 0.7,
            S: Math.random() > 0.7,
            E: Math.random() > 0.7,
            O: Math.random() > 0.7,
          },
          monster: null,
          treasure: null,
          visited: false,
        }

        const roomContent = Math.random()
        if (roomContent < 0.3) {
          room.monster = this.generateMonster(Math.floor(Math.random() * 3) + 1)
        } else if (roomContent < 0.5) {
          room.treasure = this.generateTreasure()
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

  generateMonster(level) {
    const monsterTypes = [
      { name: "Gobelin", hp: 20, maxHp: 20, attack: 5, defense: 3 },
      { name: "Squelette", hp: 25, maxHp: 25, attack: 6, defense: 2 },
      { name: "Loup", hp: 15, maxHp: 15, attack: 7, defense: 1 },
      { name: "Orc", hp: 35, maxHp: 35, attack: 8, defense: 4 },
      { name: "Zombie", hp: 30, maxHp: 30, attack: 6, defense: 5 },
    ]

    const monsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)]

    return {
      name: monsterType.name,
      level,
      hp: monsterType.hp * level,
      maxHp: monsterType.hp * level,
      attack: monsterType.attack * level,
      defense: monsterType.defense * level,
      defeated: false,
    }
  }

  generateTreasure() {
    const gold = Math.floor(Math.random() * 50) + 10

    const items = []
    if (Math.random() > 0.5) {
      items.push({
        name: "Potion de soin",
        type: "potion",
        description: "Restaure 20 points de vie.",
        effect: { hp: 20 },
      })
    }

    if (Math.random() > 0.7) {
      items.push({
        name: "Potion de mana",
        type: "potion",
        description: "Restaure 15 points de mana.",
        effect: { mp: 15 },
      })
    }

    if (Math.random() > 0.9) {
      items.push({
        name: "Épée en fer",
        type: "weapon",
        description: "Une épée solide qui augmente votre force de 5.",
        effect: { strength: 5 },
      })
    }

    return {
      gold,
      items,
      description: "Un coffre contenant des trésors!",
      collected: false,
    }
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

