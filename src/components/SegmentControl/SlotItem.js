import React from 'react';
import moment from 'moment';
import styles from './SlotItem.styles'; 
import COLORS from '../../constants/Theme'; 
import Images from '../../constants/Images';

const SlotItem = ({ item, onPressTag, slotIndex }) => {
  const slotRenderItem = (slot, index) => (
    <button
      onClick={() => {
        onPressTag(slot, slotIndex, index);
        console.log(slot, slotIndex, index, 'ITEM SLOT');
      }}
      style={{
        ...styles.slotItem,
        backgroundColor: slot.is_selected ? '#FFDFF3' : COLORS.whiteColor,
        borderColor: slot.is_selected ? '#FFDFF3' : COLORS.borderColor,
        borderWidth: slot.is_selected ? '0px' : '1px',
        borderStyle: 'solid',
      }}
    >
      <span style={{ ...styles.slotItemText }}>
        {moment(slot.slot_start_time, 'HH:mm:ss').format('hh:mm A')}
      </span>
    </button>
  );

  return (
    <div style={styles.parentContainer}>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '12px' }}>
        <div style={{ flex: '0.1' }}>
          <img
            src={Images.address} // Adjust the path according to your project structure
            alt="Address"
            style={styles.addressIcon}
          />
        </div>
        <div style={{ flex: '0.9' }}>
          <p style={{ ...styles.name, margin: '8px 0' }}>{item.unit_data.name}</p>
          <p style={styles.addressText}>{item.unit_data.address}</p>
        </div>
      </div>
      <p style={styles.availableSlots}>Available Slots</p>
      <div style={styles.slotContainer}>
        {item.doctor_slots_data[0].timings.map((slot, index) => (
          <div key={index} style={styles.slotWrapper}>
            {slotRenderItem(slot, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotItem;
