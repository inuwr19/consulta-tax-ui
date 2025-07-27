import {
  ArrowRight,
  Users,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface Consultant {
  id: number;
  name: string;
  specialty: string;
  experience_years: string;
  photo?: string;
}

const Landing = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/consultants")
      .then((res) => {
        setConsultants(res.data.data); // pastikan `data` dari Laravel Resource
      })
      .catch((err) => {
        console.error("Failed to fetch consultants", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const services = [
    {
      title: "Konsultasi Pajak Pribadi",
      description:
        "Bantuan untuk SPT Tahunan, perencanaan pajak, dan optimalisasi kewajiban pajak pribadi",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Konsultasi Pajak Perusahaan",
      description:
        "Layanan lengkap untuk pajak korporat, PPh Badan, PPN, dan compliance perpajakan",
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: "Konsultasi Online & Offline",
      description:
        "Fleksibilitas berkonsultasi secara langsung di kantor atau melalui video call",
      icon: <Clock className="h-8 w-8" />,
    },
  ];

  const features = [
    "Konsultan berpengalaman dan bersertifikat",
    "Konsultasi 24/7 melalui platform online",
    "Harga transparan tanpa biaya tersembunyi",
    "Garansi kepuasan pelanggan",
    "Layanan follow-up berkelanjutan",
  ];

  const taxSavingsData = [
    { year: "2021", savings: 45, clients: 120 },
    { year: "2022", savings: 78, clients: 185 },
    { year: "2023", savings: 95, clients: 240 },
    { year: "2024", savings: 125, clients: 310 },
  ];

  const clientTypeData = [
    { name: "Perusahaan", value: 60, color: "#3b82f6" },
    { name: "Individu", value: 35, color: "#06b6d4" },
    { name: "UMKM", value: 25, color: "#8b5cf6" },
  ];

  const testimonials = [
    {
      name: "PT. Maju Bersama",
      role: "CFO",
      comment:
        "AMZ Tax Consultant berhasil menghemat pajak perusahaan kami hingga 30% dalam 1 tahun. Sangat profesional!",
      savings: "Rp 450 juta",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Pengusaha",
      comment:
        "Konsultasi pajak terbaik! Tim yang sangat kompeten dan responsif. Highly recommended!",
      savings: "Rp 85 juta",
      rating: 5,
    },
    {
      name: "CV. Berkah Jaya",
      role: "Owner",
      comment:
        "Proses konsultasi mudah dan hasilnya memuaskan. Terima kasih AMZ Tax Consultant!",
      savings: "Rp 120 juta",
      rating: 5,
    },
  ];

  const chartConfig = {
    savings: {
      label: "Penghematan (Miliar Rp)",
      color: "#3b82f6",
    },
    clients: {
      label: "Jumlah Klien",
      color: "#06b6d4",
    },
  };

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
              Dapatkan bantuan profesional dari konsultan pajak berpengalaman
              untuk mengoptimalkan kewajiban pajak Anda dengan aman dan legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link to="/register">
                  Mulai Konsultasi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link to="/login">Sudah Punya Akun? Login</Link>
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
              Kami menyediakan berbagai layanan konsultasi pajak yang
              komprehensif untuk individu dan perusahaan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full text-blue-600 w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
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
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Tim Konsultan Profesional
              </h3>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {consultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500 flex items-center space-x-4"
                    >
                      {consultant.photo && (
                        <img
                          src={consultant.photo}
                          alt={consultant.name}
                          className="w-16 h-16 rounded-full object-cover border border-gray-300"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {consultant.name}
                        </h4>
                        <p className="text-blue-600 text-sm font-medium">
                          {consultant.specialty}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Pengalaman: {consultant.experience_years}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bukti Nyata Keberhasilan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lebih dari 1000+ klien telah mempercayai layanan kami dan
              merasakan manfaat nyata dalam optimalisasi pajak mereka.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600 font-medium">Klien Terpuaskan</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50M+</div>
              <p className="text-gray-600 font-medium">Total Penghematan</p>
              <p className="text-sm text-gray-500">(Juta Rupiah)</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600 font-medium">Tingkat Kepuasan</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
              <p className="text-gray-600 font-medium">Tahun Pengalaman</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Tax Savings Chart */}
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center text-gray-800">
                  Pertumbuhan Penghematan Pajak Klien
                </CardTitle>
                <p className="text-sm text-gray-600 text-center">
                  Penghematan dalam Miliar Rupiah per Tahun
                </p>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="w-full h-80">
                  <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={taxSavingsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="savings"
                          fill="var(--color-savings)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Client Distribution Chart */}
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center text-gray-800">
                  Distribusi Jenis Klien
                </CardTitle>
                <p className="text-sm text-gray-600 text-center">
                  Persentase Klien Berdasarkan Kategori
                </p>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="w-full h-80 flex items-center justify-center">
                  <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clientTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {clientTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Testimonials */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Testimoni Klien
            </h3>
            <p className="text-center text-gray-600 mb-8">
              Dengarkan pengalaman langsung dari klien-klien kami
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-xl transition-shadow duration-300 border-0"
                >
                  <CardContent className="p-6">
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 mb-6 italic text-center leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Client Info */}
                    <div className="border-t pt-4 text-center">
                      <div className="font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {testimonial.role}
                      </div>
                      <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        💰 Hemat: {testimonial.savings}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
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
