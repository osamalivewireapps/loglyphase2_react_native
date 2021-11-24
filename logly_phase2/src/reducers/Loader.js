/* eslint-disable prettier/prettier */


export default function (state = { isLoading: true }, action) {
    switch (action.type) {
        case 'ENABLE':
            return { isLoading: true };
        case 'DISABLE':
            return { isLoading: false };
        default:
            return state;
    }
}