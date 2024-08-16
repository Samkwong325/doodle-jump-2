// doodle-jump.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect, useRef } = React;

  const DoodleJump = ({ assetsUrl }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [doodle, setDoodle] = useState({
      x: 100,
      y: 100,
      radius: 10,
      velocityY: 0,
    });
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Initialize platforms
      const initPlatforms = [
        { x: 50, y: 500, width: 100, height: 20 },
        { x: 200, y: 400, width: 100, height: 20 },
        { x: 350, y: 300, width: 100, height: 20 },
      ];
      setPlatforms(initPlatforms);

      // Game loop
      const gameLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update doodle position
        doodle.velocityY += 0.1;
        doodle.y += doodle.velocityY;

        // Check for platform collisions
        const platformCollision = platforms.some((platform) => {
          if (
            doodle.x + doodle.radius > platform.x &&
            doodle.x - doodle.radius < platform.x + platform.width &&
            doodle.y + doodle.radius > platform.y &&
            doodle.y - doodle.radius < platform.y + platform.height
          ) {
            doodle.velocityY = -10; // Bounce off platform
            setScore(score + 1);
            return true;
          }
          return false;
        });

        // Game over if doodle falls below the canvas
        if (doodle.y > canvas.height) {
          alert(`Game Over! Your score: ${score}`);
          resetGame();
        }

        // Draw doodle
        ctx.beginPath();
        ctx.arc(doodle.x, doodle.y, doodle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();

        // Draw platforms
        platforms.forEach((platform) => {
          ctx.fillStyle = 'brown';
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });

        // Draw score
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${score}`, 10, 30);

        requestAnimationFrame(gameLoop);
      };

      // Start game loop
      gameLoop();

      // Handle keyboard events
      window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && doodle.x > 0) {
          doodle.x -= 10;
        } else if (event.key === 'ArrowRight' && doodle.x < canvas.width - doodle.radius) {
          doodle.x += 10;
        }
      });

      return () => {
        window.removeEventListener('keydown', (event) => {
          // Remove event listener
        });
      };
    }, []);

    const resetGame = () => {
      setScore(0);
      setDoodle({
        x: 100,
        y: 100,
        radius: 10,
        velocityY: 0,
      });
      const initPlatforms = [
        { x: 50, y: 500, width: 100, height: 20 },
        { x: 200, y: 400, width: 100, height: 20 },
        { x: 350, y: 300, width: 100, height: 20 },
      ];
      setPlatforms(initPlatforms);
    };

    return React.createElement(
      'div',
      { className: 'doodle-jump' },
      React.createElement('h2', null, 'Doodle Jump'),
      React.createElement('canvas', { ref: canvasRef, width: 400, height: 600 }),
      React.createElement('p', null, `Score: ${score}`)
    );
  };

  return () => React.createElement(DoodleJump, { assetsUrl: assetsUrl });
};

console.log('Doodle Jump script loaded');
