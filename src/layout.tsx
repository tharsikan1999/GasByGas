import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
              <Outlet />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
