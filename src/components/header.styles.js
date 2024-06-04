import { COLORS, FONTS } from "../constants/Theme";
import { font_size } from "../utils/helpers";

const headerStyles = {
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Add this line to handle different browsers' box-sizing
    boxSizing: 'border-box',
  },
  logoView: {
    display: 'flex',
    alignItems: 'center',
  },
  topLogo: {
    width: '140px',
    height: 'auto',
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    marginLeft: '20px',
    marginRight: '20px',
  },
  menuItem: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.primaryColor,
    fontWeight: 'bold',    
    margin: '0 15px',
    cursor: 'pointer',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '20px',
    position: 'relative', 
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
    right: 'auto', 
    backgroundColor: COLORS.whiteColor,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
    marginTop: '5px', 
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
  rightContent: {
    display: 'flex',
    alignItems: 'center',
  },
  greeting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: '20px',
  },
  heyText: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.textColor,
  },
  nameDropDown: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  nameText: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.primaryColor,
    marginRight: '5px',
  },
  welcomeText: {
    fontFamily: FONTS.iconText,
    color: COLORS.textColor,
    marginTop: '3px',
    fontSize: '13px',
  },
  notificationView: {
    display: 'flex',
    alignItems: 'center',
  },
  notificationIcon: {
    width: '24px',
    height: '24px',
  },
};

export default headerStyles;
