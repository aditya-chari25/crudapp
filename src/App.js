import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";

function App() {
  const[listTasks,setListTasks] = useState([]);
  const[name,setName] = useState("")
  const[taskname,setTaskname]=useState("")

  useEffect(()=>{
    Axios.get("https://mern-prc.herokuapp.com/getTask")
    .then((res)=>{
      setListTasks(res.data)
    })
  },[])

  const createTask =()=>{
    Axios.post("https://mern-prc.herokuapp.com/createTask",{
      name:name,
      task:taskname,
    })
    .then((res)=>{
      Axios.get("https://mern-prc.herokuapp.com/getTask")
    .then((res)=>{
      setListTasks(res.data)
    })
    });
  }

  const deleteTask =(ob1,ob2)=>{
    Axios.post("https://mern-prc.herokuapp.com/deleteTask",{
      ob1,
      ob2,
    })
    .then((res)=>{
      Axios.get("https://mern-prc.herokuapp.com/getTask")
    .then((res)=>{
      setListTasks(res.data)
    })
    });
  }

  return (
    <div className="App">
      <div className="tasks">
        {listTasks.map((task)=>{
          return(
            <div>
              <h1>Name:{task.name}</h1>
              <h1>Task:{task.task}</h1>
              <button onClick={()=>deleteTask(task.name,task.task)}>Delete Task</button>
              <h3>----------------------------------------</h3>
            </div>
          )
        })}
      </div>

      <div>
        <input type="text" placeholder="Name" onChange={(event)=>{
          setName(event.target.value);
        }}/>
        <input type="text" placeholder="Task" onChange={(event)=>{
          setTaskname(event.target.value);
        }}/>
        <button onClick={createTask}>Create Task</button>
      </div>

    </div>


  );
}

export default App;
