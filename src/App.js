import React from 'react';
import { auth } from './Firebase.js';
import AuthScreen from './Pages/AuthScreen.js';
import HomeScreen from './Pages/HomeScreen'
import ChatScreen from './Pages/ChatScreen.js';
import { RecoilRoot, useRecoilState } from 'recoil';
import { user_state } from './user.js';
import { useAuthState } from 'react-firebase-hooks/auth';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateScreen from './Pages/CreateScreen.js';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
function Wrapper() {
  return <RecoilRoot>
    <App />
  </RecoilRoot>
}

function App() {
  // const [userState, setUserState] = useRecoilState(user_state)
  const [user,loading,error] = useAuthState(auth)
  if (loading) return <Spin/>
  return (
    <div style={styles.app} className="App">
      <Router>
          <Switch>
          <Route path="/room/create">
              <CreateScreen/>
            </Route>
            <Route path="/room">
              <ChatScreen/>
            </Route>
            <Route path="/">
              {user ? <HomeScreen /> : <AuthScreen />}
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

const styles = {
  app: {
    padding:16,
  }
}

export default Wrapper;
