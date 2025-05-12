"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "../helper";
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${apiUrl}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${apiUrl}/api/products/${editingId}`
      : `${apiUrl}/api/products`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", price: 0, stock: 0, image: "" });
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${apiUrl}/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setEditingId(product.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="bg-black p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="ราคาสินค้า"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="จำนวนสินค้า"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="ลิ้งค์รูปภาพ"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "อัปเดต" : "เพิ่ม"}
        </button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p>
                ฿{product.price} | จำนวน: {product.stock}
              </p>
              <img
                src={product.image}
                className="w-24 mt-2"
                alt={product.name}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
