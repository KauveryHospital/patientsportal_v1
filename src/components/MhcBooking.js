import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container,
    IconButton,
    Button,
    Avatar,
    Paper,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// Define styles using makeStyles
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
    },
    header1: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '20px',
        padding: '10px',
        flexDirection: 'row',
        '@media (max-width:600px)': {
            flexDirection: 'row',
        }
    },
    avatar: {
        width: '80px',
        height: '80px',
        marginBottom: '20px',
        padding: '20px',
        '@media (max-width:600px)': {
            marginBottom: '0',
            marginRight: '20px',
        }
    },
    doctorInfo: {
        textAlign: 'left',
        justifyContent: 'space-between',
        padding: '5px',
        marginLeft: '10px',
        '@media (max-width:600px)': {
            textAlign: 'left',
        }
    },
    timeInfo1: {
        textAlign: 'left',
        justifyContent: 'space-between',
        padding: '10px',
        marginLeft: '20px',
        '@media (max-width:600px)': {
            textAlign: 'left',
        }
    },
    appointmentInfo1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        width: '60%',
        marginLeft: '25%',
        marginTop: '20px',
        marginBottom: '20px',
        '@media (max-width:600px)': {
            flexDirection: 'column',
            width: '100%',
            marginLeft: '0',
        }
    },
    calendarIcon1: {
        marginLeft: '20px',
        color: '#962067',
        cursor: 'pointer',
    },
    timeSlot1: {
        padding: '20px 20px',
        backgroundColor: '#ffe6f2',
        borderRadius: '3px',
        marginBottom: '0px',
        marginTop: '20px'
    },
    continueButton1: {
        backgroundColor: '#962067',
        color: '#fff',
        padding: '10px 10px',
        borderRadius: '20px',
        marginTop: '20px',
        width: '30%',
        '&:hover': {
            backgroundColor: '#962067',
            // color: '#939598',
            borderColor: '#ffe6f2'
        },
    },
    footer1: {
        display: 'flex',
        width: '100%',
        height: '80px',
        backgroundColor: '#962067',
        borderRadius: '10px 10px 0px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8px',
    },
    dateGrid1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateButton1: {
        borderColor: '#939598',
        color: '#939598',
        width: '10px',
        height: '50px',
        margin: '0 5px',
        fontFamily: 'Poppins',
        '&:hover': {
            backgroundColor: '#ffe6f2',
            color: '#939598',
            borderColor: '#ffe6f2'
        },
    },
    dateButtonSelected: {
        borderColor: '#939598',
        backgroundColor: '#ffe6f2',
        color: '#939598',
        width: '20px',
        height: '50px',
        margin: '0 5px',
        fontFamily: 'Poppins',
        '&:hover': {
            backgroundColor: '#ffe6f2',
            color: '#939598',
            borderColor: '#ffe6f2'
        },
    },
    arrowButton1: {
        color: COLORS.primaryColor,
    },
}));

const generateDateRange = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
    }
    return dates;
};

const MhcBooking = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState(generateDateRange(new Date()));
    const history = useHistory();
    const location = useLocation();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedDate1, setFormattedDate1] = useState('');
    const [mhcslot, setMhcSlot] = useState({});
    const [message, setMessage] = useState('');
    const [slotTime, setSlotTime] = useState('');
    const slotType = 'Walk In';

    const queryParams = new URLSearchParams(location.search);
    const selectedUnit = queryParams.get('selectedUnit');
    const packageId = queryParams.get('packageId');
    const packagePrice = queryParams.get('packagePrice');
    console.log(packagePrice);
    const units = { dropdownOptions: queryParams.get('dropdownOptions') };

    useEffect(() => {
        if (selectedDate) {
            setFormattedDate(formatDate(selectedDate));
            setFormattedDate1(formatDate1(selectedDate));
        }
    }, [selectedDate]);

    useEffect(() => {
        if (formattedDate1) {
            fetchmhcSlots(selectedUnit, formattedDate1);
        }
    }, [selectedUnit, formattedDate1]);

    const fetchmhcSlots = async (selectedUnit, formattedDate1) => {
        if (!formattedDate1) {
            console.error('Formatted date is empty.');
            return;
        }

        const city = selectedUnit;
        const date = formattedDate1;

        console.log('Making API call with parameters:', { city, date });

        try {
            const response = await axios.get('http://localhost:1801/api/mhcslot/', { params: { city, date } });
            console.log('Response:', response.data);
            if (!response.data) {
                setMessage('No slots available on this facility');
                setMhcSlot({});
            } else {
                setMessage('');
                setMhcSlot(response.data.Result);
            }
        } catch (error) {
            console.error('Error fetching MHC slots:', error);
            setMhcSlot({});
        }
    };

    const handleDateChange = (direction) => {
        const newStartDate = new Date(dateRange[0]);
        newStartDate.setDate(newStartDate.getDate() + (direction === 'next' ? 1 : -1));
        setDateRange(generateDateRange(newStartDate));
    };

    const handleCalendarOpen = () => {
        setOpen(true);
    };

    const handleCalendarClose = () => {
        setOpen(false);
    };

    const handleCalendarDateChange = (event) => {
        const newDate = new Date(event.target.value);
        setSelectedDate(newDate);
        setDateRange(generateDateRange(newDate));
        setOpen(false);
    };

    const handleNext = () => {
        // history.push('/patientdetails');
        const queryParams = new URLSearchParams({
            // dropdownOptions: dropdownOptions,
            packagePrice: packagePrice,
            selectedUnit: selectedUnit
          }).toString();
      
          history.push(`/patientdetails?${queryParams}`);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    };

    const formatDate1 = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
    };

    const handleDate = (date) => {
        setSelectedDate(date);
    };

    const handleUnitChange = (date) => {
        // setSelectedDate(date);
    };

    const result = mhcslot && mhcslot["Slot No"] ? {
        SlotCount: mhcslot["Slot Count"],
        Slots: mhcslot["Slot No"].map(slot => ({
            SlotNumber: slot
        }))
    } : {
        SlotCount: '',
        Slots: []
    };

    return (
        <Container className={classes.root}>
            <Header
                dropdownOptions={dropdownOptions}
                selectedUnit={selectedUnit}
                onUnitChange={handleUnitChange}
            />
            <Paper className={classes.appointmentInfo1}>
                <Box display="flex" alignItems="center" marginBottom="10px">
                    <ArrowBackIosIcon className={classes.calendarIcon1} />
                    <Typography style={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Select date & time</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" padding="15px">
                    <Typography style={{ fontFamily: 'Poppins', color: '#962067' }}>{formattedDate}</Typography>
                    <CalendarTodayIcon className={classes.calendarIcon1} onClick={handleCalendarOpen} />
                </Box>

                <Box className={classes.dateGrid1}>
                    <IconButton className={classes.arrowButton1} onClick={() => handleDateChange('prev')}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Grid container justifyContent="center" alignItems="center" spacing={1} style={{ marginBottom: '0px', marginTop: '10px' }}>
                        {dateRange.map(date => (
                            <Grid key={date.toDateString()}>
                                <Button
                                    variant="outlined"
                                    className={`${classes.dateButton1} ${selectedDate.toDateString() === date.toDateString() && classes.dateButtonSelected}`}
                                    onClick={() => handleDate(date)}
                                >
                                    {date.toDateString().slice(0, 3)} {date.getDate()}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <IconButton className={classes.arrowButton1} onClick={() => handleDateChange('next')}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                {message ? (
                    <Typography style={{ fontFamily: 'Poppins', color: '#939598', textAlign: 'center', fontSize: '14px' }}>{message}</Typography>
                ) : (
                    <>
                        <Paper className={classes.timeSlot1}>
                            <Typography style={{ fontFamily: 'Poppins', color:COLORS.textColor}}>{selectedUnit}</Typography>
                            <Typography style={{ fontFamily: 'Poppins', color:COLORS.textColor, fontSize: '12px'}}>No. 199, Luz Church Road, Mylapore</Typography>
                            <Typography style={{ fontFamily: 'Poppins', color:COLORS.textColor, fontSize: '12px' }}>Available slots here: {result.SlotCount}</Typography>
                        </Paper>

                        <Box display="flex" justifyContent="space-between" alignItems="center" backgroundColor= '#DCDCDC33' marginTop="20px" border='0px solid #00000029' borderRadius= '1px'  width= '40%' boxShadow='0px 2px 4px rgba(0, 0.1, 0.1, 0.1) #00000029'>
                            <Typography style={{ fontFamily: 'Poppins', marginLeft: '20px'}}>To pay: </Typography>
                            <Typography style={{ fontFamily: 'Poppins', marginRight: '20px'}}>{packagePrice}</Typography>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.continueButton1}
                            onClick={handleNext}
                        >
                            Continue
                        </Button>
                    </>
                )}
            </Paper>
            <Box className={classes.footer1}>
                <Typography variant="body2">
                    © 2024 Patient Appointment Booking. All rights reserved.
                </Typography>
            </Box>

            <Dialog open={open} onClose={handleCalendarClose}>
                <DialogTitle>Select Date</DialogTitle>
                <DialogContent>
                    <TextField
                        type="date"
                        fullWidth
                        onChange={handleCalendarDateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCalendarClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MhcBooking;
