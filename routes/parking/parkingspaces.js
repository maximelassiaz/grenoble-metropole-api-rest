const express = require('express')
const router = express.Router()
const Parkingspace = require('../../models/parking/parkingspace')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all parkingspaces
router.get('/', authenticateToken, async (req, res) => {
    try {
        const parkingspaces = await Parkingspace.find()
        res.json(parkingspaces)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one parkingspace
router.get('/:id', authenticateToken, getParkingspace, (req, res) => {
    res.json(res.parkingspace)
})

// Create one parkingspace
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const parkingspace = new Parkingspace({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newParkingspace = await parkingspace.save()
        res.status(201).json(newParkingspace)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one parkingspace
router.patch('/:id', authenticateTokenAdmin, getParkingspace, async (req, res) => {
    if (req.body.type != null) {
        res.parkingspace.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.parkingspace.geometry = { ...res.parkingspace.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.parkingspace.properties = { ...res.parkingspace.properties, ...req.body.properties }
    }
    try {
        const updatedParkingspace = await res.parkingspace.save()
        res.json(updatedParkingspace)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one parkingspace
router.delete('/:id', authenticateTokenAdmin, getParkingspace, async (req, res) => {
    try {
        await res.parkingspace.remove()
        res.json({ message: `Parking space ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getParkingspace(req, res, next) {
    let parkingspace
    try {
        parkingspace = await Parkingspace.findById(req.params.id)
        if (parkingspace == null) {
            return res.status(404).json({ message: "Cannot find parking space"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.parkingspace = parkingspace
    next()
}

module.exports = router