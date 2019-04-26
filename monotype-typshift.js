{
		name: "[Gen 7] ShivayMeta Monotype",
		desc: `Pok&eacute;mon that share a type pass their other type to the next Pokémon in the party.`,
		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		], //This is my lazy way of implementing Monotype ruleset
		onModifyTemplate(template, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter'].includes(effect.id)) return;
			let paired = target.side.team[0];
			switch(target.side.team.indexOf(target.set)) {
                case 0:
                    paired = target.side.team[target.side.team.length - 1]; //This is the important change
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
