"use client";

import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <section id="skin-club" className="bg-white py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        <div
          className="bg-[#FAF8F5] rounded-[2.5rem] p-8 sm:p-14 border border-border-brand/30 shadow-xs relative overflow-hidden"
          data-aos="fade-up"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand-light/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-brand-light/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
              Exclusive Member Privileges
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Unlock 10% Off Your First Clinical Order
            </h2>

            <p className="text-xs sm:text-sm text-muted-brand leading-relaxed font-sans">
              Join the Javeo Skincare Club for private invitations to new formulation drops, dermatological advice, and routine customization guides.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
                Thank you! Welcome to the Javeo Skin Club. Check your inbox for your 10% welcome coupon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-4 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white border border-border-brand rounded-full py-3.5 px-5 text-xs text-foreground placeholder-muted-brand outline-none focus:border-primary-brand shadow-2xs font-sans transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-[#1a1a1a] text-white hover:bg-primary-brand px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Join Club
                </button>
              </form>
            )}

            <p className="text-[10px] text-muted-brand/70 pt-2 font-sans">
              We respect your privacy. No spam, ever. Unsubscribe with a single click anytime.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
