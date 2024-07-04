import { COLORS } from "../constants/Theme";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '5px', 
    border: '1px solid #ddd', 
    padding: '10px', 
    marginBottom: '10px', 
    marginHorizontal: '10px', 
  },
  textInputContainer: {
    flex: 1,    
  },
  searchIconView: {
    height: '30px', 
    width: '30px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Added cursor pointer
  },
  searchIcon: {
    height: '24px',
    width: '24px',
  },
  input: {
    fontSize: '16px',
    color: COLORS.placeholderColor,
    width: '100%', 
    border: 'none',
    outline: 'none',
  },
};

export default styles;
