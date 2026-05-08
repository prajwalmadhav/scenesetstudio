export default function StudioStamp({ className = '', style = {} }) {
  return (
    <svg
      className={`about-stamp__svg ${className}`.trim()}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <path id="stamp-circle" d="M 80,11 A 69,69 0 1,1 79.999,11" />
      </defs>

      <circle cx="80" cy="80" r="77" className="about-stamp__bg" />

      <circle cx="80" cy="80" r="66" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />

      <text className="about-stamp__since">
        <textPath href="#stamp-circle" startOffset="0%">
          SCENE SET STUDIO ✦ SCENE SET STUDIO ✦ SCENE SET STUDIO ✦
        </textPath>
      </text>

      <circle cx="80" cy="80" r="78" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.9" strokeDasharray="3 5" />

      <text x="80" y="65" textAnchor="middle" className="about-stamp__word about-stamp__word--kannada">ಸೀನ್ ಸೆಟ್</text>
      <text x="80" y="83" textAnchor="middle" className="about-stamp__word about-stamp__word--kannada">ಸ್ಟುಡಿಯೋ</text>

      <line x1="54" y1="90" x2="106" y2="90" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" />

      <text x="80" y="107" textAnchor="middle" className="about-stamp__english">SCENE SET</text>
      <text x="80" y="121" textAnchor="middle" className="about-stamp__english">STUDIO</text>
    </svg>
  )
}
