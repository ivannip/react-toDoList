import React, {useState} from "react";
import axios from "axios";


import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui'; 

function Note(props) {
  
  const [checked, setChecked] = useState(props.toDoList.doneStatus);

  // function handleSelect() {
  //   setChecked( (prev) => {
  //     taskDone(props.toDoList._id, !prev);
  //     return !prev
  //   });
  //   props.updateStatus();
  // }

  function handleSelect(event) {
    setChecked(event.checked);
    taskDone(event.target.value, event.checked);
    props.updateStatus();
  }

  async function taskDone(key, status) {
    try {
      await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/${key}`, {doneStatus: status});
    } catch(error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/${props.toDoList._id}`)
    } catch (err) {
      console.log(err)
    }
    props.updateStatus();
  }

  return (
    <Card style={{width: "240px", height: "100px", textDecoration: checked? 'line-through':''}}>
      <span>
        <BlockUI blocked={props.deleteStatus}> 
      
        <Checkbox style={{marginRight:"20px"}} inputId={props.toDoList._id} value={props.toDoList._id} checked={checked} onChange={handleSelect}></Checkbox>
        {props.toDoList.task}
        </BlockUI>
      {
       props.deleteStatus? (<Button style={{float: "right", marginRight:"2px"}} icon="pi pi-trash" 
       className="p-button-rounded p-button-text" onClick={handleDelete}/>):("")
      }
      </span>
    </Card>
  );
};

//<Button label={props.toDoList.task} style={{width: "150px"}} className="p-button-link" onClick={handleSelect}/>
//<Checkbox inputId={props.toDoList._id} value={props.toDoList._id} checked={checked} onChange={handleSelect}></Checkbox>
//<label className="lbl" htmlFor={props.toDoList._id} className="p-checkbox-label">{props.toDoList.task}</label>
//<Button icon="pi pi-trash" className="button p-button-rounded p-button-text" value={props.toDoList._id} onClick={handleDelete}/>

export default Note;