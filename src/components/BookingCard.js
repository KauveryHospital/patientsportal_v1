import React from 'react';
import styles from './card.styles';

export const BookingCard = ({ title = '', bookingImage, description = '', onPressCard }) => {
  return (
    <div 
      style={styles.bookingCard} 
      onClick={onPressCard} 
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.bookingCardHover.boxShadow}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <img src={bookingImage} alt={title} style={styles.bookingListImage} />
      <div style={styles.bookingCardTitleView}>
        <div style={{ flex: 0.8 }}>
          <span style={styles.bookingTitle}>{title}</span>
        </div>
        {/* <div style={styles.bookingVectorView}>→</div> */}
      </div>
      <p style={styles.bookingDescription}>{description}</p>
    </div>
  );
};

export default BookingCard;
