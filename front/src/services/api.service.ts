export class ApiService {
  static async getEventOptions(): Promise<EventOption[]> {
    const response = await fetch("http://localhost:8000/api/v1/event-options")
    if (!response.ok) {
      throw new Error("Failed to fetch event options");
    }
    return await response.json();
  }
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
