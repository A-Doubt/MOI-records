import React from 'react';

export default function RemovePopup(props) {
	const [pwdInput, setPwdInput] = React.useState('');

	return (
		<div className="popup flex-column centered remove-popup">
			<div className="popup-content flex-column">
				<div className="flex-row sb">
					<p className="space40"></p>
					{props.is403 ? (
						<h2 className="error">Wrong admin key</h2>
					) : (
						<h2>Confirm removal</h2>
					)}
					<button className="exit-btn" onClick={props.closePopup}>
						❌
					</button>
				</div>
				<form
					onSubmit={(e) => props.removeSubmission(e, pwdInput)}
					className="flex-column centered"
				>
					<label htmlFor="pwd">Admin key:</label>
					<input
						type="text"
						className="input-dark"
						id="pwd"
						onChange={(e) => setPwdInput(e.target.value)}
						value={pwdInput}
						autoComplete="off"
					/>
					<button className="submit-btn">Remove record</button>
				</form>
			</div>
		</div>
	);
}
