import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { products, getProductById } from "@/data/productData";

const STATUSES = ["pending", "paid", "active", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customer_name: "", customer_email: "", product_id: products[0].id, payment_method: "monthly", status: "pending",
  });

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.customer_name.trim()) return toast.error("Asiakkaan nimi vaaditaan");
    const product = getProductById(form.product_id);
    if (!product) return toast.error("Tuotetta ei löydy");
    const total = form.payment_method === "full" ? product.fullPrice : product.monthlyPrice * product.months;
    const { error } = await supabase.from("orders").insert({
      ...form,
      product_name: product.name,
      monthly_price: product.monthlyPrice,
      total_price: total,
    });
    if (error) return toast.error(error.message);
    toast.success("Tilaus luotu");
    setOpen(false);
    setForm({ customer_name: "", customer_email: "", product_id: products[0].id, payment_method: "monthly", status: "pending" });
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Poista tilaus?")) return;
    await supabase.from("orders").delete().eq("id", id);
    toast.success("Poistettu");
    load();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tilaukset</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} kpl</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> Uusi tilaus</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Uusi tilaus</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Asiakkaan nimi *</Label><Input value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></div>
              <div><Label>Sähköposti</Label><Input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></div>
              <div>
                <Label>Tuote</Label>
                <Select value={form.product_id} onValueChange={(v) => setForm({ ...form, product_id: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{products.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} — {p.monthlyPrice}€/kk</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Maksutapa</Label>
                <Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Kuukausimaksu</SelectItem>
                    <SelectItem value="full">Kertamaksu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Peruuta</Button>
              <Button onClick={save}>Tallenna</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button className="admin-chip" data-selected={filter === "all"} onClick={() => setFilter("all")}>Kaikki</button>
        {STATUSES.map((s) => (
          <button key={s} className="admin-chip" data-selected={filter === s} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asiakas</TableHead>
              <TableHead>Tuote</TableHead>
              <TableHead>Summa</TableHead>
              <TableHead>Maksutapa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Päivä</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell>
                  <div className="font-medium">{o.customer_name}</div>
                  <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                </TableCell>
                <TableCell className="text-sm">{o.product_name}</TableCell>
                <TableCell className="font-medium">{Number(o.total_price ?? 0).toFixed(0)} €</TableCell>
                <TableCell className="text-sm">{o.payment_method === "full" ? "Kerralla" : "Kk-maksu"}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                    <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("fi-FI")}</TableCell>
                <TableCell><Button variant="ghost" size="icon" onClick={() => remove(o.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Ei tilauksia</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
