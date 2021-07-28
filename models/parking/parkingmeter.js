/* 
    Database source for parking meters data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/emplacement-des-horodateurs-sur-grenoble
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Stationnement/json/STATIONNEMENT_HORODATEUR_VDG_EPSG4326.json
*/

const mongoose = require('mongoose')

const parkingmetersSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    geometry: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: Array,
            required: true,
            validate: {
                validator: arr => arr.length === 2 && arr.every(x => typeof x === 'number'),
                message: "Coordinates must be an array of number of length 2."
            }
        }
    },
    properties: {
        HOROD_ID: {
            type: Number,
            default: null
        },
        HOROD_DATEMES: {
            type: String,
            default: null
        },
        HOROD_ZONE: {
            type: String,
            default: null
        },
        HOROD_DATECRE: {
            type: String,
            default: null
        },
        HOROD_MODEL_NOM: {
            type: String,
            default: null
        },
        HOROD_NUMPLASTRON: {
            type: String,
            default: null
        },
        HOROD_TARIF_NOM: {
            type: String,
            default: null
        },
        HOROD_LECMAGN: {
            type: Number,
            default: null
        },
        HOROD_MODIF_NOM: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('Parkingmeter', parkingmetersSchema)