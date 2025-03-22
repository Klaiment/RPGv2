import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { Character } from "../models/character.js"
import { Dungeon } from "../models/dungeon.js"
import { GameState } from "../models/gameState.js"
import { askQuestion } from "./game-loop.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SAVE_PATH = path.join(path.dirname(__dirname), "save.json")

export async function saveGame(gameState) {
  try {
    await fs.writeFile(SAVE_PATH, JSON.stringify(gameState), "utf8")
    console.log("Partie sauvegardée avec succès!")
    return true
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error)
    return false
  }
}

export async function loadGame() {
  try {
    const data = await fs.readFile(SAVE_PATH, "utf8")
    const savedState = JSON.parse(data)

    const gameState = new GameState()
    gameState.player = new Character(savedState.player.name, savedState.player.characterClass)
    Object.assign(gameState.player, savedState.player)

    gameState.dungeon = new Dungeon(savedState.dungeon.width, savedState.dungeon.height)
    Object.assign(gameState.dungeon, savedState.dungeon)

    console.log("Partie chargée avec succès!")
    return gameState
  } catch (error) {
    console.log("Aucune sauvegarde trouvée ou erreur lors du chargement.")
    return null
  }
}

export async function createNewGame(rl) {
  const gameState = new GameState()
  gameState.player = await createCharacter(rl)
  gameState.dungeon = new Dungeon(10, 10)
  gameState.dungeon.generate()
  return gameState
}

async function createCharacter(rl) {
  console.log("\n=== CRÉATION DE PERSONNAGE ===")

  let name
  do {
    name = await askQuestion(rl, "Entrez le nom de votre personnage (3-20 caractères): ")
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
    classChoice = await askQuestion(rl, "Votre choix (1-3): ")
    if (!["1", "2", "3"].includes(classChoice)) {
      console.log("Veuillez choisir une option valide (1-3).")
    }
  } while (!["1", "2", "3"].includes(classChoice))

  const characterClass = {
    1: "guerrier",
    2: "mage",
    3: "voleur",
  }[classChoice]

  const player = new Character(name, characterClass)

  console.log("\n=== RÉCAPITULATIF DU PERSONNAGE ===")
  console.log(`Nom: ${player.name}`)
  console.log(`Classe: ${player.characterClass}`)
  console.log("Statistiques:")
  console.log(`- Points de Vie (PV): ${player.stats.hp}`)
  console.log(`- Points de Mana (PM): ${player.stats.mp}`)
  console.log(`- Force: ${player.stats.strength}`)
  console.log(`- Intelligence: ${player.stats.intelligence}`)
  console.log(`- Défense: ${player.stats.defense}`)
  console.log(`- Résistance Magique: ${player.stats.magicResistance}`)
  console.log(`- Agilité: ${player.stats.agility}`)
  console.log(`- Chance: ${player.stats.luck}`)
  console.log(`- Endurance: ${player.stats.endurance}`)
  console.log(`- Esprit: ${player.stats.spirit}`)

  return player
}

