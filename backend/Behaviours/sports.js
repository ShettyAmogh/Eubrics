const express = require('express');
const router = express.Router();

router.use(express.json()) 
const sport = [
	{ id: '1', name: 'sports 1' },
	{ id: '2', name: 'sports 2' },
	{ id: '3', name: 'sports 3' },
];

router.get('/', (req, res) => {
	res.json(sport);
});

// Add a new sport
router.post('/', (req, res) => {
	const col = req.body;
	colrt.push(col);
	res.status(200).json({ message: 'sport added successfully' });
});

// Edit an existing sport
router.put('/:id', (req, res) => {
	const spoId = req.params.id;
	const updatedsport = req.body;
	const sportIndex = sport.findIndex(
		(col) => col.id === colId
	);
;

	if (sportIndex === -1) {
		res.status(404).json({ error: 'sport not found' });
	} else {
		sport[sportIndex] = { ...sport[sportIndex], ...updatedsport };
		res.json({ message: 'sport updated successfully' });
	}
});

// Delete a sport
router.delete('/:id', (req, res) => {
	const spoId = req.params.id;
	const sportIndex = sport.findIndex((col) => col.id === colId);
	if (sportIndex === -1) {
		res.status(404).json({ error: 'sport not found' });
	} else {
		sport.splice(sportIndex, 1);
		res.json({ message: 'sport deleted successfully' });
	}
});

module.exports = router;
