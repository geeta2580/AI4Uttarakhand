import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, University, School, Briefcase } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      name: "UCOST",
      fullName: "Uttarakhand State Council for Science & Technology",
      icon: University,
      color: "bg-primary",
      url: "https://ucost.uk.gov.in/",
    },
    {
      name: "Sridev Suman University",
      fullName: "Higher Education Partner",
      icon: GraduationCap,
      color: "bg-secondary",
      url: "https://www.ssou.ac.in/",
    },
    {
      name: "UK Higher Education",
      fullName: "Department of Higher Education",
      icon: School,
      color: "bg-cultural",
      url: "https://he.uk.gov.in/",
    },
    {
      name: "Internshala",
      fullName: "Internship & Job Platform",
      icon: Briefcase,
      color: "bg-accent",
      url: "https://internshala.com/",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🤝 हमारे साझेदार
          </h3>
          <p className="text-xl text-gray-600">
            उत्तराखंड की प्रमुख संस्थाओं के साथ partnership
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow text-center cursor-pointer card-hover"
              onClick={() => window.open(partner.url, '_blank')}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <partner.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
                <p className="text-sm text-gray-600">{partner.fullName}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h4 className="text-2xl font-bold text-center mb-8">Partnership के फायदे</h4>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
              <h5 className="font-semibold mb-2">Academic Excellence</h5>
              <p className="text-sm text-gray-600">Top universities से curriculum और certification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <University className="text-green-600" size={24} />
              </div>
              <h5 className="font-semibold mb-2">Government Support</h5>
              <p className="text-sm text-gray-600">State government की official backing और resources</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-purple-600" size={24} />
              </div>
              <h5 className="font-semibold mb-2">Job Opportunities</h5>
              <p className="text-sm text-gray-600">Direct placement और internship opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
