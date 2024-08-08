import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DropDownStyles';
import { COLORS } from '../../constants/Theme';

const DropDownField = ({
  is_error = false,
  errorText = '',
  fieldTitle = '',
  placeholder = '',
  dropDownData = [],
  onGetValue,
  onGetItem = () => {},
  selectedValue = '',
  onPressDropDown,
  refRB,
  closeModal,
  type = 1,
  onPressAddFamilyMember,
  familyMemberTitle = 'Family members',
  subTitleShown = true
}) => {
  const [open, setOpen] = useState(false);

  const onDropDownSelect = (item, index) => {
    dropDownData.map((it, ind) => {
      if (ind === index) {
        closeModal();
        setOpen(false);
        onGetItem(it);
        return it;
      } else {
        return it;
      }
    });
  };

  const ItemSeparatorComponent = () => {
    return <div style={styles(is_error).itemSeparator} />;
  };

  const dropDownListView = (item, index) => {
    return (
      <button
        style={styles(is_error).dropDownListCard}
        onClick={() => onDropDownSelect(item, index)}
      >
        <p style={styles(is_error).dropDownTitle}>{type === 3 ? item : item.name}</p>
        {type === 2 && <p style={styles(is_error).dropDownSubTitle}>{item.relationship}</p>}
      </button>
    );
  };

  return (
    <div>
      <div style={styles(is_error).parentContainer}>
        <button
          style={styles(is_error).container2}
          onClick={() => {
            onPressDropDown();
            setOpen(true);
          }}
        >
          <div style={styles(is_error).fieldTitleContainer}>
            <p style={styles(is_error).fieldTitle}>{fieldTitle}</p>
          </div>
          <div style={styles(is_error).dateInputContainer}>
            <p
              style={{
                ...styles(is_error).dateText,
                color: selectedValue !== '' ? COLORS.textColor : is_error ? COLORS.errorColor : COLORS.placeholderColor,
              }}
            >
              {selectedValue !== '' ? selectedValue : placeholder}
            </p>
          </div>
          <div style={styles(is_error).calendarIconView}>
            {open ? '▲' : '▼'}
          </div>
        </button>
        {is_error && <p style={styles(is_error).errorText}>Note: {errorText}</p>}
      </div>
      {open && (
        <div style={styles(is_error).modalOverlay}>
          <div style={styles(is_error).modalContent}>
            <p style={styles(is_error).dropDownHeading}>{familyMemberTitle}</p>
            {subTitleShown && <p style={styles(is_error).dropDownSubHeading}>{type === 2 ? 'Select profiles to switch' : 'Select your relationship'}</p>}
            <div style={styles(is_error).flatlist}>
              {dropDownData.map((item, index) => (
                <div key={index}>
                  {dropDownListView(item, index)}
                  {ItemSeparatorComponent()}
                </div>
              ))}
              {type === 2 && (
                <button onClick={onPressAddFamilyMember} style={styles(is_error).addFamilyBtn}>
                  <span style={{ fontSize: 18, color: COLORS.primaryColor }}>+</span>
                  <p style={styles(is_error).addFamilyText}>Add family members</p>
                </button>
              )}
            </div>
            <button onClick={() => { closeModal(); setOpen(false); }} style={styles(is_error).closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

DropDownField.propTypes = {
  is_error: PropTypes.bool,
  errorText: PropTypes.string,
  fieldTitle: PropTypes.string,
  placeholder: PropTypes.string,
  dropDownData: PropTypes.array.isRequired,
  onGetValue: PropTypes.func.isRequired,
  onGetItem: PropTypes.func,
  selectedValue: PropTypes.string,
  onPressDropDown: PropTypes.func.isRequired,
  refRB: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.number,
  onPressAddFamilyMember: PropTypes.func.isRequired,
  familyMemberTitle: PropTypes.string,
  subTitleShown: PropTypes.bool
};

export default DropDownField;
