import React, { Component } from 'react';
import Input from '../../components/UI/Form/Input/Input';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = { 
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Passward'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
     };





    inputChangeHandler(event, controlName) {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.ckeckValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        } 
        this.setState({controls: updatedControls});
     }

     ckeckValidity(value, rules) {
        let isValid = true;
        if (!rules){
            return true
        }
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    authSwitchHandler = () => {
        this.setState(prevState =>{
            return {isSignUp: !prevState.isSignUp}
        })
    };

    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };
        let form = (formElementsArray.map(formElement => {
            return(
                <Input 
                key={formElement.id}
                elementconfig={formElement.config.elementConfig}
                elementtype={formElement.config.elementType}
                value={formElement.value}
                invalid={!formElement.config.valid}
                inputTouched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event)=>this.inputChangeHandler(event, formElement.id)} />
            )
        }));

        return ( 
            <div className={classes.Auth}>
                { this.props.auth ? <Spinner /> :
                    <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>}
                <Button 
                    clicked={this.authSwitchHandler}
                btnType='Danger'>SWITCH TO {this.state.isSignUp ? "SIGNIN" : 'SIGNUP'}</Button>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuthenticate: (email, password, signUpMethod)=> dispatch(actions.auth(email, password, signUpMethod))
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps) (Auth);