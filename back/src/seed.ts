import { clientsTable } from './api/clients/client.entity';
import { eventHallsTable } from './api/event-halls/event-hall.entity';
import { eventOptionsTable } from './api/event-options/event-option.entity';
import { Event, eventsTable } from './api/events/event.entity';
import { EventStatus } from './api/events/interfaces/event-status.enum';
import { UserEventOptions } from './api/events/interfaces/user-event-options.dto';
import database from './database';

async function seed() {
  await database.delete(eventsTable);
  await database.delete(clientsTable);
  await database.delete(eventOptionsTable);
  await database.delete(eventHallsTable);

  const eventHallId = '6d8afbcc-bc30-4f43-8a0f-4653c6d87827';
  await database.insert(eventHallsTable).values(
    [
      {
        id: eventHallId,
        name: 'Alameda',
      },
      {
        id: 'f6c8e2d3-4b8c-4a5b-9a5f-1e0e0a7f1a9e',
        name: 'Salon 53',
      },
    ],
  );


  const eventOptionId = '444d91fe-ac23-4842-be0b-5a02768dcde7';
  await database.insert(eventOptionsTable).values(
    [
      {
        id: eventOptionId,
        name: 'Graduación',
        options: {
          minAttendees: 50,
          maxAttendees: 100,
          musicOptions: ['DJ', 'Live Band'],
          menuOptions: ['Tacos'],
          baseCost: 500,
          costPerAttendee: 10,
          costPerHour: 100,
          cateringCostPerAttendee: 5,
        },
      },
      {
        id: '0aec685a-43a9-4937-902f-c3654a7a3152',
        name: 'Boda',
        options: {
          minAttendees: 75,
          maxAttendees: 150,
          musicOptions: ['DJ', 'Live Band', 'Mariachi'],
          menuOptions: ['Buffet', 'Barbacue'],
          baseCost: 1000,
          costPerAttendee: 20,
          costPerHour: 200,
          cateringCostPerAttendee: 5,
        },
      },
    ],
  );

  const clientId = 'ef506726-8d2a-4eb1-8c80-8e482a0f15e0';
  await database.insert(clientsTable).values(
    {
      id: clientId,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123123',
      phoneNumber: '6674231231',
    },
  );

  await database.insert(eventsTable).values(
    {
      id: 'c7615ba7-4232-4eb8-a14f-87994cac41e2',
      name: 'Boda de Juan y Maria',
      startDate: new Date('2023-12-25'),
      endDate: new Date('2023-12-26'),
      eventHallId,
      clientId,
      eventOptionId,
      status: EventStatus.PENDING,
      cost: '10000',
      details: {
        attendees: 50,
        catering: true,
        menu: 'Buffet',
        music: 'DJ',
      } as UserEventOptions,
    } as Event,
  );
}

seed()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((error) => {
    console.error('Seed failed', error);
  });
