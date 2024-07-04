import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
// import styles from './card.styles';
import { COLORS } from '../constants/Theme';
import Images from '../constants/Images';
import CommonButton from '../components/CommonButton';
import ToPayCard from './ToPayCard';
import DoctorProfile from '../components/DoctorDetail';
import {
    doctorDetails,
    slotSelectionApiBook,
} from '../utils/apiCalls';
import {
    consultMode,
    doctorDetailsItem,
    slotAddress,
    slotAmount,
    slotDetails,
    slotStartTime,
} from '../store/actions/bookingActions';
import DoctorSlotSegment from './SegmentControl/DoctorSlotSegment';
import SlotItem from './SegmentControl/SlotItem';
import { isResponseIsValid } from '../utils/helpers';
import './ConsultSlotBooking.css';

const styles = {
    datePickerContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    dateText: {
      marginRight: '10px',
    },
    calendarIconContainer: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    calendarIcon: {
      width: '24px',
      height: '24px',
    },
  };

const ConsultSlotBooking = () => {
    const dispatch = useDispatch();
    const [dataList, setDataList] = useState({});
    const [dataList1, setDataList1] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [page, setPage] = useState('1');
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [listVideo, setListVideo] = useState([]);
    const [consulting_slot, setConsulting_slot] = useState([]);
    const [consulting_video_slot, setConsulting_video_slot] = useState([]);
    const [consulting_video_response, setConsulting_video_response] = useState([]);
    const [rupees, setRupees] = useState('0.00');
    const location = useLocation();
    const data = location.state;
    const doctor_id = data.doctor_id;
    const slotCondition = data.slotCondition;
    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedVideoDate, setSelectedVideoDate] = useState(new Date());
    const [slotItemData, setSlotItemData] = useState({});
    const bottomSheetRef = useRef();
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const [slot_range, setSlot_range] = useState('');
    const [slot_rangeVideo, setSlot_rangeVideo] = useState('');
    const [popupLoading, setPopupLoading] = useState(false);
    const [onSelectedDate, setOnSelectedDate] = useState(new Date());
    const [onSelectedVideoDate, setOnSelectedVideoDate] = useState(new Date());
    const [pages, setPages] = useState(1);
    const [page_size, setPage_size] = useState(100);
    const [next_page, setNext_page] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 60);

    useEffect(() => {
        getWeeks(new Date());
        getVideoWeeks(new Date());
        onCallApi(new Date(), true, 1);
    }, []);

    const getWeeks = (date) => {
        const nextSevenDays = [];
        for (let i = 0; i < 7; i++) {
            const day = moment(date).add(i, 'days');
            const formattedDate = day.format('YYYY-MM-DD');
            const dayOfWeek = day.format('ddd');
            const isSelected = i === 0;
            const isCurrentDate = i === 0;
            nextSevenDays.push({
                date: day.format('DD'),
                day: dayOfWeek,
                onDate: formattedDate,
                isSelected: isSelected,
                isCurrentDate: isCurrentDate,
            });
        }
        setList(nextSevenDays);
    };

    const getVideoWeeks = (date) => {
        const nextSevenDays = [];
        for (let i = 0; i < 7; i++) {
            const day = moment(date).add(i, 'days');
            const formattedDate = day.format('YYYY-MM-DD');
            const dayOfWeek = day.format('ddd');
            const isSelected = i === 0;
            const isCurrentDate = i === 0;
            nextSevenDays.push({
                date: day.format('DD'),
                day: dayOfWeek,
                onDate: formattedDate,
                isSelected: isSelected,
                isCurrentDate: isCurrentDate,
            });
        }
        setListVideo(nextSevenDays);
    };

    const onCallApi = async (date, isLoading = true, initialLoader) => {
        setLoader(isLoading);
        const sd = moment(date).format('YYYY-MM-DD');
        setOnSelectedDate(sd);
        setPopupLoading(isLoading);
        try {
            const body = {
                doctor_id: doctor_id,
                slot_type: 'Offline',
                date: sd,
            };
            const response = await slotSelectionApiBook(body, pages, page_size);
            if (isResponseIsValid(response)) {
                const rp = response.data.data;
                setDataList(rp);
                setSlot_range(response.data.data.slot_range);
                const consulting_slot = response.data.data.consulting_slot;
                setConsulting_slot(consulting_slot);
                if (initialLoader === 1) {
                    onCallVideoApi(new Date());
                } else {
                    setTimeout(() => {
                        setPopupLoading(false);
                    }, 500);
                }
                setLoadingData(false);
            } else {
                setConsulting_slot([]);
                setTimeout(() => {
                    setPopupLoading(false);
                }, 500);
            }
        } catch (error) {
            console.log('slot api error-1', error);
        }
    };

    const onCallVideoApi = async (date, isLoading = true) => {
        const sd = moment(date).format('YYYY-MM-DD');
        setOnSelectedVideoDate(sd);
        setPopupLoading(isLoading);
        try {
            const body = {
                doctor_id: doctor_id,
                slot_type: 'Online',
                date: sd,
            };
            const response = await slotSelectionApiBook(body, pages, 1);
            if (isResponseIsValid(response)) {
                const rp = response.data.data;
                setDataList1(rp);
                setSlot_rangeVideo(response.data.data.slot_range);
                setConsulting_video_response(response.data.data.consulting_slot);
                if (response.data.data.consulting_slot.length !== 0) {
                    const consulting_slot =
                        response.data.data.consulting_slot[0].doctor_slots_data.timings;
                    setConsulting_video_slot(consulting_slot);
                    setTimeout(() => {
                        setLoadingData(false);
                        setPopupLoading(false);
                    }, 500);
                } else {
                    setConsulting_video_slot([]);
                    setTimeout(() => {
                        setPopupLoading(false);
                    }, 500);
                }
            } else {
                setConsulting_video_slot([]);
                setTimeout(() => {
                    setPopupLoading(false);
                }, 500);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isActiveSegment = () => {
        setIsActive1(true);
        setIsActive2(false);
        setPage('1');
        setRupees('0.00');
        setConsulting_video_slot([]);
    };

    const isActiveSegment1 = () => {
        setIsActive1(false);
        setIsActive2(true);
        setPage('2');
        setRupees('0.00');
        setConsulting_slot([]);
    };

    const continueFunc = () => {
        if (page === '1') {
            dispatch(doctorDetailsItem(dataList));
        } else {
            dispatch(doctorDetailsItem(dataList1));
        }
        dispatch(slotAmount(rupees));
        dispatch(consultMode(page === 1 ? 'Offline' : 'Online'));
        history.push('/select-patient', { isRequest: false });
    };

    const onPressDate = (item, index) => {
        setSelectedDate(item.onDate);
        setList(list.map((day, idx) => idx === index ? { ...day, isSelected: true } : { ...day, isSelected: false }));
        onCallApi(item.onDate);
    };

    const onPressTag = (item) => {
        const updatedSlots = consulting_slot.map(slot => {
            if (slot.slot_id === item.slot_id) {
                return {
                    ...slot,
                    doctor_slots_data: slot.doctor_slots_data.map(slotItem => ({
                        ...slotItem,
                        timings: slotItem.timings.map(timeItem => timeItem.time === item.time ? { ...timeItem, is_selected: true } : { ...timeItem, is_selected: false })
                    }))
                };
            } else {
                return slot;
            }
        });
        setConsulting_slot(updatedSlots);
    };

    const onPressDatePicker = () => {
        setDate(new Date());
    };

    const onSelectSlotItem = (item) => {
        setSlotItemData(item);
        setRupees(item.price);
    };

    const renderHeader = () => {
        return (
            <DoctorProfile
                data={data}
                isActive1={isActive1}
                isActive2={isActive2}
                isActiveSegment={isActiveSegment}
                isActiveSegment1={isActiveSegment1}
                rupees={rupees}
                slot_range={page === '1' ? slot_range : slot_rangeVideo}
                UserImage={dataList.photo}
                item={dataList}
            />
        );
    };

    const renderFooter = () => {
        return (
            <CommonButton
                disabled={rupees === '0.00'}
                title={'Continue'}
                onPress={continueFunc}
            />
        );
    };

    return (
        <div>
          <DoctorSlotSegment
            title1="Hospital visit"
            title2="Video consultation"
            onPressAccounts={isActiveSegment}
            onPressFamily={isActiveSegment1}
            isActive1={isActive1}
            isActive2={isActive2}
          />
          {page === '1' ? (
            <div>
              <div className="datePickerContainer">
                <span className="dateText">
                  {moment(onSelectedDate).format('ddd, DD MMM YYYY')}
                </span>
                <button onClick={onPressDatePicker} className="calendarIconContainer">
                  <img src={Images.calenderIcon} alt="calendar" className="calendarIcon" />
                </button>
              </div>
              <div>
                {list.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => onPressDate(item, index)}
                    className={`dateItem ${item.isSelected ? 'selectedDateItem' : ''}`}
                  >
                    <div>{item.day}</div>
                    <div>{item.date}</div>
                  </div>
                ))}
              </div>
              <div />
              {consulting_slot.length > 0 ? (
                consulting_slot.map((item, index) => (
                  <SlotItem key={index} onPressTag={onPressTag} slotIndex={index} item={item} />
                ))
              ) : (
                <div>
                  <p>
                    The doctor is not available for visit on{' '}
                    <span>
                      {moment(onSelectedDate).format('DD MMM YYYY').toUpperCase()}
                    </span>. Please select another date.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="datePickerContainer">
                <span className="dateText">
                  {moment(onSelectedVideoDate).format('ddd, DD MMM YYYY')}
                </span>
                <button onClick={onPressDatePicker} className="calendarIconContainer">
                  <img src={Images.calenderIcon} alt="calendar" className="calendarIcon" />
                </button>
              </div>
              {/* Add other content components related to page 2 */}
            </div>
          )}
          <div>
            <ToPayCard amount={rupees} />
            <CommonButton
              text="Continue"
              onPress={continueFunc}
              disabled={
                page === '1'
                  ? consulting_slot.length === 0
                    ? true
                    : !consulting_slot.some(item =>
                        item.doctor_slots_data[0].timings?.some(it => it.is_selected === true)
                      )
                  : consulting_video_slot.length === 0
                  ? true
                  : !consulting_video_slot.some(it => it.is_selected === true)
              }
            />
          </div>
        </div>
      );
    };
    
    export default ConsultSlotBooking;