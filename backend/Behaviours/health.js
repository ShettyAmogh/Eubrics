const express = require('express');
const router = express.Router();

router.use(express.json()) 
const health = [
	{ id: '1', name: 'health 1' },
	{ id: '2', name: 'health 2' },
	{ id: '3', name: 'health 3' },
];

router.get('/', (req, res) => {
	res.json(health);
});

// Add a new health
router.post('/', (req, res) => {
	const col = req.body;
	health.push(col);
	res.status(200).json({ message: 'Health added successfully' });
});

// Edit an existing health
router.put('/:id', (req, res) => {
	const colId = req.params.id;
	const updatedHealth = req.body;
	const healthIndex = health.findIndex(
		(col) => col.id === colId
	);
;

	if (healthIndex === -1) {
		res.status(404).json({ error: 'Health not found' });
	} else {
		health[healthIndex] = { ...health[healthIndex], ...updatedHealth };
		res.json({ message: 'Health updated successfully' });
	}
});

// Delete a health
router.delete('/:id', (req, res) => {
	const colId = req.params.id;
	const healthIndex = health.findIndex((col) => col.id === colId);
	if (healthIndex === -1) {
		res.status(404).json({ error: 'Health not found' });
	} else {
		health.splice(healthIndex, 1);
		res.json({ message: 'Health deleted successfully' });
	}
});

module.exports = router;
