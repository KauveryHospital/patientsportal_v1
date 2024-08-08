
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COLORS } from '../constants/Theme';

const dimensions = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const scale = dimensions.width / 320; 

const font_size = size => {
  const newSize = size * scale;
  return Math.round(newSize) - (window.navigator.userAgent.includes('Mobile') ? 2 : 0);
};

const bytesToMb = (bytes) => {
  // 1 MB = 1024 * 1024 bytes
  return bytes/1000000;
}

const lineHeight = fontSize => {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return parseInt(fontSize + fontSize * multiplier, 10);
};

const dimen_size_height = size => {
  return (dimensions.height / 100) * size;
};

const dimen_size_width = size => {
  return (dimensions.width / 100) * size;
};

const isTrim = text => {
  return text.trimStart();
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// const allowNumOnly = num => {
//   return num.replace(/[^0-9]/g, '');
// };

const allowNumOnly = num => {
  return String(num).replace(/[^0-9]/g, '');
};

const allowOnlyLetter = letter => {
  return letter.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
};

const formatString = str => {
  if (typeof str !== 'string') {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatDateTime = (dateString, timeString) => {
  const formattedDate = moment(dateString).format('dddd, MMM D[th]');
  const formattedTime = moment(timeString, 'HH:mm:ss').format('h:mm A');
  return `${formattedDate}, ${formattedTime}`;
};

const formatDate = dateString => {
  const formattedDate = moment(dateString).format('dddd, MMM D[th]');
  return formattedDate;
};

const convertTimeFormat = timeString => {
  const [startTime, endTime] = timeString.split(' - ');
  const formattedStartTime = moment(startTime, 'HH:mm').format('hh:mma').toUpperCase();
  const formattedEndTime = moment(endTime, 'HH:mm').format('hh:mma').toUpperCase();
  return `${formattedStartTime} - ${formattedEndTime}`;
};

const allowFloatDigitOnly = letter => {
  return letter.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
};

const numericOnly = value => {
  var num = /^[0-9]+$/;
  return num.test(value);
};

const passWordValidation = pass => {
  var regularExpression = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );
  return regularExpression.test(pass);
};

const validURL = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!pattern.test(str);
};

const snackBar = (txt, color = COLORS.blackColor) => {
  toast(txt, { autoClose: 6000, type: 'default' }); // Use toast for notifications
};

const restrictSpecialCharacter = text => {
  return text.replace(/[`~!@#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
};

const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function(item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

const validatePhoneno = data => {
  return data.replace(/\D/g, '');
};

const removeItemValue = async key => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

function isResponseIsValid(response) {
  if (response.status === 200 || response.status === 201) {
    return true;
  } else {
    return false;
  }
}

function isResponseCheck204(response) {
  if (response.status === 200 || response.status === 204) {
    return true;
  } else {
    return false;
  }
}

function isIphoneX() {
  return (
    window.matchMedia('(max-width: 480px) and (max-height: 844px)').matches ||
    window.matchMedia('(max-width: 844px) and (max-height: 480px)').matches
  );
}

export {
  dimen_size_height,
  dimen_size_width,
  validateEmail,
  allowNumOnly,
  isIphoneX,
  validatePhoneno,
  isResponseIsValid,
  font_size,
  lineHeight,
  allowOnlyLetter,
  isTrim,
  // getDateToString,
  numericOnly,
  passWordValidation,
  validURL,
  allowFloatDigitOnly,
  nFormatter,
  restrictSpecialCharacter,
  formatDateTime,
  formatDate,
  isResponseCheck204,
  formatString,
  snackBar,
  removeItemValue,
  convertTimeFormat,
  bytesToMb
};
