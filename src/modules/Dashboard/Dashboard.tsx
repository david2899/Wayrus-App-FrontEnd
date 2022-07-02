import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import imageDashboard from '../../assets/images/image-dashboard.png'
import  Wallet  from './components/Wallet';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-sub-container">
        <Container>
          <Row>
            <Col sm={12} md={12} lg={6}>
            <Wallet />
            
            </Col>
            <Col  sm={12} md={12} lg={6}>
            <img className="image-dashboard" src={imageDashboard} alt='wallet-image' />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
export default Dashboard