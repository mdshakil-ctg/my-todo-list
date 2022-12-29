import React, { useContext } from 'react';
import { AuthContext } from './../Context/UserContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const {user} = useContext(AuthContext)
   const navigate = useNavigate()
   const handleSubmit = event =>{
      event.preventDefault();
      const text = event.target.task.value;
      console.log(text)
     const postdata = {email: user.email, task: text}

     fetch("http://localhost:5000/task",{
              method: "POST",
              headers: {
               'content-type' : 'application/json'
              },
              body: JSON.stringify(postdata)
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                if (result.acknowledged) {
                  toast.success('task added')
                  navigate('/my-task')
                }
              });
   }
   return (
      <div className='flex flex-col md:flex-row md:justify-between md:items-center md:mt-44'>
         <div className='md:w-1/2 p-10'>
         <h1 className='text-4xl mb-3 font-bold '>Todos brings all your tasks, teammates, and tools together</h1>
         <p className='text-lg text-gray-500 mb-6'>Keep everything in the same place—even if your team isn’t.</p>
         <form onSubmit={handleSubmit}>
         <input type='text' name='task' placeholder='type your task'></input>
         </form>
         </div>
         <div className='md:w-1/2 p-5 md:pr-10'>
            <img className='w-full shadow-lg rounded-lg' src="https://i.ibb.co/kSCh8rW/072120-To-Do-List-Blog.webp" alt="home" />
         </div>
      </div>
   );
};

export default Home;

