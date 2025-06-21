
import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, CreditCard, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Booking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('online');
  const [notes, setNotes] = useState('');

  const availableTimeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const consultants = [
    {
      id: '1',
      name: 'Budi Santoso, S.E., M.Ak',
      specialty: 'Pajak Penghasilan & PPh Badan',
      experience: '8 tahun',
      rating: 4.9,
      price: 'Rp 150.000'
    },
    {
      id: '2',
      name: 'Sari Dewi, S.E., M.Si',
      specialty: 'PPN & Pajak Perdagangan',
      experience: '6 tahun',
      rating: 4.8,
      price: 'Rp 125.000'
    },
    {
      id: '3',
      name: 'Ahmad Rahman, S.E.',
      specialty: 'BPHTB & Pajak Daerah',
      experience: '5 tahun',
      rating: 4.7,
      price: 'Rp 100.000'
    }
  ];

  const [selectedConsultant, setSelectedConsultant] = useState(consultants[0].id);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Pilih tanggal dan waktu terlebih dahulu');
      return;
    }

    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      consultant: consultants.find(c => c.id === selectedConsultant),
      notes
    };

    console.log('Booking data:', bookingData);
    navigate('/payment-confirmation', { state: { bookingData } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Konsultasi</h1>
        <p className="text-gray-600 mt-2">Jadwalkan konsultasi dengan ahli pajak terpercaya</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Pilih Tanggal & Waktu
              </CardTitle>
              <CardDescription>Pilih jadwal yang sesuai dengan ketersediaan Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calendar */}
              <div>
                <Label className="text-base font-medium">Tanggal Konsultasi</Label>
                <div className="mt-2">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className={cn("rounded-md border pointer-events-auto")}
                    locale={id}
                  />
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <Label className="text-base font-medium">Waktu Konsultasi</Label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Consultation Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Metode Konsultasi
              </CardTitle>
              <CardDescription>Pilih metode konsultasi yang Anda inginkan</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="online" id="online" className="peer sr-only" />
                    <Label
                      htmlFor="online"
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5"
                    >
                      <Video className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Online Meeting</span>
                      <span className="text-sm text-gray-500 text-center mt-1">
                        Konsultasi via video call (Google Meet/Zoom)
                      </span>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem value="offline" id="offline" className="peer sr-only" />
                    <Label
                      htmlFor="offline"
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5"
                    >
                      <MapPin className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Tatap Muka</span>
                      <span className="text-sm text-gray-500 text-center mt-1">
                        Konsultasi langsung di kantor kami
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Consultant Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Konsultan</CardTitle>
              <CardDescription>Pilih konsultan sesuai dengan kebutuhan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedConsultant} onValueChange={setSelectedConsultant}>
                <div className="space-y-4">
                  {consultants.map((consultant) => (
                    <div key={consultant.id} className="relative">
                      <RadioGroupItem value={consultant.id} id={consultant.id} className="peer sr-only" />
                      <Label
                        htmlFor={consultant.id}
                        className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{consultant.name}</h3>
                            <span className="font-semibold text-primary">{consultant.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{consultant.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Pengalaman: {consultant.experience}</span>
                            <span>Rating: ⭐ {consultant.rating}</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Catatan Tambahan</CardTitle>
              <CardDescription>Tuliskan topik atau pertanyaan yang ingin Anda diskusikan</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Contoh: Ingin konsultasi mengenai SPT Tahunan, perhitungan PPh pasal 21, dll."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Ringkasan Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDate && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tanggal:</span>
                    <span className="font-medium">
                      {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: id })}
                    </span>
                  </div>
                </div>
              )}

              {selectedTime && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Waktu:</span>
                    <span className="font-medium">{selectedTime} WIB</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Metode:</span>
                  <span className="font-medium">
                    {consultationType === 'online' ? 'Online Meeting' : 'Tatap Muka'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Konsultan:</div>
                  <div className="font-medium">
                    {consultants.find(c => c.id === selectedConsultant)?.name}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Biaya:</span>
                  <span className="text-primary">
                    {consultants.find(c => c.id === selectedConsultant)?.price}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleBooking}
                className="w-full"
                disabled={!selectedDate || !selectedTime}
              >
                Lanjut ke Pembayaran
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
