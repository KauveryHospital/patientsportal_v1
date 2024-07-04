import { COLORS, FONTS } from "../constants/Theme";

const homeStyles = {
  // ...other styles
  pageContainer: {
    marginTop: '17vh',
    padding: '2vw',
  },
  sliderContainer: {
    // Slider container styles
  },
  sliderImage: {
    width: '100%',
    height: 'auto',
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
    color: COLORS.textColor,
    marginHorizontal: '7vw',
    marginBottom: '3vh',
    fontWeight: 'bold',    
    marginLeft: '40vw'
  },
  flatlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '1.5vw',
    marginTop: '1vh',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  viewAllLink: {
    fontFamily: FONTS.iconText,
    fontSize: '1.4vw',
    color: COLORS.primaryColor,
    marginLeft: '30vw',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2vw',
    borderRadius: '5px',
    width: '50vw',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1vw',
  },
  modalBody: {
    marginTop: '1vw',
  },
  modalButton: {
    padding: '0.5vw 1vw',
    backgroundColor: COLORS.primaryColor,
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2vw',
  },
  searchInput: {
    width: '50%',
    padding: '0.5vw',
    marginRight: '1vw',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchResults: {
    marginTop: '2vw',
  },
  searchResultItem: {
    padding: '1vw',
    borderBottom: '1px solid #ccc',
  },
//   specialtiesContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginTop: '2vh',
//   },
};

export default homeStyles;
