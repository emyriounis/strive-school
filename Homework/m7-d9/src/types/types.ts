export interface CommentType {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface PastaType {
  id: number;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  description: string;
  comments: CommentType[];
}

export interface ReservationType {
  _id?: string;
  name: string;
  phone: string;
  numberOfPeople: number;
  smoking: boolean;
  dateTime: string;
  specialRequests: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
