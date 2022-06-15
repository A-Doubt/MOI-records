/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import React from 'react';

function Header() {
	const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

	function hideDropdown(e) {
		setIsDropdownVisible(false);
	}
	function toggleDropdown(e) {
		e.stopPropagation();
		if (isDropdownVisible) setIsDropdownVisible(false);
		else setIsDropdownVisible(true);
	}

	React.useEffect(() => {
		const button = document.querySelector('.dropdown-btn');
		if (isDropdownVisible) {
			button.classList.add('dropdown-btn-open');
			button.classList.remove('dropdown-btn-closed');
		} else {
			button.classList.add('dropdown-btn-closed');
			button.classList.remove('dropdown-btn-open');
		}
	}, [isDropdownVisible]);

	React.useEffect(() => {
		const button = document.querySelector('.dropdown-btn');
		button.addEventListener('click', toggleDropdown);
		document.addEventListener('click', hideDropdown);

		return () => {
			button.removeEventListener('click', toggleDropdown);
			document.removeEventListener('click', hideDropdown);
		};
	}, [isDropdownVisible]);

	return (
		<header>
			<nav className="flex-row se flex-column-600">
				<div className="logo">
					<p>Men of Iron</p>
					<p>Records spreadsheet</p>
				</div>
				<button className="header-btn">
					<Link to="/">Home</Link>
				</button>
				<div>
					<button className="dropdown-btn header-btn dropdown-btn-closed">
						Admin panel
					</button>
					{isDropdownVisible && (
						<div className="absolute">
							<ul className="">
								<li>
									<button className="header-btn">
										<Link to="/submit">
											Add a new record
										</Link>
									</button>
								</li>
								<li>
									<button className="header-btn">
										<Link to="/new_player">
											Add a new player
										</Link>
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
				<button className="header-btn">
					<Link to="/latest_submissions">Latest submissions</Link>
				</button>
			</nav>
		</header>
	);
}

export default Header;
