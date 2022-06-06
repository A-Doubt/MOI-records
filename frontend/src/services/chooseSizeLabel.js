export default function chooseSizeLabel(size) {
	let sizeName;
		switch (size) {
			case 1:
				sizeName = 'Solo';
				break;
			case 2:
				sizeName = 'Duo';
				break;
			case 3:
				sizeName = 'Trio';
				break;
			case 4:
				sizeName = '4-man';
				break;
			case 7:
				sizeName = '7-man';
				break;
			case 10:
				sizeName = 'Raid size';
				break;
			default:
				sizeName = 'Mass';
				break;
		}
	return sizeName;
}