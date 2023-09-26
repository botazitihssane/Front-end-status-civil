import { useState , useEffect } from "react";
import {DataGrid} from "@mui/x-data-grid";

const ViewArrondissement = () => {
    const [arrondissement,setArrondissement] = useState({
        annexe: 0,
    });
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "nomArrondissement",
            headerName : "Nom d'arrondissement",
            flex: 1,
        },
        {
            field : "ville",
            headerName : "Ville",
            flex: 1,
        },
        {
            field : "pays",
            headerName : "Pays",
            flex: 1,
        },
        {
            field : "codePostal",
            headerName : "Code Postal",
            flex: 1,
        },
        {
            field : "population",
            headerName : "Population",
            flex: 1,
        },
        {
            field : "superficie",
            headerName : "Superficie",
            flex: 1,
        },
        {
            field : "adresse",
            headerName : "Adresse",
            flex: 1,
        },
        {
            field : "quartiers",
            headerName : "Quarties",
            flex: 1,
        },
        {
            field : "annexe",
            headerName : "Annexe",
            flex: 1,
        },
    ];

    const loadArrondissement = () => {
        fetch("http://localhost:8080/api/arrondissement")
        .then((response) => response.json())
        .then((data)=> {
            const arrondissementData = data.map((arrondissement) => {
                const id = arrondissement.annexe.id;
                fetch(`http://localhost:8080/api/annexe/${id}`)
                .then((response)=> response.json())
                .then((annexeData) => { 
                    arrondissement.annexe = annexeData.nom;
                    console.log(arrondissement.annexe.nom);
            })
            .catch((error)=> {
                console.log(error);
            });
            return arrondissement;
        });
        setArrondissement(arrondissementData);
        console.log(arrondissementData);
    })
    .catch((error)=>{
    console.log(error);
    });
    }

    useEffect(()=>{
        loadArrondissement();
    },[]);

    return (
        <DataGrid checkboxSelect rows={arrondissement} columns={columns}/>
    );
};
export default ViewArrondissement;