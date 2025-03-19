import readline from "readline"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { Character } from "./models/character.js"
import { Dungeon } from "./models/dungeon.js"
import { GameState } from "./models/gameState.js"
import { Combat } from "./models/combat.js"
import { Item } from "./models/item.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SAVE_PATH = path.join(__dirname, "save.json")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let gameState = new GameState()

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function saveGame() {
  try {
    await fs.writeFile(SAVE_PATH, JSON.stringify(gameState), "utf8")
    console.log("Partie sauvegardée avec succès!")
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error)
  }
}

async function loadGame() {
  try {
    const data = await fs.readFile(SAVE_PATH, "utf8")
    const savedState = JSON.parse(data)

    gameState = new GameState()
    gameState.player = new Character(savedState.player.name, savedState.player.characterClass)
    Object.assign(gameState.player, savedState.player)

    gameState.dungeon = new Dungeon(savedState.dungeon.width, savedState.dungeon.height)
    Object.assign(gameState.dungeon, savedState.dungeon)

    console.log("Partie chargée avec succès!")
    return true
  } catch (error) {
    console.log("Aucune sauvegarde trouvée ou erreur lors du chargement.")
    return false
  }
}

async function createCharacter() {
  console.log("\n=== CRÉATION DE PERSONNAGE ===")

  let name
  do {
    name = await askQuestion("Entrez le nom de votre personnage (3-20 caractères): ")
    if (name.length < 3 || name.length > 20) {
      console.log("Le nom doit contenir entre 3 et 20 caractères.")
    }
  } while (name.length < 3 || name.length > 20)

  console.log("\nChoisissez une classe:")
  console.log("1. Guerrier - Fort et résistant")
  console.log("2. Mage - Puissant en magie")
  console.log("3. Voleur - Agile et chanceux")

  let classChoice
  do {
    classChoice = await askQuestion("Votre choix (1-3): ")
    if (!["1", "2", "3"].includes(classChoice)) {
      console.log("Veuillez choisir une option valide (1-3).")
    }
  } while (!["1", "2", "3"].includes(classChoice))

  const characterClass = {
    1: "guerrier",
    2: "mage",
    3: "voleur",
  }[classChoice]

  gameState.player = new Character(name, characterClass)

  console.log("\n=== RÉCAPITULATIF DU PERSONNAGE ===")
  console.log(`Nom: ${gameState.player.name}`)
  console.log(`Classe: ${gameState.player.characterClass}`)
  console.log("Statistiques:")
  console.log(`- Points de Vie (PV): ${gameState.player.stats.hp}`)
  console.log(`- Points de Mana (PM): ${gameState.player.stats.mp}`)
  console.log(`- Force: ${gameState.player.stats.strength}`)
  console.log(`- Intelligence: ${gameState.player.stats.intelligence}`)
  console.log(`- Défense: ${gameState.player.stats.defense}`)
  console.log(`- Résistance Magique: ${gameState.player.stats.magicResistance}`)
  console.log(`- Agilité: ${gameState.player.stats.agility}`)
  console.log(`- Chance: ${gameState.player.stats.luck}`)
  console.log(`- Endurance: ${gameState.player.stats.endurance}`)
  console.log(`- Esprit: ${gameState.player.stats.spirit}`)

  gameState.dungeon = new Dungeon(10, 10)
  gameState.dungeon.generate()

  return gameState.player
}

function displayCurrentState() {
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
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "N")) console.log("- Nord (N)")
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "S")) console.log("- Sud (S)")
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "E")) console.log("- Est (E)")
  if (gameState.dungeon.canMove(gameState.player.x, gameState.player.y, "O")) console.log("- Ouest (O)")
}

function handleMovement(direction) {
  if (!gameState.dungeon.canMove(gameState.player.x, gameState.player.y, direction)) {
    console.log(`Vous ne pouvez pas aller plus au ${getDirectionName(direction)}.`)
    return false
  }

  const currentRoom = gameState.dungeon.getRoomAt(gameState.player.x, gameState.player.y)
  if (currentRoom.monster && !currentRoom.monster.defeated) {
    console.log("Un monstre bloque votre chemin! Vous devez le vaincre pour avancer.")
    return false
  }

  let newX = gameState.player.x
  let newY = gameState.player.y

  switch (direction) {
    case "N":
      newY += 1
      break
    case "S":
      newY -= 1
      break
    case "E":
      newX += 1
      break
    case "O":
      newX -= 1
      break
  }

  gameState.player.x = newX
  gameState.player.y = newY
  gameState.player.orientation = direction

  console.log(`Vous êtes maintenant en position (${newX}, ${newY}).`)

  const newRoom = gameState.dungeon.getRoomAt(newX, newY)
  if (newRoom.monster && !newRoom.monster.defeated) {
    console.log(`Vous rencontrez un ${newRoom.monster.name}!`)
    return "combat"
  } else if (newRoom.treasure && !newRoom.treasure.collected) {
    console.log("Vous avez trouvé un trésor!")
    return "treasure"
  }

  return true
}

function handleRotation(command) {
  const orientations = ["N", "E", "S", "O"]
  let currentIndex = orientations.indexOf(gameState.player.orientation)

  if (command === "G") {
    currentIndex = (currentIndex - 1 + 4) % 4
  } else if (command === "D") {
    currentIndex = (currentIndex + 1) % 4
  }

  gameState.player.orientation = orientations[currentIndex]
  console.log(`Vous faites maintenant face au ${getDirectionName(gameState.player.orientation)}.`)
}

function handleAdvance() {
  return handleMovement(gameState.player.orientation)
}

function getDirectionName(direction) {
  switch (direction) {
    case "N":
      return "Nord"
    case "S":
      return "Sud"
    case "E":
      return "Est"
    case "O":
      return "Ouest"
    default:
      return direction
  }
}

async function handleCombat() {
  const currentRoom = gameState.dungeon.getRoomAt(gameState.player.x, gameState.player.y)
  const monster = currentRoom.monster

  if (!monster || monster.defeated) {
    console.log("Il n'y a pas de monstre à combattre ici.")
    return
  }

  console.log(`\n=== COMBAT CONTRE ${monster.name.toUpperCase()} ===`)
  console.log(`${monster.name} - PV: ${monster.hp}/${monster.maxHp}`)

  const combat = new Combat(gameState.player, monster)

  let combatEnded = false
  while (!combatEnded) {
    console.log("\nQue voulez-vous faire?")
    console.log("1. Attaquer")
    console.log("2. Se défendre")
    console.log("3. Utiliser un objet")
    console.log("4. Fuir")

    const choice = await askQuestion("Votre choix: ")

    switch (choice) {
      case "1":
        combat.playerAttack()
        break
      case "2":
        combat.playerDefend()
        break
      case "3":
        await useItem()
        break
      case "4":
        if (Math.random() > 0.5) {
          console.log("Vous avez réussi à fuir!")
          return
        } else {
          console.log("Vous n'avez pas réussi à fuir!")
        }
        break
      default:
        console.log("Choix invalide.")
        continue
    }

    if (monster.hp <= 0) {
      console.log(`Vous avez vaincu le ${monster.name}!`)
      monster.defeated = true

      const expGain = monster.level * 10
      const goldGain = Math.floor(Math.random() * (monster.level * 5)) + 5

      gameState.player.exp += expGain
      gameState.player.gold += goldGain

      console.log(`Vous gagnez ${expGain} points d'expérience et ${goldGain} pièces d'or.`)

      if (Math.random() > 0.7) {
        const newItem = Item.generateRandomItem(monster.level)
        gameState.player.inventory.push(newItem)
        console.log(`Vous avez obtenu: ${newItem.name}!`)
      }

      combatEnded = true
      break
    }

    combat.monsterAttack()

    if (gameState.player.stats.hp <= 0) {
      console.log("Vous avez été vaincu...")
      console.log("GAME OVER")
      return "gameover"
    }

    console.log(`\nVous - PV: ${gameState.player.stats.hp}/${gameState.player.stats.maxHp}`)
    console.log(`${monster.name} - PV: ${monster.hp}/${monster.maxHp}`)
  }
}

async function useItem() {
  if (gameState.player.inventory.length === 0) {
    console.log("Votre inventaire est vide.")
    return
  }

  console.log("\n=== INVENTAIRE ===")
  gameState.player.inventory.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - ${item.description}`)
  })

  const choice = await askQuestion("Choisissez un objet à utiliser (0 pour annuler): ")
  const index = Number.parseInt(choice) - 1

  if (choice === "0" || isNaN(index) || index < 0 || index >= gameState.player.inventory.length) {
    console.log("Action annulée.")
    return
  }

  const item = gameState.player.inventory[index]

  if (item.type === "potion") {
    if (item.effect.hp) {
      gameState.player.stats.hp = Math.min(gameState.player.stats.hp + item.effect.hp, gameState.player.stats.maxHp)
      console.log(`Vous récupérez ${item.effect.hp} points de vie.`)
    }

    if (item.effect.mp) {
      gameState.player.stats.mp = Math.min(gameState.player.stats.mp + item.effect.mp, gameState.player.stats.maxMp)
      console.log(`Vous récupérez ${item.effect.mp} points de mana.`)
    }

    gameState.player.inventory.splice(index, 1)
  } else if (item.type === "weapon" || item.type === "armor") {
    gameState.player.equip(item)
    console.log(`Vous avez équipé: ${item.name}.`)
  }
}

function handleTreasure() {
  const currentRoom = gameState.dungeon.getRoomAt(gameState.player.x, gameState.player.y)

  if (!currentRoom.treasure || currentRoom.treasure.collected) {
    console.log("Il n'y a pas de trésor à collecter ici.")
    return
  }

  const treasure = currentRoom.treasure

  console.log(`\n=== TRÉSOR TROUVÉ ===`)
  console.log(treasure.description)

  if (treasure.gold) {
    gameState.player.gold += treasure.gold
    console.log(`Vous avez obtenu ${treasure.gold} pièces d'or.`)
  }

  if (treasure.items && treasure.items.length > 0) {
    treasure.items.forEach((item) => {
      gameState.player.inventory.push(item)
      console.log(`Vous avez obtenu: ${item.name}!`)
    })
  }

  currentRoom.treasure.collected = true
}

function displayInventory() {
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

function displayCharacterStats() {
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

function displayHelp() {
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

async function gameLoop() {
  console.log("=== BIENVENUE DANS LE DONJON RPG ===")
  console.log("Tapez HELP à tout moment pour afficher l'aide.")

  let loaded = false
  const loadChoice = await askQuestion("Voulez-vous charger une partie sauvegardée? (O/N): ")

  if (loadChoice.toUpperCase() === "O") {
    loaded = await loadGame()
  }

  if (!loaded) {
    await createCharacter()
  }

  let gameRunning = true

  while (gameRunning) {
    displayCurrentState()

    const action = await askQuestion("\nQue voulez-vous faire? ")

    switch (action.toUpperCase()) {
      case "N":
      case "S":
      case "E":
      case "O":
        const result = handleMovement(action.toUpperCase())
        if (result === "combat") {
          const combatResult = await handleCombat()
          if (combatResult === "gameover") {
            gameRunning = false
          }
        } else if (result === "treasure") {
          handleTreasure()
        }
        break

      case "A":
        const advanceResult = handleAdvance()
        if (advanceResult === "combat") {
          const combatResult = await handleCombat()
          if (combatResult === "gameover") {
            gameRunning = false
          }
        } else if (advanceResult === "treasure") {
          handleTreasure()
        }
        break

      case "G":
      case "D":
        handleRotation(action.toUpperCase())
        break

      case "C":
        const combatResult = await handleCombat()
        if (combatResult === "gameover") {
          gameRunning = false
        }
        break

      case "T":
        handleTreasure()
        break

      case "I":
        displayInventory()
        break

      case "P":
        displayCharacterStats()
        break

      case "SAVE":
        await saveGame()
        break

      case "LOAD":
        await loadGame()
        break

      case "HELP":
        displayHelp()
        break

      case "QUIT":
        const confirmQuit = await askQuestion("Voulez-vous vraiment quitter? (O/N): ")
        if (confirmQuit.toUpperCase() === "O") {
          console.log("Merci d'avoir joué!")
          gameRunning = false
        }
        break

      default:
        console.log("Commande non reconnue. Tapez HELP pour afficher l'aide.")
    }
  }

  rl.close()
}

gameLoop()

