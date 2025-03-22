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
    attack: 10,
    defense: 3,
    defeated: false,
  }
}

function testPlayerDefend() {
  const character = new Character("Héros", "guerrier")
  const monster = createTestMonster()
  const combat = new Combat(character, monster)

  const characterHpBeforeNormal = character.stats.hp
  combat.monsterAttack()
  const normalDamage = characterHpBeforeNormal - character.stats.hp

  character.stats.hp = characterHpBeforeNormal

  combat.playerDefend()
  assert.strictEqual(combat.isPlayerDefending, true, "L'état de défense devrait être activé")

  const characterHpBeforeDefense = character.stats.hp
  combat.monsterAttack()
  const damageWithDefense = characterHpBeforeDefense - character.stats.hp

  assert.strictEqual(damageWithDefense < normalDamage, true, "Les dégâts devraient être réduits avec la défense")

  assert.strictEqual(combat.isPlayerDefending, false, "L'état de défense devrait être réinitialisé")

  console.log(`Dégâts normaux: ${normalDamage}, Dégâts avec défense: ${damageWithDefense}`)
  console.log("✅ Test : Défense du joueur - RÉUSSI")
}

function runAllTests() {
  testPlayerDefend()

  console.log("\n✅ Tous les tests de défense en combat ont réussi!")
}

runAllTests()

