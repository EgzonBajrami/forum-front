import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


const ForgotPassword = ({ submit, setMessage }) => {
  const [email, setEmail] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    const data = {
      email,
    }
    submit(data)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                required
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Email"
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

export default ForgotPassword