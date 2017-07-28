import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    renderField (field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={`${field.label === 'Email' ? 'text' : 'password'}`}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    onSubmit(values) {
        // Przydatne
        const { history } = this.props;
        this.props.signupUser(values.email, values.password, history);
        // Need to do something to log user in
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Email"
                        name="email"
                        component={this.renderField}
                    />
                    <Field
                        label="Password"
                        name="password"
                        component={this.renderField}
                    />
                    <Field
                        label="Password confirmation"
                        name="passwordConfirm"
                        component={this.renderField}
                    />
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign in</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>

        );
    }
}

function validate (values){
    const errors = {};

    if(!values.email){
        errors.email = 'Enter an email';
    }
    if(!values.password){
        errors.password = 'Enter a password';
    }
    if(!values.passwordConfirm){
        errors.passwordConfirm = 'Confirm a password';
    }
    if (values.password !== values.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'signup'
})(connect (state => {return {errorMessage: state.auth.error}}, actions)(withRouter(Signup)));