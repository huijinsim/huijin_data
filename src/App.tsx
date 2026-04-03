import { useEffect, useRef, useState } from 'react';
import './index.css';

const DOMAIN_COLOR: Record<string, string> = {
  "Editorial & Print":        "#7F77DD",
  "Typography":               "#1D9E75",
  "Illustration & Narrative": "#D4537E",
  "Video & Animation":        "#378ADD",
  "Brand & Graphic Systems":  "#BA7517",
  "Communication & Media":    "#D85A30",
  "Research & Writing":       "#888780",
  "Portfolio & Archive":      "#639922",
  "Foundational Form":        "#B4B2A9",
};

const INITIAL_NODES = [
  {id:"2023-C1",year:2023,short:"Wayfinding",works:2,size_mb:2723,tools:"InDesign",collab:"Solo",domain:"Editorial & Print"},
  {id:"2023-C2",year:2023,short:"2D Found.",works:2,size_mb:157,tools:"Illustrator",collab:"Solo",domain:"Foundational Form"},
  {id:"2023-C3",year:2023,short:"Typo(23)",works:2,size_mb:201,tools:"Illustrator",collab:"Solo",domain:"Typography"},
  {id:"2023-C4",year:2023,short:"Exhibit(23)",works:1,size_mb:435,tools:"Illus+AE",collab:"Solo",domain:"Illustration & Narrative"},
  {id:"2023-C5",year:2023,short:"Video Team",works:1,size_mb:4920,tools:"Video Edit",collab:"Team",domain:"Video & Animation"},
  {id:"2023-C6",year:2023,short:"Writing(23)",works:1,size_mb:23,tools:"Word",collab:"Solo",domain:"Research & Writing"},
  {id:"2023-C7",year:2023,short:"Booklet(23)",works:1,size_mb:1,tools:"Edit Tools",collab:"Solo",domain:"Editorial & Print"},
  {id:"2023-C8",year:2023,short:"Sabujeok",works:1,size_mb:2,tools:"Illustrator",collab:"Group",domain:"Illustration & Narrative"},
  {id:"2024-C1",year:2024,short:"BX(24)",works:5,size_mb:1206,tools:"Illus+PPT",collab:"Team+Solo",domain:"Brand & Graphic Systems"},
  {id:"2024-C2",year:2024,short:"Typo(24)",works:1,size_mb:909,tools:"Illustrator",collab:"Solo",domain:"Typography"},
  {id:"2024-C3",year:2024,short:"Comms(24)",works:3,size_mb:790,tools:"Illus+AE",collab:"Solo",domain:"Communication & Media"},
  {id:"2024-C4",year:2024,short:"Character(24)",works:2,size_mb:20,tools:"Illustrator",collab:"Solo",domain:"Illustration & Narrative"},
  {id:"2024-C5",year:2024,short:"Story(24)",works:2,size_mb:525,tools:"AE+PPT",collab:"Solo",domain:"Video & Animation"},
  {id:"2024-C6",year:2024,short:"Convergence",works:1,size_mb:0,tools:"Illustrator",collab:"Team",domain:"Brand & Graphic Systems"},
  {id:"2024-C7",year:2024,short:"CultureArts",works:1,size_mb:95,tools:"PPT+Word",collab:"Solo",domain:"Research & Writing"},
  {id:"2024-C8",year:2024,short:"Portfolio",works:2,size_mb:1412,tools:"Illustrator",collab:"Solo",domain:"Portfolio & Archive"},
  {id:"2025-C1",year:2025,short:"Editorial(25)",works:3,size_mb:211,tools:"InDesign+Ai",collab:"Solo",domain:"Editorial & Print"},
  {id:"2025-C2",year:2025,short:"Color(25)",works:1,size_mb:3760,tools:"Illustrator",collab:"Solo",domain:"Brand & Graphic Systems"},
  {id:"2025-C3",year:2025,short:"Story(25)",works:2,size_mb:15,tools:"Drawing",collab:"Solo",domain:"Illustration & Narrative"},
  {id:"2025-C4",year:2025,short:"Manga(25)",works:1,size_mb:58,tools:"PPT+Word",collab:"Solo",domain:"Illustration & Narrative"},
  {id:"2025-C5",year:2025,short:"InfoViz",works:1,size_mb:131,tools:"PPT",collab:"Solo",domain:"Communication & Media"},
  {id:"2025-C6",year:2025,short:"Editorial",works:1,size_mb:28,tools:"PPT",collab:"Solo",domain:"Editorial & Print"},
  {id:"2025-C7",year:2025,short:"InterFusion",works:1,size_mb:85,tools:"PPT",collab:"Unknown",domain:"Communication & Media"},
];

const EDGES = [
  {s:"2023-C3",t:"2024-C2",w:0.88,cross:true},
  {s:"2023-C4",t:"2024-C4",w:0.80,cross:true},
  {s:"2023-C4",t:"2025-C3",w:0.72,cross:true},
  {s:"2023-C5",t:"2024-C5",w:0.72,cross:true},
  {s:"2023-C1",t:"2025-C1",w:0.80,cross:true},
  {s:"2023-C7",t:"2025-C1",w:0.75,cross:true},
  {s:"2023-C6",t:"2024-C7",w:0.65,cross:true},
  {s:"2024-C3",t:"2025-C5",w:0.68,cross:true},
  {s:"2024-C4",t:"2025-C4",w:0.78,cross:true},
  {s:"2024-C5",t:"2025-C3",w:0.75,cross:true},
  {s:"2024-C1",t:"2025-C2",w:0.62,cross:true},
  {s:"2023-C8",t:"2025-C4",w:0.60,cross:true},
  {s:"2023-C2",t:"2023-C3",w:0.70,cross:false},
  {s:"2023-C3",t:"2023-C4",w:0.60,cross:false},
  {s:"2023-C4",t:"2023-C5",w:0.72,cross:false},
  {s:"2023-C1",t:"2023-C2",w:0.62,cross:false},
  {s:"2023-C6",t:"2023-C7",w:0.55,cross:false},
  {s:"2024-C1",t:"2024-C3",w:0.72,cross:false},
  {s:"2024-C1",t:"2024-C6",w:0.75,cross:false},
  {s:"2024-C3",t:"2024-C4",w:0.75,cross:false},
  {s:"2024-C3",t:"2024-C5",w:0.78,cross:false},
  {s:"2024-C2",t:"2024-C4",w:0.65,cross:false},
  {s:"2024-C4",t:"2024-C5",w:0.70,cross:false},
  {s:"2025-C1",t:"2025-C2",w:0.68,cross:false},
  {s:"2025-C3",t:"2025-C4",w:0.80,cross:false},
  {s:"2025-C1",t:"2025-C6",w:0.70,cross:false},
  {s:"2025-C5",t:"2025-C7",w:0.62,cross:false},
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Expose these controllers to the React component
  const controlsRef = useRef<any>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !wrap || !tooltip) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = wrap.clientWidth;
    let H = wrap.clientHeight;
    let dpr = window.devicePixelRatio || 1;

    let selectedNode: any = null;
    let hoveredNode: any = null;
    let wrapProgress = 0;

    // Use a cloned array so React HMR doesn't blow up physics logic repeatedly accumulating position
    const NODES = INITIAL_NODES.map(n => ({ ...n, x: 0, y: 0, vx: 0, vy: 0 }));
    
    function nodeR(n: any) { return 15 + n.works * 6; }

    function resize() {
      if (!wrap || !canvas) return;
      dpr = window.devicePixelRatio || 1;
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
    }

    function initPositions() {
      NODES.forEach(n => {
        const r = nodeR(n);
        n.x  = r + 40 + Math.random() * (W - 2 * r - 80);
        n.y  = r + 40 + Math.random() * (H - 2 * r - 80);
        n.vx = (Math.random() - 0.5) * 0.5;
        n.vy = (Math.random() - 0.5) * 0.5;
      });
      for (let i = 0; i < 80; i++) stepPhysics();
    }

    // Assign to refs for external use
    controlsRef.current.shuffleNodes = () => {
      initPositions();
      selectedNode = null;
      wrapProgress = 0;
    };

    controlsRef.current.clearSelection = () => {
      selectedNode = null;
      wrapProgress = 0;
    };

    function stepPhysics() {
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const a = NODES[i], b = NODES[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minD = nodeR(a) + nodeR(b) + 12;
          if (dist < minD) {
            const f = ((minD - dist) / minD) * 0.18;
            const fx = (dx / dist) * f, fy = (dy / dist) * f;
            a.vx -= fx; a.vy -= fy;
            b.vx += fx; b.vy += fy;
          }
        }
      }
      NODES.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.90; n.vy *= 0.90;
        const r = nodeR(n);
        if (n.x - r < 0)   { n.x = r;     n.vx =  Math.abs(n.vx); }
        if (n.x + r > W)   { n.x = W - r; n.vx = -Math.abs(n.vx); }
        if (n.y - r < 0)   { n.y = r;     n.vy =  Math.abs(n.vy); }
        if (n.y + r > H)   { n.y = H - r; n.vy = -Math.abs(n.vy); }
      });
    }

    function cross(O: any, A: any, B: any) {
      return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
    }
    function convexHull(pts: any[]) {
      if (pts.length < 2) return pts;
      const s = [...pts].sort((a, b) => a.x - b.x || a.y - b.y);
      const lo = [], hi = [];
      for (const p of s) {
        while (lo.length >= 2 && cross(lo[lo.length-2], lo[lo.length-1], p) <= 0) lo.pop();
        lo.push(p);
      }
      for (let i = s.length - 1; i >= 0; i--) {
        const p = s[i];
        while (hi.length >= 2 && cross(hi[hi.length-2], hi[hi.length-1], p) <= 0) hi.pop();
        hi.push(p);
      }
      hi.pop(); lo.pop();
      return lo.concat(hi);
    }
    function expandHull(hull: any[], pad: number) {
      const cx = hull.reduce((s, p) => s + p.x, 0) / hull.length;
      const cy = hull.reduce((s, p) => s + p.y, 0) / hull.length;
      return hull.map(p => {
        const dx = p.x - cx, dy = p.y - cy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        return { x: p.x + (dx / len) * pad, y: p.y + (dy / len) * pad };
      });
    }

    function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function getConnected(node: any) {
      const ids = new Set();
      EDGES.forEach(e => {
        if (e.s === node.id) ids.add(e.t);
        if (e.t === node.id) ids.add(e.s);
      });
      return NODES.filter(n => ids.has(n.id));
    }

    function isConnected(a: any, b: any) {
      return EDGES.some(e => (e.s === a.id && e.t === b.id) || (e.t === a.id && e.s === b.id));
    }

    function draw() {
      if(!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Background (transparent to allow CSS gradient)

      // Animate wrapProgress
      const target = selectedNode ? 1 : 0;
      wrapProgress += (target - wrapProgress) * 0.07;

      if (selectedNode && wrapProgress > 0.01) {
        const sn = selectedNode;
        const col = DOMAIN_COLOR[sn.domain] || '#222';
        const connected = getConnected(sn);
        const lineProg = Math.min(1, ease(Math.min(wrapProgress * 1.8, 1)));
        const hullProg = Math.max(0, ease((wrapProgress - 0.35) / 0.65));

        connected.forEach(cn => {
          const ex = sn.x + (cn.x - sn.x) * lineProg;
          const ey = sn.y + (cn.y - sn.y) * lineProg;
          ctx.save();
          ctx.strokeStyle = 'rgba(255,255,255,0.35)';
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = lineProg * 0.8;
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.moveTo(sn.x, sn.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.setLineDash([]);

          if (lineProg > 0.85) {
            const mx = (sn.x + cn.x) / 2, my = (sn.y + cn.y) / 2;
            const edge = EDGES.find(e =>
              (e.s === sn.id && e.t === cn.id) || (e.t === sn.id && e.s === cn.id)
            );
            if (edge) {
              ctx.globalAlpha = (lineProg - 0.85) / 0.15 * 0.75;
              ctx.font = '500 10px -apple-system, Arial';
              ctx.fillStyle = '#f4f4f5';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(edge.w.toFixed(2), mx, my - 8);
            }
          }
          ctx.restore();
        });

        if (hullProg > 0.01) {
          const allPts = [sn, ...connected].map(n => ({ x: n.x, y: n.y }));
          if (allPts.length >= 3) {
            const maxR = Math.max(...[sn, ...connected].map(n => nodeR(n)));
            const hull = convexHull(allPts);
            const expanded = expandHull(hull, maxR + 18);

            ctx.save();
            ctx.globalAlpha = hullProg * 0.10;
            ctx.fillStyle = col;
            ctx.beginPath();
            expanded.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.globalAlpha = hullProg * 0.45;
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([6, 5]);
            ctx.lineJoin = 'round';
            ctx.beginPath();
            expanded.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
          } else if (allPts.length === 2) {
            ctx.save();
            ctx.globalAlpha = hullProg * 0.35;
            ctx.strokeStyle = col;
            ctx.lineWidth = (nodeR(sn) + nodeR(connected[0])) * 0.9;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(sn.x, sn.y);
            ctx.lineTo(connected[0].x, connected[0].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      NODES.forEach(n => {
        const r = nodeR(n);
        const col = DOMAIN_COLOR[n.domain] || '#888';
        const isSel = selectedNode === n;
        const isHov = hoveredNode === n;
        const isCon = selectedNode && !isSel && isConnected(selectedNode, n);
        const isDim = selectedNode && !isSel && !isCon;

        ctx.save();
        ctx.globalAlpha = isDim ? (1 - wrapProgress * 0.65) : 1.0;

        if (isSel || isHov) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
          ctx.fillStyle = col + '30';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r + (isSel ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        if (isSel) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (isHov) {
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        const fs = Math.max(8, 11 - n.works);
        ctx.font = \`500 \${fs}px -apple-system, Arial\`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.short, n.x, n.y);

        ctx.restore();
      });

      ctx.restore();
    }

    function getNodeAt(mx: number, my: number) {
      for (let i = NODES.length - 1; i >= 0; i--) {
        const n = NODES[i];
        const dx = mx - n.x, dy = my - n.y;
        if (dx * dx + dy * dy <= nodeR(n) ** 2) return n;
      }
      return null;
    }

    // Listeners
    const onMouseMove = (e: MouseEvent) => {
      if(!canvas || !tooltip) return;
      const rect = canvas.getBoundingClientRect();
      const n = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
      hoveredNode = n;
      canvas.style.cursor = n ? 'pointer' : 'default';
      
      if (n) {
        const col = DOMAIN_COLOR[n.domain] || '#333';
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top  = (e.clientY - 10) + 'px';
        tooltip.innerHTML = '<strong style="color:' + col + '">' + n.short + '</strong><br>' +
          '<div style="color:#d4d4d8; margin-top:2px;">' +
            n.year + ' · ' + n.domain + '<br>' +
            n.works + ' work(s) · ' + n.tools + '<br>' +
            'Collab: ' + n.collab +
          '</div>';
      } else {
        tooltip.style.display = 'none';
      }
    };

    const onClick = (e: MouseEvent) => {
      if(!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const n = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
      if (n) {
        selectedNode = selectedNode === n ? null : n;
      } else {
        selectedNode = null;
      }
      if (!selectedNode) wrapProgress = 0;
    };

    const onMouseLeave = () => {
      hoveredNode = null;
      if(tooltip) tooltip.style.display = 'none';
    };

    let animFrame: number;
    function animate() {
      animFrame = requestAnimationFrame(animate);
      stepPhysics();
      draw();
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);
    
    resize();
    initPositions();
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="nav-brand">✦ 심희진 2023–2025</div>
        <div className="nav-item" onClick={() => controlsRef.current.shuffleNodes?.()}>↻ &nbsp;Shuffle</div>
        <div className="nav-item" onClick={() => controlsRef.current.clearSelection?.()}>◎ &nbsp;Clear</div>
        <div className="nav-right">Similarity Network · KAA Design</div>
      </nav>

      <div id="canvasWrap" ref={wrapRef}>
        <canvas id="c" ref={canvasRef}></canvas>
        <div id="legend">
          {Object.entries(DOMAIN_COLOR).map(([name, col]) => (
            <div key={name} className="leg">
              <div className="leg-dot" style={{ background: col }}></div>
              {name}
            </div>
          ))}
        </div>
        <div id="hint">Click a node to reveal connections &amp; wrapping</div>
      </div>
      <div id="tooltip" ref={tooltipRef}></div>
    </>
  );
}