import { COLORS, FONTS } from "../constants/Theme";

const homeStyles = {
    pageContainer: {
        marginTop: '80px', // Adjust based on your header height
      },
      contentContainer: {
        padding: '16px',
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
        marginBottom: '50px',
        fontWeight: 'bold',
    },
    flatlist: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'space-between',
    },
    bookingCard: {
        backgroundColor: '#FFFFFF',
        flex: '1 1 calc(50% - 16px)',
        height: '160px',
        padding: '12px',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '8px 0',
    },
    specialtiesCard: {
        display: 'flex',
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        flexDirection: 'column',
        border: '0px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        marginBottom: '16px',
        width: 'calc(50% - 25px)', 
        height: 'calc(50% - 25px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
};

export default homeStyles;
