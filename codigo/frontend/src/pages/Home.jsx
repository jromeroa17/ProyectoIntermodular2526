import { useState, useEffect } from "react"
import api from "../api"
import Character from "../components/Character"
import "../styles/Home.css"

function Home() {
    const [characters, setCharacters] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        getCharacter();
    }, [])

    const getCharacter = () => {
        api
            .get("/api/character/")
            .then((res) => res.data)
            .then((data) => {setCharacters(data); console.log(data)})
            .catch((err => alert(err)))
    }

    const deleteCharacter = (id) => {
        api.delete(`/api/character/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("Character Deleted")
            }
            else {
                alert("Failed to delete")
            }
            getCharacter()
        }).catch((error) => alert(error))
        
    }

    const createCharacter = (e) => {
        e.preventDefault()
        api.post("/api/character/create/", {name})
            .then((res) => {
                if (res.status === 201) alert("Character created")
                else alert("Failed to make character")
                getCharacter()
            })
            .catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Characters</h2>
            {characters.map((character) => (
                <Character character={character} onDelete={deleteCharacter} key={character.id}/>
            ))}
        </div>
        <h2>Create Character</h2>
        <form onSubmit={(createCharacter)}>
            <label htmlFor="name">Name:</label>
            <br/>
            <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
}

export default Home