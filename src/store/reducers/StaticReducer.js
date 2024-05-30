import * as types from '../actions/types';

const InitialState = {
    staticData: {

    },
}

export function StaticReducer(state = InitialState, action) {

    switch (action.type) {
        case types.staticData:{
            return {
                ...state,
                staticData: action.payload
            }
        }
        default:
            return state;
    }


}
