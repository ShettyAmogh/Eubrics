import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3003/api';

const CommunicationList = () => {
	const [communications, setCommunications] = useState([]);
	const [newCommunicationName, setNewCommunicationName] = useState('');
	const [editingCommunicationId, setEditingCommunicationId] = useState(null);
	const [editedCommunicationName, setEditedCommunicationName] = useState('');

	useEffect(() => {
		fetchCommunications();
	}, []);

	const fetchCommunications = async () => {
		const response = await fetch(`${BASE_URL}/behaviors/communication`);
		const data = await response.json();
		setCommunications(data);
	};

	const handleAddCommunication = async () => {
		try {
			const newCommunication = {
				id: (communications.length + 1).toString(),
				name: newCommunicationName,
			};
			console.log('new', newCommunication);
			const response = await fetch(`${BASE_URL}/behaviors/communication`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCommunication),
			});
			if (response.ok) {
				setNewCommunicationName('');
				fetchCommunications();
			} else {
				console.error('Failed to add communication');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditCommunication = async (communicationId) => {
		setEditingCommunicationId(communicationId);
		const communicationToEdit = communications.find(
			(communication) => communication.id === communicationId
		);
		setEditedCommunicationName(communicationToEdit.name);
	};

	const handleUpdateCommunication = async () => {
		try {
			const updatedCommunication = { name: editedCommunicationName };
			await fetch(
				`${BASE_URL}/behaviors/communication/${editingCommunicationId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedCommunication),
				}
			);
			fetchCommunications();
			setEditingCommunicationId(null);
			setEditedCommunicationName('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCommunication = async (communicationId) => {
		try {
			await fetch(`${BASE_URL}/behaviors/communication/${communicationId}`, {
				method: 'DELETE',
			});
			fetchCommunications();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="topBar">
				<header className="header">Communication List</header>
				<div>
					<span classNmae="input">
						<input
							type="text"
							value={newCommunicationName}
							onChange={(e) => setNewCommunicationName(e.target.value)}
							placeholder="Enter name"
						/>
					</span>
					<button className="button" onClick={handleAddCommunication}>
						Add Communication
					</button>
				</div>
			</div>
			<div></div>
			{communications.map((communication) => (
				<div key={communication?.id}>
					{editingCommunicationId === communication?.id ? (
						<div>
							<input
								type="text"
								value={editedCommunicationName}
								onChange={(e) => setEditedCommunicationName(e.target.value)}
								placeholder="Enter updated name"
							/>
							<button onClick={handleUpdateCommunication}>Update</button>
						</div>
					) : (
						<div>
							<p>Name: {communication?.name}</p>
							<button
								onClick={() => handleEditCommunication(communication?.id)}
							>
								Edit
							</button>
						</div>
					)}
					<button onClick={() => handleDeleteCommunication(communication.id)}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
};

export default CommunicationList;
