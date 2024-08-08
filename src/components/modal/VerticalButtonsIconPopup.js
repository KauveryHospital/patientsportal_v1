import React from 'react';
import Modal from 'react-modal';
import COLORS from '../../constants/Theme';
import Images from '../../constants/Images';
import FONTS from '../../constants/Theme';
import CommonButton from '../../components/CommonButton';

const VerticalButtonsIconPopup = ({
  isVisible,
  onPressPrimaryButton,
  onPressSecondaryButton,
  closeModal,
  title = '',
  content = '',
  primaryButtonText = 'Yes, Add',
  secondaryButtonText = 'Close',
  type = 'error',
  IconShow = true,
  secondaryButtonShow = true,
}) => {
  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={closeModal}
      contentLabel="VerticalButtonsIconPopup"
      style={modalStyles}
    >
      <div style={styles.containerStyle}>
        <div style={styles.permissionContainer}>
          {IconShow && (
            <img
              src={type === 'success' ? Images.tickBig : type === 'cancel' ? Images.cancel : Images.verifyError}
              alt="icon"
              style={type === 'success' ? styles.successIcon : styles.errorIcon}
            />
          )}
          <h2 style={styles.permissionTitleVertical}>{title}</h2>
          <p style={styles[type === 'cancel' ? 'permissionContentVerticalCancel' : type === 'success' ? 'permissionContentVerticalSuccess' : 'permissionContentVerticalError']}>
            {content}
          </p>
        </div>

        <div style={styles.buttonContainer2}>
          <CommonButton
            text={primaryButtonText}
            customStyles={styles.buttonStyle}
            customTextStyles={[styles.buttonTextStyle, { color: COLORS.whiteColor }]}
            onClick={onPressPrimaryButton}
          />
        </div>
        {secondaryButtonShow && (
          <div style={styles.buttonContainer2}>
            <CommonButton
              text={secondaryButtonText}
              customTextStyles={styles.buttonTextStyle}
              customStyles={styles.buttonStyle2}
              onClick={onPressSecondaryButton}
              reverseDesign={true}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VerticalButtonsIconPopup;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  content: {
    width: '90%',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: COLORS.whiteColor,
    padding: '20px',
    borderRadius: '8px',
  },
};

const styles = {
  containerStyle: {
    textAlign: 'center',
  },
  permissionContainer: {
    marginBottom: '12px',
  },
  permissionTitleVertical: {
    color: COLORS.textColor,
    fontFamily: FONTS.Medium,
    fontSize: '20px',
    lineHeight: '1.4',
    textAlign: 'center',
    marginBottom: '5px',
    marginTop: '3px',
  },
  permissionContentVerticalError: {
    color: '#747474',
    lineHeight: '23px',
    fontSize: '16px',
    fontFamily: FONTS.Regular,
    textAlign: 'center',
    marginVertical: '3px',
  },
  permissionContentVerticalCancel: {
    fontFamily: FONTS.Regular,
    fontSize: '14px',
    lineHeight: '1.4',
    textAlign: 'center',
    marginBottom: '5px',
    marginTop: '3px',
    color: '#3E3E3E',
  },
  permissionContentVerticalSuccess: {
    fontFamily: FONTS.Regular,
    fontSize: '14px',
    lineHeight: '1.4',
    textAlign: 'center',
    marginBottom: '5px',
    marginTop: '3px',
    color: COLORS.textColor,
  },
  buttonContainer2: {
    height: '50px',
  },
  buttonStyle: {
    height: '42px',
    width: '100%',
    borderRadius: '28px',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
  },
  buttonStyle2: {
    height: '42px',
    width: '100%',
    borderRadius: '28px',
    backgroundColor: COLORS.whiteColor,
    borderColor: COLORS.primaryColor,
    borderWidth: '1px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
  },
  buttonTextStyle: {
    fontFamily: FONTS.Medium,
    color: COLORS.primaryColor,
    fontSize: '16px',
  },
  errorIcon: {
    height: '50px',
    width: '50px',
    alignSelf: 'center',
    marginBottom: '17px',
  },
  successIcon: {
    height: '45px',
    width: '45px',
    alignSelf: 'center',
    marginBottom: '17px',
  },
};
