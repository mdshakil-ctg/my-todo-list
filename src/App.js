import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Layout/Main';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

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
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
