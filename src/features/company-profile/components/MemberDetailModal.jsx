import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemberDetailModal.css';

const PdfIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#FF4747"/>
    <path d="M11 11H20L25 16V25C25 26.1 24.1 27 23 27H11C9.9 27 9 26.1 9 25V13C9 11.9 9.9 11 11 11Z" fill="white" opacity="0.25"/>
    <text x="18" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="sans-serif">PDF</text>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function MemberDetailModal({ member, onClose }) {
  if (!member) return null;

  const pengguna = member.Pengguna || member.pengguna || {};
  const nama = pengguna.NamaLengkap || pengguna.nama_lengkap || 'Karina Siregar';
  const foto = pengguna.FotoPengguna || pengguna.foto_pengguna || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nama)}`;
  const nim = member.NIM || member.nim || '105227007';
  const prodi = member.ProgramStudi || member.program_studi || 'Ilmu Komputer';
  const angkatan = member.Angkatan || member.angkatan || '2027';
  const tautan = member.Tautan || member.tautan || 'linkedin.com';
  const cvUrl = member.CVUrl || member.cv_url || member.CV || member.cv || '#';

  // Format minat / keahlian
  const keahlian = member.KeahlianAnggota || member.keahlian_anggota || [];
  const minatRiset = member.MinatRisetAnggota || member.minat_riset_anggota || [];
  
  const minatPengalamanList = [
    ...minatRiset.map((r) => r.MinatRiset?.NamaMinat || r.minat_riset?.nama_minat),
    ...keahlian.map((k) => k.Keahlian?.NamaKeahlian || k.keahlian?.nama_keahlian)
  ].filter(Boolean);

  const minatPengalamanText = minatPengalamanList.length > 0 
    ? minatPengalamanList.join(', ')
    : 'makan, tidur, ibadah';

  // Format LinkedIn Link display
  const linkedinDisplay = tautan.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <AnimatePresence>
      <motion.div 
        className="detail-modal-backdrop" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="detail-modal-wrapper" 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          <motion.button 
            className="detail-modal-close-btn" 
            onClick={onClose} 
            title="Tutup"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            &times;
          </motion.button>

          <div className="detail-modal-content">
            {/* LEFT CARD (BLUE) */}
            <div className="detail-blue-card">
              <motion.div 
                className="detail-avatar-container"
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={foto} alt={nama} className="detail-avatar-image" />
              </motion.div>
              <h3 className="detail-member-name">{nama}</h3>
            </div>

            {/* RIGHT CARD (YELLOW) */}
            <div className="detail-yellow-card">
              <div className="detail-info-table">
                <div className="detail-info-row">
                  <span className="detail-label-col">NIM</span>
                  <span className="detail-colon-col">:</span>
                  <span className="detail-value-col">{nim}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-label-col">Program Studi</span>
                  <span className="detail-colon-col">:</span>
                  <span className="detail-value-col">{prodi}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-label-col">Angkatan</span>
                  <span className="detail-colon-col">:</span>
                  <span className="detail-value-col">{angkatan}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-label-col">Minat/Pengalaman</span>
                  <span className="detail-colon-col">:</span>
                  <span className="detail-value-col">{minatPengalamanText}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-label-col">LinkedIn</span>
                  <span className="detail-colon-col">:</span>
                  <span className="detail-value-col">
                    <a 
                      href={tautan.startsWith('http') ? tautan : `https://${tautan}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="detail-linkedin-link"
                    >
                      {linkedinDisplay}
                    </a>
                  </span>
                </div>

                <div className="detail-info-row cv-row">
                  <span className="detail-label-col">CV</span>
                  <span className="detail-colon-col">:</span>
                  <div className="detail-value-col cv-value-col">
                    <motion.a 
                      href={cvUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cv-pdf-widget"
                      whileHover={{ scale: 1.03, x: 2, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 350 }}
                      onClick={(e) => {
                        if (cvUrl === '#') {
                          e.preventDefault();
                          alert(`CV untuk ${nama} belum diunggah.`);
                        }
                      }}
                    >
                      <div className="cv-pdf-icon-wrapper">
                        <PdfIcon />
                      </div>
                      <div className="cv-pdf-details">
                        <span className="cv-pdf-filename">{`File Title.pdf`}</span>
                        <span className="cv-pdf-meta">313 KB . 31 Aug, 2022</span>
                      </div>
                      <div className="cv-pdf-download-btn" title="Unduh CV">
                        <DownloadIcon />
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MemberDetailModal;
