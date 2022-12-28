import React from 'react';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const SingleCompleted = ({tasks, refetch}) => {
   
   const {img_url, task, _id, status, comment} = tasks;

   const handleComplete = id =>{
      console.log(id)
      fetch(`http://localhost:5000/task-incomplete/${id}`, {
           method: "PUT",
           headers: {
            "content-type": "application/json",
          }
         })
           .then((res) => res.json())
           .then((data) => {
             console.log(data)
             if(data.modifiedCount>0){
               toast('Task has not been completed')
               Navigate('/completed')
             }
           });
   }

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

   const handleSubmit = event =>{
      console.log(event.target)
      event.preventDefault()
      const form = event.target
      const message = form.message.value
      const postData = {comment:message, commentId:_id}
      
      fetch("http://localhost:5000/comment",{
         method: "POST",
         headers: {
          'content-type' : 'application/json'
         },
         body: JSON.stringify(postData)
       })
         .then((res) => res.json())
         .then((result) => {
           console.log(result);
           if (result.acknowledged) {
             toast.success('comment added')
             
           }
         });

   }

   return (
      status === 'completed' && <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
<a href="#">
    {
     img_url ? <img class="rounded-t-lg" src={img_url} alt="" /> : <img class="rounded-t-lg" src="https://i.ibb.co/MVTxLb7/1200x630wa.png" alt="" />
    }
</a>
<div class="p-5">
    
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>
    
    
    <button onClick={()=>handleComplete(_id)} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Not Completed</button>
     <button onClick={()=>handleDelete(_id)} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Delete</button>
</div>
<div>
   <p>{comment}</p>
</div>
<div>
   
<form onSubmit={handleSubmit}>
    <label for="chat" class="sr-only">Your message</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea name='message' id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <button id={_id} type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span class="sr-only">Add message</span>
        </button>
    </div>
</form>

</div>

</div>
   );
};

export default SingleCompleted;