import React from 'react';
import { Modal } from 'react-bootstrap'; // Assuming you have Modal from react-bootstrap
import { TailSpin } from 'react-loader-spinner'; // Import the TailSpin loader component
import { COLORS, Fonts } from '../constants/Theme'; // Assuming you have constants defined for colors and fonts

const ContentLoader = ({ loading, content = '', title = '' }) => {
  return (
    <Modal show={loading} centered>
      <Modal.Body>
        <div className="content-loader-container">
          <div className="loader-view">
            {/* Use the TailSpin loader here */}
            <TailSpin color={COLORS.primaryColor} height={80} width={80} visible={loading} />
          </div>
          <div className="content-view">
            {title && <h2 className="title-text">{title}</h2>}
            <p className="content-text">{content}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// CSS styles using classNames (optional)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  contentView: {
    padding: '40px',
    alignItems: 'center',
    marginTop: '15px',
  },
  contentText: {
    fontSize: '14px',
    color: COLORS.textColor,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    lineHeight: '24px',
  },
  loaderView: {
    height: '64px', // You may need to adjust this based on your design
    marginBottom: '20px',
  },
  titleText: {
    fontSize: '23px',
    color: COLORS.textColor,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
    lineHeight: '24px',
    marginBottom: '13px',
  },
};

export default ContentLoader;
