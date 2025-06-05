"use client";

import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase.config';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';
import { Button } from '@kit/ui/button';
import { useProxies } from '@kit/proxies/hooks/useProxies';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ClientDashboard() {
  const [uid, setUid] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUid(result.user.uid);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!uid) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="block mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-2 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  const { data: proxies, toggleProxy } = useProxies(uid);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Proxies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Port</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proxies.map((proxy) => (
            <TableRow key={proxy.id}>
              <TableCell>{proxy.port}</TableCell>
              <TableCell>{proxy.is_active ? 'ON' : 'OFF'}</TableCell>
              <TableCell>
                <Button onClick={() => toggleProxy(proxy.id, proxy.is_active)}>
                  {proxy.is_active ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
