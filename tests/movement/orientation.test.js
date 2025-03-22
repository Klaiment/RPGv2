import { Character } from "../../models/character.js"
import { Dungeon } from "../../models/dungeon.js"
import assert from "assert"

console.log("=== TESTS D'ORIENTATION ET ROTATION ===")

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

      dungeon.rooms.push(room)
    }
  }

  return dungeon
}

// Test d'acceptation 8 : Rotation et orientation du personnage
function testRotationOrientation() {
  const character = new Character("Héros", "guerrier")

  // Préconditions
  character.x = 2
  character.y = 2
  character.orientation = "N"

  // Action : tourner à droite (Est)
  const orientations = ["N", "E", "S", "O"]
  let currentIndex = orientations.indexOf(character.orientation)
  currentIndex = (currentIndex + 1) % 4
  character.orientation = orientations[currentIndex]

  assert.strictEqual(character.orientation, "E", "L'orientation devrait être Est")

  // Action : tourner à gauche (retour au Nord)
  currentIndex = orientations.indexOf(character.orientation)
  currentIndex = (currentIndex - 1 + 4) % 4
  character.orientation = orientations[currentIndex]

  assert.strictEqual(character.orientation, "N", "L'orientation devrait être Nord")

  console.log("✅ Test 8 : Rotation et orientation du personnage - RÉUSSI")
}

// Test d'acceptation 9 : Déplacement avec orientation
function testDeplacementOrientation() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 2
  character.y = 2
  character.orientation = "E"

  // Action : avancer dans la direction actuelle
  const canMove = dungeon.canMove(character.x, character.y, character.orientation)
  assert.strictEqual(canMove, true, "Le personnage devrait pouvoir avancer")

  // Simuler le déplacement
  if (canMove) {
    switch (character.orientation) {
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
  }

  // Vérifier la nouvelle position
  assert.strictEqual(character.x, 3, "La coordonnée X devrait être 3")
  assert.strictEqual(character.y, 2, "La coordonnée Y devrait être 2")

  console.log("✅ Test 9 : Déplacement avec orientation - RÉUSSI")
}

// Test d'acceptation 10 : Série de commandes complexes
function testCommandesComplexes() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 0
  character.orientation = "N"

  // Séquence de commandes : A, D, A, G, A, A
  const commands = ["A", "D", "A", "G", "A", "A"]
  const expectedPositions = [
    { x: 0, y: 1, orientation: "N" }, // Avancer vers le Nord
    { x: 0, y: 1, orientation: "E" }, // Tourner à droite
    { x: 1, y: 1, orientation: "E" }, // Avancer vers l'Est
    { x: 1, y: 1, orientation: "N" }, // Tourner à gauche
    { x: 1, y: 2, orientation: "N" }, // Avancer vers le Nord
    { x: 1, y: 3, orientation: "N" }, // Avancer vers le Nord
  ]

  // Exécuter les commandes
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]

    if (command === "A") {
      // Avancer dans la direction actuelle
      const canMove = dungeon.canMove(character.x, character.y, character.orientation)
      assert.strictEqual(canMove, true, "Le personnage devrait pouvoir avancer")

      if (canMove) {
        switch (character.orientation) {
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
      }
    } else if (command === "G" || command === "D") {
      // Tourner à gauche ou à droite
      const orientations = ["N", "E", "S", "O"]
      let currentIndex = orientations.indexOf(character.orientation)

      if (command === "G") {
        currentIndex = (currentIndex - 1 + 4) % 4
      } else {
        currentIndex = (currentIndex + 1) % 4
      }

      character.orientation = orientations[currentIndex]
    }

    // Vérifier la position et l'orientation
    assert.strictEqual(character.x, expectedPositions[i].x, `La coordonnée X devrait être ${expectedPositions[i].x}`)
    assert.strictEqual(character.y, expectedPositions[i].y, `La coordonnée Y devrait être ${expectedPositions[i].y}`)
    assert.strictEqual(
      character.orientation,
      expectedPositions[i].orientation,
      `L'orientation devrait être ${expectedPositions[i].orientation}`,
    )
  }

  console.log("✅ Test 10 : Série de commandes complexes - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testRotationOrientation()
  testDeplacementOrientation()
  testCommandesComplexes()

  console.log("\n✅ Tous les tests d'orientation et rotation ont réussi!")
}

runAllTests()

