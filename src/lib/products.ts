export type Product = {
  id: number;
  name: string;
  mrp: number;
  cmPrice: number;
  gstPercent: number;
  platformFee: number;
  images: string[];
};

export async function fetchProduct(productId: number): Promise<Product | null> {
  try {
    const base =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5000/api/v1";
    const res = await fetch(`${base}/product/${productId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}
