import styles from '../../_styles/components/animated/AnimatedTechGrid.module.css';;

interface TechItem {
  text: string;
}

interface AnimatedTechGridProps {
  items: TechItem[];
  className?: string;
}

const AnimatedTechGrid = ({ items, className = '' }: AnimatedTechGridProps) => {
  return (
    <div className={`${styles.techGrid} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.techItem}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTechGrid;
