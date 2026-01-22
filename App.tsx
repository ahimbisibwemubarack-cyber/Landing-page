
import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  FlaskConical, 
  Users, 
  BarChart3, 
  Globe, 
  Droplets, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  TrendingUp,
  PieChart,
  Target,
  Quote,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, TEAM, TESTIMONIALS } from './constants';
import { LeadForm } from './types';
import ChatBot from './ChatBot';

// Reveal Wrapper for Scroll Animations
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Number Counter for Progress Bars
const Counter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          let start = 0;
          const end = value;
          const totalFrames = Math.min(60, duration / 16);
          const increment = end / totalFrames;
          
          let currentFrame = 0;
          const timer = setInterval(() => {
            currentFrame++;
            start += increment;
            if (currentFrame >= totalFrames) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          setHasRun(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasRun]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// Helper Components
const SectionHeading: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <Reveal className="text-center max-w-3xl mx-auto mb-16">
    <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {subtitle && <p className={`text-lg md:text-xl ${light ? 'text-slate-200' : 'text-slate-600'}`}>{subtitle}</p>}
  </Reveal>
);

const AnimatedProgressBar: React.FC<{ label: string; value: number; target: number; suffix?: string; color: string; delay?: number }> = ({ label, value, target, suffix = "", color, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth((value / target) * 100);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, target, delay]);

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-2xl font-black text-white">
          <Counter value={value} />{suffix}
        </span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
        <div 
          className={`h-full ${color} transition-all duration-[1500ms] ease-out rounded-full relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-white/20 shimmer"></div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<LeadForm>({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadForm, string>> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Valid email is required';
    if (!formState.interest) newErrors.interest = 'Interest is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', interest: '', message: '' });
        setErrors({});
      }, 5000);
    }
  };

  const handleInputChange = (field: keyof LeadForm, value: string) => {
    setFormState({ ...formState, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <div className="min-h-screen selection:bg-aviyo-gold selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-aviyo-green rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <Leaf className="text-white" size={24} />
            </div>
            <span className={`text-xl font-black tracking-tighter ${scrolled ? 'text-slate-900' : 'text-white md:text-white text-slate-900'}`}>AVİYO</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Products', 'Innovation', 'Finances', 'Impact', 'Team'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-bold uppercase tracking-widest hover:text-aviyo-gold transition-colors ${scrolled ? 'text-slate-600' : 'text-white'}`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-aviyo-green text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-aviyo-green/40 transition-all transform hover:-translate-y-1"
            >
              Partner
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl p-8 flex flex-col gap-6 border-t animate-in fade-in slide-in-from-top duration-300">
            {['Products', 'Innovation', 'Finances', 'Impact', 'Team'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xl font-black text-slate-900 border-b border-slate-100 pb-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-aviyo-green text-white py-4 rounded-2xl text-center font-black uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover" 
            alt="Nature backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-10">
            <Reveal delay={100} className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-aviyo-gold font-black text-sm uppercase tracking-widest">
              <FlaskConical size={16} className="animate-pulse" />
              <span>Future of Nutrition</span>
            </Reveal>
            <Reveal delay={300}>
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
                Bio-Power <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-aviyo-gold to-yellow-200">Plants.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-xl leading-relaxed font-medium">
                We are leveraging advanced enzyme technology to craft sustainable, lactose-free nutrition for Africa's growing communities.
              </p>
            </Reveal>
            <Reveal delay={500} className="flex flex-col sm:flex-row gap-5 pt-4">
              <a href="#products" className="bg-aviyo-gold hover:bg-yellow-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl shadow-aviyo-gold/30 transform hover:-translate-y-1 active:scale-95 group">
                Discover
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#finances" className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                Our Impact
              </a>
            </Reveal>
          </div>

          <Reveal delay={700} className="hidden lg:block relative">
            <div className="absolute -inset-10 bg-aviyo-green/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="animate-float">
              <img 
                src="https://images.unsplash.com/photo-1550583724-1255814228b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
                className="relative rounded-[3rem] shadow-2xl border-8 border-white/10 grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Aviyo Product Concept"
              />
              <div className="absolute -bottom-12 -left-12 bg-white p-8 rounded-3xl shadow-3xl border border-slate-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Aseptic Tech</p>
                    <p className="text-2xl font-black text-slate-900">12 Months</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem & Solution Cards */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Users className="text-aviyo-green" size={36} />, 
                title: "Health Equity", 
                text: "Addressing lactose intolerance and hypertension for underserved populations with affordable alternatives." 
              },
              { 
                icon: <FlaskConical className="text-aviyo-green" size={36} />, 
                title: "Zero Waste", 
                text: "Utilizing bi-products for animal feed and fertilizer, creating a truly circular agricultural economy." 
              },
              { 
                icon: <Globe className="text-aviyo-green" size={36} />, 
                title: "Sustainable Sourcing", 
                text: "Empowering 100,000+ Ugandan farmers through fair-trade contracts and renewable production hubs." 
              }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 200} className="group bg-slate-50 p-12 rounded-[2.5rem] hover:bg-aviyo-green transition-all duration-500 border border-slate-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-5 group-hover:text-white transition-colors uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-200 transition-colors font-medium">{feature.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section with Staggered Entrance */}
      <section id="products" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Engineered for Wellness" 
            subtitle="Explore our range of enzyme-enhanced formulations tailored for the East African lifestyle."
          />
          <div className="grid lg:grid-cols-3 gap-10">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.id} delay={i * 200} className="group bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-4">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2" 
                    alt={product.name} 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                  <div className="absolute top-6 right-6 bg-aviyo-gold text-slate-950 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                    High Protein
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-black mb-4 group-hover:text-aviyo-green transition-colors tracking-tight">{product.name}</h3>
                  <p className="text-slate-600 mb-8 flex-grow leading-relaxed font-medium">{product.description}</p>
                  <div className="space-y-4 mb-10">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-bold uppercase tracking-wider">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-aviyo-green group-hover:text-white transition-colors">
                          <ChevronRight size={14} />
                        </div>
                        {feat}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Innovation Edge</p>
                    <p className="text-sm font-bold text-aviyo-green group-hover:translate-x-1 transition-transform">{product.edge}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation/Science Section */}
      <section id="innovation" className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 flex items-center justify-center pointer-events-none animate-pulse-soft">
          <FlaskConical size={600} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <Reveal>
                <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-aviyo-gold font-black text-xs uppercase tracking-widest">
                  Molecular Mastery
                </div>
                <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter mt-6">
                  Perfecting Taste through <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-aviyo-gold to-yellow-200">Biotechnology.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-xl text-slate-400 leading-relaxed font-medium">
                  We don't just blend ingredients; we redesign them. Our proprietary enzymatic process removes anti-nutrients and optimizes protein absorption for human health.
                </p>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Hydrolysis", text: "Breaking down complex starches into natural energy.", icon: <Zap size={20}/> },
                  { title: "Bioavailability", text: "Enhancing the absorption of vital Ugandan minerals.", icon: <ShieldCheck size={20}/> },
                  { title: "Aseptic Life", text: "12 months of safety without refrigeration.", icon: <Target size={20}/> },
                  { title: "Enzyme Precision", text: "Targeted proteases eliminate allergenic soy proteins.", icon: <FlaskConical size={20}/> }
                ].map((item, i) => (
                  <Reveal key={i} delay={300 + (i * 100)} className="p-8 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="text-aviyo-gold mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="text-white font-black text-xl mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            
            <Reveal delay={500} className="relative">
              <div className="absolute -inset-10 bg-aviyo-gold/10 blur-[100px] rounded-full"></div>
              <div className="bg-white text-slate-950 rounded-[3rem] p-10 md:p-16 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-aviyo-gold transition-colors duration-500"></div>
                <h3 className="text-3xl font-black mb-12 tracking-tighter uppercase">The Aviyo Benchmark</h3>
                <div className="space-y-8">
                  {[
                    { label: "Stability", aviyo: "6-12 Months", market: "2 Weeks" },
                    { label: "Sugar Content", aviyo: "0% Added", market: "8-12%" },
                    { label: "Digestibility", aviyo: "98% Optimized", market: "62% Avg" },
                    { label: "Farmer ROI", aviyo: "4x Increase", market: "Standard" }
                  ].map((row, i) => (
                    <div key={i} className="group/row">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{row.label}</p>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-green-50 p-6 rounded-2xl border border-green-100 group-hover/row:bg-aviyo-green group-hover/row:text-white transition-all">
                          <p className="text-[10px] font-black text-green-700 uppercase mb-1 group-hover/row:text-green-200">Aviyo</p>
                          <p className="text-lg font-black">{row.aviyo}</p>
                        </div>
                        <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Trad.</p>
                          <p className="text-lg font-bold text-slate-500">{row.market}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Financial Plan Section with Animated Numbers */}
      <section id="finances" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-start">
              <div className="flex-1 space-y-10">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-slate-100 rounded-lg text-slate-600 font-black text-xs uppercase tracking-widest mb-6">
                    <TrendingUp size={14} />
                    <span>Economic Growth</span>
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                    Scaling with <br/><span className="text-aviyo-green underline decoration-aviyo-gold underline-offset-8">Purpose & Profit.</span>
                  </h2>
                </Reveal>
                
                <Reveal delay={200}>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    Our model leverages Uganda's agricultural abundance. By localizing production and removing cold-chain costs, we achieve profitability while maintaining radical affordability.
                  </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-8">
                  <Reveal delay={300} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all">
                    <PieChart className="text-aviyo-green mb-6" size={32} />
                    <h4 className="text-4xl font-black text-slate-900 mb-2">
                      <Counter value={72} />M
                    </h4>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Startup Capital (UGX)</p>
                  </Reveal>
                  <Reveal delay={400} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all">
                    <Target className="text-aviyo-gold mb-6" size={32} />
                    <h4 className="text-4xl font-black text-slate-900 mb-2">Month 4</h4>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Operational Break-even</p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={500} className="flex-1 w-full bg-slate-950 text-white rounded-[4rem] p-10 md:p-16 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-aviyo-gold to-yellow-200"></div>
                <h3 className="text-3xl font-black mb-12 flex items-center gap-4 tracking-tighter">
                  <BarChart3 className="text-aviyo-gold" />
                  Growth Projections
                </h3>
                
                <div className="space-y-12">
                  <AnimatedProgressBar 
                    label="Year 1 Revenue Goal (UGX)" 
                    value={525} 
                    target={735} 
                    suffix="M" 
                    color="bg-aviyo-gold" 
                    delay={200}
                  />
                  <AnimatedProgressBar 
                    label="Year 3 Target Reach" 
                    value={100000} 
                    target={100000} 
                    suffix=" Consumers" 
                    color="bg-blue-500" 
                    delay={400}
                  />
                  <AnimatedProgressBar 
                    label="Renewable Production Capacity" 
                    value={85} 
                    target={100} 
                    suffix="%" 
                    color="bg-aviyo-green" 
                    delay={600}
                  />
                  <AnimatedProgressBar 
                    label="Farmer Partnership Scale" 
                    value={2500} 
                    target={5000} 
                    suffix=" Out-growers" 
                    color="bg-purple-500" 
                    delay={800}
                  />
                </div>
                
                <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 italic">
                  <p className="text-sm text-slate-400 font-medium">
                    "Aviyo's fiscal model is designed for 4x scaling across the East African regional market by 2027."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Sustainably Rooted" 
            subtitle="Aligning with Uganda Vision 2040 and the UN Sustainable Development Goals."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Leaf className="text-green-600" />, title: "Climate Action", text: "Low-carbon food systems powered by bio-renewable energy.", color: "bg-green-100/50" },
              { icon: <Droplets className="text-blue-600" />, title: "Zero Hunger", text: "Nutritional fortification programs for schools and hospitals.", color: "bg-blue-100/50" },
              { icon: <Zap className="text-yellow-600" />, title: "Industrialization", text: "Creating high-value Agro-processing hubs in rural Uganda.", color: "bg-yellow-100/50" },
              { icon: <Users className="text-purple-600" />, title: "Job Creation", text: "Generating 5,000+ indirect jobs in the value chain by Year 3.", color: "bg-purple-100/50" }
            ].map((impact, i) => (
              <Reveal key={i} delay={i * 150} className={`p-10 rounded-[2.5rem] ${impact.color} border-2 border-white flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all group`}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {impact.icon}
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{impact.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{impact.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Voices from the Field" 
            subtitle="Real impact across communities, from the clinic to the smallholder farm."
          />
          <div className="grid lg:grid-cols-3 gap-10">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 200} className="relative bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="absolute top-10 right-10 text-slate-200 group-hover:text-aviyo-gold transition-colors">
                  <Quote size={64} fill="currentColor" />
                </div>
                <div className="flex-grow">
                  <p className="text-xl text-slate-800 italic leading-relaxed mb-10 relative z-10 font-medium">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-5 pt-8 border-t border-slate-200">
                  <div className="relative">
                    <div className="absolute inset-0 bg-aviyo-gold rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    <img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-2xl border-2 border-white shadow-md relative z-10" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">{testimonial.author}</h4>
                    <p className="text-xs font-black text-aviyo-green uppercase tracking-widest">{testimonial.role}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">{testimonial.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Our Visionary Team" 
            subtitle="Fusing expertise in biotechnology, full-stack tech, and community health."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 100} className="text-center group">
                <div className="relative mb-6 mx-auto w-40 h-40">
                  <div className="absolute inset-0 bg-gradient-to-br from-aviyo-green to-aviyo-gold rounded-[2.5rem] opacity-0 group-hover:opacity-100 rotate-0 group-hover:rotate-12 transition-all duration-500 blur-xl"></div>
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3">
                    <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-aviyo-green transition-colors">{member.name}</h4>
                <p className="text-xs font-black text-aviyo-green uppercase tracking-[0.2em] mt-2">{member.role}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">{member.specialty}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="max-w-6xl mx-auto bg-slate-950 rounded-[4rem] overflow-hidden shadow-3xl flex flex-col lg:grid lg:grid-cols-2">
            <div className="p-12 md:p-20 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-aviyo-green/20 blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter leading-none">Let's Fuel <br/><span className="text-aviyo-gold">The Change.</span></h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
                  We are looking for partners who share our passion for bio-innovation and social impact. Join our early adopter network.
                </p>
                <div className="space-y-6">
                  {[
                    "Join our distribution network across Kampala",
                    "Invest in our 3-year regional expansion plan",
                    "Partner as a raw material supplier",
                    "Pilot our nutrition programs in your institution"
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-default">
                      <div className="w-8 h-8 bg-white/10 text-aviyo-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-aviyo-gold group-hover:text-slate-950 transition-colors">
                        <ShieldCheck size={18} />
                      </div>
                      <span className="text-slate-300 font-bold text-sm uppercase tracking-wider group-hover:text-white transition-colors">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-20 pt-12 border-t border-white/10 flex gap-12 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">HQ Location</span>
                  <span className="text-lg font-black tracking-tight">Kampala, Uganda</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Structure</span>
                  <span className="text-lg font-black tracking-tight">Social Enterprise</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 md:p-20 relative">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-50 text-aviyo-green rounded-3xl flex items-center justify-center mb-8 shadow-xl animate-bounce-slow">
                    <ShieldCheck size={48} />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase">Success!</h3>
                  <p className="text-xl text-slate-600 font-medium">Your inquiry has been logged into our innovation pipeline.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-12 text-aviyo-green font-black uppercase tracking-widest text-sm hover:underline hover:translate-y-1 transition-transform">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Identity</label>
                      <input 
                        type="text" 
                        className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-4 transition-all outline-none font-bold ${
                          errors.name ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:ring-aviyo-green/10 focus:border-aviyo-green'
                        }`}
                        placeholder="Full Name"
                        value={formState.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      {errors.name && <div className="flex items-center gap-1 text-red-500 text-[10px] font-black uppercase tracking-widest ml-2 animate-pulse"><AlertCircle size={10} /> {errors.name}</div>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Digital Contact</label>
                      <input 
                        type="email" 
                        className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-4 transition-all outline-none font-bold ${
                          errors.email ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:ring-aviyo-green/10 focus:border-aviyo-green'
                        }`}
                        placeholder="email@example.com"
                        value={formState.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && <div className="flex items-center gap-1 text-red-500 text-[10px] font-black uppercase tracking-widest ml-2 animate-pulse"><AlertCircle size={10} /> {errors.email}</div>}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interest Area</label>
                    <div className="relative">
                      <select 
                        className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-4 transition-all outline-none appearance-none font-black uppercase tracking-widest text-sm ${
                          errors.interest ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:ring-aviyo-green/10 focus:border-aviyo-green'
                        }`}
                        value={formState.interest}
                        onChange={(e) => handleInputChange('interest', e.target.value as any)}
                      >
                        <option value="">Choose category</option>
                        <option value="Consumer">Consumer</option>
                        <option value="Distributor">Retailer</option>
                        <option value="Investor">Seed Partner</option>
                        <option value="Farmer">Out-grower</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" size={18} />
                      </div>
                    </div>
                    {errors.interest && <div className="flex items-center gap-1 text-red-500 text-[10px] font-black uppercase tracking-widest ml-2 animate-pulse"><AlertCircle size={10} /> {errors.interest}</div>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inquiry Brief</label>
                    <textarea 
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-aviyo-green/10 focus:border-aviyo-green outline-none resize-none transition-all font-medium"
                      placeholder="How can we collaborate?"
                      value={formState.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:shadow-slate-900/40 transition-all flex items-center justify-center gap-4 transform hover:-translate-y-1 active:scale-95">
                    Transmit Interest
                    <ArrowRight size={20} className="animate-pulse" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-32 pb-16 text-white border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-2 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-aviyo-green rounded-xl flex items-center justify-center">
                  <Leaf className="text-white" size={22} />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase">AVİYO</span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed font-medium">
                Africa's leading innovator in sustainable plant-based nutrition, creating a healthier, greener future through molecular agro-science.
              </p>
              <div className="flex gap-6">
                {[
                  { icon: <Facebook size={20} />, label: "Facebook", link: "https://facebook.com", color: "hover:bg-blue-600" },
                  { icon: <Twitter size={20} />, label: "Twitter", link: "https://twitter.com", color: "hover:bg-slate-800" },
                  { icon: <Instagram size={20} />, label: "Instagram", link: "https://instagram.com", color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600" },
                  { icon: <Linkedin size={20} />, label: "LinkedIn", link: "https://linkedin.com", color: "hover:bg-[#0077b5]" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className={`w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white ${social.color} hover:border-transparent transition-all duration-300 shadow-xl transform hover:-translate-y-2`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.2em] text-sm text-aviyo-gold">Navigation</h4>
              <ul className="space-y-5 text-slate-400 font-bold uppercase tracking-widest text-xs">
                <li><a href="#products" className="hover:text-aviyo-gold transition-colors block">Our Products</a></li>
                <li><a href="#innovation" className="hover:text-aviyo-gold transition-colors block">The Science</a></li>
                <li><a href="#finances" className="hover:text-aviyo-gold transition-colors block">Fiscal Plan</a></li>
                <li><a href="#testimonials" className="hover:text-aviyo-gold transition-colors block">Voices</a></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.2em] text-sm text-aviyo-gold">Headquarters</h4>
              <ul className="space-y-6 text-slate-400 font-medium">
                <li className="flex items-start gap-4">
                  <Globe size={20} className="mt-1 text-aviyo-green flex-shrink-0" />
                  <span>Kampala Industrial Area,<br/>Uganda</span>
                </li>
                <li className="flex items-center gap-4">
                  <BarChart3 size={20} className="text-aviyo-green flex-shrink-0" />
                  <span>Reg No: Social Ent-2025</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">
              © 2025 Aviyo Plant-Based Nutrition Ltd. <span className="hidden md:inline">Molecular Excellence from Uganda.</span>
            </p>
            <div className="flex gap-10 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Safety Standards</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Ethical Sourcing</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* AI Assistant */}
      <ChatBot />
    </div>
  );
};

export default App;
