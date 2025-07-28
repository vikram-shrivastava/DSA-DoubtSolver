import React, { useState, useEffect } from "react";
import { UberSvg, GoogleSvg, NetflixSvg, appleSvg } from "../utlis/svg";
import { useTheme } from "../context/ThemeContext";

const DSAHeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const words = ["Data Structures", "Algorithms", "Problem Solving"];
  const companies = [GoogleSvg, UberSvg, appleSvg, NetflixSvg];


  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentWord.length) {
        setDisplayText(currentWord.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setDisplayText(currentWord.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (!isDeleting && currentCharIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentWordIndex]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white relative overflow-hidden">
      {/* Subtle Grid Pattern */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse ${
              isDarkMode 
                ? i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'
                : i % 2 === 0 ? 'bg-blue-300' : 'bg-indigo-300'
            }`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
              transform: `translate(${Math.sin(mousePosition.x * 0.01 + i) * 20}px, ${Math.cos(mousePosition.y * 0.01 + i) * 20}px)`
            }}
          />
        ))}
      </div>
      <div className={`absolute inset-0 opacity-30 pointer-events-none ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDarkMode
              ? `
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `
              : `
                radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
            backgroundSize: "80px 80px, 40px 40px, 40px 40px",
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(71, 85, 105, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 lg:px-12">
        <div
          className={`max-w-5xl md:max-w-screen mx-auto text-center transition-all duration-1000 my-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
           <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              Master{" "}
              <span className="relative inline-block">
                <span className={`bg-gradient-to-r inline-block ${
                  isDarkMode 
                    ? 'from-blue-400 to-indigo-500' 
                    : 'from-blue-600 to-indigo-600'
                } bg-clip-text text-transparent`}>
                  {displayText}
                </span>
                <span className={`${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>|</span>
              </span>
            </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Accelerate your programming journey with AI-powered personalized
            learning. Get step-by-step explanations, adaptive practice problems,
            and expert insights designed for serious developers and interview
            preparation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-26  from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <button className="group px-8 py-4 bg-slate-900  text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="flex items-center">
                Start Learning
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <button className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto my-16">
            {[
              { number: "15,000+", label: "Students Trained" },
              { number: "800+", label: "Problems Covered" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Availability" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted by Companies */}
      <div className="relative z-10 py-12 bg-white/50 dark:bg-gray-900/60 backdrop-blur-sm border-t border-slate-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
            Trusted by students from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-100">
            {companies.map((Logo, i) => (
              <div
                key={i}
                className="text-slate-600 dark:text-slate-300 font-semibold text-lg"
              >
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer Section */}
      <div className="bg-slate-50 dark:bg-gray-950 border-t border-slate-200 dark:border-gray-800">
        <div className="py-20 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-slate-400 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: isDarkMode
                  ? `
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `
                  : `
      linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
    `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 ">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2
                className="text-3xl cursor-pointer lg:text-5xl font-bold text-gray-700 dark:text-gray-200 mb-6 leading-tight hover:scale-110 transition-all duration-300"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
              >
                Ready to Master DSA?
              </h2>

              <p className="text-lg lg:text-xl text-slate-700 dark:text-slate-300  mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers who have transformed their
                problem-solving skills and advanced their careers with our
                comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="group px-8 py-4 bg-slate-900  text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="flex items-center">
                    Get Started Now
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAHeroSection;
