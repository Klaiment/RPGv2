import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS DE MONTÉE DE NIVEAU ===")

// Test de montée de niveau
function testMonteeNiveau() {
  const guerrier = new Character("Guerrier", "guerrier")
  const mage = new Character("Mage", "mage")
  const voleur = new Character("Voleur", "voleur")

  // Statistiques initiales
  const guerrierHpInitial = guerrier.stats.maxHp
  const mageHpInitial = mage.stats.maxHp
  const voleurHpInitial = voleur.stats.maxHp

  // Monter de niveau
  guerrier.levelUp()
  mage.levelUp()
  voleur.levelUp()

  // Vérifier les changements de statistiques
  assert.strictEqual(guerrier.level, 2, "Le niveau du guerrier devrait être 2")
  assert.strictEqual(guerrier.stats.maxHp, guerrierHpInitial + 15, "Les PV max du guerrier devraient augmenter de 15")

  assert.strictEqual(mage.level, 2, "Le niveau du mage devrait être 2")
  assert.strictEqual(mage.stats.maxHp, mageHpInitial + 8, "Les PV max du mage devraient augmenter de 8")

  assert.strictEqual(voleur.level, 2, "Le niveau du voleur devrait être 2")
  assert.strictEqual(voleur.stats.maxHp, voleurHpInitial + 10, "Les PV max du voleur devraient augmenter de 10")

  console.log("✅  voleurHpInitial + 10, 'Les PV max du voleur devraient augmenter de 10")

  console.log("✅ Test : Montée de niveau - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testMonteeNiveau()

  console.log("\n✅ Tous les tests de montée de niveau ont réussi!")
}

runAllTests()

