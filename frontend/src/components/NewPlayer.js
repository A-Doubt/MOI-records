import CreatedPopup from './CreatedPopup';
import axios from 'axios';
import React from 'react';
import Select from 'react-select';
import { customSelectTheme } from '../services/react-select-helper'

export default function NewPlayer() {

	const [popupVisible, setPopupVisible] = React.useState(false);
	
	// contolling input
	const [nameInput, setNameInput] = React.useState('');
	const [pwdInput, setPwdInput] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');
	const [playersOptions, setPlayersOptions] = React.useState('');

	React.useEffect(() => {
		const players = [];

		async function fetchData() {
			const data = await axios.get('http://localhost:3000/api/players');
			data.data.forEach((player) => {
				players.push({ label: player.name, value: player._id });
			});
			setPlayersOptions(players);
		}
		fetchData();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setErrorMessage('Sending the request, please wait...');
			const body = { name: nameInput };
			const res = await axios({
				url: 'http://localhost:3000/api/players',
				data: body,
				method: 'post',
				headers: { adminPassword: pwdInput }
			});

			const data = res.data;
			console.log(data);
			setErrorMessage('');
			setPopupVisible(true);
			return data;
		} catch (err) {
			console.log(err.response);
			if (err.response.data.includes('unique'))
				return setErrorMessage('That player already is in the database');
			setErrorMessage(err.response.data);
		}
	}

	function handleNameChange(e) {
		setNameInput(e.target.value);
	}

	function handlePwdChange(e) {
		setPwdInput(e.target.value);
	}

	return (
		<>
			{errorMessage ? (
				<div className="container error-container error flex-row centered">
					<h1 className="error">{errorMessage}</h1>
				</div>
			) : (
				<h1 className="text-centered">Add a new player here</h1>
			)}
			<div className="flex-row centered">
				<form onSubmit={handleSubmit} className="flex-column centered">
					<label htmlFor="player-name">Player name:</label>
					<input
						id="player-name"
						type="text"
						onChange={handleNameChange}
						value={nameInput}
						className="input-dark"
						autoComplete="off"
					></input>
					<label htmlFor="pwd">Admin key:</label>
					<input
						id="pwd"
						type="text"
						onChange={handlePwdChange}
						value={pwdInput}
						className="input-dark"
						autoComplete="off"
					></input>
					<button type="submit" className="submit-btn">Submit</button>
				</form>
			</div>
			<div className="flex-column centered mt-60">
				<label htmlFor="players-in-db">Players already in the database:</label>
				<Select
					id="players-in-db"
					options={playersOptions}
					styles={customSelectTheme}
				/>
			</div>
			{popupVisible && (
				<CreatedPopup
					itemCreated="Player"
				/>
			)}
		</>
	);
}
