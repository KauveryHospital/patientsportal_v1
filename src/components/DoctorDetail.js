import React from 'react';
import styles from './Ddetail.styles'; // Adjust the path according to your project structure
import COLORS from '../constants/Theme';
import Images from '../constants/Images';
import Vector from '../constants/Vector';

const DoctorProfile = ({ UserImage, item, slot_range, userLevel = "2", request = false, reSchedule = false }) => {
  console.log('image', UserImage);
  console.log('list', item);
  return (
    <div style={{ ...styles.container1, backgroundColor: request ? "#FFF7E4" : COLORS.secondaryColor }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img
          src={
            UserImage == null || UserImage === ''
              ? Images.profileEmptyImage
              : UserImage
          }
          alt="Profile"
          style={{ ...styles.profileImageBefore, backgroundColor: '#E6E9EE' }}
        />
        <div style={{ width: '12px', height: '12px' }} />
        <div>
          <p
            style={{
              ...styles.name,
              marginRight: '50px',
              paddingRight: '50px',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {item?.first_name === undefined ? '-' : `${item?.first_name}`}
          </p>
          <div style={{ height: '7px' }} />
          <div style={styles.description}>
            <p style={{ ...styles.gender, marginRight: '100px' }} numberoflines={2}>
              {item.default_specialization}
            </p>
          </div>
          <div style={{ height: '20px' }} />
          <div>
            {slot_range !== null && (
              <div>
                {reSchedule ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {Vector.Clock}
                    <div style={{ width: '4px' }} />
                    <p style={styles.timeText}>{slot_range}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {Vector.Clock}
                    <div style={{ width: '4px' }} />
                    <p style={styles.timeText}>{slot_range}</p>
                  </div>
                )}
              </div>
            )}
            <div style={{ height: '7px' }} />
            {item?.languages && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img
                  src={Images.language}
                  alt="Language"
                  style={styles.alarmIcon}
                />
                <div style={{ width: '4px' }} />
                <p style={styles.timeText}>{item?.languages?.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
