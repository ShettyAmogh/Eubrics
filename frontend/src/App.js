import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Sports from './sports';
import Communication from './communication';
import Programming from './programming';
import Health from './health';
import College from './college';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Header />}></Route>
				<Route path="/sports" element={<Sports />} />
				<Route path="/communication" element={<Communication />} />
				<Route path="/health" element={<Health />} />
				<Route path="/programming" element={<Programming />} />
				<Route path="/college" element={<College />} />
			</Routes>
		</Router>
	);
}

export default App;
