import { Potion } from "./items/potion.js"
import { Weapon } from "./items/weapon.js"
import { Armor } from "./items/armor.js"

export class Item {
  static generateRandomItem(level) {
    const itemTypes = ["potion", "weapon", "armor"]
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)]

    switch (type) {
      case "potion":
        return Item.generatePotion()
      case "weapon":
        return Item.generateWeapon(level)
      case "armor":
        return Item.generateArmor(level)
      default:
        return Item.generatePotion()
    }
  }

  static generatePotion() {
    const potionTypes = [Potion.createHealthPotion(), Potion.createManaPotion(), Potion.createElixir()]

    return potionTypes[Math.floor(Math.random() * potionTypes.length)]
  }

  static generateWeapon(level) {
    const weaponTypes = [
      Weapon.createSword(level),
      Weapon.createAxe(level),
      Weapon.createStaff(level),
      Weapon.createDagger(level),
    ]

    return weaponTypes[Math.floor(Math.random() * weaponTypes.length)]
  }

  static generateArmor(level) {
    const armorTypes = [
      Armor.createLeatherArmor(level),
      Armor.createChainmail(level),
      Armor.createPlateArmor(level),
      Armor.createRobe(level),
    ]

    return armorTypes[Math.floor(Math.random() * armorTypes.length)]
  }
}

