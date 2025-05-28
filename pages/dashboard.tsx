import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.email}</h1>
      <p>This is your personal dashboard. Features will appear here soon.</p>
    </div>
  );
}
