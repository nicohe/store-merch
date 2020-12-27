import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = ({ history }) => {
  const { state: { cart, buyer }, addNewOrder } = useContext(AppContext)

  const paypayOptions = {
    clientId: 'AQlP_ctHqzDgBUv6dg-LMB3VCEp4FrFuauNPYn2ZJM1Q254cMTGnDasvheKX7GqUdE9J0irEXHchvis9',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  const handlePaymentSuccess = (data) => {
    console.log(data)
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resument del pedido:</h3>
          {cart.map((item) => (
            <div className="Payment-item" key={item.title}>
              <div className="Payment-element">
                <h4>{item.title}</h4>
                <span>
                  $
                  {' '}
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        <div className="Payment-button">
          <PayPalButton 
            paypalOptions={paypayOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={() => handlePaymentSuccess(data)}
            onPaymentError={() => console.log(error)}
            onPaymentCancel={() => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
}

export default Payment;