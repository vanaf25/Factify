import './App.css';
import SideBar from "./components/SideBar/SideBar";
import FactSearch from "./components/FactSearch/FactSearch";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
function App() {
    const { register, handleSubmit } = useForm()
    const [data,setData]=useState(false);
    const onSubmitHandle=(data)=>{
        console.log('data:',data);
        setData(true)
    }
  return (
      <div>
          <div className="dashboard">
              <SideBar/>
              <FactSearch/>
          </div>
      </div>
  );
}

export default App;
