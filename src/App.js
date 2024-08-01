import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    imageUrl: '/img/sneakers/1.jpg',
  },
  {
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    imageUrl: '/img/sneakers/2.jpg',
  },
  {
    title: 'Мужские Кроссовки Adidas Ultraboost 17',
    price: 8499,
    imageUrl: '/img/sneakers/3.jpg',
  },
  {
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imageUrl: '/img/sneakers/4.jpg',
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block align-center d-flex">
            <img width={15} height={15} src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj, ix) => (
            <Card key={ix} title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
