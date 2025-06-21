
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CustomNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-xl animate-slide-in">
        <CardContent className="text-center py-12">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-8xl font-bold text-primary/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-primary/60" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman telah dihapus atau alamat URL salah.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/booking">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Book Konsultasi
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Butuh bantuan? 
              <button 
                className="text-primary hover:underline ml-1"
                onClick={() => {
                  // This would open the floating chatbot
                  console.log('Opening chatbot...');
                }}
              >
                Chat dengan admin
              </button>
            </p>
          </div>

          {/* Logo */}
          <div className="mt-6">
            <Link to="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">CT</span>
              </div>
              <span className="text-sm">ConsultaTax</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomNotFound;
