export function displayCurrentState(gameState) {
  console.log("\n=== ÉTAT ACTUEL ===")
  console.log(`Position: (${gameState.player.x}, ${gameState.player.y})`)
  console.log(`Orientation: ${gameState.player.orientation}`)
  console.log(`PV: ${gameState.player.stats.hp}/${gameState.player.stats.maxHp}`)
  console.log(`PM: ${gameState.player.stats.mp}/${gameState.player.stats.maxMp}`)

  const currentRoom = gameState.dungeon.getRoomAt(gameState.player.x, gameState.player.y)
  console.log("\nDescription de la salle:")
  if (currentRoom.monster && !currentRoom.monster.defeated) {
    console.log(`Il y a un ${currentRoom.monster.name} dans cette salle!`)
  } else if (currentRoom.treasure && !currentRoom.treasure.collected) {
    console.log("Il y a un trésor dans cette salle!")
  } else {
    console.log("Cette salle est vide.")
  }

  console.log("\nSorties disponibles:")
  let sortiesAffichees = false

  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "N")) {
    console.log("- Nord (N)")
    sortiesAffichees = true
  }
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "S")) {
    console.log("- Sud (S)")
    sortiesAffichees = true
  }
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "E")) {
    console.log("- Est (E)")
    sortiesAffichees = true
  }
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "O")) {
    console.log("- Ouest (O)")
    sortiesAffichees = true
  }

  if (!sortiesAffichees) {
    console.log("Aucune sortie disponible. Vous êtes piégé !")
  }
}

export function displayInventory(gameState) {
  console.log("\n=== INVENTAIRE ===")
  console.log(`Or: ${gameState.player.gold} pièces`)

  if (gameState.player.inventory.length === 0) {
    console.log("Votre inventaire est vide.")
    return
  }

  console.log("\nObjets:")
  gameState.player.inventory.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - ${item.description}`)
  })

  console.log("\nÉquipement:")
  console.log(`Arme: ${gameState.player.equipment.weapon ? gameState.player.equipment.weapon.name : "Aucune"}`)
  console.log(`Armure: ${gameState.player.equipment.armor ? gameState.player.equipment.armor.name : "Aucune"}`)
}

export function displayCharacterStats(gameState) {
  console.log("\n=== STATISTIQUES DU PERSONNAGE ===")
  console.log(`Nom: ${gameState.player.name}`)
  console.log(`Classe: ${gameState.player.characterClass}`)
  console.log(`Niveau: ${gameState.player.level}`)
  console.log(`Expérience: ${gameState.player.exp}/${gameState.player.level * 100}`)
  console.log("\nStatistiques:")
  console.log(`- Points de Vie (PV): ${gameState.player.stats.hp}/${gameState.player.stats.maxHp}`)
  console.log(`- Points de Mana (PM): ${gameState.player.stats.mp}/${gameState.player.stats.maxMp}`)
  console.log(`- Force: ${gameState.player.stats.strength}`)
  console.log(`- Intelligence: ${gameState.player.stats.intelligence}`)
  console.log(`- Défense: ${gameState.player.stats.defense}`)
  console.log(`- Résistance Magique: ${gameState.player.stats.magicResistance}`)
  console.log(`- Agilité: ${gameState.player.stats.agility}`)
  console.log(`- Chance: ${gameState.player.stats.luck}`)
  console.log(`- Endurance: ${gameState.player.stats.endurance}`)
  console.log(`- Esprit: ${gameState.player.stats.spirit}`)
}

export function displayHelp() {
  console.log("\n=== AIDE ===")
  console.log("Commandes de déplacement:")
  console.log("- N: Se déplacer vers le Nord")
  console.log("- S: Se déplacer vers le Sud")
  console.log("- E: Se déplacer vers l'Est")
  console.log("- O: Se déplacer vers l'Ouest")
  console.log("- A: Avancer dans la direction actuelle")
  console.log("- G: Tourner à gauche")
  console.log("- D: Tourner à droite")

  console.log("\nAutres commandes:")
  console.log("- C: Combattre le monstre dans la salle actuelle")
  console.log("- T: Collecter le trésor dans la salle actuelle")
  console.log("- I: Afficher l'inventaire")
  console.log("- P: Afficher les statistiques du personnage")
  console.log("- SAVE: Sauvegarder la partie")
  console.log("- LOAD: Charger une partie sauvegardée")
  console.log("- HELP: Afficher cette aide")
  console.log("- QUIT: Quitter le jeu")
}

