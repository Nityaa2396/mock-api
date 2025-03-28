export default function UsersLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
