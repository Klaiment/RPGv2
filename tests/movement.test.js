import { Character } from "../models/character.js"
import { Dungeon } from "../models/dungeon.js"
import assert from "assert"

console.log("=== TESTS DE DÉPLACEMENT ===")

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

  // Ajouter un monstre à la position (1, 1)
  const monsterRoom = dungeon.getRoomAt(1, 1)
  monsterRoom.monster = {
    name: "Gobelin",
    level: 1,
    hp: 20,
    maxHp: 20,
    attack: 5,
    defense: 3,
    defeated: false,
  }

  // Ajouter un trésor à la position (1, 3)
  const treasureRoom = dungeon.getRoomAt(1, 3)
  treasureRoom.treasure = {
    gold: 10,
    items: [],
    description: "Un coffre contenant des trésors!",
    collected: false,
  }

  // Ajouter un mur à la position (2, 3) vers l'Est
  const wallRoom = dungeon.getRoomAt(2, 3)
  wallRoom.walls.E = true

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

// Test d'acceptation 2 : Déplacement vers une case contenant un monstre
function testDeplacementCaseMonstre() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 1

  // Action : déplacement vers l'Est (vers le monstre)
  const canMoveEast = dungeon.canMove(character.x, character.y, "E")
  assert.strictEqual(canMoveEast, true, "Le personnage devrait pouvoir se déplacer vers l'Est")

  // Simuler le déplacement
  if (canMoveEast) {
    character.x += 1
    character.orientation = "E"
  }

  // Vérifier la nouvelle position
  assert.strictEqual(character.x, 1, "La coordonnée X devrait être 1")
  assert.strictEqual(character.y, 1, "La coordonnée Y devrait être 1")

  // Vérifier qu'il y a un monstre dans la salle
  const room = dungeon.getRoomAt(character.x, character.y)
  assert.notStrictEqual(room.monster, null, "La salle devrait contenir un monstre")
  assert.strictEqual(room.monster.defeated, false, "Le monstre ne devrait pas être vaincu")

  console.log("✅ Test 2 : Déplacement vers une case contenant un monstre - RÉUSSI")
}

// Test d'acceptation 3 : Tentative de déplacement hors de la grille
function testDeplacementHorsGrille() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 0

  // Action : déplacement vers le Sud (hors de la grille)
  const canMoveSouth = dungeon.canMove(character.x, character.y, "S")
  assert.strictEqual(canMoveSouth, false, "Le personnage ne devrait pas pouvoir se déplacer vers le Sud")

  // Vérifier que la position n'a pas changé
  assert.strictEqual(character.x, 0, "La coordonnée X devrait rester 0")
  assert.strictEqual(character.y, 0, "La coordonnée Y devrait rester 0")

  console.log("✅ Test 3 : Tentative de déplacement hors de la grille - RÉUSSI")
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

  // Ignorer le monstre pour ce test
  dungeon.getRoomAt(1, 1).monster = null

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

// Test d'acceptation 5 : Rencontre d'un trésor lors du déplacement
function testRencontreTresor() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 1
  character.y = 2

  // Action : déplacement vers le Nord (vers le trésor)
  const canMoveNorth = dungeon.canMove(character.x, character.y, "N")
  assert.strictEqual(canMoveNorth, true, "Le personnage devrait pouvoir se déplacer vers le Nord")

  // Simuler le déplacement
  if (canMoveNorth) {
    character.y += 1
    character.orientation = "N"
  }

  // Vérifier la nouvelle position
  assert.strictEqual(character.x, 1, "La coordonnée X devrait être 1")
  assert.strictEqual(character.y, 3, "La coordonnée Y devrait être 3")

  // Vérifier qu'il y a un trésor dans la salle
  const room = dungeon.getRoomAt(character.x, character.y)
  assert.notStrictEqual(room.treasure, null, "La salle devrait contenir un trésor")
  assert.strictEqual(room.treasure.collected, false, "Le trésor ne devrait pas être collecté")

  console.log("✅ Test 5 : Rencontre d'un trésor lors du déplacement - RÉUSSI")
}

// Test d'acceptation 6 : Déplacement bloqué par un obstacle
function testDeplacementBloque() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 2
  character.y = 3

  // Action : déplacement vers l'Est (bloqué par un mur)
  const canMoveEast = dungeon.canMove(character.x, character.y, "E")
  assert.strictEqual(canMoveEast, false, "Le personnage ne devrait pas pouvoir se déplacer vers l'Est")

  // Vérifier que la position n'a pas changé
  assert.strictEqual(character.x, 2, "La coordonnée X devrait rester 2")
  assert.strictEqual(character.y, 3, "La coordonnée Y devrait rester 3")

  console.log("✅ Test 6 : Déplacement bloqué par un obstacle - RÉUSSI")
}

// Test d'acceptation 7 : Gestion des limites de la grille
function testLimitesGrille() {
  const character = new Character("Héros", "guerrier")
  const dungeon = createTestDungeon()

  // Préconditions
  character.x = 0
  character.y = 4 // Bord Nord

  // Action : déplacement vers le Nord (hors de la grille)
  const canMoveNorth = dungeon.canMove(character.x, character.y, "N")
  assert.strictEqual(canMoveNorth, false, "Le personnage ne devrait pas pouvoir se déplacer vers le Nord")

  // Vérifier que la position n'a pas changé
  assert.strictEqual(character.x, 0, "La coordonnée X devrait rester 0")
  assert.strictEqual(character.y, 4, "La coordonnée Y devrait rester 4")

  console.log("✅ Test 7 : Gestion des limites de la grille - RÉUSSI")
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

  // Ignorer le monstre pour ce test
  dungeon.getRoomAt(1, 1).monster = null

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
  testDeplacementCaseVide()
  testDeplacementCaseMonstre()
  testDeplacementHorsGrille()
  testEnchaînementDeplacements()
  testRencontreTresor()
  testDeplacementBloque()
  testLimitesGrille()
  testRotationOrientation()
  testDeplacementOrientation()
  testCommandesComplexes()

  console.log("\n✅ Tous les tests de déplacement ont réussi!")
}

runAllTests()

