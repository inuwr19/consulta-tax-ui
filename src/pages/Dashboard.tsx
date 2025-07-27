/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  Clock,
  User,
  TrendingUp,
  DollarSign,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import AppointmentCard from "@/components/AppointmentCard";
import { Appointment } from "@/types";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

const Dashboard = () => {
  const [consultants, setConsultants] = useState<any[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/consultants")
      .then((res) => {
        setConsultants(res.data.data); // simpan array, bukan jumlah
      })
      .catch((err) => {
        console.error("Gagal memuat data konsultan:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/appointments")
      .then((res) => {
        setUpcomingAppointments(res.data.data); // data dari Laravel
      })
      .catch((err) => {
        console.error("Gagal memuat janji temu:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const quickActions = [
    {
      title: "Buat Janji Baru",
      description: "Jadwalkan konsultasi dengan ahli pajak",
      icon: Calendar,
      link: "/booking",
      color: "bg-blue-500",
    },
    {
      title: "Profil Saya",
      description: "Kelola informasi pribadi",
      icon: FileText,
      link: "/profile",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang di ConsultaTax Dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Konsultasi"
          value="12"
          description="Sepanjang tahun ini"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: "20%", isPositive: true }}
        />
        <StatsCard
          title="Konsultasi Pending"
          value="2"
          description="Menunggu konfirmasi"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title="Konsultan Tersedia"
          value={consultants.length.toString()} // karena value berupa string
          description="Siap melayani Anda"
          icon={<User className="h-4 w-4" />}
        />
        <StatsCard
          title="Penghematan Pajak"
          value="Rp 5.2M"
          description="Dari konsultasi tahun ini"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {/* <DollarSign className="h-5 w-5 mr-2" /> */}
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <div className="flex items-center p-4 rounded-lg border hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer">
                    <div
                      className={`p-2 rounded-lg ${action.color} text-white mr-4`}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notifikasi Penting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Peringatan SPT
                </p>
                <p className="text-sm text-yellow-600">
                  Batas waktu SPT Tahunan: 31 Maret 2024
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Update Regulasi
                </p>
                <p className="text-sm text-blue-600">
                  Perubahan tarif pajak efektif Januari 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Jadwal Konsultasi
            </h2>
            <Button asChild variant="outline">
              <Link to="/profile">Lihat Semua</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onAction={(action, appointment) => {
                  console.log(`Action: ${action}`, appointment);
                }}
              />
            ))}
          </div>

          {upcomingAppointments.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Belum ada jadwal konsultasi
                </h3>
                <p className="text-gray-500 mb-4">
                  Mulai dengan membuat janji konsultasi pertama Anda
                </p>
                <Button asChild>
                  <Link to="/booking">Buat Janji Sekarang</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
