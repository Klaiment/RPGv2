import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log("=== EXÉCUTION DE TOUS LES TESTS ===\n")

const testFiles = [
  "character/name.test.js",
  "character/class.test.js",
  "character/stats.test.js",
  "character/equipment.test.js",
  "character/levelup.test.js",
  "movement/basic.test.js",
  "movement/obstacles.test.js",
  "movement/orientation.test.js",
  "combat/attack.test.js",
  "combat/defense.test.js",
  "combat/victory.test.js",
  "inventory/items.test.js",
  "inventory/potions.test.js",
  "inventory/equipment.test.js",
]

async function runTest(testFile) {
  return new Promise((resolve, reject) => {
    const testPath = path.join(__dirname, testFile)
    console.log(`Exécution de ${testFile}...\n`)

    const testProcess = spawn("node", [testPath], { stdio: "inherit" })

    testProcess.on("close", (code) => {
      if (code === 0) {
        console.log(`\n${testFile} terminé avec succès.\n`)
        resolve()
      } else {
        console.error(`\n${testFile} a échoué avec le code ${code}.\n`)
        reject(new Error(`Test failed with code ${code}`))
      }
    })
  })
}

async function runAllTests() {
  try {
    for (const testFile of testFiles) {
      await runTest(testFile)
    }
    console.log("=== TOUS LES TESTS ONT RÉUSSI ===")
  } catch (error) {
    console.error("=== CERTAINS TESTS ONT ÉCHOUÉ ===")
    process.exit(1)
  }
}

runAllTests()

