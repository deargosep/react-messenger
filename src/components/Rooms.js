import { chatsCollection } from '../Firebase'
import { useState, useEffect } from 'react'
import { List } from 'antd'
export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    useEffect(async () => {
        setRooms([]);
        const snapshot = await chatsCollection.get()
        snapshot.docs.map(doc => { setRooms(rooms => [...rooms, doc.data()]); console.log(doc.data(), rooms) });
    }, [])
    return <List title="Rooms" dataSource={rooms} renderItem={(room, index) => (
        <List.Item title={room.name} key={index} />
    )}></List>
}