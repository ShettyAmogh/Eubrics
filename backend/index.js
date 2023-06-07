const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());

const behaviorsRouter = require('./behaviour');
const collegeRouter = require('./Behaviours/college');
const programmingRouter = require('./Behaviours/programming');
const sportsRouter = require('./Behaviours/sports');
const healthRouter = require('./Behaviours/health');
const communicationRouter = require('./Behaviours/communication');

app.use('/api/behaviors', behaviorsRouter);
app.use('/api/behaviors/college', collegeRouter);
app.use('/api/behaviors/communication', communicationRouter);
app.use('/api/behaviors/programming', programmingRouter);
app.use('/api/behaviors/health', healthRouter);
app.use('/api/behaviors/sports', sportsRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
