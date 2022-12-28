import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';

const Register = () => {
   const {createUser, setUser, loginWithGoogle} = useContext(AuthContext)
   const navigate = useNavigate();
   const location = useLocation();
   const from = location?.state?.from?.pathname || '/';

   const handleRegister = (event) =>{

      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password)

      createUser(email, password)
      .then(result =>{
         const user = result.user;
         console.log(user.email)
         saveUserData(user.email);
         navigate('/');
      })
      .catch(err=>console.log(err))


   }

   const googleSignIn = () =>{
      loginWithGoogle()
      .then(result => {
        saveUserData(result.user.email)
        navigate(from, {replace: true})
      })
      .catch(err => console.log(err))
    }  

    const saveUserData = (email) => {
      const user = {email};
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.acknowledged){
            toast('User Sign Up Succesfully')
          }
          
        })
        .catch((err) => console.log(err));
    };
  

   return (
      <form onSubmit={handleRegister}>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register Your email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
      </div>
      <div class="flex items-start mb-6">
        
        <Link to='/login' for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already Register? Login now</Link>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      <button onClick={googleSignIn} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">Google Login</button>
      
    </form>
   );
};

export default Register;