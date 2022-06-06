import RecordForm from './RecordForm';
import RecordSheet from './RecordSheet';
import React from 'react';
import axios from 'axios';

function Records() {

	const [fetchedRecords, setFetchedRecords] = React.useState('')

	async function handleSubmit(body) {
		console.log(`bossNameInput: ${body.bossName}`)
		console.log(`teamSizeInput: ${body.teamSize}`)
		console.log(`modeInput: ${body.hardmode}`)
		try {
			const res = await axios.get(
				`http://localhost:3000/API/records/?boss-name=${body.bossName}&team-size=${body.teamSize}&hardmode=${body.hardmode}`
			);
			console.log(res.data);
			setFetchedRecords(res.data)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<>
			<h1>Records Page</h1>
			<RecordForm 
				handleSubmit={handleSubmit}
			/>
			<RecordSheet 
				recordData={fetchedRecords}
			/>
		</>
	);
}

export default Records;
