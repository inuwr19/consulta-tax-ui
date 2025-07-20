/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  FileText,
  ArrowLeft,
  CheckCircle,
  User,
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import axios from "@/lib/axios";

declare global {
  interface Window {
    snap: any;
  }
}

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").catch((err) => {
      console.error("Gagal mengambil CSRF Cookie", err);
    });
  }, []);

  const handleRedirectToPayment = async () => {
    try {
      console.log("Kirim appointment_id:", bookingData);
      const response = await axios.post("/api/payments/create-snap-token", {
        appointment_id: bookingData.appointment_id,
      });

      const snapToken = response.data.snapToken;
      const referenceNumber = response.data.payment.reference_number;

      window.snap.pay(snapToken, {
        onSuccess: async (result: any) => {
          alert("Pembayaran berhasil!");

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "paid",
          });
        },
        onPending: async (result: any) => {
          alert("Menunggu pembayaran.");

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "pending",
          });
        },
        onError: async (result: any) => {
          alert("Pembayaran gagal.");

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "failed",
          });
        },
        onClose: function () {
          alert("Kamu menutup popup tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (error) {
      console.error("Gagal membuat Snap Token", error);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  const getServiceTypeName = () => {
    switch (bookingData.service_type) {
      case "individual-service":
        return "Layanan Individu";
      case "individual-jasa":
        return "Jasa Individu";
      case "company-service":
        return "Layanan Perusahaan";
      default:
        return "Unknown Service";
    }
  };

  const getServicePrice = () => {
    if (!bookingData.consultant) return "Rp 0";

    switch (bookingData.service_type) {
      case "individual-service":
        return `Rp ${bookingData.consultant.price_individual_service.toLocaleString(
          "id-ID"
        )}`;
      case "individual-jasa":
        return `Rp ${bookingData.consultant.price_individual_jasa.toLocaleString(
          "id-ID"
        )}`;
      case "company-service":
        return `Rp ${bookingData.consultant.price_company_service.toLocaleString(
          "id-ID"
        )}`;
      default:
        return "Rp 0";
    }
  };

  if (!bookingData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Data booking tidak ditemukan
        </h1>
        <Button onClick={() => navigate("/booking")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Booking
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/booking")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Detail Pembayaran</h1>
        <p className="text-gray-600 mt-2">
          Silakan lakukan pembayaran sesuai instruksi di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Detail Booking & Data Pribadi
              </CardTitle>
              <CardDescription>
                Informasi lengkap mengenai konsultasi Anda
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 text-sm">
              {/* Jadwal Konsultasi */}
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Jadwal Konsultasi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Tanggal</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {format(bookingData.date, "dd MMMM yyyy", { locale: id })}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Waktu</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {bookingData.time} WIB
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-gray-600">Jenis Layanan</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800 flex items-center gap-2">
                      {bookingData.serviceType === "individual-service" && (
                        <User className="h-4 w-4 text-primary" />
                      )}
                      {bookingData.serviceType === "individual-jasa" && (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                      {bookingData.serviceType === "company-service" && (
                        <Users className="h-4 w-4 text-primary" />
                      )}
                      {getServiceTypeName()}
                    </div>
                  </div>

                  {bookingData.serviceType === "individual-service" &&
                    bookingData.individualServiceType && (
                      <div className="md:col-span-2">
                        <Label className="text-gray-600">Sub-layanan</Label>
                        <div className="p-2 rounded bg-gray-50 border text-gray-800">
                          {bookingData.individualServiceType === "spt-reporting"
                            ? "Pelaporan SPT"
                            : "Perhitungan dan Pelaporan Pajak Penghasilan"}
                        </div>
                      </div>
                    )}

                  <div className="md:col-span-2">
                    <Label className="text-gray-600">Metode Konsultasi</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800 flex items-center gap-2">
                      {bookingData.type === "online" ? (
                        <>
                          <Video className="h-4 w-4 text-primary" />
                          Online Meeting
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 text-primary" />
                          Tatap Muka
                        </>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-gray-600">Konsultan</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {bookingData.consultant?.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Pribadi */}
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Data Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Nama</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {bookingData.nama}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">NIK</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {bookingData.nik}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">NPWP</Label>
                    <div className="p-2 rounded bg-gray-50 border text-gray-800">
                      {bookingData.npwp}
                    </div>
                  </div>
                  {bookingData.efin && (
                    <div>
                      <Label className="text-gray-600">EFIN</Label>
                      <div className="p-2 rounded bg-gray-50 border text-gray-800">
                        {bookingData.efin}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ringkasan Booking */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ringkasan Pesanan */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal</span>
                <span className="font-medium">
                  {format(bookingData.date, "dd MMM yyyy", { locale: id })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu</span>
                <span className="font-medium">{bookingData.time} WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jenis Layanan</span>
                <span className="font-medium">{getServiceTypeName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode</span>
                <span className="font-medium">
                  {bookingData.method === "online" ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3 font-semibold text-base">
                <span>Total Biaya</span>
                <span className="text-primary">{getServicePrice()}</span>
              </div>
              <Button
                onClick={handleRedirectToPayment}
                className="w-full text-white bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Bayar Sekarang
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
