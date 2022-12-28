import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import MySingleTask from './MySingleTask';
import { AuthContext } from '../Context/UserContext';

const MyTask = () => {
   const {user} = useContext(AuthContext)
   
   const {
      data: allTasks = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["email"],
      queryFn: () =>
        fetch(`http://localhost:5000/all-task/${user?.email}`).then((res) =>
          res.json()
        ),
    });
  
   return (
      <div>
         <h2>this is my task route</h2>
        <div className='grid grid-cols-1 md:grid-cols-3'>
        {
            allTasks.map(tasks => <MySingleTask key={tasks._id} tasks={tasks} refetch={refetch}></MySingleTask>)
         }
        </div>
         
      </div>
   );
};

export default MyTask;