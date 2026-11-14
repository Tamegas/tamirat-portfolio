import { useEffect, useRef } from "react";
import "./ProofCarousel.css";

// Replace with your own projects.
// Put screenshots in src/assets and import them, e.g.:
// import shop from "./assets/shop.png";
const projects = [
  { title: "Project One", tag: "Web app", image: "", link: "#" },
  { title: "Project Two", tag: "Landing page", image: "", link: "#" },
  { title: "Project Three", tag: "Dashboard", image: "", link: "#" },
  { title: "Project Four", tag: "E-commerce", image: "", link: "#" },
  { title: "Project Five", tag: "Mobile UI", image: "", link: "#" },
  { title: "Project Six", tag: "Full stack", image: "", link: "#" },
];

export default function ProofCarousel() {
const ringRef = useRef(null);
const s = useRef({ angle: 0, velocity: 0, dragging: false, lastX: 0, moved: 0 });
const step = 360 / projects.length;

  // Animation loop: applies rotation, inertia after release, and a slow idle spin
useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const tick = () => {
    const st = s.current;
    if (!st.dragging) {
        st.angle += st.velocity;
        st.velocity *= 0.95;
        if (!reduceMotion && Math.abs(st.velocity) < 0.05) st.angle += 0.08;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${st.angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e) => {
    s.current.dragging = true;
    s.current.lastX = e.clientX;
    s.current.moved = 0;
    s.current.velocity = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.moved += Math.abs(dx);
    st.angle += dx * 0.3;
    st.velocity = dx * 0.3;
  };

  const onUp = () => {
    s.current.dragging = false;
  };

  const openProject = (link) => {
    // Ignore the click if the user was dragging
    if (s.current.moved > 6) return;
    if (link && link !== "#") window.open(link, "_blank", "noopener");
  };

  return (
    <section className="proof" id="proof">
      <p className="proof__eyebrow">Proof of work</p>
      <h2 className="proof__title">
        Work I’ve <span>shipped.</span>
      </h2>

      <div
        className="proof__stage"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="proof__ring" ref={ringRef}>
          {projects.map((p, i) => (
            <button
              key={p.title}
              className="proof__card"
              style={{ "--i": i, "--step": `${step}deg` }}
              onClick={() => openProject(p.link)}
              aria-label={`Open ${p.title}`}
            >
              {p.image ? (
                <img src={p.image} alt={p.title} draggable="false" />
              ) : (
                <div className="proof__placeholder">{p.title}</div>
              )}
              <span className="proof__label">
                {p.title} <small>{p.tag}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="proof__hint">Tap a project · Drag to spin</p>
    </section>
  );
}