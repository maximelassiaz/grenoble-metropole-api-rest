const express = require('express')
const router = express.Router()
const Parkingspecializedplace = require('../../models/parking/parkingspecializedplace')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all parkingpspecializedplaces
router.get('/', authenticateToken, async (req, res) => {
    try {
        const parkingspecializedplaces = await Parkingspecializedplace.find()
        res.json(parkingspecializedplaces)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one parkingmeter
router.get('/:id', authenticateToken, getParkingspecializedplace, (req, res) => {
    res.json(res.parkingspecializedplace)
})

// Create one parkingmeter
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const parkingspecializedplace = new Parkingspecializedplace({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newParkingspecializedplace = await parkingspecializedplace.save()
        res.status(201).json(newParkingspecializedplace)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one parkingmeter
router.patch('/:id', authenticateTokenAdmin, getParkingspecializedplace, async (req, res) => {
    if (req.body.type != null) {
        res.parkingspecializedplace.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.parkingspecializedplace.geometry = { ...res.parkingspecializedplace.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.parkingspecializedplace.properties = { ...res.parkingspecializedplace.properties, ...req.body.properties }
    }
    try {
        const updatedParkingspecializedplace = await res.parkingspecializedplace.save()
        res.json(updatedParkingspecializedplace)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one parkingmeter
router.delete('/:id', authenticateTokenAdmin, getParkingspecializedplace, async (req, res) => {
    try {
        await res.parkingspecializedplace.remove()
        res.json({ message: `Parking specialized place ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getParkingspecializedplace(req, res, next) {
    let parkingspecializedplace
    try {
        parkingspecializedplace = await Parkingspecializedplace.findById(req.params.id)
        if (parkingspecializedplace == null) {
            return res.status(404).json({ message: "Cannot find parking specialized place."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.parkingspecializedplace = parkingspecializedplace
    next()
}

module.exports = router