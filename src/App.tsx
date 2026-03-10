import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [showOther, setShowOther] = useState(false)

  useEffect(() => {
    // Smooth scroll for anchor links - FIXED: No 'this' binding issues
    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const href = this.getAttribute('href')
        if (href && href !== '#') {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setMobileMenu(false)
          }
        }
      })
    })

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', function(e) {
          e.preventDefault()
        })
      })
    }
  }, [])

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedService(value)
    setShowOther(value === 'Other')
  }

  const handleBookNow = (service: string) => {
    setSelectedService(service)
    setShowOther(false)
    const bookingSection = document.querySelector('#booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    
    const nameInput = document.getElementById('waName') as HTMLInputElement
    const phoneInput = document.getElementById('waPhone') as HTMLInputElement
    const serviceSelect = document.getElementById('waService') as HTMLSelectElement
    const otherTextarea = document.getElementById('waOtherText') as HTMLTextAreaElement
    const dateInput = document.getElementById('waDate') as HTMLInputElement

    const name = nameInput?.value?.trim() || ''
    const phone = phoneInput?.value?.trim() || ''
    const service = serviceSelect?.value || ''
    const otherText = otherTextarea?.value?.trim() || ''
    const date = dateInput?.value || ''

    if (!name || !phone || !service || !date) {
      alert('Please fill in name, phone, service, and date')
      return
    }

    let serviceDetail = service
    if (service === 'Other' && otherText) {
      serviceDetail = otherText
    } else if (service === 'Other' && !otherText) {
      alert('Please describe the service you need')
      return
    }

    const dateObj = new Date(date + 'T12:00:00')
    const day = dateObj.getDate()
    const month = dateObj.toLocaleDateString('en-GB', { month: 'long' })
    const year = dateObj.getFullYear()
    
    let dayWithSuffix = day.toString()
    if (day > 3 && day < 21) dayWithSuffix = day + 'th'
    else {
      const lastDigit = day % 10
      if (lastDigit === 1) dayWithSuffix = day + 'st'
      else if (lastDigit === 2) dayWithSuffix = day + 'nd'
      else if (lastDigit === 3) dayWithSuffix = day + 'rd'
      else dayWithSuffix = day + 'th'
    }
    
    const formattedDate = `${dayWithSuffix} ${month} ${year}`
    
    const message = `Hello Smile Royale,%0A%0AI'm ${name}. I want to book an appointment for ${serviceDetail} on ${formattedDate}.`
    const whatsappURL = `https://wa.me/2348103564479?text=${message}`
    
    window.open(whatsappURL, '_blank')
  }

  // Helper function for image loading - FIXED: No unused 'error' variable
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    img.classList.add('loaded')
    const container = img.closest('.service-image')
    if (container) {
      container.classList.remove('loading')
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    img.classList.add('error')
    const container = img.closest('.service-image')
    if (container) {
      container.classList.add('has-error')
      container.classList.remove('loading')
    }
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-contact">
            <a href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services." target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> 08103564479
            </a>
            <a href="https://www.instagram.com/smileroyale.ng?igsh=MW55NHI5cGNxejFpdw==" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> @smileroyale.ng
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <div className="logo-icon">
              <img 
                src="https://image2url.com/r2/default/images/1772738359714-c3bea4c7-78e3-4ba1-b90f-1bfd03bcbcdb.jpg" 
                alt="Smile Royale Logo"
              />
            </div>
            <div className="logo-text">
              <span className="main">SMILE</span>
              <span className="sub">ROYALE</span>
            </div>
          </div>
          <nav className="nav">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#why">Why us</a>
            <a href="#doctor">Our Dentist</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#booking">Appointment</a>
            <a href="#booking" className="btn-nav">Book now</a>
          </nav>
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        {/* Mobile dropdown */}
        {mobileMenu && (
          <div className="mobile-menu-dropdown">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#why">Why us</a>
            <a href="#doctor">Our Dentist</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#booking">Appointment</a>
            <a href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services." target="_blank" rel="noopener noreferrer" className="mobile-wa-btn">Book an appointment</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-tooth"></i> Your smile is our passion
            </div>
            <div className="motto-line">
              <h1>Your Smile.</h1>
              <h2>Our Passion.</h2>
              <h2>Our Pride.</h2>
            </div>
            <p>Experience professional dental care tailored to your needs. From routine checkups to advanced procedures, we are committed to giving you a reason to smile.</p>
            <div className="hero-buttons">
              <a href="#booking" className="btn btn-primary">Book an appointment</a>
              <a href="#services" className="btn btn-outline-light">Our services</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-heading">
            <h2 className="section-title">Professional Care for Your Perfect Smile</h2>
            <p className="section-subhead">At Smile Royale, we believe that a healthy smile is a reflection of your overall well-being. I am a dedicated dental professional providing a wide range of oral health solutions in a comfortable and professional environment. As your expert dentist, I am driven by a single mission: to provide high-quality dental care with passion and excellence.</p>
          </div>
          <div>
            <div className="about-video-grid">
              <video autoPlay muted loop playsInline>
                <source src="https://image2url.com/r2/default/videos/1772715970572-d9d8d2d6-29d3-4aa7-9450-7e3ae433aec7.mp4" type="video/mp4" />
              </video>
              <video autoPlay muted loop playsInline>
                <source src="https://image2url.com/r2/default/videos/1772716102573-be632a4c-6946-44ec-bcb4-1dd7e4d028a9.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">Comprehensive Dental Solutions</h2>
          <p className="section-subhead">I offer a full suite of dental treatments to keep your teeth healthy and your smile bright.</p>
          
          <div className="services-grid">
            {/* Discounted Consultations */}
            <div className="service-card">
              <div className="service-image loading">
                <img 
                  src="https://image2url.com/r2/default/images/1772933454875-5408d445-0d50-493c-bd2a-c85d1d713743.jpg" 
                  alt="Discounted dental consultation"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError} />
                <div className="error-message">
                  <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                  Image unavailable
                </div>
              </div>
              <div className="service-content">
                <h3>Discounted Consultations</h3>
                <p>Professional dental advice and examinations at affordable rates to get you started on your oral health journey.</p>
                <button className="service-btn" onClick={() => handleBookNow('Consultation')}>Book appointment</button>
              </div>
            </div>
            
            {/* Scaling and Polishing */}
            <div className="service-card">
              <div className="service-image loading">
                <img 
                  src="https://image2url.com/r2/default/images/1772933737652-95451b6d-46b1-4f48-89b9-816a220e3fa2.jpg" 
                  alt="Scaling and polishing dental procedure"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError} />
                <div className="error-message">
                  <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                  Image unavailable
                </div>
              </div>
              <div className="service-content">
                <h3>Scaling and Polishing</h3>
                <p>Professional cleaning to remove plaque and tartar, preventing gum disease and leaving your teeth smooth and fresh.</p>
                <button className="service-btn" onClick={() => handleBookNow('Scaling and Polishing')}>Book appointment</button>
              </div>
            </div>
            
            {/* Teeth Whitening */}
            <div className="service-card">
              <div className="service-image loading">
                <img 
                  src="https://image2url.com/r2/default/images/1772933897946-80c92104-5181-4b65-a3d5-b2ab7f155047.jpg" 
                  alt="Teeth whitening treatment"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError} />
                <div className="error-message">
                  <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                  Image unavailable
                </div>
              </div>
              <div className="service-content">
                <h3>Teeth Whitening</h3>
                <p>Advanced whitening treatments to brighten your smile by several shades and remove stubborn stains effectively.</p>
                <button className="service-btn" onClick={() => handleBookNow('Teeth Whitening')}>Book appointment</button>
              </div>
            </div>
            
            {/* Crowns & RCTs */}
            <div className="service-card">
              <div className="service-image loading">
                <img 
                  src="https://image2url.com/r2/default/images/1772933985462-659a1692-bbc3-4b09-a8fd-2c0ae95ee647.jpg" 
                  alt="Dental crown and root canal treatment"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError} />
                <div className="error-message">
                  <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                  Image unavailable
                </div>
              </div>
              <div className="service-content">
                <h3>Crowns & RCTs</h3>
                <p>Restorative solutions to save damaged teeth and restore their natural function, strength, and appearance.</p>
                <button className="service-btn" onClick={() => handleBookNow('Crown / RCT')}>Book appointment</button>
              </div>
            </div>
            
            {/* General Procedures */}
            <div className="service-card">
              <div className="service-image loading">
                <img 
                  src="https://image2url.com/r2/default/images/1772955501327-30f1e658-7e21-4a9e-b5dc-0e2b66395f1b.jpg" 
                  alt="General dental procedures"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError} />
                <div className="error-message">
                  <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                  Image unavailable
                </div>
              </div>
              <div className="service-content">
                <h3>General Procedures</h3>
                <p>Fillings, extractions, and specialized treatments – comprehensive care for all your dental needs in one place.</p>
                <button className="service-btn" onClick={() => handleBookNow('General checkup')}>Book appointment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why" className="section">
        <div className="container">
          <h2 className="section-title">The Smile Royale Advantage</h2>
          <div className="advantage-grid">
            <div className="advantage-card">
              <i className="fas fa-heart"></i>
              <h4>Passion-Driven Care</h4>
              <p>"Your Smile is My Passion." I care about the person behind the teeth.</p>
            </div>
            <div className="advantage-card">
              <i className="fas fa-user-md"></i>
              <h4>Expert Dentist</h4>
              <p>Highly skilled professional dedicated to the latest dental practices.</p>
            </div>
            <div className="advantage-card">
              <i className="fas fa-coins"></i>
              <h4>Affordable Excellence</h4>
              <p>Quality dental care accessible to all – discounted consultations.</p>
            </div>
            <div className="advantage-card">
              <i className="fas fa-clinic-medical"></i>
              <h4>Comprehensive Care</h4>
              <p>From preventive care to restorative surgery, your one-stop shop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section id="doctor" className="section" style={{ background: 'var(--pure-white)' }}>
        <div className="container">
          <h2 className="section-title">Meet Your Dentist</h2>
          <p className="section-subhead">Expert care with a personal touch</p>
          
          <div className="doctor-grid">
            <div className="doctor-image">
              <img 
                src="https://image2url.com/r2/default/images/1772889924884-a9da39dc-856d-4411-aac2-f3f59a7e3884.jpg" 
                alt="Dr. Farouk Adebiyi"
                loading="lazy" />
            </div>
            
            <div className="doctor-info">
              <h2 className="doctor-name">Dr. Farouk Adebiyi</h2>
              <div className="doctor-title">Dentist | Founder, Smile Royale Dental Home</div>
              
              <p className="doctor-bio">Dr. Farouk Adebiyi is a dedicated Dental Surgeon and the visionary founder of Smile Royale Dental Home. With a passion for blending clinical excellence with modern digital engagement, he has established himself as a prominent voice in Nigerian dentistry.</p>
              
              <p className="doctor-bio">Dr. Adebiyi is widely recognized for his work as an oral health influencer, using his platform to demystify dental procedures and promote preventive care to a global audience. His unique background as a Digital Product Manager allows him to integrate technology-driven solutions into patient care, ensuring a seamless end-to-end journey.</p>
              
              <div className="expertise-grid">
                <div className="expertise-item">
                  <h4>Preventive Dentistry</h4>
                  <p>Dedicated to educating patients on long-term oral hygiene</p>
                </div>
                <div className="expertise-item">
                  <h4>Restorative Procedures</h4>
                  <p>Skilled in restoring both function and aesthetics to your smile</p>
                </div>
                <div className="expertise-item">
                  <h4>Oral Health Advocacy</h4>
                  <p>Leading digital campaigns for dental literacy and accessibility</p>
                </div>
              </div>
              
              <div className="membership">
                <i className="fas fa-certificate"></i> Inducted Member: Medical and Dental Council of Nigeria (MDCN)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">Smile Transformations</h2>
          <p className="section-subhead">Real results from our happy patients</p>
          
          <div className="testimonials-grid">
            <div className="testimonials-item">
              <video className="testimonials-video" autoPlay muted loop playsInline>
                <source src="https://image2url.com/r2/default/videos/1772888015053-2c6f0de0-f226-40da-9b5a-6c625bccfaa7.mp4" type="video/mp4" />
              </video>
              <div className="testimonials-caption">
                <h4>Teeth Whitening</h4>
                <p>Before & After</p>
              </div>
            </div>
            
            <div className="testimonials-item">
              <video className="testimonials-video" autoPlay muted loop playsInline>
                <source src="https://image2url.com/r2/default/videos/1772888063863-6b5271e1-81da-432c-86cc-c34dfadced3b.mp4" type="video/mp4" />
              </video>
              <div className="testimonials-caption">
                <h4>Smile Makeover</h4>
                <p>Before & After</p>
              </div>
            </div>
          </div>
          
          <div className="testimonials-grid" style={{ marginTop: '2rem' }}>
            <div className="testimonials-item" style={{ gridColumn: '1/-1', maxWidth: '600px', margin: '0 auto' }}>
              <img 
                src="https://image2url.com/r2/default/images/1772887670391-d8bfbae1-a8b6-4617-86a3-1991a4185400.jpg" 
                alt="Dental transformation before and after" 
                className="gallery-image"
                loading="lazy" />
              <div className="testimonials-caption">
                <h4>Complete Restoration</h4>
                <p>Before & After</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="section" style={{ background: '#f2f6fc' }}>
        <div className="container">
          <h2 className="section-title">Book an Appointment</h2>
          <div className="booking-grid">
            <div className="booking-info">
              <h3>Ready to Transform Your Smile?</h3>
              <p>Don't wait for a dental emergency. Schedule your visit with me today and experience the Smile Royale difference.</p>
              <a href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services." target="_blank" rel="noopener noreferrer" className="booking-highlight">
                <i className="fab fa-whatsapp"></i> 08103564479
              </a>
            </div>
            <div className="booking-form">
              <form onSubmit={sendToWhatsApp}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" id="waName" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" id="waPhone" placeholder="Your phone number" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <select id="waService" value={selectedService} onChange={handleServiceChange} required>
                    <option value="" disabled>Select a service</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Scaling and Polishing">Scaling and Polishing</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                    <option value="Crown / RCT">Crown / RCT</option>
                    <option value="General checkup">General checkup</option>
                    <option value="Other">Other (please specify)</option>
                  </select>
                </div>
                {showOther && (
                  <div className="form-group">
                    <label className="form-label">Describe your needs</label>
                    <textarea id="waOtherText" placeholder="Please describe the service you need" rows={2}></textarea>
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Select Date</label>
                  <input type="date" id="waDate" required />
                </div>
                <button type="submit" className="btn-submit">Confirm Appointment</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="main">SMILE ROYALE</span>
                <span className="sub">Your Smile. Our Passion. Our Pride.</span>
              </div>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <i className="fab fa-whatsapp"></i>
                  <a href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services." target="_blank" rel="noopener noreferrer">08103564479</a>
                </div>
                <div className="footer-contact-item">
                  <i className="fab fa-instagram"></i>
                  <a href="https://www.instagram.com/smileroyale.ng?igsh=MW55NHI5cGNxejFpdw==" target="_blank" rel="noopener noreferrer">@smileroyale.ng</a>
                </div>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#why">Why Us</a></li>
                <li><a href="#doctor">Our Dentist</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#booking">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-social">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a href="https://www.instagram.com/smileroyale.ng?igsh=MW55NHI5cGNxejFpdw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/2348103564479?text=Hello%20Smile%20Royale%2C%20I%20would%20like%20to%20make%20enquiries%20about%20your%20dental%20services." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
              <a href="https://www.instagram.com/smileroyale.ng?igsh=MW55NHI5cGNxejFpdw==" target="_blank" rel="noopener noreferrer" className="footer-instagram">@smileroyale.ng</a>
            </div>
          </div>
          
          <div className="copyright">
            <p>© 2026 Smile Royale Dental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App