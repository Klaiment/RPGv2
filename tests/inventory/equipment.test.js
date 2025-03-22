import { Character } from "../../models/character.js"
import assert from "assert"

console.log("=== TESTS D'ÉQUIPEMENT D'OBJETS ===")

// Test d'équipement d'armes
function testEquipementArme() {
  const character = new Character("Héros", "guerrier")

  // Créer une arme de test
  const weapon = {
    name: "Épée en fer",
    type: "weapon",
    description: "Une épée solide qui augmente votre force de 5.",
    effect: { strength: 5 },
  }

  // Ajouter l'arme à l'inventaire
  character.inventory.push(weapon)

  // Action : équiper l'arme
  character.equip(weapon)

  // Vérifier que l'arme est équipée
  assert.strictEqual(character.equipment.weapon, weapon, "L'arme devrait être équipée")

  // Vérifier que l'arme a été retirée de l'inventaire
  assert.strictEqual(character.inventory.includes(weapon), false, "L'arme ne devrait plus être dans l'inventaire")

  console.log("✅ Test : Équipement d'armes - RÉUSSI")
}

// Test d'équipement d'armures
function testEquipementArmure() {
  const character = new Character("Héros", "guerrier")

  // Créer une armure de test
  const armor = {
    name: "Armure en cuir",
    type: "armor",
    description: "Une armure légère qui offre une protection de base.",
    effect: { defense: 2 },
  }

  // Ajouter l'armure à l'inventaire
  character.inventory.push(armor)

  // Action : équiper l'armure
  character.equip(armor)

  // Vérifier que l'armure est équipée
  assert.strictEqual(character.equipment.armor, armor, "L'armure devrait être équipée")

  // Vérifier que l'armure a été retirée de l'inventaire
  assert.strictEqual(character.inventory.includes(armor), false, "L'armure ne devrait plus être dans l'inventaire")

  console.log("✅ Test : Équipement d'armures - RÉUSSI")
}

// Test de remplacement d'équipement
function testRemplacementEquipement() {
  const character = new Character("Héros", "guerrier")

  // Créer deux armes de test
  const weapon1 = {
    name: "Épée en fer",
    type: "weapon",
    description: "Une épée solide qui augmente votre force de 5.",
    effect: { strength: 5 },
  }

  const weapon2 = {
    name: "Hache de bataille",
    type: "weapon",
    description: "Une hache puissante mais lente.",
    effect: { strength: 8 },
  }

  // Équiper la première arme
  character.inventory.push(weapon1)
  character.equip(weapon1)

  // Action : équiper la deuxième arme
  character.inventory.push(weapon2)
  character.equip(weapon2)

  // Vérifier que la deuxième arme est équipée
  assert.strictEqual(character.equipment.weapon, weapon2, "La deuxième arme devrait être équipée")

  // Vérifier que la première arme est retournée dans l'inventaire
  assert.strictEqual(character.inventory.includes(weapon1), true, "La première arme devrait être dans l'inventaire")

  // Vérifier que la deuxième arme a été retirée de l'inventaire
  assert.strictEqual(
    character.inventory.includes(weapon2),
    false,
    "La deuxième arme ne devrait plus être dans l'inventaire",
  )

  console.log("✅ Test : Remplacement d'équipement - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testEquipementArme()
  testEquipementArmure()
  testRemplacementEquipement()

  console.log("\n✅ Tous les tests d'équipement d'objets ont réussi!")
}

runAllTests()

