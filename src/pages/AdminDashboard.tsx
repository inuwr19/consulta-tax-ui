
import { Users, Calendar, DollarSign, FileText, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/StatsCard';

const AdminDashboard = () => {
  // Dummy data for admin dashboard
  const pendingAppointments = [
    {
      id: '1',
      clientName: 'John Doe',
      date: '2024-01-15',
      time: '10:00',
      type: 'online',
      service: 'Konsultasi Pajak SPT',
      status: 'pending_confirmation'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      date: '2024-01-15',
      time: '14:00',
      type: 'offline',
      service: 'Pajak Perusahaan',
      status: 'pending_payment'
    },
    {
      id: '3',
      clientName: 'Ahmad Rahman',
      date: '2024-01-16',
      time: '09:00',
      type: 'online',
      service: 'Tax Planning',
      status: 'confirmed'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      action: 'Konsultasi selesai',
      client: 'Sarah Williams',
      time: '2 jam yang lalu',
      type: 'completed'
    },
    {
      id: '2',
      action: 'Pembayaran diterima',
      client: 'Michael Brown',
      time: '4 jam yang lalu',
      type: 'payment'
    },
    {
      id: '3',
      action: 'Janji baru dibuat',
      client: 'Lisa Anderson',
      time: '6 jam yang lalu',
      type: 'new_appointment'
    },
    {
      id: '4',
      action: 'Chat admin',
      client: 'David Wilson',
      time: '1 hari yang lalu',
      type: 'chat'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_confirmation':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Menunggu Konfirmasi</Badge>;
      case 'pending_payment':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Menunggu Pembayaran</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Terkonfirmasi</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'new_appointment':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'chat':
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">AMZ Tax Consultant - Panel Administrasi</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Klien"
          value="156"
          description="Terdaftar bulan ini"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Konsultasi Hari Ini"
          value="8"
          description="3 online, 5 offline"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatsCard
          title="Pendapatan Bulan Ini"
          value="Rp 45.2M"
          description="Target: Rp 50M"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatsCard
          title="Konsultasi Pending"
          value="12"
          description="Perlu tindak lanjut"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Appointments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Jadwal Konsultasi Pending
              </CardTitle>
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{appointment.clientName}</h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{appointment.service}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.date} • {appointment.time} • {appointment.type === 'online' ? 'Online' : 'Offline'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Detail
                      </Button>
                      {appointment.status === 'pending_confirmation' && (
                        <Button size="sm">
                          Konfirmasi
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Kelola Klien</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">Jadwal Konsultan</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span className="text-sm">Laporan Keuangan</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">Dokumen</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.client}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Notifikasi Penting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">Pembayaran Tertunda</p>
                <p className="text-sm text-red-600">5 klien belum melakukan pembayaran</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Jadwal Penuh</p>
                <p className="text-sm text-yellow-600">Hari Rabu sudah fully booked</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Update Sistem</p>
                <p className="text-sm text-blue-600">Maintenance dijadwalkan Minggu malam</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
