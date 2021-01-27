import React, { Component } from 'react';
import Auxe from '../../../Hoc/Auxe';
import Button from '../../UI/Button/Button';

    class OrderSummary extends Component {


        componentDidUpdate() {
            // console.log('[OredrSummary] comonentDidUpdate')
        }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}> <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} </li>
        })

        return(
            <Auxe>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.purhaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxe>
        )
    }
    }

export default OrderSummary;