import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Production OS",
  description: "Course production dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
