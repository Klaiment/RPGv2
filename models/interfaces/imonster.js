export class IMonster {
  constructor(name, level) {
    if (this.constructor === IMonster) {
      throw new Error("IMonster est une interface et ne peut pas être instanciée directement")
    }

    this.name = name
    this.level = level
    this.defeated = false
  }

  attack(target) {
    throw new Error("La méthode attack() doit être implémentée")
  }

  takeDamage(damage) {
    throw new Error("La méthode takeDamage() doit être implémentée")
  }
}

