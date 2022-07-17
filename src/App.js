// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import {
  Table, 
  Container, 
  Row, 
  Col,
  Button, 
  ButtonGroup,
  Form, 
  Navbar
} from "react-bootstrap";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const api="http://localhost:5000/users"; 

const initialState ={
  firstname: "",
  lastname: "",
  age: "",
  gender: "",
  height: "",
};


function App() {
  const [state,setState]=useState(initialState);
  const [data,setData]=useState([]);
  const [userId,setUserId]=useState(null);
  const [editMode,setEditMode]=useState(false);

  const{firstname,lastname,age,gender,height}=state;

  useEffect(() =>{
    loadUsers();
  },[])

  const loadUsers=async () => {
    const response = await axios.get(api);
    setData(response.data);
  };

  const handleChange = (e) => {
    let {name,value}=e.target;
    setState({...state, [name]: value});
  };

  const handleDelete =async (id) =>{
    if(window.confirm("Are you wanted to delete that user ?")){
      axios.delete(`${api}/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => loadUsers(), 500);
    }
  };

  const handleUpdate = (id) =>{
    const singleUser=data.find((item) => item.id == id);
    setState({...singleUser});
    setUserId(id);
    setEditMode(true);
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    if(!firstname || !lastname || !age || !gender || !height){
      toast.error("Please fill all input field");
    }else{
      if(!editMode){
      axios.post(api,state);
      toast.success("Added Successfully");
      setState({firstname: "",lastname: "", age: "",gender: "",height: ""});
      // loadUsers();
      setTimeout(() => loadUsers(), 500);
    }else{
      axios.put(`${api}/${userId}`,state);
      toast.success("Updates Successfully");
      setState({firstname: "",lastname: "", age: "",gender: "",height: ""});
      // loadUsers();
      setTimeout(() => loadUsers(), 500);
      setUserId(null);
      setEditMode(false);
    }
    }
  };
  return (
    <>
    <ToastContainer />
    <Navbar bg="primary" variant="dark" className="justify-content-center">
      <Navbar.Brand>
        Simple Crude Project
      </Navbar.Brand>
    </Navbar>
    <Container style={{marginTop:"70px"}}>
      <Row>
        <Col md={4}>
          <h2>Form</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>First Name</Form.Label>
          <Form.Control
           type="text" 
           placeholder="Enter First Name" 
           name="firstname" 
           value={firstname} 
           onChange={handleChange}
           />
          </Form.Group>

          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Last Name</Form.Label>
          <Form.Control
           type="text" 
           placeholder="Enter Last Name" 
           name="lastname" 
           value={lastname} 
           onChange={handleChange}
           />
          </Form.Group>


          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Age</Form.Label>
          <Form.Control
           type="text" 
           placeholder="Enter age" 
           name="age" 
           value={age} 
           onChange={handleChange}
           />
          </Form.Group>

          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Gender</Form.Label>
          <Form.Control
           type="text" 
           placeholder="Enter Your Gender" 
           name="gender" 
           value={gender} 
           onChange={handleChange}
           />
          </Form.Group>

          <Form.Group>
          <Form.Label style={{textAlign:"left"}}>Height</Form.Label>
          <Form.Control
           type="text" 
           placeholder="Enter Height" 
           name="height" 
           value={height} 
           onChange={handleChange}
           />
          </Form.Group>
          <div className="d-grid gap-2 mt-2">
            <Button type="submit" variant="primary" size="lg">
              {editMode ? "Update" :"Submit"}
            </Button>
          </div>
          </Form>
        </Col>
        <Col md={8}>
         <Table bordered hover>
           <thead>
             <tr>
               <th>No.</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Age</th>
               <th>Gender</th>
               <th>Height</th>
               <th>Action</th>
             </tr>
           </thead>
           {data && 
           data.map((item, index) =>(
             <tbody key={index}>
               <tr>
                 <td>{index + 1}</td>
                 <td>{item.firstname}</td>
                 <td>{item.lastname}</td>
                 <td>{item.age}</td>
                 <td>{item.gender}</td>
                 <td>{item.height}</td>
                 <td>
                   <ButtonGroup>
                     <Button style={{marginRight:"5px"}} 
                     variant="secondary"
                     onClick={() => handleUpdate(item.id)}
                     >
                       Update
                     </Button>
                     <Button style={{marginRight:"5px"}} 
                     variant="danger"
                     onClick={() => handleDelete(item.id)}
                     >
                       Delete
                     </Button>
                   </ButtonGroup>
                 </td>
               </tr>
             </tbody>
           ))}
         </Table>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
