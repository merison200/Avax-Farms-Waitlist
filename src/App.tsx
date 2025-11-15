import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import { Mail, Facebook, Instagram, Linkedin, ArrowRight, User, Lock, Leaf, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';

const LOGO_URL = "https://res.cloudinary.com/drixel4wv/image/upload/v1763169826/avax_logo_1_tfeqiw.jpg";

const farmImages = [
  {
    images: [
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763169874/Real-time_field_monitoring_UI_UX_for_smart_agriculture_nvkedz.jpg',
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763169875/Aegro_jauqpx.jpg'
    ],
    labels: ['Marketplace', 'Farm-to-Consumer'],
    title: 'Agro Marketplace',
    description: 'A digital e-commerce marketplace that connects farmers directly to consumers, offering affordable, fresh, and high-quality produce through a secure and seamless online shopping experience.'
  },
  {
    images: [
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763170454/March%C3%A9s_et_production_du_cacao_ianepk.jpg',
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763170454/Chocoladefabrikant_Barry_Callebaut_worstelt_met_hoge_cacaoprijs_ckbi6h.jpg'
    ],
    labels: ['Swift Delivery', 'Cold-Chain Logistics'],
    title: 'Agro Logistics Services',
    description: 'Reliable farm-to-consumer logistics ensuring timely, safe, and efficient delivery of fresh produce through a modern, technology-driven distribution network.'
  },
  {
    images: [
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763170713/Ilustration_finanzas_saludables_economia_verde_concepto_ahorro___Premium_AI-generated_image_hdg05p.jpg',
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763170713/Nachhaltiger_Bankenvergleich__Welche_ist_die_beste_Bank__94_ouodd0.jpg'
    ],
    labels: ['Agro Investment', 'Grow With Us'],
    title: 'Agro Investment Opportunities',
    description: 'A secure investment platform that enables individuals to fund agricultural projects, earn competitive returns, and support farmers through sustainable farm expansion.'
  },
  {
    images: [
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763171494/Spring_Field_Trips_gkw5ji.jpg',
      'https://res.cloudinary.com/drixel4wv/image/upload/v1763171089/African_youth_are_pivotal_in_transforming_our_food_systems__By_empowering_farmers_with_innovative_knowledge_and_turning_agriculture_into_a_business-oriente_lmgpwh.jpg'
    ],
    labels: ['Farm Experience', 'Eco-Adventure'],
    title: 'Agro Tourism Experiences',
    description: 'Immersive farm-based tourism offering visitors hands-on agricultural activities, learning opportunities, and recreational adventures that connect people to nature and modern farming.'
  }
];

// New: Waitlist Form as its own component
const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/register-waitlist`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            userAgent: navigator.userAgent,
          }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        // 200 – success
        setStatus('success');
        setMessage(data.message ?? 'You have been added to the waitlist successfully!');
        setEmail('');
        setName('');
      } else if (response.status === 409) {
        // 409 – already exists
        setStatus('error');
        setMessage(data.error ?? 'You’re already on the waitlist');
      } else {
        // 400 / 500 / any other error
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const shareMessage = encodeURIComponent('Join Avax Farms! Revolutionizing agriculture through blockchain technology.');
  const shareUrl = encodeURIComponent(window.location.href);

  const socialShareLinks = [
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareMessage}` },
    { name: 'X', icon: FaXTwitter, url: `https://twitter.com/intent/tweet?text=${shareMessage}&url=${shareUrl}` },
    { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/' },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-gray-800 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-3 text-center">
        Join The Waitlist
      </h3>
      <p className="text-gray-400 text-center mb-8">
        Be the first to experience decentralized agriculture
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? 'Joining...' : 'Join Now'}
          <ArrowRight className="w-5 h-5" />
        </button>

        {message && (
          <div className={`p-4 rounded-xl border ${
            status === 'success'
              ? 'bg-green-500/10 text-green-400 border-green-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
        <Lock className="w-4 h-4" />
        <span>All emails are secured and protected</span>
      </div>

      <div className="text-center">
        <p className="text-gray-400 mb-3">Share with your network</p>
        <div className="flex justify-center items-center gap-3">
          {socialShareLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => handleSocialClick(social.url)}
              className="p-3 bg-black/50 border border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all duration-200"
              title={`Share on ${social.name}`}
            >
              <social.icon className="w-4 h-4 text-gray-400 hover:text-green-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const companySocialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/avaxfarms' },
    { name: 'X', icon: FaXTwitter, url: 'https://x.com/TheAvaxFarms' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/avaxfarms' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/avaxfarms' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@avaxfarms' },
  ];

  const ImageCard = ({ images, labels, title, description }: { 
    images: string[]; 
    labels: string[];
    title: string;
    description: string;
  }) => {
    const [localCurrentIndex, setLocalCurrentIndex] = useState(0);
    
    return (
      <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative h-[500px] overflow-hidden group">
          <img
            src={images[localCurrentIndex]}
            alt={labels[localCurrentIndex]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLocalCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                }}
                className="ml-4 p-3 bg-black/70 hover:bg-black/90 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLocalCurrentIndex(prev => (prev + 1) % images.length);
                }}
                className="mr-4 p-3 bg-black/70 hover:bg-black/90 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setLocalCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === localCurrentIndex ? 'bg-green-500 scale-125' : 'bg-white/70 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
            {labels[localCurrentIndex]}
          </div>

          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold z-10">
            {localCurrentIndex + 1}/{images.length}
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
              <p className="text-xs text-gray-400">{description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <Leaf className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="flex-1 px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-32 overflow-hidden rounded-3xl mb-16">
        <div className="absolute inset-0">
          <picture>
            {/* Mobile version - cropped to hide edges */}
            <source 
              media="(max-width: 768px)" 
              srcSet="https://res.cloudinary.com/drixel4wv/image/upload/c_fill,w_768,h_600,g_center,q_auto,f_auto/v1763169826/avax_logo_1_tfeqiw.jpg" 
            />
            {/* Tablet version */}
            <source 
              media="(max-width: 1024px)" 
              srcSet="https://res.cloudinary.com/drixel4wv/image/upload/c_fill,w_1024,h_600,g_center,q_auto,f_auto/v1763169826/avax_logo_1_tfeqiw.jpg" 
            />
            {/* Desktop version - padded with full view */}
            <img 
              src="https://res.cloudinary.com/drixel4wv/image/upload/c_pad,w_1920,h_600,b_rgb:1a4d2e,q_auto,f_auto/v1763169826/avax_logo_1_tfeqiw.jpg" 
              alt="Avax Farms" 
              className="w-full h-full object-cover opacity-40"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Farm Showcase Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Our Ecosystem</h2>
            <p className="text-xl text-gray-300">Transforming agriculture through blockchain innovation</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmImages.map((farm, index) => (
              <ImageCard
                key={index}
                images={farm.images}
                labels={farm.labels}
                title={farm.title}
                description={farm.description}
              />
            ))}
          </div>
        </section>

        {/* Waitlist Section - Now uses WaitlistForm */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <WaitlistForm />
          </div>
        </section>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="flex-1 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-6xl font-black text-green-500 tracking-tight mb-4">
            ABOUT US
          </h1>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300 font-light max-w-xl mx-auto">
            Revolutionizing Agriculture Through Blockchain Technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div className="bg-gray-800 border border-green-500/30 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-green-500 mb-6">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Avax Farms is building the future of sustainable agriculture through blockchain technology. 
              We're creating a transparent, efficient ecosystem that connects farmers directly with consumers 
              while ensuring fair compensation and sustainable practices.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our platform leverages the power of Avalanche blockchain to create an immutable, transparent 
              record of every product's journey from farm to table, ensuring authenticity and building trust 
              in the global food supply chain.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-green-500/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Why Blockchain in Agriculture?</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "Transparent supply chain tracking",
                "Fair compensation for farmers",
                "Reduced food fraud and contamination",
                "Sustainable farming incentives",
                "Real-time quality verification",
                "Direct consumer connections"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-500 text-center mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Transparent Supply Chain",
                description: "Track your food from farm to table with blockchain verification. Every step is recorded immutably.",
              },
              {
                icon: Users,
                title: "Direct Farmer Access",
                description: "Connect directly with farmers through our decentralized marketplace. Eliminate middlemen.",
              },
              {
                icon: Leaf,
                title: "Sustainable Practices",
                description: "Support eco-friendly farming with transparent sustainability metrics and rewards.",
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 border border-green-500/20 rounded-3xl p-6 hover:border-green-500/40 transition-all duration-300 shadow-xl">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-green-500/30 rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-2xl font-bold text-green-500 mb-4">Built on Avalanche</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Leveraging the speed, security, and scalability of the Avalanche network to create 
            a seamless agricultural ecosystem that benefits all participants.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />

      <nav className="relative z-20 pt-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <img 
              src={LOGO_URL} 
              alt="Avax Farms Logo" 
              className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-green-500"
            />
            <span className="text-green-500 font-bold text-base md:text-lg">AVAX FARMS</span>
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-200 ${
                currentPage === 'home' 
                  ? 'bg-green-500 text-black' 
                  : 'text-green-400 hover:text-green-300 border border-green-500/20 hover:border-green-500'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-200 ${
                currentPage === 'about' 
                  ? 'bg-green-500 text-black' 
                  : 'text-green-400 hover:text-green-300 border border-green-500/20 hover:border-green-500'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 min-h-screen flex flex-col">
        {currentPage === 'home' ? <HomePage /> : <AboutPage />}

        <footer className="border-t border-green-500/20 bg-black/40 backdrop-blur-sm py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <div className="flex justify-center items-center gap-3 mb-3">
                {companySocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 border border-green-500/20 rounded-lg hover:border-green-500 transition-all duration-200"
                    title={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4 text-gray-400 hover:text-green-500" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-gray-500 text-sm mb-1">
                © {currentYear} Avax Farms. All rights reserved.
              </div>
              <div className="text-gray-600 text-xs">
                Built on Avalanche | fresh from the farm
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;