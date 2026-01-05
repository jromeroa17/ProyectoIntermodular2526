import React from "react";
import "../styles/Character.css"

function Character({character, onDelete}) {
    const formattedDate = new Date(character.created_at).toLocaleDateString("en-US")

    return <div className="note-container">
        <p className="note-title">{character.name}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(character.id)}>
            Delete
        </button>
    </div>
}

export default Character