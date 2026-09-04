import React from 'react';
import { Navbar, Button, Card, GalleryCard, Typography }  from 'hmik-project-storybook';
import 'hmik-project-storybook/dist/hmik-project-storybook.css';
import './Home.css'

function Home() {
  return (
    <div className="homepage-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Typography variant="heading1" color="white" weight="bold">
            Himpunan Mahasiswa<br/>Ilmu Komputer<br/>Universitas Pertamina
          </Typography>
          <Button className="btn-primary">Pelajari Lebih Lanjut ↗</Button>
        </div>
      </section>

      {/* About Section Placeholder */}
      <section className="about-section">
        <Typography variant="heading2">Tentang HMIK UPER</Typography>
        <Typography variant="body">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        </Typography>
      </section>

      {/* Section: Program Kerja Mendatang */}
      <section className="section-container">
        <div className="section-header">
          <Typography variant="heading2" color="blue" weight="bold">
            Program Kerja Mendatang
          </Typography>
        </div>
        
        <div className="card-grid">
          <Card title="Title" date="DD/MM/YYYY" />
          <Card title="Title" date="DD/MM/YYYY" />
          <Card title="Title" date="DD/MM/YYYY" />
          <Card title="Title" date="DD/MM/YYYY" />
        </div>
      </section>

      {/* Section: Program Kerja Unggulan */}
      <section className="section-container bg-light-blue">
        <div className="section-header">
          <Typography variant="heading2" color="black" weight="bold">
            Program Kerja Unggulan
          </Typography>
        </div>
        
        <div className="card-grid">
          <GalleryCard title="Title Example" />
          <GalleryCard title="Title Example" />
          <GalleryCard title="Title Example" />
          <GalleryCard title="Title Example" />
        </div>
      </section>
      
      {/* Footer Placeholder */}
      {/* <footer className="footer-section"> */}
        {/* Konten Footer */}
      {/* </footer> */}
    </div>
  );
}

export default Home;