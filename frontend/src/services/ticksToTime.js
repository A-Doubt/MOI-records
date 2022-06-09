export default function ticksToTime(ticks) {
	let seconds = parseInt(ticks) * 0.6;
	let minutes = Math.floor(seconds / 60);
	let secondsAndTicks = (seconds - minutes * 60).toFixed(1);


	// add a leading 0 if below 10 seconds
	secondsAndTicks =
		secondsAndTicks < 10 ? '0' + secondsAndTicks : secondsAndTicks;

	return `${minutes}:${secondsAndTicks}`;
}