import React from 'react';

const styles = (isActive1 = true, isActive2 = false) => ({
  parentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTouchStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFFFFF', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: isActive1 ? 2 : 0,
    borderBottomColor: isActive1 ? '#972168' : 'lightgray',
  },
  buttonTouchStyle1: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: isActive2 ? 2 : 0,
    borderBottomColor: isActive2 ? '#972168' : 'lightgray',
  },
  consultButtonTouchStyle: {
    height: 45,
    padding: '10px 0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: 'Your Font Family',
    fontWeight: 500,
    color: isActive1 ? '#972168' : '#333333',
  },
  titleStyle1: {
    fontSize: 16,
    fontFamily: 'Your Font Family',
    fontWeight: 500,
    color: isActive2 ? '#972168' : '#333333',
  },
  consultTitleStyle1: {
    fontSize: 14,
    fontFamily: 'Your Font Family',
    fontWeight: 500,
    marginBottom: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginInline: 20,
    backgroundColor: '#FFF7FC',
  },
  profileImageBefore: {
    width: 70,
    height: 70,
    backgroundColor: '#FFF7FC',
  },
  spacing: {
    width: 7,
    height: 7,
  },
  name: {
    fontSize: 24,
    color: '#000000',
  },
  gender: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  uhid: {
    fontSize: 16,
    color: '#000000',
  },
  abha: {
    fontSize: 16,
  },
  profileList: {
    backgroundColor: '#FFF7FC',
    paddingInline: 20,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 'calc(100% / 3.6)',
    borderRadius: 7,
  },
  profileSectionTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 400,
  },
  itemTitle: {
    fontSize: 12,
    color: '#58595B',
  },
  itemDesc: {
    fontSize: 16,
    color: '#58595B',
    fontWeight: 400,
  },
  consultDistance: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
    marginBottom: 4,
    paddingInline: 15,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export default styles;
