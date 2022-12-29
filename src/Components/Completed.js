import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/UserContext';
import { useQuery } from "@tanstack/react-query";
import SingleCompleted from './SingleCompleted';
const Completed = () => {
   const {user} = useContext(AuthContext);
   const [completedTasks, setcompletedTasks] = useState([])
   
   // const {
   //    data: completedTasks = [],
   //    isLoading,
   //    refetch,
   //  } = useQuery({
   //    queryKey: ["email"],
   //    queryFn: () =>
   //      fetch(`http://localhost:5000/completed-task/${user?.email}`).then((res) =>
   //        res.json()
   //      ),
   //  });

    useEffect(()=>{
      fetch(`http://localhost:5000/completed-task/${user?.email}`)
      .then(res => res.json())
      .then(data =>setcompletedTasks(data))
    },[user?.email])
   return (
      <div>
         <h1>this is completed route{completedTasks.length}</h1>
         <div className='grid grid-cols-1 md:grid-cols-3'>
         {
            completedTasks.map(tasks => <SingleCompleted key={tasks._id} tasks={tasks} ></SingleCompleted>)
         }
         </div>
      </div>
   );
};

export default Completed;