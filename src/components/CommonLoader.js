import React from 'react';

const CommonLoader = ({ loading }) => {
  const loaderStyles = {
    modalBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: loading ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activityIndicator: {
      borderWidth: 4,
      borderColor: '#f3f3f3',
      borderTopColor: '#3498db',
      borderRadius: '50%',
      width: 30,
      height: 30,
      animationName: 'spin',
      animationDuration: '2s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  };

  return (
    <div style={loaderStyles.modalBackground}>
      <div style={loaderStyles.activityIndicatorWrapper}>
        <div style={loaderStyles.activityIndicator}></div>
      </div>
    </div>
  );
};

export default CommonLoader;