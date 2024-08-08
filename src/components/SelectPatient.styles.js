const styles = {
  selectPatientContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    height: '100vh', // Ensures the container takes the full height of the viewport
  },
  fieldParentContainer: {
    marginBottom: '20px',
    textAlign: 'center',
    width: '50%',
  },
  fieldTitlePatient: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  fieldContainer: {
    width: '100%',
    maxWidth: '250px', // Maximum width for larger screens
    marginBottom: '20px',
  },
  noteText: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '250px', // Maximum width for larger screens
  },
  note1: {
    fontWeight: 'bold',
  },
  note2: {
    display: 'inline',
  },
  note3: {
    color: '#007BFF',
    cursor: 'pointer',
  },
  fieldContainerNotes: {
    width: '100%',
    maxWidth: '250px', // Maximum width for larger screens
    marginBottom: '20px',
  },
  buttonView: {
    width: '100%',
    maxWidth: '0px', // Maximum width for larger screens
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  toPayCardView: {
    marginBottom: '20px',
    textAlign: 'center',
    width: '100%',
  },
  nextButton: {
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
};

export default styles;
