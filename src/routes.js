import Index from "views/Index.js";
import ActeDeces from "views/Actes/ActeDeces/AddActeDeces";
import ActeMariage from "views/Actes/ActeMariage/AddActeMariage";
import ActeNaissance from "views/Actes/ActeNaissance/AddActeNaissance";
import Citoyen from "views/Personne/Citoyen/AddCitoyen";
import EditCitoyen from "views/Personne/Citoyen/EditCitoyen";
import ViewCitoyen from "views/Personne/Citoyen/ViewCitoyen";
import Officier from "views/Personne/Officier/AddOfficier";
import EditOfficier from "views/Personne/Officier/EditOfficier";
import ViewOfficier from "views/Personne/Officier/ViewOfficier";
import Annexe from "views/StructureOrganisationnelle/Annexe/AddAnnexe";
import EditAnnexe from "views/StructureOrganisationnelle/Annexe/EditAnnexe";
import ViewAnnexe from "views/StructureOrganisationnelle/Annexe/viewAnnexe";
import Arrondissement from "views/StructureOrganisationnelle/Arrondissement/AddArrondissement";
import EditArrondissement from "views/StructureOrganisationnelle/Arrondissement/EditArrondissement";
import ViewArrondissement from "views/StructureOrganisationnelle/Arrondissement/ViewArrondissement";
import Registere from "views/StructureOrganisationnelle/Registre/AddRegistere";
import EditRegistre from "views/StructureOrganisationnelle/Registre/EditRegistre";
import Viewregistre from "views/StructureOrganisationnelle/Registre/ViewRegistre";
import Login from "views/Login/Login";
import Register from "views/Login/Register";
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
    component: <Registere />,
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
    component: <Viewregistre />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/editRegistre",
    name: "Modifier le registere",
    icon: "ni ni-books text-pink",
    component: <EditRegistre />,
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
    path: "/login",
    name: "Login",
    component: <Login />,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    component: <Register />,
    layout: "/auth",
    hidden: true,
  },
];
export default routes;
