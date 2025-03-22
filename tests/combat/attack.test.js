import { Character } from "../../models/character.js"
import { Combat } from "../../models/combat.js"
import assert from "assert"

console.log("=== TESTS D'ATTAQUE EN COMBAT ===")

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

// Test d'attaque du joueur
function testPlayerAttack() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  const monsterHpBefore = monster.hp

  // Action : le joueur attaque
  combat.playerAttack()

  // Vérifier que le monstre a perdu des PV
  assert.strictEqual(monster.hp < monsterHpBefore, true, "Le monstre devrait perdre des PV")

  // Vérifier que les dégâts sont calculés correctement
  const expectedDamage = Math.max(1, character.stats.strength - monster.defense)
  const actualDamage = monsterHpBefore - monster.hp
  assert.strictEqual(actualDamage, expectedDamage, `Les dégâts devraient être de ${expectedDamage}`)

  console.log("✅ Test : Attaque du joueur - RÉUSSI")
}

// Test d'attaque du monstre
function testMonsterAttack() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  const characterHpBefore = character.stats.hp

  // Action : le monstre attaque
  combat.monsterAttack()

  // Vérifier que le joueur a perdu des PV
  assert.strictEqual(character.stats.hp < characterHpBefore, true, "Le joueur devrait perdre des PV")

  // Vérifier que les dégâts sont calculés correctement
  const expectedDamage = Math.max(1, monster.attack - character.stats.defense)
  const actualDamage = characterHpBefore - character.stats.hp
  assert.strictEqual(actualDamage, expectedDamage, `Les dégâts devraient être de ${expectedDamage}`)

  console.log("✅ Test : Attaque du monstre - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testPlayerAttack()
  testMonsterAttack()

  console.log("\n✅ Tous les tests d'attaque en combat ont réussi!")
}

runAllTests()

