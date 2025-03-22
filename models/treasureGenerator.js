import { Item } from "./item.js"

export class TreasureGenerator {
  static generateTreasure() {
    const gold = Math.floor(Math.random() * 50) + 10

    const items = []
    if (Math.random() > 0.5) {
      items.push(Item.generatePotion())
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
      items.push(Item.generateWeapon(1))
    }

    return {
      gold,
      items,
      description: "Un coffre contenant des trésors!",
      collected: false,
    }
  }
}

