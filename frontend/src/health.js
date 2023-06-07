import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3003/api'; 

const HealthList = () => {
	const [users, setHealths] = useState([]);
	const [newHealthName, setNewHealthName] = useState('');
	const [editingHealthId, setEditingHealthId] = useState(null);
	const [editedHealthName, setEditedHealthName] = useState('');

	useEffect(() => {
		fetchHealths();
	}, []);

	const fetchHealths = async () => {
		const response = await fetch(`${BASE_URL}/behaviors/health`);
		const data = await response.json();
		setHealths(data);
	};

	const handleAddHealth = async () => {
		try {
			const newHealth = { id: (users.length + 1).toString(), name: newHealthName };
			console.log('new', newHealth);
			const response = await fetch(`${BASE_URL}/behaviors/health`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newHealth),
			});
			if (response.ok) {
				setNewHealthName(''); 
				fetchHealths(); 
			} else {
				console.error('Failed to add user');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditHealth = async (userId) => {
		setEditingHealthId(userId);
		const userToEdit = users.find((user) => user.id === userId);
		setEditedHealthName(userToEdit.name);
	};

	const handleUpdateHealth = async () => {
		try {
			const updatedHealth = { name: editedHealthName };
			await fetch(`${BASE_URL}/behaviors/health/${editingHealthId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedHealth),
			});
			fetchHealths(); 
			setEditingHealthId(null); 
			setEditedHealthName(''); 
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteHealth = async (userId) => {
		try {
			await fetch(`${BASE_URL}/behaviors/health/${userId}`, {
				method: 'DELETE',
			});
			fetchHealths(); 
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="topBar">
				<header className="header">Health List</header>
        <div>
				<span  classNmae='input'>
					<input
         
						type="text"
						value={newHealthName}
						onChange={(e) => setNewHealthName(e.target.value)}
						placeholder="Enter name"
					/>
          </span>
					<button className='button' onClick={handleAddHealth}>Add Health</button>
          </div>
			</div>
			<div></div>
			{users.map((user) => (
				<div key={user?.id}>
					{editingHealthId === user?.id ? (
						<div>
							<input
								type="text"
								value={editedHealthName}
								onChange={(e) => setEditedHealthName(e.target.value)}
								placeholder="Enter updated name"
							/>
							<button onClick={handleUpdateHealth}>Update</button>
						</div>
					) : (
						<div>
							<p>Name: {user?.name}</p>
							<button onClick={() => handleEditHealth(user?.id)}>Edit</button>
						</div>
					)}
					<button onClick={() => handleDeleteHealth(user.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default HealthList;
