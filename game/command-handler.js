import { saveGame, loadGame } from "./game-state-manager.js"
import { handleMovement, handleRotation, handleAdvance } from "./movement-handler.js"
import { handleCombat } from "./combat-handler.js"
import { handleTreasure } from "./treasure-handler.js"
import { displayInventory, displayCharacterStats, displayHelp } from "./display-manager.js"
import { askQuestion } from "./game-loop.js"

export async function handleCommand(command, gameState, rl) {
  switch (command) {
    case "N":
    case "S":
    case "E":
    case "O":
      const result = handleMovement(command, gameState)
      if (result === "combat") {
        const combatResult = await handleCombat(gameState, rl)
        if (combatResult === "gameover") {
          return "gameover"
        }
      } else if (result === "treasure") {
        handleTreasure(gameState)
      }
      break

    case "A":
      const advanceResult = handleAdvance(gameState)
      if (advanceResult === "combat") {
        const combatResult = await handleCombat(gameState, rl)
        if (combatResult === "gameover") {
          return "gameover"
        }
      } else if (advanceResult === "treasure") {
        handleTreasure(gameState)
      }
      break

    case "G":
    case "D":
      handleRotation(command, gameState)
      break

    case "C":
      const combatResult = await handleCombat(gameState, rl)
      if (combatResult === "gameover") {
        return "gameover"
      }
      break

    case "T":
      handleTreasure(gameState)
      break

    case "I":
      displayInventory(gameState)
      break

    case "P":
      displayCharacterStats(gameState)
      break

    case "SAVE":
      await saveGame(gameState)
      break

    case "LOAD":
      const loadedState = await loadGame()
      if (loadedState) {
        Object.assign(gameState, loadedState)
      }
      break

    case "HELP":
      displayHelp()
      break

    case "QUIT":
      const confirmQuit = await askQuestion(rl, "Voulez-vous vraiment quitter? (O/N): ")
      if (confirmQuit.toUpperCase() === "O") {
        console.log("Merci d'avoir joué!")
        return "quit"
      }
      break

    default:
      console.log("Commande non reconnue. Tapez HELP pour afficher l'aide.")
  }

  return "continue"
}

