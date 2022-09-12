import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const ResetPassword = ({ setMessage, submit }) => {
  const [password, setPassword] = useState()
  const [confPassword, setConfPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
   

    if(password !== confPassword){
      setMessage('Passwords do not match!')
      return
    }

    const data = {
      password
    }
    submit(data)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                required
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <input
                type="password"
                required
                className="form-control"
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value)
                }}
                placeholder="Confirm Password"
              />
            </Form.Group>

            <div className="submit">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword