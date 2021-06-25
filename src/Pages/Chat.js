import {Card, Input} from 'antd';
import {useForm} from 'react-hook-form'
import 'antd/dist/antd.dark.css'
import './Chat.css'
export default function Chat() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {

    }

    return (
        <div className="container">
        <Card title="Chat">
            <div className="auth">
                <h3>Auth</h3><br/>
                <label>Email</label>
                <Input {...register('email')} placeholder="email" type="email"/>
                <label>Password</label>
                <Input {...register('password')} placeholder="password" type="password"/>
                <input type="submit"/>
            </div>
        </Card>
        </div>
    )
}
