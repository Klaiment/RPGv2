import { IItem } from "../interfaces/iitem.js"

export class Weapon extends IItem {
  constructor(name, description, effect) {
    super(name, "weapon", description, effect)
  }

  applyEffect(character) {
    return false
  }

  static createSword(level = 1) {
    const strength = 3 * level
    return new Weapon(level > 1 ? `Épée de niveau ${level}` : "Épée courte", "Une épée légère et rapide.", { strength })
  }

  static createAxe(level = 1) {
    const strength = 5 * level
    return new Weapon(level > 1 ? `Hache de niveau ${level}` : "Hache de bataille", "Une hache puissante mais lente.", {
      strength,
    })
  }

  static createStaff(level = 1) {
    const intelligence = 4 * level
    return new Weapon(level > 1 ? `Bâton de niveau ${level}` : "Bâton magique", "Un bâton qui amplifie les sorts.", {
      intelligence,
    })
  }

  static createDagger(level = 1) {
    const agility = 3 * level
    const strength = 2 * level
    return new Weapon(level > 1 ? `Dague de niveau ${level}` : "Dague", "Une dague rapide et précise.", {
      agility,
      strength,
    })
  }
}

