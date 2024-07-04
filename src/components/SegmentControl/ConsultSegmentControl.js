import React from 'react';
import { COLORS } from '../../constants/Theme';
import Images from '../../constants/Images';
import styles from './SegmentControl.styles';

const ConsultSegmatControl = ({ titles, onPressFocusTab, onGetItem, flatListRef }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: COLORS.whiteColor }}>
      <img
        src={Images.distance}
        alt="distance"
        style={styles.consultDistance} 
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {titles.map((item, index) => (
          <div
            key={index}
            onClick={() => onPressFocusTab(item, index)}
            style={[
              styles.consultButtonTouchStyle,
              { borderBottomColor: item.is_focused ? '#972168' : 'lightgray' },
            ]}
          >
            <span
              style={[
                styles.consultTitleStyle1,
                {
                  color: item.is_focused ? COLORS.primaryColor : COLORS.placeholderColor,
                },
              ]}
            >
              {item.display_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultSegmatControl;
