import "./assets/css/style.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        <div className="main-container">
          <Sidebar />
          <div className="content">
            {children}
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}