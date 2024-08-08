import { COLORS, FONTS, Fonts } from '../constants/Theme'; // Adjust the path according to your project structure

const styles = {
  container1: {
    backgroundColor: COLORS.whiteColor,
    padding: '12px',
    borderRadius: '10px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
    marginBottom: '30px',
  },
  profileImageBefore: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    fontFamily: Fonts.Medium,
    color: COLORS.textColor,
    fontSize: '16px',
    fontWeight: '600',
  },
  description: {
    marginTop: '7px',
  },
  gender: {
    fontFamily: Fonts.Regular,
    color: COLORS.textColor,
    fontSize: '14px',
    fontWeight: '400',
  },
  timeText: {
    fontFamily: Fonts.Regular,
    color: COLORS.textColor,
    fontSize: '14px',
    fontWeight: '400',
  },
  alarmIcon: {
    width: '24px',
    height: '24px',
  },
};

export default styles;
