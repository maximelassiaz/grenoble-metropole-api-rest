/* 
    Database source for parking tariff zones data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/plan-de-stationnement-selon-les-zones-tarifaires
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Stationnement/json/STATIONNEMENT_DECOUPAGE_VDG_EPSG4326.json
*/

const mongoose = require('mongoose')

const parkingtariffzonesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    geometry: {
        type: {
            type: String,
            required: true,
        },
        coordinates: {
            type: Array,
            required: true,
            validate: {
                validator: arr => arr.every(coord => Array.isArray(coord)),
                message: "Coordinates array elements must be arrays containing numbers of length 2"
            }
        }
    },
    properties: {
        DEC_CONT_STAT_ID: {
            type: Number,
            default: null
        },
        DEC_CONT_STAT_NUM: {
            type: Number,
            default: null
        },
        DEC_CONT_STAT_NOM: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('Parkingtariffzone', parkingtariffzonesSchema)