
export const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 64; // Height of fixed navigation
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const handleContactClick = () => {
  smoothScrollToSection('contact');
};

export const handleServicesClick = () => {
  smoothScrollToSection('services');
};
