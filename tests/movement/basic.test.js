import { Character } from "../../models/character.js"
import { Dungeon } from "../../models/dungeon.js"
import assert from "assert"

console.log("=== TESTS DE DÉPLACEMENT DE BASE ===")

// Fonction utilitaire pour créer un donjon de test
function createTestDungeon() {
  const dungeon = new Dungeon(5, 5)

  // Créer manuellement les salles pour les tests
  dungeon.rooms = []

  for (let y = 0; y < dungeon.height; y++) {
    for (let x = 0; x < dungeon.width; x++) {
      const room = {
        x,
        y,
        walls: {
          N: false,
          S: false,
          E: false,
          O: false,
        },
        monster: null,
        treasure: null,
        visited: false,
      }

      // Ajouter des murs aux bords du donjon
      if (x === 0) room.walls.O = true
      if (x === dungeon.width - 1) room.walls.E = true
      if (y === 0) room.walls.S = true
      if (y === dungeon.height - 1) room.walls.N = true

      dungeon.rooms.push(room)
    }
  }

  return dungeon
}

// Test d'acceptation 1 : Déplacement vers une case vide
function testDeplacementCaseVide() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 0

  // Action : déplacement vers le Nord
  const canMoveNorth = dungeon.canMove(character.x, character.y, "N")
  assert.strictEqual(canMoveNorth, true, "Le personnage devrait pouvoir se déplacer vers le Nord")

  // Simuler le déplacement
  if (canMoveNorth) {
    character.y += 1
    character.orientation = "N"
  }

  // Vérifier la nouvelle position
  assert.strictEqual(character.x, 0, "La coordonnée X devrait être 0")
  assert.strictEqual(character.y, 1, "La coordonnée Y devrait être 1")

  console.log("✅ Test 1 : Déplacement vers une case vide - RÉUSSI")
}

// Test d'acceptation 4 : Enchaînement de déplacements valides
function testEnchaînementDeplacements() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 0

  // Séquence de déplacements : Nord, Est, Nord
  const moves = ["N", "E", "N"]
  const expectedPositions = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ]

  // Exécuter les déplacements
  for (let i = 0; i < moves.length; i++) {
    const direction = moves[i]
    const canMove = dungeon.canMove(character.x, character.y, direction)
    assert.strictEqual(canMove, true, `Le personnage devrait pouvoir se déplacer vers ${direction}`)

    // Simuler le déplacement
    switch (direction) {
      case "N":
        character.y += 1
        break
      case "S":
        character.y -= 1
        break
      case "E":
        character.x += 1
        break
      case "O":
        character.x -= 1
        break
    }
    character.orientation = direction

    // Vérifier la position
    assert.strictEqual(character.x, expectedPositions[i].x, `La coordonnée X devrait être ${expectedPositions[i].x}`)
    assert.strictEqual(character.y, expectedPositions[i].y, `La coordonnée Y devrait être ${expectedPositions[i].y}`)
  }

  console.log("✅ Test 4 : Enchaînement de déplacements valides - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testDeplacementCaseVide()
  testEnchaînementDeplacements()

  console.log("\n✅ Tous les tests de déplacement de base ont réussi!")
}

runAllTests()

