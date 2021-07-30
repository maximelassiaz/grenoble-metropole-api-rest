const express = require('express')
const router = express.Router()
const Kindergarten = require('../../models/education/kindergarten')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all kindergartens
router.get('/', authenticateToken, async (req, res) => {
    try {
        const kindergartens = await Kindergarten.find()
        res.json(kindergartens)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one kindergarten
router.get('/:id', authenticateToken, getKindergarten, (req, res) => {
    res.json(res.kindergarten)
})

// Create one kindergarten
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const kindergarten = new Kindergarten({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newKindergarten = await kindergarten.save()
        res.status(201).json(newKindergarten)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one kindergarten
router.patch('/:id', authenticateTokenAdmin, getKindergarten, async (req, res) => {
    if (req.body.type != null) {
        res.kindergarten.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.kindergarten.geometry = { ...res.kindergarten.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.kindergarten.properties = { ...res.kindergarten.properties, ...req.body.properties }
    }
    try {
        const updatedKindergarten = await res.kindergarten.save()
        res.json(updatedKindergarten)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one kindergarten
router.delete('/:id', authenticateTokenAdmin, getKindergarten, async (req, res) => {
    try {
        await res.kindergarten.remove()
        res.json({ message: `Kindergarten ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getKindergarten(req, res, next) {
    let kindergarten
    try {
        kindergarten = await Kindergarten.findById(req.params.id)
        if (kindergarten == null) {
            return res.status(404).json({ message: "Cannot find kindergarten."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.kindergarten = kindergarten
    next()
}


module.exports = router