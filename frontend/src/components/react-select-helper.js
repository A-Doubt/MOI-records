export const customSelectTheme = {
	container: (provided, state) => {
		return {
			...provided,
			width: 340,
		};
	},
	option: (provided, state) => {
		return {
			...provided,
			cursor: 'pointer',
			color: 'white',
			backgroundColor: state.isSelected ? '#457fff' : 'black',
			hover: 'red',
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
			marginTop: -6,
			boxShadow: '0 0 0 2px darkblue',
		};
	},
	singleValue: (provided, state) => {
		return { ...provided, color: 'white', backgroundColor: 'black' };
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
			cursor: 'pointer',
			boxShadow: state.menuIsOpen
				? '0 0 0 2px darkblue'
				: '0 0 0 1px darkgrey',
		};
	},
	dropdownIndicator: (provided, state) => {
		return {
			...provided,
			cursor: 'pointer',
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
export const bossNameInputOptions = [
	{
		value: 'Araxxi',
		label: 'Araxxi',
	},
	{
		value: 'Arch-Glacor',
		label: 'Arch-Glacor',
	},
	{
		value: 'Beastmaster Durzag',
		label: 'Beastmaster Durzag',
	},
	{
		value: 'Commander Zilyana',
		label: 'Commander Zilyana',
	},
	{
		value: 'Corporeal Beast',
		label: 'Corporeal Beast',
	},
	{
		value: 'The Sanctum Guardian',
		label: 'ED1 - The Sanctum Guardian',
	},
	{
		value: 'Masuta the Ascended',
		label: 'ED1 - Masuta the Ascended',
	},
	{
		value: 'Seiryu the Azure Serpent',
		label: 'ED1 - Seiryu the Azure Serpent',
	},
	{
		value: 'Astellarn',
		label: 'ED2 - Astellarn',
	},
	{
		value: 'Verak Lith',
		label: 'ED2 - Verak Lith',
	},
	{
		value: 'Black Stone Dragon',
		label: 'ED2 - Black Stone Dragon',
	},
	{
		value: 'Crassian Leviathan',
		label: 'ED3 - Crassian Leviathan',
	},
	{
		value: 'Taraket the Necromancer',
		label: 'ED3 - Taraket the Necromancer',
	},
	{
		value: 'The Ambassador',
		label: 'ED3 - The Ambassador',
	},
	{
		value: 'General Graardor',
		label: 'General Graardor',
	},
	{
		value: 'Giant Mole',
		label: 'Giant Mole',
	},
	{
		value: 'Gregorovic',
		label: 'Gregorovic',
	},
	{
		value: 'Har-Aken',
		label: 'Har-Aken',
	},
	{
		value: 'Helwyr',
		label: 'Helwyr',
	},
	{
		value: 'Kalphite King',
		label: 'Kalphite King',
	},
	{
		value: 'Kalphite Queen',
		label: 'Kalphite Queen',
	},
	{
		value: 'Kerapac',
		label: 'Kerapac',
	},
	{
		value: 'King Black Dragon',
		label: 'King Black Dragon',
	},
	{
		value: "Kree'arra",
		label: "Kree'arra",
	},
	{
		value: "K'ril Tsutsaroth",
		label: "K'ril Tsutsaroth",
	},
	{
		value: 'Legiones',
		label: 'Legiones',
	},
	{
		value: 'The Magister',
		label: 'The Magister',
	},
	{
		value: 'Nex',
		label: 'Nex',
	},
	{
		value: 'Nex - Angel of Death',
		label: 'Nex - Angel of Death',
	},
	{
		value: 'Queen Black Dragon',
		label: 'Queen Black Dragon',
	},
	{
		value: 'Raksha',
		label: 'Raksha',
	},
	{
		value: 'Solak',
		label: 'Solak',
	},
	{
		value: 'Telos',
		label: 'Telos',
	},
	{
		value: 'The Twin Furies',
		label: 'The Twin Furries',
	},
	{
		value: 'TzKal-Zuk',
		label: 'TzKal-Zuk',
	},
	{
		value: 'TzTok-Jad',
		label: 'TzTok-Jad (Fight Caves)',
	},
	{
		value: 'Vindicta & Gorvek',
		label: 'Vindicta & Gorvek',
	},
	{
		value: 'Vorago',
		label: 'Vorago',
	},
	{
		value: 'Yakamaru',
		label: 'Yakamaru',
	},
];
export const teamSizeInputOptions = [
	{
		value: '',
		label: 'Any',
	},
	{
		value: 1,
		label: 'Solo',
	},
	{
		value: 2,
		label: 'Duo',
	},
	{
		value: 3,
		label: 'Trio',
	},
	{
		value: 4,
		label: '4-man',
	},
	{
		value: 'mass',
		label: '5 or more',
	},
];
console.log(teamSizeInputOptions[0]);
// false stands form normalmode, true for hardmode
export const modeInputOptions = [
	{
		value: false,
		label: 'Normal mode',
	},
	{
		value: true,
		label: 'Hard mode',
	},
];

export const voragoRotationOptions = [
	{
		value: 'N/A',
		label: 'N/A',
	},
	{
		value: 'Ceiling collapse',
		label: 'Ceiling collapse',
	},
	{
		value: 'Scopulus',
		label: 'Scopulus',
	},
	{
		value: 'Vitalis',
		label: 'Vitalis',
	},
	{
		value: 'Green Bomb',
		label: 'Green Bomb',
	},
	{
		value: 'Team Split',
		label: 'Team Split',
	},
	{
		value: 'The End',
		label: 'The End',
	},
];
