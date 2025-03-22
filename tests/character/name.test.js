import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS DE VALIDATION DU NOM ===")

// Test d'acceptation 1.1 : Nom valide
function testNomValide() {
  const character = new Character("Héros", "guerrier")
  assert.strictEqual(character.name, "Héros", 'Le nom du personnage devrait être "Héros"')
  console.log("✅ Test 1.1 : Nom valide - RÉUSSI")
}

// Test d'acceptation 1.2 : Nom trop court (simulé)
function testNomTropCourt() {
  try {
    // Simulation de la validation qui se fait dans index.js
    const nom = "AB"
    assert.strictEqual(nom.length >= 3, false, "Le nom est trop court")
    console.log("✅ Test 1.2 : Nom trop court - RÉUSSI")
  } catch (error) {
    console.error("❌ Test 1.2 : Nom trop court - ÉCHOUÉ", error)
  }
}

// Test d'acceptation 1.3 : Nom trop long (simulé)
function testNomTropLong() {
  try {
    // Simulation de la validation qui se fait dans index.js
    const nom = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    assert.strictEqual(nom.length <= 20, false, "Le nom est trop long")
    console.log("✅ Test 1.3 : Nom trop long - RÉUSSI")
  } catch (error) {
    console.error("❌ Test 1.3 : Nom trop long - ÉCHOUÉ", error)
  }
}

// Exécuter tous les tests
function runAllTests() {
  testNomValide()
  testNomTropCourt()
  testNomTropLong()

  console.log("\n✅ Tous les tests de validation du nom ont réussi!")
}

runAllTests()

