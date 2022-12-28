import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Layout/Main';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AddTask from './Components/AddTask';
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/add-task',
        element: <AddTask></AddTask>
      },
    ]
  }
])

function App() {
  return (
    <div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "black",
            background: "gray",
          },
        }}
      ></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
