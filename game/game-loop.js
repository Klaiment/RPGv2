import { createInterface } from "./user-interface.js"
import { loadGame, createNewGame } from "./game-state-manager.js"
import { handleCommand } from "./command-handler.js"
import { displayCurrentState } from "./display-manager.js"

export async function startGame() {
  console.log("=== BIENVENUE DANS LE DONJON RPG ===")
  console.log("Tapez HELP à tout moment pour afficher l'aide.")

  const rl = createInterface()
  let gameState = null

  const loadChoice = await askQuestion(rl, "Voulez-vous charger une partie sauvegardée? (O/N): ")

  if (loadChoice.toUpperCase() === "O") {
    gameState = await loadGame()
  }

  if (!gameState) {
    gameState = await createNewGame(rl)
  }

  let gameRunning = true

  while (gameRunning) {
    displayCurrentState(gameState)

    const action = await askQuestion(rl, "\nQue voulez-vous faire? ")

    const result = await handleCommand(action.toUpperCase(), gameState, rl)

    if (result === "quit") {
      gameRunning = false
    } else if (result === "gameover") {
      console.log("GAME OVER")
      gameRunning = false
    }
  }

  rl.close()
}

export function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

