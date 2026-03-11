import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceCard {
  title: string
  description: string
  image: string
  serviceKey: string
  alt: string
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES: ServiceCard[] = [
  {
    title: 'Discounted Consultations',
    description: 'Professional dental advice and examinations at affordable rates to get you started on your oral health journey.',
    image: 'https://image2url.com/r2/default/images/1772933454875-5408d445-0d50-493c-bd2a-c85d1d713743.jpg',
    serviceKey: 'Consultation',
    alt: 'Discounted dental consultation',
  },
  {
    title: 'Scaling and Polishing',
    description: 'Professional cleaning to remove plaque and tartar, preventing gum disease and leaving your teeth smooth and fresh.',
    image: 'https://image2url.com/r2/default/images/1772933737652-95451b6d-46b1-4f48-89b9-816a220e3fa2.jpg',
    serviceKey: 'Scaling and Polishing',
    alt: 'Scaling and polishing dental procedure',
  },
  {
    title: 'Teeth Whitening',
    description: 'Advanced whitening treatments to brighten your smile by several shades and remove stubborn stains effectively.',
    image: 'https://image2url.com/r2/default/images/1772933897946-80c92104-5181-4b65-a3d5-b2ab7f155047.jpg',
    serviceKey: 'Teeth Whitening',
    alt: 'Teeth whitening treatment',
  },
  {
    title: 'Crowns & RCTs',
    description: 'Restorative solutions to save damaged teeth and restore their natural function, strength, and appearance.',
    image: 'https://image2url.com/r2/default/images/1772933985462-659a1692-bbc3-4b09-a8fd-2c0ae95ee647.jpg',
    serviceKey: 'Crown / RCT',
    alt: 'Dental crown and root canal treatment',
  },
  {
    title: 'General Procedures',
    description: 'Fillings, extractions, and specialized treatments – comprehensive care for all your dental needs in one place.',
    image: 'https://image2url.com/r2/default/images/1772955501327-30f1e658-7e21-4a9e-b5dc-0e2b66395f1b.jpg',
    serviceKey: 'General checkup',
    alt: 'General dental procedures',
  },
]

const ADVANTAGES = [
  { icon: 'fas fa-heart',           title: 'Passion-Driven Care',   desc: '"Your Smile is My Passion." I care about the person behind the teeth.' },
  { icon: 'fas fa-user-md',         title: 'Expert Dentist',        desc: 'Highly skilled professional dedicated to the latest dental practices.' },
  { icon: 'fas fa-coins',           title: 'Affordable Excellence', desc: 'Quality dental care accessible to all – discounted consultations.' },
  { icon: 'fas fa-clinic-medical',  title: 'Comprehensive Care',    desc: 'From preventive care to restorative surgery, your one-stop shop.' },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-contact">
          <a
            href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services."
            target="_blank" rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp" /> 08103564479
          </a>
          <a
            href="https://www.instagram.com/smileroyale.ng?igsh=MW55NHI5cGNxejFpdw=="
            target="_blank" rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" /> @smileroyale.ng
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#hero',         label: 'Home' },
    { href: '#about',        label: 'About' },
    { href: '#services',     label: 'Services' },
    { href: '#why',          label: 'Why us' },
    { href: '#doctor',       label: 'Our Dentist' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#booking',      label: 'Appointment' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <a href="#hero" className="logo" onClick={() => setMobileOpen(false)}>
          <div className="logo-icon">
            <img
              src="https://image2url.com/r2/default/images/1772738359714-c3bea4c7-78e3-4ba1-b90f-1bfd03bcbcdb.jpg"
              alt="Smile Royale Logo"
            />
          </div>
          <div className="logo-text">
            <span className="logo-main">SMILE</span>
            <span className="logo-sub">ROYALE</span>
          </div>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#booking" className="btn-nav">Book now</a>
        </nav>

        <button
          className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-dropdown ${mobileOpen ? 'mobile-dropdown--open' : ''}`}>
        {navLinks.map(l => (
          <a
            key={l.href} href={l.href}
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services."
          target="_blank" rel="noopener noreferrer"
          className="mobile-wa-btn"
          onClick={() => setMobileOpen(false)}
        >
          <i className="fab fa-whatsapp" /> Book an appointment
        </a>
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-overlay" />
      <div className="hero-particles">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      <div className="container">
        <div className={`hero-content ${loaded ? 'hero-content--visible' : ''}`}>
          <div className="hero-badge">
            <i className="fas fa-tooth" /> Your smile is our passion
          </div>
          <div className="motto-line">
            <h1>Your Smile.</h1>
            <h2>Our Passion.</h2>
            <h2>Our Pride.</h2>
          </div>
          <p>
            Experience professional dental care tailored to your needs. From routine checkups
            to advanced procedures, we are committed to giving you a reason to smile.
          </p>
          <div className="hero-buttons">
            <a href="#booking" className="btn btn-primary">
              <i className="fas fa-calendar-check" /> Book an appointment
            </a>
            <a href="#services" className="btn btn-outline-light">
              <i className="fas fa-tooth" /> Our services
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span />
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="about" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`about-heading reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title">Professional Care for Your Perfect Smile</h2>
          <p className="section-subhead">
            At Smile Royale, we believe that a healthy smile is a reflection of your overall
            well-being. I am a dedicated dental professional providing a wide range of oral health
            solutions in a comfortable and professional environment. As your expert dentist, I am
            driven by a single mission: to provide high-quality dental care with passion and excellence.
          </p>
        </div>
        <div className={`about-video-grid reveal reveal--delay ${isVisible ? 'reveal--visible' : ''}`}>
          <div className="video-wrapper">
            <video autoPlay muted loop playsInline>
              <source src="https://image2url.com/r2/default/videos/1772715970572-d9d8d2d6-29d3-4aa7-9450-7e3ae433aec7.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="video-wrapper">
            <video autoPlay muted loop playsInline>
              <source src="https://image2url.com/r2/default/videos/1772716102573-be632a4c-6946-44ec-bcb4-1dd7e4d028a9.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCardItem({
  service,
  index,
  onBook,
}: {
  service: ServiceCard
  index: number
  onBook: (key: string) => void
}) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const { ref, isVisible } = useIntersectionObserver(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card reveal ${isVisible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`service-image ${!imgLoaded && !imgError ? 'shimmer' : ''}`}>
        {!imgError ? (
          <img
            src={service.image}
            alt={service.alt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={imgLoaded ? 'loaded' : ''}
          />
        ) : (
          <div className="img-error">
            <i className="fas fa-image" />
            <span>Image unavailable</span>
          </div>
        )}
        <div className="service-image-overlay" />
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <a href="#booking" className="service-btn" onClick={() => onBook(service.serviceKey)}>
          Book appointment <i className="fas fa-arrow-right" />
        </a>
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services({ onServiceSelect }: { onServiceSelect: (s: string) => void }) {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="services" className="section section--alt" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title">Comprehensive Dental Solutions</h2>
          <p className="section-subhead">
            I offer a full suite of dental treatments to keep your teeth healthy and your smile bright.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCardItem key={s.serviceKey} service={s} index={i} onBook={onServiceSelect} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why ──────────────────────────────────────────────────────────────────────
function Why() {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="why" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title">The Smile Royale Advantage</h2>
        </div>
        <div className="advantage-grid">
          {ADVANTAGES.map((a, i) => (
            <div
              key={a.title}
              className={`advantage-card reveal ${isVisible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="advantage-icon-wrap">
                <i className={a.icon} />
              </div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Doctor ───────────────────────────────────────────────────────────────────
function Doctor() {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="doctor" className="section section--white" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title">Meet Your Dentist</h2>
          <p className="section-subhead">Expert care with a personal touch</p>
        </div>
        <div className="doctor-grid">
          <div className={`doctor-image reveal reveal--left ${isVisible ? 'reveal--visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="doctor-img-frame">
              <img
                src="https://image2url.com/r2/default/images/1772889924884-a9da39dc-856d-4411-aac2-f3f59a7e3884.jpg"
                alt="Dr. Farouk Adebiyi"
              />
            </div>
          </div>

          <div className={`doctor-info reveal reveal--right ${isVisible ? 'reveal--visible' : ''}`} style={{ transitionDelay: '0.35s' }}>
            <h2 className="doctor-name">Dr. Farouk Adebiyi</h2>
            <div className="doctor-title-badge">
              Dentist | Founder, Smile Royale Dental Home
            </div>
            <p className="doctor-bio">
              Dr. Farouk Adebiyi is a dedicated Dental Surgeon and the visionary founder of Smile
              Royale Dental Home. With a passion for blending clinical excellence with modern digital
              engagement, he has established himself as a prominent voice in Nigerian dentistry.
            </p>
            <p className="doctor-bio">
              Dr. Adebiyi is widely recognized for his work as an oral health influencer, using his
              platform to demystify dental procedures and promote preventive care to a global audience.
              His unique background as a Digital Product Manager allows him to integrate
              technology-driven solutions into patient care, ensuring a seamless end-to-end journey.
            </p>
            <div className="expertise-grid">
              {[
                { title: 'Preventive Dentistry',   desc: 'Dedicated to educating patients on long-term oral hygiene' },
                { title: 'Restorative Procedures', desc: 'Skilled in restoring both function and aesthetics to your smile' },
                { title: 'Oral Health Advocacy',   desc: 'Leading digital campaigns for dental literacy and accessibility' },
              ].map(e => (
                <div key={e.title} className="expertise-item">
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
            <div className="membership-badge">
              <i className="fas fa-certificate" /> Inducted Member: Medical and Dental Council of Nigeria (MDCN)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="testimonials" className="section section--alt" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title">Smile Transformations</h2>
          <p className="section-subhead">Real results from our happy patients</p>
        </div>
        <div className="testimonials-grid">
          {[
            { src: 'https://image2url.com/r2/default/videos/1772888015053-2c6f0de0-f226-40da-9b5a-6c625bccfaa7.mp4', title: 'Teeth Whitening', delay: 0 },
            { src: 'https://image2url.com/r2/default/videos/1772888063863-6b5271e1-81da-432c-86cc-c34dfadced3b.mp4', title: 'Smile Makeover',  delay: 100 },
          ].map(v => (
            <div
              key={v.title}
              className={`testimonials-item reveal ${isVisible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${v.delay}ms` }}
            >
              <div className="testimonials-media">
                <video autoPlay muted loop playsInline>
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
              <div className="testimonials-caption">
                <h4>{v.title}</h4>
                <p>Before &amp; After</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`testimonials-single reveal ${isVisible ? 'reveal--visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="testimonials-item">
            <div className="testimonials-media">
              <img
                src="https://image2url.com/r2/default/images/1772887670391-d8bfbae1-a8b6-4617-86a3-1991a4185400.jpg"
                alt="Dental transformation before and after"
              />
            </div>
            <div className="testimonials-caption">
              <h4>Complete Restoration</h4>
              <p>Before &amp; After</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Booking Form ─────────────────────────────────────────────────────────────
function BookingForm({
  selectedService,
  setSelectedService,
}: {
  selectedService: string
  setSelectedService: (s: string) => void
}) {
  const [name,      setName]      = useState('')
  const [phone,     setPhone]     = useState('')
  const [date,      setDate]      = useState('')
  const [otherText, setOtherText] = useState('')

  const sendToWhatsApp = useCallback(() => {
    if (!name.trim() || !phone.trim() || !selectedService || !date) {
      alert('Please fill in name, phone, service, and date')
      return
    }

    let serviceDetail = selectedService
    if (selectedService === 'Other') {
      if (!otherText.trim()) { alert('Please describe the service you need'); return }
      serviceDetail = otherText.trim()
    }

    const dateObj = new Date(date + 'T12:00:00')
    const day   = dateObj.getDate()
    const month = dateObj.toLocaleDateString('en-GB', { month: 'long' })
    const year  = dateObj.getFullYear()
    const suffixes = ['th', 'st', 'nd', 'rd']
    const v      = day % 100
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]
    const formattedDate = `${day}${suffix} ${month} ${year}`

    const now = new Date()
    const timestamp = now.toLocaleString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwvvx3synK621mbn9UvVWl0fWR6C_LUv3LDu5t_7iLcrne6mBr7djy-nElak4rr4w0/exec'
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(), phone: phone.trim(),
        service: serviceDetail, date: formattedDate, timestamp,
      }),
    }).catch(() => {})

    const message = `Hello Smile Royale,%0A%0AI'm ${encodeURIComponent(name.trim())}. I want to book an appointment for ${encodeURIComponent(serviceDetail)} on ${encodeURIComponent(formattedDate)}.`
    window.open(`https://wa.me/2348103564479?text=${message}`, '_blank', 'noopener,noreferrer')
  }, [name, phone, selectedService, date, otherText])

  return (
    <div className="booking-form">
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text" placeholder="Your full name"
          value={name} onChange={e => setName(e.target.value)} required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="tel" placeholder="Your phone number"
          value={phone} onChange={e => setPhone(e.target.value)} required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Service Required</label>
        <select value={selectedService} onChange={e => setSelectedService(e.target.value)} required>
          <option value="" disabled>Select a service</option>
          <option value="Consultation">Consultation</option>
          <option value="Scaling and Polishing">Scaling and Polishing</option>
          <option value="Teeth Whitening">Teeth Whitening</option>
          <option value="Crown / RCT">Crown / RCT</option>
          <option value="General procedures">General procedures</option>
          <option value="Other">Other (please specify)</option>
        </select>
      </div>
      {selectedService === 'Other' && (
        <div className="form-group form-group--animate">
          <label className="form-label">Describe your needs</label>
          <textarea
            placeholder="Please describe the service you need"
            rows={2}
            value={otherText}
            onChange={e => setOtherText(e.target.value)}
          />
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Preferred Date</label>
        <input
          type="date" value={date}
          onChange={e => setDate(e.target.value)}
          required min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <button type="button" className="btn-submit" onClick={sendToWhatsApp}>
        <i className="fab fa-whatsapp" /> Confirm Appointment
      </button>
    </div>
  )
}

// ─── Booking Section ──────────────────────────────────────────────────────────
function Booking({
  selectedService,
  setSelectedService,
}: {
  selectedService: string
  setSelectedService: (s: string) => void
}) {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <section id="booking" className="section section--booking" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <h2 className="section-title section-title--light">Book an Appointment</h2>
        </div>
        <div className={`booking-grid reveal ${isVisible ? 'reveal--visible' : ''}`}>
          <div className="booking-info">
            <h3>Ready to Transform Your Smile?</h3>
            <p>
              Don't wait for a dental emergency. Schedule your visit with me today and experience
              the Smile Royale difference.
            </p>
            <a
              href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services."
              target="_blank" rel="noopener noreferrer"
              className="booking-wa-link"
            >
              <i className="fab fa-whatsapp" /> 08103564479
            </a>
            <div className="booking-info-stats">
              <div className="stat"><span>5★</span><small>Patient Rating</small></div>
              <div className="stat"><span>100%</span><small>Satisfaction</small></div>
              <div className="stat"><span>24h</span><small>Response Time</small></div>
            </div>
          </div>
          <BookingForm selectedService={selectedService} setSelectedService={setSelectedService} />
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <img
                  src="https://image2url.com/r2/default/images/1772738359714-c3bea4c7-78e3-4ba1-b90f-1bfd03bcbcdb.jpg"
                  alt="Smile Royale Logo"
                />
              </div>
              <div className="logo-text">
                <span className="logo-main">SMILE</span>
                <span className="logo-sub">ROYALE</span>
              </div>
            </div>
            <p>Your Smile. Our Passion. Our Pride.</p>
          </div>
          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#doctor">Our Dentist</a>
            <a href="#booking">Book Now</a>
          </div>
          <div className="footer-social">
            <a href="https://wa.me/2348103564479" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://www.instagram.com/smileroyale.ng" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Smile Royale Dental Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen,       setMobileOpen]       = useState(false)
  const [selectedService,  setSelectedService]  = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <TopBar />
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Hero />
        <About />
        <Services onServiceSelect={setSelectedService} />
        <Why />
        <Doctor />
        <Testimonials />
        <Booking selectedService={selectedService} setSelectedService={setSelectedService} />
      </main>
      <Footer />
    </>
  )
}