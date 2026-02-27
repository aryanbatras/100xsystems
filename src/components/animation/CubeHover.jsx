import styles from './CubeHover.module.css';

const CubeHover = () => {
  return (
    <div className={styles.cubeContainer}>
      <div className={styles.cube}>
        <div className={styles.front}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeHover;
