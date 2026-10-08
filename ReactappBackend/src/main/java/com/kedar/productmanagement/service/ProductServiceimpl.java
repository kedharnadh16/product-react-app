package com.kedar.productmanagement.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kedar.productmanagement.model.Product;
import com.kedar.productmanagement.repo.ProductRepo;

@Service
public class ProductServiceimpl implements ProductService {

	@Autowired
	ProductRepo productRepo;

	@Override
	public Product createProduct(Product p) {

		return productRepo.save(p);
	}

	@Override
	public List<Product> getAllProducts() {

		return productRepo.findAll();
	}


	@Override
	public   Product getProductByid(Integer id) {

		  return productRepo.findById(id).get();
	}

	@Override
	public Product updateProductByid( Product p ,Integer id) {
		
		Product productinfo=getProductByid(id);
		
		productinfo.setCategory(p.getCategory());
		productinfo.setDescription(p.getDescription());
		productinfo.setPrice(p.getPrice());
		productinfo.setProductName(p.getProductName());
		productinfo.setQuantity(p.getQuantity());

		return productRepo.save(productinfo);
	}

	@Override
	public void deleteProduct(Integer id) {
		
		
		productRepo.deleteById(id);
	
	}

	@Override
	public Product findProductByProductName(String productName) {

		return productRepo.findProductByProductName(productName);
	}

	

	

}
