import React from 'react';
import './card.styles'; // Assuming you have the styles defined in a CSS file
import { formatDateTime } from '../utils/helpers';
import Images from '../constants/Images'; // Adjust the import as necessary
import Vector from '../constants/Vector'; // Adjust the import as necessary

const DoctorProfileWithAddress = ({
  UserImage,
  item,
  consultType = 'Offline',
  slotData,
  slotDetails,
  reschedule = false,
  reschedule1 = false,
  slotInfo = false,
  slot_range = '',
  slotStartTime,
}) => {
  console.log("MHC12", item);
  return (
    <div className="docProfileContainer">
      <div className="profileImageContainer">
        <div className="profileImageView">
          <img
            src={UserImage == null || UserImage === '' ? Images.profileEmptyImage : UserImage}
            alt="Doctor"
            className="profileImageBefore"
          />
        </div>
        <div className="profileTextView">
          <p className="name" title={item?.first_name || '-'}>
            {item?.first_name === undefined ? '-' : item?.first_name}
          </p>
          {item?.designation && (
            <p className="designation_2" title={item?.designation.join(', ')}>
              {item?.designation.join(', ')}
            </p>
          )}
          <p className="designation" title={item?.default_specialization}>
            {item?.default_specialization}
          </p>
          {item?.available_time !== '' && (
            <div>
              {reschedule1 ? (
                <div className="timeView">
                  {Vector.Clock}
                  <p className="rangeText">{slot_range}</p>
                </div>
              ) : (
                <div className="timeView">
                  {Vector.Clock}
                  <p className="rangeText">{item?.slot_range}</p>
                </div>
              )}
            </div>
          )}
          {item?.languages && (
            <div className="timeView2">
              <img
                src={Images.language}
                alt="Language"
                className="alarmIcon2"
              />
              <p className="timeText">{item?.languages.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      <div className="profileDetailsView">
        <p className="onlineText" title={consultType == 'Online' ? 'Video consultation' : 'Hospital visit'}>
          {consultType == 'Online' ? 'Video consultation' : 'Hospital visit'}
        </p>
        <p className="dayText" title={formatDateTime(slotDetails?.slot_date, reschedule ? slotDetails?.slot_time : slotInfo ? slotStartTime : slotStartTime)}>
          {formatDateTime(slotDetails?.slot_date, reschedule ? slotDetails?.slot_time : slotInfo ? slotStartTime : slotStartTime)}
        </p>
      </div>
      {consultType == 'Offline' && (
        <div className="locationView">
          <img
            src={Images.distance}
            alt="Location"
            className="locationIcon"
          />
          <div className="locationTextView">
            <p className="cityText" title={reschedule ? slotData?.name : slotInfo ? slotData?.name : slotData?.unit_data?.name}>
              {reschedule ? slotData?.name : slotInfo ? slotData?.name : slotData?.unit_data?.name}
            </p>
            <p className="address" title={reschedule ? slotData?.address : slotInfo ? slotData?.address : slotData?.unit_data?.address}>
              {reschedule ? slotData?.address : slotInfo ? slotData?.address : slotData?.unit_data?.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfileWithAddress;
