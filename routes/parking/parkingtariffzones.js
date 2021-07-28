const express = require('express')
const router = express.Router()
const Parkingtariffzone = require('../../models/parking/parkingtariffzone')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all parkingtariffzones
router.get('/', authenticateToken, async (req, res) => {
    try {
        const parkingtariffzones = await Parkingtariffzone.find()
        res.json({ parkingtariffzones})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Get one parkingtariffzone
router.get('/:id', authenticateToken, getParkingtariffzone, (req, res) => {
    res.json(res.parkingtariffzone)
})

// Create one parkingtariffzone
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const parkingtariffzone = new Parkingtariffzone({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newParkingtariffzone = await parkingtariffzone.save()
        res.status(201).json(newParkingtariffzone)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one parkingtariffzone
router.patch('/:id', authenticateTokenAdmin, getParkingtariffzone, async (req, res) => {
    if (req.body.type != null) {
        res.parkingtariffzone.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.parkingtariffzone.geometry = { ...res.parkingtariffzone.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.parkingtariffzone.properties = { ...res.parkingtariffzone.properties, ...req.body.properties }
    }
    try {
        const updatedParkingtariffzone = await res.parkingtariffzone.save()
        res.json(updatedParkingtariffzone)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one parkingtariffzone
router.delete('/:id', authenticateTokenAdmin, getParkingtariffzone, async(req, res) => {
    try {
        await res.parkingtariffzone.remove()
        res.json({ message: `Parking tariff zone ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getParkingtariffzone(req, res, next) {
    let parkingtariffzone
    try {
        parkingtariffzone = await Parkingtariffzone.findById(req.params.id)
        if (parkingtariffzone == null) {
            return res.status(404).json({ message: 'Cannot find parking tariff zone.'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.parkingtariffzone = parkingtariffzone
    next()
}

module.exports = router