import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { 
  Button, 
  Card, 
  Navbar, 
  CrownIcon, 
  LogoHmik, 
  SearchIcon 
} from 'hmik-project-storybook'
import 'hmik-project-storybook/dist/hmik-project-storybook.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <section id="center" style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2>Contoh Penggunaan Icon</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <CrownIcon width={50} height={50} />
            <LogoHmik width={50} height={50} />
            <SearchIcon width={50} height={50} />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>Contoh Penggunaan Card</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card 
              title="Card dari Library" 
              description="Ini adalah komponen Card yang diambil dari hmik-project-storybook"
              buttonText="Klik Saya"
              onClick={() => alert('Card diklik!')}
            />
          </div>
        </div>

        <div>
          <h2>Contoh Penggunaan Button</h2>
        </div>
        <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
