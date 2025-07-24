import React, { useState, useEffect } from "react";

const DSAFooterSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("footer-section");
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-slate-200 dark:bg-slate-800 group px-8 py-4">
    <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-slate-500 text-sm mb-4  md:mb-0 mr-2">
        © 2025 DSA Doubt Solver. Built for developers, by developers.
      </div>
      <div className="flex space-x-6 ">
        {[" Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
          <button
            key={link}
            className="text-slate-500 hover:text-slate-700 text-sm transition-colors duration-300"
          >
            {link}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DSAFooterSection;

{
  /* Legal Links */
}
