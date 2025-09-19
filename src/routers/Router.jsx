import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";
import FestivalShow from "../components/festivals/FestivalShow.jsx";
import StayList from "../components/stay/StayList.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/festivals',
        element: <FestivalList />
      },
      {
                        // segment parameter `:key`, path부분에 지정
        path: 'festivals/:id',
        element: <FestivalShow />
      },
      {
        path: '/stay',
        element: <StayList />
      },
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;