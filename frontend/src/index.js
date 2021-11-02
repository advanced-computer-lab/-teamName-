import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function Greeting() {

    const [flights,setflights]= useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/flight').then(res =>{
          setflights(res.data);
        });
    
      },[])

      console.log(flights);

  return (
    <h1 className="display-1">
        Hello World
    </h1>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<Greeting />, document.getElementById('root'))




