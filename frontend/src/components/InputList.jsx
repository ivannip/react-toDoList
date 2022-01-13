import React, { useState } from "react";
import axios from "axios";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";



function InputList(props) {
  //const [value, setValue] = useState("");
  const [toDoList, setList] = useState({task:"", doneStatus: false});

  function handleChange(event) {
      const {name, value} = event.target;
      setList({...toDoList, [name]: value});
  }

  async function handleAdd(event) {
    try {
        event.preventDefault();
        await axios.post(process.env.REACT_APP_API_ENDPOINT+"api/toDoList", toDoList);
        setList({task:""});
        props.updateStatus();
    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className="p-formgroup-inline">
        <InputText
          id="task"
          name="task"
          value={toDoList.task}
          onChange={handleChange}
          placeholder="Add Task"
        />
        <label htmlFor="task" className="p-sr-only">Add Task</label>
        <Button type="button" label="Add" onClick={handleAdd}/>
    </div>

  );
}

export default InputList;
