import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../Redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        setError('')
        if(!email || !password) {
            setError('Please Fill All Details')
            return;
        }
        let data ={
            email:email,
            password:password
        }
        dispatch(login(data)).then((res) => {
            if(res.payload.status != 200) {
                setError(res.payload.data)
            } else {
                localStorage.setItem('user',JSON.stringify(res.payload.data.others));
                if(res.payload && res.payload.data && res.payload.data.others.isAdmin) {
                    navigate('/users')
                } else {
                    navigate('/')
                }
            }
        })
    }
    return (
        <div className="login-component">
            <div className='login-form'>
                <h1 className='login-title'>Login</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '40ch' }, display: 'flex', flexDirection: 'column'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} required />
                    <TextField id="outlined-basic"type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} required />
                    {error && <span className='error'>*{error}</span>}
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </Box>
            </div>
        </div>
    )
}

export default Login
