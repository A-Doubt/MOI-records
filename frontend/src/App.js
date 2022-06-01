import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Records from './components/Records';
import NewPlayer from './components/NewPlayer';
import NewRecord from './components/NewRecord';

function App() {
	return (
		<BrowserRouter>
		<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/records" element={<Records />} />
				<Route path="/submit" element={<NewRecord />}/>
				<Route path="/newPlayer" element={<NewPlayer />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
