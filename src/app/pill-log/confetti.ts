export function fireConfetti(x: number, y: number, count = 30): void {
  const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#577590'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';

    const angle = Math.random() * 2 * Math.PI;
    const distance = 60 + Math.random() * 100;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 50; // bias upward initially

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(particle);

    particle.addEventListener('animationend', () => particle.remove());
  }
}
