"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVATE_LOADING = '[UI Loading] Cargando...';
exports.DESACTIVATE_LOADING = '[UI Loading] Cargado...';
var ActivateLoadingAction = /** @class */ (function () {
    function ActivateLoadingAction() {
        this.type = exports.ACTIVATE_LOADING;
    }
    return ActivateLoadingAction;
}());
exports.ActivateLoadingAction = ActivateLoadingAction;
var DesctivateLoadingAction = /** @class */ (function () {
    function DesctivateLoadingAction() {
        this.type = exports.DESACTIVATE_LOADING;
    }
    return DesctivateLoadingAction;
}());
exports.DesctivateLoadingAction = DesctivateLoadingAction;