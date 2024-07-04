import { COLORS, FONTS, Fonts } from '../../constants/Theme'; 

const styles = {
  parentContainer: {
    backgroundColor: COLORS.whiteColor,
    margin: '16px 0',
    padding: '12px',
    borderRadius: '10px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
    marginBottom: '30px',
  },
  addressIcon: {
    width: '24px',
    height: '24px',
  },
  availableSlots: {
    ...FONTS.h4,
    color: COLORS.textColor,
    marginTop: '-5px',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 12px',
  },
  name: {
    fontFamily: Fonts.Medium,
    color: COLORS.textColor,
    fontSize: '16px',
    fontWeight: '600',
  },
  addressText: {
    ...FONTS.body3,
    color: COLORS.textColor,
    marginTop: '-5px',
    fontSize: '12px',
  },
  slotContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  slotWrapper: {
    margin: '5px',
  },
  slotItem: {
    width: '90px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '30px',
    borderStyle: 'solid',
  },
  slotItemText: {
    fontSize: '12px',
    color: COLORS.textColor,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
  },
};

export default styles;
