"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function lerp(a, b, n) { return (1 - n) * a + n * b; }

function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  if ("touches" in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
  } else { clientX = e.clientX; clientY = e.clientY; }
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

class ImageItem {
  constructor(el) {
    this.DOM = { el, inner: el.querySelector(".img-inner") };
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.rect = null;
    this._resize = () => { gsap.set(this.DOM.el, this.defaultStyle); this.getRect(); };
    window.addEventListener("resize", this._resize);
    this.getRect();
  }
  getRect() { this.rect = this.DOM.el.getBoundingClientRect(); }
  destroy() { window.removeEventListener("resize", this._resize); }
}

class TrailBase {
  constructor(container, threshold) {
    this.container = container;
    this.images = [...container.querySelectorAll(".trail-img")].map(el => new ImageItem(el));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = threshold;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.rafId = null;

    const onMove = (ev) => { this.mousePos = getLocalPointerPos(ev, container.getBoundingClientRect()); };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onMove);

    const initRender = (ev) => {
      this.mousePos = getLocalPointerPos(ev, container.getBoundingClientRect());
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener("mousemove", initRender);
      container.removeEventListener("touchmove", initRender);
    };
    container.addEventListener("mousemove", initRender);
    container.addEventListener("touchmove", initRender);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.images.forEach(img => img.destroy());
  }
}

// ── Variant 1: Classic Lerp ──────────────────────────────────────
class Variant1 extends TrailBase {
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, scale: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.4, ease: "power1", x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "power3", opacity: 0, scale: 0.2 }, 0.4);
  }
}

// ── Variant 2: Luminous Bloom ────────────────────────────────────
class Variant2 extends TrailBase {
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .fromTo(img.DOM.inner, { scale: 2.8, filter: "brightness(250%)" }, { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%)" }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "power2", opacity: 0, scale: 0.2 }, 0.45);
  }
}

// ── Variant 3: Ethereal Ascent ───────────────────────────────────
class Variant3 extends TrailBase {
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, xPercent: 0, yPercent: 0, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .to(img.DOM.el, { duration: 0.6, ease: "power2", opacity: 0, scale: 0.2, xPercent: () => gsap.utils.random(-30, 30), yPercent: -200 }, 0.6);
  }
}

// ── Variant 4: Motion Drift ──────────────────────────────────────
class Variant4 extends TrailBase {
  render() {
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    let dx = this.mousePos.x - this.cacheMousePos.x, dy = this.mousePos.y - this.cacheMousePos.y;
    const dist = Math.hypot(dx, dy) || 1;
    dx = (dx / dist) * (dist / 100); dy = (dy / dist) * (dist / 100);
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .fromTo(img.DOM.inner, { scale: 2, filter: `brightness(${Math.max(400 * dist / 100, 100)}%) contrast(${Math.max(400 * dist / 100, 100)}%)` },
        { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%) contrast(100%)" }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "power3", opacity: 0 }, 0.4)
      .to(img.DOM.el, { duration: 1.5, ease: "power4", x: `+=${dx * 110}`, y: `+=${dy * 110}` }, 0.05);
  }
}

// ── Variant 5: Angular Flow ──────────────────────────────────────
class Variant5 extends TrailBase {
  constructor(container, threshold) { super(container, threshold); this.lastAngle = 0; }
  render() {
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x, dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const clockwise = angle >= this.lastAngle;
    const startAngle = clockwise ? angle - 10 : angle + 10;
    this.lastAngle = angle;
    const dist = Math.hypot(dx, dy) || 1;
    dx = (dx / dist) * (dist / 150); dy = (dy / dist) * (dist / 150);
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, filter: "brightness(80%)", scale: 0.1, zIndex: this.zIndexVal, rotation: startAngle, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 1, ease: "power2", scale: 1, filter: "brightness(100%)", rotation: this.lastAngle, x: this.mousePos.x - w/2 + dx*70, y: this.mousePos.y - h/2 + dy*70 }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "expo", opacity: 0 }, 0.5)
      .to(img.DOM.el, { duration: 1.5, ease: "power4", x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
  }
}

// ── Variant 6: Kinetic Blur ──────────────────────────────────────
class Variant6 extends TrailBase {
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    const dx = this.mousePos.x - this.cacheMousePos.x, dy = this.mousePos.y - this.cacheMousePos.y;
    const speed = Math.hypot(dx, dy);
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    const scaleFactor = 0.3 + 1.7 * Math.min(speed / 200, 1);
    const brightness = 1 + 0.3 * Math.min(speed / 70, 1);
    const blur = 20 * (1 - Math.min(speed / 90, 1));
    const gray = 1 - Math.min(speed / 90, 1);
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.8, ease: "power3", scale: scaleFactor, filter: `grayscale(${gray*100}%) brightness(${brightness*100}%) blur(${blur}px)`, x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "power3.in", opacity: 0, scale: 0.2 }, 0.45);
  }
}

// ── Variant 7: Depth Stack ───────────────────────────────────────
class Variant7 extends TrailBase {
  constructor(container, threshold) { super(container, threshold); this.visibleCount = 0; this.visibleTotal = 9; }
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    ++this.visibleCount;
    const scale = gsap.utils.random(0.5, 1.6);
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .fromTo(img.DOM.el, { scale: scale - 0.4, rotationZ: 0, opacity: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 0.4, ease: "power3", scale, rotationZ: gsap.utils.random(-3, 3), x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0);
    if (this.visibleCount >= this.visibleTotal) {
      const old = this.images[(this.imgPosition - this.visibleTotal + this.imagesTotal) % this.imagesTotal];
      gsap.to(old.DOM.el, { duration: 0.4, ease: "power4", opacity: 0, scale: 1.3 });
    }
  }
}

// ── Variant 8: 3D Perspective ────────────────────────────────────
class Variant8 extends TrailBase {
  render() {
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
      this.showNextImage(); this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.rafId = requestAnimationFrame(() => this.render());
  }
  showNextImage() {
    const rect = this.container.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const relX = this.mousePos.x - cx, relY = this.mousePos.y - cy;
    const rotX = -(relY / cy) * 30, rotY = (relX / cx) * 30;
    const distC = Math.hypot(relX, relY);
    const maxD = Math.hypot(cx, cy);
    const z = (distC / maxD) * 1200 - 600;
    const brightness = 0.2 + ((z + 600) / 1200) * 2.3;
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    const w = img.rect?.width ?? 0, h = img.rect?.height ?? 0;
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
      .set(this.container, { perspective: 1000 })
      .fromTo(img.DOM.el, { opacity: 1, z: 0, scale: 1 + z/1000, zIndex: this.zIndexVal, rotationX: rotX, rotationY: rotY, filter: `brightness(${brightness})`, x: this.cacheMousePos.x - w/2, y: this.cacheMousePos.y - h/2 },
        { duration: 1, ease: "expo", scale: 1 + z/1000, rotationX: rotX, rotationY: rotY, x: this.mousePos.x - w/2, y: this.mousePos.y - h/2 }, 0)
      .to(img.DOM.el, { duration: 0.4, ease: "power2", opacity: 0, z: -800 }, 0.3);
  }
}

const VARIANTS = { 1: Variant1, 2: Variant2, 3: Variant3, 4: Variant4, 5: Variant5, 6: Variant6, 7: Variant7, 8: Variant8 };

export function ImageTrail({ items = [], variant = 2, threshold = 80 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const Cls = VARIANTS[variant] || Variant1;
    const instance = new Cls(containerRef.current, threshold);
    return () => instance.destroy();
  }, [variant, items, threshold]);

  return (
    <div ref={containerRef}
      className="w-full h-full relative overflow-visible touch-none cursor-crosshair">
      {items.map((url, i) => (
        <div key={i}
          className="trail-img absolute top-0 left-0 opacity-0 overflow-hidden rounded-xl shadow-2xl"
          style={{ width: 200, aspectRatio: "1.1", willChange: "transform, filter" }}>
          <div className="img-inner absolute inset-[-10px] bg-center bg-cover"
            style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}

export default ImageTrail;
