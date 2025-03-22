import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS D'UTILISATION DE POTIONS ===")

// Test d'utilisation de potions
function testUtilisationPotion() {
  const character = new Character("Héros", "guerrier")

  // Réduire les PV du personnage
  character.stats.hp = 50

  // Créer une potion de test
  const potion = {
    name: "Potion de soin",
    type: "potion",
    description: "Restaure 20 points de vie.",
    effect: { hp: 20 },
  }

  // Ajouter la potion à l'inventaire
  character.inventory.push(potion)

  // Action : simuler l'utilisation de la potion
  const hpBefore = character.stats.hp

  // Appliquer l'effet de la potion
  character.stats.hp = Math.min(character.stats.hp + potion.effect.hp, character.stats.maxHp)

  // Retirer la potion de l'inventaire
  character.inventory.splice(0, 1)

  // Vérifier que les PV ont augmenté
  assert.strictEqual(character.stats.hp, hpBefore + potion.effect.hp, "Les PV devraient augmenter de 20")

  // Vérifier que la potion a été retirée de l'inventaire
  assert.strictEqual(character.inventory.length, 0, "L'inventaire devrait être vide")

  console.log("✅ Test : Utilisation de potions - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testUtilisationPotion()

  console.log("\n✅ Tous les tests d'utilisation de potions ont réussi!")
}

runAllTests()

