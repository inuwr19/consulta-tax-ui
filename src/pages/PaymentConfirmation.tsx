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
        appointment_id: bookingData.id,
      });

      const snapToken = response.data.snapToken;
      const referenceNumber = response.data.payment.reference_number;

      window.snap.pay(snapToken, {
        onSuccess: async (result: any) => {
          // Success notification
          const successDiv = document.createElement("div");
          successDiv.innerHTML = `
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-2xl">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Pembayaran Berhasil!</h3>
                <p class="text-gray-600 mb-4">Transaksi Anda telah berhasil diproses.</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(successDiv);

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "paid",
          });
        },
        onPending: async (result: any) => {
          // Pending notification
          const pendingDiv = document.createElement("div");
          pendingDiv.innerHTML = `
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-2xl">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Menunggu Pembayaran</h3>
                <p class="text-gray-600 mb-4">Pembayaran Anda sedang diproses.</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(pendingDiv);

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "pending",
          });
        },
        onError: async (result: any) => {
          // Error notification
          const errorDiv = document.createElement("div");
          errorDiv.innerHTML = `
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-2xl">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Pembayaran Gagal</h3>
                <p class="text-gray-600 mb-4">Terjadi kesalahan saat memproses pembayaran.</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(errorDiv);

          await axios.post("/api/payments/update-status", {
            reference_number: referenceNumber,
            status: "failed",
          });
        },
        onClose: function () {
          // Close notification
          const closeDiv = document.createElement("div");
          closeDiv.innerHTML = `
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-2xl">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Pembayaran Dibatalkan</h3>
                <p class="text-gray-600 mb-4">Anda menutup popup tanpa menyelesaikan pembayaran.</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(closeDiv);
        },
      });
    } catch (error) {
      console.error("Gagal membuat Snap Token", error);

      // Error notification for API failure
      const apiErrorDiv = document.createElement("div");
      apiErrorDiv.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-2xl">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h3>
            <p class="text-gray-600 mb-4">Gagal memproses pembayaran. Silakan coba lagi.</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              OK
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(apiErrorDiv);
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
