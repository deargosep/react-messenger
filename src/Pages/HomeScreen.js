import React from 'react'
import { Link,  } from 'react-router-dom'
import { auth, db } from '../Firebase'
import { useHistory } from 'react-router'
import {List} from 'antd'
export default function HomeScreen() {
    // eslint-disable-next-line
    const [user, setUser] = React.useState(false)
    const history = useHistory()
    return (
        <div>
            <h1>Rooms</h1>
            <RoomList />
            <div>
                <button style={{ alignSelf: 'end' }} onClick={() => {
                    auth.signOut().then(() => {
                        setUser(null)
                        history.replace('/')
                    })
                }}>Logout</button>
                <Link style={{ fontSize: 12, marginLeft: 5 }} to="/room/create">Create new</Link>
            </div>
        </div>
    )
}


function RoomList() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    let getData = () => {
        setLoading(true)
        db.collection('Chats').get().then((docs) => {
            let newArray = []
            docs.docs.forEach((el) => {
                newArray.push({ id: el.id, ...el.data(), })
            })
            setData(newArray)
            setLoading(false)
        })
    }
    React.useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <List bordered loading={loading} dataSource={data} renderItem={(item)=> <RoomItem key={item.id} item={item}/>}/>
            {/* // {data.map((item) => <RoomItem key={item.id} item={item} />)} */}
        </div>
    )
}

function RoomItem({ item }) {
    const history = useHistory()
    if (item.name === '' && item.description === '') return null
    return (
        <List.Item onClick={()=>history.push(`/room/?id=${item.id}`)} style={styles.room}>
            <List.Item.Meta description={item.description} title={item.name} />
        </List.Item>
    )
}

const styles = {
    room: {
        cursor: 'pointer',
    }
}