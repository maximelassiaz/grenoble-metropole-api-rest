/* 
    Database source for parking specialized zones data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/emplacement-des-places-specialisees-pour-tous-les-types-de-places
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Stationnement/json/STATIONNEMENT_PLASPE_VDG_EPSG4326.json
*/

const mongoose = require('mongoose')

const parkingspecializedplacesSchema = new mongoose.Schema({
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
                validator: arr => arr.every(coord => typeof coord === "number") && arr.length === 2,
                message: "Coordinates array elements must be contain only float and be of length 2"
            }
        }
    },
    properties: {
        PLASPE_ID: {
            type: Number,
            default: null
        },
        PLASPE_TYPE_NOM: {
            type: String,
            default: null
        },
        PLASPE_ADRES_LIBEL: {
            type: String,
            default: null
        },
        PLASPE_VOIE_NOMCOMPL: {
            type: String,
            default: null
        },
        PLASPE_BARRETTE_NUM: {
            type: Number,
            default: null
        },
        PLASPE_PARC_NUM: {
            type: Number,
            default: null
        },
        PLASPE_SIGN_NOM: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('Parkingspecializedplace', parkingspecializedplacesSchema)