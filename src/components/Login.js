import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
      alert("You logged in");
    } catch (error) {
      alert('Login failed:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="heading">Login</h2>
        <Form onSubmit={onSubmit}>
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
            <Button className="login-button" type="submit">Login</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
