import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Records from './components/Records';

function App() {
	return (
		<BrowserRouter>
		<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/records" element={<Records />} />
				<Route path="submit" element={null}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
