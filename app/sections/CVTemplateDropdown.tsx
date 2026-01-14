import { useState, useRef, useEffect } from "react";

export default function CVTemplateDropdown({ selectedCV, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const templates = [
    {
      id: "generic",
      label: "Standard",
      icon: "✍️",
      description: "Clean, professional format for any industry",
    },
    {
      id: "tech",
      label: "Tech",
      icon: "💻",
      description: "Optimized for software & engineering roles",
    },
    {
      id: "finance",
      label: "Finance",
      icon: "💰",
      description: "Tailored for financial services & consulting",
    },
  ];

  const selectedTemplate = templates.find((t) => t.id === selectedCV);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (templateId) => {
    onSelect(templateId);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border-2 border-cyan-400/50 
                   rounded-xl hover:bg-white/10 hover:border-cyan-400 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        <div className="flex items-center gap-3">
          {selectedTemplate ? (
            <>
              <span className="text-2xl">{selectedTemplate.icon}</span>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">
                  {selectedTemplate.label} Template
                </p>
                <p className="text-white/50 text-xs">
                  {selectedTemplate.description}
                </p>
              </div>
            </>
          ) : (
            <div className="text-left">
              <p className="text-white/60 font-medium text-sm">
                Select a CV template
              </p>
              <p className="text-white/40 text-xs">
                Choose the style that fits your industry
              </p>
            </div>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-cyan-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border-2 border-cyan-400/30 
                      rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden"
        >
          {templates.map((template, index) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelect(template.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150
                         hover:bg-cyan-400/10 hover:border-l-4 hover:border-cyan-400
                         ${
                           selectedCV === template.id
                             ? "bg-cyan-400/20 border-l-4 border-cyan-400"
                             : "border-l-4 border-transparent"
                         }
                         ${
                           index !== templates.length - 1
                             ? "border-b border-white/5"
                             : ""
                         }`}
            >
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm flex items-center gap-2">
                  {template.label}
                  {selectedCV === template.id && (
                    <svg
                      className="w-4 h-4 text-cyan-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </p>
                <p className="text-white/60 text-xs">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
