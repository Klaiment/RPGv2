export class Combat {
  constructor(player, monster) {
    this.player = player
    this.monster = monster
    this.isPlayerDefending = false
  }

  playerAttack() {
    let damage = this.player.stats.strength

    if (this.player.equipment.weapon) {
      damage += this.player.equipment.weapon.effect.strength || 0
    }

    damage = Math.max(1, damage - this.monster.defense)

    this.monster.hp -= damage

    console.log(`Vous attaquez le ${this.monster.name} et infligez ${damage} points de dégâts!`)

    this.isPlayerDefending = false
  }

  playerDefend() {
    this.isPlayerDefending = true
    console.log("Vous vous préparez à défendre la prochaine attaque.")
  }

  monsterAttack() {
    let damage = this.monster.attack

    let defense = this.player.stats.defense

    if (this.player.equipment.armor) {
      defense += this.player.equipment.armor.effect.defense || 0
    }

    if (this.isPlayerDefending) {
      defense *= 1.5
      this.isPlayerDefending = false
    }

    damage = Math.max(1, damage - defense)

    this.player.stats.hp -= damage

    console.log(`Le ${this.monster.name} vous attaque et inflige ${damage} points de dégâts!`)
  }
}

