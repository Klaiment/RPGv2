export class DamageCalculator {
  calculatePlayerDamage(player, monster) {
    let damage = player.stats.strength

    if (player.equipment.weapon) {
      damage += player.equipment.weapon.effect.strength || 0
    }

    return Math.max(1, damage - monster.defense)
  }

  calculateMonsterDamage(monster, player, isDefending) {
    const damage = monster.attack
    let defense = player.stats.defense

    if (player.equipment.armor) {
      defense += player.equipment.armor.effect.defense || 0
    }

    if (isDefending) {
      defense *= 1.5
    }

    return Math.max(1, damage - defense)
  }
}

