"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMultipleImages } from "@/lib/uploadImage";
import { CATEGORIES } from "@/app/data/categories";
import { SEED_PRODUCTS } from "@/app/data/seed-products";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Package,
  DollarSign,
  Loader2,
  Image as ImageIcon,
  Lock,
  Sparkles,
  LogOut,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_urls: string[];
  category?: string;
  subcategory?: string;
  created_at?: string;
};

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("admin-auth");
      setIsAuth(auth === "true");
    } catch {
      setIsAuth(false);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking((prev) => (prev ? false : prev));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (password === "nkaqua2021") {
      try {
        sessionStorage.setItem("admin-auth", "true");
      } catch {
        // ignore
      }
      setIsAuth(true);
      setPassword("");
    } else {
      setAuthError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("admin-auth");
    } catch {
      // ignore
    }
    setIsAuth(false);
    setProducts([]);
  };

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    imageUrls: [] as string[],
    category: "",
    subcategory: "",
  });

  const fetchProducts = async () => {
    setFetching(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        const isConnection =
          error.message?.includes("fetch failed") ||
          error.message?.includes("Failed to fetch") ||
          error.message?.includes("Network") ||
          error.message?.includes("ECONNREFUSED") ||
          error.message?.includes("ETIMEDOUT");
        const isAuthError =
          error.message?.includes("Invalid API key") ||
          error.message?.includes("JWT") ||
          error.message?.includes("Unauthorized");
        const isMissingTable =
          error.message?.includes("Could not find the table") ||
          error.message?.includes("does not exist") ||
          error.message?.includes("relation") ||
          error.message?.includes("42P01");
        if (isConnection) {
          setError("Cannot connect to database. Check your internet and make sure Supabase is active.");
        } else if (isAuthError) {
          setError("Supabase API key is invalid. Update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and restart the server.");
        } else if (isMissingTable) {
          setError("The products table does not exist. Run supabase-setup.sql in your Supabase SQL Editor.");
        } else {
          setError("Failed to load products: " + error.message);
        }
      }
      setProducts(data || []);
    } catch {
      setError("Cannot connect to database. Check your internet and make sure Supabase is active.");
      setProducts([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!editingId) {
      setForm((prev) => ({
        ...prev,
        slug: prev.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    }
  }, [form.name, editingId]);

  const handleImageUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    setUploadingImages(true);
    setError(null);
    try {
      const urls = await uploadMultipleImages(fileArray);
      setForm((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }
    setForm({ ...form, price: rawValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const priceNumber = parseFloat(form.price);
      if (isNaN(priceNumber)) {
        throw new Error("Please enter a valid price");
      }

      const productData = {
        name: form.name,
        slug: form.slug,
        price: priceNumber,
        description: form.description,
        image_urls: form.imageUrls,
        category: form.category,
        subcategory: form.subcategory,
      };

      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId);
        if (error) throw error;
        setSuccess("Product updated successfully!");
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        setSuccess("Product published successfully!");
      }

      setForm({ name: "", slug: "", price: "", description: "", imageUrls: [], category: "", subcategory: "" });
      setEditingId(null);
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      description: product.description,
      imageUrls: product.image_urls || [],
      category: product.category || "",
      subcategory: product.subcategory || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      await fetchProducts();
      setSuccess("Product deleted.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", slug: "", price: "", description: "", imageUrls: [], category: "", subcategory: "" });
    setError(null);
  };

  const seedDemoData = async () => {
    if (!confirm("This will add 20 demo products to your store. Continue?")) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("products").insert(SEED_PRODUCTS);
      if (error) throw error;
      setSuccess("Demo products added successfully!");
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to seed demo data. Make sure category/subcategory columns exist.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  if (checking) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[var(--accent)] animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border border-[var(--accent)]/20 mb-3">
              <Lock className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
            <p className="text-sm text-muted mt-1">Enter password to manage products</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground placeholder:text-dim"
              required
              autoFocus
            />
            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white py-2 rounded-xl font-medium transition glow-button"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Aqua<span className="text-[var(--accent)]">Manager</span>
            </h1>
            <p className="text-muted mt-1">Manage your fish inventory with style</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Products</p>
              <p className="text-3xl font-bold text-foreground">{totalProducts}</p>
            </div>
            <div className="h-12 w-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border border-[var(--accent)]/20">
              <Package className="h-6 w-6 text-[var(--accent)]" />
            </div>
          </div>
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Inventory Value</p>
              <p className="text-3xl font-bold text-foreground">৳{totalValue.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border border-[var(--accent)]/20">
              <DollarSign className="h-6 w-6 text-[var(--accent)]" />
            </div>
          </div>
          <button
            type="button"
            onClick={seedDemoData}
            disabled={loading}
            className="glass-card p-5 flex items-center justify-between hover:border-[var(--accent)]/30 transition text-left"
          >
            <div>
              <p className="text-muted text-sm">Quick Start</p>
              <p className="text-lg font-bold text-[var(--accent)]">Add Demo Products</p>
            </div>
            <div className="h-12 w-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border border-[var(--accent)]/20">
              <Sparkles className="h-6 w-6 text-[var(--accent)]" />
            </div>
          </button>
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form + Product List */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-6 py-4">
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                  {editingId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {editingId ? "Edit Fish" : "Add New Fish"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground placeholder:text-dim"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Price (৳)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={form.price}
                    onChange={handlePriceChange}
                    className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground placeholder:text-dim"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground placeholder:text-dim"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                        subcategory: "",
                      })
                    }
                    className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground"
                    required
                  >
                    <option value="" className="bg-[var(--bg-soft)] text-foreground">Select category</option>
                    {Object.keys(CATEGORIES).map((cat) => (
                      <option key={cat} value={cat} className="bg-[var(--bg-soft)] text-foreground">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {form.category && (
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Subcategory</label>
                    <select
                      value={form.subcategory}
                      onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                      className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition text-foreground"
                      required
                    >
                      <option value="" className="bg-[var(--bg-soft)] text-foreground">Select subcategory</option>
                      {CATEGORIES[form.category]?.map((sub) => (
                        <option key={sub} value={sub} className="bg-[var(--bg-soft)] text-foreground">
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Images</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
                      form.imageUrls.length > 0
                        ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                        : "border-[var(--border)] hover:border-[var(--accent)]/40"
                    }`}
                    onClick={() => document.getElementById("multiFileInput")?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files.length) handleImageUpload(files);
                    }}
                  >
                    {uploadingImages ? (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Loader2 className="h-8 w-8 text-[var(--accent)] animate-spin" />
                        <p className="text-sm text-muted">Uploading images...</p>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload className="h-8 w-8 mx-auto text-dim mb-2" />
                        <p className="text-muted text-sm">Click or drag & drop multiple images</p>
                        <p className="text-dim text-xs mt-1">PNG, JPG, WEBP (max 5MB each)</p>
                      </div>
                    )}
                    <input
                      id="multiFileInput"
                      type="file"
                      hidden
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length) handleImageUpload(files);
                      }}
                    />
                  </div>
                  {form.imageUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {form.imageUrls.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={url}
                            alt={`preview ${idx}`}
                            className="h-20 w-full object-cover rounded-lg border border-[var(--border)]"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md transition"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition resize-none text-foreground placeholder:text-dim"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 px-4 py-2 border border-[var(--border)] rounded-xl text-muted hover:bg-[var(--text)]/5 transition"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading || uploadingImages || form.imageUrls.length === 0}
                    className="flex-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white py-2 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : editingId ? (
                      "Update Fish"
                    ) : (
                      "Publish Fish"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--text)]/10 flex justify-between items-center">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Package className="h-5 w-5 text-[var(--accent)]" />
                  Your Collection ({products.length})
                </h2>
              </div>
              {fetching ? (
                <div className="p-12 text-center text-muted">
                  <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--accent)] animate-spin" />
                  <p>Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="p-12 text-center">
                  {error ? (
                    <div className="space-y-3">
                      <ImageIcon className="h-12 w-12 mx-auto mb-3 text-dim opacity-50" />
                      <p className="text-muted font-medium">Unable to load products</p>
                      <button
                        onClick={fetchProducts}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-12 w-12 mx-auto mb-3 text-dim opacity-50" />
                      <p className="text-dim">No fish yet. Add your first one!</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-[var(--text)]/5">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 hover:bg-[var(--text)]/5 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-[var(--bg-soft)] overflow-hidden flex-shrink-0 border border-[var(--border)]">
                          <img
                            src={product.image_urls?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{product.name}</h3>
                          <p className="text-sm text-[var(--accent)] font-semibold">
                            ৳{product.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-dim">/{product.slug}</p>
                          {product.category && (
                            <p className="text-xs text-muted mt-0.5">
                              {product.category}
                              {product.subcategory && ` › ${product.subcategory}`}
                            </p>
                          )}
                          {product.image_urls && product.image_urls.length > 1 && (
                            <p className="text-xs text-dim mt-0.5">
                              +{product.image_urls.length - 1} more image(s)
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:ml-auto">
                        <button
                          onClick={() => startEdit(product)}
                          className="p-2 text-muted hover:text-[var(--accent)] transition rounded-full hover:bg-[var(--text)]/5"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-muted hover:text-red-400 transition rounded-full hover:bg-[var(--text)]/5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
