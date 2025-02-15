import React, { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, toggleSoldOut } from "./api";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Please fill in all fields");
      return;
    }
    await addProduct(newProduct);
    setNewProduct({ name: "", price: "", category: "", stock: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleToggleSoldOut = async (id) => {
    await toggleSoldOut(id);
    fetchProducts();
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "900px", margin: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Inventory Management System
      </Typography>

      {/* Input Form */}
      <Box sx={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <TextField label="Product Name" variant="outlined" size="small" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <TextField label="Price" type="number" variant="outlined" size="small" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <TextField label="Category" variant="outlined" size="small" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
        <TextField label="Stock" type="number" variant="outlined" size="small" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>

      {/* Product List Table */}
      {products.length === 0 ? (
        <Typography variant="body1" color="textSecondary">No products available</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id} hover>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button variant="contained" color={product.soldOut ? "success" : "warning"} size="small" onClick={() => handleToggleSoldOut(product._id)} sx={{ marginRight: "10px" }}>
                      {product.soldOut ? "Restock" : "Mark Sold Out"}
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default App;
