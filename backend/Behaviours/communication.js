const express = require('express');
const router = express.Router();

router.use(express.json()) 
const communication = [
	{ id: '1', name: 'communication 1' },
	{ id: '2', name: 'communication 2' },
	{ id: '3', name: 'communication 3' },
];

router.get('/', (req, res) => {
	res.json(communication);
});

// Add a new communication
router.post('/', (req, res) => {
	const col = req.body;
	communication.push(col);
	res.status(200).json({ message: 'communication added successfully' });
});

// Edit an existing communication
router.put('/:id', (req, res) => {
	const colId = req.params.id;
	const updatedcommunication = req.body;
	const communicationIndex = communication.findIndex(
		(col) => col.id === colId
	);
;

	if (communicationIndex === -1) {
		res.status(404).json({ error: 'communication not found' });
	} else {
		communication[communicationIndex] = { ...communication[communicationIndex], ...updatedcommunication };
		res.json({ message: 'communication updated successfully' });
	}
});

// Delete a communication
router.delete('/:id', (req, res) => {
	const colId = req.params.id;
	const communicationIndex = communication.findIndex((col) => col.id === colId);
	if (communicationIndex === -1) {
		res.status(404).json({ error: 'communication not found' });
	} else {
		communication.splice(communicationIndex, 1);
		res.json({ message: 'communication deleted successfully' });
	}
});

module.exports = router;