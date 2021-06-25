import { Card } from 'antd';
import { useEffect, useState } from 'react';
import {auth, chatsCollection } from '../Firebase'
import Rooms from '../components/Rooms'
import { Auth, Register, Forms, LogOut } from '../components/AuthForm';
import 'antd/dist/antd.dark.css'
import './Chat.css'
export default function Chat() {
    const [user, setUser] = useState({is: false, uid: null, name: null, email: null});
    useEffect(() => {
        auth.onAuthStateChanged(user => {
        if (user) {
            setUser({is: true, uid: user.uid, name: user.displayName, email: user.email})
        } else {
            setUser({is: false, uid: null, name: null, email: null})
        }
      });
    }, [])
    return (
        <div className="container">
            <h1>{user.is ? <span>Hello, {user.name}!</span> : <span>Welcome!</span>}</h1>
            <Card title="Chat">
                {user.is ? <div className="logged"><Rooms /><LogOut/></div> : <Forms/>}
            </Card>
        </div>
    )
}
