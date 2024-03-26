import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Robo controle",
  description: "Robo controle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <>
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastContainer autoClose={false} />
        </>
      </body>
    </html>
  );
}
