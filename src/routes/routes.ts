//import Loading from "modules/Loading/Loading";
import { lazy, LazyExoticComponent } from "react";

type JSXComponent = () => JSX.Element;

interface Route {
    to: string;
    path: string;
    name: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
}

const DashboardPage = lazy(() => import(/* webpackChunkName: "Contact" */ '../modules/Dashboard/Dashboard'));
const Contact = lazy(() => import(/* webpackChunkName: "Contact" */ '../modules/Contact/Contact'));


export const routes: Route[] = [
    {
        to: '/',
        path: '/',
        name: 'Dashboard',
        Component: DashboardPage,
    },
    {
        to: '/contact',
        path: '/contact',
        name: 'contact',
        Component: Contact,
    }
];