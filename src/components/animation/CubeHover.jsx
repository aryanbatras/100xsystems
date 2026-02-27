import styled from 'styled-components';

const CubeHover = () => {
  return (
    <StyledWrapper>
      <div className="cube-container">
        <div className="cube">
          <div className="face front">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
          <div className="face back">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
          <div className="face right">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
          <div className="face left">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
          <div className="face top">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
          <div className="face bottom">
            <div className="face-content">
              <img src="/100xsystemsonlytitle.png" alt="100x Systems" className="logo" />
              <span className="tech-text"></span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cube-container {
    width: 180px;
    height: 180px;
    padding: 50px;
    perspective: 1000px;
    margin: 30px auto;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.1) rotateX(5deg) rotateY(5deg);
    animation-play-state: running;
    filter: brightness(1.2) contrast(1);
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: rotateCube 30s infinite linear;
    transition: transform 0.8s ease;
    animation-play-state: running;
  }

  .face {
    position: absolute;
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 30, 30, 0.4));
    backdrop-filter: blur(20px);
    border: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.6s ease;
  }

  .face::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
  }


  .face-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 2;
    position: relative;
  }

  .logo {
    width: 100px;
    height: auto;
    filter: brightness(1.2) contrast(1.2);
    transition: filter 0.4s ease;
  }

  .tech-text {
    color: #b0b0b0; 
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: color 0.3s ease;
  }


  .front {
    transform: translateZ(90px);
  }

  .back {
    transform: rotateY(180deg) translateZ(90px);
  }

  .right {
    transform: rotateY(90deg) translateZ(90px);
  }

  .left {
    transform: rotateY(-90deg) translateZ(90px);
  }

  .top {
    transform: rotateX(90deg) translateZ(90px);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(90px);
  }

  @keyframes rotateCube {
    0% {
      transform: rotateX(30deg) rotateY(0deg) rotateZ(45deg);
    }
    25% {
      transform: rotateX(30deg) rotateY(90deg) rotateZ(45deg);
    }
    50% {
      transform: rotateX(30deg) rotateY(180deg) rotateZ(45deg);
    }
    75% {
      transform: rotateX(30deg) rotateY(270deg) rotateZ(45deg);
    }
    100% {
      transform: rotateX(30deg) rotateY(360deg) rotateZ(45deg);
    }
  }`;

export default CubeHover;
