import { createAction, props } from "@ngrx/store";
import { authModel } from "../../core/domain/auth/auth.model";

export const AUTH_STATE = 'auth';

const loginAction = '[login page] login';
const registerAction = '[login page] register';
const updateProfileAction = '[login page] update profile'; 
const loginSuccessAction = '[login page] login success';
const loginErrorAction = '[login page] login error';

export const logoutAction = '[login page] logout';

export const login = createAction(loginAction , props<{ username: string , pass: string , redirectionUrl:string }> ());
export const register = createAction(registerAction , props<{ username: string , pass: string, email:string, redirectionUrl:string }> ());
export const loginSuccess = createAction(loginSuccessAction , props<{ data : authModel }> ());
export const loginError = createAction(loginErrorAction , props<{ message:string }> ());
export const updateProfile = createAction(updateProfileAction , props<{ username: string , pass: string, email:string}> ());

export const logout = createAction(logoutAction);

export const dummy = createAction('dummy Action');