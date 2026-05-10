import { Factory, ShieldCheck, Phone, Truck, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: "10,000+", label: "Happy Families" },
  { value: "15 Years",  label: "Nutritional Excellence" },
  { value: "100%",   label: "Pure & Organic" },
  { value: "Free",   label: "Delivery above ₹499" },
];

const PROMISES = [
  {
    icon: Factory,
    title: "Farm to Home Direct",
    body:  "We source directly from our certified local farms. No distributors or middlemen — just pure, fresh products delivered straight to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Freshness & Purity Guarantee",
    body:  "Every batch is tested for quality and purity. Not happy? We replace it immediately with our zero-questions-asked fresh policy.",
  },
  {
    icon: Phone,
    title: "Dedicated Customer Support",
    body:  "Our team of experts is here to help you choose the right products for your family's health and nutritional needs.",
  },
  {
    icon: Truck,
    title: "Safe & Fresh Delivery",
    body:  "We use specialized packaging and optimized logistics to ensure your grocery products stay fresh until they reach you.",
  },
];

export const WhyBuySection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
              The Genuine Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Purity in Every Drop, <br />
              <span className="text-primary">Freshness in Every Bite.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-xs md:text-right text-base leading-relaxed">
            Since 2009, we have been committed to delivering unadulterated farm-fresh products to health-conscious families.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Stats - Left Side */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-[24px] border border-gray-100 flex flex-col justify-center text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <p className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</p>
              </div>
            ))}
            <div className="col-span-2 mt-4 p-8 bg-primary rounded-[32px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xl font-bold mb-2 relative z-10">Quality First</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                Join 10,000+ families who have made the switch to pure, farm-fresh nutrition.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-primary px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors relative z-10">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Promises - Right Side */}
          <div className="lg:col-span-8 space-y-4">
            {PROMISES.map((item, i) => (
              <div key={i} className="group bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:border-transparent transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    {item.title}
                    <CheckCircle className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-20 p-8 md:p-10 rounded-[40px] bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(22,163,74,0.15),transparent_50%)]" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Need a Custom Plan?</h3>
            <p className="text-gray-400">
              Whether its for your home or your business, our experts are help you choose the best products for your needs.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all text-center">
              Get in Touch
            </Link>
            <a href="tel:+919999999999" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10 text-center">
              Call Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuySection;