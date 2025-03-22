export class CharacterLevelUp {
  static applyLevelUpBonuses(character) {
    switch (character.characterClass.toLowerCase()) {
      case "guerrier":
        character.stats.maxHp += 15
        character.stats.maxMp += 5
        character.stats.strength += 2
        character.stats.defense += 1
        break

      case "mage":
        character.stats.maxHp += 8
        character.stats.maxMp += 15
        character.stats.intelligence += 2
        character.stats.magicResistance += 1
        break

      case "voleur":
        character.stats.maxHp += 10
        character.stats.maxMp += 8
        character.stats.agility += 2
        character.stats.luck += 1
        break
    }
  }
}

