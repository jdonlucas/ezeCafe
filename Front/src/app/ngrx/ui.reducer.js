"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fromUi = require("./ui.actions");
var initState = {
    isLoading: false
};
function uiReducer(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case fromUi.ACTIVATE_LOADING:
            return { isLoading: true };
        case fromUi.DESACTIVATE_LOADING:
            return { isLoading: false };
        default:
            return state;
    }
}
exports.uiReducer = uiReducer;