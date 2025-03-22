import { Character } from "../../models/character.js"
import { Combat } from "../../models/combat.js"
import assert from "assert"

console.log("=== TESTS DE DÉFENSE EN COMBAT ===")

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

// Test de défense du joueur
function testPlayerDefend() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  // Action : le joueur se défend
  combat.playerDefend()

  // Vérifier que l'état de défense est activé
  assert.strictEqual(combat.isPlayerDefending, true, "L'état de défense devrait être activé")

  const characterHpBefore = character.stats.hp

  // Action : le monstre attaque
  combat.monsterAttack()

  // Vérifier que le joueur a perdu moins de PV grâce à la défense
  const actualDamage = characterHpBefore - character.stats.hp
  const expectedDamageWithoutDefense = Math.max(1, monster.attack - character.stats.defense)
  \
  assert.strictEqual(actualDamage &lt
  expectedDamageWithoutDefense, true, "Les dégâts devraient être réduits"
  )

  // Vérifier que l'état de défense est réinitialisé après l'attaque du monstre
  assert.strictEqual(combat.isPlayerDefending, false, "L'état de défense devrait être réinitialisé")

  console.log("✅ Test : Défense du joueur - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testPlayerDefend()

  console.log("\n✅ Tous les tests de défense en combat ont réussi!")
}

runAllTests()

