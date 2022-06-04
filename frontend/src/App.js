import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Records from './components/Records';
import NewPlayer from './components/NewPlayer';
import NewRecordV2 from './components/NewRecordV2';

function App() {
	return (
		<BrowserRouter>
		<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/records" element={<Records />} />
				<Route path="/submit" element={<NewRecordV2 />}/>
				<Route path="/newPlayer" element={<NewPlayer />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
