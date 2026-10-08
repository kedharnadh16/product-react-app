package com.kedar.productmanagement.service;

import java.util.List;

import com.kedar.productmanagement.model.Product;

public interface ProductService {

	Product createProduct(Product p);

	List<Product> getAllProducts();

	Product getProductByid(Integer productId);

	Product updateProductByid( Product p,Integer ProductId);

	void deleteProduct(Integer ProductId);

	Product findProductByProductName(String productName);

}
