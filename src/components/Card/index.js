import { useState, useEffect } from 'react';
import styles from './Card.module.scss';

function Card({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  items = [],
  favoriteItems = [],
  favorited = false,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus({ id, title, price, imageUrl });
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({ id, title, imageUrl, price });
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
          alt="Unliked"></img>
      </div>
      <img width={133} height={112} src={imageUrl} alt=""></img>
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Checked"
        />
      </div>
    </div>
  );
}

export default Card;
