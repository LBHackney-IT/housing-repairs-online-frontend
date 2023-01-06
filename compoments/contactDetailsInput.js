import PropTypes from 'prop-types';
import Button from './button';
import React, {useState} from 'react';
import {Component} from 'react';

const onChangeName = (event) => {
  console.log(`Name changed to ${event.target.value}`)
}

const onChangeNumber = (event) => {
  console.log(`Number changed to ${event.target.value}`)
}


class ContactDetailsInput extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.title = this.props.title;
    this.label = this.props.label;
    this.hint = this.props.hint;
    this.onKeyPress = this.props.onKeyPress;
    this.long = this.props.long;
    this.onSubmit = this.props.onSubmit;
    this.buttonText = this.props.buttonText;
    this.validation = this.props.validation;
    this.type = this.props.type;
    this.nameLabel = this.props.nameLabel;
    this.nameName = this.props.nameName;
    this.nameType = this.props.nameType;
    this.state = {
      value: this.props.value || '',
      error: {}
    };
  }

  input = {
    defaultValue: this.props.value,
    id: this.name
  }

  componentDidMount() {
    var textLabel = document.getElementById(`${this.name}-label`)
    textLabel.setAttribute('for', this.name)
  }

  setNameValue(event) {
    this.setState({
      contactNameValue: event.target.value,
      error: {}
    })
  };

  setNumberValue(event) {
    this.setState({
      contactNumberValue: event.target.value,
      error: {}
    })
  };


  formSubmit = (e) => {
    e.preventDefault();
    const mystate = this.state;
    console.log(`state is to ${JSON.stringify(mystate)}`)
    console.log(`name length is to ${this.state.contactNameValue?.length}`)
    console.log(`name length is to ${this.state.contactNumberValue?.length}`)

    if (this.state.contactNameValue?.length === undefined || this.state.contactNameValue?.length == 0) {
      return this.setState({
        error: {
          msg: 'You must enter a contact name',
          touched: true
        }})
    }

    if (this.state.contactNumberValue?.length === undefined  || this.state.contactNumberValue?.length == 0) {
      return this.setState({
        error: {
          msg: 'You must enter a contact number',
          touched: true
        }})
    }

    const contactDetails =
    {
      contactNameValue: this.state.contactNameValue,
      contactNumberValue: this.state.contactNumberValue
    }
    // if (this.validation && !this.validation.isValid(this.state.value)) {
    //   return this.setState({
    //     error: {
    //       msg: this.validation.errorMessage,
    //       touched: true
    //     }
    //   })
    // }

    return this.onSubmit(contactDetails)
  };

  render(){
    return (
      <>
        <h1 className="lbh-heading-h1">{this.title}</h1>
        <div className={this.state.error.msg ? 'govuk-form-group--error' : 'govuk-form-group'}>
          <form action="" className={(this.long ? 'govuk-grid-column-two-thirds':'govuk-grid-column-one-third')+' govuk-!-padding-0'}>
            <span id={`${this.name}-error`}
              className="govuk-error-message govuk-!-margin-bottom-0">
              {this.state.error.msg}
            </span>
            <label className="govuk-label lbh-label" id={`${this.name}-label`} htmlFor={this.name}>
              {this.label}
            </label>
            <div id="event-name-hint" className="govuk-hint">
              {this.hint}
            </div>
            <input className="govuk-input govuk-!-margin-bottom-6" id={this.name}
              name={this.name}
              type={this.type}
              onChange={(e) => this.setNumberValue(e)}
              defaultValue={this.input.defaultValue}
              onWheel={(e) => e.target.blur()}
              onKeyPress={this.onKeyPress}
            />
            <label className="govuk-label lbh-label" id={`${this.nameName}-label`} htmlFor={this.nameName}>
              {this.nameLabel}
            </label>
            <input className="govuk-input govuk-!-margin-bottom-6" id={this.nameName}
              name={this.nameName}
              type={this.nameType}
              onChange={(e) => this.setNameValue(e)}
              defaultValue={this.input.defaultValue}
              onWheel={(e) => e.target.blur()}
              onKeyPress={null}
            />
            <Button onClick={this.formSubmit} >{this.buttonText}</Button>
          </form>
        </div>
      </>
    )
  }
}

ContactDetailsInput.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  title:  PropTypes.string.isRequired,
  validation: PropTypes.shape({
    errorMessage: PropTypes.string,
    isValid: PropTypes.func
  }),
};
export default ContactDetailsInput;
