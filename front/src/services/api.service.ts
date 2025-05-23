export class ApiService {
  static async getEventOptions(): Promise<EventOption[]> {
    const response = await fetch("http://localhost:8000/api/v1/event-options")
    if (!response.ok) {
      throw new Error("Failed to fetch event options");
    }
    return await response.json();
  }

  static async getUserEvents(): Promise<UserEvent[]> {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch("http://localhost:8000/api/v1/events/me", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch user events");
    }
    const jsonResponse = await response.json() as { events: UserEvent[] };
    return jsonResponse["events"];
  }

  static async getEventHalls(): Promise<EventHall[]> {
    const response = await fetch("http://localhost:8000/api/v1/event-halls")
    if (!response.ok) {
      throw new Error("Failed to fetch event halls");
    }
    return await response.json();
  }

  static async createEvent(event: CreateUserEventDto): Promise<UserEvent> {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch("http://localhost:8000/api/v1/events", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return await response.json();
  }
}

export interface EventHall {
  id: string;
  name: string;
}

interface UserEventDetail {
  menu: string;
  music: string;
  attendees: number;
}

export interface CreateUserEventDto {
  name: string;
  startDate: string;
  endDate: string;
  eventHallId: string;
  eventOptionId: string;
  details: UserEventDetail;
}

export interface UserEvent {
  id: string;
  startDate: string;
  endDate: string;
  name: string;
  status: string;
  cost: number;
  details: UserEventDetail
}

export interface EventOption {
  id: string;
  name: string;
  options: EventOptionDetail;
}

interface EventOptionDetail {
  menuOptions: string[];
  musicOptions: string[];
  minAttendees: number;
  maxAttendees: number;
  baseCost: number;
}
