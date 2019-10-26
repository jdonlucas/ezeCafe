import * as fromComanda from './comanda.actions';

export interface State {
    comandaData: any;
}

const initState: State = {
    comandaData: null
};

export function comandaReducer(state = initState, action: fromComanda.Action): State {
    switch (action.type) {
        case fromComanda.SET_COMANDA_DATA:
            return { 
                comandaData: { ...action.comandaData } 
            };

        default:
            return state;
    }
};