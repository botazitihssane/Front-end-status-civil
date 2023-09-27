import Index from "views/Index.js";
import Arrondissement from "views/examples/Arrondissement";
import Registere from "views/examples/Registere";
import Officier from "views/examples/Officier";
import Citoyen from "views/examples/Citoyen";
import ViewArrondissement from "views/examples/ViewArrondissement";
import EditArrondissement from "views/examples/EditArrondissement";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/arrondissement",
    name: "Arrondissement",
    icon: "ni ni-building text-blue",
    component: <Arrondissement />,
    layout: "/admin",
  },
  {
    path: "/viewArrondissement",
    name: "Liste des arrondissements",
    icon: "ni ni-badge text-yellow",
    component: <ViewArrondissement />,
    layout: "/admin",
  },
  {
    path: "/editArrondissement",
    name: "Modifier un arrondissements",
    icon: "ni ni-badge text-yellow",
    component: <EditArrondissement />,
    layout: "/admin",
  },
  {
    path: "/registere",
    name: "Registere",
    icon: "ni ni-books text-pink",
    component: <Registere/>,
    layout: "/admin",
  },
  {
    path: "/citoyen",
    name: "Citoyen",
    icon: "ni ni-single-02 text-orange",
    component: <Citoyen />,
    layout: "/admin",
  },
  {
    path: "/officer",
    name: "Officer",
    icon: "ni ni-badge text-yellow",
    component: <Officier />,
    layout: "/admin",
  }
  
];
export default routes;
