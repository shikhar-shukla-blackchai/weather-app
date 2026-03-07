import Header from "./Header";
import MapBackground from "./MapBackground";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <MapBackground />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
