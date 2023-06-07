const express = require('express');
const router = express.Router();

router.use(express.json()) 
const programming = [
	{ id: '1', name: 'programming 1' },
	{ id: '2', name: 'programming 2 ' },
	{ id: '3', name: 'programming 3' },
];

router.get('/', (req, res) => {
	res.json(programming);
});

// Add a new programming
router.post('/', (req, res) => {
	const col = req.body;
	programming.push(col);
	res.status(200).json({ message: 'programming added successfully' });
});

// Edit an existing programming
router.put('/:id', (req, res) => {
	const colId = req.params.id;
	const updatedprogramming = req.body;
	const programmingIndex = programming.findIndex(
		(col) => col.id === colId
	);
;

	if (programmingIndex === -1) {
		res.status(404).json({ error: 'programming not found' });
	} else {
		programming[programmingIndex] = { ...programming[programmingIndex], ...updatedprogramming };
		res.json({ message: 'programming updated successfully' });
	}
});

// Delete a programming
router.delete('/:id', (req, res) => {
	const colId = req.params.id;
	const programmingIndex = programming.findIndex((col) => col.id === colId);
	if (programmingIndex === -1) {
		res.status(404).json({ error: 'programming not found' });
	} else {
		programming.splice(programmingIndex, 1);
		res.json({ message: 'programming deleted successfully' });
	}
});

module.exports = router;
