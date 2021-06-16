import React,{ useState, useRef} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    // const { signup, currentUser } = useAuth()
    const [ error, setError ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ loading, setLoading ] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            // await login(emailRef.current.value, passwordRef.current.value)
            setMessage("メールを送信しました")
        }catch{
            setError("パスワードのリセットに失敗しました")
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
                    {message && <Alert variant="success">{message}</Alert>}
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
