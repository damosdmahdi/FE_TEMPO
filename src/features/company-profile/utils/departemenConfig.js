/**
 * Konfigurasi Mapping 5 Departemen dan 11 Divisi HMIK
 * Berdasarkan substring/matching data 'Jabatan' dari backend RESTful API.
 */
export const DEPARTEMEN_CONFIG = {
  'eksternal': {
    title: 'Departemen Hubungan Eksternal',
    slug: 'eksternal',
    kadepTitle: 'Kepala Departemen Hubungan External',
    sekdepTitle: 'Sekretaris Departemen Hubungan External',
    desc: 'Departemen Eksternal merupakan jembatan penghubung antara HMIK dengan pihak luar, baik universitas, komunitas, perusahaan, maupun alumni. Kami membangun relasi strategis untuk memperluas jaringan dan membawa dampak positif bagi himpunan di kancah yang lebih luas.',
    divisions: [
      {
        name: 'Divisi Pengabdian Masyarakat',
        kadivTitle: 'Kadiv Pengabdian Masyarakat',
        anggotaTitle: 'Anggota Divisi Pengabdian Masyarakat',
      },
      {
        name: 'Divisi Kemitraan Strategis',
        kadivTitle: 'Kadiv Kemitraan Strategis',
        anggotaTitle: 'Anggota Divisi Kemitraan Strategis',
      },
    ],
  },
  'ristek': {
    title: 'Departemen Riset dan Teknologi',
    slug: 'ristek',
    kadepTitle: 'Kepala Departemen Riset dan Teknologi',
    desc: 'Departemen Riset dan Teknologi berfokus pada pengembangan iklim keilmuan dan eksplorasi teknologi terbaru bagi mahasiswa. Kami menyelenggarakan pelatihan, riset, serta wadah diskusi untuk meningkatkan kompetensi teknis dan akademis di bidang IT.',
    divisions: [
      {
        name: 'Divisi Riset & Inovasi',
        kadivTitle: 'Kadiv Riset & Inovasi',
        anggotaTitle: 'Anggota Divisi Riset & Inovasi',
      },
      {
        name: 'Divisi Pengembangan Produk',
        kadivTitle: 'Kadiv Pengembangan Produk',
        anggotaTitle: 'Anggota Divisi Pengembangan Produk',
      },
    ],
  },
  'internal': {
    title: 'Departemen Manajemen Internal',
    slug: 'internal',
    kadepTitle: 'Kepala Departemen Manahemen Internal',
    sekdepTitle: 'Sekretaris Departemen Manahemen Internal',
    desc: 'Departemen Internal bertugas menjaga keharmonisan, solidaritas, dan kesejahteraan seluruh pengurus serta anggota himpunan. Melalui berbagai program kerja dan pendekatan personal, kami memastikan HMIK menjadi rumah yang nyaman bagi setiap anggotanya.',
    divisions: [
      {
        name: 'Divisi MSDA',
        kadivTitle: 'Kadiv MSDA',
        anggotaTitle: 'Anggota Divisi MSDA',
      },
      {
        name: 'Divisi Minat & Bakat',
        kadivTitle: 'Kadiv Minat & Bakat',
        anggotaTitle: 'Anggota Divisi Minat & Bakat',
      },
      {
        name: 'Divisi Aset & Perlengkapan',
        kadivTitle: 'Kadiv Aset & Perlengkapan',
        anggotaTitle: 'Anggota Divisi Aset & Perlengkapan',
      },
    ],
  },
  'academy-up': {
    title: 'Departemen Academy UP',
    slug: 'academy-up',
    kadepTitle: 'Kepala Departemen Academy UP',
    desc: 'Departemen Academy UP berfokus pada peningkatan potensi akademis dan keahlian spesifik mahasiswa Ilmu Komputer melalui bimbingan belajar, workshop, dan pelatihan sertifikasi.',
    divisions: [
      {
        name: 'Divisi Akademik',
        kadivTitle: 'Kadiv Akademik',
        anggotaTitle: 'Anggota Divisi Akademik',
      },
      {
        name: 'Divisi Keprofesian',
        kadivTitle: 'Kadiv Keprofesian',
        anggotaTitle: 'Anggota Divisi Keprofesian',
      },
    ],
  },
  'medinfo': {
    title: 'Departemen Media Informasi',
    slug: 'medinfo',
    kadepTitle: 'Kepala Departemen Media Informasi',
    sekdepTitle: 'Sekretaris Departemen Media Informasi',
    desc: 'Departemen Media Informasi (Medinfo) adalah garda terdepan dalam publikasi dan pengelolaan informasi publik HMIK. Kami bertanggung jawab untuk memastikan seluruh kegiatan dan esensi himpunan tersampaikan dengan baik kepada khalayak luas melalui desain grafis, media sosial, dan platform digital lainnya.',
    divisions: [
      {
        name: 'Divisi Media Kreatif',
        kadivTitle: 'Kadiv Media Kreatif',
        anggotaTitle: 'Anggota Divisi Media Kreatif',
      },
      {
        name: 'Divisi Publikasi & Dokumentasi',
        kadivTitle: 'Kadiv Publikasi & Dokumentasi',
        anggotaTitle: 'Anggota Divisi Publikasi & Dokumentasi',
      },
    ],
  },
};
