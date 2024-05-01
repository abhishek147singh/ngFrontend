import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import { login, loginError, loginSuccess, logout, updateProfile } from "./auth.action";


const _authReducer = createReducer(
    initialState,
    
    on(login , (state , action) => {
        return {...state , loading: true};
    }),
    
    on(loginSuccess, (state , action) => {
        const newState = {...state, loading: false , ...action.data};
        localStorage.setItem('auth', JSON.stringify(newState));
        return newState;
    }),

    on(updateProfile , (state , acion) => {
        return {...state , loading: true};
    }),
    
    on(loginError, (state , action) => {
        return {...state, loading:false, error: action.message};
    }),

    on(logout , (state , acion) => {
        localStorage.removeItem('auth');
        return initialState;
    }),
);


export function authReducer(state: AuthState | undefined , action : Action){
    return _authReducer(state , action);
}