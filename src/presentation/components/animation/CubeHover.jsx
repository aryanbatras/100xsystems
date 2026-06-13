import styles from '../../_styles/components/animation/CubeHover.module.css';;

const CubeHover = () => {
  return (
    <div className={styles.cubeContainer}>
      <div className={styles.cube}>
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.right}`}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.left}`}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.top}`}>
          <div className={styles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100x Systems" className={styles.logo} />
            <span className={styles.techText}></span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.bottom}`}>
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
