import React,{ useState, useRef} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    // const { signup, currentUser } = useAuth()
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }catch{
            setError("ログインに失敗しました")
        }

        setLoading(false)

    }

    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">ログイン</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>パスワード</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">ログインする</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                アカウントをお持ちでないかたは<Link to="/signup">こちら</Link>
            </div>
            
        </>
    )
}
