import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-brand-light border-t border-border-brand/40">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Col */}
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="0">
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold tracking-wide text-foreground uppercase">
                Join the Javeo Circle
              </h3>
              <p className="text-xs text-muted-brand leading-relaxed max-w-xs font-sans">
                Receive personalized skin tips, product updates, and early access to sales directly in your inbox.
              </p>
              <form className="space-y-2.5 max-w-xs pt-2">
                <label htmlFor="footer-email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="footer-email-address"
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white px-4 py-3 text-xs border border-border-brand placeholder-muted-brand focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center bg-foreground text-background hover:bg-primary-brand hover:text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-lg cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="flex space-x-5 text-muted-brand">
              {/* Instagram */}
              <Link href="#" className="hover:text-primary-brand transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 9.38.42 9.4 6.57 9.4 9.946 0 3.376-.02 9.547-9.4 9.946-.925.04-1.28.054-3.71.054s-2.784-.01-3.71-.054c-9.38-.42-9.4-6.57-9.4-9.946 0-3.376.02-9.547 9.4-9.946.925-.04 1.28-.054 3.71-.054zm-.002 1.971c-2.394 0-2.68.01-3.624.052-7.385.337-7.4 5.253-7.4 7.977 0 2.725.018 7.64 7.4 7.977.943.042 1.23.051 3.624.051s2.68-.009 3.624-.051c7.384-.337 7.4-5.253 7.4-7.977 0-2.724-.018-7.64-7.4-7.977-.944-.042-1.23-.052-3.624-.052zm0 2.835a5.195 5.195 0 110 10.39 5.195 5.195 0 010-10.39zm0 8.357a3.162 3.162 0 100-6.324 3.162 3.162 0 000 6.324zm5.738-8.521a1.218 1.218 0 11-2.437 0 1.218 1.218 0 012.437 0z" clipRule="evenodd" />
                </svg>
              </Link>
              {/* Pinterest */}
              <Link href="#" className="hover:text-primary-brand transition-colors duration-300">
                <span className="sr-only">Pinterest</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.002 2C6.479 2 2 6.48 2 12.002c0 4.237 2.633 7.853 6.357 9.347-.095-.791-.182-2.008.037-2.873.199-.785 1.272-5.397 1.272-5.397s-.325-.65-.325-1.61c0-1.507.875-2.633 1.962-2.633.926 0 1.374.694 1.374 1.528 0 .93-.593 2.321-.899 3.61-.256 1.08.544 1.96 1.609 1.96 1.932 0 3.418-2.038 3.418-4.98 0-2.603-1.87-4.42-4.54-4.42-3.094 0-4.912 2.321-4.912 4.72 0 .935.36 1.937.81 2.484.089.109.102.203.075.313-.082.342-.266 1.082-.302 1.233-.048.199-.16.241-.369.145-1.38-.642-2.242-2.656-2.242-4.275 0-3.483 2.533-6.683 7.297-6.683 3.832 0 6.808 2.73 6.808 6.377 0 3.805-2.399 6.868-5.727 6.868-1.118 0-2.17-.58-2.529-1.267l-.689 2.628c-.25 1.037-.925 2.336-1.379 3.076a10.002 10.002 0 1010.422-9.676z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Cols */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0" data-aos="fade-up" data-aos-delay="100">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground">
                  Shop
                </h4>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#shop" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="#cleansers" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Cleansers
                    </Link>
                  </li>
                  <li>
                    <Link href="#serums" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Serums & Oils
                    </Link>
                  </li>
                  <li>
                    <Link href="#moisturizers" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Moisturizers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground">
                  Our Brand
                </h4>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#about" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#quiz" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Skin Quiz
                    </Link>
                  </li>
                  <li>
                    <Link href="#ingredients" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Ingredients Glossary
                    </Link>
                  </li>
                  <li>
                    <Link href="#sustainability" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Sustainability
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground">
                  Customer Care
                </h4>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#faqs" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#shipping" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Shipping & Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground">
                  Legal
                </h4>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#privacy" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#terms" className="text-xs text-muted-brand hover:text-primary-brand transition-colors duration-300">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Large brand logo at the bottom */}
        <div className="pt-4 flex items-center justify-center border-t border-border-brand/20" data-aos="fade-up" data-aos-delay="200">
          <div className="relative w-[70%] aspect-[5/1] max-w-[700px]">
            <Image
              src="/logo.png"
              alt="Javeo Brand logo"
              fill
              sizes="70vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Copyright info */}
        <div className="mt-12 border-t border-border-brand/20 pt-8 flex flex-col md:flex-row md:items-center md:justify-between" data-aos="fade-up" data-aos-delay="300">
          <p className="text-[10px] text-muted-brand">
            &copy; {new Date().getFullYear()} Javeo.in. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
