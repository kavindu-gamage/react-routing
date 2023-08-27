import { useEffect, useState } from "react";
import { Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createUser, getUserById, getUsers } from "../Services/UserService";



const User = () => {
    const [users, setUsers] = useState(null); //define the state function, SetUsers-variable of changing state
    const [userDetail, setUserDetail] = useState(null);
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const userRequest = async () => {
        const res = await getUsers() //get users async function at userService.js
        await setUsers(res);
    }

    useEffect(() => {   //we have to load the userRequest when page opens. that why we used useEffect here
        userRequest();

    }, []);

    const getUserDetails = async (id) => {
        const res = await getUserById(id);
        setUserDetail(res);
    }
    //fetching users and set it of user function
    const handleSubmit= async (event) => {
        event.preventDefault();//form will not submitting when clicking save user
    

        //validate(check is these things correct)
        const data = {
            'username': username,
            'password': password,
            'email': email,
        }

        const res = await createUser(data);
        console.log(res);

        if(res){
            setUserName(null);
            setPassword(null);
            setEmail(null)

            userRequest();
        }
    }
    return (
        <div>
            <Row>
                <Col lg={6}>
                    <ListGroup>
                        {users && users.map((user) => { //if user state is set and map user details one by one
                            return (
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={6}>
                                            {user.username}
                                        </Col>
                                        <Col lg={6} className="text-end">
                                            <Button variant="primary" className="ms-auto" onClick={() => {
                                                getUserDetails(user.id)
                                            }}>show</Button>
                                        </Col>
                                    </Row>

                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>

                </Col>
                <Col lg={6}>

                    <div>
                        <h3>User Details</h3>
                        {userDetail &&
                            <div>
                                <div>Username:{userDetail.username}</div>
                                <div>Email:{userDetail.email}</div>
                            </div>

                        }
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" value={username} onChange = { (event) => {
                                setUserName(event.target.value);

                            }} placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(event) => {
                                setPassword(event.target.value);
                            }} placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event)=>{
                                setEmail(event.target.value);
                            }} placeholder ="Enter E-mail" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save User
                        </Button>
                    </Form>
                </Col>
            </Row>


        </div>

    )
}

export default User;


/*
*
*/