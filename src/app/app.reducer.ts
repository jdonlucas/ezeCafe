import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './ngrx/ui.reducer';
import * as fromAuth from './ngrx/auth.reducer';
import * as fromComanda from './ngrx/comanda.reducer';
import * as fromDate from './ngrx/date.reducer';
export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.State;
    comanda: fromComanda.State;
    date: fromDate.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
    comanda: fromComanda.comandaReducer,
    date: fromDate.dateReducer
}