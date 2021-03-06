import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOG_OUT
} from '../constants/constants';

import axios from 'axios';
import {setToken} from '../setToken';

export const loadUser = () => async dispatch =>{
    if(localStorage.getItem('token'))
         setToken(localStorage.getItem('token'));
    try{
        const response = await axios.get('http://localhost:6001/account');
        dispatch({
            type: LOAD_USER,
            payload: response.data
        })
    } catch (error){
        dispatch({ type: AUTH_ERROR, payload:error});
    }
}
export const registerUser = (firstname,lastname,email,phone,password) => async dispatch =>{
    try{
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({firstname,lastname,email,phone,password});
        
        console.log(body);
        const response= await axios.post('http://localhost:6001/account/register',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());
        
    }catch(error){
        dispatch({ type: REGISTER_FAIL, payload: error});
    }
}
export const loginUser = (phone,password) => async dispatch =>{
    try{
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({phone,password});
        const response= await axios.post('http://localhost:6001/account/login',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());
        
    }catch(error){
        dispatch({ type: LOGIN_FAIL,payload: error});
    }
}

export const logOut =() => async dispatch =>{
    dispatch({
        type: LOG_OUT
    })
}
