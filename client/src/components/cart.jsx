import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/quearies';
import { idbPromise } from '../../utils/helpers';
import CartItem from './cartItem';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51NimDjDT6tfiNPpdPw5gNPITk6ta8X2oBoWNOUuIEFPtGR3gOO0HzXxxKnBE9mw6pUIvNXhcxZD66s28hbmU0hx500MBa74YtM');

const Cart = ({book}) => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, {data}] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.order.length) {
            getCart();
        }
    }, [state.order.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.order.forEach((book) => {
            sum += book.price * book.quantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {

        getCheckout({
            variables: {
                products: [...state.cart],
            },
        });
    }

    function continueShopping() {
        useNavigate('/')
    }
    

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            {state.order.length ? (
                <div>
                    {state.order.map((book) => {
                        <CartItem key={book._id} item={book} />
                    })}
                    <div className='flex-row space-between'>
                        <strong>
                            Total: ${calculateTotal()}
                        </strong>
                            <button onClick={submitCheckout}>Checkout</button>
                            <button onClick={continueShopping}>Continue Shopping</button>
                    </div>
                </div>

            ) : (
                <div>
                <h3>
                    You haven't added anything to your cart yet!
                </h3>
                <button onClick={continueShopping}>Start Shoping Now!</button>
                </div>
            )}
        </div>
    );
};

export default Cart;