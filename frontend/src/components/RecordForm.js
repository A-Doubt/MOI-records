import Select from 'react-select';
import React from 'react';
import {
	bossNameInputOptions,
	teamSizeInputOptions,
	modeInputOptions,
	customSelectTheme,
} from './react-select-helper';

console.log(teamSizeInputOptions);

function RecordForm() {
	const [bossNameInput, setBossNameInput] = React.useState('');
	const [TeamSizeInput, setTeamSizeInput] = React.useState(1);
	const [modeInput, setModeInput] = React.useState('');

	const [teamOptions, setTeamOptions] = React.useState(teamSizeInputOptions);
	const [modeOptions, setModeOptions] = React.useState(modeInputOptions);

	React.useEffect(() => {
		switch (bossNameInput) {
			case 'Araxxi':
			case 'Nex':
			case 'Raksha':
				console.log('solo duo / NM')
				break;

			case 'Arch-Glacor':
			case 'Commander Zilyana':
			case 'General Graardor':
			case 'Giant Mole':
			case 'Gregorovic':
			case 'Helwyr':
			case 'Kree\'arra':
			case 'K\'ril Tsutsaroth':
			case 'The Twin Furies':
			case 'TzKal-Zuk':
			case 'Vindicta & Gorvek':
				console.log('solo / NM HM')
				break;

			case 'Beastmaster Durzag':
			case 'Yakamaru':
				console.log('raid')
				break;

			case 'Corporeal Beast':
			case 'Har-Aken':
			case 'Kalphite Queen':
			case 'King Black Dragon':
			case 'Legiones':
			case 'Magister':
			case 'Queen Black Dragon':
			case 'TzTok-Jad':
				console.log('solo / NM')
				break;

			case 'The Sanctum Guardian':
			case 'Masuta the Ascended':
			case 'Seiryu the Azure Serpent':
			case 'Astellarn':
			case 'Verak Lith':
			case 'Black Stone Dragon':
			case 'Crassian Leviathan':
			case 'Taraket the Necromancer':
			case 'The Ambassador':
				console.log('solo duo trio / NM')
				break;

			case 'Kalphite King':
			case 'Solak':
				console.log('solo duo trio four mass / NM')
				break;

			case 'Kerapac':
				console.log('solo duo trio / NM HM')
				break;

			case 'Nex - Angel of Death':
				console.log('mass / NM');
				break;

			case 'Vorago':
				console.log('solo duo trio 4man mass / NM HM')
				break;

			default:
				console.log('something went wrong?');
		}

		// if (bossNameInput === 'The Ambassador') {
		// 	setModeOptions({
		// 		value: false,
		// 		label: 'Normal mode',
		// 	});
		// 	setTeamOptions([
		// 		teamSizeInputOptions[0],
		// 		teamSizeInputOptions[1],
		// 		teamSizeInputOptions[2],
		// 		teamSizeInputOptions[3],
		// 	]);
		// }
		// if (bossNameInput === 'Araxxi') {
		// 	setModeOptions({
		// 		value: false,
		// 		label: 'Normal mode',
		// 	});
		// 	setTeamOptions([
		// 		teamSizeInputOptions[0],
		// 		teamSizeInputOptions[1],
		// 		teamSizeInputOptions[2],
		// 	]);
		// }
		// if (bossNameInput === 'Arch-Glacor') {
		// 	setModeOptions(
		// 		{
		// 			value: false,
		// 			label: 'Normal mode',
		// 		},
		// 		{ value: true, label: 'Hard mode' }
		// 	);
		// 	setTeamOptions([teamSizeInputOptions[0]]);
		// }
	}, [bossNameInput]);

	return (
		<form>
			<label htmlFor="boss-name">Boss name</label>
			<Select
				options={bossNameInputOptions}
				onChange={(e) => setBossNameInput(e.value)}
				inputId="boss-name"
				styles={customSelectTheme}
			/>
			<input type="hidden" value={bossNameInput} name="boss-name" />

			<label htmlFor="size">Team size</label>
			<Select
				options={teamOptions}
				onChange={(e) => setTeamSizeInput(e.value)}
				defaultValue={{ label: 'solo', value: TeamSizeInput }}
				inputId="team-size"
				styles={customSelectTheme}
			/>
			<input type="hidden" value={TeamSizeInput} name="team-size" />

			<label htmlFor="hardmode">Mode</label>
			<Select
				options={modeOptions}
				onChange={(e) => setModeInput(e.value)}
				defaultValue={{ label: 'Any', value: modeInput }}
				inputId="hardmode"
				styles={customSelectTheme}
			/>
			<input type="hidden" value={modeInput} name="hardmode" />
			<button type="submit">Submit</button>
		</form>
	);
}

export default RecordForm;
