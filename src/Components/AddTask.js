import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddTask = () => {

   const key ='10da703fd9c059e121221d8e00fb4d5e';
   const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
  
    const handleTask = (data) => {
      console.log(data)
  
      const image = data.photo[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${key}`;
     
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
         console.log(result)
          if (result.success) {
            const postData = {
              img_url: result.data.url,
              task: data.text
            };
            fetch("http://localhost:5000/task",{
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
                  toast.success('task added')
                }
              });
          }
        });
    };

 

   return (
      <form onSubmit={handleSubmit(handleTask)}>
        
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
<input 
{...register("photo", {
   required: "photo is required",
 })}
class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

<div class="mb-6">
    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add My Task</label>
    <input
    {...register("text", {
      required: "text is required",
    })}
    type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>

<button type='submit' class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Add Task
  </span>
</button>

      </form>
   );
};

export default AddTask;