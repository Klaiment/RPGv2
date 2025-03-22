export class CharacterStats {
  static getInitialStats(characterClass) {
    switch (characterClass.toLowerCase()) {
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
}

