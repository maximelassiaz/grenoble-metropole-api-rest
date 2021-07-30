/* 
    Database source for parking spaces data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/les-decoupages-des-ecoles-maternelles
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Education/json/EDUCATION_DECOUPAGE_MATERNELLES_EPSG4326.json
*/

const mongoose = require('mongoose')

const kindergartensSchema = new mongoose.Schema({
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
                validator: (arr) => {
                    Array.isArray(arr) && Array.isArray(arr[0]) && arr[0].every(coord => Array.isArray(coord) && coord.length === 2 && coord.every(c => typeof c === "number"))
                },
                message: "Coordinates must be an array containing a single array containing arrays of length 2 with only numbers."
            }
        }
    },
    properties: {
        DEC_DECOUPAGE_MATERNELLES_ID: {
            type: Number,
            required: true
        },
        DEC_DECOUPAGE_MATERNELLES_NUM: {
            type: Number,
            required: true
        },
        DEC_DECOUPAGE_MATERNELLES_NOM: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('Kindergarten', kindergartensSchema)