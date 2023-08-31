import { __InputValue } from "graphql";
// import { useStoreContext } from "../../utils/GlobalState";
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ book, order }) => {

  const [ quantity, setQuantity] = useState(book.quantity);

  const removeFromCart = ()=> {
    idbPromise('cart', 'delete', { ...book });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
     removeFromCart() 

    } else {
      setQuantity(parseInt(value));
      idbPromise('cart', 'put', {...book, quantity: parseInt(__InputValue)});
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${book.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{book.name}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={book.quantity}
            onChange={onChange}
          />
          <span> ${book.price} </span>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(book)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;