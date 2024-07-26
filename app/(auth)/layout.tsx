import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

interface IAuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col items-start justify-center w-full min-h-screen bg-gray-50">
        <header className="w-full flex justify-center">
          <div className="container">
            <div className="md:py-6 py-4">
              <div className="flex justify-center flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col items-center gap-4 relative">
                  <Link
                    href="/"
                    className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50"
                  >
                    <Image
                      src="https://cdn.salla.network/images/logo/logo-square.png"
                      alt="Logo"
                      width={72}
                      height={72}
                    />
                  </Link>
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl text-center">
                      متجر التجربة الجميلة
                    </h1>
                    <small className="text-gray-400 text-center">
                      متجرك لكل تجاربك وأفكارك الجميلة
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="w-full main flex-auto flex justify-center">
          <div className="container">
            <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl sm:max-w-[700px] mx-auto">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
