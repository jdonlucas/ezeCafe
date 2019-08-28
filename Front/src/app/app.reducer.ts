import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './ngrx/ui.reducer';
import * as fromAuth from './ngrx/auth.reducer';

export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
}