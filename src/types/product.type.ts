export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  descrition?: string;
  created_at: Date;
  updated_at: Date;
  stock: [
    {
      size: string;
      qty: number;
    }
  ];
};
