
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;


  const getServiceTypeName = () => {
    switch (bookingData.serviceType) {
      case 'individual-service':
        return 'Layanan Individu';
      case 'individual-jasa':
        return 'Jasa Individu';
      case 'company-service':
        return 'Layanan Perusahaan';
      default:
        return 'Unknown Service';
    }
  };

  const getServicePrice = () => {
    switch (bookingData.serviceType) {
      case 'individual-service':
        return 'Rp 70.000 - Rp 100.000';
      case 'individual-jasa':
        return 'Rp 100.000 - Rp 200.000';
      case 'company-service':
        return 'Rp 200.000 - Rp 500.000';
      default:
        return 'Rp 0';
    }
  };

  if (!bookingData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Data booking tidak ditemukan</h1>
        <Button onClick={() => navigate('/booking')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Booking
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/booking')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Konfirmasi Pembayaran</h1>
        <p className="text-gray-600 mt-2">Silakan lakukan pembayaran dan upload bukti transfer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Information */}
        <div className="space-y-6">
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Informasi Pembayaran
              </CardTitle>
              <CardDescription>Detail pembayaran untuk konsultasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="font-medium text-gray-900">Bank BCA</div>
                  <div className="text-lg font-mono text-gray-700 mt-1">1234567890</div>
                  <div className="text-sm text-gray-500">a.n. PT ConsultaTax Indonesia</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-gray-900">Bank Mandiri</div>
                  <div className="text-lg font-mono text-gray-700 mt-1">0987654321</div>
                  <div className="text-sm text-gray-500">a.n. PT ConsultaTax Indonesia</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-gray-900">Bank BNI</div>
                  <div className="text-lg font-mono text-gray-700 mt-1">1122334455</div>
                  <div className="text-sm text-gray-500">a.n. PT ConsultaTax Indonesia</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Instruksi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>1. Transfer sesuai nominal yang tertera di ringkasan pesanan</p>
                <p>2. Simpan bukti transfer Anda</p>
                <p>3. Kirim bukti transfer via WhatsApp ke: <strong>+62 812-3456-7890</strong></p>
                <p>4. Sertakan nama dan tanggal booking dalam pesan WhatsApp</p>
                <p>5. Tim kami akan mengonfirmasi pembayaran dalam 1x24 jam</p>
                <p>6. Link meeting akan dikirim setelah pembayaran dikonfirmasi</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => navigate('/dashboard')} 
            className="w-full" 
            size="lg"
          >
            Kembali ke Dashboard
          </Button>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-medium">
                    {format(bookingData.date, 'dd MMM yyyy', { locale: id })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waktu:</span>
                  <span className="font-medium">{bookingData.time} WIB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Jenis Layanan:</span>
                  <span className="font-medium">{getServiceTypeName()}</span>
                </div>
                {bookingData.serviceType === 'individual-service' && bookingData.individualServiceType && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sub-layanan:</span>
                    <span className="font-medium">
                      {bookingData.individualServiceType === 'spt-reporting' ? 'Pelaporan SPT' : 'Perhitungan dan Pelaporan Pajak Penghasilan'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode:</span>
                  <span className="font-medium">
                    {bookingData.type === 'online' ? 'Online Meeting' : 'Tatap Muka'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Konsultan:</div>
                  <div className="font-medium">{bookingData.consultant?.name}</div>
                </div>
                {bookingData.requirements && (
                  <div className="text-sm">
                    <div className="text-gray-600 mb-1">Data Klien:</div>
                    <div className="text-gray-800 p-2 bg-gray-50 rounded text-xs space-y-1">
                      {bookingData.requirements.nama && <div>Nama: {bookingData.requirements.nama}</div>}
                      {bookingData.requirements.nik && <div>NIK: {bookingData.requirements.nik}</div>}
                      {bookingData.requirements.npwp && <div>NPWP: {bookingData.requirements.npwp}</div>}
                      {bookingData.requirements.efin && <div>EFIN: {bookingData.requirements.efin}</div>}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Harga Layanan:</span>
                  <span className="text-primary">{getServicePrice()}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="text-xs text-yellow-800">
                  <strong>Cara Pembayaran:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Transfer ke salah satu rekening yang tersedia</li>
                    <li>• Kirim bukti transfer via WhatsApp</li>
                    <li>• Pembayaran akan diverifikasi dalam 1x24 jam</li>
                    <li>• Link meeting dikirim setelah konfirmasi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
