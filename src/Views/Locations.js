import React, {useState} from 'react'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import PaginationRounded from "../Components/Pagination";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import ComboBox from "../Components/ComboBox";
import axios from "axios";


function Locations(){
    const [page, setPage] = useState(1);
    const [nameSearchValue, setNameSearchValue] = useState(null);
    const [typeSearchValue, setTypeSearchValue] = useState(null);
    const [dimensionSearchValue, setDimensionSearchValue] = useState(null);
    let content = null
    let url = `https://rickandmortyapi.com/api/location/?page=${page}
    ${nameSearchValue !== null ? `&name=${nameSearchValue}` : ``}
    ${typeSearchValue !== null ? `&type=${typeSearchValue}` : ``}
    ${dimensionSearchValue !== null ? `&dimension=${dimensionSearchValue}` : ``}
    `

    let locations = useAxiosGet(url)

    function createData(num, name, type, dimension, residents) {
        return { num, name, type, dimension, residents };
    }

    if(locations.error){
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                No such locations were found.
            </div>
        </div>
    }

    if(locations.loading){
        content = <Loader/>
    }

    const rows = [];
    if(locations.data) {
        locations.data.results.map(location => rows.push(createData(location.id, location.name, location.type, location.dimension, location.residents.length)))
    }

    const allLocations = []
    if(locations.data) {
        for(let i = 1; i <= locations.data.info.pages; i++) {
            axios.get(`https://rickandmortyapi.com/api/location/?page=${i}`)
                .then(response => response.data.results.map(element => allLocations.push(element.name)))
        }
    }

    const allLocationTypes = []
    if(locations.data) {
        for(let i = 1; i <= locations.data.info.pages; i++) {
            axios.get(`https://rickandmortyapi.com/api/location/?page=${i}`)
                .then(response => response.data.results
                    .map(element => allLocationTypes.indexOf(element.type) === -1 ? allLocationTypes.push(element.type) : null))
        }
        console.log(allLocationTypes)
    }

    const allLocationDimensions = []
    if(locations.data) {
        for(let i = 1; i <= locations.data.info.pages; i++) {
            axios.get(`https://rickandmortyapi.com/api/location/?page=${i}`)
                .then(response => response.data.results
                    .map(element => allLocationDimensions.indexOf(element.dimension) === -1 ? allLocationDimensions.push(element.dimension) : null))
        }
        console.log(allLocationTypes)
    }

    if(locations.data) {
        content = <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" style={{width: 5}}>№</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Dimension</TableCell>
                        <TableCell align="right">Number of residents</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, id) => (
                        <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.num}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.dimension}</TableCell>
                            <TableCell align="right">{row.residents}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    return (
        <div className="container mx-auto pt-6 px-8 rounded shadow-xl"  style={{backgroundColor: "#f6f8fa", minHeight: 800}}>
            <h1 className="font-bold text-2xl mb-3">
                Locations
            </h1>
            <div className="flex">
                <ComboBox label="Location name" options={allLocations} searchValue={nameSearchValue} setSearchValue={setNameSearchValue}/>
                <ComboBox label="Location type" options={allLocationTypes} searchValue={typeSearchValue} setSearchValue={setTypeSearchValue}/>
                <ComboBox label="Location dimension" options={allLocationDimensions} searchValue={dimensionSearchValue} setSearchValue={setDimensionSearchValue}/>
            </div>
            <div className="md:flex flex-wrap md:-mx-3">
                { content }
            </div>
            <PaginationRounded page={page} setPage={setPage} countOfPages={locations.data ? locations.data.info.pages : 1}/>
        </div>
    )
}

export default Locations