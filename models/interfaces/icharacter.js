export class ICharacter {
  constructor(name, characterClass) {
    if (this.constructor === ICharacter) {
      throw new Error("ICharacter est une interface et ne peut pas être instanciée directement")
    }
  }

  equip(item) {
    throw new Error("La méthode equip() doit être implémentée")
  }

  gainExp(amount) {
    throw new Error("La méthode gainExp() doit être implémentée")
  }

  levelUp() {
    throw new Error("La méthode levelUp() doit être implémentée")
  }
}

