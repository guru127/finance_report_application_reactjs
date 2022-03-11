import Cards from './../cards/Cards'
import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import axios from "axios"
import "./Album.css"


const Album=()=>{
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState(" ");
  const Albums = useSelector(state => state.album)
  const [searchResult, setSearchResult] = useState([]);
  
    const fetchPostsSuccess = data => {
      return {
        type: "FETCHALBUMS",
        payload: data
      }
    }

    const fetchPosts = () => {      
        return function (dispatch) { 

          axios.all([axios.get(`https://jsonplaceholder.typicode.com/photos`),
                 axios.get(`https://jsonplaceholder.typicode.com/albums`)])
              .then(axios.spread((photos, albums) => { 
                  
                  let Albums =[]
                  let n =0;
                for(let i = 0; i<10 ;  i++ ){
                      let Album  = new Object()                    
                      Album.title = albums.data[i].title;
                      Album.data = photos.data.slice(n, n+10);
                      n+=10;            
                      Albums.push(Album);        
                  }
                  dispatch(fetchPostsSuccess(Albums))
                  setLoaded(true);
           }))
          .catch(error => console.log(error));


        }
      }
      
   useEffect((e)=>{
      dispatch(fetchPosts())
    },[])

   useEffect((e)=>{
       setSearchResult(Albums)
    },[Albums])

   
    
   const search =(value)=>{      
      let arr = [];  
       for(let i = 0; i < Albums.length; i++){
         let Album  = new Object()
         Album.title = Albums[i].title;
         Album.data = Albums[i].data.filter(data =>{
               return (data.title.includes(value))
            });
         if(Album.data.length > 0){
           arr.push(Album)
         } 
        } 
              
    setSearchResult(arr);
     console.log(value)
   }
    

  return (
        <div className='container'>
            <div className="searchbar">         
                <input 
                    id='searchbar'
                    type="text" 
                    onChange={(e)=>{search(e.target.value)} }             
                    placeholder="See your financial report"
                 />
             </div>
       
         { loaded ? searchResult.map((album, index )=>{
          return(
            <div>
                <div className='album-title' >
                   {album.title} 
                </div>
             { album.data.map((data, index)=>{
                 return(
                    <Cards
                        key = {index}
                        id ={data.id}
                        title ={data.title}
                        url ={data.url}
                        thumbnailUrl = {data.thumbnailUrl}
                    />
                 )
               })
              }  
            </div>)}) :"loading..."
         }
       </div>
   )
}
export default Album;
