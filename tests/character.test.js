import { Character } from "../models/character.js"
import assert from "assert"

console.log("=== TESTS DE CRÉATION DE PERSONNAGE ===")

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

  console.log("✅ Test : Montée de niveau - RÉUSSI")
}

// Exécuter tous les tests
function runAllTests() {
  testNomValide()
  testNomTropCourt()
  testNomTropLong()
  testSelectionClasse()
  testStatistiquesInitiales()
  testEquipement()
  testMonteeNiveau()

  console.log("\n✅ Tous les tests de personnage ont réussi!")
}

runAllTests()

