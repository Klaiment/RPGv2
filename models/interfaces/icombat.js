export class ICombat {
  constructor(attacker, defender) {
    if (this.constructor === ICombat) {
      throw new Error("ICombat est une interface et ne peut pas être instanciée directement")
    }
  }

  playerAttack() {
    throw new Error("La méthode playerAttack() doit être implémentée")
  }

  playerDefend() {
    throw new Error("La méthode playerDefend() doit être implémentée")
  }

  monsterAttack() {
    throw new Error("La méthode monsterAttack() doit être implémentée")
  }
}

