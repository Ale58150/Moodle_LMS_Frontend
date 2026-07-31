import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/router";

function App() {
  return (
    <>
      <div className="overflow-auto">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App