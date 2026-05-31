import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Jaka. Built with React & Django.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/jaka" target="_blank" rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FaGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/jaka" target="_blank" rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FaLinkedin size={18} />
          </a>
          <a href="https://instagram.com/jaka.dev" target="_blank" rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FaInstagram size={18} />
          </a>
          <a href="mailto:jaka@email.com"
            className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <HiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
