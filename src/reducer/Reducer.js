import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk' 
const thunkMiddleware = require('redux-thunk').default


const initialState = {
     album:[]
  };

function reducer(state = initialState , action){
   // console.log("album--",action.payload)
    switch(action.type){       
        case 'FETCHALBUMS' :
            return{
                 album: action.payload 
            }
         default:
             return state  
    }
}  
export const store = createStore(reducer, applyMiddleware(thunkMiddleware))
