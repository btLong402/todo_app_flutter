/* eslint-disable prettier/prettier */
export interface Item {
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
}

export interface DataSection {
  title: string;
  data: Item[];
}
