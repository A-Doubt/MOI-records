export default function timeToTicks(minutes, seconds) {
	console.log(minutes, seconds);
	if (!minutes) minutes = 0;
	const totalSeconds = parseInt(minutes) * 60 + parseFloat(seconds)
	return parseInt((totalSeconds / 0.6).toFixed(0));
}
