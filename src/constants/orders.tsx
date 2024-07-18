export const orders = [
  {
    transaction_id: "200464270",
    user: {
      $oid: "66951f59f68408ea021da1c3",
    },
    orderPrice: 1000,
    items: [
      {
        product: {
          $oid: "668f0359168e757760b16257",
        },
        price: 200,
        quantity: 5,
        color: [
          {
            value: "Black",
            label: "Black",
            color: "#000000",
            quantity: -25,
            _id: {
              $oid: "668f0359168e757760b16258",
            },
          },
        ],
        _id: {
          $oid: "66952004f68408ea021da1e7",
        },
      },
    ],
    orderStatus: "created",
    billingData: {
      firstName: "John",
      lastName: "Doe",
      apartment: "5B",
      street: "123 Main St",
      building: "Sunshine Apartments",
      city: "New York",
      country: "USA",
      floor: "5",
      phoneNumber: "123-456-7890",
      _id: {
        $oid: "66952004f68408ea021da1e9",
      },
    },
    paymentOrderId: "226652643",
    createdAt: {
      $date: "2024-07-15T13:11:32.074Z",
    },
    updatedAt: {
      $date: "2024-07-15T13:11:32.074Z",
    },
    __v: 0,
  },
  {
    transaction_id: "200464271",
    user: {
      $oid: "66951f59f68408ea021da1c4",
    },
    orderPrice: 1200,
    items: [
      {
        product: {
          $oid: "668f0359168e757760b16259",
        },
        price: 300,
        quantity: 4,
        color: [
          {
            value: "Red",
            label: "Red",
            color: "#FF0000",
            quantity: -20,
            _id: {
              $oid: "668f0359168e757760b16260",
            },
          },
        ],
        _id: {
          $oid: "66952004f68408ea021da1e8",
        },
      },
    ],
    orderStatus: "shipped",
    billingData: {
      firstName: "Jane",
      lastName: "Smith",
      apartment: "10A",
      street: "456 Elm St",
      building: "Greenwood Apartments",
      city: "Los Angeles",
      country: "USA",
      floor: "10",
      phoneNumber: "987-654-3210",
      _id: {
        $oid: "66952004f68408ea021da1ea",
      },
    },
    paymentOrderId: "226652644",
    createdAt: {
      $date: "2024-07-16T10:15:00.000Z",
    },
    updatedAt: {
      $date: "2024-07-16T10:15:00.000Z",
    },
    __v: 0,
  },
  {
    transaction_id: "200464272",
    user: {
      $oid: "66951f59f68408ea021da1c5",
    },
    orderPrice: 1500,
    items: [
      {
        product: {
          $oid: "668f0359168e757760b16261",
        },
        price: 500,
        quantity: 3,
        color: [
          {
            value: "Blue",
            label: "Blue",
            color: "#0000FF",
            quantity: -15,
            _id: {
              $oid: "668f0359168e757760b16262",
            },
          },
        ],
        _id: {
          $oid: "66952004f68408ea021da1eb",
        },
      },
    ],
    orderStatus: "delivered",
    billingData: {
      firstName: "Alice",
      lastName: "Johnson",
      apartment: "3C",
      street: "789 Pine St",
      building: "Oak Apartments",
      city: "Chicago",
      country: "USA",
      floor: "3",
      phoneNumber: "555-123-4567",
      _id: {
        $oid: "66952004f68408ea021da1ec",
      },
    },
    paymentOrderId: "226652645",
    createdAt: {
      $date: "2024-07-17T08:30:00.000Z",
    },
    updatedAt: {
      $date: "2024-07-17T08:30:00.000Z",
    },
    __v: 0,
  },
  {
    transaction_id: "200464273",
    user: {
      $oid: "66951f59f68408ea021da1c6",
    },
    orderPrice: 800,
    items: [
      {
        product: {
          $oid: "668f0359168e757760b16263",
        },
        price: 200,
        quantity: 4,
        color: [
          {
            value: "Green",
            label: "Green",
            color: "#00FF00",
            quantity: -20,
            _id: {
              $oid: "668f0359168e757760b16264",
            },
          },
        ],
        _id: {
          $oid: "66952004f68408ea021da1ed",
        },
      },
    ],
    orderStatus: "processing",
    billingData: {
      firstName: "Bob",
      lastName: "Brown",
      apartment: "2D",
      street: "321 Maple St",
      building: "Maple Apartments",
      city: "Houston",
      country: "USA",
      floor: "2",
      phoneNumber: "444-987-6543",
      _id: {
        $oid: "66952004f68408ea021da1ee",
      },
    },
    paymentOrderId: "226652646",
    createdAt: {
      $date: "2024-07-18T14:45:00.000Z",
    },
    updatedAt: {
      $date: "2024-07-18T14:45:00.000Z",
    },
    __v: 0,
  },
];
