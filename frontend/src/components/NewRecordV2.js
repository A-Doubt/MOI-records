import React from 'react';
import {
	bossesOptions,
	customSelectTheme,
} from '../services/react-select-helper-v2';
import Select from 'react-select';
import axios from 'axios';
// import _ from 'lodash';
import timeToTicks from '../services/timeToTicks';

export default function NewRecord() {
	const [errorMessage, setErrorMessage] = React.useState('');

	const [fetchedPlayers, setFetchedPlayers] = React.useState([]);
	const [playersValues, setPlayersValues] = React.useState([]);
	const [playersOptions, setPlayersOptions] = React.useState([]);

	// set players options from DB
	React.useEffect(() => {
		const players = [];

		async function fetchData() {
			const data = await axios.get('http://localhost:3000/api/players');
			data.data.forEach((player) => {
				players.push({ label: player.name, value: player._id });
			});
			setPlayersOptions(players);
			setFetchedPlayers(players);
		}
		fetchData();
	}, []);

	const [inputValues, setInputValues] = React.useState({
		boss: {},
		mode: {},
		size: {},
		minutes: '',
		seconds: '',
		notes: '',
		dateKilled: '',
	});
	const [inputOptions, setInputOptions] = React.useState({
		bosses: {},
		modes: {},
		sizes: {},
	});

	// set boss input options
	React.useEffect(() => {
		const bossOptions = bossesOptions.map((boss) => {
			return { value: boss.bossName, label: boss.bossName };
		});
		setInputOptions({ ...inputOptions, bosses: bossOptions });
	}, []);

	function handleBossChange(e) {
		setInputValues({
			...inputValues,
			boss: { value: e.value, label: e.value },
			mode: { value: null, label: 'Choose a mode...' },
			size: { value: null, label: 'Choose a team size...' },
		});
	}

	React.useEffect(() => {
		let modes = [];
		let sizes = [];

		bossesOptions.forEach((bossOption) => {
			// console.log(bossOption.bossName, inputValues.boss)
			if (bossOption.bossName === inputValues.boss.value) {
				bossOption.modes.forEach((mode) => {
					modes.push({
						label: mode ? 'Hardmode' : 'Normal mode',
						value: mode,
					});
				});
				bossOption.teamSizes.forEach((size) => {
					let sizeName;
					switch (size) {
						case 1:
							sizeName = 'Solo';
							break;
						case 2:
							sizeName = 'Duo';
							break;
						case 3:
							sizeName = 'Trio';
							break;
						case 4:
							sizeName = '4-man';
							break;
						case 7:
							sizeName = '7-man';
							break;
						case 10:
							sizeName = 'Raid size';
							break;
						default:
							sizeName = 'Mass';
							break;
					}
					sizes.push({ label: sizeName, value: size });
				});

				setInputOptions({ ...inputOptions, modes, sizes });
				// console.log('----------------');
				// console.log(modes);
				// console.log(sizes);
			}
		});
		setPlayersValues([]);
	}, [inputValues.boss.value]);

	// playersInputs are Select components bundled
	const [playersInputs, setPlayersInputs] = React.useState([]);

	// On team size change to handle the amount of players

	React.useEffect(() => {
		setPlayersValues((prevState) => {
			const newArray = [...prevState];
			newArray.splice(inputValues.size.value);
			return newArray;
		});

		let playerAmount = inputValues.size.value;
		if (inputValues.size.value === 'mass') playerAmount = 7;

		let playersSelectInputs = [];

		for (let i = 0; i < playerAmount; i++) {
			// remove excessive player values added to state
			if (!playersValues[i]) {
				setPlayersValues((prevState) => {
					const newArray = [...prevState];
					newArray.splice(i);
					return newArray;
				});
			}

			playersSelectInputs.push(
				<div key={`div${i}`} className="flex-row">
					Player{[i + 1]}
					<Select
						name={i} // To nake handling easy
						key={`key${i}`}
						options={playersOptions}
						styles={customSelectTheme}
						onChange={handlePlayersChange}
						value={playersValues[i]}
					/>
				</div>
			);
		}
		setPlayersInputs(playersSelectInputs);
	}, [inputValues.size.value]);

	//state to check if chosen players have changed (just swaping true/false)
	const [playersChange, setPlayersChange] = React.useState(true);

	function handlePlayersChange(e, { name }) {
		let players = playersValues; // Array
		if (!players) players = [];

		players[name] = { ...players[name], label: e.label, value: e.value };
		setPlayersValues(players);

		// to trigger useEffect on all players change
		setPlayersChange((old) => !old);
	}

	// TODO
	React.useEffect(() => {
		// console.log(playersValues);
		// console.log(playersOptions);
	}, [playersChange]);

	async function handleSubmit(e) {
		e.preventDefault();
		setErrorMessage('');
		if (!inputValues.boss.value) return setErrorMessage('Pick a boss');
		console.log(inputValues);

		const players = [];
		playersValues.forEach((player) => {
			players.push({ playerId: player.value });
		});

		if (!players.length)
			return setErrorMessage('Choose at least 1 player!');

		const body = {
			timeInTicks: timeToTicks(inputValues.minutes, inputValues.seconds),
			encounter: {
				bossName: inputValues.boss.value,
				hardmode: inputValues.mode.value,
				teamSize: inputValues.size.value,
			},
			players: players,
			dateKilled: new Date(inputValues.dateKilled),
			notes: inputValues.notes ? inputValues.notes : 'none',
		};

		console.log('🚀handleSubmit ~ body', body);
		try {
			const res = await axios({
				url: 'http://localhost:3000/api/records',
				data: body,
				method: 'post',
			});
			const data = res.data;
			console.log(data);


			return data;
		} catch (err) {
			console.log(err)
			console.log(err.response);
			setErrorMessage(err.response.data);
		}
	}

	return (
		<>
			{errorMessage ? (
				<h1 className="error">{errorMessage}</h1>
			) : (
				<h1>Add a new Record here</h1>
			)}

			<form onSubmit={handleSubmit} className="flex-column">
				<div className="container flex-row">
					<div className="form-inputs--container">
						<Select
							options={inputOptions.bosses}
							styles={customSelectTheme}
							onChange={handleBossChange}
							value={
								inputValues.boss.value
									? inputValues.boss
									: { label: 'Choose a boss' }
							}
						/>
						{inputValues.boss.value && (
							<Select
								options={inputOptions.modes}
								styles={customSelectTheme}
								onChange={(e) =>
									setInputValues({
										...inputValues,
										mode: {
											value: e.value,
											label: e.label,
										},
									})
								}
								value={inputValues.mode}
								isDisabled={
									inputValues.boss.value ? false : true
								}
							/>
						)}
						{inputValues.boss.value && (
							<Select
								options={inputOptions.sizes}
								styles={customSelectTheme}
								onChange={(e) => {
									setInputValues({
										...inputValues,
										size: {
											value: e.value,
											label: e.label,
										},
									});
								}}
								value={inputValues.size}
								isDisabled={
									inputValues.boss.value ? false : true
								}
							/>
						)}
					</div>
					<div className="form-inputs-container">
						{inputValues.size.value && playersInputs}
					</div>
				</div>
				<input
					className="input-dark"
					type="number"
					id="minutes"
					name="minutes"
					min={0}
					max={59}
					placeholder="time(minutes)"
					value={inputValues.minutes}
					onChange={(e) => {
						if (e.target.value > 59) e.target.value = 59;
						if (e.target.value < 0) e.target.value = 0;
						setInputValues({
							...inputValues,
							minutes: e.target.value,
						});
					}}
				/>
				<input
					className="input-dark"
					type="number"
					id="seconds"
					name="seconds"
					min={0}
					max={59.4}
					step={0.6}
					placeholder="time(seconds)"
					value={inputValues.seconds}
					onChange={(e) => {
						if (e.target.value > 59.4) e.target.value = 59.4;
						if (e.target.value < 0) e.target.value = 0;
						setInputValues({
							...inputValues,
							seconds: e.target.value,
						});
					}}
					required
				/>
				<label htmlFor="notes">Additional notes</label>
				<textarea
					className="input-dark"
					value={inputValues.notes}
					onChange={(e) =>
						setInputValues({
							...inputValues,
							notes: e.target.value,
						})
					}
					maxLength={100}
					id="notes"
					name="notes"
				/>

				<label htmlFor="date">Date killed</label>
				<input
					type="date"
					required
					className="input-dark"
					onChange={(e) => {
						setInputValues({
							...inputValues,
							dateKilled: e.target.value,
						});
					}}
				/>

				<button type="submit">Submit</button>
			</form>
		</>
	);
}
