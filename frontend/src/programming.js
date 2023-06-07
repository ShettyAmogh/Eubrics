import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3003/api';

const ProgrammingList = () => {
	const [programmings, setProgrammings] = useState([]);
	const [newProgrammingName, setNewProgrammingName] = useState('');
	const [editingProgrammingId, setEditingProgrammingId] = useState(null);
	const [editedProgrammingName, setEditedProgrammingName] = useState('');

	useEffect(() => {
		fetchProgrammings();
	}, []);

	const fetchProgrammings = async () => {
		const response = await fetch(`${BASE_URL}/behaviors/programming`);
		const data = await response.json();
		setProgrammings(data);
	};

	const handleAddProgramming = async () => {
		try {
			const newProgramming = {
				id: (programmings.length + 1).toString(),
				name: newProgrammingName,
			};
			console.log('new', newProgramming);
			const response = await fetch(`${BASE_URL}/behaviors/programming`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newProgramming),
			});
			if (response.ok) {
				setNewProgrammingName('');
				fetchProgrammings();
			} else {
				console.error('Failed to add programming');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditProgramming = async (programmingId) => {
		setEditingProgrammingId(programmingId);
		const programmingToEdit = programmings.find(
			(programming) => programming.id === programmingId
		);
		setEditedProgrammingName(programmingToEdit.name);
	};

	const handleUpdateProgramming = async () => {
		try {
			const updatedCollege = { name: editedProgrammingName };
			await fetch(`${BASE_URL}/behaviors/programming/${editingProgrammingId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedCollege),
			});
			fetchProgrammings();
			setEditingProgrammingId(null);
			setEditedProgrammingName('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteProgramming = async (programmingId) => {
		try {
			await fetch(`${BASE_URL}/behaviors/programming/${programmingId}`, {
				method: 'DELETE',
			});
			fetchProgrammings();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="topBar">
				<header className="header">Programming List</header>
				<div>
					<span classNmae="input">
						<input
							type="text"
							value={newProgrammingName}
							onChange={(e) => setNewProgrammingName(e.target.value)}
							placeholder="Enter name"
						/>
					</span>
					<button className="button" onClick={handleAddProgramming}>
						Add Programming
					</button>
				</div>
			</div>
			<div></div>
			{programmings.map((programming) => (
				<div key={programming?.id}>
					{editingProgrammingId === programming?.id ? (
						<div>
							<input
								type="text"
								value={editedProgrammingName}
								onChange={(e) => setEditedProgrammingName(e.target.value)}
								placeholder="Enter updated name"
							/>
							<button onClick={handleUpdateProgramming}>Update</button>
						</div>
					) : (
						<div>
							<p>Name: {programming?.name}</p>
							<button onClick={() => handleEditProgramming(programming?.id)}>
								Edit
							</button>
						</div>
					)}
					<button onClick={() => handleDeleteProgramming(programming.id)}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
};

export default ProgrammingList;
