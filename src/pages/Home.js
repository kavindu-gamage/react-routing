import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, FormLabel, Modal, Row, Table } from "react-bootstrap";
import { getItems } from "../Services/ItemService";
import { createOrder } from "../Services/orderService";
import { getUsers } from "../Services/UserService";

const Home = () => {
    const [items, setItems] = useState(null);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(null);
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState(null);
    const [status, setStatus] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        //Stpe 01- showing the items fetch from the backend, fetching the items from calling item service
        const fetchItems = async () => {
            const response = await getItems();
            setItems(response); //if response comes from back end then it set for the setItems
        }

        
        const fetchUsers = async () => {
            const response= await getUsers();
            setUsers(response);
        }
        fetchItems();
        fetchUsers();

    }, []);

    const handleOrder = ((item) => {
        const updateOrder = [...order, item]//spread operator.. order array spread through this function, step-03when clicking the add order, adding relevant items

        const updateTotal = total + item.price;
        setOrder(updateOrder);  //updating the order with new added items
        setTotal(updateTotal);  // updating total value here
    });

    const handleUser = ((event) => {
        setSelectedUser(event.target.value);
    });

    const handleStatus= ((event) =>{
        setStatus(event.target.value);
    })

    const handleSubmit = async (event) =>{
        event.preventDefault();//by default submit is prevent at here

        const data ={
            //read the data which have to submit as a JSON file
            status: status,
            user: {
                id:selectedUser
            },
            items: order
        }
        const response= await createOrder(data); //call for create order function at here
        console.log(response);
        if(response){
            handleClose();
            setOrder([]);
        }
    };

    
    return (
        <div>
            <h1>Items</h1>
            <Row>
                {items && items.map(item => { // step 02-checking item list is updated or not? if items update then map item one by one in a table
                    return (
                        <Col>
                            <div className="item">
                                <h3>{item.name}</h3>
                                <h4>Rs. {item.price}</h4>
                                <Button variant="primary" size="sm" onClick={() => { //button for add order, when clicking button it calls for handle order
                                    handleOrder(item)
                                }} >Add to order</Button>
                            </div>

                        </Col>

                    )
                })}
            </Row>
            <h1 className="mt-4">Current Order</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item</th>
                        <th>Item Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order && order.map((item) => {// step 04-waiting for until order get set
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className="text-end">{item.price}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <th colSpan={2}>Total</th>
                        <th className="text-end">{total}</th>
                    </tr>
                </tbody>
            </Table>
            <div className="text-end">
                <Button variant="primary" onClick={handleShow} >Complete Order</Button> 
                {/* step 05-set show status to true  */}
            </div>
            <Modal show={show} onHide={handleClose}>
                {/* step06-If show is true then model is show */}
                <Modal.Header closeButton>
                    <Modal.Title>Complete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please select the user who is creating this order, set the order status and click on complete.</Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <FormLabel>Select User</FormLabel>
                        <Form.Select onChange={handleUser}>
                            <option value="">Please Select a User</option>
                            {users && users.map(user => {
                                return (
                                    <option value={user.id} selected = {user.id===selectedUser ? 'true':'false'} >{user.username}</option>
                                )
                            })}
                        </Form.Select>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Order Status</FormLabel>
                        <Form.Select onChange={handleStatus}>
                            <option value="">Please Select status</option>
                            <option value="pending" selected={status==="pending" ? 'true':'false'}>Pending</option>
                            <option value="confirmed" selected={status==="confirmed" ? 'true':'false'}>Confirmed</option>
                        </Form.Select>
                    </FormGroup>
                    <Button variant="primary" type="submit">Save Order</Button>
                </Form>
            </Modal>

        </div>
    )
}
export default Home;

//// this work as a single page application(SPA) user cant understand he browse in several pages