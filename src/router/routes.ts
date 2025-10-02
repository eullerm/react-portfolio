import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFound,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/react-portfolio",
  component: Home,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([homeRoute, notFoundRoute]);

export const router = createRouter({
  routeTree,
});
