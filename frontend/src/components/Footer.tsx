import React from 'react';
import Link from 'next/link';
import "./footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="text-center">
                <p>&copy; 2024 Hosanna Story. Tous droits réservés.</p>
                <nav className="space-x-4 mt-4">
                    <Link href="/privacy">Politique de confidentialité</Link>
                    <Link href="/terms">Conditions d&apos;utilisation</Link>
                    <Link href="/contact">Nous contacter</Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;