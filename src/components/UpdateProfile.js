import React,{ useState, useRef} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    // const { signup, currentUser } = useAuth()
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("パスワードが一致しません")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError("アカウントを更新できませんでした")
        }).finally(() => {
            setLoading("false")
        })
    }

    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">プロフィール更新</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValu={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>パスワード</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="変更しない場合は入力不要" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>パスワード（確認用）</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="変更しない場合は入力不要"  />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">更新する</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">プロフィールに戻る</Link>
            </div>
            
        </>
    )
}
