import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Navbar, 
  Footer, 
  Typography, 
  StructureIcon,
  AcademyupIcon,
  GearIcon,
  PeopleIcon,
  OrgChartNode,
  PengurusCard,
  CarouselCard,
  CrownIcon,
  NoteIcon,
  MoneyIcon,
  MedinfoIcon,
  RistekIcon,
  InternalIcon,
  EksternalIcon,
  SearchIcon
} from 'hmik-project-storybook';
import { useNavigate as useNav } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import 'hmik-project-storybook/dist/hmik-project-storybook.css';
import './Departemen.css';

import { useTeam } from '../api/useTeam';
import { useDepartemen } from '../api/useDepartemen';
import { DEPARTEMEN_CONFIG } from '../utils/departemenConfig';

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

const nodeHoverSpring = {
  whileHover: { scale: 1.12, y: -5 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 350, damping: 15 }
};

const sectionReveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } },
  viewport: { once: true, amount: 0.2 }
};

function Departemen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prokerIndex, setProkerIndex] = useState(0);

  const { data: teamData } = useTeam();
  const { data: deptListData } = useDepartemen();

  const deptList = useMemo(() => (Array.isArray(deptListData) ? deptListData : []), [deptListData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProkerIndex(0);
  }, [id]);

  const handleMenuClick = (item) => {
    if (item === 'Beranda') navigate('/');
    if (item === 'Tentang Kami') navigate('/tentang-kami');
    if (item === 'Departemen') window.scrollTo(0, 0);
  };

  const currentSlug = id ? id.toLowerCase() : 'academy-up';
  const currentDeptConfig = DEPARTEMEN_CONFIG[currentSlug] || DEPARTEMEN_CONFIG['academy-up'];

  // Match URL slug ke nama_departemen di database backend
  const activeDeptObj = useMemo(() => {
    if (!deptList || deptList.length === 0) return null;
    return deptList.find((d) => {
      const name = (d.nama_departemen || d.NamaDepartemen || '').toLowerCase().trim();
      if (currentSlug === 'medinfo') return name.includes('media') || name.includes('medinfo');
      if (currentSlug === 'academy-up') return name.includes('academy');
      if (currentSlug === 'ristek') return name.includes('riset') || name.includes('ristek');
      if (currentSlug === 'internal') return name.includes('internal');
      if (currentSlug === 'eksternal') return name.includes('eksternal');
      return false;
    });
  }, [deptList, currentSlug]);

  // Map icon SVG per departemen
  const deptIcons = {
    'medinfo': <MedinfoIcon width={56} height={56} />,
    'academy-up': <AcademyupIcon width={56} height={56} />,
    'ristek': <RistekIcon width={56} height={56} />,
    'internal': <InternalIcon width={56} height={56} />,
    'eksternal': <EksternalIcon width={56} height={56} />
  };

  const getAvatarFallback = (name) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Anggota HMIK')}`;
  };

  // Helper pencarian anggota berdasarkan Jabatan
  const findMemberByTitle = (title) => {
    if (!teamData || !Array.isArray(teamData)) return null;
    return teamData.find(
      (m) => (m.Jabatan || m.jabatan || '').toLowerCase().trim() === title.toLowerCase().trim()
    );
  };

  const filterMembersByTitle = (title) => {
    if (!teamData || !Array.isArray(teamData)) return [];
    return teamData.filter(
      (m) => (m.Jabatan || m.jabatan || '').toLowerCase().trim() === title.toLowerCase().trim()
    );
  };

  const kadepMember = findMemberByTitle(currentDeptConfig.kadepTitle);
  const sekdepMember = currentDeptConfig.sekdepTitle ? findMemberByTitle(currentDeptConfig.sekdepTitle) : null;

  // Program Kerja List dari API Backend (Fallback ke Dummy jika kosong)
  const dummyImg1 = 'data:image/svg+xml;utf8,<svg width="280" height="220" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="%23FF6B6B"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="white">Proker 1</text></svg>';

  const rawProkerApiList = activeDeptObj?.program_kerja || activeDeptObj?.ProgramKerja || [];

  const programKerjaList = useMemo(() => {
    if (rawProkerApiList && rawProkerApiList.length > 0) {
      return rawProkerApiList.map((p) => ({
        image: p.foto && p.foto.trim() !== '' ? p.foto : dummyImg1,
        title: p.nama_proker || 'Program Kerja Departemen',
        description: p.deskripsi || 'Melaksanakan program unggulan departemen untuk pengurus dan anggota.'
      }));
    }
    return [
      {
        image: dummyImg1,
        title: `Program Kerja Utama ${currentDeptConfig.title}`,
        description: "Melaksanakan program unggulan untuk mendukung pengembangan potensi anggota HMIK."
      }
    ];
  }, [rawProkerApiList, currentDeptConfig]);

  const handleNextProker = () => {
    setProkerIndex((prev) => (prev === programKerjaList.length - 1 ? 0 : prev + 1));
  };

  const handlePrevProker = () => {
    setProkerIndex((prev) => (prev === 0 ? programKerjaList.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      className="departemen-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar activeMenu="Departemen" onMenuClick={handleMenuClick} />

      {/* SECTION 1: Struktur Himpunan */}
      <motion.section 
        className="section-container bg-light-gray section-struktur"
        {...sectionReveal}
      >
        <div className="section-header-departemen">
          <div className="section-title-wrapper">
            <Typography variant="heading1">Struktur Himpunan</Typography>
            <StructureIcon width={56} height={56} />
          </div>
          <motion.button 
            className="cari-anggota-btn" 
            onClick={() => navigate('/cari-anggota')}
            whileHover={{ scale: 1.05, x: 2, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Cari Anggota <SearchIcon width={20} height={20} />
          </motion.button>
        </div>

        <div className="org-chart-container">
          <div className="org-tree">
            {/* Center Spine */}
            <div className="org-spine"></div>

            {/* Level 1: Ketua & Wakil */}
            <div className="org-row org-row-1">
              <motion.div {...nodeHoverSpring}>
                <OrgChartNode variant="rectangular" icon={<CrownIcon width={56} height={56} />} title="Ketua Himpunan" />
              </motion.div>
              
              <div className="org-wakil-wrapper">
                <motion.div {...nodeHoverSpring}>
                  <OrgChartNode variant="rectangular" icon={<CrownIcon width={56} height={56} />} title="Wakil Ketua Himpunan" />
                </motion.div>
              </div>
              
              <div className="org-line-bg org-line-row-1"></div>
            </div>

            {/* Level 2: Sekretaris & Bendahara */}
            <div className="org-row org-row-2">
              <motion.div {...nodeHoverSpring}><OrgChartNode variant="rectangular" icon={<NoteIcon width={56} height={56} />} title="Sekretaris 2" /></motion.div>
              <motion.div {...nodeHoverSpring}><OrgChartNode variant="rectangular" icon={<NoteIcon width={56} height={56} />} title="Sekretaris 1" /></motion.div>
              <div className="org-spacer"></div>
              <motion.div {...nodeHoverSpring}><OrgChartNode variant="rectangular" icon={<MoneyIcon width={56} height={56} />} title="Bendahara 1" /></motion.div>
              <motion.div {...nodeHoverSpring}><OrgChartNode variant="rectangular" icon={<MoneyIcon width={56} height={56} />} title="Bendahara 2" /></motion.div>
              <div className="org-line-bg org-line-row-2"></div>
            </div>

            {/* Level 3: Departemen */}
            <div className="org-row org-row-3">
              <motion.div className="org-node-wrapper" {...nodeHoverSpring}>
                <div className="org-drop-line"></div>
                <OrgChartNode variant="circular" icon={<MedinfoIcon width={64} height={64} />} title="Medinfo" onClick={() => navigate('/departemen/medinfo')} />
              </motion.div>
              <motion.div className="org-node-wrapper" {...nodeHoverSpring}>
                <div className="org-drop-line"></div>
                <OrgChartNode variant="circular" icon={<AcademyupIcon width={64} height={64} />} title="Academy UP" onClick={() => navigate('/departemen/academy-up')} />
              </motion.div>
              <motion.div className="org-node-wrapper" {...nodeHoverSpring}>
                <div className="org-drop-line"></div>
                <OrgChartNode variant="circular" icon={<RistekIcon width={64} height={64} />} title="RISTEK" onClick={() => navigate('/departemen/ristek')} />
              </motion.div>
              <motion.div className="org-node-wrapper" {...nodeHoverSpring}>
                <div className="org-drop-line"></div>
                <OrgChartNode variant="circular" icon={<InternalIcon width={64} height={64} />} title="Internal" onClick={() => navigate('/departemen/internal')} />
              </motion.div>
              <motion.div className="org-node-wrapper" {...nodeHoverSpring}>
                <div className="org-drop-line"></div>
                <OrgChartNode variant="circular" icon={<EksternalIcon width={64} height={64} />} title="Eksternal" onClick={() => navigate('/departemen/eksternal')} />
              </motion.div>
              <div className="org-line-bg org-line-row-3"></div>
            </div>

            <Typography variant="body" className="org-chart-hint">
              Klik untuk pilih Departemen
            </Typography>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: Departemen Deskripsi */}
      <motion.section 
        className="section-container bg-light-gray padding-top-0"
        {...sectionReveal}
      >
        <div className="section-header">
          <Typography variant="heading1">{currentDeptConfig.title}</Typography>
          <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: 'spring', stiffness: 300 }}>
            {deptIcons[currentSlug] || <AcademyupIcon width={56} height={56} />}
          </motion.div>
        </div>
        <Typography variant="body" className="departemen-description">
          {currentDeptConfig.desc}
        </Typography>
      </motion.section>

      {/* SECTION 3: Program Kerja */}
      <motion.section 
        className="section-container bg-light-gray padding-top-0"
        {...sectionReveal}
      >
        <div className="section-header">
          <Typography variant="heading1">Program Kerja</Typography>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <GearIcon width={56} height={56} />
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={prokerIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CarouselCard 
              image={programKerjaList[prokerIndex].image}
              title={programKerjaList[prokerIndex].title}
              description={programKerjaList[prokerIndex].description}
              onPrev={handlePrevProker}
              onNext={handleNextProker}
            />
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* SECTION 4: Pengurus */}
      <motion.section 
        className="section-container bg-light-gray padding-top-0"
        {...sectionReveal}
      >
        <div className="section-header">
          <Typography variant="heading1">Pengurus</Typography>
          <PeopleIcon width={56} height={56} />
        </div>

        <div className="pengurus-grid-container">
          {/* Ketua & Sekretaris Departemen (Kiri) */}
          <div className="pengurus-ketua-section">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <PengurusCard 
                variant="ketua"
                name={kadepMember ? kadepMember.Pengguna?.NamaLengkap : 'Karina Siregar'}
                role="Ketua Departemen"
                image={kadepMember?.Pengguna?.FotoPengguna || getAvatarFallback(kadepMember?.Pengguna?.NamaLengkap || 'Kadep')}
              />
            </motion.div>
            {sekdepMember && (
              <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <PengurusCard 
                  variant="ketua"
                  name={sekdepMember.Pengguna?.NamaLengkap}
                  role="Sekretaris Departemen"
                  image={sekdepMember.Pengguna?.FotoPengguna || getAvatarFallback(sekdepMember.Pengguna?.NamaLengkap)}
                />
              </motion.div>
            )}
          </div>

          {/* Divisi - Divisi (Scroll Horizontal dengan Container Kuning sesuai Figma) */}
          <div className="divisi-scroll-wrapper">
            {currentDeptConfig.divisions.map((div, idx) => {
              const kadiv = findMemberByTitle(div.kadivTitle);
              const anggotaList = filterMembersByTitle(div.anggotaTitle);

              return (
                <div key={idx} className="divisi-box-container">
                  {/* Kadiv Card */}
                  <motion.div whileHover={{ y: -6, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <PengurusCard 
                      variant="anggota"
                      name={kadiv ? kadiv.Pengguna?.NamaLengkap : 'Nama Kadiv'}
                      role="Ketua Divisi"
                      image={kadiv?.Pengguna?.FotoPengguna || getAvatarFallback(kadiv?.Pengguna?.NamaLengkap || div.name)}
                    />
                  </motion.div>

                  {/* Anggota Cards */}
                  {anggotaList.map((m, mIdx) => (
                    <motion.div key={mIdx} whileHover={{ y: -6, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <PengurusCard 
                        variant="anggota"
                        name={m.Pengguna?.NamaLengkap}
                        role="Anggota"
                        image={m.Pengguna?.FotoPengguna || getAvatarFallback(m.Pengguna?.NamaLengkap)}
                      />
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Departemen;
