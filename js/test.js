
// ═══════════════════════════════════════════
// 1. VIDEO FADE-IN ON CAN PLAY
// ═══════════════════════════════════════════
(function() {
  const video = document.querySelector('.bg-video');
  if (video) {
    video.addEventListener('canplay', () => {
      video.style.opacity = '0.7';
    });
    // Fallback if video fails
    video.addEventListener('error', () => {
      video.style.display = 'none';
      document.querySelector('.bg-video-wrapper').style.backgroundImage =
        "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')";
      document.querySelector('.bg-video-wrapper').style.backgroundSize = 'cover';
      document.querySelector('.bg-video-wrapper').style.backgroundPosition = 'center';
    });
  }
})();


// ═══════════════════════════════════════════
// 2. NETWORK CANVAS ANIMATION
// ═══════════════════════════════════════════
(function() {
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [], mouse = { x: -9999, y: -9999 };
  const NODE_COUNT = 55;
  const CONNECTION_DIST = 170;
  const MOUSE_DIST = 200;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        type: ['blue', 'gold', 'crimson', 'white', 'green'][Math.floor(Math.random() * 5)]
      });
    }
  }

  const colors = {
    blue: 'rgba(0,0,205,',
    gold: 'rgba(254,228,105,',
    crimson: 'rgba(139,35,35,',
    white: 'rgba(255,255,255,',
    green: 'rgba(74,222,128,'
  };

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - mouse.x;
      const dy = nodes[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST) {
        const alpha = (1 - dist / MOUSE_DIST) * 0.22;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(254,228,105,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;
      const c = colors[node.type];
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = c + '0.5)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = c + '0.06)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createNodes(); });
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.getElementById('hero').addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  createNodes();
  draw();
})();


// ═══════════════════════════════════════════
// 3. FLOATING BUBBLES
// ═══════════════════════════════════════════
(function() {
  const container = document.getElementById('bubbles');
  const bubbles = [
    { text: 'Booking Systems',    cls: 'bubble-blue',    x: '8%',  y: '18%', delay: '1.2s',  dur: '8s'  },
    { text: 'Payment Processing', cls: 'bubble-gold',    x: '82%', y: '15%', delay: '1.5s',  dur: '9s'  },
    { text: 'User Management',    cls: 'bubble-crimson', x: '75%', y: '72%', delay: '1.8s',  dur: '7.5s'},
    { text: 'Quote Builder',      cls: 'bubble-neutral', x: '12%', y: '75%', delay: '2.0s',  dur: '8.5s'},
    { text: 'Scheduling Engine',  cls: 'bubble-green',   x: '88%', y: '42%', delay: '2.3s',  dur: '9.5s'},
    { text: 'Invoice System',     cls: 'bubble-gold',    x: '5%',  y: '48%', delay: '2.5s',  dur: '7s'  },
    { text: 'Referral Platform',  cls: 'bubble-crimson', x: '65%', y: '88%', delay: '2.8s',  dur: '8s'  },
    { text: 'Property Manager',   cls: 'bubble-neutral', x: '35%', y: '8%',  delay: '1.6s',  dur: '10s' },
    { text: 'Subscription Tools', cls: 'bubble-green',   x: '20%', y: '90%', delay: '3.0s',  dur: '8.2s'},
    { text: 'Vendor Portal',      cls: 'bubble-blue',    x: '92%', y: '60%', delay: '2.1s',  dur: '7.8s'},
    { text: 'Fleet Tracking',     cls: 'bubble-crimson', x: '3%',  y: '32%', delay: '3.2s',  dur: '9.2s'},
    { text: 'Project Dashboards', cls: 'bubble-neutral', x: '55%', y: '92%', delay: '2.7s',  dur: '8.8s'},
  ];

  bubbles.forEach(b => {
    const el = document.createElement('div');
    el.className = `bubble ${b.cls}`;
    el.textContent = b.text;
    el.style.left = b.x;
    el.style.top = b.y;
    el.style.setProperty('--float-y', `${(Math.random() - 0.5) * 30}px`);
    el.style.setProperty('--float-x', `${(Math.random() - 0.5) * 15}px`);
    el.style.animation = `bubbleIn 0.8s ease ${b.delay} forwards, floatBubble ${b.dur} ease-in-out ${b.delay} infinite`;
    container.appendChild(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatBubble {
      0%, 100% { transform: translateY(0) translateX(0) scale(1); }
      25% { transform: translateY(var(--float-y, -15px)) translateX(var(--float-x, 8px)) scale(1.02); }
      50% { transform: translateY(calc(var(--float-y, -15px) * -0.5)) translateX(calc(var(--float-x, 8px) * -1)) scale(0.98); }
      75% { transform: translateY(calc(var(--float-y, -15px) * 0.7)) translateX(calc(var(--float-x, 8px) * 0.5)) scale(1.01); }
    }
  `;
  document.head.appendChild(style);
})();


// ═══════════════════════════════════════════
// 4. NAV SCROLL STATE
// ═══════════════════════════════════════════
(function() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();
