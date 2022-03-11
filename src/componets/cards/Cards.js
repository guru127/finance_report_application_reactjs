import React from 'react'
import {Grid} from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux";
import "./Cards.css"

function Cards(props) {
  //console.log("props------"+JSON.stringify(props))
  let number = Math.floor(Math.random() * 250) + 50;  
  return (
    <Grid   
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
        <Grid item xs={1}></Grid>
        <Grid item xs={1}  > 
          <img className='iamge' src={props.thumbnailUrl} alt="thumbnile"/>
        </Grid>
        <Grid item xs={8} >
          <div className='album-name' >{props.title}</div>
          <a id='link' href ={props.url}>{props.url}</a>
        </Grid>
        <Grid item xs={1}>
          <div className='amount' style={number>75? {color:"green"}: {color:"red",} }>{"$ "+number}</div>
          <div id='time' >10:00 AM</div>
        </Grid>
        <Grid item xs={1}> </Grid>
    </Grid>
  )
}

export default Cards;

