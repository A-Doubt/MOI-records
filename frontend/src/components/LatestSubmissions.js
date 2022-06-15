import RemovePopup from './RemovePopup';
import React from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ticksToTime from '../services/ticksToTime';
import moment from 'moment';
import chooseSizeLabel from '../services/chooseSizeLabel';
import binIcon from '../assets/icons8-trash.svg';

export default function LatestSubmissions() {
	const [popupOpen, setPopupOpen] = React.useState(false);
	const [latestSubmissions, setLatestSubmissions] = React.useState([]);
	const [clickedId, setClickedId] = React.useState('');

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
				teamSizeLabel = chooseSizeLabel(record.encounter.teamSize);
				const players = record.players.map((player, idx) => {
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

				return (
					<tr key={nanoid()}>
						<td>{++rows}</td>
						<td className="spaced green bold">
							{ticksToTime(record.timeInTicks)}
						</td>
						<td className="boss">{record.encounter.bossName}</td>
						<td data-mode-value={record.encounter.hardmode}>
							{record.encounter.hardmode
								? 'Hardmode'
								: 'Normal mode'}
						</td>
						<td>{teamSizeLabel}</td>
						<td className="players-td">{players}</td>
						<td>
							{moment(record.dateKilled).format('DD-MM-YYYY')}
						</td>
						<td>{moment(record.dateAdded).format('DD-MM-YYYY')}</td>
						<td className="spaced">
							{moment(record.dateAdded).format('HH:mm:ss')}
						</td>
						<td>
							<img
								onClick={(e) => {
									setPopupOpen(true);
									setClickedId(e.target.id);
								}}
								id={record._id}
								className="remove-btn icon-small"
								src={binIcon}
								alt="click-remove-icon"
								tabIndex="0"
							/>
						</td>
					</tr>
				);
			});
			setTableBody(spreadsheet);
		}
	}, [latestSubmissions]);

	
	const [is403, setIs403] = React.useState(false)

	async function removeSubmission(e, pwdInput) {
		try {
			setIs403(false);
			e.preventDefault();
			const res = await axios({
				url: `http://localhost:3000/api/records/${clickedId}`,
				method: 'delete',
				headers: { adminPassword: pwdInput },
			})
			const data = res.data;
			window.location.reload();
			return data;
		} catch (err) {
			if (err.response.status === 403) setIs403(true);
			console.error(err.message);
		}
	}

	function closePopup() {
		console.log('here');
		setPopupOpen(false);
	}

	return (
		<>
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
							<th>REMOVE</th>
						</tr>
					</thead>
					<tbody>{tableBody}</tbody>
				</table>
			</div>
			{popupOpen && (
				<RemovePopup
					removeSubmission={removeSubmission}
					id={clickedId}
					closePopup={closePopup}
					is403={is403}
				/>
			)}
		</>
	);
}
