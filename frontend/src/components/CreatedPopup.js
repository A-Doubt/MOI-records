export default function CreatedPopup(props) {
	return (
		<div className="popup flex-column centered">
			<div className="popup-content flex-column">
				<h2>{props.itemCreated} created successfully!</h2>
				<button
					className="submit-btn"
					onClick={() => {
						window.location.reload();
					}}
				>
					Dismiss
				</button>
			</div>
		</div>
	);
}
