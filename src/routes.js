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
import Viewregistre from "views/examples/ViewRegistre";
import EditRegistre from "views/examples/EditRegistre";
import ViewCitoyen from "views/examples/ViewCitoyen";
import EditCitoyen from "views/examples/EditCitoyen";
import ActeNaissance from "views/examples/ActeNaissance";
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
    icon: "ni ni-istanbul text-gray",
    component: <Arrondissement />,
    layout: "/admin",
  },
  {
    path: "/annexe",
    name: "Annexe",
    icon: "ni ni-building text-blue",
    component: <Annexe />,
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
    path: "/officer",
    name: "Officer",
    icon: "ni ni-badge text-yellow",
    component: <Officier />,
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
    path: "/viewArrondissement",
    name: "Liste des arrondissements",
    icon: "ni ni-building text-blue",
    component: <ViewArrondissement />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/editArrondissement",
    name: "Modifier un arrondissements",
    icon: "ni ni-building text-blue",
    component: <EditArrondissement />,
    layout: "/admin",
    hidden: true, 
  },
 
  {
    path: "/viewRegistre",
    name: "Liste des Registeres",
    icon: "ni ni-books text-pink",
    component: <Viewregistre/>,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/editRegistre",
    name: "Modifier le registere",
    icon: "ni ni-books text-pink",
    component: <EditRegistre/>,
    layout: "/admin",
    hidden: true, 
  },
  
  {
    path: "/viewCitoyens",
    name: "Liste des citoyens",
    icon: "ni ni-single-02 text-orange",
    component: <ViewCitoyen />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/editCitoyen",
    name: "Modifier un citoyen",
    icon: "ni ni-single-02 text-orange",
    component: <EditCitoyen />,
    layout: "/admin",
    hidden: true, 
  },
  
  {
    path: "/viewOfficier",
    name: "Liste des officiers",
    icon: "ni ni-badge text-yellow",
    component: <ViewOfficier />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/editOfficier",
    name: "Modifier un officier",
    icon: "ni ni-badge text-yellow",
    component: <EditOfficier />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/viewAnnexes",
    name: "Liste des annexes",
    icon: "ni ni-building text-blue",
    component: <ViewAnnexe />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/editAnnexe",
    name: "Modifier l'annexe",
    icon: "ni ni-building text-blue",
    component: <EditAnnexe />,
    layout: "/admin",
    hidden: true, 
  },
  {
    path: "/acteNaissance",
    name: "Acte Naissance",
    component: <ActeNaissance />,
    layout: "/admin",
    hidden: true, 
  },
  
];
export default routes;
