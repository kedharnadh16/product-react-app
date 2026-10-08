package com.kedar.productmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kedar.productmanagement.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

	Product findProductByProductName(String ProductName);
}
