const express = require('express');
const router = express.Router();

router.use(express.json()) 
const college = [
	{ id: '1', name: 'college 1' },
	{ id: '2', name: 'college 2' },
	{ id: '3', name: 'college 3' },
];

router.get('/', (req, res) => {
	res.json(college);
});

// Add a new college
router.post('/', (req, res) => {
	const col = req.body;
	college.push(col);
	res.status(200).json({ message: 'College added successfully' });
});

// Edit an existing college
router.put('/:id', (req, res) => {
	const colId = req.params.id;
	const updatedCollege = req.body;
	const collegeIndex = college.findIndex(
		(col) => col.id === colId
	);
;

	if (collegeIndex === -1) {
		res.status(404).json({ error: 'College not found' });
	} else {
		college[collegeIndex] = { ...college[collegeIndex], ...updatedCollege };
		res.json({ message: 'College updated successfully' });
	}
});

// Delete a college
router.delete('/:id', (req, res) => {
	const colId = req.params.id;
	const collegeIndex = college.findIndex((col) => col.id === colId);
	if (collegeIndex === -1) {
		res.status(404).json({ error: 'College not found' });
	} else {
		college.splice(collegeIndex, 1);
		res.json({ message: 'College deleted successfully' });
	}
});

module.exports = router;
