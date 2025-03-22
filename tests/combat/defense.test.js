import { Character } from "../../models/character.js"
import { Combat } from "../../models/combat.js"
import assert from "assert"

console.log("=== TESTS DE DÉFENSE EN COMBAT ===")

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

function testPlayerDefend() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  combat.playerDefend()

  assert.strictEqual(combat.isPlayerDefending, true, "L'état de défense devrait être activé")

  const characterHpBefore = character.stats.hp

  combat.monsterAttack()

  const actualDamage = characterHpBefore - character.stats.hp
  const expectedDamageWithoutDefense = Math.max(1, monster.attack - character.stats.defense)

  assert.strictEqual(actualDamage < expectedDamageWithoutDefense, true, "Les dégâts devraient être réduits")

  assert.strictEqual(combat.isPlayerDefending, false, "L'état de défense devrait être réinitialisé")

  console.log("✅ Test : Défense du joueur - RÉUSSI")
}

function runAllTests() {
  testPlayerDefend()

  console.log("\n✅ Tous les tests de défense en combat ont réussi!")
}

runAllTests()

