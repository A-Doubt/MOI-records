const sampleRecords = [
	{
		timeInTicks: 111,
		encounter: {
			bossName: 'Kerapac',
			hardmode: true,
			teamSize: 1,
		},
		players: [{ playerId: 1, style: 'melee' }, { playerId: 3, style: 'magic' }, { playerId: 5, style: 'ranged' }],
		notes: 'test note',
	},
	{
		timeInTicks: 222,
		encounter: {
			bossName: 'Ambassador',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 1, style: 'melee' }],
		notes: 'test note',
	},
	{
		timeInTicks: 333,
		encounter: {
			bossName: 'Kerapac',
			hardmode: true,
			teamSize: 1,
		},
		players: [{ playerId: 2, style: 'melee' }],
		notes: 'test note',
	},
	{
		timeInTicks: 444,
		encounter: {
			bossName: 'Raksha',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 1, style: 'ranged' }],
		notes: 'test note',
	},
	{
		timeInTicks: 555,
		encounter: {
			bossName: 'Raksha',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 1, style: 'ranged' }],
		notes: 'test note',
	},
	{
		timeInTicks: 666,
		encounter: {
			bossName: 'Raksha',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 2, style: 'melee' }],
		notes: 'test note',
	},
	{
		timeInTicks: 777,
		encounter: {
			bossName: 'Raksha',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 4, style: 'melee' }],
		notes: 'test note',
	},
	{
		timeInTicks: 888,
		encounter: {
			bossName: 'Ambassador',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 12, style: 'ranged' }],
		notes: 'test note',
	},
	{
		timeInTicks: 999,
		encounter: {
			bossName: 'Ambassador',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 11, style: 'melee' }],
		notes: 'test note',
	},
	{
		timeInTicks: 1111,
		encounter: {
			bossName: 'Araxxi',
			hardmode: false,
			teamSize: 1,
		},
		players: [{ playerId: 3, style: 'magic' }],
		notes: 'test note',
	}
];

export default sampleRecords;
