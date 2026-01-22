
export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  edge: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  image: string;
}

export interface LeadForm {
  name: string;
  email: string;
  interest: 'Consumer' | 'Distributor' | 'Investor' | 'Farmer' | '';
  message: string;
}
