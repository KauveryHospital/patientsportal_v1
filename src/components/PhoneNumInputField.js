import React from 'react';
import { COLORS } from '../constants/Theme';
import { auth_content } from '../constants/strings';
import Images from '../constants/Images';
import { dimen_size_height } from '../utils/helpers';

const styles = is_error => ({   
  parentContainer: {
    padding: '10px 16px',
    position: 'relative',
    height: dimen_size_height(11.7),
  },
  container: {
    border: is_error ? `1px solid ${COLORS.errorColor}` : `1px solid ${COLORS.borderColor}`,
    padding: '10px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  flagContainer: {
    marginRight: '5px',
  },
  flagImage: {
    width: '22px',
    height: '23px',
    objectFit: 'contain',
  },
  fieldTitleContainer: {
    position: 'absolute',
    marginLeft: '7px',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: '0 3px',
    marginTop: '10px',
    top: dimen_size_height(-1.9),
  },
  fieldTitle: {
    color: COLORS.textColor,
    fontSize: '12px',
  },
  prefix: {
    color: COLORS.textColor,
    fontSize: '12px',
    marginRight: '5px',
  },
  textInput: {
    flex: 1,
    textAlign: 'left',
    color: is_error ? COLORS.errorColor : COLORS.textColor,
    fontSize: '12px',
    border: 'none',
    outline: 'none',
  },
  errorText: {
    color: COLORS.errorColor,
    fontSize: '11px',
    marginTop: '5px',
  },
});

export const PhoneNumInputField = ({
  is_error = false,
  fieldTitle = '',
  handleInputChange,
  value = '',
  placeholder,
  maxLength = 200,
  secureTextEntry = false,
  editable = true,
  errorText = '',
  key = 0,
}) => {
  const inputStyles = styles(is_error);
  return (
    <div style={inputStyles.parentContainer}>
      <div style={inputStyles.container}>
        <div style={inputStyles.flagContainer}>
          <img
            src={Images.indianFlag} // Use appropriate image source
            alt="Flag"
            style={inputStyles.flagImage}
          />
        </div>
        <div style={inputStyles.fieldTitleContainer}>
          <span style={inputStyles.fieldTitle}>{fieldTitle}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={inputStyles.prefix}>{auth_content.countryCode}</span>
          <input
            style={inputStyles.textInput}
            type="tel"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholderTextColor={COLORS.placeholderColor}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={!editable}
            key={key}
          />
        </div>
      </div>
      {is_error && <span style={inputStyles.errorText}>Note: {errorText}</span>}
    </div>
  );
};

