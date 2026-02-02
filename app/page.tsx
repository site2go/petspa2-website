"use client";

// Layout System
import { useLayoutConfig } from "@/components/LayoutContext";
import {
  getHeroComponent,
  getServicesComponent,
  getGalleryComponent,
} from "@/lib/layoutComponents";
import LayoutWrapper from "@/components/LayoutWrapper";

// Navigation
import NavTop from "@/components/Navigation/NavTop";
import StickyCtaBar from "@/components/Navigation/StickyCtaBar";

// Static Section Components (these don't have layout variants yet)
import AboutSplit from "@/components/About/AboutSplit";
import BeforeAfterGallery from "@/components/Comparison/BeforeAfterGallery";
import TeamShowcase from "@/components/Team/TeamShowcase";
import TestimonialsCarousel from "@/components/Testimonials/TestimonialsCarousel";
import ContactSplit from "@/components/Contact/ContactSplit";
import FooterSimple from "@/components/Footer/FooterSimple";

// ============================================================================
// DATA FROM content.json, images.json, architecture.json
// ============================================================================

// Navigation
const navigation = {
  logo: { text: "PetSPA2", href: "/" },
  links: [
    { label: "Acasa", href: "#" },
    { label: "Servicii", href: "#services" },
    { label: "Despre", href: "#about" },
    { label: "Galerie", href: "#gallery" },
    { label: "Echipa", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Programeaza", href: "#contact" },
};

// Hero content
const hero = {
  headline: "Unde Animalutul Tau Primeste Ingrijire de Exceptie",
  subheadline: "Salon profesional de grooming pentru caini si pisici. Blandate, experienta si rezultate impecabile pentru prietenul tau patruped.",
  backgroundImage: "https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg",
  backgroundImageAlt: "Caine fericit si bine ingrijit la salon de grooming",
  primaryCTA: { label: "Programeaza Acum", href: "#contact" },
  secondaryCTA: { label: "Vezi Serviciile", href: "#services" },
};

// Services content
const services = {
  title: "Serviciile Noastre",
  subtitle: "Ingrijire profesionala completa pentru animalul tau de companie",
  items: [
    {
      title: "Toaletaj Complet",
      description: "Pachet complet de ingrijire: baie, tuns, uscare, periere si finisare pentru un look impecabil.",
      iconName: "Scissors",
    },
    {
      title: "Baie si Spalare",
      description: "Baie relaxanta cu sampoane profesionale adaptate tipului de blana al animalutului tau.",
      iconName: "Droplets",
    },
    {
      title: "Tuns si Coafat",
      description: "Tunsori profesionale adaptate standardului rasei sau stilizare personalizata dupa preferintele tale.",
      iconName: "Sparkles",
    },
    {
      title: "Ingrijire Unghii si Urechi",
      description: "Taiere unghii si curatare delicata a urechilor pentru sanatatea si confortul animalului.",
      iconName: "Heart",
    },
    {
      title: "Tratamente SPA",
      description: "Tratamente speciale: masaj, hidratare blana, aromaterapie pentru o experienta de rasfat completa.",
      iconName: "Star",
    },
    {
      title: "Grooming Pisici",
      description: "Servicii specializate pentru felini cu abordare delicata pentru pisicile anxioase sau sensibile.",
      iconName: "Cat",
    },
  ],
};

// About content
const about = {
  title: "Despre PetSPA2",
  paragraphs: [
    "PetSPA2 s-a nascut din dragostea profunda pentru animale si dorinta de a oferi servicii de grooming la cele mai inalte standarde. Echipa noastra de specialisti trateaza fiecare animal cu blandetea si rabdarea pe care o merita.",
    "Folosim doar produse profesionale premium, sigure si delicate pentru pielea si blana animalelor. Fara stres, fara anestezie - doar ingrijire atenta si rezultate spectaculoase. La noi, fiecare patruped este tratat ca un membru al familiei.",
  ],
  image: "https://images.pexels.com/photos/6131557/pexels-photo-6131557.jpeg",
  imageAlt: "Groomer profesionist ingrijind un caine cu dragoste",
  stats: [
    { value: "500+", label: "Animale Fericite" },
    { value: "8+", label: "Ani Experienta" },
    { value: "100%", label: "Satisfactie" },
  ],
};

// Gallery content
const gallery = {
  title: "Galeria Transformarilor",
  subtitle: "Vezi rezultatele ingrijirii noastre profesionale",
  items: [
    {
      src: "https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg",
      alt: "Poodle alb dupa tunsoare profesionala",
      caption: "Luna dupa o sedinta completa de toaletaj",
      category: "transformari",
    },
    {
      src: "https://images.pexels.com/photos/5731875/pexels-photo-5731875.jpeg",
      alt: "Golden retriever ingrijit profesional",
      caption: "Max - tunsoare de vara perfecta",
      category: "transformari",
    },
    {
      src: "https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg",
      alt: "Bichon Frise cu tunsoare eleganta",
      caption: "Bella - stilizare eleganta pentru Bichon",
      category: "rase",
    },
    {
      src: "https://images.pexels.com/photos/5731877/pexels-photo-5731877.jpeg",
      alt: "Interior modern salon grooming",
      caption: "Salonul nostru modern si primitor",
      category: "salon",
    },
    {
      src: "https://images.pexels.com/photos/6131007/pexels-photo-6131007.jpeg",
      alt: "Caine mare dupa sesiune de grooming",
      caption: "Rocky - transformare spectaculoasa",
      category: "transformari",
    },
    {
      src: "https://images.pexels.com/photos/5731870/pexels-photo-5731870.jpeg",
      alt: "Yorkshire terrier bine ingrijit",
      caption: "Pufi - grooming delicat pentru pisici",
      category: "rase",
    },
  ],
  categories: ["transformari", "rase", "salon"],
};

// Transformations (Before/After)
const transformations = {
  title: "Transformari Spectaculoase",
  subtitle: "Vezi diferenta pe care o face ingrijirea profesionala",
  items: [
    {
      beforeImage: "https://images.pexels.com/photos/5731873/pexels-photo-5731873.jpeg",
      afterImage: "https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg",
      beforeLabel: "Inainte",
      afterLabel: "Dupa",
      caption: "Fluffy - Toaletaj complet Poodle",
      category: "toaletaj-complet",
    },
    {
      beforeImage: "https://images.pexels.com/photos/5731871/pexels-photo-5731871.jpeg",
      afterImage: "https://images.pexels.com/photos/5731875/pexels-photo-5731875.jpeg",
      beforeLabel: "Inainte",
      afterLabel: "Dupa",
      caption: "Max - Tratament de desparosire",
      category: "desparosire",
    },
  ],
  categories: ["toaletaj-complet", "desparosire", "stilizare", "grooming-pisici"],
};

// Team content
const team = {
  title: "Echipa Noastra",
  subtitle: "Specialisti cu experienta si dragoste pentru animale",
  members: [
    {
      name: "Ana Marinescu",
      role: "Lead Groomer",
      image: "https://images.pexels.com/photos/6131561/pexels-photo-6131561.jpeg",
      bio: "Cu peste 8 ani de experienta in grooming profesional, Ana este specializata in tunsori de expozitie si tratamente speciale pentru toate rasele.",
      specialties: ["Tunsori Expozitie", "Rase Mari", "Tratamente SPA"],
    },
    {
      name: "Mihai Stanescu",
      role: "Groomer Senior",
      image: "https://images.pexels.com/photos/6131560/pexels-photo-6131560.jpeg",
      bio: "Mihai are un talent deosebit in lucrul cu animalele anxioase sau sensibile, folosind tehnici de calmare naturale.",
      specialties: ["Animale Sensibile", "Grooming Pisici", "Stilizare Creativa"],
    },
    {
      name: "Cristina Pavel",
      role: "Groomer Junior",
      image: "https://images.pexels.com/photos/6131559/pexels-photo-6131559.jpeg",
      bio: "Pasionata de animale din copilarie, Cristina aduce energie si entuziasm in fiecare sedinta de grooming.",
      specialties: ["Rase Mici", "Ingrijire Unghii", "Baie si Spalare"],
    },
  ],
};

// Testimonials content
const testimonials = {
  title: "Ce Spun Clientii Nostri",
  subtitle: "Pareri sincere de la iubitorii de animale care ne-au vizitat",
  items: [
    {
      quote: "Am ramas incantata de serviciile PetSPA2! Catelul nostru a fost tratat cu blandetea si a iesit superb. Personal profesionist si atent. Recomandam cu toata increderea!",
      name: "Maria Popescu",
      role: "Proprietar Golden Retriever",
      rating: 5,
    },
    {
      quote: "In sfarsit am gasit un salon care stie sa lucreze cu pisici. Motanul nostru Pufi a fost relaxat pe tot parcursul sedintei. Vom reveni cu siguranta!",
      name: "Andrei Ionescu",
      role: "Proprietar Pisica Persana",
      rating: 5,
    },
    {
      quote: "Preturi corecte pentru servicii de calitate exceptionale. Echipa este iubitoare de animale si se vede. Bichonul nostru abia asteapta sa revina!",
      name: "Elena Dumitrescu",
      role: "Proprietar Bichon",
      rating: 5,
    },
  ],
};

// Contact content
const contact = {
  title: "Programeaza o Vizita",
  description: "Suntem aici pentru prietenul tau patruped. Contacteaza-ne pentru programare sau orice intrebare legata de serviciile noastre de grooming.",
  contactInfo: {
    phone: "+40 700 000 000",
    email: "contact@petspa2.ro",
    address: "Str. Exemplu nr. 123, Bucuresti",
    hours: "Luni - Sambata: 09:00 - 19:00",
  },
};

// Footer content
const footer = {
  logo: "PetSPA2",
  tagline: "Grija si blandetea de care animalul tau are nevoie",
  copyright: "PetSPA2. Toate drepturile rezervate.",
  links: [
    { label: "Acasa", href: "#" },
    { label: "Servicii", href: "#services" },
    { label: "Despre Noi", href: "#about" },
    { label: "Galerie", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  contactInfo: {
    phone: "+40 700 000 000",
    email: "contact@petspa2.ro",
    address: "Str. Exemplu nr. 123, Bucuresti",
  },
  socialLinks: [
    { platform: "facebook" as const, url: "https://facebook.com/petspa2" },
    { platform: "instagram" as const, url: "https://instagram.com/petspa2" },
  ],
};

// Sticky CTA Bar
const stickyCtaBar = {
  primaryCta: { label: "Programeaza Grooming", href: "#contact" },
  secondaryCta: { label: "Suna Acum", href: "tel:+40700000000" },
  phone: "+40 700 000 000",
  showOnScroll: true,
};

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function Home() {
  // Get the current layout configuration
  const config = useLayoutConfig();

  // DYNAMIC COMPONENTS - These change based on the selected layout
  const HeroComponent = getHeroComponent(config.heroComponent);
  const ServicesComponent = getServicesComponent(config.servicesComponent);
  const GalleryComponent = getGalleryComponent(config.galleryComponent);

  return (
    <LayoutWrapper>
      {/* Navigation */}
      <NavTop
        logo={navigation.logo}
        links={navigation.links}
        cta={navigation.cta}
      />

      <main id="main-content">
        {/* Hero Section - DYNAMIC */}
        <HeroComponent
          headline={hero.headline}
          subheadline={hero.subheadline}
          backgroundImage={hero.backgroundImage}
          backgroundImageAlt={hero.backgroundImageAlt}
          primaryCTA={hero.primaryCTA}
          secondaryCTA={hero.secondaryCTA}
        />

        {/* Services Section - DYNAMIC */}
        <ServicesComponent
          title={services.title}
          subtitle={services.subtitle}
          services={services.items}
        />

        {/* About Section */}
        <AboutSplit
          title={about.title}
          paragraphs={about.paragraphs}
          image={about.image}
          imageAlt={about.imageAlt}
          stats={about.stats}
        />

        {/* Gallery Section - DYNAMIC */}
        <GalleryComponent
          title={gallery.title}
          subtitle={gallery.subtitle}
          items={gallery.items}
          categories={gallery.categories}
        />

        {/* Transformations (Before/After) Section */}
        <BeforeAfterGallery
          title={transformations.title}
          subtitle={transformations.subtitle}
          items={transformations.items}
          categories={transformations.categories}
        />

        {/* Team Section */}
        <TeamShowcase
          title={team.title}
          subtitle={team.subtitle}
          members={team.members}
          variant="grid"
        />

        {/* Testimonials Section */}
        <TestimonialsCarousel
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          testimonials={testimonials.items}
        />

        {/* Contact Section */}
        <ContactSplit
          title={contact.title}
          description={contact.description}
          contactInfo={contact.contactInfo}
        />
      </main>

      {/* Footer */}
      <FooterSimple
        logo={footer.logo}
        tagline={footer.tagline}
        copyright={footer.copyright}
        links={footer.links}
        contactInfo={footer.contactInfo}
        socialLinks={footer.socialLinks}
      />

      {/* Sticky CTA Bar */}
      <StickyCtaBar
        primaryCta={stickyCtaBar.primaryCta}
        secondaryCta={stickyCtaBar.secondaryCta}
        phone={stickyCtaBar.phone}
        showOnScroll={stickyCtaBar.showOnScroll}
      />
    </LayoutWrapper>
  );
}
