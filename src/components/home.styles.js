import { COLORS, FONTS } from "../constants/Theme";

const homeStyles = {
  pageContainer: {
    marginTop: '17vh', // Adjust based on your header height
    padding: '2vw',
  },
  sliderContainer: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '4vh',
  },
  sliderImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  contentContainer: {
    padding: '2vw',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
    padding: '2vw',
    marginLeft: '5%',
  },
  topView: {
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: '1px',
    paddingHorizontal: '2vw',
    paddingVertical: '2vh',
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
    marginRight: '0.5vw',
  },
  heyText: {
    fontFamily: FONTS.homeTitle,
    color: COLORS.textColor,
  },
  welcomeText: {
    fontFamily: FONTS.iconText,
    color: COLORS.textColor,
    marginTop: '0.5vh',
    fontSize: '1vw',
    paddingBottom: '1vh',
  },
  flatlistParentView: {
    paddingVertical: '4vh',
    marginTop: '1vh',
    backgroundColor: COLORS.whiteColor,
  },
  listTitle: {
    fontFamily: FONTS.headerTitle,
    fontSize: '2vw',
    color: COLORS.primaryColor,
    marginHorizontal: '7vw',
    marginBottom: '3vh',
    marginLeft: '40vw',
    fontWeight: 'bold',
    textAlign: 'center',    
  },
  listTitle1: {
    fontFamily: FONTS.headerTitle,
    fontSize: '2vw',
    color: COLORS.primaryColor,
    marginHorizontal: '7vw',
    marginBottom: '3vh',    
    fontWeight: 'bold',
    textAlign: 'center',    
  },
  flatlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2vw',
    marginTop: '1vh',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  viewAllLink: {
    fontFamily: FONTS.iconText,
    fontSize: '1.4vw',
    color: COLORS.primaryColor,
    // textDecoration: 'underline',
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'block',
    margin: '2vh auto',
  },
  videoContainer: {
    marginTop: '4vh',
    textAlign: 'center',
    padding: '2vw',
    backgroundColor: COLORS.whiteColor,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: FONTS.headerTitle,
    fontSize: '2vw',
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  video: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
};

export default homeStyles;
