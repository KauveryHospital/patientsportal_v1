import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './SelectPatient.styles';

Modal.setAppElement('#root');

const RequestFormModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [notes, setNotes] = useState('');

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ selectedPatient, notes });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={styles.modalStyles}
      contentLabel="Request Form"
    >
      <h2 style={styles.modalHeader}>Select Patient</h2>
      <div style={styles.formGroup}>
        <label htmlFor="patientSelect">Select Patient:</label>
        <select
          id="patientSelect"
          value={selectedPatient}
          onChange={handlePatientChange}
          style={styles.selectBox}
        >
          <option value="">Select a patient</option>
          {/* Replace the following options with your dynamic patient list */}
          <option value="patient1">Patient 1</option>
          <option value="patient2">Patient 2</option>
        </select>
      </div>
      <p style={styles.note}>
        Note: Select the patient who needs the consultation. If you don't see the patient in the list, please add the patient to your profile.
      </p>
      <div style={styles.formGroup}>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          maxLength={200}
          style={styles.textArea}
        ></textarea>
      </div>
      <button onClick={handleSubmit} style={styles.modalButton}>
        Submit
      </button>
    </Modal>
  );
};

export default RequestFormModal;
