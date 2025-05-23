import { eventHallsTable } from './api/event-halls/event-hall.entity';
import { eventOptionsTable } from './api/event-options/event-option.entity';
import database from './database';

async function seed() {
  await database.insert(eventHallsTable).values(
    [
      {
        id: '6d8afbcc-bc30-4f43-8a0f-4653c6d87827',
        name: 'Alameda',
      },
      {
        id: 'f6c8e2d3-4b8c-4a5b-9a5f-1e0e0a7f1a9e',
        name: 'Salon 53',
      },
    ],
  );

  await database.insert(eventOptionsTable).values(
    [
      {
        id: '444d91fe-ac23-4842-be0b-5a02768dcde7',
        name: 'Graduación',
        options: {
          maxAttendees: 100,
          catering: true,
          audioVisual: true,
          musicOptions: ['DJ', 'Live Band'],
          menuOptions: ['Tacos'],
        },
      },
      {
        id: '0aec685a-43a9-4937-902f-c3654a7a3152',
        name: 'Boda',
        options: {
          minAttendees: 50,
          maxAttendees: 200,
          catering: false,
          audioVisual: true,
          musicOptions: ['DJ', 'Live Band', 'Mariachi'],
          menuOptions: ['Buffet', 'Barbacue'],
        },
      },
    ],
  );
}

seed()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((error) => {
    console.error('Seed failed', error);
  });
