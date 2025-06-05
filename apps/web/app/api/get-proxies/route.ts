import { NextRequest, NextResponse } from 'next/server';
import { firebaseConfig } from '~/firebase.config';
import { initFirebase, getProxies } from '@kit/proxies/proxies';

initFirebase(firebaseConfig);

export async function POST(request: NextRequest) {
  const { uid } = await request.json();
  const data = await getProxies(uid);
  return NextResponse.json(data);
}
