import "./globals.css";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Naman Mehra — HCI Designer & Creative Technologist",
  description: "HCI designer and creative technologist working across product, XR, and physical interfaces. MSc HCI, UCA London.",
  openGraph: {
    title: "Naman Mehra",
    description: "HCI designer & creative technologist — product, XR, physical interfaces.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Cormorant+Garamond:ital,wght@0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Grain />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
