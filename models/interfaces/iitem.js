export class IItem {
  constructor(name, type, description, effect) {
    if (this.constructor === IItem) {
      throw new Error("IItem est une interface et ne peut pas être instanciée directement")
    }

    this.name = name
    this.type = type
    this.description = description
    this.effect = effect
  }

  applyEffect(target) {
    throw new Error("La méthode applyEffect() doit être implémentée")
  }
}

