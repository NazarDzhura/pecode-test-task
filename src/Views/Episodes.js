import React, {useState} from 'react'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import PaginationRounded from "../Components/Pagination";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import ComboBox from "../Components/ComboBox";
import axios from "axios";


function Episodes(){
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState(null);
    let content = null
    let url = `https://rickandmortyapi.com/api/episode/?page=${page}
    ${searchValue !== null ? `&name=${searchValue}` : ``}
    `

    let episodes = useAxiosGet(url)

    function createData(num, name, charactersStarred, episode, releaseDate) {
        return { num, name, charactersStarred, episode, releaseDate };
    }

    if(episodes.error){
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                No such episodes were found.
            </div>
        </div>
    }

    if(episodes.loading){
        content = <Loader/>
    }

    const rows = [];
    if(episodes.data) {
        episodes.data.results.map(ep => rows.push(createData(ep.id, ep.name, ep.characters.length, ep.episode, ep.air_date)))
    }

    const allEpisodes = []
    if(episodes.data) {
        for(let i = 1; i <= episodes.data.info.pages; i++) {
            axios.get(`https://rickandmortyapi.com/api/episode/?page=${i}`)
                .then(response => response.data.results.map(element => allEpisodes.push(element.name)))
        }
    }

    if(episodes.data) {
        content = <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" style={{width: 5}}>№</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Characters starred</TableCell>
                        <TableCell align="right">Episode</TableCell>
                        <TableCell align="right">Release date</TableCell>
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
                            <TableCell align="right">{row.charactersStarred}</TableCell>
                            <TableCell align="right">{row.episode}</TableCell>
                            <TableCell align="right">{row.releaseDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    return (
        <div className="container mx-auto pt-6 px-8 rounded shadow-xl"  style={{backgroundColor: "#f6f8fa", minHeight: 800}}>
            <h1 className="font-bold text-2xl mb-3">
                Episodes
            </h1>
            <ComboBox label="Episode name" options={allEpisodes} searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="md:flex flex-wrap md:-mx-3">
                { content }
            </div>
            <PaginationRounded page={page} setPage={setPage} countOfPages={episodes.data ? episodes.data.info.pages : 1}/>
        </div>
    )
}

export default Episodes