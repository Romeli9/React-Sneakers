import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

import logo from '../assets/logo.png';
import cart from '../assets/cart.svg';
import heart from '../assets/heart.svg';
import user from '../assets/user.svg';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/React-Sneakers/">
        <div className="d-flex align-center cu-p">
          <img width={40} height={40} src={logo} alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src={cart} alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>

        <li className="mr-20 cu-p">
          <Link to="/React-Sneakers/favorites">
            <img width={18} height={18} src={heart} alt="Закладки" />
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/React-Sneakers/orders">
            <img width={20} height={20} src={user} alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
