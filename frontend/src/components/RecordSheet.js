import { nanoid } from 'nanoid';
import ticksToTime from '../services/ticksToTime';
import React from 'react';
import moment from 'moment';
import chooseSizeLabel from '../services/chooseSizeLabel';

// data from props comes in form of an array.
function RecordSheet(props) {
	let tables = [];
	let titles = [];
	let bossName;
	if (props.recordData) {
		props.recordData.forEach((data) => {
			let recordsElements;
			let rows = 0;
			let teamSizeLabel;
			recordsElements = data.map((record) => {
				// display all names of the players
				const players = record.players.map((player) => {
					return (
						<span className="space" key={player.playerId._id}>
							{player.playerId.name}
						</span>
					);
				});

				// fill the remaining spots when not all players were chosen
				// with question marks.
				for (let i = record.encounter.teamSize - 1; i > 0; i--) {
					if (!players[i]) {
						players[i] = (
							<span className="space" key={nanoid()}>
								?
							</span>
						);
					}
				}

				teamSizeLabel = chooseSizeLabel(record.encounter.teamSize);
				bossName = record.encounter.bossName;

				return (
					<tr key={nanoid()}>
						<td>{++rows}</td>
						<td className="spaced">
							{ticksToTime(record.timeInTicks)}
						</td>
						<td>{record.encounter.bossName}</td>
						<td>
							{record.encounter.hardmode
								? 'Hardmode'
								: 'Normal mode'}
						</td>
						<td>{teamSizeLabel}</td>
						<td className="players-td">{players}</td>
						<td>
							{moment(record.dateKilled).format('DD-MM-YYYY')}
						</td>
					</tr>
				);
			});
			titles.push(teamSizeLabel);
			tables.push(recordsElements);
		});
	} else
		tables = [
			<tr>
				<td>No data</td>
			</tr>,
		];

	tables = tables.map((table, idx) => {
		if (!table.length) return null;
		return (
			<div className="flex-row centered" key={nanoid()}>
				<table>
					<caption>{`${bossName} - ${titles[idx]}`}</caption>
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
					<tbody key={nanoid()}>{table}</tbody>
				</table>
			</div>
		);
	});

	return <>{tables}</>;
}

export default RecordSheet;
