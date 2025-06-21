
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Upload, CreditCard, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const paymentMethods = [
    {
      id: 'bca',
      name: 'Bank BCA',
      accountNumber: '1234567890',
      accountName: 'PT ConsultaTax Indonesia'
    },
    {
      id: 'mandiri',
      name: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'PT ConsultaTax Indonesia'
    },
    {
      id: 'bni',
      name: 'Bank BNI',
      accountNumber: '1122334455',
      accountName: 'PT ConsultaTax Indonesia'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod || !referenceNumber || !uploadedFile) {
      alert('Mohon lengkapi semua data pembayaran');
      return;
    }

    const paymentData = {
      booking: bookingData,
      paymentMethod: paymentMethods.find(p => p.id === paymentMethod),
      referenceNumber,
      notes,
      uploadedFile: uploadedFile.name,
      submittedAt: new Date()
    };

    console.log('Payment confirmation submitted:', paymentData);
    
    // Simulate successful submission
    alert('Konfirmasi pembayaran berhasil dikirim! Kami akan memverifikasi dalam 1x24 jam.');
    navigate('/dashboard');
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pilih Metode Pembayaran
                </CardTitle>
                <CardDescription>Transfer ke rekening berikut</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="relative">
                        <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                        <Label
                          htmlFor={method.id}
                          className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-lg font-mono text-gray-700 mt-1">{method.accountNumber}</div>
                            <div className="text-sm text-gray-500">a.n. {method.accountName}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Detail Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Nomor Referensi / Bukti Transfer</Label>
                  <Input
                    id="referenceNumber"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="Masukkan nomor referensi transfer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentProof">Upload Bukti Transfer</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Klik untuk upload atau drag & drop file
                      </p>
                      <p className="text-xs text-gray-500">
                        Format: JPG, PNG, PDF (Maks. 5MB)
                      </p>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="mt-2"
                        required
                      />
                    </div>
                    {uploadedFile && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-green-700">
                            File terpilih: {uploadedFile.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tambahkan catatan jika diperlukan..."
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg">
              Konfirmasi Pembayaran
            </Button>
          </form>
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
                  <span className="text-gray-600">Metode:</span>
                  <span className="font-medium">
                    {bookingData.type === 'online' ? 'Online Meeting' : 'Tatap Muka'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Konsultan:</div>
                  <div className="font-medium">{bookingData.consultant?.name}</div>
                </div>
                {bookingData.notes && (
                  <div className="text-sm">
                    <div className="text-gray-600 mb-1">Catatan:</div>
                    <div className="text-gray-800 p-2 bg-gray-50 rounded text-xs">
                      {bookingData.notes}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Bayar:</span>
                  <span className="text-primary">{bookingData.consultant?.price}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="text-xs text-yellow-800">
                  <strong>Catatan Penting:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Pembayaran akan diverifikasi dalam 1x24 jam</li>
                    <li>• Link meeting akan dikirim setelah pembayaran dikonfirmasi</li>
                    <li>• Hubungi admin jika ada kendala</li>
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
