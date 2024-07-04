import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToPayCardStyles';

const ToPayCard = ({ amount = '', paid = false }) => {
  return (
    <div style={styles.toPayCard}>
      <p style={styles.amountText}>
        {paid ? 'Paid' : 'To pay'}
      </p>
      <p style={styles.amountText}>
        Rs. {amount}
      </p>
    </div>
  );
};

ToPayCard.propTypes = {
  amount: PropTypes.string,
  paid: PropTypes.bool,
};

export default ToPayCard;
