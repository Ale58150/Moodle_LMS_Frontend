import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/router";
import { ErrorBoundary } from "@/components/common/app/ErrorBoundary";
import { GlobalLoadingBar } from "@/components/common/app/GlobalLoadingBar";

function App() {
  return (
    <ErrorBoundary>
      <div className="overflow-auto">
        <GlobalLoadingBar />
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
}

export default App