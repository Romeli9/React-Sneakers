import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Orders from './pages/Orders';
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
      try {
        setIsLoading(true);

        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/cart'),
          axios.get('https://66adc235b18f3614e3b5d09d.mockapi.io/favorite'),
          axios.get('https://66ac938af009b9d5c7329c5b.mockapi.io/items'),
        ]);

        setCartItems(cartResponse.data);
        setFavoritesItems(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при загрузке данных');
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://66ac938af009b9d5c7329c5b.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      await axios.delete(`https://66ac938af009b9d5c7329c5b.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Не удалось удалить из корзины');
    }
  };

  //axios.delete(`https://66adc235b18f3614e3b5d09d.mockapi.io/favorite/${obj.id}`);

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favoritesItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setFavoritesItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(`https://66adc235b18f3614e3b5d09d.mockapi.io/favorite/${findItem.id}`);
      } else {
        setFavoritesItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://66adc235b18f3614e3b5d09d.mockapi.io/favorite',
          obj,
        );
        setFavoritesItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorite = (id) => {
    return favoritesItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoritesItems,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        setCartOppened,
        setCartItems,
        onAddToCart,
      }}>
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOppened(true)} />
        <Drawer
          onClose={() => setCartOppened(false)}
          onRemove={onRemoveItem}
          items={cartItems}
          oppened={cartOppened}
        />
        <Routes>
          <Route
            path="/React-Sneakers"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route path="/React-Sneakers/favorites" exact element={<Favorites />}></Route>
          <Route path="/React-Sneakers/orders" exact element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
