import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  type Firestore,
} from 'firebase/firestore';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function initFirebase(config: object) {
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  return db;
}

export async function getProxies(uid: string) {
  if (!db) throw new Error('Firestore not initialized');
  const q = query(collection(db, 'proxies'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function toggleProxy(id: string, value: boolean) {
  if (!db) throw new Error('Firestore not initialized');
  const ref = doc(db, 'proxies', id);
  await updateDoc(ref, { is_active: value });
}
