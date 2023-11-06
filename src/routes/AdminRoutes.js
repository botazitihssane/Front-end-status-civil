import Index from "views/Index.js";

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
import Icons from "views/Charts/Icons2";
import AddRegion from "views/StructureOrganisationnelle/Region/AddRegion";
import EditRegion from "views/StructureOrganisationnelle/Region/EditRegion";
import ViewRegion from "views/StructureOrganisationnelle/Region/viewRegion";
import AddPrefecture from "views/StructureOrganisationnelle/Prefecture/AddPrefecture";
import EditPrefecture from "views/StructureOrganisationnelle/Prefecture/EditPrefecture";
import ViewPrefecture from "views/StructureOrganisationnelle/Prefecture/viewPrefecture";
import HistoriqueActeDeces from "views/Actes/ActeDeces/HistoriqueActeDeces";
import HistoriqueActeNaissance from "views/Actes/ActeNaissance/HistoriqueActeNaissance";
import OfficierInfo from "views/Utilisateurs/officiers";
import AgentInfo from "views/Utilisateurs/agent";
var routes = [
  {
    path: "/index",
    name: "Tableau de bord",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/region",
    name: "Region",
    icon: "ni ni-map-big text-yellow",
    component: <AddRegion />,
    layout: "/admin",
  },
  {
    path: "/prefecture",
    name: "Prefecture",
    icon: "ni ni-istanbul text-gray",
    component: <AddPrefecture />,
    layout: "/admin",
  },
  {
    path: "/arrondissement",
    name: "Arrondissement",
    icon: "ni ni-building text-green",
    component: <Arrondissement />,
    layout: "/admin",
  },
  {
    path: "/annexe",
    name: "Annexe",
    icon: "ni ni-square-pin text-orange",
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
    path: "/viewArrondissement",
    name: "Liste des arrondissements",
    icon: "ni ni-building text-blue",
    component: <ViewArrondissement />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/viewPrefecture",
    name: "Liste des prefectures",
    icon: "ni ni-building text-blue",
    component: <ViewPrefecture />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/editArrondissement",
    name: "Modifier un arrondissement",
    icon: "ni ni-building text-blue",
    component: <EditArrondissement />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/editRegion",
    name: "Modifier une region",
    icon: "ni ni-building text-blue",
    component: <EditRegion />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/editPrefecture",
    name: "Modifier une prefecture",
    icon: "ni ni-building text-blue",
    component: <EditPrefecture />,
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
    path: "/viewRegions",
    name: "Liste des regions",
    icon: "ni ni-building text-blue",
    component: <ViewRegion />,
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
    path: "/editRegion",
    name: "Modifier la region",
    icon: "ni ni-building text-blue",
    component: <EditRegion />,
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
  {
    path: "/historiqueActeDeces",
    name: "Historique Acte Deces",
    icon: "ni ni-building text-blue",
    component: <HistoriqueActeDeces />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/historiqueActeNaissance",
    name: "Historique Acte Naissance",
    icon: "ni ni-building text-blue",
    component: <HistoriqueActeNaissance />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/officiers",
    name: "Officier Info",
    icon: "ni ni-building text-blue",
    component: <OfficierInfo />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/agents",
    name: "Agent Info",
    icon: "ni ni-building text-blue",
    component: <AgentInfo />,
    layout: "/admin",
    hidden: true,
  },
];
export default routes;
