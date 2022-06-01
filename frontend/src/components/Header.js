import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<nav className="flex-row se">
				<Link to="/">Home</Link>
				<Link to="/records">Records</Link>
				<Link to="/submit">Submit a new record (admin)</Link>
				<Link to="/newPlayer">Add a new player (admin)</Link>
			</nav>
		</header>
	);
}

export default Header;
