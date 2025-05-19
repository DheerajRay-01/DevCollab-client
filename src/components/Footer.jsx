export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-gray-300 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        {/* Left Side - Logo & Copyright */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-indigo-400">DevCollab</span>
        </div>

        <p className="mt-3 md:mt-0 text-sm">
          © {new Date().getFullYear()} DevCollab. All rights reserved.
        </p>

        {/* Right Side - Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 mt-3 md:mt-0">
          {["Privacy-Policy", "Terms of Service", "Contact"].map((item, index) => (
            <li key={index}>
              <a 
                href={`/${item}`} 
                className="hover:text-white transition duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
