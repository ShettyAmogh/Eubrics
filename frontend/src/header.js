import React, { useEffect, useState } from 'react';
import { fetchData } from './api';
import Card from './card';
import './App.css';

const Header = () => {
	const [message, setMessage] = useState([]);

	useEffect(() => {
		fetchData()
			.then((data) => setMessage(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);
	return (
		<>
			<div className="App">
				<header className="header">Assignment</header>
			</div>
			{message.map((card, index) => (
				<Card key={index} title={card} />
			))}
		</>
	);
};

export default Header;
