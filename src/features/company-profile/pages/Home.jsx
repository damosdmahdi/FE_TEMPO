import React from 'react';
import { Navbar, Button, NewsCard, GalleryCard, Typography, Footer, TextCard, AboutGraphic, ArrowUpRightIcon, IdeaIcon, WorkIcon, TrophyIcon, YellowStarIcon }  from 'hmik-project-storybook';
import 'hmik-project-storybook/dist/hmik-project-storybook.css';
import './Home.css';
import heroImg from '../../../assets/hero.png';
import vollyImg from '../../../assets/hero.png';

import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgramKerja } from '../api/useProgramKerja';

// Motion.dev / Framer Motion Variants for Route Transitions
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 40, 
    scale: 0.98,
    filter: 'blur(3px)'
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 0.98,
    filter: 'blur(3px)',
    transition: { 
      duration: 0.28, 
      ease: [0.4, 0, 1, 1] 
    } 
  }
};

const heroVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 18, delay: 0.1 } }
};

const sectionRevealVariants = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  viewport: { once: true, amount: 0.2 }
};

const containerStaggerVariants = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
  },
  viewport: { once: true, amount: 0.2 }
};

const cardItemVariants = {
  initial: { opacity: 0, y: 25, scale: 0.96 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 220, damping: 18 } 
  }
};

function Home() {
  const navigate = useNavigate();

  // Hero Background Carousel State (Cloudinary CDN URLs)
  const heroImages = [
    'https://res.cloudinary.com/du9sbnbx9/image/upload/v1789290289/hmik/cp/asset/hero/nnrzdmurx77pm2g7kkkj.webp',
    'https://res.cloudinary.com/du9sbnbx9/image/upload/v1789290355/hmik/cp/asset/hero/hero2.webp',
    'https://res.cloudinary.com/du9sbnbx9/image/upload/v1789290306/hmik/cp/asset/hero/tgqreb3k9towejv2jjkd.webp'
  ];
  const [heroIndex, setHeroIndex] = React.useState(0);

  React.useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fetch Program Kerja Live API dari Azure
  const { data: prokerMendatangData, isLoading: isLoadingMendatang } = useProgramKerja('?status=Mendatang');
  const { data: prokerUnggulanData, isLoading: isLoadingUnggulan } = useProgramKerja('?is_unggulan=true');

  const prokerMendatang = Array.isArray(prokerMendatangData) ? prokerMendatangData : [];
  const prokerUnggulan = Array.isArray(prokerUnggulanData) ? prokerUnggulanData : [];

  const handleMenuClick = (item) => {
    if (item === 'Beranda') window.scrollTo(0, 0);
    if (item === 'Tentang Kami') navigate('/tentang-kami');
    if (item === 'Departemen') navigate('/departemen/academy-up');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'DD/MM/YYYY';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'DD/MM/YYYY';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      return 'DD/MM/YYYY';
    }
  };

  return (
    <motion.div 
      className="homepage-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar activeMenu="Beranda" onMenuClick={handleMenuClick} />

      {/* Hero Section dengan Background Carousel Smooth Fade & Dark Gradient Overlay */}
      <section className="hero-section">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroIndex}
            className="hero-bg-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
          />
        </AnimatePresence>
        <motion.div className="hero-content" variants={heroVariants}>
          <Typography variant="heading1" color="white" weight="bold">
            Himpunan Mahasiswa<br/>Ilmu Komputer<br/>Universitas Pertamina
          </Typography>
          <motion.div 
            whileHover={{ scale: 1.05, x: 4, y: -4 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ width: 'fit-content' }}
          >
            <Button variant="primary" className="hero-button" onClick={() => navigate('/tentang-kami')}>
              Pelajari Lebih Lanjut <ArrowUpRightIcon />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        className="about-section"
        {...sectionRevealVariants}
      >
        <div className="about-grid">
          <motion.div 
            className="about-left"
            whileHover={{ scale: 1.04, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <AboutGraphic />
          </motion.div>
          <div className="about-right">
            <TextCard title="Tentang HMIK UPER" icon={<IdeaIcon />}>
              "Himpunan Mahasiswa Ilmu Komputer Universitas Pertamina (HMIK UPER) adalah organisasi mahasiswa yang berdedikasi untuk mengembangkan potensi akademis, kepemimpinan, riset teknologi, dan hubungan kekeluargaan antar mahasiswa Ilmu Komputer Universitas Pertamina."
            </TextCard>
          </div>
        </div>
      </motion.section>

      {/* Section: Program Kerja Mendatang */}
      <motion.section 
        className="section-container bg-dark-blue"
        {...sectionRevealVariants}
      >
        <div className="section-header">
          <Typography variant="heading2" color="white" weight="bold" className="title-with-icon">
            Program Kerja Mendatang <WorkIcon />
          </Typography>
        </div>
        
        {isLoadingMendatang ? (
          <Typography variant="body" color="white">Memuat program kerja mendatang...</Typography>
        ) : prokerMendatang.length === 0 ? (
          <div className="empty-proker-box">
            <Typography variant="body" color="white">Belum ada program kerja mendatang.</Typography>
          </div>
        ) : (
          <motion.div 
            className="card-grid"
            variants={containerStaggerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            {prokerMendatang.map((item, idx) => (
              <motion.div 
                key={item.id_proker || idx}
                variants={cardItemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <NewsCard 
                  title={item.nama_proker || 'Program Kerja'}
                  date={formatDate(item.dibuat_pada)}
                  image={item.foto && item.foto.trim() !== '' ? item.foto : vollyImg}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      {/* Section: Program Kerja Unggulan */}
      <motion.section 
        className="section-container bg-light-gray"
        {...sectionRevealVariants}
      >
        <div className="section-header">
          <Typography variant="heading2" color="black" weight="bold" className="title-with-icon">
            Program Kerja Unggulan <TrophyIcon />
          </Typography>
        </div>
        
        <div className="card-grid relative-grid">
          <motion.div 
            className="star-decoration"
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <YellowStarIcon width={40} height={40} />
          </motion.div>
          {isLoadingUnggulan ? (
            <Typography variant="body" color="black">Memuat program kerja unggulan...</Typography>
          ) : prokerUnggulan.length === 0 ? (
            <div className="empty-proker-box">
              <Typography variant="body" color="black">Belum ada program kerja unggulan.</Typography>
            </div>
          ) : (
            <motion.div 
              className="card-grid"
              variants={containerStaggerVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {prokerUnggulan.map((item, idx) => (
                <motion.div 
                  key={item.id_proker || idx}
                  variants={cardItemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <GalleryCard 
                    variant="overlay"
                    title={item.nama_proker || 'Program Unggulan'}
                    image={item.foto && item.foto.trim() !== '' ? item.foto : vollyImg}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>
      
      <Footer />
    </motion.div>
  );
}

export default Home;