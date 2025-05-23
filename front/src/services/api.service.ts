export class ApiService {
  static async getEventOptions(): Promise<EventOption[]> {
    const response = await fetch("http://localhost:8000/api/v1/event-options");
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
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user events");
    }
    const jsonResponse = (await response.json()) as { events: UserEvent[] };
    return jsonResponse["events"];
  }

  static async signUp(client: Client): Promise<any> {
    const response = await fetch("http://localhost:8000/api/v1/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: client.email,
        name: client.name,
        password: client.password,
        phoneNumber: client.telefono,
      }),
    });
    if (!response.ok) {
      console.log(JSON.stringify({
        email: client.email,
        name: client.name,
        password: client.password,
        phoneNumber: client.telefono,
      }));
      throw new Error("Failed to sign up client");
    }
    return await response.json();
  }
}

interface UserEventDetail {
  menu: string;
  music: string;
  attendees: number;
}

export interface UserEvent {
  id: string;
  startDate: string;
  endDate: string;
  name: string;
  status: string;
  cost: number;
  details: UserEventDetail;
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

interface Client {
  email: string;
  name: string;
  password: string;
  telefono: string;
}
