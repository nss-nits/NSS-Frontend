import React from "react";
import { Heart, Users, Droplet, PenTool, School } from "lucide-react";

const impacts = [
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: "Village Surveys",
    description:
      "Conducted surveys to identify real community challenges in rural areas.",
    stat: "10+ villages",
  },
  {
    icon: <PenTool className="w-8 h-8 text-pink-500" />,
    title: "Speaker Sessions",
    description:
      "Hosted awareness talks on social issues, health, and rights.",
    stat: "25+ sessions",
  },
  {
    icon: <Heart className="w-8 h-8 text-green-600" />,
    title: "Awareness Campaigns",
    description:
      "Organized rallies, cyclothons, and drives for social awareness.",
    stat: "30+ campaigns",
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    title: "Active Volunteers",
    description:
      "Strong network of dedicated NSS volunteers driving impact.",
    stat: "200+ volunteers",
  },
  {
    icon: <School className="w-8 h-8 text-cyan-500" />,
    title: "Events & Drives",
    description:
      "Conducted NSS Day, cleanliness drives, and engagement events.",
    stat: "40+ events",
  },
];

const ImpactSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-800 to-blue-900 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          The Impact We Created
        </h2>
        <p className="text-blue-200 max-w-2xl mx-auto mb-12 text-sm md:text-base">
          Real numbers that reflect our commitment to community service and social change.
        </p>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              
              {/* Icon */}
              <div className="bg-gray-100 p-3 rounded-full mb-4">
                {impact.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold">{impact.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {impact.description}
              </p>

              {/* Stat */}
              <p className="text-blue-600 font-bold text-lg mt-4">
                {impact.stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;