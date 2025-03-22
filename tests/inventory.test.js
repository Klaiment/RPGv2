import { Character } from "../models/character.js"
import { Item } from "../models/item.js"
import assert from "assert"

console.log("=== TESTS DE GESTION D'INVENTAIRE ===")

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
  testUtilisationPotion()
  testEquipementArme()
  testEquipementArmure()
  testRemplacementEquipement()
  testGenerationObjets()

  console.log("\n✅ Tous les tests d'inventaire ont réussi!")
}

runAllTests()

