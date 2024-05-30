import React from 'react';
import Images from '../constants/Images';
import { convertTimeFormat } from '../utils/helpers';
import styles from './DoctorCard.styles'; // Importing the styles object

const DoctorCard = ({
  rawData,
  onPress,
  onPressBookNow,
  onPressRequest,
  statusRequest = false, // false - Dashboard card, true - Doctor List view all
  doctorRequest = 0,
}) => {
  console.log(rawData, 'DoctorData');

  return (
    <div
      style={statusRequest ? styles.doctorCardContainerFullScreen : styles.doctorCardContainer}
      onClick={() => onPress(rawData)}
    >
      <div style={styles.cardHeader}>
        <div style={styles.imgView}>
          <img
            src={rawData.photo === null || rawData.photo === '' ? Images.profileEmptyImage : rawData.photo}
            style={styles.profileIcon}
            alt="Doctor"
          />
        </div>
        <div style={{ width: '12px' }} />
        <div style={{ flex: 1 }}>
          <h3 style={styles.name}>
            {rawData.first_name} {rawData.last_name}
          </h3>
          <p style={styles.doctorDesignation}>
            {rawData.default_specialization}
          </p>
        </div>
      </div>

      {statusRequest ? (
        <div style={styles.detailsSection}>
          {doctorRequest === 1 ? (
            <p style={styles.hospitalVisit}>This doctor is available on request only.</p>
          ) : (
            !rawData.offline_slot_range && !rawData.online_slot_range && (
              <p style={styles.hospitalVisit}>Unavailable for today, please look for other dates.</p>
            )
          )}

          {(rawData.offline_slot_range || rawData.online_slot_range) && doctorRequest === 0 && (
            <>
              <p style={styles.availableTimeHeading}>Available for</p>
              {rawData.offline_slot_range && (
                <div style={styles.slotInfo}>
                  <img src={Images.doctorHome} style={styles.doctorHome} alt="Hospital visit" />
                  <p style={styles.hospitalVisit}>Hospital visit</p>
                  <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Time" />
                  <p style={styles.slotRange}>{convertTimeFormat(rawData.offline_slot_range.slot_range)}</p>
                </div>
              )}
              {rawData.online_slot_range && (
                <div style={styles.slotInfo}>
                  <img src={Images.consultVideo} style={styles.doctorHome} alt="Video consultation" />
                  <p style={styles.hospitalVisit}>Video consultation</p>
                  <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Time" />
                  <p style={styles.slotRange}>{convertTimeFormat(rawData.online_slot_range.slot_range)}</p>
                </div>
              )}
            </>
          )}

          {rawData.languages && (
            <div style={styles.languages}>
              <img src={Images.consultLanguage} style={styles.consultLanguage} alt="Languages" />
              <p style={styles.slotRange}>
                {rawData.languages.length > 2
                  ? `${rawData.languages[0]}, ${rawData.languages[1]} +${rawData.languages.length - 2}`
                  : rawData.languages.join(', ')}
              </p>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (doctorRequest === 0) {
                onPressBookNow(rawData);
              } else {
                onPressRequest(rawData);
              }
            }}
            style={styles.bookButton}
          >
            {doctorRequest === 0 ? 'Book Now' : 'Request'}
          </button>
        </div>
      ) : (
        <div style={styles.detailsSection}>
          <p style={styles.availableTimeHeading}>Available for</p>
          {rawData.offline_slot_range && (
            <div style={styles.slotInfo}>
              <img src={Images.doctorHome} style={styles.doctorHome} alt="Hospital visit" />
              <p style={styles.hospitalVisit}>Hospital visit</p>
              <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Time" />
              <p style={styles.slotRange}>{convertTimeFormat(rawData.offline_slot_range.slot_range)}</p>
            </div>
          )}
          {rawData.online_slot_range && (
            <div style={styles.slotInfo}>
              <img src={Images.consultVideo} style={styles.doctorHome} alt="Video consultation" />
              <p style={styles.hospitalVisit}>Video consultation</p>
              <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Time" />
              <p style={styles.slotRange}>{convertTimeFormat(rawData.online_slot_range.slot_range)}</p>
            </div>
          )}
          {rawData.languages && (
            <div style={styles.languages}>
              <img src={Images.consultLanguage} style={styles.consultLanguage} alt="Languages" />
              <p style={styles.slotRange}>
                {rawData.languages.length > 2
                  ? `${rawData.languages[0]}, ${rawData.languages[1]} +${rawData.languages.length - 2}`
                  : rawData.languages.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
