import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
  onAction?: (action: string, appointment: Appointment) => void;
}

const AppointmentCard = ({ appointment, onAction }: AppointmentCardProps) => {
  console.log("Appointment data:", appointment);
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Dibatalkan
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getConsultantName = () => {
    if (typeof appointment.consultant === "string")
      return appointment.consultant;
    if (
      typeof appointment.consultant === "object" &&
      appointment.consultant !== null
    )
      return (appointment.consultant as { name: string }).name;
    return "-";
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            Konsultasi Pajak
          </CardTitle>
          {getStatusBadge(appointment.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {appointment.method === "online" ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            <span>
              {appointment.method === "online" ? "Online Meeting" : "Tatap Muka"}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Konsultan: </span>
            {getConsultantName()}
          </div>
        </div>

        {appointment.notes && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{appointment.notes}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {appointment.status === "confirmed" &&
            appointment.paymentStatus === "paid" &&
            appointment.gmeet_link && (
              <Button
                size="sm"
                onClick={() => window.open(appointment.gmeet_link, "_blank")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Video className="w-4 h-4 mr-1" />
                Join Meeting
              </Button>
            )}

          {appointment.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction?.("reschedule", appointment)}
            >
              Reschedule
            </Button>
          )}

          {appointment.status === "pending" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onAction?.("cancel", appointment)}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
