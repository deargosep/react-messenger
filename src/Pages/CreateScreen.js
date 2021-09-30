import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../Firebase'


export default function CreateScreen() {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    let history = useHistory();
    let createRoom = (event) => {
        event.preventDefault();
        db.collection('Chats').add({
            name: name,
            description: description
        }).then((doc)=>{
            history.push(`/room?id=${doc.id}`)
        })
    }
    return (
        <div>
            <Link to="/">Go back</Link>
            <h1>Create room</h1>
            <form onSubmit={createRoom} style={styles.form}>
                <input value={name} onChange={(text) => setName(text.target.value)} size={10} placeholder="Title" />
                <textarea value={description} onChange={(text) => setDescription(text.target.value)} rows={10} size={10} placeholder="Description" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
}