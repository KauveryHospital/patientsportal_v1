import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Images from '../constants/Images';
import styles from './card.styles';
import { convertTimeFormat } from '../utils/helpers';

const DoctorCard = ({
  rawData,
  onPress,
  onPressBookNow,
  onPressRequest,
  statusRequest = false,
  doctorRequest = 0,
}) => {
  return (
    <Card style={statusRequest ? styles.doctorCardContainerFullScreen : styles.doctorCardContainer} onClick={() => onPress(rawData)}>
      <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={styles.imgView}>
          <img
            src={rawData.photo === null || rawData.photo === '' ? Images.profileEmptyImage : rawData.photo}
            style={styles.profileIcon}
            alt="Doctor"
          />
        </div>
        <div style={{ marginLeft: 12, flex: 1 }}>
          <Card.Title style={styles.name}>{rawData.first_name} {rawData.last_name}</Card.Title>
          <Card.Subtitle style={styles.doctorDesignation}>{rawData.default_specialization}</Card.Subtitle>
        </div>
      </Card.Body>
      {statusRequest && (
        <Card.Body>
          <Card.Text style={styles.hospitalVisit}>
            {doctorRequest === 0 
              ? 'This doctor is available on request only.' 
              : (rawData.offline_slot_range === null && rawData.online_slot_range === null)
                ? 'Unavailable for today, please look for other dates.'
                : 'Available for'
            }
          </Card.Text>
          {rawData.offline_slot_range && doctorRequest === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Images.doctorHome} style={styles.doctorHome} alt="Hospital Visit" />
                <Card.Text style={styles.hospitalVisit}>Hospital visit</Card.Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Consult Alarm" />
                <Card.Text style={styles.slotRange}>{convertTimeFormat(rawData.offline_slot_range.slot_range)}</Card.Text>
              </div>
            </div>
          )}
          {rawData.online_slot_range && doctorRequest === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Images.consultVideo} style={styles.doctorHome} alt="Video Consultation" />
                <Card.Text style={styles.hospitalVisit}>Video consultation</Card.Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Images.consultAlarm} style={styles.consultAlarm} alt="Consult Alarm" />
                <Card.Text style={styles.slotRange}>{convertTimeFormat(rawData.online_slot_range.slot_range)}</Card.Text>
              </div>
            </div>
          )}
          {rawData.languages && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img src={Images.consultLanguage} style={styles.consultLanguage} alt="Languages" />
              <Card.Text style={styles.slotRange}>
                {rawData.languages.length > 2
                  ? `${rawData.languages[0]},${rawData.languages[1]} +${rawData.languages.length - 2}`
                  : rawData.languages.toString()}
              </Card.Text>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant={doctorRequest === 0 ? 'primary' : 'warning'}
              onClick={() => (doctorRequest === 0 ? onPressBookNow(rawData) : onPressRequest(rawData))}
            >
              {doctorRequest === 0 ? 'Book Now' : 'Request'}
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default DoctorCard;
