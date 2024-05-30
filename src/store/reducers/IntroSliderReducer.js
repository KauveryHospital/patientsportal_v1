const InitialState = {
    title: "",
}


export function IntroSliderReducer(state = InitialState, action) {

    switch (action.type) {
        case 'LOGIN':{
            return {
                ...state,
                title: action.payload
            }
        }
        default:
            return state;
    }


}
