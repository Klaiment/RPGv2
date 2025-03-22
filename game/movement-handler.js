export function handleMovement(direction, gameState) {
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

export function handleRotation(command, gameState) {
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

export function handleAdvance(gameState) {
  return handleMovement(gameState.player.orientation, gameState)
}

export function getDirectionName(direction) {
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

