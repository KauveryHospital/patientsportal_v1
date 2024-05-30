import {onApiCall} from './CommonApi';
import {BASE_URL} from './constant';
import {onApiSecondaryCall} from './secondaryCommonApi';

export const sliderStaticData = () => {
  return onApiCall({
    url: BASE_URL + `base/static-content/001/`,
    method: 'GET',
  });
};

export const verifyNumber = body => {
  return onApiCall({
    url: BASE_URL + `user/mn-process/`,
    method: 'POST',
    data: body,
  });
};

export const verifyOTP = body => {
  return onApiCall({
    url: BASE_URL + `user/mn-otp-validate/`,
    method: 'POST',
    data: body,
  });
};

export const resendOTP = body => {
  return onApiCall({
    url: BASE_URL + `user/mn-otp-resend/`,
    method: 'POST',
    data: body,
  });
};

export const signUp = body => {
  return onApiCall({
    url: BASE_URL + `user/1/direct/sign-up/`,
    method: 'POST',
    data: body,
  });
};

export const GooglePlaceIds = text => {
  return onApiCall({
    url: BASE_URL + `base/place-auto-complete/?search=${text}`,
    method: 'GET',
  });
};
export const googlePinCode = body => {
  return onApiCall({
    url: BASE_URL + `base/gm-address/`,
    method: 'POST',
    data: body,
  });
};

export const getKhDetails = () => {
  return onApiCall({
    url: BASE_URL + `user/kh/list/`,
    method: 'GET',
  });
};

export const mergeKHDetails = body => {
  return onApiCall({
    url: BASE_URL + 'user/1/kh/merge/',
    method: 'POST',
    data: body,
  });
};

export const onSetProfileApiCall = formData => {
  return onApiCall({
    url: BASE_URL + 'user/photo/upload/',
    method: 'POST',
    data: formData,
  });
};

export const getFeatureGuideApi = () => {
  return onApiCall({
    url: BASE_URL + `base/feature-guide/001/`,
    method: 'GET',
  });
};

export const getProfileApi = () => {
  return onApiCall({
    url: BASE_URL + `user/profile/`,
    method: 'GET',
  });
};

export const setWhatsAppApi = text => {
  return onApiCall({
    url: BASE_URL + `user/1/profile/whatsapp-update/${text}/`,
    method: 'GET',
  });
};

export const accessProfileApi = () => {
  return onApiCall({
    url: BASE_URL + `user/0/profile/provided-access-list/`,
    method: 'GET',
  });
};
export const sharedProfileApi = () => {
  return onApiCall({
    url: BASE_URL + `user/0/profile/shared-list/`,
    method: 'GET',
  });
};

export const deleteProfile = body => {
  return onApiCall({
    url: BASE_URL + 'user/profile/delete/',
    method: 'POST',
    data: body,
  });
};

export const getAboutApi = () => {
  return onApiCall({
    url: BASE_URL + `base/profile/about-kauvery/`,
    method: 'GET',
  });
};

export const getPrivacyApi = () => {
  return onApiCall({
    url: BASE_URL + `base/profile/privacy-policy/`,
    method: 'GET',
  });
};

export const getTermsApi = () => {
  return onApiCall({
    url: BASE_URL + `base/profile/terms-conditions/`,
    method: 'GET',
  });
};

export const getRelationData = () => {
  return onApiCall({
    url: BASE_URL + `base/add-member/001/`,
    method: 'GET',
  });
};

export const removeProfile = body => {
  return onApiCall({
    url: BASE_URL + 'user/0/profile/remove-user/',
    method: 'POST',
    data: body,
  });
};

export const getFamilyKhDetails = () => {
  return onApiSecondaryCall({
    url: BASE_URL + `user/kh/list/`,
    method: 'GET',
  });
};

export const getFamilyProfileApi = () => {
  return onApiSecondaryCall({
    url: BASE_URL + `user/profile/`,
    method: 'GET',
  });
};
export const getPrimaryData = text => {
  return onApiCall({
    url: BASE_URL + `user/0/profile/list/${text}/`,
    method: 'GET',
  });
};

export const signUpFamily = body => {
  return onApiSecondaryCall({
    url: BASE_URL + `user/1/direct/sign-up/`,
    method: 'POST',
    data: body,
  });
};
export const addFamilyMembers = body => {
  console.log(body,"FamilyMemberBody")
  return onApiCall({
    url: BASE_URL + `user/0/profile/add-members/`,
    method: 'POST',
    data: body,
  });
};

export const createTicketUnmergedIds = body => {
  return onApiCall({
    url: BASE_URL + `ticket/0/ticket/unmerged-ids/new-entry/`,
    method: 'POST',
    data: body,
  });
};
export const createTicketFamilyUnmergedIds = body => {
  return onApiSecondaryCall({
    url: BASE_URL + `ticket/0/ticket/unmerged-ids/new-entry/`,
    method: 'POST',
    data: body,
  });
};

export const mergeKHFamilyDetails = body => {
  return onApiSecondaryCall({
    url: BASE_URL + 'user/1/kh/merge/',
    method: 'POST',
    data: body,
  });
};
export const getSecondaryProfileApi = () => {
  return onApiSecondaryCall({
    url: BASE_URL + `user/profile/`,
    method: 'GET',
  });
};

export const secondarySignUp = body => {
  return onApiCall({
    url: BASE_URL + `user/0/direct/sign-up/`,
    method: 'POST',
    data: body,
  });
};

export const mergeSameUserKHDetails = body => {
  return onApiCall({
    url: BASE_URL + 'user/0/kh/merge/',
    method: 'POST',
    data: body,
  });
};

export const ticketListData = (page, page_size) => {
  return onApiCall({
    url: BASE_URL + `ticket/0/list/?page=${page}&page_size=${page_size}`,
    method: 'GET',
  });
};
export const getUserDetails = profile_id => {
  return onApiCall({
    url: BASE_URL + `user/0/profile/get-profile/${profile_id}/`,
    method: 'GET',
  });
};

export const deactivateSharedAPI = body => {
  return onApiCall({
    url: BASE_URL + 'user/0/profile/terminate-access/',
    method: 'POST',
    data: body,
  });
};

export const removeProfilePic = () => {
  return onApiCall({
    url: BASE_URL + 'user/photo-delete/',
    method: 'DELETE',
  });
};

// Book consult

export const doctorDetails = text => {
  return onApiCall({
    url: BASE_URL + `hms/doctor/${text}/`,
    method: 'GET',
  });
};
export const specializationList = (unitID, page, page_size, region) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/specialization/list/?unit_id=${unitID}&page=${page}&page_size=${page_size}&region=${region}`,
    method: 'GET',
  });
};
export const specializationList1 = (unitID, page, page_size, region) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/specialization/list/?page=${page}&page_size=${page_size}&region=${region}`,
    method: 'GET',
  });
};

export const specializationListWithUnitID = (unitID, page, page_size) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/specialization/list/?unit_id=${unitID}&page=${page}&page_size=${page_size}`,
    method: 'GET',
  });
};

export const nearbyUnits = (coordinates, region) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/units/nearby/?coordinates=${coordinates}&region=${region}`,
    method: 'GET',
  });
};

export const nearbyUnitsRegion = region => {
  return onApiCall({
    url: BASE_URL + `hms/0/units/nearby/?region=${region}`,
    method: 'GET',
  });
};

export const nearbyUnitsWithoutRegion = () => {
  return onApiCall({
    url: BASE_URL + `hms/0/units/nearby/`,
    method: 'GET',
  });
};

export const nearbyUnitsCoordinates = coordinates => {
  return onApiCall({
    url: BASE_URL + `hms/0/units/nearby/?coordinates=${coordinates}`,
    method: 'GET',
  });
};

export const doctorsListInConsultation = (unitID, region, page, page_size) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/doctor/list/?unit_id=${unitID}&page=${page}&page_size=${page_size}`,
    method: 'GET',
  });
};

export const doctorsListInConsultationwithoutPagenation = (unitID, region) => {
  return onApiCall({
    url: BASE_URL + `hms/0/doctor/list/?unit_id=${unitID}&region=${region}`,
    method: 'GET',
  });
};

export const doctorsSearchListInConsultation = (unitID, region, search) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/doctor/list/?unit_id=${unitID}&search=${search}`,
    method: 'GET',
  });
};

export const slotSelectionApi = body => {
  return onApiCall({
    url: BASE_URL + `hms/0/doctor/slots/?page=1&page_size=100`,
    method: 'POST',
    data: body,
  });
};
export const slotSelectionApiBook =( body,page,page_size )=> {
  return onApiCall({
    url: BASE_URL + `hms/0/doctor/slots/?page=${page}&page_size=${page_size}`,
    method: 'POST',
    data: body,
  });
};
export const doctorsListspecializationID = (
  unitID,
  specializationID,
  page,
  page_size,
) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/doctor/list/?unit_id=${unitID}&specialization_id=${specializationID}&page=${page}&page_size=${page_size}`,
    method: 'GET',
  });
};

export const reScheduleSlotSelectionApi = (body,unit_id) => {
  return onApiCall({
    url:
      BASE_URL +
      `hms/0/doctor/slots/?page=1&page_size=100&unit_id=${unit_id}`,
    method: 'POST',
    data: body,
  });
}

export const familyMembersList = () => {
  return onApiCall({
    url: BASE_URL + 'user/login-profile/list/',
    method: 'GET',
  });
};

export const createBooking = body => {
  return onApiCall({
    url: BASE_URL + 'booking/0/create/',
    method: 'POST',
    data: body,
  });
};

export const createBookingPayAtHospital = body => {
  return onApiCall({
    url: BASE_URL + 'booking/1/create/',
    method: 'POST',
    data: body,
  });
};

export const bookingInitialize = _id => {
  return onApiCall({
    url: BASE_URL + `payment/0/intialize/${_id}/`,
    method: 'GET',
  });
};

export const createWebHooks = body => {
  return onApiCall({
    url: BASE_URL + 'payment/0/webhook/',
    method: 'POST',
    data: body,
  });
};

export const upcomingEvents = () => {
  return onApiCall({
    url: BASE_URL + 'booking/0/events/',
    method: 'GET',
  });
};

export const addFeedback = body => {
  return onApiCall({
    url: BASE_URL + 'booking/0/feedback/',
    method: 'POST',
    data: body,
  });
};

export const updateBooking = body => {
  return onApiCall({
    url: BASE_URL + 'booking/0/update/',
    method: 'PATCH',
    data: body,
  });
};

export const reScheduleBooking = id => {
  return onApiCall({
    url: BASE_URL + `booking/0/detail/view/${id}/?page=1&page_size=100`,
    method: 'GET',
  });
};

export const getReasonAPICall = id => {
  return onApiCall({
    url: BASE_URL + `base/appoinment-cancel/dropdown/`,
    method: 'GET',
  });
}
export const cancelBookingAPICall = (body, PaymentSuccess) => {
  return onApiCall({
    url: BASE_URL + `booking/${PaymentSuccess}/refund/cancel/`,
    method: 'POST',
    data: body,
  });
};

export const requestNow = body => {
  return onApiCall({
    url: BASE_URL + 'booking/0/request/',
    method: 'POST',
    data: body,
  });
}

export const updateReschedule = body => {
  return onApiCall({
    url: BASE_URL + 'booking/1/update/',
    method: 'PATCH',
    data: body,
  });
}

export const paymentHistoryListData = (status) => {
  return onApiCall({
    url: BASE_URL + `payment/0/list/?status=${status}`,
    method: 'GET',
  });
};

export const getFeedbackList = () => {
  return onApiCall({
    url: BASE_URL + `base/feedback/dropdown/`,
    method: 'GET',
  });
};

export const deleteProfileReasonList = () => {
  return onApiCall({
    url: BASE_URL + `base/account-delete/dropdown/`,
    method: 'GET',
  });
}

export const logoutApi = () => {
  return onApiCall({
    url: BASE_URL + 'user/logout/',
    method: 'POST',
  });
}

export const autoFetchPincode = (lat,lng) => {
  return onApiCall({
    url: BASE_URL + `base/auto-fetch-pincode/?lat=${lat}&lng=${lng}`,
    method: 'GET',
  });
};
