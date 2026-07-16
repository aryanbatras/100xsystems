'use client';

import cubeHoverStyles from '../_styles/css/animation-cubehover.module.css';
import cubeSmallStyles from '../_styles/css/animation-cubesmall.module.css';
/**
 * ## Animation
 *
 * Animation feature module.
 * Contains all components, types, and logic for the animation domain.
 *
 * @packageDocumentation
 * @module animation
 */

;



// ============================================================
// Source: CubeHover.jsx
// ============================================================
const CubeHover = () => {
  return (
    <div className={cubeHoverStyles.cubeContainer}>
      <div className={cubeHoverStyles.cube}>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.front}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.back}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.right}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.left}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.top}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
        <div className={`${cubeHoverStyles.face} ${cubeHoverStyles.bottom}`}>
          <div className={cubeHoverStyles.faceContent}>
            <img src="/100xsystemsonlytitle.png" alt="100xsystems Systems" className={cubeHoverStyles.logo} />
            <span className={cubeHoverStyles.techText}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CubeHover };


// ============================================================
// Source: CubeSmall.jsx
// ============================================================
const CubeSmall = () => {
  return (
    <div className={cubeSmallStyles.loader}>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box0}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box1}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box2}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box3}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box4}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box5}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box6}`}>
        <div />
      </div>
      <div className={`${cubeSmallStyles.box} ${cubeSmallStyles.box7}`}>
        <div />
      </div>
      <div className={cubeSmallStyles.ground}>
        <div />
      </div>
    </div>
  );
};

export { CubeSmall };
