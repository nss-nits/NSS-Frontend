import Heading from "../../components/shared/Heading/Heading";
import SectionTeam from "./Team-comp/Info-section/Section";
import data from "../../db/team";
import focus from "../../db/team-focus";
import TeamCard from "./Team-comp/Card/TeamCard";
import Header from "../../components/shared/Title-page/Header";

const Team = () => {
  // Group core team data by team name
  const groupedTeamData = data.reduce((acc, item) => {
    const team = item.team;
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(item);
    return acc;
  }, {});

  const teamOrder = [
    "Girls Representative",
    "Vice President",
    "General Secretary", 
    "Treasurer",
    "Resource Control",
    "Reaserch & Development",
    "Design Team",
    "Content Team",
    "PR & Media team",
    "Web Team",
    "Video Editing Team",
    "Event Management Team",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header
        title="Team"
        backgroundImage={
          "https://res.cloudinary.com/dmsr8ttrz/image/upload/v1742139228/sbfsfsduefxli9crislu.webp"
        }
      />
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Our Team Section */}
        <div className="mb-12 lg:mb-16">
          <Heading title="Our Team" />
          
          {/* Focus Team Members */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {focus.map((item) => (
              <SectionTeam
                key={item.id}
                designation={item.designation}
                name={item.name}
                imageUrl={item.imageUrl}
                facebook={item.facebook}
                instagram={item.instagram}
                linkedin={item.linkedin}
                info={item.info}
              />
            ))}
          </div>
        </div>

        {/* Core Team Section */}
        <div className="space-y-12 lg:space-y-16">
          <Heading title="Core Team" />
          
          {/* Team Groups */}
          {teamOrder.map((teamName) => {
            const teamMembers = groupedTeamData[teamName];
            
            if (!teamMembers || teamMembers.length === 0) return null;
            
            return (
              <section key={teamName} className="space-y-8 lg:space-y-12">
                {/* Centered Team Heading */}
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                    {teamName}
                  </h2>
                  {/* Optional decorative line */}
                  <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>
                

                <div className="flex justify-center">
                  <div className={`
                    grid gap-4 sm:gap-6 lg:gap-8
                    ${teamMembers.length === 1 ? 
                      'grid-cols-1 max-w-xs' : 
                    teamMembers.length === 2 ? 
                      'grid-cols-1 sm:grid-cols-2 max-w-2xl' : 
                    teamMembers.length === 3 ? 
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl' : 
                    teamMembers.length >= 4 ? 
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl' : 
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl'
                    }
                  `}>
                    {teamMembers.map((item) => (
                      <div key={item.id} className="flex justify-center">
                        <TeamCard
                          designation={item.designation}
                          name={item.name}
                          imageUrl={item.imageUrl}
                          facebook={item.facebook}
                          instagram={item.instagram}
                          linkedin={item.linkedin}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;