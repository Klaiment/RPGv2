import { Character } from "../models/character.js"
import { Combat } from "../models/combat.js"
import assert from "assert"

console.log("=== TESTS DE COMBAT ===")

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

  assert.strictEqual(actualDamage < expectedDamageWithoutDefense, true, "Les dégâts devraient être réduits")

  // Vérifier que l'état de défense est réinitialisé après l'attaque du monstre
  assert.strictEqual(combat.isPlayerDefending, false, "L'état de défense devrait être réinitialisé")

  console.log("✅ Test : Défense du joueur - RÉUSSI")
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
  testPlayerAttack()
  testPlayerDefend()
  testMonsterAttack()
  testPlayerVictory()
  testPlayerDefeat()

  console.log("\n✅ Tous les tests de combat ont réussi!")
}

runAllTests()

