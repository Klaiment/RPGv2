import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS D'ÉQUIPEMENT ===")

// Test d'équipement d'objets
function testEquipement() {
  const character = new Character("Héros", "guerrier")

  const weapon = {
    name: "Épée en fer",
    type: "weapon",
    description: "Une épée solide qui augmente votre force de 5.",
    effect: { strength: 5 },
  }

  const armor = {
    name: "Armure en cuir",
    type: "armor",
    description: "Une armure légère qui offre une protection de base.",
    effect: { defense: 2 },
  }

  // Ajouter les objets à l'inventaire
  character.inventory.push(weapon)
  character.inventory.push(armor)

  // Équiper l'arme
  character.equip(weapon)
  assert.strictEqual(character.equipment.weapon, weapon, "L'arme devrait être équipée")
  assert.strictEqual(character.inventory.includes(weapon), false, "L'arme ne devrait plus être dans l'inventaire")

  // Équiper l'armure
  character.equip(armor)
  assert.strictEqual(character.equipment.armor, armor, "L'armure devrait être équipée")
  assert.strictEqual(character.inventory.includes(armor), false, "L'armure ne devrait plus être dans l'inventaire")

  console.log("✅ Test : Équipement d'objets - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testEquipement()

  console.log("\n✅ Tous les tests d'équipement ont réussi!")
}

runAllTests()

