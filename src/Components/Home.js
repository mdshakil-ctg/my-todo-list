import React from 'react';

const Home = () => {
   const handleSubmit = event =>{
      event.preventDefault();
      const text = event.target.task.value;
      console.log(text)
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