import { COLORS, Fonts } from '../constants/Theme';
import { font_size } from '../utils/helpers';

const { width } = window.innerWidth;

const styles = (isActive1 = true, isActive2 = false) => ({
  doctorCardContainer: {
    backgroundColor: COLORS.whiteColor,
    width: width - 30,
    height: 220,
    borderRadius: 8,
    shadowColor: '#58595B',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 4,
    marginVertical: 2,
    marginHorizontal: 6,
    marginRight: 6,
  },
  doctorCardContainerFullScreen: {
    backgroundColor: COLORS.whiteColor,
    width: width - 30,
    alignSelf: 'center',
    height: 250,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 2,
    marginRight: 6,
    shadowColor: COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 2,
  },
  profileIcon: {
    height: 55,
    width: 55,
    borderRadius: 30,
    backgroundColor: COLORS.borderColor,
    aspectRatio: 1,
  },
  imgView: {
    height: 50,
    width: 50,
    borderRadius: 75,
  },
  name: {
    fontFamily: Fonts.Medium,
    fontSize: font_size(14),
    color: COLORS.textColor,
  },
  doctorDesignation: {
    fontFamily: Fonts.Regular,
    fontSize: font_size(12),
    color: '#939598',
    marginTop: 5,
  },
  availableTimeHeading: {
    fontFamily: Fonts.Medium,
    fontSize: font_size(10),
    color: COLORS.textColor,
    fontWeight: '500',
  },
  doctorHome: {
    height: 17,
    width: 17,
    marginRight: 5,
  },
  hospitalVisit: {
    fontFamily: Fonts.Regular,
    fontSize: font_size(12),
    color: COLORS.textColor,
    lineHeight: font_size(18),
  },
  hospitalVisit2: {
    fontFamily: Fonts.Regular,
    fontSize: font_size(9),
  },
  consultAlarm: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
  consultLanguage: {
    height: 13,
    width: 13,
    marginRight: 5,
    bottom: 1,
  },
  slotRange: {
    fontFamily: Fonts.Regular,
    fontSize: font_size(12),
    color: COLORS.textColor,
    fontWeight: '400',
  },
  unavailableText: {
    fontFamily: Fonts.Medium,
    fontSize: font_size(12),
    color: COLORS.textColor,
    fontWeight: '500',
  },
});

export default styles;
