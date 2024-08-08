import { Dropdown } from 'react-bootstrap';
import { COLORS } from '../constants/Theme';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { colors } from '@mui/material';

const styles = {
    root: {
        backgroundColor: '#EFEFEF',
        padding: 0,
        margin: 0,
    },
    header: {
        display: 'flex',
        flex: 0,
        width: '100%',
        height: '80px',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: '0px',
        justifyContent: 'space-between',
        '@media (max-width: 600px)': {
            height: '60px',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        height: '70px',
        marginLeft: '20px',
        '@media (max-width: 600px)': {
            height: '50px',
            marginLeft: '10px',
        },
    },
    locationSection: {
        display: 'flex',
        color: '#962067',
        textAlign: "left",
        alignItems: 'center',
        font: "normal normal normal 18px/27px Poppins",
        letterSpacing: "0px",
        width: '24px',
        height: '35px',
        '@media (max-width: 600px)': {
            fontSize: '14px',
            width: '20px',
            height: '30px',
        },
    },
    dropdown: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        height: '25px'
    },
    toolbar1: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'right',
        marginTop: '0px',
        // backgroundColor: '#FFF7FB',
        backgroundColor: '#ffe6f2',
        padding: '0px', // Adjust padding for smaller screens
        '@media (min-width: 600px)': {
          padding: '0 50px', // Increase padding for larger screens
        },
      },
      button: {
        color: COLORS.primaryColor,
        '&:hover': {
        //   backgroundColor: '#FFF7FB',
          backgroundColor: '#ffe6f2',
        },
        '&.active': {
          fontWeight: 'bold',
          borderBottom: '2px solid #972168',
        },
        marginRight: '10px', // Adjust spacing between buttons
        '@media (max-width: 600px)': {
          marginRight: '5px', // Reduce spacing on smaller screens
        },
      },
      menuItem: {
        display: 'flex',
        alignItems: 'right',
        // marginRight: '0px'
      },
      menuIcon: {
        marginRight: '10px',
        color: COLORS.placeholderColor,
      },
      menuText: {
        // fontWeight: 600,
        fontSize: '12px',
        fontFamily: 'Poppins',
        marginTop: '5px',
        color: COLORS.placeholderColor,
        '@media (max-width: 600px)': {
          display: 'none', // Hide text on smaller screens
        },
      },
      userButton: {
        color: COLORS.primaryColor,
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#972168',
        },
      },
    // rightimg: {
    //     alignItems: 'right',
    //     justifyContent: 'right',
    //     marginleft: '70px',
    //     height: '120%',
    //     width: '30%',
    //     bottom: '20%'
    // },
    rightimg: {
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'right',
        marginRight: '0px',
        marginTop: '0px',
        height: '80%',
        width: '40%',
        position: 'relative',
        bottom: '20%',
        '@media (max-width: 1200px)': {
            marginLeft: '50px',
            height: '110%',
            width: '35%',
            bottom: '15%',
        },
        '@media (max-width: 992px)': {
            marginLeft: '30px',
            height: '100%',
            width: '40%',
            bottom: '10%',
        },
        '@media (max-width: 768px)': {
            marginLeft: '20px',
            height: '90%',
            width: '50%',
            bottom: '5%',
        },
        '@media (max-width: 576px)': {
            marginLeft: '10px',
            height: '80%',
            width: '60%',
            bottom: '0%',
        },
        '@media (max-width: 480px)': {
            marginLeft: '5px',
            height: '70%',
            width: '70%',
            bottom: '0%',
        },
        '@media (max-width: 360px)': {
            marginLeft: '0',
            height: '60%',
            width: '80%',
            bottom: '0%',
        },
    },
    
    instructions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        padding: '20px',
    },
    ins1: {
        fontFamily: 'Poppins',
        fontSize: '36px',
        paddingTop: '10px',
        lineHeight: '24px',
        letterSpacing: '0px',
        color: '#962067',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '32px',
            lineHeight: '30px',
        },
    },
    ins2: {
        fontFamily: 'Poppins',
        fontSize: '24px',
        lineHeight: '30px',
        letterSpacing: '0px',
        color: '#58595B',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '18px',
            lineHeight: '24px',
        },
    },
    ins3: {
        fontFamily: 'Poppins',
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '0px',
        color: '#939598',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '16px',
            lineHeight: '20px',
        },
    },
    searchBar: {
        display: 'flex',
        // flexDirection: 'column',
        marginTop: '-60px',
        marginRight: '0px',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'none',
        width: '100%',
        marginBottom: '10px',
        '@media (max-width: 600px)': {
            width: '100%',
        },
    },
    searchBar1: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '15px',
        '@media (max-width: 600px)': {
            width: '100%',
        },
    },
    serachtext: {
        position: 'relative',
        bottom: '80%',
        left: '40%',
        letterSpacing: '0px',
        color: '#58595B',
        opacity: 1,
        width: '50%',
        alignItems: 'center',
        fontFamily: 'Poppins',
        fontSize: '14px',
        justifyContent: 'center',
        marginTop: '-100px',
        marginBottom: '10px',
        '@media (max-width: 600px)': {
            width: '50%',

        },
    },
    locationDropdown: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#962067',
        margin: '0 10px',
    },
    searchButton: {
        width: '230px',
        margin: '0 20px',
        height: '45px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #E9AFB7',
        fontFamily: 'Poppins',
        borderRadius: '35px',
        textTransform: 'none',
        color: '#58595B',
        fontSize: '14px',
        fontWeight: 'regular',
        opacity: 1,
        '@media (max-width: 600px)': {
            width: '100%',
            fontSize: '18px',
            height: '40px',
        },
    },
    searchmain: {
        background: '#962067 0% 0% no-repeat padding-box',
        color: 'white',
        width: '70px',
        height: '28px',
        boxShadow: '0px 3px 6px #00000029',
        fontStyle: 'Poppins',
        fontFamily: 'Poppins',
        borderRadius: '26px',
        position: 'absolute',
        left: '70%',
        marginBottom: '20px',
        opacity: 1,
        '@media (max-width: 600px)': {
            width: '70px',
            height: '30px',
        },
    },
    search: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            width: '100%',

        },
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
    },
    searchfield: {
        width: '70%',
        padding: '5px',
        borderColor: '#962067',
        position: 'relative',
        alignItems: 'center',
        fontFamily: 'Poppins',
        color: COLORS.placeholderColor,
        fontSize: '12px',
        justifyContent: 'center',
        right: '40%',
        bottom: '60%',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #962067',
        borderRadius: '35px',
        opacity: 1,
        '@media (max-width: 600px)': {
            width: '100%',
            padding: '5px',
        },
    },
    searchIcon: {
        height: '1.5rem',
        width: '1.5rem',
        padding: '4px',
        position: 'absolute',
        alignItems: 'right',
        boxSizing: 'border-box',
        top: '50%',
        left: '2px',
        transform: 'translateY(-50%)',
    },
    secondSplit: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // backgroundColor: '#FFF7FB',
        backgroundColor: '#ffe6f2',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
            width: '100%',

        },
    },
    buttext: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        width: '100%',
        height: '55px',
        marginLeft: '200px',
        borderRadius: '35px',
        opacity: 1,
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: COLORS.textColor,
        letterSpacing: '0px',
        '@media (max-width: 600px)': {
            fontSize: '32px',
            width: '100%',
            height: '55px'
        },
    },
    buttext1: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        width: '100%',
        height: '55px',
        marginRight: '200px',
        marginLeft: '0px',
        borderRadius: '35px',
        opacity: 1,
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: COLORS.textColor,
        letterSpacing: '0px',
        '@media (max-width: 600px)': {
            fontSize: '32px',
            width: '100%',
            height: '55px'
        },
    },
    qrtext: {
        display: 'flex',
        alignItems: 'left',
        position: 'relative',
        marginLeft: '60px',
        font: 'normal normal normal 14px Poppins',
        color: COLORS.primaryColor,  
        marginBottom: '20px',      
        letterSpacing: '0px',
        '@media (max-width: 600px)': {
            width: '60%',
            height: '55px',
        },
    },
    imageSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // padding: '20px',
        alignItems: 'left',
        justifyContent: 'space-between',
        marginLeft: '150px'
    },
    imageSection1: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0',
    },
    qrimage: {
        width: '5%',
        borderWidth: '10px',
        marginBottom:'10px',
        marginLeft: '10%',
        display: 'block',
        alignSelf: 'flex-start',
        '@media (max-width: 600px)': {
            width: '5%',

        },
    },
    thirdSplit: {
        display: 'flex',
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        alignItems: 'center',
        marginTop: '1%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '1%',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            width: '100%',
        },
    },
    tt1: {
        fontFamily: 'Poppins',
        paddingTop: '10px',
        fontSize: '28px',
        lineHeight: '40px',
        display: 'flex',
        justifyContent: 'center',
        letterSpacing: '0px',
        color: '#962067',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '24px',
            lineHeight: '30px',
        },
    },
    tt2: {
        fontFamily: 'Poppins',
        paddingTop: '20px',
        fontSize: '20px',
        lineHeight: '30px',
        display: 'flex',
        justifyContent: 'center',
        letterSpacing: '0px',
        color: '#58595B',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '18px',
            lineHeight: '24px',
        },
    },
    tt3: {
        fontFamily: 'Poppins',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0px',
        color: '#939598',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '16px',
            lineHeight: '20px',
        },
    },
    eventCalander: {
        width: '237px',
        height: '237px',
        position: 'relative',
        left: '43%',
        opacity: 1,
        '@media (max-width: 600px)': {
            width: '100%',
            height: 'auto',
            left: '0',
        },
    },
    pastSection: {
        display: 'flex',
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pastmain: {
        display: 'flex',
        flex: 0,
        width: '100%',
        height: '27px',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: '0px',
        justifyContent: 'space-between',
        '@media (max-width: 600px)': {
            width: '100%',
            height: '30px',
        },
    },
    imageRounded: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            width: '100px',
            height: '100px',
        },
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        },
    },
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        // padding: '20px',
        boxShadow: '0px 3px 6px #00000029',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        '@media (max-width: 600px)': {
            fontSize: '18px',
        },
    },
    description: {
        fontSize: '16px',
        color: '#58595B',
        '@media (max-width: 600px)': {
            fontSize: '14px',
        },
    },
    featuresContainer: {
        backgroundColor: '#8b3063',
        padding: '10px 10px',
        textAlign: 'center',
        color: 'white',
        '@media (max-width: 600px)': {
            fontSize: '32px',
            lineHeight: '30px',
        },
    },
    featuresTitle: {
        marginBottom: '26px',
        fontFamily: 'Poppins',
        fontSize: '1.8em',
        '@media (max-width: 600px)': {
            fontSize: '32px',
            lineHeight: '30px',
        },
    },
    featuresList: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    featureItem: {
        maxWidth: '200px',
        margin: '20px',
        textAlign: 'center',
    },
    featureIcon: {
        width: '200px',
        height: '200px',
        marginBottom: '10px',
        borderRadius: '50%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
            width: '150px',
            height: '150px',
        },
    },
    featureImage: {
        width: '70%',
        height: '70%',
        objectFit: 'cover',
        // Add these properties to maintain image quality
        imageRendering: 'auto', // This will default to 'auto', which is good for most cases
        imageRendering: 'crisp-edges', // Optional: Try 'crisp-edges' if you need better quality for pixel art
        imageRendering: 'pixelated', // Optional: Try 'pixelated' if you need better quality for pixel art
    },
    featureTitle: {
        marginBottom: '10px',
        fontFamily: 'Poppins',
        color: '#E9AFB7',
        fontSize: '1.0em',
    },
    featureDescription: {
        fontFamily: 'Poppins',
        fontSize: '0.8em',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        padding: '20px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        },
    },
    section: {
        borderRadius: '20px',
        padding: '10px',
        backgroundColor: 'white',
        fontFamily: 'Poppins',
    },
    title: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: '26px',
        color: COLORS.primaryColor,
        '@media (max-width: 600px)': {
            fontSize: '24px',
        },
    },
    see: {
        marginLeft: '10px',
        color: COLORS.primaryColor,
        fontFamily:'Poppins',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#8b3063',
        textDecoration: 'underline',
        marginBottom: '0px',
        marginLeft: '350px',        
       
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '7px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        height: 'auto',
        '@media (max-width: 600px)': {
          flexDirection: 'row',
          padding: '0px',
        },
      },
    cardImageContainer: {
        width: 'fit-content',
        height: 'fit-content',
        marginRight: '10px',
        borderRadius: '50%',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
          width: '100%',
          height: 'auto',
          marginRight: '0',
        },
      },
      cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        // Add these properties to maintain image quality
        imageRendering: 'auto', // This will default to 'auto', which is good for most cases
        // imageRendering: 'crisp-edges', // Optional: Try 'crisp-edges' if you need better quality for pixel art
        // imageRendering: 'pixelated', // Optional: Try 'pixelated' if you need better quality for pixel art
      },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        '@media (max-width: 600px)': {
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    doctorCard: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '7px',
        boxShadow: '0px 2px 4px rgba(0, 0.1, 0.1, 0.1)',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            padding: '15px',
        },
    },
    imageContainer: {
        width: '20%',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: '10px',
        '@media (max-width: 600px)': {
            width: '80px',  // Ensuring the image is still a square for proper circle appearance
            height: '80px', // Ensuring the image is still a square for proper circle appearance
            marginRight: '0',
            margin: '0 auto', 
        },
    },
    doctorImage: {
        width: '100%',
        height: '120%',
        objectFit: 'cover',
    },
    doctorContent: {
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 600px)': {
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    footer: {
        display: 'flex',
        width: '100%',
        height: '80px',
        backgroundColor: COLORS.primaryColor,
        borderRadius: '10px 10px 0px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        '@media (max-width: 600px)': {
            width: '100%',
            height: '80px',
        },
    },
    videoSlider: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    videoPlayerContainer: {
        maxWidth: '100%',
        marginBottom: '20px',
    },
    videoPlayer: {
        width: '100%',
        maxWidth: '800px',
    },
    videoThumbnails: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    videoThumbnail: {
        textAlign: 'center',
    },
    thumbnailImage: {
        width: '150px',
        height: 'auto',
        marginBottom: '10px',
    },
    videoTitle: {
        fontFamily: 'Poppins',
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px',
    },
    videoDots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
    },
    dot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
        display: 'inline-block',
        cursor: 'pointer',
    },
// Media Queries
'@media (max-width: 800px)': {
    videoPlayer: {
        maxWidth: '100%',
        },
    thumbnailImage: {
        width: '120px',
        },
    videoTitle: {
        fontSize: '14px',
        },
},
'@media (max-width: 600px)': {
    videoThumbnail: {
        marginBottom: '20px',
        },
    videoDots: {
        flexDirection: 'column',
            gap: '10px',
        },
    dot: {
        width: '6px',
            height: '6px',
        },
},
specialtiesCardHover: {
    boxShadow: '0 0.5vw 1vw rgba(0,0,0,0.2)',
    },
};

export default styles;
