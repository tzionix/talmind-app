import { NextRequest, NextResponse } from 'next/server';
import { firebaseConfig } from '~/firebase.config';
import { initFirebase, toggleProxy } from '@kit/proxies/proxies';

initFirebase(firebaseConfig);

export async function POST(request: NextRequest) {
  const { id, value } = await request.json();
  await toggleProxy(id, value);
  return NextResponse.json({ success: true });
}
