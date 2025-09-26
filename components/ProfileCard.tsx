"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import "./ProfileCard.css";
import Image from "next/image";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
} as const;

const clamp = (v: number, min = 0, max = 100) =>
  Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "/profile.png",
  iconUrl,
  grainUrl,
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Dimas Rhoyhan B.S",
  title = "Information Systems Student",
  handle = "TESSER",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick = () => {
    window.open("https://www.instagram.com/dimasrbs/", "_blank");
  },
}) => {
  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [miniSrc, setMiniSrc] = useState(miniAvatarUrl || avatarUrl);

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(
          Math.hypot(percentY - 50, percentX - 50) / 50,
          0,
          1
        )}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(props).forEach(([key, val]) =>
        wrap.style.setProperty(key, val)
      );
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const loop = (time: number) => {
        const elapsed = time - startTime;
        const progress = clamp(elapsed / duration);
        const eased = easeInOutCubic(progress);
        const currentX = adjust(eased, 0, 1, startX, targetX);
        const currentY = adjust(eased, 0, 1, startY, targetY);
        updateCardTransform(currentX, currentY, card, wrap);
        if (progress < 1) rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
      const rect = cardRef.current.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        e.clientX - rect.left,
        e.clientY - rect.top,
        cardRef.current,
        wrapRef.current
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrapRef.current.classList.add("active");
    cardRef.current.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (e: PointerEvent) => {
      if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        e.offsetX,
        e.offsetY,
        cardRef.current,
        wrapRef.current
      );
      wrapRef.current.classList.remove("active");
      cardRef.current.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
      const { beta, gamma } = event;
      if (!beta || !gamma) return;
      animationHandlers.updateCardTransform(
        cardRef.current.clientHeight / 2 + gamma * mobileTiltSensitivity,
        cardRef.current.clientWidth / 2 +
          (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        cardRef.current,
        wrapRef.current
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    if (!cardRef.current || !wrapRef.current) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    const enter = handlePointerEnter as EventListener;
    const move = handlePointerMove as EventListener;
    const leave = handlePointerLeave as EventListener;
    const orientation = handleDeviceOrientation as EventListener;

    const click = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      if (
        typeof (window.DeviceMotionEvent as any).requestPermission ===
        "function"
      ) {
        (window.DeviceMotionEvent as any)
          .requestPermission()
          .then((state: string) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", orientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", orientation);
      }
    };

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("click", click);

    const initX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    animationHandlers.updateCardTransform(initX, initY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initX,
      initY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("click", click);
      window.removeEventListener("deviceorientation", orientation);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    animationHandlers,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--behind-gradient": showBehindGradient
          ? behindGradient ?? DEFAULT_BEHIND_GRADIENT
          : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      } as React.CSSProperties),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <Image
              className="avatar"
              src={avatarSrc}
              alt={`${name} avatar`}
              width={1000}
              height={1000}
              loading="lazy"
              onError={() => setAvatarSrc("/fallback.png")}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <Image
                      src={miniSrc}
                      alt={`${name} mini avatar`}
                      width={40}
                      height={40}
                      loading="lazy"
                      onError={() => setMiniSrc(avatarSrc)}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>

                <button
                  className="pc-contact-btn"
                  onClick={onContactClick}
                  type="button"
                  aria-label={`Contact ${name}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileCardComponent);
