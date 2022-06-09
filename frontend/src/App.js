import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Records from './components/Records';
import NewPlayer from './components/NewPlayer';
import NewRecord from './components/NewRecord';
import LatestSubmissions from './components/LatestSubmissions'

function App() {
	return (
		<BrowserRouter>
		<Header />
			<Routes>
				<Route path="/" element={<Records />} />
				<Route path="/submit" element={<NewRecord />}/>
				<Route path="/new_player" element={<NewPlayer />} />
				<Route path="/latest_submissions" element={<LatestSubmissions />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
