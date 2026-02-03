import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H1, Body, Label } from '../ui/Text';
import { Button } from '../ui/Button';
import { profile } from '../data/profile';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-neutral-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-neutral-800/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-neutral-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="max-w-4xl space-y-8 md:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Label>{profile.hero.label}</Label>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <H1>{profile.hero.headline}</H1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Body className="text-xl md:text-2xl text-neutral-400">
              {profile.hero.subtext}
            </Body>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 flex flex-wrap gap-4">
            <Button onClick={scrollToProjects} variant="primary">
              View Work
            </Button>
            <Button onClick={scrollToContact} variant="secondary">
              Contact
            </Button>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600 hidden md:block"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
};