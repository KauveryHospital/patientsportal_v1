export const styles = {
  signupContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '1rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  button: signUpState => ({
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: signUpState ? '#007bff' : '#ccc',
    color: '#fff',
    cursor: signUpState ? 'pointer' : 'not-allowed',
  }),
  searchResults: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: '150px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  searchResultItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '1.5rem',
  },
};
