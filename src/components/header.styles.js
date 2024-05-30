const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 0.5px 0.1px rgba(0, 0, 0, 0.3)',
    padding: '16px',
    position: 'relative',
  },
  logoView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  locationView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  notificationView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  notificationIcon: {
    height: '23px',
    width: '18px',
  },
  locationIcon: {
    height: '16px',
    width: '16px',
  },
  locationText: {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: '#333333',
    marginLeft: '6px',
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
  homeContainer: {
    backgroundColor: '#FFFFFF',
    padding: '14px',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '16px',
  },
  menuItem: {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: '#333333',
    cursor: 'pointer',
    padding: '8px 16px',
  },
};

export default styles;
