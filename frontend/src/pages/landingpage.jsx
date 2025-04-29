import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Bodypic from "../assets/bodypic.png";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToJourney = () => {
    const section = document.getElementById("journey-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md bg-white" : "bg-white"} border-b border-gray-200 bg-white `}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-2">
                  <img src={Logo} alt="HabitQuest Logo" />
                </div>
            <span className="text-purple-600 font-bold text-xl">HabitQuest</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="text-purple-600 font-medium px-4 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow">
                Login
              </button>
            </Link>
            <Link to="/signup">
            <button
              className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-2xl"
            >
              Get Started
            </button>
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col items-start space-y-2 bg-white shadow">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-purple-600 font-medium">Login</button>
            </Link>
            <Link to="/signup" onClick={() => {
                setMobileMenuOpen(false);
              }}>
            <button
              
              className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium shadow"
            >
              Get Started
            </button>
            </Link>
          </div>
        )}
      </header>

      {/* Padding for sticky header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Transform Your Habits Into an Epic Quest
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Level up your life with our gamified habit tracking system. Build streaks, earn rewards, and achieve your goals!
          </p>

          <div className="mb-8">
            <button
              onClick={scrollToJourney}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-2xl transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-[0_12px_50px_rgba(0,0,0,0.3)]"
            >
              Begin Your Journey
            </button>
          </div>

          {/* Hero Image */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-95 hover:shadow-inner">
            <img
              src={Bodypic}
              alt="Two adventurers at a magical cave"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="journey-section" className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-12">Epic Features for Your Quest</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { icon: "🔥", title: "Streak Tracking", desc: "Build powerful daily streaks and level up as you habit.", color: "orange" },
              { icon: "📈", title: "Progress Visualization", desc: "Watch your journey unfold with beautiful progress charts.", color: "red" },
              { icon: "⏰", title: "Smart Reminders", desc: "Never miss a quest with intelligent notifications.", color: "blue" },
              { icon: "🏆", title: "Social Challenges", desc: "Compete with friends and earn the leaderboards.", color: "yellow" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`text-${feature.color}-500 text-2xl mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Fellow Adventurers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah K.",
                role: "Fitness Enthusiast",
                quote: "HabitQuest turned my workout routine into an exciting adventure! I'm on a 90-day streak!"
              },
              {
                name: "Mike R.",
                role: "Student",
                quote: "The streak system keeps me motivated like never before!"
              },
              {
                name: "Lisa M.",
                role: "Professional",
                quote: "I've found a habit tracker that makes consistency fun!"
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t">
          <p>© {currentYear} HabitQuest. Start your adventure today!</p>
        </footer>
      </div>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default LandingPage;