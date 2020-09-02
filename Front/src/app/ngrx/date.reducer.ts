import * as DateActions from './date.actions';

export interface State {
    dateData: any;
}

const initState: State = {
    dateData: new Date()
};

export function dateReducer(state = initState, action: DateActions.action): State {
    switch (action.type) {
        case DateActions.SET_DATE:
            return { 
                dateData: { ...action.dateData } 
            };

        default:
            return state;
    }
};