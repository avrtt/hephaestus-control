const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var controller_coordinates = [
			[100, 20],
			[170, 120],
			[120, 220],
			[100, 320],
			[200, 20],
			[270, 120],
			[220, 220],
			[200, 320]
		];

app.get('/api/state', (req, res) => {
    res.send({ express: [
		controller_coordinates[0][0], controller_coordinates[0][1],
		controller_coordinates[1][0], controller_coordinates[1][1],
		controller_coordinates[2][0], controller_coordinates[2][1],
		controller_coordinates[3][0], controller_coordinates[3][1],
		controller_coordinates[4][0], controller_coordinates[4][1],
		controller_coordinates[5][0], controller_coordinates[5][1],
		controller_coordinates[6][0], controller_coordinates[6][1],
		controller_coordinates[7][0], controller_coordinates[7][1]
		] });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
