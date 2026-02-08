import { useState, useEffect } from "react"
import api from "../api"
import Character from "../components/Character"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"


function Home() {
    const [characters, setCharacters] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [name, setName] = useState("")

    const navigate = useNavigate()


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

        if (editingId) {
            api.put(`/api/character/update/${editingId}/`, { name })
                .then((res) => {
                    alert("Character updated")
                    setEditingId(null)
                    setName("")
                    getCharacter()
                })
                .catch((err) => alert(err))
            return
        }


        api.post("/api/character/create/", { name })
            .then((res) => {
                alert("Character created")
                setName("")
                getCharacter()
            })
            .catch((err) => alert(err))
    }

    const startEdit = (character) => {
        setName(character.name)
        setEditingId(character.id)
    }


    return (
    <div className="home-container">       
        <div className="create-character">
            <h2>{editingId ? "Edit Character" : "Create Character"}</h2>
            <form onSubmit={createCharacter}>
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="character"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <input
                    type="submit"
                    value={editingId ? "Update" : "Submit"}
                />
            </form>
        </div>

       <div className="characters-list">
            <h2>Characters</h2>

            <div className="characters-grid">
                {characters.map((character) => (
                    <Character
                        character={character}
                        onDelete={deleteCharacter}
                        onEdit={startEdit}
                        key={character.id}
                    />
                ))}
            </div>
        </div>

    </div>
)

}

export default Home