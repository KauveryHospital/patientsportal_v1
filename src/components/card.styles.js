import { COLORS, FONTS } from "../constants/Theme";

const styles = {
  bookingCard: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    flexDirection: 'column',
    border: '0px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    marginBottom: '25px',
    marginTop: '25px',
    width: 'calc(50% - 25px)', 
    height: 'calc(50% - 25px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.9,
    elevation: 3,
    shadowColor: COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    margin: '0 30px',
},
  bookingCardHover: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  bookingListImage: {
    width: '42px',
    height: '42px',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  bookingCardTitleView: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  bookingTitle: {
    fontFamily: FONTS.cardTitle,
    // fontSize: '18px',
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  bookingVectorView: {
    fontSize: '24px',
    color: '#333',
  },
  bookingDescription: {
    fontSize: '14px',
    color: '#666',
    marginTop: '0',
  },
  eventCard: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
    marginBottom: '16px',
  },
  eventCardHover: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  eventCardView1: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  eventCardView2: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px',
  },
  eventCardView3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitleView: {
    flex: 0.68,
  },
  eventStatusView: {
    flex: 0.32,
    display: 'flex',
    alignItems: 'flex-end',
  },
  eventTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  dayText: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
  },
  statusButton: {
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  statusText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
  },
  locationIcon: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
  },
  locationTextView: {
    display: 'flex',
    flexDirection: 'column',
  },
  cityText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: '14px',
    color: '#666',
  },
  textView: {
    flex: 2,
  },
  joinNowView: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  joinNowButton: {
    borderRadius: '28px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    textAlign: 'center',
    cursor: 'pointer',
    display: 'inline-block',
  },
  joinNowText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
  },
  rescheduleButton: {
    padding: '8px',
    cursor: 'pointer',
  },
  rescheduleButtonText: {
    fontSize: '14px',
    color: '#007bff',
    textDecoration: 'underline',
  },
  docNameText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  patientText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  patientText2: {
    fontSize: '14px',
    color: '#666',
  },
  // cardWrapper: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   flexWrap: 'wrap',
  //   marginTop: '25px',
  //   margin: '0 -15px', // Adjust margin for spacing between cards
  // },
  specialtiesCard: {
    display: 'flex',
    flexDirection: 'column',
    flexwrap: 'wrap',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Adjust minmax for card width
    gap: '20px', // Adjust gap between cards
    backgroundColor: '#f5f5f5',
    border: '0px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    marginBottom: '16px',
    width: '100%',
    height: 'auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.9,
    elevation: 3,
    shadowColor: COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    margin: '0 30px',
  },    
  specialtiesCardHover: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  bookingCardTitleView2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  bookingTitle2: {
    fontFamily: FONTS.cardTitle,
    // fontSize: '18px',
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  bookingVectorView2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SpecialtiesListImage: {
    width: '20px',
    height: '20px',
    // objectFit: 'contain',
  },
  bookingDes: {
    fontSize: '14px',
    color: '#666',
    marginTop: '0'
  },
};


export default styles;
