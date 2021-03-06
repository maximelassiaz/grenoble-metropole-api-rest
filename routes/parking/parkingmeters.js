const express = require('express')
const router = express.Router()
const Parkingmeter = require('../../models/parking/parkingmeter')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all parkingmeters
router.get('/', authenticateToken, async (req, res) => {
    try {
        const parkingmeters = await Parkingmeter.find()
        res.json(parkingmeters)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one parkingmeter
router.get('/:id', authenticateToken, getParkingmeter, (req, res) => {
    res.json(res.parkingmeter)
})

// Create one parkingmeter
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const parkingmeter = new Parkingmeter({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newParkingmeter = await parkingmeter.save()
        res.status(201).json(newParkingmeter)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one parkingmeter
router.patch('/:id', authenticateTokenAdmin, getParkingmeter, async (req, res) => {
    if (req.body.type != null) {
        res.parkingmeter.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.parkingmeter.geometry = { ...res.parkingmeter.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.parkingmeter.properties = { ...res.parkingmeter.properties, ...req.body.properties }
    }
    try {
        const updatedParkingmeter = await res.parkingmeter.save()
        res.json(updatedParkingmeter)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one parkingmeter
router.delete('/:id', authenticateTokenAdmin, getParkingmeter, async (req, res) => {
    try {
        await res.parkingmeter.remove()
        res.json({ message: `Parking meter ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getParkingmeter(req, res, next) {
    let parkingmeter
    try {
        parkingmeter = await Parkingmeter.findById(req.params.id)
        if (parkingmeter == null) {
            return res.status(404).json({ message: "Cannot find parkingmeter."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.parkingmeter = parkingmeter
    next()
}

module.exports = router