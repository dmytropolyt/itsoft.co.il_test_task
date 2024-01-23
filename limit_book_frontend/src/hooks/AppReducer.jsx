export { AppReducer };

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return { ...state, initializedData: action.payload };
        case 'LOGIN':
            return { ...state, isAuth: action.payload };
        default:
            return state;
    }
}