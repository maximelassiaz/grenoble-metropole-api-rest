const express = require('express')
const router = express.Router()
const Tree = require('../../models/environment/tree')
const { authenticateToken, authenticateTokenAdmin } = require('../../authenticate')

// Get all trees
router.get('/', authenticateToken, async (req, res) => {
    try {
        const trees = await Tree.find()
        res.json(trees)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one tree
router.get('/:id', authenticateToken, getTree, (req, res) => {
    res.json(res.tree)
})

// Create one tree
router.post('/', authenticateTokenAdmin, async (req, res) => {
    const tree = new Tree({
        type: req.body.type,
        geometry: req.body.geometry,
        properties: req.body.properties
    })
    try {
        const newTree = await tree.save()
        res.status(201).json(newTree)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one tree
router.patch('/:id', authenticateTokenAdmin, getTree, async (req, res) => {
    if (req.body.type != null) {
        res.tree.type = req.body.type
    }
    if (req.body.geometry != null) {
        res.tree.geometry = { ...res.tree.geometry, ...req.body.geometry }
    }
    if (req.body.properties != null) {
        res.tree.properties = { ...res.tree.properties, ...req.body.properties }
    }
    try {
        const updatedTree = await res.tree.save()
        res.json(updatedTree)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one tree
router.delete('/:id', authenticateTokenAdmin, getTree, async (req, res) => {
    try {
        await res.tree.remove()
        res.json({ message: `Tree ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getTree(req, res, next) {
    let tree
    try {
        tree = await Tree.findById(req.params.id)
        if (tree == null) {
            return res.status(404).json({ message: "Cannot find tree."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.tree = tree
    next()
}

module.exports = router