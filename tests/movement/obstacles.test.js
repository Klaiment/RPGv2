import { Character } from "../../models/character.js"
import { Dungeon } from "../../models/dungeon.js"
import assert from "assert"

console.log("=== TESTS DE DÉPLACEMENT AVEC OBSTACLES ===")

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

// Exécuter tous les tests
function runAllTests() {
  testDeplacementCaseMonstre()
  testDeplacementHorsGrille()
  testRencontreTresor()
  testDeplacementBloque()
  testLimitesGrille()

  console.log("\n✅ Tous les tests de déplacement avec obstacles ont réussi!")
}

runAllTests()

