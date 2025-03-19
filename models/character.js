export class Character {
  constructor(name, characterClass) {
    this.name = name
    this.characterClass = characterClass
    this.level = 1
    this.exp = 0
    this.gold = 0
    this.inventory = []
    this.equipment = {
      weapon: null,
      armor: null,
    }

    this.x = 0
    this.y = 0
    this.orientation = "N"

    this.stats = this.getInitialStats()
  }

  getInitialStats() {
    switch (this.characterClass.toLowerCase()) {
      case "guerrier":
        return {
          hp: 150,
          maxHp: 150,
          mp: 50,
          maxMp: 50,
          strength: 15,
          intelligence: 5,
          defense: 12,
          magicResistance: 6,
          agility: 8,
          luck: 5,
          endurance: 10,
          spirit: 4,
        }

      case "mage":
        return {
          hp: 90,
          maxHp: 90,
          mp: 150,
          maxMp: 150,
          strength: 4,
          intelligence: 15,
          defense: 5,
          magicResistance: 12,
          agility: 7,
          luck: 6,
          endurance: 5,
          spirit: 10,
        }

      case "voleur":
        return {
          hp: 110,
          maxHp: 110,
          mp: 70,
          maxMp: 70,
          strength: 10,
          intelligence: 7,
          defense: 8,
          magicResistance: 7,
          agility: 15,
          luck: 12,
          endurance: 7,
          spirit: 6,
        }

      default:
        return {
          hp: 100,
          maxHp: 100,
          mp: 50,
          maxMp: 50,
          strength: 10,
          intelligence: 10,
          defense: 10,
          magicResistance: 10,
          agility: 10,
          luck: 10,
          endurance: 10,
          spirit: 10,
        }
    }
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

    switch (this.characterClass.toLowerCase()) {
      case "guerrier":
        this.stats.maxHp += 15
        this.stats.maxMp += 5
        this.stats.strength += 2
        this.stats.defense += 1
        break

      case "mage":
        this.stats.maxHp += 8
        this.stats.maxMp += 15
        this.stats.intelligence += 2
        this.stats.magicResistance += 1
        break

      case "voleur":
        this.stats.maxHp += 10
        this.stats.maxMp += 8
        this.stats.agility += 2
        this.stats.luck += 1
        break
    }

    this.stats.hp = this.stats.maxHp
    this.stats.mp = this.stats.maxMp

    console.log(`Félicitations! Vous êtes maintenant niveau ${this.level}!`)
  }
}

