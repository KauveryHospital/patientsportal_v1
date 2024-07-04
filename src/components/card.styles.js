import { COLORS, FONTS } from "../constants/Theme";

const styles = {
  bookingCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    border: '0px solid #e0e0e0',
    borderRadius: '0.5vw',
    padding: '3vw',
    cursor: 'pointer',
    transition: 'box-shadow 0.7s ease',
    width: 'calc(25.33% - 1.5vw)', // Adjust the width for 3 cards per row
    boxShadow: '0 0.5vw 1vw rgba(0,0,0,0.1)',
    marginBottom: '2vh',
    height: 'auto',
  },
  bookingCardHover: {
    boxShadow: '0 0.5vw 1vw rgba(0,0,0,0.2)',
  },
  bookingListImage: {
    width: '5vw',
    height: '4vw',
    objectFit: 'contain',
    borderRadius: '0.5vw',
    marginBottom: '1vw',
  },
  bookingCardTitleView: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '0.5vw',
  },
  bookingTitle: {
    fontFamily: FONTS.cardTitle,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  bookingVectorView: {
    fontSize: '2vw',
    color: '#333',
  },
  bookingDescription: {
    fontSize: '1.2vw',
    color: COLORS.placeholderColor,
    marginTop: '0',
  },
  specialtiesCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    border: '0px solid #e0e0e0',
    borderRadius: '0.5vw',
    padding: '3vw',
    cursor: 'pointer',
    transition: 'box-shadow 0.7s ease',
    width: 'calc(25.33% - 1.5vw)', // Adjust the width for 3 cards per row
    boxShadow: '0 0.5vw 1vw rgba(0,0,0,0.1)',
    marginBottom: '2vh',
    height: 'auto',
  },
  specialtiesCardHover: {
    boxShadow: '0 0.5vw 1vw rgba(0,0,0,0.2)',
  },
  SpecialtiesListImage: {
    width: '3vw',
    height: '3vw',
    objectFit: 'contain',
    marginBottom: '1vw',
  },
  bookingCardTitleView2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1vw',
  },
  bookingTitle2: {
    fontFamily: FONTS.cardTitle,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  bookingVectorView2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingDes: {
    fontSize: '1.2vw',
    color: COLORS.placeholderColor,
    marginTop: '0',
  },
};


export default styles;
