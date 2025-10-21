import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createProduct,
  createExpense,
  createRevenue,
  getProducts,
  getExpenses,
  getRevenues,
  deleteExpense,
  deleteRevenue,
  deleteProduct,
} from "@/integrations/supabase/finance";
import { Trash2, TrendingUp, TrendingDown, DollarSign, Package, Plus, ExternalLink } from "lucide-react";

export default function FinanceDashboard() {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [transactionTab, setTransactionTab] = useState("expenses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState("product");
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
    amountWithVat: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    console.log("[FinanceDashboard] Fetching finance data...");
    
    const prodRes = await getProducts();
    console.log("[FinanceDashboard] Products:", prodRes);
    
    const expRes = await getExpenses();
    console.log("[FinanceDashboard] Expenses:", expRes);
    
    const revRes = await getRevenues();
    console.log("[FinanceDashboard] Revenues:", revRes);
    
    if (prodRes.error) console.error("[ERROR] Products fetch failed:", prodRes.error);
    if (expRes.error) console.error("[ERROR] Expenses fetch failed:", expRes.error);
    if (revRes.error) console.error("[ERROR] Revenues fetch failed:", revRes.error);
    
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
    setIsDialogOpen(false);
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
    setIsDialogOpen(false);
  }

  async function handleRevenueSubmit(e) {
    e.preventDefault();
    // Beregn beløb uden moms (ekskl. 25% moms)
    const amountExclVat = Number(revenueForm.amountWithVat) / 1.25;
    const revenueData: any = {
      product_id: revenueForm.product_id,
      amount: amountExclVat,
      date: new Date().toISOString().slice(0, 10),
    };
    
    // Tilføj description kun hvis feltet eksisterer i databasen
    if (revenueForm.description) {
      revenueData.description = revenueForm.description;
    }
    
    await createRevenue(revenueData);
    setRevenueForm({ product_id: "", amount: "", amountWithVat: "", description: "" });
    fetchAll();
    setIsDialogOpen(false);
  }

  async function handleDeleteExpense(id: string) {
    if (confirm("Er du sikker på at du vil slette denne udgift?")) {
      const result = await deleteExpense(id);
      if (result.error) {
        console.error("[ERROR] Delete expense failed:", result.error);
        alert("Kunne ikke slette udgift: " + result.error.message);
      } else {
        fetchAll();
      }
    }
  }

  async function handleDeleteRevenue(id: string) {
    if (confirm("Er du sikker på at du vil slette denne omsætning?")) {
      const result = await deleteRevenue(id);
      if (result.error) {
        console.error("[ERROR] Delete revenue failed:", result.error);
        alert("Kunne ikke slette omsætning: " + result.error.message);
      } else {
        fetchAll();
      }
    }
  }

  async function handleDeleteProduct(id: string) {
    if (confirm("Er du sikker på at du vil slette dette produkt? Dette vil også slette alle tilhørende udgifter og omsætning.")) {
      const result = await deleteProduct(id);
      if (result.error) {
        console.error("[ERROR] Delete product failed:", result.error);
        alert("Kunne ikke slette produkt: " + result.error.message);
      } else {
        fetchAll();
      }
    }
  }

  // Format til DKK
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
    }).format(num);

  // Beregninger pr. produkt
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

  // Momsberegning (25% af omsætning ekskl. moms)
  const totalVat = lifetimeRevenue * 0.25;

  // Kvartalsoversigt
  const getQuarter = (date: string) => {
    const month = new Date(date).getMonth();
    return Math.floor(month / 3) + 1;
  };

  const getYear = (date: string) => new Date(date).getFullYear();

  const quarterlyData = revenues.reduce((acc, rev) => {
    const quarter = getQuarter(rev.date);
    const year = getYear(rev.date);
    const key = `${year}-Q${quarter}`;
    
    if (!acc[key]) {
      acc[key] = { revenue: 0, vat: 0 };
    }
    acc[key].revenue += rev.amount;
    acc[key].vat += rev.amount * 0.25;
    
    return acc;
  }, {} as Record<string, { revenue: number; vat: number }>);

  const quarterlyArray = Object.entries(quarterlyData)
    .map(([key, data]) => ({ 
      quarter: key, 
      revenue: (data as { revenue: number; vat: number }).revenue, 
      vat: (data as { revenue: number; vat: number }).vat 
    }))
    .sort((a, b) => b.quarter.localeCompare(a.quarter));

  // Filtrering til chart
  const filteredStats = selectedProductId
    ? productStats.filter((p) => p.id === selectedProductId)
    : productStats;

  // Chart data
  const chartData = {
    labels: filteredStats.map((p) => p.name),
    datasets: [
      {
        label: "Omsætning",
        data: filteredStats.map((p) => p.totalRevenue),
        backgroundColor: "rgba(34,197,94,0.7)",
        borderRadius: 6,
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
      {
        label: "Udgifter",
        data: filteredStats.map((p) => p.totalExpense),
        backgroundColor: "rgba(239,68,68,0.7)",
        borderRadius: 6,
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
      {
        label: "Indtjening",
        data: filteredStats.map((p) => p.profit),
        backgroundColor: "rgba(59,130,246,0.7)",
        borderRadius: 6,
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#FFD700",
          font: { size: 14, weight: 600 },
        },
      },
      title: {
        display: true,
        text: "Produktøkonomi",
        color: "#FFD700",
        font: { size: 18, weight: 700 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw as number;
            return `${context.dataset.label}: ${formatCurrency(value)}`;
          },
        },
        backgroundColor: "#222",
        titleColor: "#FFD700",
        bodyColor: "#fff",
        borderColor: "#FFD700",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: "#FFD700", font: { size: 12 } },
        grid: { color: "#333" },
      },
      y: {
        ticks: {
          color: "#FFD700",
          font: { size: 12 },
          callback: (val: number) => formatCurrency(val),
        },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header med Add knap */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Finance Dashboard</h2>
          <p className="text-muted-foreground text-sm">Administrer produkter, udgifter og omsætning</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Tilføj Ny
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tilføj Ny Transaktion</DialogTitle>
              <DialogDescription>
                Opret nyt produkt, tilføj udgift eller registrer omsætning
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={dialogTab} onValueChange={setDialogTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="product" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Produkt
                </TabsTrigger>
                <TabsTrigger value="expense" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Udgift
                </TabsTrigger>
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Omsætning
                </TabsTrigger>
              </TabsList>

              <TabsContent value="product" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Opret Nyt Produkt</h4>
                  <p className="text-sm text-muted-foreground">Tilføj et nyt produkt til dit katalog</p>
                </div>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Produktnavn</label>
                    <Input
                      placeholder="F.eks. Akita, PitchNSales"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pris (DKK)</label>
                    <Input
                      placeholder="0"
                      type="number"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm((f) => ({ ...f, price: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Beskrivelse (valgfri)</label>
                    <Input
                      placeholder="Produktbeskrivelse"
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                    Opret Produkt
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="expense" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-500">Tilføj Udgift</h4>
                  <p className="text-sm text-muted-foreground">Registrer en ny udgift for et produkt</p>
                </div>
                <form onSubmit={handleExpenseSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vælg Produkt</label>
                    <select
                      className="w-full bg-background text-foreground border rounded-md px-3 py-2"
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Beløb (DKK)</label>
                    <Input
                      placeholder="0"
                      type="number"
                      value={expenseForm.amount}
                      onChange={(e) =>
                        setExpenseForm((f) => ({ ...f, amount: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Beskrivelse</label>
                    <Input
                      placeholder="Hvad er udgiften til?"
                      value={expenseForm.description}
                      onChange={(e) =>
                        setExpenseForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                    Tilføj Udgift
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-500">Registrer Omsætning</h4>
                  <p className="text-sm text-muted-foreground">Tilføj indtægt fra et produkt</p>
                </div>
                <form onSubmit={handleRevenueSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vælg Produkt</label>
                    <select
                      className="w-full bg-background text-foreground border rounded-md px-3 py-2"
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Beløb inkl. moms (DKK)</label>
                    <Input
                      placeholder="0"
                      type="number"
                      step="0.01"
                      value={revenueForm.amountWithVat}
                      onChange={(e) => {
                        const withVat = e.target.value;
                        const exclVat = withVat ? (Number(withVat) / 1.25).toFixed(2) : "";
                        setRevenueForm((f) => ({ ...f, amountWithVat: withVat, amount: exclVat }))
                      }}
                      required
                    />
                    {revenueForm.amountWithVat && (
                      <p className="text-xs text-muted-foreground">
                        Ekskl. moms: {formatCurrency(Number(revenueForm.amount))} | Moms (25%): {formatCurrency(Number(revenueForm.amountWithVat) - Number(revenueForm.amount))}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Milepæl/Beskrivelse</label>
                    <Input
                      placeholder="F.eks. 25% ved opstart, 50% ved levering"
                      value={revenueForm.description}
                      onChange={(e) =>
                        setRevenueForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Angiv hvilken rate/milepæl betalingen vedrører
                    </p>
                  </div>
                  <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                    Registrer Omsætning
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Omsætning</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {formatCurrency(lifetimeRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Samlet indtægt fra alle produkter (ekskl. moms)
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Indtjening</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {formatCurrency(lifetimeProfit)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Omsætning minus udgifter
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Skylder i Moms</CardTitle>
            <TrendingDown className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {formatCurrency(totalVat)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              25% af total omsætning
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart med filter */}
      <Card>
        <CardHeader>
          <CardTitle>Grafisk oversigt</CardTitle>
          <CardDescription>
            Omsætning, udgifter og indtjening pr. produkt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label
              htmlFor="product-select"
              className="block text-yellow-400 font-semibold mb-2"
            >
              Vælg produkt for graf:
            </label>
            <select
              id="product-select"
              className="bg-background text-white border rounded px-2 py-1"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Alle produkter</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className="bg-background p-4 rounded-xl shadow-lg"
            style={{ height: 400 }}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Produktstatistik */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Produkter & Statistik
          </CardTitle>
          <CardDescription>
            Oversigt med udgifter, omsætning, indtjening og margin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Navn</th>
                  <th className="text-left py-3 px-2 font-semibold">Pris</th>
                  <th className="text-left py-3 px-2 font-semibold">Udgifter</th>
                  <th className="text-left py-3 px-2 font-semibold">Omsætning</th>
                  <th className="text-left py-3 px-2 font-semibold">Indtjening</th>
                  <th className="text-left py-3 px-2 font-semibold">Margin</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-accent/5 transition-colors">
                    <td className="py-3 px-2 font-medium">{p.name}</td>
                    <td className="py-3 px-2">{formatCurrency(p.price)}</td>
                    <td className="py-3 px-2 text-red-500">{formatCurrency(p.totalExpense)}</td>
                    <td className="py-3 px-2 text-green-500">{formatCurrency(p.totalRevenue)}</td>
                    <td className="py-3 px-2 text-blue-500 font-semibold">{formatCurrency(p.profit)}</td>
                    <td className="py-3 px-2">
                      <Badge variant={Number(p.margin) > 50 ? "default" : Number(p.margin) > 20 ? "secondary" : "destructive"}>
                        {p.margin}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Udgifter, Omsætning og Detaljeret */}
      <Tabs value={transactionTab} onValueChange={setTransactionTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-background border border-border p-1">
          <TabsTrigger 
            value="expenses" 
            className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            <TrendingDown className="h-4 w-4" />
            Udgifter
            <Badge variant="secondary" className="ml-2">{expenses.length}</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="revenues" 
            className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            <TrendingUp className="h-4 w-4" />
            Omsætning
            <Badge variant="secondary" className="ml-2">{revenues.length}</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="vat" 
            className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            <DollarSign className="h-4 w-4" />
            Moms pr. Kvartal
          </TabsTrigger>
          <TabsTrigger 
            value="detailed" 
            className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            <Package className="h-4 w-4" />
            Detaljeret Visning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="mt-4">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Administrer Udgifter
              </CardTitle>
              <CardDescription>Tilføj og spor udgifter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Registrerede udgifter</h4>
                  <Badge variant="secondary">{expenses.length} i alt</Badge>
                </div>
                {expenses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingDown className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Ingen udgifter registreret endnu</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {expenses.map((expense) => {
                      const product = products.find(p => p.id === expense.product_id);
                      return (
                        <div key={expense.id} className="flex items-center justify-between p-4 bg-background/80 hover:bg-red-950/20 rounded-lg border border-border hover:border-red-500/50 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{product?.name || 'Ukendt'}</Badge>
                              <span className="font-semibold text-red-500">{formatCurrency(expense.amount)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{expense.description}</p>
                            <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString('da-DK')}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenues" className="mt-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Administrer Omsætning
              </CardTitle>
              <CardDescription>Registrer og administrer indtægter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Registreret omsætning</h4>
                  <Badge variant="secondary">{revenues.length} i alt</Badge>
                </div>
                {revenues.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Ingen omsætning registreret endnu</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {revenues.map((revenue) => {
                      const product = products.find(p => p.id === revenue.product_id);
                      return (
                        <div key={revenue.id} className="flex items-center justify-between p-4 bg-background/80 hover:bg-green-950/20 rounded-lg border border-border hover:border-green-500/50 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{product?.name || 'Ukendt'}</Badge>
                              <span className="font-semibold text-green-500">{formatCurrency(revenue.amount)}</span>
                            </div>
                            {revenue.description && (
                              <p className="text-sm text-foreground mt-1">{revenue.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{new Date(revenue.date).toLocaleDateString('da-DK')}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                            onClick={() => handleDeleteRevenue(revenue.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vat" className="mt-4">
          <Card className="border-yellow-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-500" />
                    Moms pr. Kvartal
                  </CardTitle>
                  <CardDescription>Oversigt over moms der skal betales hvert 3. kvartal</CardDescription>
                </div>
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  onClick={() => window.open('https://skat.dk/tast-selv', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Indberet Moms
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {quarterlyArray.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">Ingen omsætning registreret endnu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quarterlyArray.map((quarter) => (
                    <Card key={quarter.quarter} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">{quarter.quarter}</h4>
                            <p className="text-sm text-muted-foreground">
                              Omsætning: {formatCurrency(quarter.revenue)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Moms (25%)</div>
                            <div className="text-2xl font-bold text-yellow-500">
                              {formatCurrency(quarter.vat)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-yellow-500 border-2 bg-yellow-500/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg">Total Moms at Betale</h4>
                          <p className="text-sm text-muted-foreground">Samlet moms for alle kvartaler</p>
                        </div>
                        <div className="text-3xl font-bold text-yellow-500">
                          {formatCurrency(totalVat)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detaljeret Visning pr. Produkt
              </CardTitle>
              <CardDescription>Se alle udgifter og omsætning for hvert produkt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Ingen produkter oprettet endnu</p>
                  </div>
                ) : (
                  products.map((product) => {
                    const productExpenses = expenses.filter(e => e.product_id === product.id);
                    const productRevenues = revenues.filter(r => r.product_id === product.id);
                    const totalExpense = productExpenses.reduce((sum, e) => sum + e.amount, 0);
                    const totalRevenue = productRevenues.reduce((sum, r) => sum + r.amount, 0);
                    const profit = totalRevenue - totalExpense;
                    
                    return (
                      <Card key={product.id} className="border-2">
                        <CardHeader className="bg-accent/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {product.name}
                                <Badge variant="outline">{formatCurrency(product.price)}</Badge>
                              </CardTitle>
                              {product.description && (
                                <CardDescription className="mt-1">{product.description}</CardDescription>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Indtjening</div>
                              <div className={`text-2xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {formatCurrency(profit)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Udgifter */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                  Udgifter
                                </h4>
                                <Badge variant="secondary">{productExpenses.length}</Badge>
                              </div>
                              {productExpenses.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-4">Ingen udgifter</p>
                              ) : (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {productExpenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-background/80 rounded-lg border border-border">
                                      <div className="flex-1">
                                        <div className="font-semibold text-red-500">{formatCurrency(expense.amount)}</div>
                                        <p className="text-xs text-muted-foreground">{expense.description}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString('da-DK')}</p>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                                        onClick={() => handleDeleteExpense(expense.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="pt-2 border-t">
                                <div className="flex justify-between text-sm font-semibold">
                                  <span>Total udgifter:</span>
                                  <span className="text-red-500">{formatCurrency(totalExpense)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Omsætning */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                  Omsætning
                                </h4>
                                <Badge variant="secondary">{productRevenues.length}</Badge>
                              </div>
                              {productRevenues.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-4">Ingen omsætning</p>
                              ) : (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {productRevenues.map((revenue) => (
                                    <div key={revenue.id} className="flex items-center justify-between p-3 bg-background/80 rounded-lg border border-border">
                                      <div className="flex-1">
                                        <div className="font-semibold text-green-500">{formatCurrency(revenue.amount)}</div>
                                        {revenue.description && (
                                          <p className="text-sm text-foreground">{revenue.description}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground">{new Date(revenue.date).toLocaleDateString('da-DK')}</p>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                                        onClick={() => handleDeleteRevenue(revenue.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="pt-2 border-t">
                                <div className="flex justify-between text-sm font-semibold">
                                  <span>Total omsætning:</span>
                                  <span className="text-green-500">{formatCurrency(totalRevenue)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
