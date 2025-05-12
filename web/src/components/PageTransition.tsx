// components/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
    const { asPath } = useRouter();

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                key={asPath}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: 'linear' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;