import { IMonster } from "../interfaces/imonster.js"

export class Monster extends IMonster {
  constructor(name, level, hp, attack, defense) {
    super(name, level)

    this.hp = hp * level
    this.maxHp = hp * level
    this.attack = attack * level
    this.defense = defense * level
  }

  attack(target) {
    const damage = Math.max(1, this.attack - target.stats.defense)
    target.stats.hp -= damage
    return damage
  }

  takeDamage(damage) {
    this.hp -= damage
    return this.hp <= 0
  }
}

