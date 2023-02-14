import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MessagePage from "../pages/MessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/message/:id",
    element: <MessagePage />,
  },
]);

export default router;
