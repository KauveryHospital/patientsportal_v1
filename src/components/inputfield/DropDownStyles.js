import { COLORS } from '../../constants/Theme'; // Adjust the import based on your project structure

const styles = (isError) => ({
    parentContainer: {
        marginBottom: '0px',
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: '1px',
        borderColor: isError ? COLORS.errorColor : '#ccc',
        borderRadius: '5px',
        padding: '0px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fieldTitleContainer: {
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: '8px',
    },
    fieldTitle: {
        fontSize: '14px',
        color: '#333',
    },
    dateInputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '8px',
    },
    dateText: {
        fontSize: '16px',
        color: COLORS.placeholderColor,
    },
    calendarIconView: {
        fontSize: '16px',
        marginLeft: '8px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    dropDownContainer: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '10px',
        width: '100%',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    dropDownHeading: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    dropDownSubHeading: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
        padding: '0 10px',
    },
    flatlist: {
        padding: '0px',
        width: '50%',
        position: 'relative'
    },
    dropDownListCard: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
    dropDownTitle: {
        fontSize: '14px',
        color: '#333',
    },
    dropDownSubTitle: {
        fontSize: '12px',
        color: '#666',
        marginTop: '4px',
    },
    itemSeparator: {
        height: '1px',
        backgroundColor: '#ccc',
        marginVertical: '10px',
    },
    addFamilyBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        borderTop: '1px solid #ccc',
        cursor: 'pointer',
    },
    addFamilyText: {
        fontSize: '14px',
        color: COLORS.primaryColor,
        marginLeft: '8px',
    },
    errorText: {
        color: COLORS.errorColor,
        fontSize: '12px',
        marginTop: '4px',
    },
    closeButton: {
        backgroundColor: COLORS.primaryColor,
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    '@media (max-width: 600px)': {
        dateText: {
            fontSize: '14px',
        },
        dropDownTitle: {
            fontSize: '12px',
        },
        dropDownSubTitle: {
            fontSize: '10px',
        },
        addFamilyText: {
            fontSize: '12px',
        },
    },
    '@media (min-width: 601px) and (max-width: 1024px)': {
        dateText: {
            fontSize: '16px',
        },
        dropDownTitle: {
            fontSize: '14px',
        },
        dropDownSubTitle: {
            fontSize: '12px',
        },
        addFamilyText: {
            fontSize: '14px',
        },
    },
});

export default styles;
