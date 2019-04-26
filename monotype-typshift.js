{
		name: "[Gen 7] ShivayMeta Monotype",
		desc: `Pok&eacute;mon switch secondary type with the next Pokémon in the party, in pairs.`,
		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Same Type Clause'],
		banlist: [],
		onModifyTemplate(template, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter'].includes(effect.id)) return;
			let paired = target.side.team[0];
			switch(target.side.team.indexOf(target.set)) {
                case 0:
                    paired = target.side.team[5];
                    break;
                case 1:
                    paired = target.side.team[0];
                    break;
                case 2:
                    paired = target.side.team[1];
                    break;
                case 3:
                    paired = target.side.team[2];
                    break;
                case 4:
                    paired = target.side.team[3];
                    break;
                case 5:
                    paired = target.side.team[4];
                    break;
            }
			let pokemon = this.deepClone(template);
			
			let team = target.side.team;
			let typeTable;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (i === 0) {
					typeTable = template.types;
				} else {
					typeTable = typeTable.filter(type => template.types.indexOf(type) >= 0);
				}
				if (this.gen >= 7) {
					let item = this.getItem(team[i].item);
					if (item.megaStone && template.species === item.megaEvolves) {
						template = this.getTemplate(item.megaStone);
						typeTable = typeTable.filter(type => template.types.indexOf(type) >= 0);
					}
				}
			}
			let monoType = typeTable[0];
			
			if(pokemon.types[1] == monoType) {
				pokemon.types[1] = pokemon.types[0] + "";
				pokemon.types[0] = monoType;
			}
			let nextTypes = this.getTemplate(paired.species).types;
			
			if(nextTypes[1]) {
				if(nextTypes[1] == monoType) pokemon.types[1] = nextTypes[0];
				else pokemon.types[1] = nextTypes[1]; }
			else pokemon.types[1] = "";
			return pokemon;
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
