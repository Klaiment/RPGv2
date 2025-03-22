import { Character } from "../../models/character.js"
import { Item } from "../../models/item.js"
import assert from "assert"

console.log("=== TESTS DE GESTION DES OBJETS ===")

// Test d'ajout d'objets à l'inventaire
function testAjoutInventaire() {
  const character = new Character("Héros", "guerrier")

  // Créer des objets de test
  const potion = {
    name: "Potion de soin",
    type: "potion",
    description: "Restaure 20 points de vie.",
    effect: { hp: 20 },
  }

  const weapon = {
    name: "Épée en fer",
    type: "weapon",
    description: "Une épée solide qui augmente votre force de 5.",
    effect: { strength: 5 },
  }

  // Action : ajouter les objets à l'inventaire
  character.inventory.push(potion)
  character.inventory.push(weapon)

  // Vérifier que les objets sont dans l'inventaire
  assert.strictEqual(character.inventory.length, 2, "L'inventaire devrait contenir 2 objets")
  assert.strictEqual(character.inventory.includes(potion), true, "L'inventaire devrait contenir la potion")
  assert.strictEqual(character.inventory.includes(weapon), true, "L'inventaire devrait contenir l'arme")

  console.log("✅ Test : Ajout d'objets à l'inventaire - RÉUSSI")
}

// Test de génération d'objets aléatoires
function testGenerationObjets() {
  // Générer différents types d'objets
  const potion = Item.generatePotion()
  const weapon = Item.generateWeapon(1)
  const armor = Item.generateArmor(1)
  const randomItem = Item.generateRandomItem(1)

  // Vérifier que les objets sont correctement générés
  assert.strictEqual(potion.type, "potion", "L'objet devrait être une potion")
  assert.strictEqual(weapon.type, "weapon", "L'objet devrait être une arme")
  assert.strictEqual(armor.type, "armor", "L'objet devrait être une armure")
  assert.strictEqual(
    ["potion", "weapon", "armor"].includes(randomItem.type),
    true,
    "L'objet aléatoire devrait être d'un type valide",
  )

  console.log("✅ Test : Génération d'objets aléatoires - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testAjoutInventaire()
  testGenerationObjets()

  console.log("\n✅ Tous les tests de gestion des objets ont réussi!")
}

runAllTests()

