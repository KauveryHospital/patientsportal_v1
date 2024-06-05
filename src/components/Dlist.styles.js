import { COLORS, FONTS } from "../constants/Theme";

const homeStyles = {
  pageContainer: {
    marginTop: '80px', // Adjust based on your header height
  },
  contentContainer: {
    padding: '16px',
    marginTop: '80px', // To ensure it starts below the header
  },
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
    padding: '16px',
    marginLeft: '5%',
  },
  topView: {
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: '1px',
    paddingHorizontal: '16px',
    paddingVertical: '10px',
    backgroundColor: "#FFFFFF",
  },
  nameView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameDropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    ...FONTS.homeTitle,
    color: COLORS.primaryColor,
    marginRight: '5px',
  },
  heyText: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.textColor,
  },
  welcomeText: {
    fontFamily: FONTS.iconText,
    color: COLORS.textColor,
    marginTop: '3px',
    fontSize: '13px',
    paddingBottom: '5px',
  },
  flatlistParentView: {
    paddingVertical: '12px',
    marginTop: '5px',
    backgroundColor: '#FCFCFC',
  },
  listTitle: {
    fontFamily: FONTS.headerTitle,
    fontSize: '24px',
    color: COLORS.textColor,
    marginHorizontal: '16px',
    marginBottom: '20px', // Adjusted bottom margin for spacing
    fontWeight: 'bold',
  },
  flatlist: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: '10px 0',
  },
  bookingCard: {
    width: '250px', // Fixed width for each card
    margin: '10px', // Horizontal and vertical margin for spacing
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
  specialtiesCard: {
    width: '250px', // Fixed width for each card
    margin: '10px', // Horizontal and vertical margin for spacing
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
    transition: 'box-shadow 0.3s ease',
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
  },
  logoView: {
    flex: 1,
  },
  topLogo: {
    width: '100px', // Adjust as needed
  },
  menuContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    margin: '0 15px',
    cursor: 'pointer',
    color: COLORS.textColor,
    fontFamily: FONTS.homeTitle,
  },
  greetingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '20px',
  },
  locationIcon: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  locationText: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.textColor,
    marginRight: '5px',
  },
  dropdownArrow: {
    marginLeft: '5px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.whiteColor,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  dropDownListCardActive: {
    backgroundColor: COLORS.primaryColor,
    padding: '10px',
    cursor: 'pointer',
  },
  dropDownListCard2: {
    padding: '10px',
    cursor: 'pointer',
  },
  dropDownTitleActive: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.whiteColor,
  },
  dropDownTitle2: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.textColor,
  },
};

export default homeStyles;
