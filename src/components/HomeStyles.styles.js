import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { textFieldClasses } from "@mui/material";
import Images from './constants/Images.js';

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
    },
    
    instructions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
    },
    ins1: {
        fontFamily: 'Poppins',
        paddingTop:'10px',
        fontSize: '50px',
        lineHeight: '40px',
        letterSpacing: '0px',
        color: '#962067',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '24px',
            lineHeight: '30px',
        },
    },
    ins2: {
        fontFamily: 'Poppins',
        fontSize: '30px',
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
        fontSize: '22px',
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
        justifyContent: 'center',
        alignItems: 'center',  
        width: '100%',
        backgroundImage:'{Images.family_front}',
    },
    nav:{
        position:'relative',
        left:'68%',
    },
        navul: {
        listStyle: 'none',
        marginTop:'5px',
        fontSize:'100px',
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-left',
      },
      
      navli: {
        marginLeft: '20px',
        fontWeight: 'bold',
        fontSize: '1px',
        fontFamily:  'sans-serif',
      },
      
    nava:{
        color: '#fff',
        textDecoration:' none',
        fontSize: '18px',
      },
      
      
    serachtext:{
        position:'relative',
        bottom:'60%',
        left:'40%',
        letterSpacing:' 0px',
        color: '#58595B',
        opacity: 1,
        width:'50%',
    },

    locationDropdown: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#962067',
        margin: '0 10px',
    },
    searchButton: {

        width: '300px',
        margin: '0 20px',
        height: '50px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #E9AFB7',
        fontFamily:'Poppins',
        borderRadius: '35px',
        color:'#58595B',
        fontsize:'26px',
        fontweight:'regular',
        opacity: 1
    },
    searchmain: {
        background:' #962067 0% 0% no-repeat padding-box',
        color:'white',
        width: '70px',
        height: '28px',
        boxShadow: '0px 3px 6px #00000029',
        fontStyle:'Poppins',
        fontFamily:'Poppins',
        borderRadius:' 26px',
        position:'absolute',
        left:'30%',
        opacity: 1,

    },
    
    search: {
        position:'relative',
        width:'100%',
        display: 'flex',
        alignItems: 'center',
    // add other styles as needed
  },
  searchContainer: {
    position: 'relative', // Make the container relative for positioning the icon
    width: '100%', // Ensure the container spans the full width
  },
  searchfield: {
    width: '70%',
    padding: '10px',
    borderColor:'#962067',
    position:'relative',
    right:'50%',
background: '#FFFFFF 0% 0% no-repeat padding-box',
border: '1px solid #962067',
borderRadius: '35px',
opacity: 1,
  },
  searchIcon: {
    height: '1.5rem',
    width: '1.5rem',
    padding: '4px',
    position: 'absolute',
    alignItems:'right',
    boxSizing: 'border-box',
    top: '50%',
    left: '2px',
    transform: 'translateY(-50%)',
  },

    secondSplit: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#FFF7FB',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    buttext:{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        textAlign: 'center',
        width: '100%',
        height: '55px',
        borderRadius: '35px',
        opacity: 1,
        font: 'normal normal normal 17px Poppins',
        letterSpacing: '0px'    ,
    },
    qrtext:{
        display: 'flex',
        alignItems: 'left',
        position: 'relative',
        right:'15%',
        width: '60%',
        height: '55px',
        borderRadius: '35px',
        opacity: 1,
        font: 'normal normal normal 17px Poppins',
        letterSpacing: '0px'    ,
    },
    imageSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 0',
    },

    qrimage:{
        width: '5%',
        borderWidth: '10px',
        marginLeft: '10%',
        display: 'block',            // Change to block if you want it to behave like a block-level element
        alignSelf: 'flex-start',
    },
    thirdSplit: {
        display: 'flex',
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        alignItems:'center',
        marginTop: '2%',
        marginLeft:'3%',
        marginRight: '4%',
        
    },
    tt1: {
        fontFamily: 'Poppins',
        paddingTop:'10px',
        fontSize: '40px',
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
        fontSize: '30px',
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

        fontSize: '22px',
        lineHeight: '24px',
        letterSpacing: '0px',
        color: '#939598',
        opacity: 1,
        '@media (max-width: 600px)': {
            fontSize: '16px',
            lineHeight: '20px',
        },
    },
    eventCalander:{
    width: '237px',
    height: '237px',
    position: 'relative',
    left:'43%',
    opacity: 1,
    },

    fourthSplit: {
        display: 'flex',
        width: 'fit-screen',
        backgroundColor: '#962067',
        borderRadius: '10px',
        padding: '20px',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '8px',
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 'fit-screen',
        color:'#FFFFFF',
      },
      featurename: {
        color:'#E9AFB7',
        fontFamily:'Poppins',
        fontSize:'20px',
      },
      gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginTop: '16px',
      },
      featureBox: {
        padding: '16px',
        textAlign: 'center',
        borderRadius: '8px',
        
      },
      imagecont: {
        width: '200px',
        height: '200px',
        backgroundColor: 'white',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        maxWidth: '60%',
        height: '60%',
        
        objectFit: 'cover', // Ensures the image covers the entire container
      },




    cardGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
    },
    gridCard: {
        width: '22%',
        marginBottom: '20px',
        '@media (max-width: 960px)': {
            width: '45%',
        },
        '@media (max-width: 600px)': {
            width: '100%',
        },
    },
    seeMoreButton: {
        display: 'block',
        margin: '0 auto',
    },
    footer: {
        display: 'flex',
        width: '100%',
        height: '80px',
        backgroundColor: '#962067',
        borderRadius: '10px 10px 0px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8px',
    },
};

export default styles;
