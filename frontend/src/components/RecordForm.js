import Select from 'react-select';
import React from 'react';
import {
	bossesOptions,
	customSelectTheme,
} from '../services/react-select-helper';
import chooseSizeLabel from '../services/chooseSizeLabel';

export default function RecordForm(props) {
	const [errorMessage, setErrorMessage] = React.useState('');

	// control inputs' values
	const [inputValues, setInputValues] = React.useState({
		boss: {},
		mode: { value: null, label: 'Choose a mode...' },
		size: { value: null, label: 'Choose a team size...' },
	});

	// control inputs' options
	const [inputOptions, setInputOptions] = React.useState({
		bosses: {},
		modes: {},
		sizes: {},
	});

	// set boss input options
	React.useEffect(() => {
		const bossOptions = bossesOptions.map((boss) => {
			return { value: boss.bossName, label: boss.bossName };
		});
		setInputOptions({ ...inputOptions, bosses: bossOptions });
	}, []);

	function handleBossChange(e) {
		const index = bossesOptions.findIndex(
			(opt) => e.value === opt.bossName
		);
		if (
			bossesOptions[index].modes.length === 1 &&
			bossesOptions[index].teamSizes.length === 1
		) {
			// only normal mode and only 1 size
			setInputValues({
				boss: { value: e.value, label: e.value },
				mode: {
					value: false,
					label: 'Normal mode',
				},
				size: {
					value: bossesOptions[index].teamSizes[0],
					label: chooseSizeLabel(bossesOptions[index].teamSizes[0]),
				},
			});

			// only normal mode, various sizes
		} else if (bossesOptions[index].modes.length === 1) {
			setInputValues({
				boss: { value: e.value, label: e.value },
				mode: {
					value: false,
					label: 'Normal mode',
				},
				size: { value: null, label: 'Choose a team size...' },
			});
		} else {
			setInputValues({
				boss: { value: e.value, label: e.value },
				mode: { value: null, label: 'Choose a mode...' },
				size: { value: null, label: 'Choose a team size...' },
			});
		}
	}
	React.useEffect(() => {
		let modes = [];
		let sizes = [];

		bossesOptions.forEach((bossOption) => {
			if (bossOption.bossName === inputValues.boss.value) {
				bossOption.modes.forEach((mode) => {
					modes.push({
						label: mode ? 'Hardmode' : 'Normal mode',
						value: mode,
					});
				});
				if (bossOption.teamSizes.length > 1) {
					sizes.push({ label: 'Any', value: 'any' });
				}
				bossOption.teamSizes.forEach((size) => {
					sizes.push({ label: chooseSizeLabel(size), value: size });
				});

				setInputOptions({ ...inputOptions, modes, sizes });
				console.log('inputValues', inputValues);
			}
		});
	}, [inputValues.boss.value]);

	async function handleSubmit(e) {
		e.preventDefault();
		setErrorMessage('');
		if (
			!inputValues.boss.value ||
			!inputValues.size.value ||
			inputValues.mode.value === null
		) {
			setErrorMessage('Please pick an option on all of the fields.');
			return;
		}
		const index = inputOptions.bosses.findIndex((opt) => {
			return opt.value === inputValues.boss.value;
		});
		const sizes = bossesOptions[index].teamSizes;
		props.handleSubmit(
			{
				bossName: inputValues.boss.value,
				teamSize: inputValues.size.value,
				hardmode: inputValues.mode.value,
			},
			sizes
		);
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="flex-column centered">
				<div className="container flex-row">
					<div className="form-inputs--container">
						<Select
							options={inputOptions.bosses}
							styles={customSelectTheme}
							onChange={handleBossChange}
							value={
								inputValues.boss.value
									? inputValues.boss
									: { label: 'Choose a boss' }
							}
						/>
						<Select
							options={inputOptions.modes}
							styles={customSelectTheme}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									mode: {
										value: e.value,
										label: e.label,
									},
								})
							}
							value={inputValues.mode}
							isDisabled={inputValues.boss.value ? false : true}
						/>

						<Select
							options={inputOptions.sizes}
							styles={customSelectTheme}
							onChange={(e) => {
								setInputValues({
									...inputValues,
									size: {
										value: e.value,
										label: e.label,
									},
								});
							}}
							value={inputValues.size}
							isDisabled={inputValues.boss.value ? false : true}
						/>
					</div>
					{/* <div className="form-inputs-container">
						{inputValues.size.value && playersInputs}
					</div> */}
				</div>

				<button type="submit" className="submit-btn">
					Search
				</button>
				{errorMessage}
			</form>
		</>
	);
}
