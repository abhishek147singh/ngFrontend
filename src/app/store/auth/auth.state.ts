import { authModel } from "../../core/domain/auth/auth.model";

export interface AuthState extends authModel{
    loading:boolean;
    error: string; 
}

export const initialState : AuthState = getInitialState();

function getInitialState(){
    if(typeof localStorage !== 'undefined'){
        const authState = localStorage.getItem('auth');
        if(authState){
            return JSON.parse(authState);
        }
    }

    return {
        loading:false,
        error:'',
        name:'',
        email:'',
        token:'',
        isAdmin:false
    };
}