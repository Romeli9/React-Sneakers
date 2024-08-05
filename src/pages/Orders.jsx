import { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(123);

  useEffect(() => {
    // async function fetchOrders() {
    //   const { data } = await axios.get('https://66adc235b18f3614e3b5d09d.mockapi.io/orders');
    //   setOrders(data);
    // }
    // fetchOrders();

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('https://66adc235b18f3614e3b5d09d.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при загрузке заказов');
        console.error(error);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex mb-40 align-center justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
