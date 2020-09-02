import { Action } from '@ngrx/store';

export const SET_DATE = '[DATE] Set date';

export class SetDate implements Action {
    readonly type = SET_DATE;

    constructor(public dateData: any) {
        
    }
}

export type action = SetDate;