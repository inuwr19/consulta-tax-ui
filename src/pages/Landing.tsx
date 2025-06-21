
import { ArrowRight, Users, Award, Clock, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  const services = [
    {
      title: "Konsultasi Pajak Pribadi",
      description: "Bantuan untuk SPT Tahunan, perencanaan pajak, dan optimalisasi kewajiban pajak pribadi",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Konsultasi Pajak Perusahaan",
      description: "Layanan lengkap untuk pajak korporat, PPh Badan, PPN, dan compliance perpajakan",
      icon: <Award className="h-8 w-8" />
    },
    {
      title: "Konsultasi Online & Offline",
      description: "Fleksibilitas berkonsultasi secara langsung di kantor atau melalui video call",
      icon: <Clock className="h-8 w-8" />
    }
  ];

  const features = [
    "Konsultan berpengalaman dan bersertifikat",
    "Konsultasi 24/7 melalui platform online",
    "Harga transparan tanpa biaya tersembunyi",
    "Garansi kepuasan pelanggan",
    "Layanan follow-up berkelanjutan"
  ];

  const consultants = [
    {
      name: "Budi Santoso, S.E., M.Ak",
      specialization: "Pajak Penghasilan & SPT",
      experience: "10+ tahun"
    },
    {
      name: "Sari Dewi, S.E., M.Si",
      specialization: "PPN & Pajak Perusahaan",
      experience: "8+ tahun"
    },
    {
      name: "Ahmad Rahman, S.E., CPA",
      specialization: "Tax Planning & Compliance",
      experience: "12+ tahun"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-2xl">AMZ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                AMZ Tax Consultant
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Solusi Terpercaya untuk Semua Kebutuhan Konsultasi Pajak Anda
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
              Dapatkan bantuan profesional dari konsultan pajak berpengalaman untuk mengoptimalkan kewajiban pajak Anda dengan aman dan legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/register">
                  Mulai Konsultasi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/login">
                  Sudah Punya Akun? Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan konsultasi pajak yang komprehensif untuk individu dan perusahaan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full text-blue-600 w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mengapa Memilih AMZ Tax Consultant?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/about">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tim Konsultan Profesional</h3>
              <div className="space-y-4">
                {consultants.map((consultant, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-900">{consultant.name}</h4>
                    <p className="text-blue-600 text-sm">{consultant.specialization}</p>
                    <p className="text-gray-500 text-sm">Pengalaman: {consultant.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hubungi Kami
            </h2>
            <p className="text-lg text-gray-300">
              Siap membantu Anda dengan konsultasi pajak terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Telepon</h3>
              <p className="text-gray-300">+62 21 1234 5678</p>
              <p className="text-gray-300">+62 812 3456 7890</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">info@amztaxconsultant.com</p>
              <p className="text-gray-300">support@amztaxconsultant.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alamat</h3>
              <p className="text-gray-300">Jl. Sudirman No. 123</p>
              <p className="text-gray-300">Jakarta Pusat, 10220</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/register">
                Mulai Konsultasi Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
