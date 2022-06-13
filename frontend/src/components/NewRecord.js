/* eslint-disable react-hooks/exhaustive-deps */
import CreatedPopup from './CreatedPopup';
import React from 'react';
import {
	bossesOptions,
	customSelectTheme,
} from '../services/react-select-helper';
import Select from 'react-select';
import axios from 'axios';
import timeToTicks from '../services/timeToTicks';
import _ from 'lodash';

export default function NewRecord() {
	const [errorMessage, setErrorMessage] = React.useState('');
	const [popupVisible, setPopupVisible] = React.useState(false);

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
			setTrimmedInputOptions(players);
		}
		fetchData();
	}, []);

	const [inputValues, setInputValues] = React.useState({
		boss: {},
		mode: { value: null, label: 'Choose a mode...' },
		size: { value: null, label: 'Choose a team size...' },
		minutes: '',
		seconds: '',
		notes: '',
		dateKilled: '',
	});
	const [pwdInput, setPwdInput] = React.useState('');
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
			}
		});
		setTrimmedInputOptions(playersOptions);
	}, [inputValues.boss.value]);

	//inputs JSX combined
	const [valuesForSelects, setValuesForSelects] = React.useState([]);

	// On team size change to handle the amount of players
	React.useEffect(() => {
		// splice excessive players
		setPlayersValues((prevState) => {
			const newArray = [...prevState];
			newArray.splice(inputValues.size.value);
			return newArray;
		});

		let playerAmount = inputValues.size.value;
		if (inputValues.size.value === 'mass') playerAmount = 7;

		// values for JSX to render later
		const values = [];

		for (let i = 0; i < playerAmount; i++) {
			values.push({ idx: i, value: playersValues[i] });
		}

		setTrimmedInputOptions(playersOptions);
		setValuesForSelects(values);
	}, [inputValues.size.value]);

	const [trimmedInputOptions, setTrimmedInputOptions] =
		React.useState(playersOptions);

	const playersInputsJSX = valuesForSelects.map((element, i) => {
		return (
			<div key={`div${i}`} className="flex-column">
				<label htmlFor={`player${i + 1}`}>{`Player ${i + 1}`}</label>
				<Select
					inputId={`player${i + 1}`}
					name={i} // To make handling easy
					key={`key${i}`}
					options={trimmedInputOptions}
					styles={customSelectTheme}
					onChange={handlePlayersChange}
					value={element.value}
				/>
			</div>
		);
	});

	function handlePlayersChange(e, { name }) {
		let players = playersValues; // Array
		if (!players) players = [];

		players[name] = { ...players[name], label: e.label, value: e.value };
		setPlayersValues(players);

		let array = _.cloneDeep(playersOptions);
		playersValues.forEach((selected) => {
			let idxToSplice = array.findIndex((opt) =>
				_.isEqual(opt, selected)
			);
			array.splice(idxToSplice, 1);
		});

		setTrimmedInputOptions(array);
	}

	function handlePwdChange(e) {
		setPwdInput(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		// handle incorrect or missing inputs
		setErrorMessage('');
		if (!inputValues.boss.value) return setErrorMessage('Pick a boss');
		if (
			inputValues.mode.value !== false ||
			inputValues.mode.value === true
		) {
			return setErrorMessage('Pick a mode');
		}
		if (Date.parse(inputValues.dateKilled) > new Date()) {
			return setErrorMessage(
				'Are you sure you killed the boss in the future?'
			);
		}

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
				headers: { adminPassword: pwdInput },
			});
			const data = res.data;
			setPopupVisible(true)
			return data;
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	}

	return (
		<>
			{errorMessage ? (
				<h1 className="error text-centered">{errorMessage}</h1>
			) : (
				<h1 className="text-centered">Add a new record here</h1>
			)}
			<div className="flex-row centered">
				<form
					onSubmit={handleSubmit}
					className="flex-column new-record-form"
				>
					<div className="container flex-row gap50">
						<div className="form-inputs--container">
							<label htmlFor="boss-name">Boss name</label>
							<Select
								inputId="boss-name"
								options={inputOptions.bosses}
								styles={customSelectTheme}
								onChange={handleBossChange}
								value={
									inputValues.boss.value
										? inputValues.boss
										: { label: 'Choose a boss' }
								}
							/>
							<label htmlFor="mode">Mode</label>
							<Select
								inputId="mode"
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
							<label htmlFor="team-size">Team size</label>
							<Select
								inputId="team-size"
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
						</div>
						<div className="flex-column form-inputs-container">
							{inputValues.size.value && playersInputsJSX}
						</div>
					</div>
					<div className="flex-row gap50">
						<div className="flex-column">
							<label htmlFor="minutes">Minutes</label>
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
									if (e.target.value > 59)
										e.target.value = 59;
									if (e.target.value < 0) e.target.value = 0;
									setInputValues({
										...inputValues,
										minutes: e.target.value,
									});
								}}
							/>
							<label htmlFor="seconds">Seconds</label>
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
									if (e.target.value > 59.4)
										e.target.value = 59.4;
									if (e.target.value < 0) e.target.value = 0;
									setInputValues({
										...inputValues,
										seconds: e.target.value,
									});
								}}
								required
							/>
						</div>
						<div className="flex-column">
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
								id="date"
								required
								className="input-dark"
								onChange={(e) => {
									setInputValues({
										...inputValues,
										dateKilled: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					<div className="flex-column centered">
						<label htmlFor="pwd">Admin key:</label>
						<input
							id="pwd"
							type="text"
							onChange={handlePwdChange}
							value={pwdInput}
							className="input-dark"
							autoComplete="off"
						/>
					</div>
					<div className="flex-row centered">
						<button type="submit" className="submit-btn">
							Submit
						</button>
					</div>
				</form>
			</div>
			{popupVisible && (
				<CreatedPopup
					itemCreated="Record"
				/>
			)}
		</>
	);
}
