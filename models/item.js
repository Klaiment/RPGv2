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
    const potionTypes = [
      {
        name: "Potion de soin",
        description: "Restaure 20 points de vie.",
        effect: { hp: 20 },
      },
      {
        name: "Potion de mana",
        description: "Restaure 15 points de mana.",
        effect: { mp: 15 },
      },
      {
        name: "Élixir",
        description: "Restaure 10 points de vie et 10 points de mana.",
        effect: { hp: 10, mp: 10 },
      },
    ]

    const potion = potionTypes[Math.floor(Math.random() * potionTypes.length)]
    return {
      name: potion.name,
      type: "potion",
      description: potion.description,
      effect: potion.effect,
    }
  }

  static generateWeapon(level) {
    const weaponTypes = [
      {
        name: "Épée courte",
        description: "Une épée légère et rapide.",
        effect: { strength: 3 },
      },
      {
        name: "Hache de bataille",
        description: "Une hache puissante mais lente.",
        effect: { strength: 5 },
      },
      {
        name: "Bâton magique",
        description: "Un bâton qui amplifie les sorts.",
        effect: { intelligence: 4 },
      },
      {
        name: "Dague",
        description: "Une dague rapide et précise.",
        effect: { agility: 3, strength: 2 },
      },
    ]

    const weapon = weaponTypes[Math.floor(Math.random() * weaponTypes.length)]

    for (const stat in weapon.effect) {
      weapon.effect[stat] = Math.floor(weapon.effect[stat] * (1 + (level - 1) * 0.5))
    }

    let prefix = ""
    if (level === 2) prefix = "Bonne "
    else if (level === 3) prefix = "Excellente "
    else if (level >= 4) prefix = "Légendaire "

    return {
      name: prefix + weapon.name,
      type: "weapon",
      description: weapon.description,
      effect: weapon.effect,
    }
  }

  static generateArmor(level) {
    const armorTypes = [
      {
        name: "Armure en cuir",
        description: "Une armure légère qui offre une protection de base.",
        effect: { defense: 2 },
      },
      {
        name: "Cotte de mailles",
        description: "Une armure moyenne qui offre une bonne protection.",
        effect: { defense: 4 },
      },
      {
        name: "Armure de plaques",
        description: "Une armure lourde qui offre une excellente protection.",
        effect: { defense: 6, agility: -1 },
      },
      {
        name: "Robe de mage",
        description: "Une robe qui amplifie les pouvoirs magiques.",
        effect: { magicResistance: 3, intelligence: 2 },
      },
    ]

    const armor = armorTypes[Math.floor(Math.random() * armorTypes.length)]

    for (const stat in armor.effect) {
      armor.effect[stat] = Math.floor(armor.effect[stat] * (1 + (level - 1) * 0.5))
    }

    let prefix = ""
    if (level === 2) prefix = "Bonne "
    else if (level === 3) prefix = "Excellente "
    else if (level >= 4) prefix = "Légendaire "

    return {
      name: prefix + armor.name,
      type: "armor",
      description: armor.description,
      effect: armor.effect,
    }
  }
}

