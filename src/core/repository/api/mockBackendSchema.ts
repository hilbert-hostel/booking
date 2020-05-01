import { AxiosRequestConfig } from 'axios';

export const schema: {
  [key: string]: {
    [key: string]: {
      justReturn?: any;
      handle?: (config: AxiosRequestConfig) => any;
    };
  };
} = {
  get: {
    '/auth/ping': {
      handle: config => {
        if (config.headers.Authorization) {
          return {
            data: {
              id: 'cdd6f90d-3357-484e-913c-3c01e2325904',
              email: 'yamarashi@email.com',
              firstname: 'Yamarashi',
              lastname: 'Kishisa',
              address: 'here',
              phone: '000000000',
              national_id: '111111111111',
              is_verified: true,
            },
            status: 200,
          };
        } else {
          return {
            status: 400,
          };
        }
      },
    },
    '/reservation/all': {
      justReturn: [
        {
          id: '_7xxm0NLX',
          checkIn: '2020-04-29T00:00:00.000Z',
          checkOut: '2020-05-06T00:00:00.000Z',
          specialRequests: '',
          rooms: [
            {
              id: 1,
              price: 600,
              type: 'mixed-dorm-s',
              description:
                'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
              beds: 2,
              photos: [
                {
                  photo_url:
                    'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                  photo_description: null,
                },
              ],
              facilities: [
                { name: 'refundable', description: null, count: 1 },
                { name: 'breakfast included', description: null, count: 1 },
                { name: 'wifi', description: null, count: 1 },
                { name: 'air conditioner', description: null, count: 1 },
                {
                  name: 'bottled water',
                  description: 'per person per night',
                  count: 1,
                },
                {
                  name: 'shampoo',
                  description: 'per person per night',
                  count: 2,
                },
                { name: 'soap', description: 'per person per night', count: 2 },
                { name: 'towel', description: 'per person', count: 1 },
              ],
            },
            {
              id: 2,
              price: 600,
              type: 'mixed-dorm-s',
              description:
                'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
              beds: 1,
              photos: [
                {
                  photo_url:
                    'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                  photo_description: null,
                },
              ],
              facilities: [
                { name: 'refundable', description: null, count: 1 },
                { name: 'breakfast included', description: null, count: 1 },
                { name: 'wifi', description: null, count: 1 },
                { name: 'air conditioner', description: null, count: 1 },
                {
                  name: 'bottled water',
                  description: 'per person per night',
                  count: 1,
                },
                {
                  name: 'shampoo',
                  description: 'per person per night',
                  count: 2,
                },
                { name: 'soap', description: 'per person per night', count: 2 },
                { name: 'towel', description: 'per person', count: 1 },
              ],
            },
          ],
          isPaid: true,
        },
        {
          id: 'PFuhvA-y9',
          checkIn: '2020-05-19T00:00:00.000Z',
          checkOut: '2020-05-20T00:00:00.000Z',
          specialRequests: '',
          rooms: [
            {
              id: 1,
              price: 600,
              type: 'mixed-dorm-s',
              description:
                'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
              beds: 1,
              photos: [
                {
                  photo_url:
                    'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                  photo_description: null,
                },
              ],
              facilities: [
                { name: 'refundable', description: null, count: 1 },
                { name: 'breakfast included', description: null, count: 1 },
                { name: 'wifi', description: null, count: 1 },
                { name: 'air conditioner', description: null, count: 1 },
                {
                  name: 'bottled water',
                  description: 'per person per night',
                  count: 1,
                },
                {
                  name: 'shampoo',
                  description: 'per person per night',
                  count: 2,
                },
                { name: 'soap', description: 'per person per night', count: 2 },
                { name: 'towel', description: 'per person', count: 1 },
              ],
            },
          ],
          isPaid: false,
        },
        {
          id: 'SKUPU7HA7',
          checkIn: '2020-05-01T00:00:00.000Z',
          checkOut: '2020-05-04T00:00:00.000Z',
          specialRequests: '',
          rooms: [
            {
              id: 1,
              price: 600,
              type: 'mixed-dorm-s',
              description:
                'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
              beds: 1,
              photos: [
                {
                  photo_url:
                    'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                  photo_description: null,
                },
              ],
              facilities: [
                { name: 'refundable', description: null, count: 1 },
                { name: 'breakfast included', description: null, count: 1 },
                { name: 'wifi', description: null, count: 1 },
                { name: 'air conditioner', description: null, count: 1 },
                {
                  name: 'bottled water',
                  description: 'per person per night',
                  count: 1,
                },
                {
                  name: 'shampoo',
                  description: 'per person per night',
                  count: 2,
                },
                { name: 'soap', description: 'per person per night', count: 2 },
                { name: 'towel', description: 'per person', count: 1 },
              ],
            },
          ],
          isPaid: false,
        },
        {
          id: 'fmmormnkS',
          checkIn: '2020-05-26T00:00:00.000Z',
          checkOut: '2020-05-27T00:00:00.000Z',
          specialRequests: '',
          rooms: [
            {
              id: 2,
              price: 600,
              type: 'mixed-dorm-s',
              description:
                'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
              beds: 1,
              photos: [
                {
                  photo_url:
                    'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                  photo_description: null,
                },
              ],
              facilities: [
                { name: 'refundable', description: null, count: 1 },
                { name: 'breakfast included', description: null, count: 1 },
                { name: 'wifi', description: null, count: 1 },
                { name: 'air conditioner', description: null, count: 1 },
                {
                  name: 'bottled water',
                  description: 'per person per night',
                  count: 1,
                },
                {
                  name: 'shampoo',
                  description: 'per person per night',
                  count: 2,
                },
                { name: 'soap', description: 'per person per night', count: 2 },
                { name: 'towel', description: 'per person', count: 1 },
              ],
            },
          ],
          isPaid: false,
        },
      ],
    },
    '/door/room': {
      justReturn: {
        rooms: [
          {
            id: 1,
            price: 600,
            type: 'mixed-dorm-s',
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            beds: [
              { id: 2, room_id: 1 },
              { id: 1, room_id: 1 },
            ],
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            followers: ['sarun.nunt@gmail.com', 'hamzaabamboo@gmail.com'],
          },
          {
            id: 2,
            price: 600,
            type: 'mixed-dorm-s',
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            beds: [{ id: 7, room_id: 2 }],
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            followers: [],
          },
        ],
        reservationID: '_7xxm0NLX',
      },
    },
    '/door/generate': {
      justReturn: {
        code: '436322d2-2cf2-4b0d-b035-8196760268ae|0001|1104100003371|555870',
      },
    },
    '/reservation': {
      justReturn: {
        rooms: [
          {
            price: 600,
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            availability: [
              { id: 1, available: 6 },
              { id: 2, available: 6 },
              { id: 3, available: 6 },
            ],
            type: 'mixed-dorm-s',
          },
          {
            price: 600,
            description:
              'Private room with twin-size bed with 10 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            availability: [{ id: 4, available: 10 }],
            type: 'mixed-dorm-m',
          },
          {
            price: 600,
            description:
              'Private room with twin-size bed with 15 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            availability: [
              { id: 6, available: 15 },
              { id: 7, available: 15 },
            ],
            type: 'mixed-dorm-l',
          },
          {
            price: 650,
            description:
              'Private women room with queen-size bed with 10 beds in a row. Comprising more social life, showers, room with multiple bunks and lastly, security for women. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            photos: [
              {
                photo_url:
                  'https://a0.muscache.com/im/pictures/109451542/8989b537_original.jpg?aki_policy=large',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            availability: [{ id: 8, available: 10 }],
            type: 'women-dorm-m',
          },
          {
            price: 650,
            description:
              'Private women room with queen-size bed with 10 beds in a row. Comprising more social life, showers, room with multiple bunks and lastly, security for women. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            photos: [
              {
                photo_url:
                  'https://a0.muscache.com/im/pictures/109451542/8989b537_original.jpg?aki_policy=large',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
            availability: [{ id: 9, available: 20 }],
            type: 'women-dorm-l',
          },
        ],
        suggestions: {
          lowestPrice: [
            {
              roomConfig: [
                {
                  id: 1,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
            {
              roomConfig: [
                {
                  id: 2,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
            {
              roomConfig: [
                {
                  id: 3,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
          ],
          lowestNumberOfRooms: [
            {
              roomConfig: [
                {
                  id: 3,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
            {
              roomConfig: [
                {
                  id: 2,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
            {
              roomConfig: [
                {
                  id: 1,
                  price: 600,
                  type: 'mixed-dorm-s',
                  description:
                    'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
                  photos: [
                    {
                      photo_url:
                        'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                      photo_description: null,
                    },
                  ],
                  facilities: [
                    { name: 'refundable', description: null, count: 1 },
                    { name: 'breakfast included', description: null, count: 1 },
                    { name: 'wifi', description: null, count: 1 },
                    { name: 'air conditioner', description: null, count: 1 },
                    {
                      name: 'bottled water',
                      description: 'per person per night',
                      count: 1,
                    },
                    {
                      name: 'shampoo',
                      description: 'per person per night',
                      count: 2,
                    },
                    {
                      name: 'soap',
                      description: 'per person per night',
                      count: 2,
                    },
                    { name: 'towel', description: 'per person', count: 1 },
                  ],
                  guests: 1,
                },
              ],
              totalPrice: 600,
            },
          ],
        },
      },
    },
    '/reservation/(.*?)/payment': {
      justReturn: {
        isPaid: true,
      },
    },
    '/reservation/(.*?)': {
      justReturn: {
        id: '_7xxm0NLX',
        checkIn: '2020-04-29T00:00:00.000Z',
        checkOut: '2020-05-06T00:00:00.000Z',
        specialRequests: '',
        rooms: [
          {
            id: 1,
            price: 600,
            type: 'mixed-dorm-s',
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            beds: 2,
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
          },
          {
            id: 2,
            price: 600,
            type: 'mixed-dorm-s',
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            beds: 1,
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
          },
        ],
        isPaid: true,
      },
    },
    '/checkOut': {
      justReturn: {
        code: 'asdf-asdf-fdas',
      },
    },
  },
  post: {
    '/auth/login': {
      justReturn: {
        user: {
          id: '436322d2-2cf2-4b0d-b035-8196760268ae',
          email: 'sassada.kung@gmail.com',
          firstname: 'Wasuthon',
          lastname: 'Klyhirun',
          address: 'Rangsit boi',
          phone: '0807823979',
          nationalID: '1104100003371',
          is_verified: false,
        },
        token: 'ha',
      },
    },
    '/reservation/(.*?)/payment': {
      justReturn: {
        isPaid: false,
        url: 'scbeasysim://purchase/8eb38321-bdec-4b1c-8e6e-0123482e806d',
        amount: 1800,
      },
    },
    '/reservation': {
      justReturn: {
        id: 'fmmormnkS',
        checkIn: '2020-05-26T00:00:00.000Z',
        checkOut: '2020-05-27T00:00:00.000Z',
        specialRequests: '',
        rooms: [
          {
            id: 2,
            price: 600,
            type: 'mixed-dorm-s',
            description:
              'Private room with twin-size bed with 6 beds in a row. Comprising more security, social life, showers, and room with multiple bunks. There is air conditioning provided in every room. Also, a private bathroom and free wifi.',
            beds: 1,
            photos: [
              {
                photo_url:
                  'https://www.myboutiquehotel.com/photos/106370/room-17553924-840x460.jpg',
                photo_description: null,
              },
            ],
            facilities: [
              { name: 'refundable', description: null, count: 1 },
              { name: 'breakfast included', description: null, count: 1 },
              { name: 'wifi', description: null, count: 1 },
              { name: 'air conditioner', description: null, count: 1 },
              {
                name: 'bottled water',
                description: 'per person per night',
                count: 1,
              },
              {
                name: 'shampoo',
                description: 'per person per night',
                count: 2,
              },
              { name: 'soap', description: 'per person per night', count: 2 },
              { name: 'towel', description: 'per person', count: 1 },
            ],
          },
        ],
        isPaid: false,
      },
    },
  },
};
