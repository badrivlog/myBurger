import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';

class ContactData extends Component {

    state = {
        orderForm : {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                pincode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'PIN'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 6
                    },
                    valid: false,
                    touched: false
                },
                counrty: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
                
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ings);


        this.setState({loading: true});
        const formData = {};
        for (let formInputIdentifier in this.state.orderForm) {
            formData[formInputIdentifier] = this.state.orderForm[formInputIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData

        }
        this.props.onOrderAdded(order);

    }
    inputChangeHandler = (event, inputIdentyfier)=> {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        
        const updatedInputElement = {
            ...updatedOrderForm[inputIdentyfier]
            };
            updatedInputElement.value = event.target.value;
            updatedInputElement.valid = this.ckeckValidity(updatedInputElement.value, updatedInputElement.validation);
            updatedInputElement.touched = true;
            updatedOrderForm[inputIdentyfier] = updatedInputElement;

            let formIsValid = true;
            for (let inputIdentifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
        
            this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>{
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
            })}
            <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        )
        if (this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h2>Enter Your Contact Data</h2>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onOrderAdded: (orderData) =>dispatch(actions.orderBurgerStart(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ContactData));