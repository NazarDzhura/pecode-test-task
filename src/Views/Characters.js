import React, {useState} from 'react'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import DropSelector from "../Components/DropSelector";
import CharacterCard from "../Components/CharacterCard";
import PaginationRounded from "../Components/Pagination";


function Characters(){
    const [status, setStatus] = useState('any');
    const [species, setSpecies] = useState('any');
    const [gender, setGender] = useState('any');
    const [page, setPage] = useState(1);
    let content = null
    let url = `
    https://rickandmortyapi.com/api/character/?page=${page}
    ${status !== "any" ? `&status=${status}` : ``}
    ${species !== "any" ? `&species=${species}` : ``}
    ${gender !== "any" ? `&gender=${gender}` : ``}
    `

    let characters = useAxiosGet(url)

    if(characters.error){
        content = <div>
            <div className="bg-blue-300 mb-2 p-3 rounded">
                No such characters were found.
            </div>
        </div>
    }

    if(characters.loading){
        content = <Loader/>
    }

    if(characters.data) {
        content = characters.data.results.map((character, id) =>
            <CharacterCard key={id} character={character} />
        )
    }

    return (
        <div className="container mx-auto pt-6 px-8 rounded shadow-xl"  style={{backgroundColor: "#f6f8fa", minHeight: 800}}>
            <h1 className="font-bold text-2xl mb-3">
                Characters
            </h1>
            <DropSelector select={status} setSelect={setStatus} label="Status" options={["Any", "Alive", "Dead", "Unknown"]} values={["any", "alive", "dead", "unknown"]}/>
            <DropSelector select={species} setSelect={setSpecies} label="Species" options={["Any", "Human", "Humanoid", "Alien", "Animal", "Robot", "Mythological Creature"]} values={["any", "human", "humanoid", "alien", "animal", "robot", "mythological"]}/>
            <DropSelector select={gender} setSelect={setGender} label="Gender" options={["Any", "Male", "Female", "Genderless", "Unknown"]} values={["any", "male", "female", "genderless", "unknown"]}/>
            <div className="md:flex flex-wrap md:-mx-3">
                { content }
            </div>
            <PaginationRounded page={page} setPage={setPage} countOfPages={characters.data ? characters.data.info.pages : 1}/>
        </div>
    )
}

export default Characters