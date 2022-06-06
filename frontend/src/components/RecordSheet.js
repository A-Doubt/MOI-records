import { nanoid } from 'nanoid';
// import sampleRecords from '../sampleData/sampleRecords';
// import meleeIcon from '../assets/Melee-icon.png';
// import magicIcon from '../assets/Magic-icon.png';
// import rangedIcon from '../assets/Ranged-icon.png';
import ticksToTime from '../services/ticksToTime';
import React from 'react';
import moment from 'moment';

function RecordSheet(props) {
	let tables = [];
	if (props.recordData) {
		props.recordData.forEach((data) => {
			let recordsElements;
			let rows = 0;
			recordsElements = data.map((record) => {
				// display all names of the players
				const players = record.players.map((player) => {
					return (
						<span className="space" key={player.playerId._id}>
							{player.playerId.name}
						</span>
					);
				});
	
				let teamSizeLabel;
				if (record.encounter.teamSize === 1) teamSizeLabel = 'Solo';
				else if (record.encounter.teamSize === 2) teamSizeLabel = 'Duo';
				else if (record.encounter.teamSize === 3) teamSizeLabel = 'Trio';
				else if (record.encounter.teamSize === 4) teamSizeLabel = '4-man';
				else if (record.encounter.teamSize === 7) teamSizeLabel = '7-man';
				else if (record.encounter.teamSize === 10) teamSizeLabel = 'raid';
				else teamSizeLabel = 'mass';
	
				return (
					<tr key={nanoid()}>
						<td>{++rows}</td>
						<td className="spaced">
							{ticksToTime(record.timeInTicks)}
						</td>
						<td>{record.encounter.bossName}</td>
						<td>
							{record.encounter.hardmode ? 'Hardmode' : 'Normal mode'}
						</td>
						<td>{teamSizeLabel}</td>
						<td>{players}</td>
						<td>{moment(record.dateKilled).format('DD-MM-YYYY')}</td>
					</tr>
				);
			});
			tables.push(recordsElements);
		})

	} else
		tables = [(
			<tr>
				<td>No data</td>
			</tr>
		)];

		tables = tables.map((table) => <tbody key={nanoid()}>{table}</tbody>);

	return (
		<div className="flex-row centered">
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Time</th>
						<th>Encounter name</th>
						<th>Mode</th>
						<th>Team Size</th>
						<th>Players</th>
						<th>Date</th>
					</tr>
				</thead>
				{tables}
			</table>
		</div>
	);
}

export default RecordSheet;

// function RecordSheet(props) {
// 	let recordsElements;
// 	if (props.recordData) {
// 		props.recordData.forEach((data) => {
// 			console.log('datttaaaaaaaaaaaaaaaaa')
// 			console.log(data)
// 		})
// 		let rows = 0;
// 		recordsElements = props.recordData[0].map((record) => {
// 			// display all names of the players
// 			const players = record.players.map((player) => {
// 				return (
// 					<span className="space" key={player.playerId._id}>
// 						{player.playerId.name}
// 					</span>
// 				);
// 			});

// 			let teamSizeLabel;
// 			if (record.encounter.teamSize === 1) teamSizeLabel = 'Solo';
// 			else if (record.encounter.teamSize === 2) teamSizeLabel = 'Duo';
// 			else if (record.encounter.teamSize === 3) teamSizeLabel = 'Trio';
// 			else if (record.encounter.teamSize === 4) teamSizeLabel = '4-man';
// 			else if (record.encounter.teamSize === 7) teamSizeLabel = '7-man';
// 			else if (record.encounter.teamSize === 10) teamSizeLabel = 'raid';
// 			else teamSizeLabel = 'mass';

// 			return (
// 				<tr key={nanoid()}>
// 					<td>{++rows}</td>
// 					<td className="spaced">
// 						{ticksToTime(record.timeInTicks)}
// 					</td>
// 					<td>{record.encounter.bossName}</td>
// 					<td>
// 						{record.encounter.hardmode ? 'Hardmode' : 'Normal mode'}
// 					</td>
// 					<td>{teamSizeLabel}</td>
// 					<td>{players}</td>
// 					<td>{moment(record.dateKilled).format('DD-MM-YYYY')}</td>
// 				</tr>
// 			);
// 		});
// 	} else
// 		recordsElements = (
// 			<tr>
// 				<td>No data</td>
// 			</tr>
// 		);

// 	return (
// 		<div className="flex-row centered">
// 			<table>
// 				<thead>
// 					<tr>
// 						<th>Rank</th>
// 						<th>Time</th>
// 						<th>Encounter name</th>
// 						<th>Mode</th>
// 						<th>Team Size</th>
// 						<th>Players</th>
// 						<th>Date</th>
// 					</tr>
// 				</thead>
// 				<tbody>{recordsElements}</tbody>
// 			</table>
// 		</div>
// 	);
// }