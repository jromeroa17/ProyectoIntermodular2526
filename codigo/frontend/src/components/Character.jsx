import React from "react";
import "../styles/Character.css"

function Character({ character, onDelete, onEdit }) {
    const formattedDate = new Date(character.created_at).toLocaleDateString("en-US")

    return <div className="note-container">
                <p className="note-title">{character.name}</p>
                <p className="note-date">{formattedDate}</p>

                <div className="note-actions">
                    <button
                        className="edit-button"
                        onClick={() => onEdit(character)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => onDelete(character.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

}

export default Character