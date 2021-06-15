import React,{ useState, useRef} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    // const { signup, currentUser } = useAuth()
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("パスワードが一致しません")
        }

        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        }catch{
            setError("アカウントが作れませんでした")
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
                        <Form.Group id="password-confirm">
                            <Form.Label>パスワード（確認用）</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">登録する</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                アカウントをお持ちですか？ログイン
            </div>
            
        </>
    )
}
