import ACTIONS from '../actions';
import convert from '../../util/RGBtoCMYK';

const initialState = [
    {
        name: "Cyan",
        color: { r: 0, g: 255, b: 255 },
        mapper: ((r, g, b) => { return convert(r, g, b).C }),
        visible: true,
        raster: undefined,
        raster_progress: 0,
        vecor: undefined,
        vector_progress: 0
    },
    {
        name: "Magenta",
        color: { r: 255, g: 0, b: 255 },
        mapper: ((r, g, b) => { return convert(r, g, b).M }),
        visible: true,
        raster: undefined,
        raster_progress: 0,
        vecor: undefined,
        vector_progress: 0
    },
    {
        name: "Yellow",
        color: { r: 255, g: 255, b: 0 },
        mapper: ((r, g, b) => { return convert(r, g, b).Y }),
        visible: true,
        raster: undefined,
        raster_progress: 0,
        vecor: undefined,
        vector_progress: 0
    },
    {
        name: "Black",
        color: { r: 0, g: 0, b: 0 },
        mapper: ((r, g, b) => { return convert(r, g, b).K }),
        visible: true,
        raster: undefined,
        raster_progress: 0,
        vecor: undefined,
        vector_progress: 0
    }
];

const Layers = function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_LAYER_VISIBILITY: {
            return state.map((layer, index) => {
                if (index !== action.payload.id) {
                    return layer
                }
                return {
                    ...layer,
                    visible: !layer.visible
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

        default: {
            return state;
        }
    }
}

export default Layers;