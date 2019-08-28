import { Action } from '@ngrx/store';

export const SET_AUTH_DATA = '[AUTH Data] Set Auth data';

export class SetAuthDataAction implements Action {
    readonly type = SET_AUTH_DATA;

    constructor(public authData: any) {
        
    }
}

export type Action = SetAuthDataAction;
