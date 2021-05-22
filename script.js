new Vue({
	el: '#app',

	data: {
		playerLife: 100,
		monsterLife: 100,
		result: '',
		running: false,
		healAmount: 0,
		specialAmount: 0,
		playerLog: '',
		monsterLog: '',
		playerImgs: {
			attack: false,
			special: false,
			heal: false,
		},
		monsterImgs: {
			attack: false,
			special: false,
			heal: false,
		},
	},

	computed: {
		hasResult() {
			return this.playerLife <= 0 || this.monsterLife <= 0;
		},

		disabledSpecial() {
			return this.specialAmount == 3;
		},

		disabledHeal() {
			return this.healAmount == 2;
		},
	},

	methods: {
		startGame() {
			this.playerLife = 100;
			this.monsterLife = 100;
			this.result = '';
			this.running = true;
			this.playerLog = '';
			this.monsterLog = '';
			this.healAmount = 0;
			this.specialAmount = 0;
			this.playerImgs = {
				attack: false,
				special: false,
				heal: false,
			};
			this.monsterImgs = {
				attack: false,
				special: false,
				heal: false,
			};
		},

		attack() {
			this.altImage('attack', 950);
			let hurt = this.getRandom(8, 11);
			this.monsterLife = Math.max(this.monsterLife - hurt, 0);
			this.playerLog = `O jogador atingiu o monstro com uma força de ${hurt}.`;

			if (this.monsterLife > 0) {
				hurt = this.getRandom(9, 12);
				this.playerLife = Math.max(this.playerLife - hurt, 0);
				this.monsterLog = `O monstro atingiu o jogador com uma força de ${hurt}.`;
			}
		},

		altImage(img, time) {
			this.playerImgs[img] = true;
			this.monsterImgs[img] = true;

			this.delay(img, time);
		},

		restoreImage(img) {
			this.playerImgs[img] = false;
			this.monsterImgs[img] = false;
		},

		delay(img, time) {
			setTimeout(() => {
				this.restoreImage(img);
			}, time);
		},

		special() {
			this.specialAmount++;
			this.altImage('special', 1000);
			let hurt = this.getRandom(9, 16);
			this.monsterLife = Math.max(this.monsterLife - hurt, 0);
			this.playerLog = `O jogador atingiu o monstro com uma força de ${hurt}.`;

			if (this.monsterLife > 0) {
				hurt = this.getRandom(5, 11);
				this.playerLife = Math.max(this.playerLife - hurt, 0);
				this.monsterLog = `O monstro atingiu o jogador com uma força de ${hurt}.`;
			}
		},

		heal() {
			this.healAmount++;
			this.altImage('heal', 1000);
			let heal = this.getRandom(9, 12);
			this.monsterLife = Math.min(this.monsterLife + heal, 100);
			this.playerLog = `O jogador ganhou uma força de ${heal}.`;

			heal = this.getRandom(5, 10);
			this.playerLife = Math.min(this.playerLife + heal, 100);
			this.monsterLog = `O monstro ganhou uma força de ${heal}.`;
		},

		getRandom(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		},
	},

	watch: {
		hasResult(value) {
			if (value) {
				this.result =
					this.playerLife > 0 ? 'Você Ganhou! :)' : 'Você Perdeu! :(';
				this.running = false;
			} else {
				this.result = '';
			}
		},
	},
});
