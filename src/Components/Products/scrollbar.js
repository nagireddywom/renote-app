

import { motion } from 'framer-motion';
import '../../Styles/scrollbar.css';
import icon1 from '../../icons/icon1.jpeg';
import icon2 from   '../../icons/icon2.jpeg';
import icon3 from '../../icons/icon3.jpeg';
import icon4 from '../../icons/icon4.jpeg';
import icon5 from '../../icons/icon5.jpeg';

const images = [
  { src: icon1, text: 'Incubated with Worlds Largest Innovation Campuswith wide opportunity of Global Reach' },
  { src: icon2, text: 'Member of Confederation of Indian Industry' },
  { src: icon3, text: 'Nvidia Inception ProgramPart of an elite group of startups accepted by Nvidiato build our products and make a difference' },
  { src: icon4, text: 'MicrosoftPart of Microsoft Founder’s Hub' },
  { src: icon5, text: 'MEITY Startup HubRecognized by Ministry of Electronicsand Information Technology.' },
  // { src: 'icon', text: 'Image 6' },
];

export default function ScrollingContainers() {
  return (
    <div className="container-scroll-bar">
      <motion.div
        className="scroll-wrapper-bar"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      >
        {[...images, ...images].map((item, index) => (
          <motion.div
            key={index}
            className="scroll-item-bar"
            whileHover={{ scale: 1.1 }}
          >
            <div className="content-bar">
              <img src={item.src} alt={item.text} className="image-bar" />
              <div className="text-bar">{item.text}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
