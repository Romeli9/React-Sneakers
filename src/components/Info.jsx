import { useContext } from 'react';
import AppContext from '../context';

import arrow from '../assets/arrow.svg';

const Info = ({ title, image, description }) => {
  const { setCartOppened } = useContext(AppContext);
  return (
    <div className="cartEmpty d-flex justify-center align-center flex-column flex">
      <img className="mb-20" width={120} src={image} alt="Empty Cart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOppened(false)} className="greenButton">
        <img src={arrow} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
