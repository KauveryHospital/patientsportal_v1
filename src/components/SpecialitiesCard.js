import React from 'react';
import styles from './card.styles';

const SpecialtiesCard = ({
  title = '',
  specialtiesImage,
  description = '',
  specialityCardPress
}) => {
  return (
    <div
      style={styles.specialtiesCard}
      onClick={specialityCardPress}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.specialtiesCardHover.boxShadow}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={styles.bookingCardTitleView2}>
        <div style={{ flex: 0.8 }}>
          <span style={styles.bookingTitle2} title={title}>
            {title}
          </span>
        </div>

        <div style={styles.bookingVectorView2}>
          <img
            src={specialtiesImage} // Replace with the appropriate image source
            alt="Specialty"
            style={styles.SpecialtiesListImage}
          />
        </div>
      </div>

      <p style={styles.bookingDes}>
        {description}
      </p>
    </div>
  );
};

export default SpecialtiesCard;

