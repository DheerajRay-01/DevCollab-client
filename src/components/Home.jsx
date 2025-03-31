import ProjectCard from "./elements/cards/ProjectCard.jsx";
import dummyData from "./dummyData.js";
import { useSelector } from "react-redux";

function Home() {

  const feed = useSelector((state)=> state.feed.feed)

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10">
          Open Source Projects 🚀
        </h1>

        {/* Grid Layout for Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feed?.map((user, index) => (
            <ProjectCard key={index} card={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;



