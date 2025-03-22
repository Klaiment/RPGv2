import { ICharacter } from "./interfaces/icharacter.js"
import { CharacterStats } from "./characterStats.js"
import { CharacterEquipment } from "./characterEquipment.js"
import { CharacterLevelUp } from "./characterLevelUp.js"

export class Character extends ICharacter {
  constructor(name, characterClass) {
    super(name, characterClass)

    this.name = name
    this.characterClass = characterClass
    this.level = 1
    this.exp = 0
    this.gold = 0
    this.inventory = []
    this.equipment = new CharacterEquipment()

    this.x = 0
    this.y = 0
    this.orientation = "N"

    this.stats = CharacterStats.getInitialStats(characterClass)
  }

  equip(item) {
    if (item.type === "weapon") {
      if (this.equipment.weapon) {
        this.inventory.push(this.equipment.weapon)
      }

      this.equipment.weapon = item

      const index = this.inventory.indexOf(item)
      if (index !== -1) {
        this.inventory.splice(index, 1)
      }
    } else if (item.type === "armor") {
      if (this.equipment.armor) {
        this.inventory.push(this.equipment.armor)
      }

      this.equipment.armor = item

      const index = this.inventory.indexOf(item)
      if (index !== -1) {
        this.inventory.splice(index, 1)
      }
    }
  }

  gainExp(amount) {
    this.exp += amount

    const expNeeded = this.level * 100
    if (this.exp >= expNeeded) {
      this.levelUp()
    }
  }

  levelUp() {
    this.level += 1
    this.exp = 0

    CharacterLevelUp.applyLevelUpBonuses(this)

    this.stats.hp = this.stats.maxHp
    this.stats.mp = this.stats.maxMp

    console.log(`Félicitations! Vous êtes maintenant niveau ${this.level}!`)
  }
}

