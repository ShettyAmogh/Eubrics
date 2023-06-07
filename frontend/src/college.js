import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3003/api';

const CollegeList = () => {
	const [colleges, setColleges] = useState([]);
	const [newCollegeName, setNewCollegeName] = useState('');
	const [editingCollegeId, setEditingCollegeId] = useState(null);
	const [editedCollegeName, setEditedCollegeName] = useState('');

	useEffect(() => {
		fetchColleges();
	}, []);

	const fetchColleges = async () => {
		const response = await fetch(`${BASE_URL}/behaviors/college`);
		const data = await response.json();
		setColleges(data);
	};

	const handleAddCollege = async () => {
		try {
			const newCollege = {
				id: (colleges.length + 1).toString(),
				name: newCollegeName,
			};
			console.log('new', newCollege);
			const response = await fetch(`${BASE_URL}/behaviors/college`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCollege),
			});
			if (response.ok) {
				setNewCollegeName('');
				fetchColleges();
			} else {
				console.error('Failed to add college');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditCollege = async (collegeId) => {
		setEditingCollegeId(collegeId);
		const collegeToEdit = colleges.find((college) => college.id === collegeId);
		setEditedCollegeName(collegeToEdit.name);
	};

	const handleUpdateCollege = async () => {
		try {
			const updatedCollege = { name: editedCollegeName };
			await fetch(`${BASE_URL}/behaviors/college/${editingCollegeId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedCollege),
			});
			fetchColleges();
			setEditingCollegeId(null);
			setEditedCollegeName('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCollege = async (collegeId) => {
		try {
			await fetch(`${BASE_URL}/behaviors/college/${collegeId}`, {
				method: 'DELETE',
			});
			fetchColleges();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="topBar">
				<header className="header">College List</header>
				<div>
					<span classNmae="input">
						<input
							type="text"
							value={newCollegeName}
							onChange={(e) => setNewCollegeName(e.target.value)}
							placeholder="Enter name"
						/>
					</span>
					<button className="button" onClick={handleAddCollege}>
						Add College
					</button>
				</div>
			</div>
			<div></div>
			{colleges.map((college) => (
				<div key={college?.id}>
					{editingCollegeId === college?.id ? (
						<div>
							<input
								type="text"
								value={editedCollegeName}
								onChange={(e) => setEditedCollegeName(e.target.value)}
								placeholder="Enter updated name"
							/>
							<button onClick={handleUpdateCollege}>Update</button>
						</div>
					) : (
						<div>
							<p>Name: {college?.name}</p>
							<button onClick={() => handleEditCollege(college?.id)}>
								Edit
							</button>
						</div>
					)}
					<button onClick={() => handleDeleteCollege(college.id)}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
};

export default CollegeList;
