import { useContext } from 'react';
import AppContext from '../../context';
import ContentLoader from 'react-content-loader';

import styles from './Card.module.scss';
import btnchecked from '../../assets/btn-checked.svg';
import btnplus from '../../assets/btn-plus.svg';
import heartliked from '../../assets/heart-liked.svg';
import heartunliked from '../../assets/heart-unliked.svg';

const Card = ({ id, title, price, imageUrl, onFavorite, onPlus, loading = false }) => {
  const { isItemAdded, isItemFavorite } = useContext(AppContext);

  const obj = { id, parentId: id, title, price, imageUrl };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="187" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="224" rx="8" ry="8" width="80" height="24" />
          <rect x="124" y="220" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              {isItemFavorite(id) ? (
                <img src={heartliked} alt="Unliked" />
              ) : (
                <img src={heartunliked} alt="Unliked" />
              )}
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt=""></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price} руб.</b>
            </div>
            {onPlus &&
              (isItemAdded(id) ? (
                <img className={styles.plus} onClick={onClickPlus} src={btnchecked} alt="Checked" />
              ) : (
                <img className={styles.plus} onClick={onClickPlus} src={btnplus} alt="Plus" />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
