import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Button, Modal, Card, FormControl, CardContent, TextField, MenuItem, IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Header from './HeaderNew';
import SearchIcon from '@mui/icons-material/Search';
import { COLORS } from '../constants/Theme';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from '../utils/LocalStorage';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { EventEmitter } from 'events';
import { KauvaryFileUpload } from '../utils/KauveryFileUpload';
import { familyMembersList, crequestNow, uploadRecord } from '../utils/apiCalls';
import {
    emptyUploadRecord,
    recordList,
    removeUploadedFile,
} from '../store/actions/recordActions';
import {
    ToggleMenu,
    deleteFile,
    emptyMyUploadSectionRecord,
    myUploadLoading,
    myUploadSectionExtraList,
    myUploadSectionList,
    renameFile,
} from '../store/actions/recordActions';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
    patientDetails,
    patientId,
    patient_Id,
    patient_Name,
    patient_Notes,
} from '../store/actions/bookingActions';
import { getSecondaryProfileID } from '../utils/LocalStorage';
import {
    myUploadDelete,
    myUploadList,
    myUploadRename,
} from '../utils/apiCalls';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        // borderRadius: '8px',
        // boxShadow: '0px 3px 6px #00000029',
        // padding: '20px',
        // maxWidth: '600px',
        // margin: '20px auto',
    },
    formControl: {
        width: '100%',
        marginTop: '10px',
    },
    icon: {
        color: COLORS.primaryColor,
    },
    note: {
        fontSize: '12px',
        color: COLORS.textColor,
        marginTop: '20px',
        marginBottom: '20px',
        fontFamily: 'Poppins',
    },
    notes: {
        fontSize: '12px',
        color: COLORS.textColor,
        marginTop: '20px',
        marginBottom: '20px',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    confirmButton: {
        backgroundColor: '#972168',
        color: '#fff',
        width: '30%',
        justifyContent: 'center',
        marginLeft: '200px',
        borderRadius: '25px',
        textTransform: 'none',
        fontFamily: 'Poppins',
        '&:hover': {
            backgroundColor: '#b7528f',
            borderColor: COLORS.primaryColor
        },
    },
    errorText: {
        color: COLORS.errorColor,
        fontSize: '12px',
        marginTop: '4px',
        fontFamily: 'Poppins'
    },
};

const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '100%', // Full width
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: '#e0e0e0', // Set background color here
        height: '30px',
        width: '20%',
        alignItems: 'right',
        justifyContent: 'right',
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '900px',
        '& fieldset': {
            borderColor: '#e0e0e0',
        },
        '&:hover fieldset': {
            borderColor: COLORS.primaryColor,
        },
        '&.Mui-focused fieldset': {
            borderColor: COLORS.primaryColor,
        },
        '& .MuiInputBase-input::placeholder': {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: COLORS.placeholderColor, // Black color for placeholder
        },
    },
    '& .MuiInputBase-input': {
        padding: '10px', // Adjust padding for text alignment
        '&::placeholder': {
            color: '#000000', // Placeholder color
        },
    },
}));

const StyledSelect = styled((props) => <TextField select {...props} />)({
    marginTop: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0.1, 0.1)',
    '& .MuiInputBase-root': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiInputBase-input': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for label
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: COLORS.placeholderColor, // Black color for focused label
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },
    '& .MuiSelect-icon': {
        color: COLORS.primaryColor, // Custom color for dropdown icon
    },
    '& .Mui-focused .MuiInputLabel-root': {
        color: COLORS.placeholderColor, // Black color for focused label
    },
    '& .Mui-focused .MuiInputBase-input': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .Mui-focused .MuiInputBase-root': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiInputBase-input::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for placeholder
    },
});

const StyledTextField = styled(TextField)({
    marginTop: '30px',
    marginLeft: '30px',
    borderRadius: '5px',
    width: '80%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0.1, 0.1)',
    '& .MuiInputBase-input': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for label
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },
    '& .MuiInputBase-root.Mui-focused': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: COLORS.placeholderColor, // Black color for focused label
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },
    '& .MuiInputBase-input::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for placeholder
    },
});

const Records = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const relationData = [{ name: 'ksdajiw' }];
    const [relationValue, setRelationValue] = React.useState('');
    const [fileName, setFileName] = useState('');
    const [nameErrorText, setNameErrorText] = useState('');
    const [records, setRecords] = useState([{ name: 'prescription', date: '02/07/2024-1:14PM' }]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [upload_next_page, setUploadNextPage] = useState('');
    const [uploadsCount, setUploadsCount] = useState(0);
    const [rename_file, setRenameFile] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const healthRecordScrollView = useRef(null);

    let isSuccess = true;

    const unitName = useSelector(state => state?.authReducer?.unitName);
    const [permissionState, setPermissionState] = useState(false);

    const [popupLoading, setPopupLoading] = useState(false);
    const [uploadLoader, setUploadLoader] = useState(false);

    const [patientName, setPatientName] = useState('');
    const [patient_id, setPatientId] = useState('');

    const [nameErrorState, SetNameErrorState] = useState(false);
    const [PatientnameErrorState, SetPatientNameErrorState] = useState(false);
    const [PatientnameErrorText, SetPatientNameErrorText] = useState('');
    const [notesErrorState, SetNotesErrorState] = useState(false);
    const [isPatientDisbaled, SetPatientDisbaled] = useState(true)
    const [isFileUploadDisabled, SetFileUploadDisabled] = useState(true)

    //   const [nameErrorText, SetNameErrorText] = useState('');
    const [notesErrorText, SetNotesErrorText] = useState('');

    const [loader, setLoader] = useState(false);

    const [keyboardShow, setKeyboardShow] = useState(false);
    const eventEmitter = new EventEmitter();


    const refRBSheet1 = useRef();
    const profile_information = useSelector(
        state => state?.homeReducer?.profile_info,
    );
    console.log('profileeeee', profile_information);


    const [relationData, setRelationData] = useState([]);
    const [profileCreatedPopup, setProfileCreatedPopup] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [userToken, setUserToken] = useState('');
    const doctorDetails = useSelector(
        // Doctor details
        state => state?.bookingReducer?.doctorDetails,
    );

    const patientDetails = useSelector(
        // Patient details
        state => state?.bookingReducer?.patientDetails,
    );

    const [notes, setNotes] = useState('');

    const [cropModal, setCropModal] = useState(false);
    const [imageURI, setImageURI] = useState(false);

    // const upload_section_list = useSelector(
    //     state => state?.recordReducer?.my_upload_list,
    //   );
    const [uploadList, setUploadList] = useState([]);

    const uploadedList = useSelector(
        state => state?.recordReducer?.uploaded_list,
    );
    console.log('uploadedList', uploadedList);

    const [sortUploadFilter, setsortUploadFilter] = useState('oldest_to_new');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const gettingData = await getUserInformation('User_Data');
            const tokenData = JSON.parse(gettingData);
            setPatientId(tokenData.app_profile_id);
        };
        fetchData();
    }, [patient_id]);

    console.log('pppppppp', patient_id);
    useEffect(() => {
        // if (isResponseIsValid(response)) {
        //     console.log(response?.data, 'response');
        //     getUserInformation('User_Data')
        //       .then(res => {
        //         setLoader(false);

        //         let json = JSON.parse(res);
        //         setPatientId(json.app_profile_id);
        //       });
        //       }
        const fetchData = async () => {
            const gettingData = await getUserInformation('User_Data');
            const tokenData = JSON.parse(gettingData);
            setPatientId(tokenData.app_profile_id);
            onMyUploadListAPI(sortUploadFilter, tokenData.app_profile_id, page);
        };
        fetchData();

        // onMyUploadListAPI(sortUploadFilter, patient_id, page);

        const handleReloadUpload = () => {
            //   setsortUploadFilter('newest_to_old');
            dispatch(myUploadLoading(true));
            setPage(1);

            setTimeout(() => {
                getSecondaryProfileID('Secondary_Profile_ID').then(res => {
                    let json = JSON.parse(res);
                    let profile_id = json? json : '';
                    onMyUploadListAPI(sortUploadFilter, patient_id, page);
                });
            }, 1000);
        };

        window.addEventListener('reloadUpload', handleReloadUpload);

        return () => {
            window.removeEventListener('reloadUpload', handleReloadUpload);
        };
    }, [dispatch, sortUploadFilter, page, patient_id]);

    useEffect(() => {

        dispatch(emptyUploadRecord(''));

        getUserInformation('User_Data').then(res => {
            let response = JSON.parse(res);
            setUserToken(response?.token);
        });
        // DeviceEventEmitter.addListener('familyMembers', event => {
        //   familyMembersApiCall();
        //   console.log(event, 'Event');
        //   if (event.isShowPopup) {
        //     setProfileCreatedPopup(event.isShowPopup);
        //   }
        //   if (event.isName) {
        //     setName(event.isName);
        //   }
        // });        

        const handleFamilyMembersEvent = (event) => {
            familyMembersApiCall();
            console.log(event, 'Event');
            if (event.isShowPopup) {
                setProfileCreatedPopup(event.isShowPopup);
            }
            if (event.isName) {
                setName(event.isName);
            }
        };

        eventEmitter.addListener('familyMembers', handleFamilyMembersEvent);

        familyMembersApiCall();
        return () => {
            eventEmitter.removeListener('familyMembers', handleFamilyMembersEvent);
        };
    }, []);

    useEffect(() => {

        let uploaded_file_list = uploadedList
        const errorItems = uploaded_file_list
            .filter((item) => item.size_error == true);
        const isButtonEnabled = errorItems.length > 0;
        // console.log('uploadedList',uploadedList)
        if (uploadedList.length > 0 && patient_id != '' && !isButtonEnabled) {
            SetFileUploadDisabled(false)
            SetPatientDisbaled(false)
        } else {
            SetFileUploadDisabled(true)
            SetPatientDisbaled(true)

        }
    }, [uploadedList, patient_id]);

    const familyMembersApiCall = async () => {
        setPopupLoading(true);
        try {
            const response = await familyMembersList();
            if (isResponseIsValid(response)) {
                console.log(JSON.stringify(response.data.data));
                setRelationData(response.data.data);
                setTimeout(() => {
                    setPopupLoading(false);
                }, 400);
            } else {
                setTimeout(() => {
                    snackBar(JSON.stringify(response.data));
                    setPopupLoading(false);
                }, 400);
            }
        } catch (err) {
            setTimeout(() => {
                snackBar(JSON.stringify(err));
                setPopupLoading(false);
            }, 400);
        }
    };

    const onMyUploadListAPI = async (sortUploadFilter, pid, page) => {
        console.log('uploadfocus', page);
        console.log('iddddddddd', pid);
        const response = await myUploadList('', sortUploadFilter, page, 10, pid);
        if (isResponseIsValid(response)) {
            setUploadNextPage(response?.data?.next_page);
            setUploadList(response.data);
            console.log('section_upload_data--->', JSON.stringify(response?.data));
            dispatch(myUploadLoading(false));
            setUploadLoader(false)

            if (page == 1) {
                let upload_data = response?.data?.my_uploads;

                // upload_data.forEach(upload => {
                //     upload.data.forEach(item => {
                //         item.menu = false;
                //     });
                // });

                setUploadsCount(response?.data?.total_count)
                dispatch(myUploadSectionList(upload_data));


            } else {
                let upload_data = response?.data?.my_uploads;

                // upload_data.forEach(upload => {
                //     upload.data.forEach(item => {
                //         item.menu = false;
                //     });
                // });
                setUploadsCount(response?.data?.total_count)
                dispatch(myUploadSectionExtraList(upload_data));
            }
        } else {
            setUploadLoader(false)

            dispatch(myUploadLoading(false));
        }
    };
    console.log('listtttt', uploadList);

    const fileUploaderror = (item, message, fileSize) => {
        let updatedList = [];

        updatedList.push({
            file_name: item.name,
            size: fileSize,
            uri: item.uri,
            type: item.type,
            size_error: true,
            error_message: message,
        });
        console.log('failed updatedList', updatedList)
        // closeUploadPopup();

        setTimeout(() => {
            healthRecordScrollView.current.scrollToEnd({ animated: true });
        }, 500);
        dispatch(recordList(updatedList));
    }

    const handleOpenRename = (record) => {
        setSelectedRecord(record);
        setRenameFile(record.name);
        setOpen1(true);
    };

    const handleDelete = (record) => {
        setSelectedRecord(record);
        // setRenameFile(record.name);
        setOpen2(true);
    };

    const handleCloseRename = () => {
        setOpen1(false);
        // setFileName('');
        setRenameFile('');
        setSelectedRecord(null);
    };

    const handleCloseDelete = () => {
        setOpen2(false);
        // setFileName('');
        // setRenameFile('');
        setSelectedRecord(null);
    };

    const handleRelationChange = (event) => {
        setRelationValue(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSave = () => {
        // onUploadSave()
        // console.log('fileErrorValidation', fileErrorValidation())
        // if (patient_id == '') {
        //   SetPatientNameErrorState(true);
        //   SetPatientNameErrorText('Please select patient');
        // }   else {
        onAPISave();
        // }
    };

    const onAPISave = async () => {
        // console.log('inside');
        try {
            const data_input = {
                profile_id: patient_id,
                file_name: fileName,
                file_data: uploadedList,
            };
            console.log('OnAPI Save new--->', data_input);
            const response = await uploadRecord(data_input);
            console.log('Record save response', response);
            if (isResponseIsValid(response)) {
                setPopupLoading(false);
                console.log('response-->', response);
                setTimeout(() => {
                    snackBar(response?.data?.message);
                }, 500);
                setTimeout(() => {
                    //   DeviceEventEmitter.emit('reloadUpload')

                }, 1000);
                // onSessionEnd()
                history.push('/records')

            } else {
                snackBar(response?.data?.message);
                setPopupLoading(false);
            }
        } catch (err) {
            setPopupLoading(false);
        }
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]{3,}$/;
        if (!nameRegex.test(name)) {
            //   setNameErrorState(true);
            setNameErrorText('Name should contain only letters and at least 3 characters');
        } else {
            //   setNameErrorState(false);
            setNameErrorText('');
        }
        setFileName(name);
        // nextButtonValidation();
    };

    const OnFileUploadAPI = (input, file_type) => {
        console.log('FILE UPLOAD PAYLOAD', JSON.stringify(input));
        setTimeout(() => {
            setUploadLoader(true);

        }, 500);

        KauvaryFileUpload(userToken, input, patient_id)
            .then(response => {
                let doc_list = [response];
                console.log('booking upload error', JSON.stringify(response));

                let updatedList = [];
                doc_list.forEach((item, index) => {
                    updatedList.push({
                        file_name: item.file_name,
                        file_id: item.file_id,
                        file_url: item.file_url,
                        type: file_type,
                        size_error: false,
                        error_message: 'Failed to upload',
                    });
                });

                // healthRecordScrollView.current.scrollToEnd({ animated: true });
                console.log('doc res', updatedList);
                // closeUploadPopup();
                setTimeout(() => {
                    if (isSuccess) {
                        //    snackBar('File uploaded successfully')
                        isSuccess = false
                    }
                    setUploadLoader(false);
                }, 2500);

                setTimeout(() => {
                    healthRecordScrollView.current.scrollToEnd({ animated: true });
                }, 2800);

                console.log('makeFileNamesUnique', makeFileNamesUnique(updatedList))
                dispatch(recordList(updatedList));
            })
            .catch(res => {

                console.log('upload error-->', res.error)
                let error = res?.error
                //  alert(JSON.stringify(error))
                setTimeout(() => {
                    setUploadLoader(false);
                }, 500);
                let updatedList = [];
                input.forEach((item, index) => {
                    console.log('input -->', input);
                    if (item.filename != undefined) {
                        updatedList.push({
                            file_name: item.filename,
                            size: bytesToMb(item.size),
                            uri: 'nil',
                            type: file_type,
                            file_id: uuidv4(),
                            size_error: true,
                            error_message: error?.message,
                        });
                    }

                });
                setTimeout(() => {
                    //    healthRecordScrollView.current.scrollToEnd({ animated: true });
                }, 500);

                dispatch(recordList(updatedList));


                // Handle errors here
            });
    };

    function makeFileNamesUnique(files) {
        const fileCounts = {};

        return files.map((file) => {
            const { file_name } = file;
            const count = fileCounts[file_name] || 0;

            fileCounts[file_name] = count + 1;

            // Append count to file_name if it's not the first occurrence
            const newFileName = count === 0 ? file_name : `${file_name} (${count})`;

            return {
                ...file,
                file_name: newFileName,
            };
        });
    }
    const bytesToMb = (bytes) => {
        return bytes / (1024 * 1024);
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        setFileName(event.target.files[0].name);
        let updatedList = [];

        Array.from(files).forEach((file) => {

            const fileSize = bytesToMb(file.size);

            if (file.type === 'video/mp4' || file.type === 'image/gif') {
                updatedList.push({
                    file_name: file.name,
                    size: fileSize,
                    uri: URL.createObjectURL(file),
                    type: file.type,
                    size_error: true,
                    error_message: 'File format not supported',
                });
                console.log('failed updatedList', updatedList);

                // Simulate closing the upload popup
                setTimeout(() => {
                    healthRecordScrollView.current.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else if (fileSize < 1) {
                const realPath = URL.createObjectURL(file);
                const data_input = [
                    {
                        name: 'file',
                        filename: file.name,
                        type: file.type,
                        data: realPath,
                    },
                    {
                        name: 'type',
                        data: file.type,
                    },
                ];
                const fileNameWithoutExtension = file.name.split('.')[0];
                // const existingFiles = uploadedList.some((f) => f.file_name === fileNameWithoutExtension);
                let uploaded_list = uploadedList;
                let existingFiles = uploaded_list.length > 0 ? uploaded_list.find((f) => f.file_name == fileNameWithoutExtension) : false;
                console.log('existinggggggggg', existingFiles);
                if (existingFiles === true) {
                    // fileUploadError(file, 'Duplicate file error', fileSize);
                } else {
                    OnFileUploadAPI(data_input, file.type);
                }
            } else {
                // fileUploadError(file, 'File size exceeds limit', fileSize);
            }
        });

        // setUploadedList((prevList) => [...prevList, ...updatedList]);
    };
    console.log('fileeeeeeeeee', file);

    const onPressRenameSaveAPI = async () => {

        let data_input = {
            _id: selectedRecord? selectedRecord.file_id : '',
            name: rename_file,
        };
        const response = await myUploadRename(data_input);
        if (isResponseIsValid(response)) {
            setOpen1(false);
            //   setRenameErrorState(false);
            let rename_data = response?.data;
            dispatch(renameFile(selectedRecord? selectedRecord.file_id:'', rename_file));

            getSecondaryProfileID('Secondary_Profile_ID').then(res => {
                let json = JSON.parse(res);
                let profile_id = json?json : '';
                onMyUploadListAPI(sortUploadFilter, profile_id, page);
            });

            console.log('rename res-->', response);
        } else {

            //   setUploadLoader(false)
            let rename_data = response?.data;
            console.log('rename error-->', response)
        }
    };

    const handleMenuItemClick = (relation) => {
        // setSelectedRelation(relation.name);
        setPatientId(relation.app_profile_id); // Assuming 'id' is the patientId
    };

    const onDeleteAPI = async () => {
       
        dispatch(deleteFile(selectedRecord? selectedRecord.file_id : ''));

        console.log('upload_section_list.length', uploadList.length)

        // setTimeout(() => {
        //   console.log('upload_section_list[section_index].data.length',upload_section_list[section_index].data)

        //   let filterUploadData =  upload_section_list.splice(section_index, 1);
        //   console.log('section_index',section_index)

        //   // if (upload_section_list[section_index].data.my_uploads.length === 0) {
        //   //   upload_section_list.splice(section_index, 1);
        //   // }
        //   console.log('upload_section_list--->',JSON.stringify(upload_section_list))
        //   dispatch(myUploadSectionList(filterUploadData));

        // }, 1000);
        const response = await myUploadDelete(selectedRecord? selectedRecord.file_id : '');
        console.log('My uploads delete response', response)
        if (isResponseIsValid(response)) {
            let delete_data = response;

            console.log('upload_section_list.length A', uploadList.length)
            setTimeout(() => {

                // dispatch(myUploadSectionList([]));

                getSecondaryProfileID('Secondary_Profile_ID').then(res => {
                    let json = JSON.parse(res);
                    let profile_id = json? json: '';
                    onMyUploadListAPI(sortUploadFilter, profile_id, page);
                });

            }, 500);

            
        } else {

            setTimeout(() => {

                // dispatch(myUploadSectionList([]));

                getSecondaryProfileID('Secondary_Profile_ID').then(res => {
                    let json = JSON.parse(res);
                    let profile_id = json? json : '';
                    onMyUploadListAPI(sortUploadFilter, profile_id, page);
                });

            }, 500);

         
        }
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Header />
            {/* <Typography variant="h6" gutterBottom>My uploads</Typography> */}
            {/* <Box style={styles.container}> */}

            <CustomTextField
                variant="outlined"
                placeholder="Search for health records"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon style={{ color: COLORS.primaryColor }} />
                        </InputAdornment>
                    ),
                }}
            />
            {/* </Box> */}
            {records.length === 0 ? (
                <Box textAlign="center" my={4}>
                    <Typography variant="body2" fontFamily='Poppins' color={COLORS.textColor} gutterBottom>You view your uploaded documents here</Typography>
                    <Button variant="outlined"
                        color="primary"
                        sx={{
                            marginTop: '30px',
                            borderRadius: '20px',
                            borderColor: '#ffe6f2', // Assuming you want the border to match the primary color
                            color: COLORS.textColor, // Text color
                            // fontSize: '16px', // Change to desired font size
                            fontFamily: 'Poppins',
                            textTransform: 'none',
                            boxShadow: '0px 2px 4px #ffe6f2',
                            '&:hover': {
                                // backgroundColor: '#962067',
                                // color: '#939598',
                                borderColor: '#ffe6f2',
                            },
                        }}
                        onClick={handleOpen}
                        startIcon={<AddIcon />}
                    >
                        Click here to add your health record
                    </Button>
                </Box>
            ) : (
                <Box>
                    {records.map((record) => (
                        <Box>
                            <Button
                                variant="contained"
                                // color="primary"
                                sx={{
                                    marginTop: '10px',
                                    // marginTop: '0px',
                                    borderRadius: '20px',
                                    backgroundColor: '#962067',
                                    borderColor: '#962067', // Assuming you want the border to match the primary color
                                    color: COLORS.whiteColor, // Text color
                                    // fontSize: '16px', // Change to desired font size
                                    fontFamily: 'Poppins', // Change to desired font weight
                                    textTransform: 'none',
                                    boxShadow: '0px 2px 4px #962067',
                                    '&:hover': {
                                        backgroundColor: '#962067',
                                        // color: '#939598',
                                        borderColor: '#ffe6f2'
                                    },
                                }}
                                onClick={handleOpen}
                            >
                                Add Record
                            </Button>

                            <Card key={record.id} sx={{ display: 'flex', flexDirection: 'row', ml: 10, maxWidth: '1000px', mt: 3, padding: 0, justifyContent: 'space-between' }}>
                                <CardContent >
                                    <Typography variant="h6" fontFamily='Poppins' color={COLORS.textColor} fontSize='18px'>{record.name}</Typography>
                                    <Typography variant="body2" fontFamily='Poppins' color={COLORS.textColor} fontSize='12px'>{record.date}</Typography>
                                </CardContent>
                                <Box >
                                    <IconButton onClick={() => handleOpenRename(record)}><EditIcon style={{ color: COLORS.primaryColor }} /></IconButton>
                                    <IconButton><DownloadIcon style={{ color: COLORS.primaryColor }} /></IconButton>
                                    <IconButton onClick={() => handleDelete(record)}><DeleteIcon style={{ color: COLORS.primaryColor }} /></IconButton>
                                </Box>

                            </Card>
                        </Box>
                    ))}
                </Box>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-health-record-title"
                aria-describedby="add-health-record-description"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    bgcolor="rgba(0, 0, 0, 0.5)"
                >
                    <Card
                        variant="outlined"
                        style={{ padding: '0px', maxWidth: '500px', width: '100%', position: 'relative', backgroundColor: '#fff' }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2} backgroundColor='#ffe6f2'>
                                <ArrowBackIosIcon style={{ marginRight: '0.5rem', cursor: 'pointer', color: '#972168', fontSize: '16px' }} onClick={handleClose} />
                                <Typography variant="h6" id="add-health-record-title" fontFamily='Poppins' color={COLORS.textColor}>Add health record</Typography>
                                <IconButton style={{ marginLeft: 'auto', color: '#972168', fontSize: '12px' }} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <Typography variant="body3" fontFamily='Poppins' fontSize='14px' color={COLORS.textColor} textAlign='center' gutterBottom>
                                Upload and keep track of all your medical documents
                            </Typography>

                            {/* <TextField
                                select
                                label="Select patient"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            >
                                <MenuItem value="Patient 1">Patient 1</MenuItem>
                                <MenuItem value="Patient 2">Patient 2</MenuItem>
                            </TextField> */}
                            <FormControl variant="outlined" style={styles.formControl}>
                                <StyledSelect
                                    value={relationValue}
                                    onChange={handleRelationChange}
                                    label="Select Patient"
                                >
                                    {relationData.map((relation, index) => (
                                        <MenuItem
                                            key={index}
                                            value={relation.name}
                                            onClick={() => handleMenuItemClick(relation)}
                                            style={{ color: COLORS.textColor, fontFamily: 'Poppins' }}
                                        >
                                            {relation.name}
                                        </MenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>
                            {/* <TextField
                                label="File name"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            /> */}
                            <StyledTextField
                                label="File nameme"
                                value={fileName}
                                onChange={(e) => validateName(e.target.value)}
                                variant="outlined"
                                fullWidth margin="normal"
                                required
                            />
                            <Box
                                border="1px dashed grey"
                                borderRadius='15px'
                                padding="1rem"
                                textAlign="center"
                                marginY="1rem"
                                style={{ cursor: 'pointer' }}
                            >
                                {/* <Typography variant="body2" color={COLORS.textColor} fontSize='12px' fontFamily='Poppins'>Choose your file to upload here</Typography> */}
                                <Button component="label" fontSize='12px'
                                    // onclick={() = > handleFileChange(event)}
                                    fontFamily='Poppins'
                                    style={{ color: COLORS.textColor }} >
                                    Choose your file to upload here
                                    <input type="file" hidden onChange={handleFileChange} />
                                </Button>
                                <Typography variant="caption" color={COLORS.placeholderColor} fontSize='12px' fontFamily='Poppins'>Support format (Max 1 MB): PNG, JPG, JPEG, HEIC, PDF</Typography>
                            </Box>

                            <Box mt={3} textAlign="center">
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    sx={{
                                        marginTop: '30px',
                                        borderRadius: '20px',
                                        backgroundColor: '#962067',
                                        borderColor: '#962067', // Assuming you want the border to match the primary color
                                        color: COLORS.whiteColor, // Text color
                                        // fontSize: '16px', // Change to desired font size
                                        fontFamily: 'Poppins', // Change to desired font weight
                                        textTransform: 'none',
                                        boxShadow: '0px 2px 4px #962067',
                                        '&:hover': {
                                            backgroundColor: '#962067',
                                            // color: '#939598',
                                            borderColor: '#ffe6f2'
                                        },
                                    }}
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
            <Modal open={open1} onClose={handleCloseRename}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 0,
                    // display: 'flex',
                    // flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffe6f2' }}>
                        <Typography variant="h6" sx={{ mt: 2, ml: 2, textAlign: 'center' }} fontFamily='Poppins' color={COLORS.textColor} gutterBottom>Rename file</Typography>
                        <IconButton onClick={handleCloseRename} sx={{ alignSelf: 'flex-end', mt: 0, mb: 0 }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {/* <TextField
                        variant="outlined"
                        label="File Name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2, mt: 3, ml: 2, mr: 0 }}
                    /> */}
                    <StyledTextField
                        label="File Name"
                        value={rename_file}
                        // onChange={(e) => validateName(e.target.value)}
                        onChange={(e) => setRenameFile(e.target.value)}
                        variant="outlined"
                        fullWidth margin="normal"
                        required
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button variant="outlined"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                ml: 2,
                                mr: 2,
                                borderRadius: '20px',
                                backgroundColor: COLORS.whiteColor,
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.blackColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                // boxShadow: '0px 2px 4px #962067',                                
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    // borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={handleCloseRename}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                // ml: 2,
                                mr: 3,
                                borderRadius: '20px',
                                backgroundColor: '#962067',
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.whiteColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                boxShadow: '0px 2px 4px #962067',
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={() => onPressRenameSaveAPI()}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={open2} onClose={handleCloseDelete}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 0,
                    // display: 'flex',
                    // flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
                        
                        <IconButton onClick={handleCloseDelete} sx={{ alignSelf: 'center', mt: 0, mb: 0, ml: 23, mt: 2, backgroundColor: 'red', justifyContent:'center' }}>
                            <CloseIcon />
                        </IconButton>
                        
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, ml: 2, mt: 2, textAlign: 'center' }} fontFamily='Poppins' color={COLORS.textColor} gutterBottom>Delete</Typography>
                    {/* <Typography variant="body2" color={COLORS.textColor} fontSize='14px' fontFamily='Poppins'>Delete</Typography> */}
                    <Typography variant="body2" color={COLORS.textColor} fontSize='12px' sx={{ mt: 2, ml: 2, mt: 2, textAlign: 'center' }} fontFamily='Poppins'>Are you sure you want to delete the selected document?</Typography>
                    {/* <StyledTextField
                        label="File Name"
                        value={rename_file}
                        // onChange={(e) => validateName(e.target.value)}
                        onChange={(e) => setRenameFile(e.target.value)}
                        variant="outlined"
                        fullWidth margin="normal"
                        required
                    /> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button variant="outlined"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                ml: 2,
                                mr: 2,
                                borderRadius: '20px',
                                backgroundColor: COLORS.whiteColor,
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.blackColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                // boxShadow: '0px 2px 4px #962067',                                
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    // borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={handleCloseDelete}
                        >
                            No
                        </Button>
                        <Button variant="contained"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                // ml: 2,
                                mr: 3,
                                borderRadius: '20px',
                                backgroundColor: '#962067',
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.whiteColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                boxShadow: '0px 2px 4px #962067',
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={() => onDeleteAPI()}
                        >
                            Yes, Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Records;
