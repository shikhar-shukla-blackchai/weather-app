import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 transition-colors duration-500">
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
