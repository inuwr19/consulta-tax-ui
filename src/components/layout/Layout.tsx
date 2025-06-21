
import { ReactNode } from 'react';
import Header from './Header';
import FloatingChatbot from '../FloatingChatbot';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Layout = ({ children, showHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      <FloatingChatbot />
    </div>
  );
};

export default Layout;
