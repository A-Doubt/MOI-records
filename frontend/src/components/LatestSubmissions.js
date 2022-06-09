import React from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ticksToTime from '../services/ticksToTime';
import moment from 'moment';
import chooseSizeLabel from '../services/chooseSizeLabel';

export default function LatestSubmissions() {
	const [latestSubmissions, setLatestSubmissions] = React.useState([]);

	React.useEffect(() => {
		try {
			async function fetchData() {
				const data = await axios.get(
					`http://localhost:3000/api/records/sort`
				);
				setLatestSubmissions(data);
			}
			fetchData();
		} catch (err) {
			console.error(err);
		}
	}, []);

	const [tableBody, setTableBody] = React.useState(<></>);

	let rows = 0;
	// when the data changes fire this
	React.useEffect(() => {
		if (latestSubmissions.data) {
			let teamSizeLabel;
			const spreadsheet = latestSubmissions.data.map((record) => {

				teamSizeLabel = chooseSizeLabel(record.encounter.teamSize)
				const players = record.players.map((player, idx) => {
					return (
						<span className="space" key={player.playerId._id}>
							{player.playerId.name}
						</span>
					);
				});
				return (
					<tr key={nanoid()}>
						<td>{++rows}</td>
						<td className="spaced green bold">
							{ticksToTime(record.timeInTicks)}
						</td>
						<td className="boss">{record.encounter.bossName}</td>
						<td data-mode-value={record.encounter.hardmode}>
							{record.encounter.hardmode ? 'Hardmode' : 'Normal mode'}
						</td>
						<td>{teamSizeLabel}</td>
						<td className="players-td">{players}</td>
						<td>{moment(record.dateKilled).format('DD-MM-YYYY')}</td>
						<td>{moment(record.dateAdded).format('DD-MM-YYYY')}</td>
						<td className="spaced">{moment(record.dateAdded).format('H:MM:SS')}</td>
					</tr>
				);
			});
			setTableBody(spreadsheet);
		}
	}, [latestSubmissions]);

	return (
		<div className="flex-row centered" key={nanoid()}>
			<table className="non-records">
				<caption>Latest submissions</caption>
				<thead>
					<tr>
						<th></th>
						<th>Time</th>
						<th>Encounter name</th>
						<th>Mode</th>
						<th>Team Size</th>
						<th>Players</th>
						<th>Date killed</th>
						<th>Date added</th>
						<th>Time added</th>
					</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	);
}
