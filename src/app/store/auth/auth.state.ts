import { authModel } from "../../core/domain/auth/auth.model";

export interface AuthState extends authModel{
    loading:boolean;
    error: string; 
}

export const initialState : AuthState = getInitialState();

function getInitialState(){
    return {
        loading:false,
        error:'',
        name:'',
        email:'',
        token:'',
        isAdmin:false
    };
}