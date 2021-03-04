import ACTIONS from '../actions';
import convert from '../../util/RGBtoCMYK';

const initialState = [
    {
        name: "Cyan",
        color: { r: 0, g: 255, b: 255 },
        mapper: ((r, g, b) => { return convert(r, g, b).C }),
        raster_visible: true,
        raster: undefined,
        vector_visible: false,
        vector: undefined,
        gcode: undefined
    },
    {
        name: "Magenta",
        color: { r: 255, g: 0, b: 255 },
        mapper: ((r, g, b) => { return convert(r, g, b).M }),
        raster_visible: true,
        raster: undefined,
        vector_visible: false,
        vector: undefined,
        gcode: undefined
    },
    {
        name: "Yellow",
        color: { r: 255, g: 255, b: 0 },
        mapper: ((r, g, b) => { return convert(r, g, b).Y }),
        raster_visible: true,
        raster: undefined,
        vector_visible: false,
        vector: undefined,
        gcode: undefined
    },
    {
        name: "Black",
        color: { r: 0, g: 0, b: 0 },
        mapper: ((r, g, b) => { return convert(r, g, b).K }),
        raster_visible: true,
        raster: undefined,
        vector_visible: false,
        vector: undefined,
        gcode: undefined
    }
];

const Layers = function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_RASTER_VISIBILITY: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    raster_visible: !layer.raster_visible
                }
            })
        }

        case ACTIONS.SET_LAYER_RASTER: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    raster: action.payload.raster
                }
            })
        }

        case ACTIONS.TOGGLE_VECTOR_VISIBILITY: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    vector_visible: !layer.vector_visible
                }
            })
        }

        case ACTIONS.SET_LAYER_VECTOR: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    vector: action.payload.vector
                }
            })
        }

        case ACTIONS.SET_LAYER_GCODE: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    gcode: action.payload.gcode
                }
            })
        }

        default: {
            return state;
        }
    }
}

export default Layers;