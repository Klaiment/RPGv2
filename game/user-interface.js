import readline from "readline"

export function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

