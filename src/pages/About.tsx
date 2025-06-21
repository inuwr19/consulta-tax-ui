
import { Users, Award, Clock, Shield, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Tim Ahli Berpengalaman',
      description: 'Konsultan pajak bersertifikat dengan pengalaman lebih dari 5 tahun'
    },
    {
      icon: Clock,
      title: 'Layanan 24/7',
      description: 'Support dan konsultasi tersedia kapan saja sesuai kebutuhan Anda'
    },
    {
      icon: Shield,
      title: 'Keamanan Data Terjamin',
      description: 'Informasi pribadi dan keuangan Anda aman dengan enkripsi tingkat tinggi'
    },
    {
      icon: Award,
      title: 'Terakreditasi Resmi',
      description: 'Terdaftar dan diakui oleh Direktorat Jenderal Pajak Indonesia'
    }
  ];

  const team = [
    {
      name: 'Budi Santoso, S.E., M.Ak',
      position: 'Senior Tax Consultant',
      specialty: 'Pajak Penghasilan & PPh Badan',
      experience: '8 tahun',
      image: '/placeholder-avatar.jpg'
    },
    {
      name: 'Sari Dewi, S.E., M.Si',
      position: 'Tax Consultant',
      specialty: 'PPN & Pajak Perdagangan',
      experience: '6 tahun',
      image: '/placeholder-avatar.jpg'
    },
    {
      name: 'Ahmad Rahman, S.E.',
      position: 'Tax Consultant',
      specialty: 'BPHTB & Pajak Daerah',
      experience: '5 tahun',
      image: '/placeholder-avatar.jpg'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Klien Puas' },
    { number: '1000+', label: 'Konsultasi Selesai' },
    { number: '4.9/5', label: 'Rating Kepuasan' },
    { number: '5+', label: 'Tahun Pengalaman' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-primary">ConsultaTax</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami adalah platform konsultasi pajak terpercaya yang membantu individu dan bisnis 
              mengelola kewajiban perpajakan dengan mudah, aman, dan sesuai regulasi.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Misi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Memberikan layanan konsultasi pajak yang berkualitas tinggi, mudah diakses, 
                  dan terjangkau untuk semua kalangan. Kami berkomitmen membantu klien memahami 
                  dan memenuhi kewajiban perpajakan dengan benar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-secondary">Visi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform konsultasi pajak terdepan di Indonesia yang mengintegrasikan 
                  teknologi modern dengan keahlian profesional untuk menciptakan pengalaman 
                  konsultasi yang efisien dan efektif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan layanan konsultasi pajak yang komprehensif dengan standar 
              profesional tertinggi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pencapaian Kami</h2>
            <p className="text-gray-600">Kepercayaan klien adalah kebanggaan kami</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Konsultan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan para ahli pajak berpengalaman yang siap membantu menyelesaikan 
              kebutuhan perpajakan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.position}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{member.specialty}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Pengalaman {member.experience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Berkonsultasi?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Jadwalkan konsultasi dengan ahli pajak kami sekarang juga
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/booking">Buat Janji Konsultasi</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/register">Daftar Gratis</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
