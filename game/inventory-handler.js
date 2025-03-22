import { askQuestion } from "./game-loop.js"

export async function useItem(gameState, rl) {
  if (gameState.player.inventory.length === 0) {
    console.log("Votre inventaire est vide.")
    return
  }

  console.log("\n=== INVENTAIRE ===")
  gameState.player.inventory.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - ${item.description}`)
  })

  const choice = await askQuestion(rl, "Choisissez un objet à utiliser (0 pour annuler): ")
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

