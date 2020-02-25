export const INITIAL_STATE = {
    posts: [],
};

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: action.data
            };
        default:
            return state
    }
};