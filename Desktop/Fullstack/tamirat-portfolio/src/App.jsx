import { useEffect, useState } from "react";
import ProofCarousel from "./ProofCarousel";
import "./App.css";

// ---- EDIT YOUR INFO HERE ----
const me = {
  name: "Tamirat",
  role: "Full-stack developer",
  email: "tamirathaile96@gmail.com",
  github: "https://github.com/Tamegas",
  linkedin: "https://www.linkedin.com/in/tamirat-haile-5b7b03317",
  about:
    "I design and build web apps from the interface to the database. I like clean UI, fast code, and shipping things people actually use.",
  stats: [
    { value: "10+", label: "Projects" },
    { value: "3+", label: "Years learning" },
    { value: "100%", label: "Effort" },
  ],
};

const skills = [
  { title: "Frontend", items: ["React", "Vite", "JavaScript", "CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "REST APIs", "MongoDB"] },
  { title: "AI tools", items: ["Prompting", "Claude Code", "Automation"] },
  { title: "Workflow", items: ["Git & GitHub", "VS Code", "Deployment"] },
];

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "proof", label: "Proof" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="nav">
      <a href="#home" className="nav__logo">{me.name}</a>
      <nav className="nav__pill" aria-label="Main">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "is-active" : ""}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav__cta">
        Hire me <span>→</span>
      </a>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <section className="hero" id="home">
        <p className="eyebrow">{me.role}</p>
        <h1>
          I build things that <span className="grad">work.</span>
        </h1>
        <p className="hero__sub">
          Web apps and interfaces, built end to end by {me.name}.
        </p>
        <div className="hero__btns">
          <a href="#proof" className="btn btn--light">See my work</a>
          <a href="#contact" className="btn btn--ghost">Get in touch</a>
        </div>
      </section>

      <section className="block" id="about">
        <p className="eyebrow">About</p>
        <h2>Builder first, <span className="grad">designer second.</span></h2>
        <p className="about__text">{me.about}</p>
        <div className="stats">
          {me.stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <ProofCarousel />

      <section className="block" id="skills">
        <p className="eyebrow">Skills</p>
        <h2>What I <span className="grad">work with.</span></h2>
        <div className="skills">
          {skills.map(({ title, items }) => (
            <article key={title} className="skill">
              <h3>{title}</h3>
              <ul>
                {items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="block contact" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>Let’s build <span className="grad">something.</span></h2>
        <a className="contact__mail" href={`mailto:${me.email}`}>
          {me.email} ↗
        </a>
        <div className="hero__btns">
          <a className="btn btn--ghost" href={me.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn--ghost" href={me.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <footer>© {new Date().getFullYear()} {me.name}</footer>
      </section>

      <a href={`mailto:${me.email}`} className="float-cta">
        <span>→</span>
        <div>Available<br /><b>Hire me</b></div>
      </a>
    </>
  );
}