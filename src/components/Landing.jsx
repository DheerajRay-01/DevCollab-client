// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Login from "./Login";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "GitHub Login",
      desc: "Seamlessly log in with your GitHub account and sync your repositories instantly.",
    },
    {
      title: "Share Projects",
      desc: "Post beautifully styled repository cards with key details and tech stacks.",
    },
    {
      title: "Track Contributions",
      desc: "Engage with other developers by commenting, saving, and exploring trending repos.",
    },
    {
      title: "Built for Collaboration",
      desc: "Start meaningful conversations around real-world projects and ideas.",
    },
    {
      title: "Secure & Scalable",
      desc: "OAuth-powered login with JWT authentication and robust backend security.",
    },
    {
      title: "Guest Mode Access",
      desc: "Explore posts and discussions even without signing in.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-12 flex flex-col items-center text-center">
      
      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold mb-4"
      >
        Welcome to <span className="text-blue-500">DevCollab</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10"
      >
        Your hub for open-source collaboration. Discover real projects, engage in dev-centric discussions, and grow with the global developer community.
      </motion.p>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <Login />
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-16"
      >
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/10 hover:scale-[1.03] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <Login />
      </motion.div>

      {/* Visual Mock/Preview Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full max-w-6xl px-4"
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">Explore Real Projects</h2>
            <p className="text-gray-300 text-base mb-4">
              Dive into an ecosystem of shared repositories. Whether you're looking to contribute, find inspiration, or get your project noticed — DevCollab is your launchpad.
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="mt-2 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Start Exploring →
            </button>
          </div>
          <div className="flex-1">
            <div className="w-full h-60 bg-gray-700 rounded-xl shadow-inner flex items-center justify-center text-gray-400">
              <span className="text-sm">[ Live Feed / Repo Preview Coming Soon ]</span>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Footer CTA */}
      <div className="mt-5 text-gray-400 text-sm">
        © {new Date().getFullYear()} DevCollab. Built with ❤️ for developers, by developers.
      </div>
    </div>
  );
}
