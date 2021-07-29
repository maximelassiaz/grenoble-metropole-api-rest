/* 
    Database source for parking spaces data :
    Data presentation : https://data.metropolegrenoble.fr/ckan/dataset/les-arbres-de-grenoble
    Data json : https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/EspacePublic/json/ARBRES_TERRITOIRE_VDG_EPSG4326.json
*/

const mongoose = require('mongoose')

const treesSchema = new mongoose.Schema({
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
                validator: (arr) => arr.length === 2 && arr.every(coord => typeof coord === "number"),
                message: "Coordinates array must be of length 2 and contains float"
            }
        }
    },
    properties: {
        ELEM_POINT_ID: {
            type: Number,
            default: null
        },
        CODE: {
            type: String,
            default: null
        },
        NOM: {
            type: String,
            default: null
        },
        GENRE: {
            type: String,
            default: null
        },
        GENRE_DESC: {
            type: String,
            default: null
        },
        CATEGORIE: {
            type: String,
            default: null
        },
        CATEGORIE_DESC: {
            type: String, 
            default: null
        },
        SOUS_CATEGORIE: {
            type: String,
            default: null
        },
        SOUS_CATEGORIE_DESC: {
            type: String,
            default: null
        },
        CODE_PARENT: {
            type: String,
            default: null
        },
        CODE_PARENT_DESC: {
            type: String,
            default: null
        },
        ADR_SECTEUR: {
            type: String,
            default: null
        },
        BIEN_REFERENCE: {
            type: String,
            default: null
        },
        GENRE_BOTA: {
            type: String,
            default: null
        },
        ESPECE: {
            type: String,
            default: null
        },
        VARIETE: {
            type: String,
            default: null
        },
        STADEDEDEVELOPPEMENT: {
            type: String,
            default: null
        },
        EQUIPE: {
            type: String,
            default: null
        },
        REMARQUES: {
            type: String,
            default: null
        },
        ANNEEDEPLANTATION: {
            type: String,
            default: null
        },
        RAISONDEPLANTATION: {
            type: String,
            default: null
        },
        TRAITEMENTCHENILLES: {
            type: String,
            default: null
        },
        COURRIER: {
            type: String,
            default: null
        },
        IDENTIFIANTPLU: {
            type: String,
            default: null
        },
        TYPEIMPLANTATIONPLU: {
            type: String,
            default: null
        },
        INTITULEPROTECTIONPLU: {
            type: String,
            default: null
        }, 
        ANNEEABATTAGE: {
            type: String,
            default: null
        },
        ESSOUCHEMENT: {
            type: String,
            default: null
        },
        DIAMETREARBRE: {
            type: String,
            default: null
        },
        CAUSEABATTAGE: {
            type: String,
            default: null
        },
        COLLECTIVITE: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('Tree', treesSchema)