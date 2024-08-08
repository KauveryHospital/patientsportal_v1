import React from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FastImage from 'react-fast-image';
import { formatDate, formatDateTime } from 'path-to-your-helpers';
import { COLORS } from '../constants/Theme';
import Images from '../constants/Images';

const useStyles = styled({
  cardShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  },
  eventCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  eventCardView1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '16px',
  },
  eventIcon: {
    width: '40px',
    height: '40px',
  },
  eventTitleView: {
    flex: 1,
    marginLeft: '16px',
  },
  eventTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: '14px',
    color: '#888',
  },
  eventStatusView: {
    display: 'flex',
    alignItems: 'center',
  },
  statusButton: {
    padding: '4px 8px',
    borderRadius: '4px',
  },
  statusText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  eventCardView2: {
    padding: '0 16px 16px',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: '20px',
    height: '20px',
  },
  locationTextView: {
    marginLeft: '8px',
  },
  cityText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  address: {
    fontSize: '12px',
    color: '#888',
  },
  eventCardView3: {
    padding: '16px',
  },
  textView: {
    display: 'flex',
    flexDirection: 'column',
  },
  docNameText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  patientText: {
    fontSize: '12px',
    color: '#888',
  },
  patientText2: {
    fontSize: '12px',
    color: COLORS.textColor,
  },
  joinNowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinNowButton: {
    padding: '8px 16px',
    borderRadius: '4px',
  },
  joinNowText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  rescheduleButton: {
    marginLeft: '8px',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#ddd',
  },
  rescheduleButtonText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
});

const EventCard = ({
  consultType = 'Offline',
  onPressReschedule,
  item,
  disabled = false,
  onPressJoinNow,
  backgroundColor,
  color,
  onPressEventCard,
}) => {
  const styles = useStyles();

  return (
    <Card className={styles.cardShadow} onClick={() => onPressEventCard(item)} disabled={item?.ui_booking_status !== 'Active'}>
      <Box className={styles.eventCard}>
        <Box className={styles.eventCardView1}>
          <FastImage
            src={
              consultType === 'Offline'
                ? Images.EventHospitalVisitIcon
                : consultType === 'mhc'
                ? Images.EventHealthCheckupIcon
                : Images.EventVideoConsultantIcon
            }
            className={styles.eventIcon}
          />
          <Box className={styles.eventTitleView}>
            <Typography className={styles.eventTitle}>
              {consultType === 'Offline'
                ? 'Hospital visit'
                : consultType === 'mhc'
                ? 'Health checkup'
                : 'Video consultation'}
            </Typography>
            <Typography className={styles.dayText}>
              {consultType === 'mhc'
                ? formatDate(item?.slot_details[0]?.slot_date)
                : `${formatDate(item?.slot_details[0]?.slot_date)}, ${item?.slot_details[0]?.slot_start_time?.toUpperCase()}`}
            </Typography>
          </Box>
          <Box className={styles.eventStatusView}>
            <Box className={styles.statusButton} style={{ backgroundColor }}>
              <Typography className={styles.statusText} style={{ color }}>
                {item?.ui_booking_status}
              </Typography>
            </Box>
          </Box>
        </Box>
        {(consultType === 'Offline' || consultType === 'mhc') && (
          <Box className={styles.eventCardView2}>
            <Box className={styles.locationView}>
              <FastImage src={Images.distance} className={styles.locationIcon} />
              <Box className={styles.locationTextView}>
                <Typography className={styles.cityText}>
                  {item?.slot_details[0]?.unit_details?.unit_name}
                </Typography>
                <Typography className={styles.address}>
                  {item?.slot_details[0]?.unit_details?.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Box className={styles.eventCardView3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box className={styles.textView}>
              <Typography className={styles.docNameText}>
                {consultType === 'mhc' ? item?.package_name : item?.slot_details[0]?.doctor_name}
              </Typography>
              <Typography>
                <Typography component="span" className={styles.patientText}>Patient: </Typography>
                <Typography component="span" className={styles.patientText2}>{item?.patient_name}</Typography>
              </Typography>
            </Box>
            <Box className={styles.joinNowView}>
              {consultType !== 'mhc' && (
                <Button
                  onClick={() => onPressJoinNow(item)}
                  disabled={disabled}
                  className={styles.joinNowButton}
                  style={{ backgroundColor: disabled ? '#EAD3E1' : COLORS.primaryColor }}
                >
                  <Typography className={styles.joinNowText}>Join Now</Typography>
                </Button>
              )}
              {item.is_reschedule && (
                <Button onClick={() => onPressReschedule(item)} className={styles.rescheduleButton}>
                  <Typography className={styles.rescheduleButtonText}>Reschedule</Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default EventCard;
