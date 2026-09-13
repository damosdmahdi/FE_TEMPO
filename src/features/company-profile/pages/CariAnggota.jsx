import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Navbar, 
  Footer, 
  Typography, 
  PengurusCard, 
  ChevronLeftIcon 
} from 'hmik-project-storybook';
import { motion, AnimatePresence } from 'framer-motion';
import 'hmik-project-storybook/dist/hmik-project-storybook.css';
import './CariAnggota.css';

import { useTeam } from '../api/useTeam';
import SearchInputPill from '../components/SearchInputPill';
import SelectFilterPill from '../components/SelectFilterPill';
import Pagination from '../components/Pagination';
import MemberDetailModal from '../components/MemberDetailModal';

// Motion.dev / Framer Motion Variants
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
      duration: 0.35, 
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

const gridStagger = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 } 
  }
};

const cardPop = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 18 }
  }
};

function CariAnggota() {
  const navigate = useNavigate();
  const { data: teamData, isLoading, isError } = useTeam();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAngkatan, setSelectedAngkatan] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMemberModal, setSelectedMemberModal] = useState(null);

  const ITEMS_PER_PAGE = 10;

  const handleMenuClick = (item) => {
    if (item === 'Beranda') navigate('/');
    if (item === 'Tentang Kami') navigate('/tentang-kami');
    if (item === 'Departemen') navigate('/departemen/academy-up');
  };

  // Ekstrak daftar unik Angkatan & Skill dari API secara otomatis
  const angkatanOptions = useMemo(() => {
    if (!teamData || !Array.isArray(teamData)) return [];
    const set = new Set();
    teamData.forEach((m) => {
      const angk = m.Angkatan || m.angkatan;
      if (angk) set.add(String(angk));
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [teamData]);

  const skillOptions = useMemo(() => {
    if (!teamData || !Array.isArray(teamData)) return [];
    const set = new Set();
    teamData.forEach((m) => {
      const keahlianList = m.KeahlianAnggota || m.keahlian_anggota || [];
      keahlianList.forEach((k) => {
        const skillName = k.Keahlian?.NamaKeahlian || k.keahlian?.nama_keahlian;
        if (skillName) set.add(skillName);
      });
    });
    return Array.from(set).sort();
  }, [teamData]);

  // Dynamic Filtering
  const filteredMembers = useMemo(() => {
    if (!teamData || !Array.isArray(teamData)) return [];

    return teamData.filter((member) => {
      const pengguna = member.Pengguna || member.pengguna || {};
      const nama = (pengguna.NamaLengkap || pengguna.nama_lengkap || '').toLowerCase();
      const nim = (member.NIM || member.nim || '').toLowerCase();
      const jabatan = (member.Jabatan || member.jabatan || '').toLowerCase();
      const angkatan = String(member.Angkatan || member.angkatan || '');

      // Check Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || nama.includes(query) || nim.includes(query) || jabatan.includes(query);

      // Check Angkatan Filter
      const matchesAngkatan = !selectedAngkatan || angkatan === selectedAngkatan;

      // Check Skill Filter
      const keahlianList = member.KeahlianAnggota || member.keahlian_anggota || [];
      const matchesSkill = !selectedSkill || keahlianList.some((k) => {
        const skillName = k.Keahlian?.NamaKeahlian || k.keahlian?.nama_keahlian;
        return skillName === selectedSkill;
      });

      return matchesSearch && matchesAngkatan && matchesSkill;
    });
  }, [teamData, searchQuery, selectedAngkatan, selectedSkill]);

  // Reset pagination saat filter berubah
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleAngkatanChange = (val) => {
    setSelectedAngkatan(val);
    setCurrentPage(1);
  };

  const handleSkillChange = (val) => {
    setSelectedSkill(val);
    setCurrentPage(1);
  };

  // Slicing Pagination Data
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  const getAvatarFallback = (name) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Anggota HMIK')}`;
  };

  return (
    <motion.div 
      className="cari-anggota-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar activeMenu="Departemen" onMenuClick={handleMenuClick} />

      {/* Blue Header Section */}
      <section className="cari-header-section">
        <div className="cari-header-content">
          {/* Left Title with Back Button */}
          <div className="cari-title-group">
            <motion.button 
              className="back-btn" 
              onClick={() => navigate(-1)} 
              title="Kembali"
              whileHover={{ scale: 1.15, x: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <ChevronLeftIcon width={16} height={24} />
            </motion.button>
            <Typography variant="heading1" color="white" className="cari-title-text">
              Cari Anggota
            </Typography>
          </div>

          {/* Right Controls (Search + Filters) */}
          <div className="cari-controls-group">
            <SearchInputPill 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Cari Anggota..."
            />
            <SelectFilterPill 
              label="Angkatan"
              options={angkatanOptions}
              selectedValue={selectedAngkatan}
              onChange={handleAngkatanChange}
            />
            <SelectFilterPill 
              label="Skill"
              options={skillOptions}
              selectedValue={selectedSkill}
              onChange={handleSkillChange}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-container bg-light-gray cari-main-content">
        {isLoading ? (
          <div className="cari-state-message">
            <Typography variant="heading3">Memuat data anggota...</Typography>
          </div>
        ) : isError ? (
          <div className="cari-state-message">
            <Typography variant="heading3" color="red">Gagal memuat data dari server.</Typography>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="cari-state-message">
            <Typography variant="heading2">Anggota tidak ditemukan</Typography>
            <Typography variant="body" color="gray">Coba ubah kata kunci pencarian atau filter kamu.</Typography>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage + searchQuery + selectedAngkatan + selectedSkill}
                className="member-cards-grid"
                variants={gridStagger}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {paginatedMembers.map((m, idx) => {
                  const pengguna = m.Pengguna || m.pengguna || {};
                  const nama = pengguna.NamaLengkap || pengguna.nama_lengkap || 'Anggota HMIK';
                  const foto = pengguna.FotoPengguna || pengguna.foto_pengguna || getAvatarFallback(nama);
                  const jabatan = m.Jabatan || m.jabatan || 'Anggota';

                  return (
                    <motion.div 
                      key={m.id_anggota || idx} 
                      className="member-card-wrapper" 
                      onClick={() => setSelectedMemberModal(m)}
                      variants={cardPop}
                      whileHover={{ y: -8, scale: 1.03, rotate: -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <PengurusCard 
                        variant="anggota"
                        name={nama}
                        role={jabatan}
                        image={foto}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}
      </section>

      {/* Detail Modal */}
      {selectedMemberModal && (
        <MemberDetailModal 
          member={selectedMemberModal} 
          onClose={() => setSelectedMemberModal(null)} 
        />
      )}

      <Footer />
    </motion.div>
  );
}

export default CariAnggota;
