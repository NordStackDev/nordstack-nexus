import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createProduct,
  createExpense,
  createRevenue,
  getProducts,
  getExpenses,
  getRevenues,
} from "@/integrations/supabase/finance";

export default function FinanceDashboard() {
  const [products, setProducts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [expenseForm, setExpenseForm] = useState({
    product_id: "",
    amount: "",
    description: "",
  });
  const [revenueForm, setRevenueForm] = useState({
    product_id: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const prodRes = await getProducts();
    const expRes = await getExpenses();
    const revRes = await getRevenues();
    setProducts(prodRes.data || []);
    setExpenses(expRes.data || []);
    setRevenues(revRes.data || []);
    setLoading(false);
  }

  async function handleProductSubmit(e) {
    e.preventDefault();
    await createProduct({
      name: productForm.name,
      price: Number(productForm.price),
      description: productForm.description,
    });
    setProductForm({ name: "", price: "", description: "" });
    fetchAll();
  }

  async function handleExpenseSubmit(e) {
    e.preventDefault();
    await createExpense({
      product_id: expenseForm.product_id,
      amount: Number(expenseForm.amount),
      description: expenseForm.description,
      date: new Date().toISOString().slice(0, 10),
    });
    setExpenseForm({ product_id: "", amount: "", description: "" });
    fetchAll();
  }

  async function handleRevenueSubmit(e) {
    e.preventDefault();
    await createRevenue({
      product_id: revenueForm.product_id,
      amount: Number(revenueForm.amount),
      date: new Date().toISOString().slice(0, 10),
    });
    setRevenueForm({ product_id: "", amount: "" });
    fetchAll();
  }

  // Calculate totals
  const productStats = products.map((p) => {
    const prodExpenses = expenses.filter((e) => e.product_id === p.id);
    const prodRevenues = revenues.filter((r) => r.product_id === p.id);
    const totalExpense = prodExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalRevenue = prodRevenues.reduce((sum, r) => sum + r.amount, 0);
    const profit = totalRevenue - totalExpense;
    const margin =
      totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : "0";
    return { ...p, totalExpense, totalRevenue, profit, margin };
  });
  const lifetimeRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);
  const lifetimeProfit =
    lifetimeRevenue - expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Opret Produkt</CardTitle>
          <CardDescription>Navn, pris og beskrivelse</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleProductSubmit}>
            <Input
              placeholder="Navn"
              value={productForm.name}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
            <Input
              placeholder="Pris"
              type="number"
              value={productForm.price}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, price: e.target.value }))
              }
              required
            />
            <Input
              placeholder="Beskrivelse"
              value={productForm.description}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, description: e.target.value }))
              }
            />
            <Button type="submit">Opret</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tilføj Udgift</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleExpenseSubmit}>
            <select
              className="border rounded px-2 py-1"
              value={expenseForm.product_id}
              onChange={(e) =>
                setExpenseForm((f) => ({ ...f, product_id: e.target.value }))
              }
              required
            >
              <option value="">Vælg produkt</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Beløb"
              type="number"
              value={expenseForm.amount}
              onChange={(e) =>
                setExpenseForm((f) => ({ ...f, amount: e.target.value }))
              }
              required
            />
            <Input
              placeholder="Beskrivelse"
              value={expenseForm.description}
              onChange={(e) =>
                setExpenseForm((f) => ({ ...f, description: e.target.value }))
              }
            />
            <Button type="submit">Tilføj</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tilføj Omsætning</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleRevenueSubmit}>
            <select
              className="border rounded px-2 py-1"
              value={revenueForm.product_id}
              onChange={(e) =>
                setRevenueForm((f) => ({ ...f, product_id: e.target.value }))
              }
              required
            >
              <option value="">Vælg produkt</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Beløb"
              type="number"
              value={revenueForm.amount}
              onChange={(e) =>
                setRevenueForm((f) => ({ ...f, amount: e.target.value }))
              }
              required
            />
            <Button type="submit">Tilføj</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Produkter & Statistik</CardTitle>
          <CardDescription>
            Oversigt med udgifter, omsætning, indtjening og margin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Navn</th>
                  <th className="text-left">Pris</th>
                  <th className="text-left">Udgifter</th>
                  <th className="text-left">Omsætning</th>
                  <th className="text-left">Indtjening</th>
                  <th className="text-left">Margin %</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.totalExpense}</td>
                    <td>{p.totalRevenue}</td>
                    <td>{p.profit}</td>
                    <td>{p.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lifetime Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8 text-lg font-bold">
            <div>
              Omsætning:{" "}
              <span className="text-green-500">{lifetimeRevenue}</span>
            </div>
            <div>
              Indtjening:{" "}
              <span className="text-blue-500">{lifetimeProfit}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
