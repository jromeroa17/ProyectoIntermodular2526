import { useState, useEffect } from "react"
import api from "../api"
import Character from "../components/Character"
import "../styles/Home.css"

function PanelCompartido() {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        getCharacter()
    }, [])

    const getCharacter = () => {
        api
            .get("/api/character/list-all/")
            .then((res) => setCharacters(res.data))
            .catch((err) => alert(err))
    }

    return (
        <div>
            <h2>Panel Compartido</h2>

            <div className="characters-list">
                <div className="characters-grid">
                    {characters.map((character) => (
                        <Character
                            character={character}
                            key={character.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PanelCompartido
