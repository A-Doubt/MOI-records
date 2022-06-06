import { nanoid } from 'nanoid';
import sampleRecords from '../sampleData/sampleRecords';
import meleeIcon from '../assets/Melee-icon.png';
import magicIcon from '../assets/Magic-icon.png';
import rangedIcon from '../assets/Ranged-icon.png';
import ticksToTime from '../services/ticksToTime';
import React from 'react';

function RecordSheet(props) {

	let recordsElements;
	if (props.recordData) {
		let rows = 0;
		recordsElements = props.recordData.map((record) => {
			// display all names of the players
			const players = record.players.map((player) => {
				return (
					<span className="space" 
						key={player.playerId._id}>
							{player.playerId.name}
					</span>
				);
			});
	
			// display all styles of the players
			return (
				<tr key={nanoid()}>
					<td>{++rows}</td>
					<td className="spaced">
						{ticksToTime(record.timeInTicks)}
					</td>
					<td>{record.encounter.bossName}</td>
					<td>
						{record.encounter.hardmode ? 'hardmode' : 'normal mode'}
					</td>
					<td>{record.encounter.teamSize}</td>
					<td>{players}</td>
					<td>{record.dateKilled}</td>
				</tr>
			);
		});
	} else recordsElements = <tr><td>No data</td></tr>

	return (
		<div className="flex-row centered">
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Time(ticks for now)</th>
						<th>Encounter name</th>
						<th>Mode</th>
						<th>Team Size</th>
						<th>Players</th>
						<th>Date</th>
						<th>Styles</th>
					</tr>
				</thead>
				<tbody>{recordsElements}</tbody>
			</table>
		</div>
	);
}

export default RecordSheet;

// let rows = 0;
// const recordsElements = sampleRecords.map((record) => {
// 	// display all names of the players
// 	const playersIds = record.players.map((player) => {
// 		return (
// 			<span className="space" key={player.playerId}>
// 				{player.playerId}
// 			</span>
// 		);
// 	});

// 	// display all styles of the players
// 	let stylesUsed = [];
// 	record.players.forEach((player) => {
// 		if (player.style) stylesUsed.push(player.style);
// 	});

// 	return (
// 		<tr key={nanoid()}>
// 			<td>{++rows}</td>
// 			<td className="spaced">{ticksToTime(record.timeInTicks)}</td>
// 			<td>{record.encounter.bossName}</td>
// 			<td>
// 				{record.encounter.hardmode ? 'hardmode' : 'normal mode'}
// 			</td>
// 			<td>{record.encounter.teamSize}</td>
// 			<td>{playersIds}</td>
// 			<td>{new Date().getTime()}</td>
// 			<td>
// 				{stylesUsed.includes('melee') && (
// 					<img src={meleeIcon} alt="melee" className="style-icon"/>
// 				)}
// 				{stylesUsed.includes('ranged') && (
// 					<img src={rangedIcon} alt="ranged" className="style-icon"/>
// 				)}
// 				{stylesUsed.includes('magic') && (
// 					<img src={magicIcon} alt="magic" className="style-icon"/>
// 				)}
// 			</td>
// 		</tr>
// 	);
// });
