
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestimonialCarousel = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      quote: t('testimonial1Quote'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      quote: t('testimonial2Quote'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      quote: t('testimonial3Quote'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];
  
  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-medisync-light-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <Badge className="mb-4 bg-medisync-orange/10 text-medisync-dark-orange border-medisync-orange hover:bg-medisync-orange/20">
            {t('testimonials')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-medisync-black">
            {t('whatPeopleSay')}
          </h2>
          <p className="text-lg text-medisync-dark-gray max-w-3xl mx-auto">
            {t('hearFromOurUsers')}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full p-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-medisync-orange"
                        />
                      </div>
                      <div className="flex-1">
                        <blockquote>
                          <div className="text-5xl text-medisync-orange font-serif leading-none mb-4">"</div>
                          <p className="text-xl md:text-2xl italic text-medisync-black mb-6">
                            {testimonial.quote}
                          </p>
                          <footer className="text-right">
                            <p className="font-bold text-medisync-black">{testimonial.author}</p>
                            <p className="text-medisync-dark-gray">{testimonial.role}</p>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white border-medisync-orange text-medisync-orange hover:bg-medisync-orange/10"
              onClick={goToPrev}
            >
              <ChevronLeft size={20} />
              <span className="sr-only">Previous</span>
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index
                      ? 'bg-medisync-orange'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white border-medisync-orange text-medisync-orange hover:bg-medisync-orange/10"
              onClick={goToNext}
            >
              <ChevronRight size={20} />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
