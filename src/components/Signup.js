import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'; // React Bootstrap components
import { FONTS, COLORS } from '../constants/Theme'; // Assuming FONTS are defined in constants

const Signup = () => {
  const [patientName, setPatientName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    // Handle form submission
  };

  return (
    <Container style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Row>
        <Col>
          <h1 style={styles.signupText}>Signup</h1>
          <p style={styles.signupDescription}>Please provide your information so it will be easy for us to help you.</p>
          <div style={styles.signUpTitleParentView}>
            <span style={styles.signUpTextBold}>Vanakkam! </span>
            <span style={styles.signUpTextDesc}>Welcome to Kauvery</span>
          </div>
          <Form>
            <Form.Group controlId="formPatientName" style={styles.fieldContainer}>
              <Form.Label>Patient Name</Form.Label>
              <Form.Control type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" value={genderValue} onChange={(e) => setGenderValue(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPinCode">
              <Form.Label>Home Pincode</Form.Label>
              <Form.Control type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} style={styles.nextButton}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Modal for Location Search */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Location Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Location search content */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const styles = {
  signupText: {
    fontFamily: FONTS.title, // Fallback font-family
    paddingHorizontal: 16,
  },
  signupDescription: {
    fontFamily: FONTS.bodyRegular, // Fallback font-family
    paddingHorizontal: 16,
    color: COLORS.placeholderColor,
    FONTSize: 14,
  },
  signUpTextDesc: {
    fontFamily: FONTS.signupText, // Fallback font-family
    color: COLORS.textColor,
    FONTSize: 18,
  },
  signUpTextBold: {
      fontFamily: FONTS.headerTitle,
      color: COLORS.textColor,
      fontSize: '18@msr',
  },
  nextButton: {
    borderRadius: 28,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 10,
  },
  signUpTitleParentView: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  fieldContainer: {
    marginBottom: '5@vs',
    // marginTop:'16@vs',
    // marginBottom: "5@vs",
    // backgroundColor:'pink'
  },
};

export default Signup;
