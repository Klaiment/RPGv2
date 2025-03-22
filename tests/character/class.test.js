import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS DE SÉLECTION DE CLASSE ===")

// Test d'acceptation 2.1 : Sélection d'une classe valide
function testSelectionClasse() {
  const guerrier = new Character("Guerrier", "guerrier")
  const mage = new Character("Mage", "mage")
  const voleur = new Character("Voleur", "voleur")

  assert.strictEqual(guerrier.characterClass, "guerrier", 'La classe devrait être "guerrier"')
  assert.strictEqual(mage.characterClass, "mage", 'La classe devrait être "mage"')
  assert.strictEqual(voleur.characterClass, "voleur", 'La classe devrait être "voleur"')

  console.log("✅ Test 2.1 : Sélection d'une classe valide - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testSelectionClasse()

  console.log("\n✅ Tous les tests de sélection de classe ont réussi!")
}

runAllTests()

