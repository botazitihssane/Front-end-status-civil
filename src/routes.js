import Index from "views/Index.js";
import Arrondissement from "views/examples/Arrondissement";
import Registere from "views/examples/Registere";
import Officier from "views/examples/Officier";
import Citoyen from "views/examples/Citoyen";
import ViewArrondissement from "views/examples/ViewArrondissement";
import EditArrondissement from "views/examples/EditArrondissement";
import ViewOfficier from "views/examples/ViewOfficier";
import EditOfficier from "views/examples/EditOfficier";
import Annexe from "views/examples/Annexe";
import ViewAnnexe from "views/examples/viewAnnexe";
import EditAnnexe from "views/examples/EditAnnexe";
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
  },
  {
    path: "/viewOfficier",
    name: "Liste des officiers",
    icon: "ni ni-badge text-yellow",
    component: <ViewOfficier />,
    layout: "/admin",
  },
  {
    path: "/editOfficier",
    name: "Modifier un officier",
    icon: "ni ni-badge text-yellow",
    component: <EditOfficier />,
    layout: "/admin",
  },
  {
    path: "/annexe",
    name: "Annexe",
    icon: "ni ni-badge text-yellow",
    component: <Annexe />,
    layout: "/admin",
  },
  {
    path: "/viewAnnexes",
    name: "Liste des annexes",
    icon: "ni ni-badge text-yellow",
    component: <ViewAnnexe />,
    layout: "/admin",
  },
  {
    path: "/editAnnexe",
    name: "Modifier l'annexe",
    icon: "ni ni-badge text-yellow",
    component: <EditAnnexe />,
    layout: "/admin",
  },
  
];
export default routes;
