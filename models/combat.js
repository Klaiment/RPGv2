import { ICombat } from "./interfaces/icombat.js"
import { DamageCalculator } from "./combat/damageCalculator.js"

export class Combat extends ICombat {
  constructor(player, monster) {
    super(player, monster)

    this.player = player
    this.monster = monster
    this.isPlayerDefending = false
    this.damageCalculator = new DamageCalculator()
  }

  playerAttack() {
    const damage = this.damageCalculator.calculatePlayerDamage(this.player, this.monster)

    this.monster.hp -= damage

    console.log(`Vous attaquez le ${this.monster.name} et infligez ${damage} points de dégâts!`)

    this.isPlayerDefending = false
  }

  playerDefend() {
    this.isPlayerDefending = true
    console.log("Vous vous préparez à défendre la prochaine attaque.")
  }

  monsterAttack() {
    const damage = this.damageCalculator.calculateMonsterDamage(this.monster, this.player, this.isPlayerDefending)

    this.player.stats.hp -= damage

    console.log(`Le ${this.monster.name} vous attaque et inflige ${damage} points de dégâts!`)

    this.isPlayerDefending = false
  }
}

