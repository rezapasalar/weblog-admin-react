export default function Hamburger ({onClick = null, className: classes = ''}) {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className={`${classes}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
}