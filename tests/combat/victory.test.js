import { Character } from "../../models/character.js"
import { Combat } from "../../models/combat.js"
import assert from "assert"

console.log("=== TESTS DE VICTOIRE ET DÉFAITE EN COMBAT ===")

// Créer un monstre de test
function createTestMonster() {
  return {
    name: "Gobelin",
    level: 1,
    hp: 20,
    maxHp: 20,
    attack: 5,
    defense: 3,
    defeated: false,
  }
}

// Test de victoire du joueur
function testPlayerVictory() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  monster.hp = 1 // Mettre le monstre à 1 PV pour faciliter la victoire
  const combat = new Combat(character, monster)

  // Action : le joueur attaque
  combat.playerAttack()

  // Vérifier que le monstre est vaincu
  assert.strictEqual(monster.hp <= 0, true, "Le monstre devrait être vaincu")

  console.log("✅ Test : Victoire du joueur - RÉUSSI")
}

// Test de défaite du joueur
function testPlayerDefeat() {
  const character = new Character("Héros", "guerrier")
  character.stats.hp = 1 // Mettre le joueur à 1 PV pour faciliter la défaite
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  // Action : le monstre attaque
  combat.monsterAttack()

  // Vérifier que le joueur est vaincu
  assert.strictEqual(character.stats.hp <= 0, true, "Le joueur devrait être vaincu")

  console.log("✅ Test : Défaite du joueur - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testPlayerVictory()
  testPlayerDefeat()

  console.log("\n✅ Tous les tests de victoire et défaite en combat ont réussi!")
}

runAllTests()

