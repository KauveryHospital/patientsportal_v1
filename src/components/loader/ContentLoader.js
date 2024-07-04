import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core'; // Using Material-UI for modal implementation
import { CircularProgress } from '@material-ui/core'; // Using Material-UI for loader
import { makeStyles } from '@material-ui/core/styles';
import { COLORS, Fonts } from '../../constants/Theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: COLORS.whiteColor,
  },
  loaderView: {
    marginBottom: '20px',
  },
  contentView: {
    paddingHorizontal: '40px',
    alignItems: 'center',
    marginTop: '15px',
  },
  contentText: {
    fontSize: '14px',
    color: COLORS.textColor,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    lineHeight: '24px',
    textAlign: 'center',
  },
  titleText: {
    fontSize: '23px',
    color: COLORS.textColor,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'center',
    marginBottom: '13px',
  },
}));

const ContentLoader = ({ loading, content = '', title = '' }) => {
  const classes = useStyles();

  return (
    <Modal open={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={classes.container}>
        <div className={classes.loaderView}>
          <CircularProgress color="primary" />
        </div>
        <div className={classes.contentView}>
          {title && <span className={classes.titleText}>{title}</span>}
          <span className={classes.contentText}>{content}</span>
        </div>
      </div>
    </Modal>
  );
};

ContentLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  content: PropTypes.string,
  title: PropTypes.string,
};

export default ContentLoader;
