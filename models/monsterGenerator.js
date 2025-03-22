import { Monster } from "./monsters/monster.js"

export class MonsterGenerator {
  static generateMonster(level) {
    const monsterTypes = [
      { name: "Gobelin", hp: 20, attack: 5, defense: 3 },
      { name: "Squelette", hp: 25, attack: 6, defense: 2 },
      { name: "Loup", hp: 15, attack: 7, defense: 1 },
      { name: "Orc", hp: 35, attack: 8, defense: 4 },
      { name: "Zombie", hp: 30, attack: 6, defense: 5 },
    ]

    const monsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)]

    return new Monster(monsterType.name, level, monsterType.hp, monsterType.attack, monsterType.defense)
  }
}

