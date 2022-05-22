import React,{useContext} from 'react'
import { Context } from "./index";

function Token() {

    
	const { state, dispatch } = useContext(Context);
	const { user } = state;

    if (user && user.accessToken){
        return (
      
            { Authorization: 'Bearer' + user.accessToken }
          )
    }else{
        return{};
    }

  
}

export default Token