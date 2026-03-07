import { Link } from "react-router-dom";
import { CloudRain, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-fade-in text-center">
        <div className="relative">
          <svg
            viewBox="0 0 200 160"
            className="h-40 w-52 text-muted-foreground/30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M140 80c0-22.1-17.9-40-40-40-16.5 0-30.7 10-36.8 24.3A30 30 0 0 0 30 94c0 16.6 13.4 30 30 30h80c16.6 0 30-13.4 30-30 0-7.5-2.7-14.4-7.3-19.7"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line x1="70" y1="130" x2="65" y2="155" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            <line x1="90" y1="130" x2="88" y2="160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <line x1="110" y1="130" x2="107" y2="155" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            <line x1="130" y1="125" x2="126" y2="150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            <line x1="50" y1="125" x2="48" y2="148" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
          </svg>
          <CloudRain
            className="absolute top-6 left-1/2 -translate-x-1/2 h-16 w-16 text-sky-400/60"
            strokeWidth={1.5}
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold tracking-tighter text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">
            Looks like this page got lost in a storm.
          </p>
        </div>

        <Button asChild variant="default" size="lg" className="gap-2 rounded-xl">
          <Link to="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
}
