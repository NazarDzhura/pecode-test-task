import React from 'react'
import {Link} from 'react-router-dom'
import CharacterPopup from "./CharacterPopup";

function CharacterCard(props){
    return (<div className="border m-1 bg-gray-300 hover:bg-gray-400 shadow hover:shadow-2xl mb-4 rounded overflow-hidden" style={{maxWidth: 300}}>
                <div
                    style={{
                        'backgroundImage': `url('${props.character.image}')`,
                        width: 300,
                        height: 300
                    }}
                    className="w-full h-64 bg-blue bg-cover"
                >
                </div>
                <div className="p-3">
                    <h3 className="font-bold text-xl mb-3">
                        {props.character.name.length > 25 ?
                            `${props.character.name.substring(0, 25)}...` : props.character.name
                        }
                    </h3>
                    <div className="font-bold mb-3">
                        Species: {props.character.species}
                    </div>
                    <div className="font-bold mb-3">
                        Status: {props.character.status}
                    </div>
                    <div className="font-bold mb-3">
                        Gender: {props.character.gender}
                    </div>
                    <Link
                        to={`/characters/${props.character.id}`}
                    >
                        <CharacterPopup character={props.character}/>
                    </Link>
                </div>
            </div>

    )
}

export default CharacterCard;