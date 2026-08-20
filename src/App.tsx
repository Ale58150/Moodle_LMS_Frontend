import { RouterProvider } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/router";
import { ErrorBoundary } from "@/components/common/app/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="overflow-auto">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  )
}

export default App