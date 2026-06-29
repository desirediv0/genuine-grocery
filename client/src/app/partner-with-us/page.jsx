"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/utils";
import {
  Handshake,
  ArrowRight,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  Award,
  DollarSign,
  Store,
  Percent,
  Headphones,
  Globe,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PartnerWithUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    state: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, number, city, state, message } = form;
    if (!name || !email || !number || !city || !state || !message) {
      toast.error("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetchApi("/partner/register", {
        method: "POST",
        body: JSON.stringify({ name, email, number, city, state, message }),
      });
      if (res.success || res.statusCode === 201) {
        setSuccess(true);
        toast.success("Details submitted successfully!");
      } else {
        const msg = res.message || "";
        if (msg.toLowerCase().includes("already") || res.statusCode === 409) {
          toast.error("An application with this email already exists.");
        } else {
          toast.error(msg || "Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("already") || msg.includes("409")) {
        toast.error("An application with this email already exists.");
      } else {
        toast.error(msg || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-800">
      {/* HERO SECTION */}
      <section
        className="relative text-white py-20 md:py-28 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1e2d40 0%, #172234 60%, #111c2b 100%)" }}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient glow effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #16A34A 40%, #1D4ED8 60%, transparent)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <Handshake className="w-4 h-4 text-primary" />
            Partner with Genuine Nutrition
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Grow Your Business <span className="text-primary">With Us</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Whether you are a distributor, retailer, gym owner, or influencer, we would love to collaborate.
            Share your details and our team will get in touch soon.
          </p>

          <div className="flex justify-center">
            <a href="#partner-form">
              <Button size="lg" className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-2 transition-all hover:translate-y-[-2px]">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP MODELS */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-xs block mb-3">Partnership Models</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">We offer two partnership models</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Commission Model */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/25 transition-colors">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Commission Model</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn attractive commissions on every sale you generate. Share high-quality supplements with your audience and get paid for your influence.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Attractive Commissions</span>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Franchise Model */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/25 transition-colors">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Franchise Model</h3>
              <p className="text-gray-600 leading-relaxed">
                Become a Genuine Nutrition franchise partner and grow with us. Bring authentic quality products to your local gym, store, or warehouse network.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Franchise Support & Branding</span>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-6 text-center border border-primary/20 max-w-2xl mx-auto">
          <p className="text-primary font-semibold text-sm">
            Choose the model that fits your business best, or contact us to discuss which option is right for you!
          </p>
        </div>
      </section>

      {/* WHY COLLABORATE WITH US */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: CheckCircle, label: "Quality-first products", desc: "100% authentic formulations" },
              { icon: Globe, label: "Pan-India shipping", desc: "Fast & reliable network" },
              { icon: Headphones, label: "Dedicated partner support", desc: "Account assistance 24/7" },
              { icon: Percent, label: "Transparent margins", desc: "Highest earnings in industry" },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start bg-slate-50/50 p-6 rounded-xl border border-gray-100">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.label}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM SECTION */}
      <section id="partner-form" className="py-20 max-w-2xl mx-auto px-6 scroll-mt-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 p-8 md:p-10">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Application Received</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for your interest! Our partnerships team will review your details and contact you within 24-48 hours.
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl h-11">
                  Back to Home
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">Share your details</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2">Let&apos;s Collaborate</h3>
                <p className="text-gray-500 text-sm">
                  Fill the form and our partnerships team will contact you within 24-48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
                    <input
                      type="tel"
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Gurugram"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Haryana"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your business and how you would like to partner."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-sm text-gray-900 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="max-w-5xl mx-auto px-6 pt-10 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transaction" },
            { icon: CreditCard, title: "Multiple Payment Options", desc: "Credit cards, UPI & more" },
            { icon: Award, title: "Quality Products", desc: "100% genuine supplements" },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white transition duration-200">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-sm">{feature.title}</h5>
                <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
