"use client";

import { useState, useEffect } from "react";
import { apiUrl } from "../app/helper";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

const denominations = [1, 5, 10, 20, 50, 100, 500, 1000];

const initialCoinStock = {
  1: 10,
  5: 10,
  10: 10,
  20: 10,
  50: 10,
  100: 10,
  500: 10,
  1000: 10,
};

export default function VendingMachine() {
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [coinStock, setCoinStock] = useState(initialCoinStock);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/products`);
      if (!res.ok) throw new Error("โหลดข้อมูลสินค้าไม่สำเร็จ");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const updateProductStock = async (productId: number, newStock: number) => {
    try {
      await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
    } catch (err) {
      console.error("❌ อัปเดต stock ล้มเหลว", err);
    }
  };

  const handleInsert = (amount: number) => {
    setInsertedAmount((prev) => prev + amount);
    setMessage("");
  };

  const hasSufficientChange = (change: number): boolean => {
    let remainingChange = change;
    const coinTypes = Object.keys(coinStock)
      .map(Number)
      .sort((a, b) => b - a);

    for (let coin of coinTypes) {
      const coinCount = coinStock[coin];
      if (coinCount > 0 && remainingChange >= coin) {
        const maxCoinsNeeded = Math.floor(remainingChange / coin);
        const coinsToGive = Math.min(maxCoinsNeeded, coinCount);
        remainingChange -= coinsToGive * coin;
      }
    }

    return remainingChange === 0;
  };

  const handleSelect = async (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
      setMessage("🚫 สินค้าหมด");
    } else if (insertedAmount < product.price) {
      setMessage(
        `💸 จำนวนเงินไม่พอ โปรดเพิ่ม ฿${product.price - insertedAmount}`
      );
    } else {
      const change = insertedAmount - product.price;

      if (hasSufficientChange(change)) {
        setMessage(`✅ คุณได้ซื้อ ${product.name}. เงินทอน: ฿${change}`);
        setInsertedAmount(0);

        // อัปเดต state
        const updatedProducts = products.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - 1 } : p
        );
        setProducts(updatedProducts);

        // อัปเดต stock ไปยัง API
        await updateProductStock(product.id, product.stock - 1);

        // ทอนเงิน
        let remainingChange = change;
        const updatedCoinStock = { ...coinStock };
        const coinTypes = Object.keys(updatedCoinStock)
          .map(Number)
          .sort((a, b) => b - a);

        for (let coin of coinTypes) {
          const coinCount = updatedCoinStock[coin];
          if (coinCount > 0 && remainingChange >= coin) {
            const maxCoinsNeeded = Math.floor(remainingChange / coin);
            const coinsToGive = Math.min(maxCoinsNeeded, coinCount);
            updatedCoinStock[coin] -= coinsToGive;
            remainingChange -= coinsToGive * coin;
          }
        }

        setCoinStock(updatedCoinStock);
      } else {
        setMessage("🚫 ไม่มีเหรียญทอนเพียงพอ");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Vending Machine</h1>

      {loading ? (
        <p className="text-center">⏳ กำลังโหลดสินค้า...</p>
      ) : error ? (
        <p className="text-red-500 text-center">❌ {error}</p>
      ) : (
        <>
          {/* เติมเงิน */}
          <div className="bg-black-100 p-4 rounded-lg">
            <h2 className="text-xl mb-2">💵 เติมเงิน</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {denominations.map((d) => (
                <button
                  key={d}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleInsert(d)}
                >
                  ฿{d}
                </button>
              ))}
            </div>
            <p className="text-lg font-semibold">
              จำนวนเงิน: ฿{insertedAmount}
            </p>
          </div>

          {/* แสดงสินค้า */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`border rounded-xl p-4 shadow hover:shadow-lg transition duration-300 
                  ${
                    product.stock <= 0 ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-black-600">ราคา: ฿{product.price}</p>
                <p
                  className={`text-sm ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? `จำนวน: ${product.stock}` : "สินค้าหมด"}
                </p>
                <button
                  onClick={() => handleSelect(product.id)}
                  disabled={
                    product.stock <= 0 || insertedAmount < product.price
                  }
                  className={`mt-3 w-full py-2 rounded text-white transition 
                    ${
                      product.stock <= 0
                        ? "bg-red-400 cursor-not-allowed"
                        : insertedAmount < product.price
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {product.stock <= 0
                    ? "หมด"
                    : insertedAmount < product.price
                    ? `ต้องการอีก ฿${product.price - insertedAmount}`
                    : "เลือก"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <span>{message}</span>
            <button
              onClick={() => setMessage("")}
              className="bg-transparent text-white font-bold text-xl"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
