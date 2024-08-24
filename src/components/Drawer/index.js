import { useState, useEffect } from 'react';
import axios from 'axios';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import './Dradew.scss';
import btnremove from '../../assets/btn-remove.svg';
import arrow from '../../assets/arrow.svg';
import completeorder from '../../assets/complete-order.jpg';
import emptycart from '../../assets/empty-cart.jpg';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], oppened }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems, totalPrice } = useCart();

  console.log(oppened);

  useEffect(() => {
    if (oppened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [oppened]);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://66adc235b18f3614e3b5d09d.mockapi.io/orders', {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${item.id}`, []);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа');
    }
    setIsLoading(false);
  };

  return (
    <div className={`overlay ${oppened ? 'overlayVisible' : ''}`}>
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина <img onClick={onClose} className="cu-p" src={btnremove} alt="Remove" />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items flex">
              {items.map((obj, ix) => (
                <div key={ix} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    //onClick={() => onClickRemove(obj.title, obj.price, obj.imageUrl)}
                    className="removeBtn"
                    src={btnremove}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                type="button"
                className="greenButton">
                Оформить заказ <img src={arrow} alt="Arrow" className="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? completeorder : emptycart}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
