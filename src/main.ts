import { MobileOrderCreator, OfflineOrderCreator, WebOrderCreator } from './creators';
import { WebOrder, MobileOrder, OfflineOrder } from './mocks';
import { PrintVisitor, StatisticsVisitor, FilteringVisitor } from './visitors';

const WEB_ORDER_CREATOR = new WebOrderCreator();
const MOBILE_ORDER_CREATOR = new MobileOrderCreator();
const OFFLINE_ORDER_CREATOR = new OfflineOrderCreator();

// Создание заказов из разных источников
const webOrder = new WebOrder(
  [
    { product: 'Laptop', price: 1000 },
    {
      product: 'Gaming Bundle',
      subItems: [
        { product: 'Console', price: 500 },
        { product: 'Controller', price: 50 },
      ],
    },
  ],
  'now',
);

const mobileOrder = new MobileOrder(
  [
    { title: 'Smartphone', cost: 800 },
    {
      title: 'Accessory Pack',
      dependantItems: [
        { title: 'Case', cost: 20 },
        { title: 'Screen Protector', cost: 10 },
      ],
    },
  ],
  'onDelivery',
);

const offlineOrder = new OfflineOrder(
  [
    {
      productName: 'Chairs Set',
      innerItems: [
        {
          productName: 'Chair & Accessories',
          innerItems: [
            { productName: 'Chair', productPrice: 50 },
            { productName: 'Cushion', productPrice: 10 },
          ],
        },
        {
          productName: 'Chair & Accessories',
          innerItems: [
            { productName: 'Chair', productPrice: 50 },
            { productName: 'Armrests', productPrice: 80 },
          ],
        },
      ],
    },
    { productName: 'Table', productPrice: 200 },
  ],
  'later',
);

// Создание заказов в системе
const orders = [];
orders.push(WEB_ORDER_CREATOR.createOrder(webOrder));
orders.push(MOBILE_ORDER_CREATOR.createOrder(mobileOrder));
orders.push(OFFLINE_ORDER_CREATOR.createOrder(offlineOrder));

// Демонстрация работы посетителей
const printVisitor = new PrintVisitor();
const statsVisitor = new StatisticsVisitor();
const priceFilter = new FilteringVisitor((item) => item.price > 100, 'price > 100');
const nameFilter = new FilteringVisitor((item) => item.name.includes('Chair'), 'name includes "Chair"');

console.log('--- Printing Orders ---');
orders.forEach((order) => {
  order.accept(printVisitor);
  console.log('---------------------------------');
});

console.log('\n--- Collecting Statistics ---');
orders.forEach((order) => {
  order.accept(statsVisitor);
});
console.log(`Total items: ${statsVisitor.getItemCount()}`);
console.log(`Total price: $${statsVisitor.getTotalPrice()}`);

console.log('\n--- Filtering Expensive Items ---');
orders.forEach((order) => {
  order.accept(priceFilter);
});

console.log('\n--- Filtering Chairs ---');
orders.forEach((order) => {
  order.accept(nameFilter);
});

console.log('\n--- Processing Payments ---');
orders.forEach((order) => {
  console.log(`Processing payment for Order: ${order.name}`);
  order.paymentMethod.pay(order.getPrice());
});
