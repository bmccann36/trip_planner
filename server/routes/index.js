const router = require('express').Router();
const Hotel = require('../models').Hotel;
const Restaurant = require('../models').Restaurant;
const Activity = require('../models').Activity;
const Itinerary = require('../models/itinerary')

router.get('/', (req, res, next) => {
	Promise.all([
		Hotel.findAll({include : [{all : true}]}),
		Restaurant.findAll({include : [{all : true}]}),
		Activity.findAll({include : [{all : true}]})
	])
	.then(([hotels, restaurants, activities]) => {
		res.json({
			hotels,
			restaurants,
			activities
		})
	})
	.catch(next)
})

router.get('/itineraries/:itinerary_id', (req, res, next) => {
	// console.log(req.params.itinerary_id)
	let itId = req.params.itinerary_id
	Itinerary.findById(itId, {
		include: [{ all: true, nested: true }]
	})
	.then(data => {
		res.json(data)
	})

	// res.send()
})


module.exports = router;
