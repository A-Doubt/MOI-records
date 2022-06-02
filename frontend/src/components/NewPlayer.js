import axios from 'axios';
import React from 'react';

export default function NewPlayer() {
	// contolling input
	const [nameInput, setNameInput] = React.useState('');
	const [errMessage, setErrMessage] = React.useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setErrMessage('');
			const body = { name: nameInput };
			const res = await axios({
				url: 'http://localhost:3000/api/players',
				data: body,
				method: 'post',
			});

			const data = res.data;
			console.log(data);
			return data;
		} catch (err) {
			setErrMessage(err.response);
			console.log(err.response);
		}
	}

	function handleNameChange(e) {
		setNameInput(e.target.value);
	}

	return (
		<>
			<h2>Make sure to check if a player is in the database</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={handleNameChange}
					value={nameInput}
				></input>
				<button type="submit">Submit</button>
			</form>
			{errMessage && (
				<div className="container error-container error">
					<p>ERROR: {errMessage.data}</p>
					<p>STATUS: {errMessage.status}</p>
				</div>
			)}
		</>
	);
}
