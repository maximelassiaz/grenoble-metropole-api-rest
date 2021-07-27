/* 
    Database source for parking spaces data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/places-de-stationnement
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Stationnement/json/STATIONNEMENT_BARRETTE_VDG_EPSG4326.json
*/

const mongoose = require('mongoose')

const parkingspacesSchema = new mongoose.Schema({
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
                validator: arr => arr.every(coord => Array.isArray(coord) && coord.length === 2 && coord.every(c => typeof c === "number")),
                message: "Coordinates array elements must be arrays containing numbers of length 2"
            }
        },
    },
    properties: {
        BARRETTE_ID: {
            type: Number,
            required: true
        },
        BARRETTE_NUM: {
            type: Number,
            required: true
        },
        BARRETTE_TARIF_NOM: {
            type: String,
            required: true
        },
        BARRETTE_ZONE: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
            validate: {
                validator: (element) => typeof element === "string" || element == null,
                message: "Barrette zone must be of type string or null."
            }
        },
        BARRETTE_VOIE_NOMCOMPL: {
            type: String,
            required: true
        },
        BARRETTE_TYPE_NOM: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('Parkingspace', parkingspacesSchema)