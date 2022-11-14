const randomDamage = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      battleLog: [],
      gameOver: false,
      win: false,
      draw: false,
    }
  },
  watch: {
    playerHealth(value) {
      if ( value <= 0 && this.monsterHealth <= 0) {
        this.draw = true;
      } else if (value <= 0) {
        this.gameOver = true;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.draw = true;
      }
      else if (value <= 0) {
        this.win = true;
      }
    },
  },
  computed: {
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return {
          width: '0%'
        };
      } else {
      return {
        width: this.playerHealth + '%'
      };
      }
    },
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return {
          width: '0%'
        };
      } else {
        return {
          width: this.monsterHealth + '%'
        };
      }
    }
  },
  methods: {
    playerAttack() {
      const attackValue = randomDamage(3, 13);
      this.monsterHealth -= attackValue;
      this.battleLogMessage('player', 'attack', attackValue);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackValue = randomDamage(8, 18);
      this.playerHealth -= attackValue;
      this.battleLogMessage('monster', 'attack', attackValue);
    },
    playerSpecialAttack() {
      const attackValue = randomDamage(3, 13);
      this.monsterHealth -= attackValue;
      this.battleLogMessage('player', 'special-attack', attackValue);
      this.monsterAttack();
    },
    playerHeal() {
      const healthValue = randomDamage(8, 20);
      if (this.playerHealth + healthValue > 100) {
        this.playerHealth = 100;
      } else this.playerHealth += healthValue;
      this.battleLogMessage('player', 'heal', healthValue);
    },
    battleLogMessage(who, how, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: how,
        actionValue: value,
      })
    },
    playerSurrender() {
      this.gameOver = true;
    },
    restartGame() {
      this.gameOver = false;
      this.win = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.battleLog = [];
    },
  }
});
app.mount('#game')