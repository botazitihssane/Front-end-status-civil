import ActeDeces from "views/Actes/ActeDeces/AddActeDeces";
import ViewActeDeces from "views/Actes/ActeDeces/ViewActeDeces";
import ActeNaissance from "views/Actes/ActeNaissance/AddActeNaissance";
import ViewActeNaissance from "views/Actes/ActeNaissance/ViewActeNaissance";
import IndexAgent from "views/IndexAgent";

import Citoyen from "views/Personne/Citoyen/AddCitoyen";
import EditCitoyen from "views/Personne/Citoyen/EditCitoyen";
import ViewCitoyen from "views/Personne/Citoyen/ViewCitoyen";

var agentRoutes = [
  {
    path: "/index",
    name: "Acceuil",
    icon: "ni ni-tv-2 text-primary",
    component: <IndexAgent />,
    layout: "/agent",
  },
  {
    path: "/acteNaissance",
    name: "Acte Naissance",
    component: <ActeNaissance />,
    layout: "/agent",
    hidden: true,
  },
  {
    path: "/acteDeces",
    name: "Acte Deces",
    component: <ActeDeces />,
    layout: "/agent",
    hidden: true,
  },
  {
    path: "/ListeActeNaissance",
    name: "View Acte Naissance",
    component: <ViewActeNaissance />,
    layout: "/agent",
    hidden: true,
  },
  {
    path: "/ListeActeDeces",
    name: "View Acte Deces",
    component: <ViewActeDeces />,
    layout: "/agent",
    hidden: true,
  },
  {
    path: "/citoyen",
    name: "Citoyen",
    icon: "ni ni-single-02 text-red",
    component: <Citoyen />,
    layout: "/agent",
  },

  {
    path: "/viewCitoyens",
    name: "Liste des citoyens",
    icon: "ni ni-single-02 text-orange",
    component: <ViewCitoyen />,
    layout: "/agent",
    hidden: true,
  },
  {
    path: "/editCitoyen",
    name: "Modifier un citoyen",
    icon: "ni ni-single-02 text-orange",
    component: <EditCitoyen />,
    layout: "/agent",
    hidden: true,
  },
];

export default agentRoutes;
