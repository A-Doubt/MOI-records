export default function timeToTicks(minutes, seconds) {
	const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds)
	return parseInt((totalSeconds / 0.6).toFixed(0));
}

// console.log(timeToTicks(0, 3.6)); // 6
// console.log(timeToTicks(0, 7.2)); // 12
// console.log(timeToTicks(1, 16.2)); // 127
// console.log(timeToTicks(3, 33)); // 355