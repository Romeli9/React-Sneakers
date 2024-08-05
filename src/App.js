import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';

import AppContext from './context';

function App() {
  const [cartOppened, setCartOppened] = useState(false);

  const [items, setItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/cart');
      const favoritesResponse = await axios.get(
        'https://66adc235b18f3614e3b5d09d.mockapi.io/favorite',
      );
      const itemsResponse = await axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavoritesItems(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://66ac938af009b9d5c7329c5b.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoritesItems.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://66adc235b18f3614e3b5d09d.mockapi.io/favorite/${obj.id}`);
        setFavoritesItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoritesItems,
        isItemAdded,
        onAddToFavorite,
        setCartOppened,
        setCartItems,
      }}>
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
                // favoriteItems={favoritesItems}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route path="/favorites" exact element={<Favorites />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
