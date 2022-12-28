import React, { useContext } from 'react';
import { AuthContext } from '../Context/UserContext';
import { useQuery } from "@tanstack/react-query";
import SingleCompleted from './SingleCompleted';
const Completed = () => {
   const {user} = useContext(AuthContext)
   
   const {
      data: completedTasks = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["email"],
      queryFn: () =>
        fetch(`http://localhost:5000/completed-task/${user?.email}`).then((res) =>
          res.json()
        ),
    });
   return (
      <div>
         <h1>this is completed route{completedTasks.length}</h1>
         <div className='grid grid-cols-1 md:grid-cols-3'>
         {
            completedTasks.map(tasks => <SingleCompleted key={tasks._id} tasks={tasks} refetch={refetch}></SingleCompleted>)
         }
         </div>
      </div>
   );
};

export default Completed;