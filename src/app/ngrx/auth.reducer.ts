import * as fromAuth from './auth.actions';

export interface State {
    authData: any;
}

const initState: State = {
    authData: null
};

export function authReducer(state = initState, action: fromAuth.action): State {
    switch (action.type) {
        case fromAuth.SET_AUTH_DATA:
            return { 
                authData: { ...action.authData } 
            };

        default:
            return state;
    }
};