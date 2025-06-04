"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase.config";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import axios from "axios";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ClientDashboard() {
  const [uid, setUid] = useState<string | null>(null);
  const [proxies, setProxies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProxies = async (uid: string) => {
    setLoading(true);
    console.log("📡 Fetching proxies for UID:", uid);
    try {
      const res = await axios.post("https://talmind-api-509546551316.me-west1.run.app/get-proxies", {
        uid,
      });
      console.log("✅ API response:", res.data);
      setProxies(res.data.proxies || []);
    } catch (err) {
      console.error("❌ Error fetching proxies:", err);
    }
    setLoading(false);
  };

  const toggleProxy = async (port: number, isActive: boolean) => {
    try {
      await axios.post("https://talmind-api-509546551316.me-west1.run.app/toggle-proxy", {
        uid,
        port,
        is_active: !isActive,
      });
      if (uid) fetchProxies(uid);
    } catch (err) {
      console.error("❌ Error toggling proxy:", err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("👤 Firebase user:", user);
      if (user) {
        setUid(user.uid);
        fetchProxies(user.uid);
      }
    });
  }, []);

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl font-bold">Proxy Dashboard</h1>
      {!uid && <p>Please sign in</p>}
      {loading && <p>Loading proxies...</p>}
      {!loading && proxies.length === 0 && <p>No proxies found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proxies.map((proxy, i) => (
          <Card key={i} className="p-4">
            <CardContent>
              <p>Port: <b>{proxy.port}</b></p>
              <p>IP: {proxy.ip || "N/A"}</p>
              <p>Status: {proxy.is_active ? "Active" : "Inactive"}</p>
              <Button
                className="mt-2"
                onClick={() => toggleProxy(proxy.port, proxy.is_active)}
              >
                {proxy.is_active ? "Deactivate" : "Activate"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
