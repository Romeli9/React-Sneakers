import { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
  const { favoritesItems, onAddToFavorites } = useContext(AppContext);

  console.log(favoritesItems);

  return (
    <div className="content p-40">
      <div className="d-flex mb-40 align-center justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favoritesItems.map((item, ix) => (
          <Card key={ix} favorited={true} onFavorite={onAddToFavorites} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
