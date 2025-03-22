import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS DES STATISTIQUES INITIALES ===")

// Test des statistiques initiales pour chaque classe
function testStatistiquesInitiales() {
  const guerrier = new Character("Guerrier", "guerrier")
  const mage = new Character("Mage", "mage")
  const voleur = new Character("Voleur", "voleur")

  // Vérifier les statistiques du guerrier
  assert.strictEqual(guerrier.stats.hp, 150, "Les PV du guerrier devraient être 150")
  assert.strictEqual(guerrier.stats.mp, 50, "Les PM du guerrier devraient être 50")
  assert.strictEqual(guerrier.stats.strength, 15, "La force du guerrier devrait être 15")
  assert.strictEqual(guerrier.stats.defense, 12, "La défense du guerrier devrait être 12")

  // Vérifier les statistiques du mage
  assert.strictEqual(mage.stats.hp, 90, "Les PV du mage devraient être 90")
  assert.strictEqual(mage.stats.mp, 150, "Les PM du mage devraient être 150")
  assert.strictEqual(mage.stats.intelligence, 15, "L'intelligence du mage devrait être 15")
  assert.strictEqual(mage.stats.magicResistance, 12, "La résistance magique du mage devrait être 12")

  // Vérifier les statistiques du voleur
  assert.strictEqual(voleur.stats.hp, 110, "Les PV du voleur devraient être 110")
  assert.strictEqual(voleur.stats.mp, 70, "Les PM du voleur devraient être 70")
  assert.strictEqual(voleur.stats.agility, 15, "L'agilité du voleur devrait être 15")
  assert.strictEqual(voleur.stats.luck, 12, "La chance du voleur devrait être 12")

  console.log("✅ Test : Statistiques initiales des classes - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testStatistiquesInitiales()

  console.log("\n✅ Tous les tests de statistiques initiales ont réussi!")
}

runAllTests()

