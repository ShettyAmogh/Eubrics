import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Card = ({ title }) => {
	return (
		<div className="card">
			<h2>{title}</h2>
			<Link to={`/${title}`}>View Details</Link>
		</div>
	);
};

export default Card;
