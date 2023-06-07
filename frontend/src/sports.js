import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3003/api';
const SportList = () => {
	const [sports, setSports] = useState([]);
	const [newSportName, setNewSportName] = useState('');
	const [editingSportId, setEditingSportId] = useState(null);
	const [editedSportName, setEditedSportName] = useState('');

	useEffect(() => {
		fetchSports();
	}, []);

	const fetchSports = async () => {
		const response = await fetch(`${BASE_URL}/behaviors/sports`);
		const data = await response.json();
		setSports(data);
	};

	const handleAddSport = async () => {
		try {
			const newSport = {
				id: (sports.length + 1).toString(),
				name: newSportName,
			};
			console.log('new', newSport);
			const response = await fetch(`${BASE_URL}/behaviors/sports`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newSport),
			});
			if (response.ok) {
				setNewSportName('');
				fetchSports();
			} else {
				console.error('Failed to add sport');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditSport = async (sportId) => {
		setEditingSportId(sportId);
		const sportToEdit = sports.find((sport) => sport.id === sportId);
		setEditedSportName(sportToEdit.name);
	};

	const handleUpdateSport = async () => {
		try {
			const updatedSport = { name: editedSportName };
			await fetch(`${BASE_URL}/behaviors/sports/${editingSportId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedSport),
			});
			fetchSports();
			setEditingSportId(null);
			setEditedSportName('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteSport = async (sportId) => {
		try {
			await fetch(`${BASE_URL}/behaviors/sports/${sportId}`, {
				method: 'DELETE',
			});
			fetchSports();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="topBar">
				<header className="header">Sport List</header>
				<div>
					<span classNmae="input">
						<input
							type="text"
							value={newSportName}
							onChange={(e) => setNewSportName(e.target.value)}
							placeholder="Enter name"
						/>
					</span>
					<button className="button" onClick={handleAddSport}>
						Add Sport
					</button>
				</div>
			</div>
			<div></div>
			{sports.map((sport) => (
				<div key={sport?.id}>
					{editingSportId === sport?.id ? (
						<div>
							<input
								type="text"
								value={editedSportName}
								onChange={(e) => setEditedSportName(e.target.value)}
								placeholder="Enter updated name"
							/>
							<button onClick={handleUpdateSport}>Update</button>
						</div>
					) : (
						<div>
							<p>Name: {sport?.name}</p>
							<button onClick={() => handleEditSport(sport?.id)}>Edit</button>
						</div>
					)}
					<button onClick={() => handleDeleteSport(sport.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default SportList;
