// app/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Find Your Next Craft",
  description: "A friendly experiment in helping people make things.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          WebkitTextSizeAdjust: "100%", // helps avoid weird iOS text scaling surprises
        }}
      >
        {children}
      </body>
    </html>
  );
}
