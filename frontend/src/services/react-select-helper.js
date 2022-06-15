export const bossesOptions = [
	{
		bossName: 'The Ambassador',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Araxxi',
		teamSizes: [1, 2],
		modes: [false],
	},
	{
		bossName: 'Arch-Glacor',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Astellarn',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'The Barrows: Rise of the Six',
		teamSizes: [4],
		modes: [false],
	},
	{
		bossName: 'Beastmaster Durzag',
		teamSizes: [10],
		modes: [false],
	},
	{
		bossName: 'Black Stone Dragon',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Commander Zilyana',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Corporeal Beast',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Crassian Leviathan',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'General Graardor',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Giant Mole',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Gregorovic',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Har-Aken',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Helwyr',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Kalphite King',
		teamSizes: [1, 2, 3, 4, 'mass'],
		modes: [false],
	},
	{
		bossName: 'Kalphite Queen',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Kerapac',
		teamSizes: [1, 2, 3],
		modes: [false, true],
	},
	{
		bossName: 'King Black Dragon',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: "Kree'arra",
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: "K'ril Tsutsaroth",
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Legiones',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'The Magister',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Masuta the Ascended',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Nex',
		teamSizes: [1, 2],
		modes: [false],
	},
	{
		bossName: 'Nex - Angel of Death',
		teamSizes: [7],
		modes: [false],
	},
	{
		bossName: 'Queen Black Dragon',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Raksha',
		teamSizes: [1, 2],
		modes: [false],
	},
	{
		bossName: 'The Sanctum Guardian',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Seiryu the Azure Serpent',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Solak',
		teamSizes: [1, 2, 3, 4, 'mass'],
		modes: [false],
	},
	{
		bossName: 'Taraket the Necromancer',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Telos',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'The Twin Furies',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'TzKal-Zuk',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'TzTok-Jad',
		teamSizes: [1],
		modes: [false],
	},
	{
		bossName: 'Verak Lith',
		teamSizes: [1, 2, 3],
		modes: [false],
	},
	{
		bossName: 'Vindicta & Gorvek',
		teamSizes: [1],
		modes: [false, true],
	},
	{
		bossName: 'Vorago',
		teamSizes: [1, 2, 3, 4, 'mass'],
		modes: [false, true],
	},
	{
		bossName: 'Yakamaru',
		teamSizes: [10],
		modes: [false],
	},
];

export const customSelectTheme = {
	container: (provided, state) => {
		return {
			...provided,
			width: 340,
			paddingBottom: 14,
			marginTop: 2,
		};
	},
	option: (provided, state) => {
		return {
			...provided,
			cursor: 'pointer',
			color: 'white',
			backgroundColor: state.isSelected ? '#457fff' : 'black',
			padding: 12,
			'&:hover': {
				backgroundColor: '#b8bfcc',
				color: 'black',
			},
		};
	},
	menuList: (provided, state) => {
		return {
			...provided,
			padding: 0,
			marginTop: -20,
			boxShadow: '0 0 0 2px darkblue',
		};
	},
	singleValue: (provided, state) => {
		return {
			...provided,
			color:
				state.data.value || state.data.value === false
					? 'white'
					: 'grey',
			backgroundColor: 'black',
		};
	},
	valueContainer: (provided, state) => {
		return {
			...provided,
			backgroundColor: 'black',
			color: 'white',
		};
	},
	control: (provided, state) => {
		return {
			...provided,
			backgroundColor: 'black',
			color: 'white',
			border: 0,
			borderRadius: 0,
			cursor: state.isDisabled ? 'not-allowed' : 'pointer',
			boxShadow: state.menuIsOpen
				? '0 0 0 2px darkblue'
				: '0 0 0 1px rgb(70, 70, 70)',
			pointerEvents: 'auto',
		};
	},
	dropdownIndicator: (provided, state) => {
		return {
			...provided,
			cursor: state.isDisabled ? 'not-allowed' : 'pointer',
			backgroundColor: 'black',
			color: 'white',
		};
	},
	indicatorSeparator: (provided, state) => {
		return {
			...provided,
			backgroundColor: 'white',
		};
	},
	input: (provided, state) => {
		return {
			...provided,
			color: 'white',
		};
	},
};
