/* Your JS here. */
// Main JavaScript functionality
// Portfolio Website JavaScript Functionality
// Portfolio Website JavaScript Functionality
class PortfolioWebsite {
    constructor() {
        this.currentCarouselSlide = 0;
        this.totalCarouselSlides = 3;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Hide modal on initial load
        const modal = document.getElementById('portfolio-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }

        // Scroll event
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updatePositionIndicator();
        });

        // Navigation click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const navbar = document.getElementById('navbar');
                    const offset = navbar.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Portfolio item click
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openPortfolioModal(index + 1);
            });
        });

        // Modal close event
        const modalClose = document.getElementById('modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }

        // Click outside modal to close
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Download button click
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert('Resume download started!');
            });
        }

        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Scroll animation setup
        this.setupScrollAnimations();

        // Carousel controls
        const carouselPrev = document.getElementById('carousel-prev');
        const carouselNext = document.getElementById('carousel-next');
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => this.previousCarouselSlide());
        }
        
        if (carouselNext) {
            carouselNext.addEventListener('click', () => this.nextCarouselSlide());
        }

        // Carousel indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToCarouselSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousCarouselSlide();
            if (e.key === 'ArrowRight') this.nextCarouselSlide();
            if (e.key === 'Escape') this.closeModal();
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        
        // Navbar resizing on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');
        const scrollPos = window.scrollY + navbar.offsetHeight + 50;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Handle bottom of page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    updatePositionIndicator() {
        const indicator = document.querySelector('.position-indicator');
        const activeLink = document.querySelector('.nav-link.active');
        const navbar = document.querySelector('.nav-container');
        
        if (activeLink && navbar) {
            const navRect = navbar.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            const left = linkRect.left - navRect.left;
            const width = linkRect.width;
            
            indicator.style.left = `${left}px`;
            indicator.style.width = `${width}px`;
        }
    }

    openPortfolioModal(itemNumber) {
        const modal = document.getElementById('portfolio-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        const modalImageContainer = document.querySelector('.modal-image'); 
        
        const portfolioData = {
            1: { title: 'Education', 
                description: 'University of Illinois Urbana-Champaign<br>Master of Science in Information Management', 
                image: 'assets/portfolio1.png' 
            },
            2: { 
                title: 'Data Science',
                description: 'Specialized in statistical analysis, data visualization, and predictive modeling. Experienced with Python, R, SQL, and machine learning libraries like scikit-learn and pandas. Skilled in extracting insights from complex datasets and presenting findings through compelling visualizations.',
                image: 'assets/portfolio2.jpeg'
            },
            3: { 
                title: 'Data Engineering',
                description: 'Proficient in building scalable data pipelines, ETL processes, and cloud-based data infrastructure. Experienced with Apache Spark, Kafka, Airflow, and cloud platforms like AWS and Azure. Focus on data quality, reliability, and real-time processing systems.',
                image: 'assets/portfolio3.png'
            },
            4: { 
                title: 'Machine Learning',
                description: 'Developed predictive models and AI solutions using deep learning frameworks like TensorFlow and PyTorch. Experience in computer vision, natural language processing, and recommendation systems. Applied ML techniques to solve real-world business problems.',
                image: 'assets/portfolio4.jpeg'
            },
            5: { 
                title: 'Hobby',
                description: 'Passionate about anime culture, photography capturing life\'s beautiful moments, outdoor adventures including hiking and camping, and traveling to explore different cultures and cuisines around the world.',
                image: 'assets/portfolio5.jpeg'
            },
            6: { title: 'Work Experience', 
                description: 'Data Engineer Intern at Alibaba Group. Led search analysis projects for 8 merchants, built classification systems using TF-IDF and N-gram techniques, and developed real-time ETL pipelines with Apache Paimon + Flink, improving data accuracy by 12%.',
                image: 'assets/portfolio6.png' 
            }
        };
        
        if (modalTitle && modalDescription && modalImage && portfolioData[itemNumber]) {
            modalTitle.textContent = portfolioData[itemNumber].title;
            modalDescription.innerHTML = portfolioData[itemNumber].description;
            modalImage.src = portfolioData[itemNumber].image;
            modalImage.alt = portfolioData[itemNumber].title;

            // Show image container
            if (modalImageContainer) {
                modalImageContainer.style.display = 'block';
            }
        }
        
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('portfolio-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    handleFormSubmission() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert(`Thank you ${name}! Your message has been sent successfully.`);
            
            // Reset form
            document.querySelector('.contact-form').reset();
        } else {
            alert('Please fill in all required fields.');
        }
    }

    setupScrollAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.style.animationFillMode = 'both';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe portfolio items for stagger animation
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(item);
            
            // Add hover animation enhancement
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Animate portfolio items when they come into view
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });

        const portfolioSection = document.querySelector('.portfolio-section');
        if (portfolioSection) {
            portfolioObserver.observe(portfolioSection);
        }
    }

    updateNavigation() {
        // Initial setup for position indicator
        setTimeout(() => {
            this.updatePositionIndicator();
        }, 100);
    }

    nextCarouselSlide() {
        this.currentCarouselSlide = (this.currentCarouselSlide + 1) % this.totalCarouselSlides;
        this.updateCarouselDisplay();
    }

    previousCarouselSlide() {
        this.currentCarouselSlide = this.currentCarouselSlide === 0 ? 
            this.totalCarouselSlides - 1 : this.currentCarouselSlide - 1;
        this.updateCarouselDisplay();
    }

    goToCarouselSlide(slideIndex) {
        this.currentCarouselSlide = slideIndex;
        this.updateCarouselDisplay();
    }

    updateCarouselDisplay() {
        const track = document.getElementById('carousel-track');
        const indicators = document.querySelectorAll('.indicator');
        
        if (track) {
            const translateX = -this.currentCarouselSlide * 33.333;
            track.style.transform = `translateX(${translateX}%)`;
        }
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentCarouselSlide);
        });
    }
}

// Initialize website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioWebsite = new PortfolioWebsite();
});

// Additional smooth scrolling for any anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.getElementById('navbar');
                const offset = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Parallax effect for background section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.bg-image-section');
    if (parallaxElement) {
        const rate = scrolled * -0.3;
        parallaxElement.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-section .hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
});