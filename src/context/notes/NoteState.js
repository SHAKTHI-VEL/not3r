
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const host="http://localhost:5000" || "http://192.168.1.103:3000"
  const notesInitial=[]
  const [notes,setnotes]=useState(notesInitial)

  const getNote=async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
    

   });
   const json=await response.json(); 
    
     setnotes(json)
  
  }
// Add a note
const addNote=async (title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST', 
    
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },
  
    body: JSON.stringify({title,description,tag}) 
 });
 const note=await response.json(); 
  
   
setnotes(notes.concat(note))
}
//   Edit note
const editNote=async (id,title,description,tag)=>{



    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
    
      body: JSON.stringify({title,description,tag}) 
     
   });
  //  const json= response.json(); 
  
  
  let newNotes=JSON.parse(JSON.stringify(notes))
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if(element._id===id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
   break;
  }
 
}

setnotes(newNotes)
}
// Delete note
const deleteNote=async (id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', 
    
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },
  
 
   
 });
 const json= response.json(); 

  

  const newNotes=notes.filter((note)=>{return note._id!==id});
  setnotes(newNotes)
}

 
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState