
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentCard from '@/components/AppointmentCard';
import { Appointment } from '@/types';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    address: 'Jakarta, Indonesia',
    joinDate: '2023-06-15'
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  // Dummy appointments data
  const appointments: Appointment[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      type: 'online',
      status: 'pending',
      consultant: 'Budi Santoso, S.E., M.Ak',
      notes: 'Konsultasi pajak penghasilan tahunan',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      date: '2024-01-10',
      time: '14:00',
      type: 'offline',
      status: 'completed',
      consultant: 'Sari Dewi, S.E., M.Si',
      notes: 'Review laporan keuangan bulanan',
      paymentStatus: 'paid'
    },
    {
      id: '3',
      date: '2024-01-05',
      time: '09:00',
      type: 'online',
      status: 'cancelled',
      consultant: 'Ahmad Rahman, S.E.',
      notes: 'Konsultasi pajak BPHTB',
      paymentStatus: 'cancelled'
    }
  ];

  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600 mt-2">Kelola informasi pribadi dan riwayat konsultasi Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{userInfo.name}</CardTitle>
              <CardDescription>Member sejak {new Date(userInfo.joinDate).toLocaleDateString('id-ID')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{userInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{userInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Bergabung {new Date(userInfo.joinDate).toLocaleDateString('id-ID')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Konsultasi</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Selesai</span>
                <span className="font-semibold text-green-600">{completedAppointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Menunggu</span>
                <span className="font-semibold text-yellow-600">{pendingAppointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Dibatalkan</span>
                <span className="font-semibold text-red-600">{cancelledAppointments.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Informasi Pribadi</TabsTrigger>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            </TabsList>

            {/* Profile Information */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Kelola informasi akun Anda</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Batal
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Simpan
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={isEditing ? editedInfo.name : userInfo.name}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editedInfo.email : userInfo.email}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editedInfo.phone : userInfo.phone}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        id="address"
                        value={isEditing ? editedInfo.address : userInfo.address}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments */}
            <TabsContent value="appointments">
              <div className="space-y-6">
                {/* Pending Appointments */}
                {pendingAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-yellow-700">Menunggu Konfirmasi</h3>
                    <div className="space-y-4">
                      {pendingAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onAction={(action, appointment) => {
                            console.log(`Action: ${action}`, appointment);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Appointments */}
                {completedAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-green-700">Selesai</h3>
                    <div className="space-y-4">
                      {completedAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancelled Appointments */}
                {cancelledAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-700">Dibatalkan</h3>
                    <div className="space-y-4">
                      {cancelledAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {appointments.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Belum ada riwayat konsultasi
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Mulai dengan membuat janji konsultasi pertama Anda
                      </p>
                      <Button>
                        Buat Janji Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
