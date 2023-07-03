/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Category} from '../redux/category/categorySlice';
import {Product} from '../redux/product/productSlice';

export const getData = (productList: Product[], category: Category[]) => {
  const Data: Array<{
    title: string;
    products: Array<{
      productId: string;
      name: string;
      basePrice: number;
    }>;
  }> = [];

  category.forEach((c: Category) => {
    const products = productList.filter((p: Product) =>
      p.category.filter(cat => cat.categoryId === c.categoryId),
    );
    // console.log(products[0]);
    Data.push({
      title: c.title,
      products: products.map(p => ({
        productId: p.productId,
        name: p.name,
        basePrice: p.basePrice,
      })),
    });
  });

  return Data;
};
