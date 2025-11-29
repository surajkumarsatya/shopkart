import './App.css'
import AppRoute from './components/routes/AppRoute'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppRoute />,
      children: [
        {
          path: "/",
          element: <Home />
        }
      ]
    }

  ])
  
   return <RouterProvider router={router} />;
}

export default App
