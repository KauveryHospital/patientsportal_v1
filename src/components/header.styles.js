import { COLORS, FONTS } from "../constants/Theme";

const generateMenuItemStyles = (activeMenuItem) => ({
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontWeight: 'bold',
    margin: '0 15px',
    cursor: 'pointer',
    color: COLORS.primaryColor,
    position: 'relative',
    paddingBottom: activeMenuItem === 'Home' ? '3px' : '0',
  },
  underline: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: COLORS.activeMenuItemColor,
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
    fontSize: '12px',
    color: '#333333',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    marginTop: '8px',
    zIndex: 1000,
    width: '200px',
  },
  dropDownListCardActive: {
    backgroundColor: '#f0f0f0',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  dropDownListCard2: {
    backgroundColor: '#ffffff',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  dropDownTitleActive: {
    fontWeight: 'bold',
    color: '#333333',
  },
  dropDownTitle2: {
    color: '#333333',
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
});

export default generateMenuItemStyles;
