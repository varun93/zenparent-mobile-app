import React,{Component} from 'react';
import {Page,Button} from 'react-onsenui';
import CouponApi from '../api/CouponApi'

export default class CouponPayment extends Component{

	constructor(props,context){
		super(props,context);
	}

	makePayment(){
		const couponId = '125181';
		const phoneNumber = '8971871983';
		CouponApi.couponPayment(couponId,phoneNumber).then((response) => {
			const paymentUrl = response.data.paymentUrl;
			const transactionReferenceId = response.data.transactionReferenceId;

			console.log(paymentUrl);
			console.log(transactionReferenceId);

			var ref = cordova.InAppBrowser.open(encodeURI(paymentUrl), '_blank');

			ref.addEventListener('loadstop', function(event){

				if(event.url.match('coupon/transaction_complete')) {
					// event.url
					//extract the parameters payment_id and payment_request_id
					alert(event.url);
					console.log(event.url);
					ref.close();
		    }

			});

		}).catch((e) => {
			console.log(e);
		});
	}

	render(){
		return (
			<Page>
				<Button onClick={this.makePayment.bind(this)} modifier='large'>Make Payment</Button>
			</Page>
		);
	}

}