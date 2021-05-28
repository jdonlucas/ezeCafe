import { Action } from '@ngrx/store';

export const SET_COMANDA_DATA = '[COMANDA Data] Set COMANDA data';

export class SetComandaDataAction implements Action {
    readonly type = SET_COMANDA_DATA;

    constructor(public comandaData: any) {
        
    }
}

export type action = SetComandaDataAction;
