import React from 'react';
import Images from '../../constants/Images';
import styles from './SegmentControl.styles';

const DoctorSlotSegment = ({
  title1,
  title2,
  isActive1 = true,
  isActive2 = false,
  onPressAccounts,
  onPressFamily,
}) => {
  return (
    <div className={styles.parentContainer}>
      <button onClick={onPressAccounts} style={styles(isActive1, isActive2).buttonTouchStyle}>
        <img src={isActive1 === true ? Images.home_health_selected : Images.home_health_unselected} style={styles().icon} alt="Icon" />
        <p style={[styles(isActive1, isActive2).titleStyle, { fontSize: 14 }]}>{title1}</p>
      </button>
      <button onClick={onPressFamily} style={styles(isActive1, isActive2).buttonTouchStyle1}>
        <img src={isActive2 === true ? Images.video_call_selected : Images.video_call_unselected} style={styles().icon} alt="Icon" />
        <p style={[styles(isActive1, isActive2).titleStyle1, { fontSize: 14 }]}>{title2}</p>
      </button>
    </div>
  );
};

export default DoctorSlotSegment;
