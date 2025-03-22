import { IItem } from "../interfaces/iitem.js"

export class Potion extends IItem {
  constructor(name, description, effect) {
    super(name, "potion", description, effect)
  }

  applyEffect(character) {
    if (this.effect.hp) {
      character.stats.hp = Math.min(character.stats.hp + this.effect.hp, character.stats.maxHp)
      console.log(`${character.name} récupère ${this.effect.hp} points de vie.`)
    }

    if (this.effect.mp) {
      character.stats.mp = Math.min(character.stats.mp + this.effect.mp, character.stats.maxMp)
      console.log(`${character.name} récupère ${this.effect.mp} points de mana.`)
    }

    return true
  }

  static createHealthPotion(amount = 20) {
    return new Potion("Potion de soin", `Restaure ${amount} points de vie.`, { hp: amount })
  }

  static createManaPotion(amount = 15) {
    return new Potion("Potion de mana", `Restaure ${amount} points de mana.`, { mp: amount })
  }

  static createElixir(amount = 10) {
    return new Potion("Élixir", `Restaure ${amount} points de vie et ${amount} points de mana.`, {
      hp: amount,
      mp: amount,
    })
  }
}

