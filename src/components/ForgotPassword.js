import React,{ useState, useRef} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
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
            // await login(emailRef.current.value, passwordRef.current.value)
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
                    <h2 className="text-center mb-4">パスワードをリセット</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">パスワードをリセット</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">ログインページに戻る</Link>
                    </div>

                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                アカウントをお持ちでないかたは<Link to="/signup">こちら</Link>
            </div>
            
        </>
    )
}
