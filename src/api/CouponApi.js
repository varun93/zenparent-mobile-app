import fetch from 'isomorphic-fetch';
import {prepareFormData} from '../utils'
import {COUPON_PAYMENT_ENDPOINT} from '../constants'

class CouponApi {
  
  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`}
  }

  static couponPayment(couponId,phoneNumber){

    const headers = this.requestHeaders();

    const request = new Request(COUPON_PAYMENT_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({coupon_id : couponId,phone_number : phoneNumber})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

}

export default CouponApi;