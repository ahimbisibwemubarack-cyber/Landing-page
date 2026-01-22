
import { Product, TeamMember, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'soya-bliss',
    name: 'Soya Bliss Golden Milk',
    description: 'A functional wellness blend of turmeric, ginger, and spices fermented with probiotic cultures.',
    features: ['No Beany Flavor', 'Bioavailable Curcumin', 'Zero Added Sugar', 'Rich in Antioxidants'],
    image: 'https://images.unsplash.com/photo-1556761126-b956ec224031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    edge: 'Replaces refined sugar with natural rice syrup and honey ferment.'
  },
  {
    id: 'soy-cassava',
    name: 'Soy-Cassava Nova',
    description: 'A creamy blend where cassava starch is broken down by amylase for natural sweetness.',
    features: ['Superior Creaminess', 'Locally Sourced', 'Naturally Sweet', 'Balanced Nutrition'],
    image: 'https://images.unsplash.com/photo-1626019911734-6316719a6b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    edge: 'Culturally relevant drink with improved viscosity.'
  },
  {
    id: 'soy-fusion',
    name: 'Soy-Fortified Fusion',
    description: 'High-protein formulation fortified with Calcium, D, and B12 for targeted nutrition.',
    features: ['Digestibility Optimized', 'Probiotic Enhanced', 'Essential Vitamins', 'NGO Intervention Tool'],
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    edge: 'Uses Phytase to reduce phytic acid and boost mineral absorption.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Finding a lactose-free alternative that actually tastes good and doesn't require refrigeration has been a game-changer for my family in rural Mukono.",
    author: "Nantongo Sarah",
    role: "Mother & Teacher",
    location: "Mukono District",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: '2',
    quote: "As someone managing hypertension, Soya Bliss Golden Milk is my daily wellness ritual. The anti-inflammatory benefits are noticeable, and the taste is exceptional.",
    author: "Dr. Okello James",
    role: "Health Professional",
    location: "Kampala",
    image: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: '3',
    quote: "Partnering with Aviyo as a soy out-grower has stabilized my income. Their training on quality seeds and guaranteed market has transformed my farm's future.",
    author: "Mwesigwa David",
    role: "Smallholder Farmer",
    location: "Western Uganda",
    image: "https://i.pravatar.cc/150?u=david"
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Ahimbisibwe Mubarack',
    role: 'Co-Founder & Full-Stack Dev',
    specialty: 'Innovation & Tech Strategy',
    image: 'https://i.pravatar.cc/150?u=mubarack'
  },
  {
    name: 'Turyahabwe Denis',
    role: 'Co-Founder',
    specialty: 'Operations',
    image: 'https://i.pravatar.cc/150?u=denis'
  },
  {
    name: 'Byomugabe Praise',
    role: 'Nutrition Specialist',
    specialty: 'Formulation Design',
    image: 'https://i.pravatar.cc/150?u=praise'
  },
  {
    name: 'Nalubega Munira',
    role: 'IT Specialist',
    specialty: 'Digital Systems',
    image: 'https://i.pravatar.cc/150?u=munira'
  },
  {
    name: 'Kansiime Phionah',
    role: 'Production Specialist',
    specialty: 'Biotechnology',
    image: 'https://i.pravatar.cc/150?u=phionah'
  },
  {
    name: 'Akankwasa Aston',
    role: 'Nutritionist',
    specialty: 'Public Health',
    image: 'https://i.pravatar.cc/150?u=aston'
  }
];
