import { supabase } from "./client";
import { Database } from "./types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
export type Revenue = Database["public"]["Tables"]["revenues"]["Row"];

// Products
export async function createProduct(product: Omit<Product, "id">) {
  return supabase.from("products").insert(product).select().single();
}
export async function getProducts() {
  return supabase.from("products").select("*");
}

// Expenses
export async function createExpense(expense: Omit<Expense, "id">) {
  return supabase.from("expenses").insert(expense).select().single();
}
export async function getExpenses(product_id?: string) {
  const query = supabase.from("expenses").select("*");
  return product_id ? query.eq("product_id", product_id) : query;
}

// Revenues
export async function createRevenue(revenue: Omit<Revenue, "id">) {
  return supabase.from("revenues").insert(revenue).select().single();
}
export async function getRevenues(product_id?: string) {
  const query = supabase.from("revenues").select("*");
  return product_id ? query.eq("product_id", product_id) : query;
}
