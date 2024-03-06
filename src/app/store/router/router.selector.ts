import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getRouter = createSelector(getRouterState , (router) => {
    return router.state;
});