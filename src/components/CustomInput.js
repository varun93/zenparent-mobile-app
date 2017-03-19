import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-onsenui';
import {isFieldEmpty} from '../utils';
import classNames from 'classnames';
require('../styles/custom-input.css');


class InputError extends Component{

  constructor(props,context){
		super(props,context);
	}


  render(){ 

  	 let errorClass = classNames(this.props.className, {
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    });

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

}

export default class CustomInput extends Component{

	constructor(props,context){
		super(props,context);

		this.state =  {
	      isEmpty: true,
	      value: null,
	      valid: false,
	      errorMessage: "Input is invalid",
	      errorVisible: false
	    };

	}


	handleChange(event){
  
	    this.validation.call(this,event.target.value);
	    
	    if(this.props.onChange) {
	      this.props.onChange(event);
	     }
  
  	}

	validation(value) {
	    
	    var message = "";
	    var errorVisible = false;
	    var valid = true;
	    
	    if(isFieldEmpty(value)) {
	      message = this.props.emptyMessage;
	      valid = false;
	      errorVisible = true;
	    }

	    if(this.props.validate && !this.props.validate(value)){
	      message = this.props.errorMessage;
	      valid = false;
	      errorVisible = true;
	    }

	    this.setState({
	      value: value,
	      isEmpty: isFieldEmpty(value),
	      valid: valid,
	      errorMessage: message,
	      errorVisible: errorVisible
	    });

	  }

	render(){

		let errorClass = classNames(this.props.className, {
	      'has-error':   this.state.errorVisible && !this.state.valid
	    });


		return (
			<div className="input-container">
				<Input
				    className={errorClass}
				    disabled={this.props.disabled}
				    type={this.props.type}
					onChange={this.handleChange.bind(this)}
					placeholder={this.props.placeholder} />
				<InputError 
          			visible={this.state.errorVisible} 
          			errorMessage={this.state.errorMessage} />
			</div>
		)
	}
}
