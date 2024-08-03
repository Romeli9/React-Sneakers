import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [cartOppened, setCartOppened] = useState(false);

  const [items, setItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://66adc235b18f3614e3b5d09d.mockapi.io/favorite').then((res) => {
      setFavoritesItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://66ac938af009b9d5c7329c5b.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoritesItems.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://66adc235b18f3614e3b5d09d.mockapi.io/favorite/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://66adc235b18f3614e3b5d09d.mockapi.io/favorite',
          obj,
        );
        setFavoritesItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOppened && (
        <Drawer onClose={() => setCartOppened(false)} onRemove={onRemoveItem} items={cartItems} />
      )}
      <Header onClickCart={() => setCartOppened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
              favoriteItems={favoritesItems}
            />
          }
          exact
        />
        <Route
          path="/favorites"
          exact
          element={<Favorites items={favoritesItems} onAddToFavorites={onAddToFavorite} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
