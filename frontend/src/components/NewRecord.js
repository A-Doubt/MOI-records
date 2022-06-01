import Select from 'react-select';
import React from 'react';
import axios from 'axios';
import {
	bossNameInputOptions,
	teamSizeInputOptions,
	modeInputOptions,
	customSelectTheme,
} from './react-select-helper';

export default function NewRecord() {

	// hidden input (to make things easier to handle)
	const [bossNameInput, setBossNameInput] = React.useState('');

	// input values
	const [modeValue, setModeValue] = React.useState('');
	const [teamValue, setTeamValue] = React.useState('');

	// input options
	const [teamOptions, setTeamOptions] = React.useState(teamSizeInputOptions);
	const [modeOptions, setModeOptions] = React.useState(modeInputOptions);

	// set the options on mode and teamsize when changing encounter name
	React.useEffect(() => {
		switch (bossNameInput) {
			case 'Araxxi':
			case 'Nex':
			case 'Raksha':
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[1],
					teamSizeInputOptions[2],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				console.log('solo duo / NM');
				break;

			case 'Arch-Glacor':
			case 'Commander Zilyana':
			case 'General Graardor':
			case 'Giant Mole':
			case 'Gregorovic':
			case 'Helwyr':
			case "Kree'arra":
			case "K'ril Tsutsaroth":
			case 'The Twin Furies':
			case 'TzKal-Zuk':
			case 'Vindicta & Gorvek':
				setTeamOptions([teamSizeInputOptions[1]]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
					{ value: true, label: 'Hardmode' },
				]);
				console.log('solo / NM HM');
				break;

			case 'Beastmaster Durzag':
			case 'Yakamaru':
				setTeamOptions([teamSizeInputOptions[5]]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				break;

			case 'Corporeal Beast':
			case 'Har-Aken':
			case 'Kalphite Queen':
			case 'King Black Dragon':
			case 'Legiones':
			case 'The Magister':
			case 'Queen Black Dragon':
			case 'Telos':
			case 'TzTok-Jad':
				setTeamOptions([teamSizeInputOptions[1]]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
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
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[1],
					teamSizeInputOptions[2],
					teamSizeInputOptions[3],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				console.log('solo duo trio / NM');
				break;

			case 'Kalphite King':
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[1],
					teamSizeInputOptions[2],
					teamSizeInputOptions[3],
					teamSizeInputOptions[4],
					teamSizeInputOptions[5],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				console.log('solo duo trio four mass / NM');
				break;

			case 'Kerapac':
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[1],
					teamSizeInputOptions[2],
					teamSizeInputOptions[3],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
					{ value: true, label: 'Hardmode' },
				]);
				console.log('solo duo trio / NM HM');
				break;

			case 'Nex - Angel of Death':
				setTeamOptions([teamSizeInputOptions[5]]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				console.log('mass / NM');
				break;
			case 'Solak':
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[2],
					teamSizeInputOptions[3],
					teamSizeInputOptions[4],
					teamSizeInputOptions[5],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
				]);
				console.log('duo trio 4man mass / NM');
				break;
			case 'Vorago':
				setTeamOptions([
					teamSizeInputOptions[0],
					teamSizeInputOptions[1],
					teamSizeInputOptions[2],
					teamSizeInputOptions[3],
					teamSizeInputOptions[4],
					teamSizeInputOptions[5],
				]);
				setModeOptions([
					{
						value: false,
						label: 'Normal mode',
					},
					{
						value: true,
						label: 'Hardmode',
					},
				]);
				console.log('solo duo trio 4man mass / NM HM');
				break;

			default:
				console.log('something went wrong?');
		}
	}, [bossNameInput]);

	// change the team size input when changing encounter name
	React.useEffect(() => {
		if (teamOptions.find((option) => option.value === 1)) {
			console.log('CHANGING TO SOLO');
			setTeamValue({ value: 1, label: 'Solo' });
		} else {
			setTeamValue({ value: '', label: 'Any' });
		}
	}, [teamOptions]);

	function handleBossChange(e) {
		setBossNameInput(e.value);
	}

	function handleModeChange(e) {
		setModeValue({
			value: e.value,
			label: e.value ? 'Hard mode' : 'Normal mode',
		});
	}

	function handleTeamChange(e) {
		let label;
		if (e.value === 1) label = 'Solo';
		else if (e.value === 2) label = 'Duo';
		else if (e.value === 3) label = 'Trio';
		else if (e.value === 4) label = '4-man';
		else label = '5 or more';

		setTeamValue({
			value: e.value,
			label: label,
		});
		console.log('e.value: ', e.value, 'label: ', label);
	}


	// If switching from a boss that has hardmode to a one with only
	// normal mode force to change the mode input to Normal mode.
	React.useEffect(() => {
		if (!modeOptions.find((option) => option.value === true)) {
			console.log('CHANGING TO NM');
			setModeValue({ value: false, label: 'Normal mode' });
		}
	}, [modeOptions]);



	function handleSubmit(e) {
		console.log(e);
		e.preventDefault();
		console.log('submited');
	}

	return (
		<>
			<h1>Add a new Record here</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="boss-name">Encouter name</label>
				<Select
					options={bossNameInputOptions}
					onChange={handleBossChange}
					inputId="boss-name"
					styles={customSelectTheme}
				/>
				<input type="hidden" value={bossNameInput} name="boss-name" />

				{bossNameInput && (
					<>
						<label htmlFor="mode">Mode</label>
						<Select
							options={modeOptions}
							onChange={handleModeChange}
							inputId="mode"
							styles={customSelectTheme}
							value={modeValue}
						/>
					</>
				)}
				{bossNameInput && (
					<>
						<label htmlFor="team">Team size</label>
						<Select
							options={teamOptions}
							onChange={handleTeamChange}
							inputId="team"
							styles={customSelectTheme}
							value={teamValue}
						/>
					</>
				)}

				<fieldset>
					<legend>Encounter time</legend>
					<label htmlFor="minutes">Minutes</label>
					<input
						type="number"
						id="minutes"
						name="minutes"
						min={0}
						max={59}
					/>
					<label htmlFor="seconds">Seconds</label>
					<input
						type="number"
						id="seconds"
						name="seconds"
						min={0}
						max={59.4}
						step={0.6}
					/>
				</fieldset>
				<button type="submit">Submit a new record</button>
			</form>
		</>
	);
}
