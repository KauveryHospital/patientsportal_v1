import React from 'react';
import styles from './card.styles';
import { formatDate, formatDateTime } from '../utils/helpers';

export const EventCard = ({
  consultType = 'Offline',
  onPressReschedule,
  item,
  disabled = false,
  onPressJoinNow,
  backgroundColor,
  color,
  onPressEventCard,
}) => {
  return (
    <div
      style={styles.eventCard}
      onClick={() => onPressEventCard(item)}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.eventCardHover.boxShadow}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
      disabled={item?.ui_booking_status !== "Active"}
    >
      <div style={styles.eventCardView1}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={styles.eventTitleView}>
            <span style={styles.eventTitle} title={consultType == 'Offline' ? 'Hospital Visit' : 'Video consultation'}>
              {consultType === 'Offline' ? 'Hospital Visit' : 'Video consultation'}
            </span>
            <span style={styles.dayText}>
              {`${formatDate(item?.slot_details[0]?.slot_date)}, ${item?.slot_details[0]?.slot_start_time?.toUpperCase()}`}
            </span>
          </div>
          <div style={styles.eventStatusView}>
            <div
              style={{
                ...styles.statusButton,
                backgroundColor: backgroundColor,
              }}
            >
              <span
                style={{
                  ...styles.statusText,
                  color: color,
                }}
              >
                {item?.ui_booking_status}
              </span>
            </div>
          </div>
        </div>
        {consultType === 'Offline' && (
          <div style={styles.eventCardView2}>
            <div style={styles.locationView}>
              <img
                src="path-to-your-distance-icon" // replace with your actual image path
                alt="distance"
                style={styles.locationIcon}
              />
              <div style={styles.locationTextView}>
                <span style={styles.cityText}>
                  {item?.slot_details[0]?.unit_details?.unit_name}
                </span>
                <span style={styles.address}>
                  {item?.slot_details[0]?.unit_details?.address}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={styles.eventCardView3}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={styles.textView}>
            <span style={styles.docNameText}>
              {`${item?.slot_details[0]?.doctor_name}`}
            </span>
            <div>
              <span style={styles.patientText}>Patient: </span>
              <span style={styles.patientText2}>{item?.patient_name}</span>
            </div>
          </div>
          <div
            style={{
              ...styles.joinNowView,
              justifyContent: item.is_reschedule ? 'flex-start' : 'flex-end',
            }}
          >
            <button
              onClick={() => onPressJoinNow(item)}
              disabled={disabled}
              style={{
                ...styles.joinNowButton,
                backgroundColor: disabled ? '#EAD3E1' : '#007bff', // replace with your primary color
              }}
            >
              <span style={styles.joinNowText}>Join Now</span>
            </button>
            {item.is_reschedule && (
              <button
                style={styles.rescheduleButton}
                onClick={() => onPressReschedule(item)}
              >
                <span style={styles.rescheduleButtonText}>Reschedule</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


