
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

export interface ReviewReply {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  replies: ReviewReply[];
}
