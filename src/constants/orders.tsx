export const orders = [
  {
    _id: "6697bf5c88c633418f447d34",
    transaction_id: "200999888",
    user: {
      _id: "66951f59f68408ea021da1c3",
      name: "test",
      email: "test11121313@gmail.com",
      role: "user",
      isActive: true,
      id: "66951f59f68408ea021da1c3",
    },
    orderPrice: 179.97,
    items: [
      {
        product: {
          size: {
            value: "M",
            label: "Medium",
            color: "Blue",
          },
          _id: "6696d923b128e101a373e7d4",
          name: "Jeans",
          price: 59.99,
          quantity: 97,
          discount: 0,
          createdAt: "2024-07-16T20:33:39.996Z",
          updatedAt: "2024-07-18T15:53:01.338Z",
          __v: 1,
          saleProduct: 59.99,
        },
        price: 59.99,
        quantity: 3,
        color: {
          value: "#0000FF",
          label: "Blue",
          color: "Blue",
          quantity: 50,
          _id: "6696d923b128e101a373e7d5",
        },
        _id: "6697bf5c88c633418f447d35",
      },
    ],
    orderStatus: "created",
    billingData: [
      {
        firstName: "John",
        lastName: "Doe",
        apartment: "5B",
        street: "123 Main St",
        building: "Sunshine Apartments",
        city: "New York",
        country: "USA",
        floor: "5",
        phoneNumber: "123-456-7890",
        _id: "6697bf5c88c633418f447d37",
      },
    ],
    paymentOrderId: "227230404",
    createdAt: "2024-07-17T12:55:56.371Z",
    updatedAt: "2024-07-17T12:55:56.371Z",
    __v: 0,
  },
  {
    _id: "6697bf5c88c633418f447d38",
    transaction_id: "200999889",
    user: {
      _id: "66951f59f68408ea021da1c4",
      name: "example",
      email: "example11121313@gmail.com",
      role: "user",
      isActive: true,
      id: "66951f59f68408ea021da1c4",
    },
    orderPrice: 199.97,
    items: [
      {
        product: {
          size: {
            value: "L",
            label: "Large",
            color: "Red",
          },
          _id: "6696d923b128e101a373e7d6",
          name: "Shirt",
          price: 66.66,
          quantity: 50,
          discount: 10,
          createdAt: "2024-07-16T20:33:39.996Z",
          updatedAt: "2024-07-18T15:53:01.338Z",
          __v: 1,
          saleProduct: 59.99,
        },
        price: 66.66,
        quantity: 3,
        color: {
          value: "#FF0000",
          label: "Red",
          color: "Red",
          quantity: 30,
          _id: "6696d923b128e101a373e7d7",
        },
        _id: "6697bf5c88c633418f447d39",
      },
    ],
    orderStatus: "shipped",
    billingData: [
      {
        firstName: "Jane",
        lastName: "Smith",
        apartment: "3A",
        street: "456 Oak St",
        building: "Maple Apartments",
        city: "Los Angeles",
        country: "USA",
        floor: "3",
        phoneNumber: "987-654-3210",
        _id: "6697bf5c88c633418f447d40",
      },
    ],
    paymentOrderId: "227230405",
    createdAt: "2024-07-18T12:55:56.371Z",
    updatedAt: "2024-07-18T12:55:56.371Z",
    __v: 1,
  },
  {
    _id: "6697bf5c88c633418f447d41",
    transaction_id: "200999890",
    user: {
      _id: "66951f59f68408ea021da1c5",
      name: "demo",
      email: "demo11121313@gmail.com",
      role: "admin",
      isActive: false,
      id: "66951f59f68408ea021da1c5",
    },
    orderPrice: 299.97,
    items: [
      {
        product: {
          size: {
            value: "S",
            label: "Small",
            color: "Green",
          },
          _id: "6696d923b128e101a373e7d8",
          name: "Hat",
          price: 99.99,
          quantity: 150,
          discount: 5,
          createdAt: "2024-07-16T20:33:39.996Z",
          updatedAt: "2024-07-18T15:53:01.338Z",
          __v: 1,
          saleProduct: 94.99,
        },
        price: 99.99,
        quantity: 3,
        color: {
          value: "#00FF00",
          label: "Green",
          color: "Green",
          quantity: 80,
          _id: "6696d923b128e101a373e7d9",
        },
        _id: "6697bf5c88c633418f447d42",
      },
    ],
    orderStatus: "delivered",
    billingData: [
      {
        firstName: "Emily",
        lastName: "Johnson",
        apartment: "2C",
        street: "789 Pine St",
        building: "Oak Apartments",
        city: "Chicago",
        country: "USA",
        floor: "2",
        phoneNumber: "555-555-5555",
        _id: "6697bf5c88c633418f447d43",
      },
    ],
    paymentOrderId: "227230406",
    createdAt: "2024-07-19T12:55:56.371Z",
    updatedAt: "2024-07-19T12:55:56.371Z",
    __v: 2,
  },
  {
    _id: "6697bf5c88c633418f447d44",
    transaction_id: "200999891",
    user: {
      _id: "66951f59f68408ea021da1c6",
      name: "sample",
      email: "sample11121313@gmail.com",
      role: "user",
      isActive: true,
      id: "66951f59f68408ea021da1c6",
    },
    orderPrice: 399.97,
    items: [
      {
        product: {
          size: {
            value: "XL",
            label: "Extra Large",
            color: "Yellow",
          },
          _id: "6696d923b128e101a373e7da",
          name: "Coat",
          price: 133.32,
          quantity: 20,
          discount: 15,
          createdAt: "2024-07-16T20:33:39.996Z",
          updatedAt: "2024-07-18T15:53:01.338Z",
          __v: 1,
          saleProduct: 113.32,
        },
        price: 133.32,
        quantity: 3,
        color: {
          value: "#FFFF00",
          label: "Yellow",
          color: "Yellow",
          quantity: 25,
          _id: "6696d923b128e101a373e7db",
        },
        _id: "6697bf5c88c633418f447d45",
      },
    ],
    orderStatus: "processing",
    billingData: [
      {
        firstName: "Michael",
        lastName: "Williams",
        apartment: "1D",
        street: "101 Maple St",
        building: "Birch Apartments",
        city: "Houston",
        country: "USA",
        floor: "1",
        phoneNumber: "777-777-7777",
        _id: "6697bf5c88c633418f447d46",
      },
    ],
    paymentOrderId: "227230407",
    createdAt: "2024-07-20T12:55:56.371Z",
    updatedAt: "2024-07-20T12:55:56.371Z",
    __v: 3,
  },
];
