export interface User {
  name: string;
  email: string;
  password: string;
  address?: {
    line1: string;
    line2?: string;
    postcode: string;
    verified?: false
    timeAtAddress: {
      days: string;
      months: string;
      hours: string;
    }
  }
}