package com.kedar.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kedar.productmanagement.model.Product;
import com.kedar.productmanagement.service.ProductService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService productService;

//	http://localhost:9988/product/createproduct
	@PostMapping("/createproduct")
	Product createProduct(@RequestBody Product p) {
		return productService.createProduct(p);

	}

//	http://localhost:9988/product/allProducts
	@GetMapping("/allProducts")
	List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

//	http://localhost:9988/product/Productbyid/2
	@GetMapping("/Productbyid/{ProductId}")
	Product getProductByid(@PathVariable Integer ProductId) {
		return productService.getProductByid(ProductId);
	}

//	http://localhost:9988/product/productname/sprial Notebook

	@GetMapping("/productname/{ProductName}")
	Product getProductByName(@PathVariable String ProductName) {
		return productService.findProductByProductName(ProductName);

	}
	
//	http://localhost:9988/product/update/3
	@PutMapping("update/{ProductId}")
	 Product updateProduct(@RequestBody Product p,@PathVariable Integer ProductId){
		return productService.updateProductByid(p, ProductId);
	}
	
//	http://localhost:9988/product/delete/6
	@DeleteMapping("delete/{ProductId}")
	String deleteByid(@PathVariable Integer ProductId) {
		  productService.deleteProduct(ProductId);
		return "Deleted sucessfully";
	}
	
	
}
