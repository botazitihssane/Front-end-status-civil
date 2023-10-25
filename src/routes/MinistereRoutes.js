import Officier from "views/Personne/Officier/AddOfficier";
import EditOfficier from "views/Personne/Officier/EditOfficier";
import ViewOfficier from "views/Personne/Officier/ViewOfficier";
var MinistereRoutes = [
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
];
export default MinistereRoutes;
