import { auth } from '../Firebase'
import {useState} from 'react'
import {Form, Input, Button} from 'antd'

function Auth() {
    const authUser = (values)  => {
        auth.signInWithEmailAndPassword(values.email, values.password).catch(err => {
            console.error(err)
        })
    }
        return (
        <div className="auth">
                    <h3>Auth</h3><br />
                    <Form id="auth" onFinish={authUser}>
                        <Form.Item name="email" label="Email">
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
    );
}

function Register() {
    const registerUser = values => {
        auth.createUserWithEmailAndPassword(values.email, values.password).then(user => {
            user.user.updateProfile({
                displayName: values.name,
            })
        }).catch(err => {
            console.error(err)
        })
    }
    return (
        <div className="register">
                    <Form id="register" onFinish={registerUser}>
                        <h3>Register</h3><br/>
                    <Form.Item name="email" label="Email">
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
    )
}

function Forms () {
    const [haveAccount, setHAccount] = useState(false)
    return <div className="forms">
        {haveAccount ? <div><Auth/><Button onClick={() => setHAccount(false)}>Don't have account? Register a new account.</Button></div>:<div><Register/><Button onClick={() => setHAccount(true)}>Have account? Log in.</Button></div>}
    </div>
}

function LogOut() {
    return <Button onClick={() => auth.signOut()}>Log out</Button>
}

export {Auth, Register, Forms, LogOut}