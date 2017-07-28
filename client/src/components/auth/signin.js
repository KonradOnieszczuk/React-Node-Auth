import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    renderField (field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={`${field.label !== 'Password' ? 'text' : 'password'}`}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        const { history } = this.props;
        this.props.signinUser(values.email, values.password, history);
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
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign in</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        )
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

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'signin'
})(connect (mapStateToProps, actions)(withRouter(Signin)));