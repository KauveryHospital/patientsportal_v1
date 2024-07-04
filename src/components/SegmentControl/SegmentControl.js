import React from 'react';
import styles from './SegmentControl.styles';

const SegmentControl = ({
  title1,
  title2,
  isActive1 = true,
  isActive2 = false,
  onPressAccounts,
  onPressFamily,
}) => {
  return (
    <div className={styles().parentContainer}>
      <button onClick={onPressAccounts} className={styles(isActive1, isActive2).buttonTouchStyle}>
        {title1}
      </button>
      <button onClick={onPressFamily} className={styles(isActive1, isActive2).buttonTouchStyle1}>
        {title2}
      </button>
    </div>
  );
};

export default SegmentControl;
