"use client";

import { useEffect, useState } from "react";
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
    <div style={{ padding: "20px", display: "grid", gap: "20px" }}>
      {proxies.map(proxy => (
        <div key={proxy.id} style={{
          border: "1px solid #ccc",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
            Port: {proxy.port}
          </h2>
          <p>Status: {proxy.is_active ? "Active" : "Inactive"}</p>
          <button
            onClick={() => toggleProxy(proxy.id, proxy.is_active)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {proxy.is_active ? "Deactivate" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}
