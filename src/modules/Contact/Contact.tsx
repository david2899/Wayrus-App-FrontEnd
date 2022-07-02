import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import imageContact from '../../assets/images/image-contact-2.png';
import Form from './components/Form';

const Contact = () => {
  return (

      <div className="contact-container">
        <Container>
          <Row className='contact-sub-container'>
            <Col sm={12} md={12} lg={6}>
              <img
                className="image-contact"
                src={imageContact}
                alt='image' />
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Form />
            </Col>
          </Row>
        </Container>
      </div>

  )
}
export default Contact