import { fontGrid } from "@mui/material/styles/cssUtils";
import { COLORS, Fonts } from "../constants/Theme";
import { font_size } from "../utils/helpers";

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
  h3: {
    fontFamily: 'Poppins',
    color: COLORS.primaryColor,
    marginTop: '20px',
    marginBottom: '0px'
  },
  // seeAllButton: {
  //   color: '#8b3063',
  //   cursor: 'pointer',
  //   textAlign: 'right',
  //   display: 'block',
  //   margin: '10px 0',
  // },
  specialtiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '10px'
  },
  specialtyItem: {
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    height: '80px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      height: 'auto',
    },
  },
  cardImage: {
    width: 'fit-content',
    height: 'fit-content',
    marginRight: '10px',
    '@media (max-width: 600px)': {
      width: '100%',
      height: 'auto',
      marginRight: '0',
    },
  },
  specialtyIcon: {
    width: '10%',
    height: '80%',
    marginRight: '10px',
  },
  specialtyContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    padding: '3px'
  },
  // container: {
  //     padding: '20px',
  //     margin: 0,
  //   },
  seeAllButton: {
    cursor: 'pointer',
    color: '#8b3063',
    textDecoration: 'underline',
    marginBottom: '10px',
    display: 'block',
    textAlign: 'right',
  },
  doctorsContainer: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  doctorCard: {
    width: '48%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'flex-start',
    marginBottom: '10px',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 600px)': {
      flexDirection: 'row',
      padding: '15px',
      alignItems: 'center',
    },
  },
  imageContainer: {
    width: '20%',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '10px',
    '@media (max-width: 600px)': {
      width: '80px',  // Ensuring the image is still a square for proper circle appearance
      height: '80px', // Ensuring the image is still a square for proper circle appearance
      marginRight: '0',
      margin: '0 auto',
    },
  },
  doctorImage: {
    width: '100%',
    height: '120%',
    objectFit: 'cover',
  },
  doctorInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    '@media (max-width: 600px)': {
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  doctorName: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: COLORS.textColor,
  },
  doctorSpecialty: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#939598',
    marginTop: 5,
  },
  doctorLanguages: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#939598',
    marginTop: 5,
  },
  availableTimeHeading: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    color: COLORS.textColor,
    fontWeight: '500',
    marginTop: 5,
  },
  actionButton: {
    color: 'white',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '30%',
    fontFamily: 'Poppins',
    fontSize: '14px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
    '@media (max-width: 600px)': {
      width: '80%',
      padding: '8px 16px',
      fontSize: '14px',
    },
    '@media (max-width: 900px)': {
      width: '60%',
      padding: '9px 18px',
      fontSize: '15px',
    },
  },
  footer: {
    display: 'flex',
    width: '100%',
    height: '80px',
    backgroundColor: '#962067',
    borderRadius: '10px 10px 0px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8px',
  },
};

export default styles;
