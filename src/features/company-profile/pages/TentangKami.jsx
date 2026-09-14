import React from 'react';
import { 
  Navbar, 
  Footer, 
  Typography, 
  TapeCard, 
  SearchIcon, 
  LogoHmikKotak, 
  LogoHmikLingkaran, 
  LogoHmik,
  PeopleIcon, 
  DepartemenIcon, 
  AboutusTitleIcon,
  NewsCard 
} from 'hmik-project-storybook';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'hmik-project-storybook/dist/hmik-project-storybook.css';
import './TentangKami.css';

import { useTeam } from '../api/useTeam';
import defaultDeptImg from '../../../assets/dept.png';

// Framer Motion / Motion.dev Variants for Route Transitions
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

const sectionReveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } },
  viewport: { once: true, amount: 0.2 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
  },
  viewport: { once: true, amount: 0.2 }
};

const popItem = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 220, damping: 18 } 
  }
};

function TentangKami() {
  const navigate = useNavigate();
  const { data: teamData, isLoading } = useTeam();

  const handleMenuClick = (item) => {
    if (item === 'Beranda') navigate('/');
    if (item === 'Tentang Kami') window.scrollTo(0, 0);
    if (item === 'Departemen') navigate('/departemen/academy-up');
  };

  // Helper untuk membuat avatar netral berpenampilan rapi jika foto belum diunggah
  const getAvatarFallback = (name) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'HMIK Member')}`;
  };

  // Helper untuk memfilter data pengurus berdasarkan Jabatan
  const getPerson = (roleTitle, fallbackName) => {
    if (!teamData || !Array.isArray(teamData)) {
      return {
        title: isLoading ? 'Memuat...' : fallbackName,
        subtitle: roleTitle,
        image: getAvatarFallback(fallbackName),
      };
    }
    const found = teamData.find(
      (item) => (item.Jabatan || item.jabatan || '').toLowerCase().trim() === roleTitle.toLowerCase().trim()
    );
    if (!found) {
      return {
        title: fallbackName,
        subtitle: roleTitle,
        image: getAvatarFallback(fallbackName),
      };
    }
    const name = found.Pengguna?.NamaLengkap || found.Pengguna?.nama_lengkap || fallbackName;
    const photo = found.Pengguna?.FotoPengguna || found.Pengguna?.foto_pengguna || getAvatarFallback(name);
    return {
      title: name,
      subtitle: found.Jabatan || found.jabatan || roleTitle,
      image: photo,
    };
  };

  const ketua = getPerson('Ketua Himpunan', 'Raihan Putra Akbar');
  const wakil = getPerson('Wakil Ketua Himpunan', 'Nabil Hafizuddin Azizi');
  const sekre1 = getPerson('Sekretaris 1', 'Vania Yusriyah');
  const sekre2 = getPerson('Sekretaris 2', 'Alifa Fathin Ramadhani');
  const bendahara1 = getPerson('Bendahara 1', 'Umran Zuhdy CH Bourlyn');
  const bendahara2 = getPerson('Bendahara 2', 'Neila Faaizah Asynur');

  return (
    <motion.div 
      className="tentangkami-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar activeMenu="Tentang Kami" onMenuClick={handleMenuClick} />

      {/* SECTION 1: Visi & Misi */}
      <motion.section 
        className="section-container about-header-section"
        {...sectionReveal}
      >
        <motion.div 
          className="about-title-container"
          whileHover={{ scale: 1.03, rotate: -1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <AboutusTitleIcon width={500} height="auto" />
        </motion.div>

        <motion.div 
          className="tape-cards-container"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={popItem} whileHover={{ y: -8, rotate: -1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <TapeCard title="Visi" variant="blue" tapeType="1">
              "Menjadi himpunan mahasiswa yang memiliki solidaritas tinggi dan bergerak aktif sesuai dengan nilai-nilai Universitas Pertamina."
            </TapeCard>
          </motion.div>
          
          <motion.div variants={popItem} whileHover={{ y: -8, rotate: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <TapeCard title="Misi" variant="yellow" tapeType="2">
              <ul>
                <li>Turut serta dalam berbagai kegiatan yang diselenggarakan oleh UPer.</li>
                <li>Melakukan kegiatan yang dapat melatih soft-skill, hard-skill, maupun life-skill.</li>
                <li>Menjunjung tinggi nilai-nilai Universitas Pertamina dalam setiap kegiatan himpunan.</li>
              </ul>
            </TapeCard>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SECTION 2: Filosofi Logo */}
      <motion.section 
        className="section-container bg-light-gray filosofi-section"
        {...sectionReveal}
      >
        <div className="section-header filosofi-header">
          <Typography variant="heading1">Filosofi Logo</Typography>
          <SearchIcon width={56} height={56} />
        </div>

        <div className="filosofi-grid-container">
          {/* Row 1 */}
          <motion.div className="info-card" whileHover={{ x: 4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Typography variant="body">
              <strong>Lingkaran</strong> terluar terdiri dari dua panah yang saling
              menyambung melambangkan kesinambungan relasi antar
              mahasiswa Ilmu Komputer.
            </Typography>
          </motion.div>
          <motion.div className="filosofi-graphic-item" whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 250 }}>
            <LogoHmikLingkaran width={180} height={180} className="responsive-svg" />
          </motion.div>

          {/* Row 2 */}
          <motion.div className="info-card" whileHover={{ x: 4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Typography variant="body">
              <strong>Tiga kotak</strong> melambangkan 3 pilar kemahasiswaan. Kotak di
              atas merupakan hubungan dengan masyarakat, kotak di kiri
              bawah menggambarkan ikatan dengan pihak internal
              himpunan, kotak di kanan bawah menggambarkan ikatan
              dengan program studi dan universitas.
            </Typography>
          </motion.div>
          <motion.div className="filosofi-graphic-item" whileHover={{ rotate: -15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 250 }}>
            <LogoHmikKotak width={180} height={180} className="responsive-svg" />
          </motion.div>

          {/* Logo Utama */}
          <motion.div 
            className="filosofi-main-logo"
            whileHover={{ scale: 1.06, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          >
             <LogoHmik width={380} height={380} className="responsive-svg" />
          </motion.div>

          {/* Row 3: Color Indicators */}
          <div className="color-indicators">
            <motion.div className="color-indicator-item" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="info-card info-card--small">
                <Typography variant="body">
                  <strong>Warna oranye</strong> melambangkan kreativitas dan inovasi.
                </Typography>
              </div>
              <motion.div className="color-circle bg-orange" whileHover={{ scale: 1.25, rotate: 15 }} transition={{ type: 'spring', stiffness: 400 }}></motion.div>
            </motion.div>

            <motion.div className="color-indicator-item" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="info-card info-card--small">
                <Typography variant="body">
                  <strong>Warna biru</strong> melambangkan wibawa dan kepercayaan.
                </Typography>
              </div>
              <motion.div className="color-circle bg-blue" whileHover={{ scale: 1.25, rotate: -15 }} transition={{ type: 'spring', stiffness: 400 }}></motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: Orang di Balik Layar */}
      <motion.section 
        className="section-container bg-light-gray padding-top-0"
        {...sectionReveal}
      >
        <div className="section-header">
          <Typography variant="heading1">Orang di Balik Layar</Typography>
          <PeopleIcon width={56} height={56} />
        </div>

        <motion.div 
          className="people-grid-container"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Ketua & Wakil (Besar) */}
          <div className="people-main">
            <motion.div variants={popItem} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <NewsCard 
                variant="profile"
                title={ketua.title}
                subtitle={ketua.subtitle}
                image={ketua.image}
              />
            </motion.div>
            <motion.div variants={popItem} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <NewsCard 
                variant="profile"
                title={wakil.title}
                subtitle={wakil.subtitle}
                image={wakil.image}
              />
            </motion.div>
          </div>

          {/* Sekretaris & Bendahara (Kecil) */}
          <div className="people-staff">
            {[sekre1, sekre2, bendahara1, bendahara2].map((p, idx) => (
              <motion.div key={idx} variants={popItem} whileHover={{ y: -6, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <NewsCard variant="profile" title={p.title} subtitle={p.subtitle} image={p.image} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* SECTION 4: Departemen */}
      <motion.section 
        className="section-container bg-light-gray padding-top-0"
        {...sectionReveal}
      >
        <div className="section-header">
          <Typography variant="heading1">Departemen</Typography>
          <DepartemenIcon width={56} height={56} />
        </div>

        <motion.div 
          className="departemen-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { title: "Media Informasi", slug: "medinfo", desc: "Departemen HMIK UPER", img: defaultDeptImg },
            { title: "Academy Up", slug: "academy-up", desc: "Departemen HMIK UPER", img: defaultDeptImg },
            { 
              title: "Riset dan Teknologi", 
              slug: "ristek", 
              desc: "Divisi Riset dan Pengembangan Produk merupakan divisi yang dinaungi Departemen Riset...", 
              img: "https://res.cloudinary.com/du9sbnbx9/image/upload/v1789341936/hmik/cp/departemen/hczqgzv7cfg0npdvf3yw.png" 
            },
            { title: "Internal", slug: "internal", desc: "Departemen HMIK UPER", img: defaultDeptImg },
            { title: "Eksternal", slug: "eksternal", desc: "Departemen HMIK UPER", img: defaultDeptImg }
          ].map((dept, idx) => (
            <motion.div 
              key={idx} 
              variants={popItem}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <NewsCard 
                variant="departemen"
                title={dept.title}
                date={dept.desc}
                image={dept.img}
                onClick={() => navigate(`/departemen/${dept.slug}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default TentangKami;
