
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  device: string;
}
