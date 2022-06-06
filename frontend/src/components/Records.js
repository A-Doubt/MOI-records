import RecordForm from './RecordFormV2';
import RecordSheet from './RecordSheet';
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import isArrayEqual from '../services/isArrayEqual'

function Records() {
	const [fetchedRecords, setFetchedRecords] = React.useState('');

	async function handleSubmit(body, sizesArray) {
		// console.log(`bossNameInput: ${body.bossName}`);
		// console.log(`modeInput: ${body.hardmode}`);
		// console.log(`teamSizeInput: ${body.teamSize}`);
		// console.log('sizesArray', sizesArray);
		try {
			let resArray = [];

			// if team size wasn't chosen make a query for all team sizes for the boss
			if (body.teamSize === 'any') {
				resArray = await Promise.all(sizesArray.map((size)=>{
					return axios.get(
						`http://localhost:3000/API/records/?boss-name=${body.bossName}&team-size=${size}&hardmode=${body.hardmode}&sort=timeInTicks`
					);
				}))

			// if boss size was chosen make 1 query
			} else {
				const res = await axios.get(
					`http://localhost:3000/API/records/?boss-name=${body.bossName}&team-size=${body.teamSize}&hardmode=${body.hardmode}&sort=timeInTicks`
				);
				resArray.push(res);
			}

			let records = [];
			resArray.forEach((res) => {
				let filteredRecords = [];
				res.data.forEach((record) => {
					
					let push = true;
					filteredRecords.forEach((fRecord) => {
						if (isArrayEqual(fRecord.players, record.players)) {
							push = false;
						}
					});
					if (push) {
						filteredRecords.push(record);
					}
				});
				records.push(filteredRecords)
			})

			setFetchedRecords(records);

		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<h1>Records Page</h1>
			<RecordForm handleSubmit={handleSubmit} />
			<RecordSheet recordData={fetchedRecords} />
		</>
	);
}

export default Records;
