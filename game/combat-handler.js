import { Combat } from "../models/combat.js"
import { Item } from "../models/item.js"
import { useItem } from "./inventory-handler.js"
import { askQuestion } from "./game-loop.js"

export async function handleCombat(gameState, rl) {
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

    const choice = await askQuestion(rl, "Votre choix: ")

    switch (choice) {
      case "1":
        combat.playerAttack()
        break
      case "2":
        combat.playerDefend()
        break
      case "3":
        await useItem(gameState, rl)
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
      return "gameover"
    }

    console.log(`\nVous - PV: ${gameState.player.stats.hp}/${gameState.player.stats.maxHp}`)
    console.log(`${monster.name} - PV: ${monster.hp}/${monster.maxHp}`)
  }
}

