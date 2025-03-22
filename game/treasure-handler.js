export function handleTreasure(gameState) {
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

