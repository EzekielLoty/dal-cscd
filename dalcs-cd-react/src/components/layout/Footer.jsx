import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Dal CS|CD. Ezekiel Loty.</p>
      </div>
    </footer>
  );
}
