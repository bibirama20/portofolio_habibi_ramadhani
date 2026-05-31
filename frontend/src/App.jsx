import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Certificates from './sections/Certificates'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
      <BackToTop />
    </div>
  )
}
