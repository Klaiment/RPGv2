import { IItem } from "../interfaces/iitem.js"

export class Armor extends IItem {
  constructor(name, description, effect) {
    super(name, "armor", description, effect)
  }

  applyEffect(character) {
    return false
  }

  static createLeatherArmor(level = 1) {
    const defense = 2 * level
    return new Armor(
      level > 1 ? `Armure en cuir de niveau ${level}` : "Armure en cuir",
      "Une armure légère qui offre une protection de base.",
      { defense },
    )
  }

  static createChainmail(level = 1) {
    const defense = 4 * level
    return new Armor(
      level > 1 ? `Cotte de mailles de niveau ${level}` : "Cotte de mailles",
      "Une armure moyenne qui offre une bonne protection.",
      { defense },
    )
  }

  static createPlateArmor(level = 1) {
    const defense = 6 * level
    const agility = -1 * level
    return new Armor(
      level > 1 ? `Armure de plaques de niveau ${level}` : "Armure de plaques",
      "Une armure lourde qui offre une excellente protection.",
      { defense, agility },
    )
  }

  static createRobe(level = 1) {
    const magicResistance = 3 * level
    const intelligence = 2 * level
    return new Armor(
      level > 1 ? `Robe de mage de niveau ${level}` : "Robe de mage",
      "Une robe qui amplifie les pouvoirs magiques.",
      { magicResistance, intelligence },
    )
  }
}

