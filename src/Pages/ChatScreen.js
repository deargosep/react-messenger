import React from 'react'
import {
    Link,
    useLocation
} from "react-router-dom";
import { auth, db, Timestamp } from '../Firebase';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ChatScreen() {
    const [metaData, setMetaData] = React.useState({})
    const [messages, setMessages] = React.useState([])
    const [text, setText] = React.useState('')
    let query = useQuery();
    let getMetaData = () => {
        db.collection('Chats').doc(query.get('id')).get().then((doc) => {
            setMetaData(doc.data())
        })
    }
    let getMessages = () => {
        db.collection('Chats').doc(query.get('id')).collection('messages')
        .orderBy('at', 'asc')
        .onSnapshot((data) => {
            let newArray = []
            data.docs.forEach((doc) => {
                newArray.push({ id: doc.id, ...doc.data() })
            })
            setMessages(newArray)
        })
    }
    React.useEffect(() => {
        getMetaData()
        getMessages()
    }, [query.get('id')])
    let sendMessage = (event) => {
        event.preventDefault()
        db.collection('Chats').doc(query.get('id')).collection('messages').add({text:text, author: auth.currentUser.displayName ?? auth.currentUser.email, authorId: auth.currentUser.uid, at: Timestamp.now()}).then(()=>{
            setText('')
        })
    }
    return (
        <div style={styles.screen} >
            <Link to="/">Go back</Link>
            <h1 style={styles.header}>{metaData.name}</h1>
            <p >{metaData.description}</p>
            <div style={styles.chatBox}>
                {messages.map(item => <Message key={item.id} item={item} />)}
                <AlwaysScrollToBottom/>
            </div>
            <form onSubmit={sendMessage} style={styles.inputBox}>
                <input value={text} onChange={(event) => setText(event.target.value)} style={styles.input} placeholder="Your text.." />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}


const AlwaysScrollToBottom = () => {
    const elementRef = React.useRef();
    React.useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };


function Message({ item }) {
    let datetime = item.at.toDate()
    return (
        <div style={{ ...styles.message, alignSelf: item.authorId === auth.currentUser.uid ? 'flex-end' : 'start' }}>
            <span style={styles.messageAuthor}>{item.author}</span>
            <p style={styles.messageText}>{item.text}</p>
            <span style={styles.messageAt}>{`${datetime.getHours().toString().length === 1 ? '0' + datetime.getHours().toString():datetime.getHours()}:${datetime.getMinutes().toString().length === 1 ? '0' + datetime.getMinutes().toString():datetime.getMinutes()}`}</span>
        </div>
    )
}

const styles = {
    header: {
        position: 'sticky-top',
        top: 0
    },
    screen: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    inputBox: {
        display: 'flex',
        width: '98%',
        position: 'sticky bottom',
        bottom: 0,
        right: 0,
        left: 0
    },
    input: {
        width: '98%',
    },
    chatBox: {
        display: 'flex',
        padding: 10,
        flexDirection: 'column',
        border: '2px solid black',
        width: '95%',
        overflowY:'scroll'
    },
    message: {
        display: 'flex',
        width: '35%',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        borderRadius: 4,
        border: '1px solid black',
        padding: 4,
        marginTop:10,
        marginBottom:10
    },
    messageAuthor: {
        color: 'rgb(93, 204, 209)'
    },
    messageAt: {
        textAlign: 'right',
        alignSelf: 'flex-end'
    }
}