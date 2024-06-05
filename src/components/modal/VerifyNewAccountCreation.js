import React from 'react';
import Modal from 'react-modal';
import FastImage from 'react-fast-image'; // Make sure to import FastImage correctly
import COLORS from '../../constants/Theme';
import FONTS from '../../constants/Theme';
import Fonts from '../../constants/Theme';
import Images from '../../constants/Images';
import { CommonButton } from '../CommonButton';
import { dimen_size_height } from '../../utils/helpers';
import { font_size } from '../../utils/helpers';

const VerifyNewAccountCreation = ({
  isModalVisible,
  title,
  content,
  ticketID,
  buttonPress,
  showNotes = true,
  showTicketID = true,
  closeModal,
  type = 'error',
  buttonText = `Create a new account`,
  okText = 'Create a new account',
  notes = 'Create a new account to continue with Kauvery Kare.',
}) => {
  return (
    <Modal
      isOpen={isModalVisible}
      onRequestClose={closeModal}
      contentLabel={title}
      style={customStyles}
    >
      <div style={styles.container}>
        <div style={styles.content}>
          {type === 'success' ? (
            <img src={Images.tickBig} style={styles.topLogo} />
          ) : type === 'noInternet' ? (
            <img src={Images.noInternet} style={styles.topLogo} />
          ) : type === 'cancel' ? (
            <img src={Images.cancel} style={styles.topLogo} />
          ) : (
            <img src={Images.verifyError} style={styles.topLogo} />
          )}

          <h1 style={styles.TopNameText}>{title}</h1>
          <p style={[
            styles.UserDetailsSubViewText,
            {
              color: type === 'error' ? COLORS.placeholderColor : COLORS.textColor,
            },
          ]}>{content}</p>
          {showTicketID && (
            <p style={styles.TicketNumber} numberOfLines={1}>
              Ticket ID: {ticketID}
            </p>
          )}
        </div>
        <div style={styles.BottomView}>
          <CommonButton
            text={buttonText}
            customStyles={styles.buttonStyle}
            isLoading={false}
            onClick={buttonPress}
            disabled={false}
            customTextStyles={styles.buttonTextStyle}
          />
        </div>
        {showNotes ? (
          <div style={styles.NoteView}>
            <p style={styles.Note} numberOfLines={3}>
              Note:
            </p>
            <p style={styles.SubViewText} numberOfLines={3}>
              {notes}
            </p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default VerifyNewAccountCreation;

const styles = {
  container: {
    width: '80vw',
    backgroundColor: COLORS.whiteColor,
    borderRadius: '10px',
  },
  UserDetailsSubViewText: {
    ...FONTS.paragraph,
    fontSize: font_size(16),
    textAlign: 'center',
    marginTop: '8px',
    color: COLORS.placeholderColor,
    marginBottom: '5px',
  },
  BottomView: {
    height: dimen_size_height(6),
    marginBottom: '22px',
  },
  content: {
    padding: '20px',
  },
  TopNameText: {
    ...FONTS.h4,
    fontSize: font_size(23),
    color: '#58595B',
    textAlign: 'center',
  },
  topLogo: {
    height: '50px',
    width: '50px',
    alignSelf: 'center',
    marginTop: '5px',
    marginBottom: '20px',
  },
  TicketNumber: {
    ...FONTS.h4,
    fontSize: font_size(15),
    color: COLORS.textColor,
    textAlign: 'center',
    marginTop: '15px',
  },
  SubViewText: {
    ...FONTS.paragraph,
    fontSize: font_size(12),
    textAlign: 'center',
    marginBottom: '20px',
    marginLeft: '-10px',
    color: COLORS.placeholderColor,
    paddingRight: '5px',
  },
  buttonStyle: {
    height: dimen_size_height(6),
    width: 'calc(100% - 75px)',
    borderRadius: '28px',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
  },
  buttonTextStyle: {
    fontSize: font_size(16),
    fontFamily: Fonts.SemiBold,
  },
  NoteView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '20px',
  },
  Note: {
    ...FONTS.paragraph,
    fontSize: font_size(12),
    marginLeft: '15px',
  },
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: COLORS.whiteColor,
    borderRadius: '10px',
    padding: '20px',
  },
  TopNameText: {
    ...FONTS.h4,
    fontSize: font_size(23),
    color: '#58595B',
    textAlign: 'center',
    marginTop: '15px',
    marginBottom: '20px',
  },
  topLogo: {
    height: '50px',
    width: '50px',
    alignSelf: 'center',
    marginBottom: '20px',
  },
  UserDetailsSubViewText: {
    ...FONTS.paragraph,
    fontSize: font_size(16),
    textAlign: 'center',
    marginTop: '15px',
    marginBottom: '20px',
    color: COLORS.placeholderColor,
  },
  TicketNumber: {
    ...FONTS.h4,
    fontSize: font_size(15),
    color: COLORS.textColor,
    textAlign: 'center',
    marginTop: '15px',
  },
  BottomView: {
    height: 'auto',
    marginBottom: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: dimen_size_height(6),
    width: 'calc(100% - 40px)',
    maxWidth: '300px',
    borderRadius: '28px',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
  },
  buttonTextStyle: {
    fontSize: font_size(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
  },
  NoteView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  Note: {
    ...FONTS.paragraph,
    fontSize: font_size(12),
    marginLeft: '15px',
  },
};
