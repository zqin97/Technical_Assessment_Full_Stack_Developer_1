import { StrictMode } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";

import { routeTree } from "./routeTree.gen";
import NotFoundScreen from "./components/not-found-screen";
import { store } from "./store";

const router = createRouter({
  routeTree,
  notFoundMode: "root",
  defaultNotFoundComponent: NotFoundScreen,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}
