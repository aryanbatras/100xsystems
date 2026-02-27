import styles from './CubeAnimation.module.css';

const CubeAnimation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cube}>
        <div style={{ "--x": "-1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "0", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
      </div>
      <div className={styles.cube}>
        <div style={{ "--x": "-1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "0", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
      </div>
      <div className={styles.cube}>
        <div style={{ "--x": "-1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "0", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
        <div style={{ "--x": "1", "--y": "0"}}>
          <span style={{ "--i": "3"}} />
          <span style={{ "--i": "2"}} />
          <span style={{ "--i": "1"}} />
        </div>
      </div>
    </div>
  );
};

export default CubeAnimation;
