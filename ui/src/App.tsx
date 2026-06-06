import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Masterclasses', href: '#masterclasses' },
  { label: 'Contact', href: '#contact' },
];

const portfolioItems = [
  { label: 'Bridal', description: 'signature bridal makeup closeup' },
  { label: 'Soft Glam', description: 'soft glam beauty portrait' },
  { label: 'Party', description: 'party makeup editorial look' },
  { label: 'Editorial', description: 'editorial campaign beauty look' },
  { label: 'Engagement', description: 'engagement makeup portrait' },
  { label: 'Photoshoot', description: 'photoshoot makeup styling' },
];

const services = [
  {
    title: 'Bridal Makeup',
    copy: 'Luxury bridal beauty for weddings and destination weddings.',
    href: '/services/bridal',
    image: 'bridal makeup service portrait',
  },
  {
    title: 'Engagement Makeup',
    copy: 'Elegant looks for engagements and pre-wedding events.',
    href: '/services/engagement',
    image: 'engagement makeup service portrait',
  },
  {
    title: 'Party Makeup',
    copy: 'Sophisticated glam for celebrations and special occasions.',
    href: '/services/party',
    image: 'party makeup service portrait',
  },
  {
    title: 'Photoshoot Makeup',
    copy: 'Editorial, fashion, influencer and commercial shoots.',
    href: '/services/photoshoot',
    image: 'photoshoot makeup service portrait',
  },
  {
    title: 'Makeup Masterclasses',
    copy: 'Professional and beginner-friendly makeup education.',
    href: '/masterclasses',
    image: 'makeup masterclass education portrait',
  },
];

const testimonials = [
  {
    quote:
      'Namrata understood exactly what I wanted — my makeup lasted through tears, rain, and dancing until midnight. I looked like myself, just the best version.',
    name: 'Ananya S.',
    occasion: 'Bride · Delhi Wedding 2024',
  },
  {
    quote:
      'For my engagement shoot, she created a look that was editorial yet so wearable. Every photo came out stunning. Truly exceptional artistry.',
    name: 'Priya M.',
    occasion: 'Client · Engagement Shoot',
  },
  {
    quote:
      "The masterclass changed how I see makeup entirely. Namrata's teaching is as precise and detailed as her work.",
    name: 'Ritu K.',
    occasion: 'Masterclass Student',
  },
];

const standards = [
  {
    title: 'Premium Products',
    copy: 'Luxury and professional-grade formulas exclusively.',
    icon: 'star',
  },
  {
    title: 'Customised Looks',
    copy: 'Every look tailored precisely to your features, skin tone, and occasion.',
    icon: 'face',
  },
  {
    title: 'Long-Wear Artistry',
    copy: 'Designed to photograph beautifully and last through the entire day and night.',
    icon: 'clock',
  },
  {
    title: 'Hygiene Standards',
    copy: 'Professional sanitation and safety practices on every appointment.',
    icon: 'shield',
  },
];

function Icon({ type }: { type: string }) {
  if (type === 'star') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7l7.1 17.2L57 25.8 43.4 38l4 18-15.4-9.4L16.6 56l4-18L7 25.8l17.9-1.6L32 7z" />
      </svg>
    );
  }

  if (type === 'face') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M40 9c-12 1-22 11-22 25 0 14 9 21 20 21" />
        <path d="M36 18c7 3 11 10 10 18-.8 7-4.8 12-10 15" />
        <path d="M29 31h10M28 41c4 3 8 3 12 0" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" />
        <path d="M32 18v16l11 7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 7l21 8v14c0 14-8.6 23.5-21 28-12.4-4.5-21-14-21-28V15l21-8z" />
      <path d="M23 32l6 6 13-15" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const heroWords = useMemo(() => ['Beauty', 'Designed', 'Around', 'You'], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal, .section-reveal, .reveal-left, .reveal-right');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (carouselPaused) return undefined;
    const interval = window.setInterval(() => {
      setActiveTestimonial(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [carouselPaused]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <header className="global-header" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Cult Contour home">
          CULT CONTOUR
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/contact">
          Book Consultation
        </a>
        <button
          className="menu-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <aside className={`mobile-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button className="panel-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ×
        </button>
        <p className="panel-kicker">Cult Contour by Namrata Vij</p>
        {navLinks.map(link => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <div className="panel-actions">
          <a href="https://wa.me/910000000000?text=Hello%20Cult%20Contour%2C%20I%20would%20like%20to%20book%20a%20consultation.">
            WhatsApp
          </a>
          <a href="https://www.instagram.com/cultcontour">Instagram</a>
          <a className="button button-filled" href="/contact">
            Book Consultation
          </a>
        </div>
      </aside>

      <main>
        <section id="home" className="hero section-reveal">
          {/* Replace with real image: full-bleed cinematic closeup of bridal makeup artistry with magenta pigment burst */}
          <div className="hero-image img-placeholder" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-animate delay-0">Luxury Makeup Artistry · Delhi</p>
            <h1 className="hero-title" aria-label="Beauty Designed Around You">
              {heroWords.map((word, index) => (
                <span key={word} style={{ transitionDelay: `${120 + index * 110}ms` }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero-subline hero-animate delay-3">Modern. Timeless. Luxury.</p>
            <p className="hero-description hero-animate delay-4">
              Creating elevated beauty experiences for brides, professionals, and special occasions across Delhi and
              destination weddings worldwide.
            </p>
            <div className="cta-row hero-animate delay-5">
              <a className="button button-filled" href="/contact">
                Book a Consultation
              </a>
              <a className="button button-ghost" href="/services">
                Explore Services
              </a>
            </div>
          </div>
          <div className={`scroll-indicator ${scrolled ? 'is-hidden' : ''}`} aria-hidden="true" />
        </section>

        <section id="portfolio" className="content-section portfolio section-reveal">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
            <h2>Work That Speaks for Itself</h2>
            <p>A curated selection of signature looks across bridal, soft glam, party, and editorial categories.</p>
          </div>
          <div className="portfolio-grid reveal">
            {portfolioItems.map((item, index) => (
              <article className={`portfolio-item ${index === 0 ? 'featured' : ''}`} key={item.label}>
                {/* Replace with real image: {item.description} */}
                <div className="img-placeholder" />
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <a className="text-link portfolio-link" href="/portfolio">
            View the Portfolio →
          </a>
        </section>

        <section id="about" className="content-section about-section">
          <div className="about-image reveal-left">
            {/* Replace with real image: tall portrait of Namrata Vij */}
            <div className="img-placeholder portrait-placeholder" />
          </div>
          <div className="about-copy reveal-right">
            <p className="eyebrow">The Artist</p>
            <h2>Namrata Vij</h2>
            <p className="subhead">International Luxury Makeup Artist · Beauty Educator · Entrepreneur</p>
            <p>
              Namrata Vij is an international luxury makeup artist known for creating modern, timeless, and
              sophisticated beauty experiences. From bridal transformations and destination weddings to editorial
              campaigns, fashion shows, celebrity appearances, and special events, she is recognised for her refined
              artistry, attention to detail, and ability to create looks that feel effortlessly elegant while remaining
              uniquely personal.
            </p>
            <p>
              Holding an MBA in Marketing from the University of Technology Sydney and founder of Cult Contour, Namrata
              brings together artistic excellence, luxury expertise, and a deep understanding of client experience.
            </p>
            <a className="text-link" href="/about">
              Learn More About Namrata →
            </a>
          </div>
        </section>

        <section id="services" className="content-section services section-reveal">
          <div className="section-heading centered">
            <p className="eyebrow">Services</p>
            <h2>Beauty Services for Every Milestone</h2>
            <p>
              At Cult Contour, every makeup service is designed around one goal: creating a look that feels effortlessly
              beautiful, photographs flawlessly, and reflects the individuality of each client.
            </p>
          </div>
          <div className="service-grid reveal">
            {services.map(service => (
              <a className="service-card" href={service.href} key={service.title}>
                {/* Replace with real image: {service.image} */}
                <div className="img-placeholder service-image" />
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <span>→ Explore</span>
                </div>
              </a>
            ))}
          </div>
          <a className="text-link centered-link" href="/services">
            Explore All Services →
          </a>
        </section>

        <section className="content-section testimonials section-reveal">
          <div className="section-heading centered">
            <p className="eyebrow">Client Love</p>
            <h2>What Brides Are Saying</h2>
          </div>
          <div
            className="testimonial-window"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
          >
            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map(testimonial => (
                <article className="testimonial-card" key={testimonial.name}>
                  <span className="quote-mark">“</span>
                  <p>{testimonial.quote}</p>
                  <h3>{testimonial.name}</h3>
                  <small>{testimonial.occasion}</small>
                </article>
              ))}
            </div>
          </div>
          <div className="testimonial-dots" aria-label="Testimonial controls">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                className={activeTestimonial === index ? 'active' : ''}
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </section>

        <section className="content-section standard section-reveal">
          <div className="section-heading centered">
            <p className="eyebrow">The Standard</p>
            <h2>What Makes Cult Contour Different</h2>
            <p>
              Choosing a makeup artist for a wedding or a major event is a decision built on trust. Cult Contour was
              built with that standard in mind.
            </p>
          </div>
          <div className="standard-grid reveal">
            {standards.map(item => (
              <article className="standard-card" key={item.title}>
                <Icon type={item.icon} />
                <span className="magenta-rule" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <a className="button button-filled wide-button" href="/contact">
            Book a Consultation
          </a>
        </section>

        <section id="masterclasses" className="masterclass section-reveal">
          <div className="masterclass-copy">
            <p className="eyebrow">Education</p>
            <h2>Learn From an International Makeup Artist</h2>
            <p>
              Cult Contour Masterclasses are designed for aspiring makeup artists, beauty enthusiasts, and professionals
              who want to elevate their artistry with expert guidance. Drawing from over eight years of industry
              experience across bridal, editorial, fashion, and celebrity makeup.
            </p>
            <ul>
              <li>Beginner to advanced level courses</li>
              <li>Personalised mentorship from Namrata</li>
              <li>Industry insights and technique refinement</li>
            </ul>
            <a className="text-link" href="/masterclasses">
              Explore Masterclasses →
            </a>
          </div>
          <div className="masterclass-image-wrap">
            {/* Replace with real image: tall masterclass education image with Namrata teaching makeup artistry */}
            <div className="img-placeholder portrait-placeholder" />
          </div>
        </section>

        <section className="content-section instagram section-reveal">
          <div className="section-heading centered">
            <p className="eyebrow">Follow Along</p>
            <h2>@cultcontour</h2>
          </div>
          <div className="instagram-strip reveal">
            {Array.from({ length: 6 }, (_, index) => (
              <a href="https://www.instagram.com/cultcontour" key={index} aria-label={`Cult Contour Instagram post ${index + 1}`}>
                {/* Replace with real image: Instagram feed square beauty post */}
                <div className="img-placeholder" />
                <span aria-hidden="true">◎</span>
              </a>
            ))}
          </div>
          <a className="button button-ghost instagram-button" href="https://www.instagram.com/cultcontour">
            Follow on Instagram →
          </a>
        </section>

        <section id="contact" className="final-cta section-reveal">
          <p className="eyebrow">Inquiry</p>
          <h2>Ready to Begin?</h2>
          <p>
            Whether you are a bride planning your wedding beauty, a client preparing for a special occasion, or someone
            who wants to learn makeup from the ground up — the process begins with a conversation.
          </p>
          <a className="button button-filled" href="/contact">
            Book a Consultation
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a className="brand-mark" href="#home">
              CULT CONTOUR
            </a>
            <p>Luxury Bridal, Event &amp; Editorial Makeup.</p>
          </div>
          <div>
            <h3>Navigation</h3>
            {navLinks.map(link => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h3>Services</h3>
            <a href="/services/bridal">Bridal Makeup</a>
            <a href="/services/engagement">Engagement Makeup</a>
            <a href="/services/party">Party Makeup</a>
            <a href="/services/photoshoot">Photoshoot Makeup</a>
            <a href="/masterclasses">Makeup Training</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:hello@cultcontour.com">Email</a>
            <a href="https://wa.me/910000000000?text=Hello%20Cult%20Contour%2C%20I%20would%20like%20to%20book%20a%20consultation.">
              WhatsApp
            </a>
            <span>Delhi, India</span>
          </div>
          <div>
            <h3>Social</h3>
            <div className="social-links">
              {['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Pinterest', 'Quora', 'Reddit', 'X'].map(social => (
                <a key={social} href="/" aria-label={social}>
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cult Contour. All Rights Reserved.</span>
          <span>
            <a href="/privacy-policy">Privacy Policy</a> · <a href="/terms-and-conditions">Terms &amp; Conditions</a> ·{' '}
            <a href="/refund-policy">Refund Policy</a>
          </span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/910000000000?text=Hello%20Cult%20Contour%2C%20I%20would%20like%20to%20book%20a%20consultation."
        aria-label="Chat on WhatsApp"
      >
        <span>◌</span> Chat on WhatsApp
      </a>
    </div>
  );
}

export default App;
