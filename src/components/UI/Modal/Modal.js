import React, { Component } from 'react';
import classes from './Modal.css';
import Auxe from '../../../Hoc/Auxe';
import Backdrop from '../Backdop/Backdrop';

    class Modal extends Component {

        shouldComponentUpdate(nextProps, nextState) {
           
                return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        
        };

        componentDidUpdate() {
            console.log('[Modal] componentDidUpdate');
        };

        render() {

            return(
                <Auxe>
                <Backdrop show={this.props.show}  clicked={this.props.modalClose}/>
                <div className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
                {this.props.children}
            </div>
            </Auxe>
            )
        }
    } 
export default Modal;