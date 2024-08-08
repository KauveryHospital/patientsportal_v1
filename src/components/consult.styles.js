import { Fonts } from '../constants/Theme';
import { dimen_size_height } from '../utils/helpers';
import { SIZES } from '../constants/Theme';

const styles = {
  containerStyle: {
    padding: '22px',
    backgroundColor: 'white',
    borderRadius: '8px',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
  },
  locationIcon: {
    height: '16px',
    width: '16px',
  },
  locationText: {
    fontFamily: Fonts.cardTitle,
    color: '#333333',
    marginLeft: '6px',
    marginRight: '8px',
  },
  ConsultHeader: {
    fontFamily: Fonts.cardTitle,
    fontSize: '16px',
    color: '#333333',
  },
  NoImg: {
    height: '141px',
    width: '100%',
    marginTop: '15px',
  },
  mainContainer: {},
  homeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarContainer: {
    marginBottom: '5px',
    borderRadius: '5px', 
    borderWidth: '0.2px', 
    // borderColor: '#ddd',
    padding: '10px', 
    marginBottom: '0px', 
    marginHorizontal: '20px',
  },
  searchBarView: {
    height: '40px',
    backgroundColor: '#F6F6F6',
    borderRadius: '25px',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '15px',
    justifyContent: 'space-between',
    marginHorizontal: '15px',
    marginTop: '8px',
  },
  searchBarText: {
    fontFamily: Fonts.Regular,
    fontSize: '12px',
    color: '#A9A9A9',
  },
  searchIcon: {
    height: '20px',
    width: '20px',
  },
  flatlistParentView: {},
  listTitle: {
    fontFamily: Fonts.headerTitle,
    color: '#333333',
    marginHorizontal: '16px',
    marginBottom: '5px',
    fontSize: '17px',
  },
  listTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '22px',
  },
  listViewAll: {
    fontFamily: Fonts.homeTitle,
    color: '#FF5733',
    marginHorizontal: '16px',
    fontSize: '16px',
  },
  listTitle2: {
    fontFamily: Fonts.headerTitle,
    color: '#333333',
    fontSize: '17px',
  },
  listViewAll2: {
    fontFamily: Fonts.headerTitle,
    color: '#FF5733',
    fontSize: '16px',
  },
  flatlist2: {
    paddingHorizontal: '14px',
    marginTop: '5px',
  },
  flatlist3: {
    paddingHorizontal: '14px',
    marginTop: '15px',
    marginBottom: '70px',
  },
  flatlistContainer: {},
  itemSeparator2: {
    width: '20px',
    height: '8px',
  },
  topView: {
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: '1px',
    paddingHorizontal: '16px',
    paddingVertical: '10px',
    backgroundColor: '#FFFFFF',
  },
  footerComponent: {
    marginVertical: '20px',
  },
  DoctorFlatlistParentView: {
    paddingHorizontal: '10px',
  },
  emptyComponent: {
    color: '#333333',
    fontFamily: Fonts.Regular,
    fontSize: '14px',
    textAlign: 'center',
  },
  parentDateContainer: {
    paddingVertical: '10px',
    paddingHorizontal: '16px',
    flexDirection: 'row',
  },
  textView: {
    flex: 0.88,
  },
  dateTopText2: {
    fontSize: '18px',
    fontFamily: Fonts.Medium,
    color: '#FF5733',
  },
  calendarIconView: {
    flex: 0.12,
    alignItems: 'flex-end',
  },
  calendarIcon: {
    width: '18px',
    height: '20px',
  },
  calendarBottomContainer: {
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    backgroundColor: '#FF5733',
  },
  dateTopContainer: {
    backgroundColor: '#FF5733',
    paddingHorizontal: '20px',
    justifyContent: 'center',
    paddingVertical: '5px',
  },
  dateTopText: {
    fontFamily: Fonts.largeTitle,
    fontSize: '32px',
    color: '#333333',
  },
  dateTopTextSmall: {
    fontFamily: Fonts.Regular,
    fontSize: '24px',
    color: '#333333',
  },
  cancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    width: '60px',
  },
  saveBtn: {
    height: '30px',
    width: '60px',
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
  },
  saveTxt: {
    fontFamily: Fonts.body5,
    color: '#FFFFFF',
  },
  cancelTxt: {
    fontFamily: Fonts.buttonTitle,
    color: '#FF5733',
  },
  CalenderContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    padding: '20px',
    flex: 1,
  },
  selectPatientContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fieldParentContainer: {
    padding: '16px',
  },
  fieldTitlePatient: {
    fontFamily: Fonts.Medium,
    fontSize: '16px',
    color: '#58595B',
  },
  fieldContainer: {
    marginBottom: '5px',
  },
  fieldContainerNotes: {
    marginBottom: '5px',
    paddingHorizontal: '16px',
  },
  fieldContainerCheckoutNotes: {
    marginBottom: '5px',
  },
  noteText: {
    marginHorizontal: '16px',
    marginBottom: '12px',
  },
  note1: {
    color: '#333333',
    fontFamily: Fonts.SemiBold,
    fontSize: '10px',
  },
  note2: {
    color: '#A9A9A9',
    fontFamily: Fonts.Regular,
    fontSize: '10px',
  },
  note3: {
    color: '#FF5733',
    fontFamily: Fonts.Medium,
    fontSize: '10px',
    textDecorationLine: 'underline',
  },
  buttonView: {
    marginVertical: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: '10px',
  },
  buttonViewNew: {
    paddingVertical: '10px',
  },
  checkoutBottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: '15px',
  },
  checkoutButtonContainer: {
    height: dimen_size_height(8.2),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
    saveButtonStyle: {
      paddingHorizontal: '18px',
      marginBottom: '100px',
      marginVertical: '2px',
    },
    nextButton: {
      borderRadius: '28px',
      backgroundColor: '#FF5733',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '20px',
      marginHorizontal: '16px',
    },
    checkoutContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    checkoutParentView: {
      flex: 1,
      paddingHorizontal: '16px',
    },
    checkoutProfileView: {
      paddingVertical: '20px',
    },
    bottomText: {
      color: '#FF5733',
      fontSize: '16px',
      marginTop: '16px',
      fontFamily: Fonts.buttonTitle,
    },
    saveButtonStyle2: {
      borderRadius: '28px',
      backgroundColor: '#FFFFFF',
      borderColor: '#FF5733',
      borderWidth: '1px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '20px',
      marginHorizontal: '16px',
    },
    saveButtonTextStyle: {
      fontSize: '16px',
      fontFamily: Fonts.Medium,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    saveButtonTextStyle2: {
      fontSize: '16px',
      color: '#FF5733',
      fontFamily: Fonts.Medium,
      fontWeight: '500',
    },
    patientDetailsContainer: {},
    patientDetails: {
      fontSize: '18px',
      color: '#333333',
      fontFamily: Fonts.Medium,
      fontWeight: '500',
    },
    nameText: {
      fontSize: '12px',
      color: '#535353',
      fontFamily: Fonts.Medium,
      fontWeight: '500',
    },
    nameText2: {
      fontSize: '15px',
      color: '#727272',
      fontFamily: Fonts.Regular,
      fontWeight: '400',
    },
    fieldParentView: {
      marginTop: '10px',
    },
    editText: {
      fontSize: '16px',
      color: '#FF5733',
      fontFamily: Fonts.Medium,
      fontWeight: '500',
    },
    edit: {
      width: '13px',
      height: '13px',
      marginRight: '5px',
      marginBottom: '5px',
    },
    toPayCardView: {
      marginVertical: '20px',
    },
    toPayCardView2: {
      marginBottom: '15px',
    },
    reminderView: {
      flexDirection: 'row',
      paddingHorizontal: '16px',
      paddingBottom: '20px',
    },
    reminderImageView: {
      flex: 0.08,
    },
    reminderImage: {
      height: '20px',
      width: '20px',
    },
    reminderTextView: {
      flex: 0.92,
    },
    reminderText: {
      fontFamily: Fonts.Regular,
      fontSize: '12px',
      color: '#333333',
    },
    emptyComponent_2: {
      color: '#333333',
      textAlign: 'center',
      fontSize: '15px',
      fontFamily: Fonts.Regular,
      fontWeight: '400',
      lineHeight: '22px',
    },
    emptyComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: SIZES.height / 1.6,
    },
  };

export default styles;
