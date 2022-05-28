import samplePlayers from "../sampleData/samplePlayers";

function RecordForm() {

	const playersElements = samplePlayers.map((player) => {
		return (<option value={player.name} key={player.name} >{player.name}</option>)
	})

	return (
		<form>
			<label htmlFor="boss-name">Boss name</label>
			<select id="boss-name" name="boname">
				<option value="Ambassador">Ambassador</option>
				<option value="Araxxi">Araxxi</option>
				<option value="Kerapac">Kerapac</option>
				<option value="Raksha">Raksha</option>
			</select>

			<label htmlFor="team-size">Team size</label>
			<select id="team-size" name="size">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="big">big</option>
			</select>
			<select id="player-name" name="player">
				{playersElements}
				<option value="test">Test</option>
			</select>
			<button type="submit" formAction="">BUTTON</button>
		</form>
	);
}

export default RecordForm;
