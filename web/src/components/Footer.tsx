import React from 'react';
import Link from 'next/link';
import "./footer.css";
import Image from 'next/image';
import logo from '../../public/images/logo_hosanna-story-gray.png'

const Footer: React.FC = () => {
    return (
        <footer className="footer" style={{ marginTop: '80px', alignContent: 'center' }}>
            <Link href="/">
                <Image src={logo} alt='Hosanna Story' style={{ cursor: 'pointer' }} />
            </Link>
            <div className="flex justify-right" style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '15px' }}>© 2024 Hosanna Story. Tous droits réservés.</p>
                <Link href="/privacy" style={{ marginRight: '15px' }} className="footer-links">Politique de confidentialité</Link>
                <Link href="/terms" style={{ marginRight: '15px' }} className="footer-links">Conditions d&apos;utilisation</Link>
                <Link href="/contact" className="footer-links" style={{ marginRight: '15px' }}>Nous contacter</Link>
                <Link href="/apropos" className="footer-links" style={{ marginRight: '15px' }}>À propos</Link>
            </div>
        </footer>
    );
};

export default Footer;