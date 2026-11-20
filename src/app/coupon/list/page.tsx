// // app/contact/page.tsx
"use client";

import styles from "./contactus.module.css";
import { useActionState, useEffect, useState } from "react";

type Coupon = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  couponcode: string;
  availed_date: string;
  is_active: boolean;
  redeem_date: string | null;
};

export default function GetCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPageData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/coupons");
        if (!res.ok) {
          throw new Error("Failed to fetch page data");
        }
        const json = await res.json();
        setCoupons(Array.isArray(json) ? json : json.data || []);
      } catch (error: any) {
        console.error("Error fetching page data:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getPageData();
  }, []);

  if (loading) return <p>Loading coupons...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;


 return (
    <div>
      <h2>Coupon Records ({coupons.length})</h2>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            <strong>{coupon.couponcode}</strong> — {coupon.full_name} ({coupon.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
