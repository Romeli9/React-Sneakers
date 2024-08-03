import { useState, useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [cartOppened, setCartOppened] = useState(false);

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://66ac938af009b9d5c7329c5b.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    if (obj.isAdded) {
      const newCartItems = cartItems.filter((item) => obj.title !== item.title);
      setCartItems(newCartItems);
      return;
    }
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveFromCart = (obj) => {
    const newCartItems = cartItems.filter((item) => obj.title !== item.title);
    setCartItems(newCartItems);
  };

  console.log(cartItems);
  return (
    <div className="wrapper clear">
      {cartOppened && (
        <Drawer
          onClose={() => setCartOppened(false)}
          onDelete={(obj) => onRemoveFromCart(obj)}
          items={cartItems}
        />
      )}
      <Header onClickCart={() => setCartOppened(true)} />
      <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block align-center d-flex">
            <img width={15} height={15} src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item, ix) => (
            <Card
              key={ix}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
              items={cartItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
