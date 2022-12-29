import React, { useContext } from 'react';
import { AuthContext } from './../Context/UserContext';
import { toast } from 'react-hot-toast';

const Home = () => {
   const {user} = useContext(AuthContext)
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
                }
              });
   }
   return (
      <div className='bg-rose-100 h-screen'>
         <h1>Todos brings all your tasks, teammates, and tools together</h1>
         <p>Keep everything in the same place—even if your team isn’t.</p>
         <form onSubmit={handleSubmit}>
         <input type='text' name='task'></input>
         </form>
      </div>
   );
};

export default Home;