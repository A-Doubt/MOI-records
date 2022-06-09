import RecordForm from './RecordForm';
import RecordSheet from './RecordSheet';
import React from 'react';
import axios from 'axios';
import isArrayEqual from '../services/isArrayEqual';

function Records() {
	const [fetchedRecords, setFetchedRecords] = React.useState('');
	const [numberOfRecords, setNumberOfRecords] = React.useState('');

	React.useEffect(() => {
		async function fetchNumberOfRecords() {
			const number = await axios.get('http://localhost:3000/api/records/count')
			setNumberOfRecords(number.data);
		}
		fetchNumberOfRecords()
	}, [])

	async function handleSubmit(body, sizesArray) {
		console.log(body);
		try {
			let resArray = [];

			// if team size wasn't chosen make a query for all team sizes for the boss
			if (body.teamSize === 'any') {
				resArray = await Promise.all(
					sizesArray.map((size) => {
						return axios.get(
							`http://localhost:3000/api/records/boss/?boss-name=${body.bossName}&team-size=${size}&hardmode=${body.hardmode}`
						);
					})
				);

				// if boss size was chosen make 1 query
			} else {
				const res = await axios.get(
					`http://localhost:3000/api/records/boss/?boss-name=${body.bossName}&team-size=${body.teamSize}&hardmode=${body.hardmode}`
				);
				resArray.push(res);
			}

			console.log(resArray);
			let records = [];
			resArray.forEach((res) => {
				let filteredRecords = [];
				res.data.forEach((record) => {
					let push = true;

					filteredRecords.forEach((fRecord, i) => {
						// compare if the records have the same players in the
						// players array (sort first to compare the objects)
						// and if those records have the same players only push
						// the better record into the array (push = false on the worse one)
						const players = [];
						const fPlayers = [];
						record.players.forEach((player) =>
							players.push(player.playerId._id)
						);

						fRecord.players.forEach((player) =>
							fPlayers.push(player.playerId._id)
						);
						players.sort();
						fPlayers.sort();
						if (isArrayEqual(players, fPlayers)) {
							push = false;
						}
					});
					if (push) {
						filteredRecords.push(record);
					}
				});
				records.push(filteredRecords);
			});
			console.log(records);
			setFetchedRecords(records);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<h1>Records Page</h1>
			<p>Number of records: {numberOfRecords}</p>
			<RecordForm handleSubmit={handleSubmit} />
			<RecordSheet recordData={fetchedRecords} />
		</>
	);
}

export default Records;
