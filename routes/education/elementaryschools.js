const express = require('express')
const router = express.Router()
const Elementaryschool = require('../../models/education/elementaryschool')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all elementaryschools
router.get('/', authenticateToken, async (req, res) => {
    try {
        const elementaryschools = await Elementaryschool.find()
        res.json(elementaryschools)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one elementaryschool
router.get('/:id', authenticateToken, getElementaryschool, (req, res) => {
    res.json(res.elementaryschool)
})

// Create one elementaryschool
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const elementaryschool = new Elementaryschool({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newElementaryschool = await elementaryschool.save()
        res.status(201).json(newElementaryschool)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one elementaryschool
router.patch('/:id', authenticateTokenAdmin, getElementaryschool, async (req, res) => {
    if (req.body.type != null) {
        res.elementaryschool.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.elementaryschool.geometry = { ...res.elementaryschool.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.elementaryschool.properties = { ...res.elementaryschool.properties, ...req.body.properties }
    }
    try {
        const updatedElementaryschool = await res.elementaryschool.save()
        res.json(updatedElementaryschool)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one elementaryschool
router.delete('/:id', authenticateTokenAdmin, getElementaryschool, async (req, res) => {
    try {
        await res.elementaryschool.remove()
        res.json({ message: `Elementary school ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getElementaryschool(req, res, next) {
    let elementaryschool
    try {
        elementaryschool = await Elementaryschool.findById(req.params.id)
        if (elementaryschool == null) {
            return res.status(404).json({ message: "Cannot find elementary school."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.elementaryschool = elementaryschool
    next()
}

module.exports = router