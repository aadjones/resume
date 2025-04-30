import './globals.css';
import { Inter, Merriweather } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata = {
  title: 'Resume Builder',
  description: 'Build your professional resume',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
