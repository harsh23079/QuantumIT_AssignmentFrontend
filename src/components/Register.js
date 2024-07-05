import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', dateOfBirth: '', email: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData); 
      alert("You registered successfully")
      navigate('/login'); 
    } catch (error) {
      alert('Registration failed:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="heading">Sign Up</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control 
              type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <div className="button-container">
            <Button type="submit">Register</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
