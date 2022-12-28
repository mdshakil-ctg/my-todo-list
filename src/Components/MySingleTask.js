import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const MySingleTask = ({tasks, refetch}) => {
   const {img_url, task, _id, status} = tasks;
   console.log(tasks)

   const handleDelete = id =>{
      if (window.confirm("Are You sure to delete?")) {
         fetch(`http://localhost:5000/task-delete/${id}`, {
           method: "DELETE",
         })
           .then((res) => res.json())
           .then((data) => {
             if (data.deletedCount > 0) {
               toast("Task Deleted Succesfully");
               refetch();
             }
           });
       }
   }

   const handleComplete = id =>{
      console.log(id)
      fetch(`http://localhost:5000/task-complete/${id}`, {
           method: "PUT",
           headers: {
            "content-type": "application/json",
          }
         })
           .then((res) => res.json())
           .then((data) => {
             console.log(data)
             if(data.modifiedCount>0){
               toast('Task has been completed')
               Navigate('/completed')
             }
           });
   }

   return (
    
status !== 'completed' && <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
<a href="#">
    {
     img_url ? <img class="rounded-t-lg" src={img_url} alt="" /> : <img class="rounded-t-lg" src="https://i.ibb.co/MVTxLb7/1200x630wa.png" alt="" />
    }
</a>
<div class="p-5">
    
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>
    
    
    <button onClick={()=>handleComplete(_id)} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Completed</button>
     <button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Update</button>
     <button onClick={()=>handleDelete(_id)} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Delete</button>
</div>

</div>

   );
};

export default MySingleTask;