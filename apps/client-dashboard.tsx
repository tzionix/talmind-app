"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase.config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function ClientDashboard() {
  const [uid, setUid] = useState<string | null>(null);
  const [proxies, setProxies] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const q = query(collection(db, "proxies"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const proxyList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProxies(proxyList);
      } else {
        setUid(null);
      }
    });
  }, []);

  const toggleProxy = async (proxyId: string, isActive: boolean) => {
    await fetch("https://YOUR_API_DOMAIN/toggle-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proxyId, isActive: !isActive }),
    });
    setProxies(prev =>
      prev.map(p =>
        p.id === proxyId ? { ...p, is_active: !isActive } : p
      )
    );
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {proxies.map(proxy => (
        <Card key={proxy.id} className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Port: {proxy.port}</h2>
            <p>Status: {proxy.is_active ? "Active" : "Inactive"}</p>
            <Button onClick={() => toggleProxy(proxy.id, proxy.is_active)} className="mt-2">
              {proxy.is_active ? "Deactivate" : "Activate"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
