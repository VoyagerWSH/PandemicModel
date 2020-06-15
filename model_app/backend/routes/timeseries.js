// dependencies
const app = require('express')
const Timeseries = require('../models/timeseries.model')
const router = app.Router()

// middleware
router.param('countyId', (req, res, next, countyId) => {
	Timeseries.findOne({}, (error, dateObj) => {
		if (!dateObj.get(countyId)) {
			return res.status(400).json("Error: Invalid county");
		}
		req.countyId = countyId;
	next();
	});
})

router.param('dateId', (req, res, next, dateId) => {
	Timeseries.findOne({date: new Date(dateId)}, `date ${req.countyId}`, (error, id) => {
		if (error || !id)
			return res.status(400).json('Error: Cannot find date in database');
		req.id = id;
		next()	
	})
})

// Read all. Limited to 10 so it doesn't take forever.
router.get('/', (req, res) => {
	Timeseries.find().limit(10)
		.exec((error, results) => {
			if (error)
				return next(error)
			res.send(results)
		})
})

// Read county + single date info
// http://localhost:5000/timeseries/1007/1.23.20/
router.get('/:countyId/:dateId', (req, res) => {
	res.send(req.id)
})

// Read county with time range
// http://localhost:5000/timeseries/1007 or
// http://localhost:5000/timeseries/1007?start=1.22.20&end=1.23.20
router.get('/:countyId', (req, res) => {
	// currently hard coded default dates but should probably change
	let startDate = req.query.start ? new Date(req.query.start) : new Date('1-22-2020');
	let endDate = req.query.end ? new Date(req.query.end) : new Date('5-20-2020');

	Timeseries.find({date: {$gte: startDate, $lte: endDate}}, `date ${req.countyId}`, (error, id) => {
		if (error)
			return res.status(400).json('Error: Invalid range of dates' + startDate + " " + endDate);
		res.send(id)
	})
})


// not sure if we're ever going to use these URIs
// CRUD - create
router.post('/', (req, res) => {
	// TODO: data validation and sanitization
	let newTimeseries = new Timeseries(req.body)
	newTimeseries.save()
		.then(() => res.json('Date Added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// CRUD - update
router.put('/:dateId', (req, res) => {
	if (req.body.date) 
		req.id.date = req.body.date
	// update embedded county schema here?
	req.id.save()
		.then(() => res.json('Date Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// CRUD - delete
router.delete('/:dateId', (req, res) => {
	req.id.remove((error, results) => {
		if (error)
			return next(error)
		res.send(results)
	})
})

module.exports = router