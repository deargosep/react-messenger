import { chatsCollection } from '../Firebase'
import { useState, useEffect } from 'react'
import { List, Button } from 'antd'
export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        setRooms([]);
        chatsCollection.get().then(snapshot => {
            snapshot.docs.map(doc => 
                setRooms(rooms => [...rooms, doc.data()])
            );
        })
    }, [])

    const [room, setRoom] = useState(null)
    console.log(room)
    return <List title="Rooms" dataSource={rooms} renderItem={(room, index) => (
        <List.Item actions={[<Button onClick={setRoom(index)}>Go to</Button>]} key={index}>
            <List.Item.Meta title={room.name} description={room.description}/>
        </List.Item>
    )}></List>
}