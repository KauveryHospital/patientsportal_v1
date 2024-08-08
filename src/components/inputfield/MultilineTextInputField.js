import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.styles';

const MultilineTextInputField = ({
  is_error = false,
  fieldTitle = '',
  handleInputChange,
  value = '',
  placeholder,
  maxLength = 200,
  secureTextEntry = false,
  editable = true,
  errorText = '',
  autoFocus = false,
  noteText = true,
}) => {
  const screenInches = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 72;
  const isSmallScreen = screenInches >= 4.7 && screenInches <= 5.3;
  const dynamicStyles = styles(is_error, noteText, isSmallScreen);

  return (
    <div style={dynamicStyles.textFieldContainer}>
      <div style={dynamicStyles.fieldTitleContainer}>
        <label style={dynamicStyles.fieldTitle}>{fieldTitle}</label>
      </div>
      <div style={dynamicStyles.textInputContainer}>
        <textarea
          style={{
            ...dynamicStyles.textInput,
            ...(value !== '' ? dynamicStyles.textInputNotEmpty : {}),
          }}
          type={secureTextEntry ? 'password' : 'text'}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          autoFocus={autoFocus}
          disabled={!editable}
        />
      </div>
      {noteText && <p style={dynamicStyles.desText}>Maximum 500 characters.</p>}
      {is_error && <p style={dynamicStyles.errorText}>Note: {errorText}</p>}
    </div>
  );
};

MultilineTextInputField.propTypes = {
  is_error: PropTypes.bool,
  fieldTitle: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
  errorText: PropTypes.string,
  autoFocus: PropTypes.bool,
  noteText: PropTypes.bool,
};

export default MultilineTextInputField;
