"use client"

import { useRef, type CSSProperties, type ReactNode } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useLocale, useTranslations } from "next-intl"
import { experience } from "@/content/experience"
import { education } from "@/content/education"
import { workflow } from "@/content/workflow"
import { BrandMark } from "@/components/navigation/BrandMark"
import { HashLink } from "@/components/navigation/HashLink"
import { LocaleSwitch } from "@/components/navigation/LocaleSwitch"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const W = 1440
const H = 6032

function Frame({
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
}: {
  x: number
  y: number
  w?: number
  h?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: x, top: y, width: w, height: h, ...style }}
    >
      {children}
    </div>
  )
}

function PhotoFrame({
  className,
  style,
  overlay,
  children,
}: {
  className?: string
  style?: CSSProperties
  overlay?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`} style={style}>
      <div className="relative size-full">{children}</div>
      {overlay}
    </div>
  )
}

function VLine({ x, y, length }: { x: number; y: number; length: number }) {
  return (
    <div
      className="spine absolute z-20 origin-top bg-black"
      style={{ left: x, top: y, width: 0.5, height: length }}
    />
  )
}

function ExpDate({ start, x, y }: { start: string; x: number; y: number }) {
  const [month, year] = start.split("/")
  return (
    <p
      className="reveal absolute z-20 tracking-[1.82px] uppercase"
      style={{ left: x, top: y }}
    >
      <span className="text-[13px] leading-[1.295]">{month}</span>
      <span className="text-[14px] leading-[1.295]">/</span>
      <span className="text-[24px] leading-[1.295]">{year}</span>
    </p>
  )
}

function ExpJob({
  company,
  detail,
  x,
  y,
  align,
}: {
  company: string
  detail: string
  x: number
  y: number
  align: "left" | "right"
}) {
  return (
    <div
      className={`reveal absolute z-20 w-[200px] text-[14px] tracking-[1.82px] uppercase ${
        align === "right" ? "-translate-x-full text-right" : ""
      }`}
      style={{ left: x, top: y }}
    >
      <p className="mb-0 leading-[1.295]">{company}</p>
      <p className="leading-[1.295]">{detail}</p>
    </div>
  )
}

export function HomeCanvas() {
  const root = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const t = useTranslations()
  const introRoles = t.raw("intro.roles") as string[]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          motion:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return

          let split: SplitText | undefined
          const headline = root.current?.querySelector("h1")
          const playIntro = () => {
            if (!headline || split) return
            try {
              split = SplitText.create(headline, {
                type: "words,lines",
                linesClass: "hero-line",
              })
            } catch {
              split = undefined
            }
            const intro = gsap.timeline({ defaults: { ease: "power2.out" } })
            if (split?.words.length) {
              intro.from(split.words, {
                yPercent: 110,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.022,
              })
            }
            intro.fromTo(
              ".hero-meta",
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              split ? "-=0.45" : 0,
            )
            intro.fromTo(
              ".hero-photo",
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 1.05, stagger: 0.12 },
              "-=0.5",
            )
          }
          if (document.fonts.status === "loaded") playIntro()
          else void document.fonts.ready.then(playIntro)

          const spines = gsap.utils.toArray<HTMLElement>(".spine", root.current)
          gsap.set(spines, { scaleY: 0, transformOrigin: "50% 0%" })
          spines.forEach((line) => {
            gsap.to(line, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 92%",
                end: "top 55%",
                scrub: true,
              },
            })
          })

          gsap.utils
            .toArray<HTMLElement>(".reveal", root.current)
            .forEach((el) => {
              gsap.from(el, {
                y: 22,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  once: true,
                  toggleActions: "play none none none",
                },
              })
            })

          gsap.from(".stack-col", {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: "[data-anchor='system']",
              start: "top 72%",
              once: true,
              toggleActions: "play none none none",
            },
          })

          const imgs = root.current?.querySelectorAll("img") ?? []
          let pending = imgs.length
          const refresh = () => ScrollTrigger.refresh()
          if (pending) {
            const onDone = () => {
              pending -= 1
              if (pending === 0) refresh()
            }
            imgs.forEach((img) => {
              if (img.complete) onDone()
              else {
                img.addEventListener("load", onDone, { once: true })
                img.addEventListener("error", onDone, { once: true })
              }
            })
          }

          return () => split?.revert()
        },
      )

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine) and (hover: hover)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            ".hero-tilt",
            root.current,
          )
          const cleanups = cards.map((el) => {
            gsap.set(el, {
              transformPerspective: 900,
              rotationX: 0,
              rotationY: 0,
              force3D: true,
            })
            const rotateX = gsap.quickTo(el, "rotationX", {
              duration: 0.18,
              ease: "power3.out",
            })
            const rotateY = gsap.quickTo(el, "rotationY", {
              duration: 0.18,
              ease: "power3.out",
            })
            const move = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect()
              const px = (event.clientX - rect.left) / rect.width - 0.5
              const py = (event.clientY - rect.top) / rect.height - 0.5
              rotateY(px * 9)
              rotateX(py * -7)
            }
            const leave = () => {
              rotateX(0)
              rotateY(0)
            }
            el.addEventListener("pointermove", move)
            el.addEventListener("pointerleave", leave)
            return () => {
              el.removeEventListener("pointermove", move)
              el.removeEventListener("pointerleave", leave)
            }
          })
          return () => cleanups.forEach((fn) => fn())
        },
      )
      return () => mm.revert()
    },
    { scope: root, dependencies: [locale] },
  )

  return (
    <div
      data-layout="desktop"
      className="hidden overflow-x-clip bg-white lg:block"
      style={{ height: "calc(6032px * min(1, 100vw / 1440px))" }}
    >
      <div
        ref={root}
        className="relative bg-white text-black"
        style={{
          width: W,
          height: H,
          transformOrigin: "top left",
          transform: "scale(min(1, 100vw / 1440px))",
          marginInline: "max(0px, calc((100vw - 1440px) / 2))",
        }}
      >
        <Frame x={131.03} y={36.61} w={79} h={26}>
          <a
            href="#top"
            data-anchor="top"
            className="flex size-full items-center"
          >
            <BrandMark />
          </a>
        </Frame>

        <div className="absolute top-[36.61px] left-[806px] flex h-[27.12px] items-center gap-10 text-[18px] leading-none">
          <HashLink href="/#experience" offset={0} className="inline-flex h-full items-center uppercase">
            {t("nav.experience")}
          </HashLink>
          <HashLink href="/#workflow" offset={0} className="inline-flex h-full items-center uppercase">
            {t("nav.workflow")}
          </HashLink>
          <HashLink href="/#contact" offset={0} className="inline-flex h-full items-center">
            {t("nav.contact")}
          </HashLink>
        </div>
        <LocaleSwitch
          label={t("a11y.locale")}
          className="absolute top-[36.61px] right-[60.56px] h-[27.12px] text-[18px] leading-none"
          linkClassName="h-full px-1.5"
        />

        <div
          className="absolute top-[214.14px] left-[25.06px] flex h-[337px] w-[63px] flex-col items-center"
          style={{ writingMode: "vertical-rl" }}
        >
          <p
            className="text-[12px] tracking-[2.64px] text-[#12262c] uppercase"
            style={{ transform: "rotate(180deg)" }}
          >
            {t("hero.scroll")}
          </p>
        </div>
        <img
          src="/images/scroll-arrow.svg"
          alt=""
          className="absolute top-[446.4px] left-[45.07px] h-[94px] w-px"
        />

        <p className="absolute top-[341.62px] left-[1381.71px] w-[32.191px] -translate-x-full whitespace-pre-wrap text-right text-[16px] leading-[20.5px]">
          <a href="https://www.linkedin.com/in/javier-baro-morales-75183717b">
            Lk
          </a>
          {"\n\n"}
          Git
          {"\n\n"}
          Mail
        </p>

        <h1 className="absolute top-[280.12px] left-[125.74px] z-20 h-[456.1px] w-[1145.228px] text-[85px] leading-[1.01] font-normal">
          {t("hero.headline")}
        </h1>
        <p className="hero-meta absolute top-[726.22px] left-[136.03px] w-[948.86px] whitespace-pre-wrap text-[16px] leading-[1.01]">
          {t("hero.supporting")}
        </p>

        <div
          className="hero-photo absolute z-10"
          style={{
            left: 1101.5,
            top: 556.38,
            width: 427.109,
            height: 339.669,
            perspective: 900,
          }}
        >
          <div className="hero-tilt relative size-full overflow-hidden">
            <img
              src="/images/hero-portrait.png"
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>

        <div
          className="hero-photo absolute z-10"
          style={{
            left: -75.3,
            top: 787.97,
            width: 441.49,
            height: 334.866,
            perspective: 900,
          }}
        >
          <div className="hero-tilt relative size-full overflow-hidden">
            <img
              src="/images/hero-keyboard.png"
              alt=""
              className="size-full object-cover object-bottom"
            />
          </div>
        </div>

        <div
          className="hero-photo absolute z-10"
          style={{
            left: 595.29,
            top: 863.96,
            width: 345.835,
            height: 421.239,
            perspective: 900,
          }}
        >
          <div className="hero-tilt relative size-full overflow-hidden">
            <img
              src="/images/hero-spiral.svg"
              alt=""
              className="absolute max-w-none"
              style={{ left: -2.792, top: -4.282, width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <p className="reveal absolute top-[1458.74px] left-[370.62px] w-[231.12px] text-[14px] leading-[1.295] tracking-[1.82px]">
          {t("intro.leftEyebrow")}
        </p>
        <p className="reveal absolute top-[1458.74px] left-[736.91px] w-[231.12px] text-[14px] leading-[1.295] tracking-[1.82px]">
          {t("intro.rightEyebrow")}
        </p>
        <div className="reveal absolute top-[1499.72px] left-[370.62px] h-[255.725px] w-[303.754px] whitespace-pre-wrap text-[36px]">
          <p className="mb-0">
            <span className="leading-[1.295]">{t("intro.roleLead")} </span>
            <span className="leading-[0.945]">{t("intro.roleLeadRest")} </span>
          </p>
          {introRoles.map((role, index) => (
            <p
              key={role}
              className={
                index === introRoles.length - 1
                  ? "leading-[1.295]"
                  : "mb-0 leading-[1.295]"
              }
            >
              {role}
            </p>
          ))}
        </div>
        <p className="reveal absolute top-[1499.72px] left-[736.91px] h-[255.725px] w-[303.754px] text-[16px] leading-[1.575]">
          {t("intro.paragraph")}
        </p>

        <p
          data-anchor="experience"
          className="reveal absolute top-[1912.63px] left-[720px] z-20 w-[231.12px] -translate-x-1/2 text-center text-[14px] leading-[1.295] tracking-[1.82px] uppercase"
        >
          {t("experience.eyebrow")}
        </p>

        <PhotoFrame
          className="absolute z-0 overflow-hidden"
          style={{
            left: 900,
            top: 2063.52,
            width: 540,
            height: 433.128,
          }}
          overlay={
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[443.114px]"
              style={{
                backgroundImage:
                  "linear-gradient(103.44deg, rgba(255,255,255,0.63) 21.9%, rgba(196,196,196,0) 90.28%)",
              }}
            />
          }
        >
          <img
            src="/images/exp-right.png"
            alt=""
            className="size-full object-cover"
          />
        </PhotoFrame>

        <PhotoFrame
          className="absolute z-0 flex items-center justify-center overflow-hidden"
          style={{
            left: 0,
            top: 2319.09,
            width: 573.341,
            height: 500.293,
          }}
        >
          <div className="-scale-y-100 rotate-180">
            <img
              src="/images/exp-left.png"
              alt=""
              className="h-[500.293px] w-[573.341px] object-cover"
            />
          </div>
        </PhotoFrame>

        <VLine x={720} y={1969.16} length={105.887} />
        <VLine x={720} y={2211} length={90} />
        <VLine x={720} y={2448} length={80} />
        <VLine x={720} y={2678} length={80} />

        {experience.map((job, index) => {
          const slot = [
            { dateX: 684.32, dateY: 2098.29, textX: 686.02, textY: 2140.41, align: "left" as const },
            { dateX: 675.99, dateY: 2325, textX: 768.21, textY: 2367, align: "right" as const },
            { dateX: 684.86, dateY: 2552, textX: 685.17, textY: 2594, align: "left" as const },
            { dateX: 675.99, dateY: 2779, textX: 768.21, textY: 2821, align: "right" as const },
          ][index]
          if (!slot) return null
          const detail = job.internship
            ? t("experience.internship")
            : t(`experience.jobs.${job.id}.role`)
          return (
            <div key={job.id}>
              <ExpDate start={job.start} x={slot.dateX} y={slot.dateY} />
              <ExpJob
                company={job.company}
                detail={detail}
                x={slot.textX}
                y={slot.textY}
                align={slot.align}
              />
            </div>
          )
        })}

        <div
          data-anchor="system"
          className="absolute z-10 bg-black text-white"
          style={{
            left: 0,
            top: 3007.21,
            width: 1440,
            height: 714.981,
          }}
        >
          <p className="reveal absolute top-[72px] left-1/2 w-[231.12px] -translate-x-1/2 text-center text-[14px] leading-[1.295] tracking-[1.82px] uppercase">
            {t("stack.eyebrow")}
          </p>
          <div className="absolute top-[118px] left-[180px] h-px w-[1080px] bg-white/25" />
          <p className="absolute top-[148px] left-[180px] w-[1080px] text-center text-[16px] leading-[1.575] text-white/55">
            {t("stack.statement")}
          </p>
          <div className="absolute inset-x-[120px] top-[280px] flex justify-between">
            <div className="stack-col w-[200px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.language")}
              </p>
              <p className="mt-4 text-[28px] leading-[1.15]">TypeScript</p>
              <p className="mt-2 text-[16px] leading-[1.575] text-white/70">
                JavaScript
              </p>
            </div>
            <div className="stack-col w-[200px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.ui")}
              </p>
              <p className="mt-4 text-[28px] leading-[1.15]">Angular</p>
              <p className="mt-2 text-[16px] leading-[1.575] text-white/70">
                {t("stack.components")}
              </p>
            </div>
            <div className="stack-col w-[200px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.also")}
              </p>
              <p className="mt-4 text-[28px] leading-[1.15]">React</p>
              <p className="mt-2 text-[16px] leading-[1.575] text-white/70">
                Next.js
              </p>
            </div>
            <div className="stack-col w-[200px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.foundation")}
              </p>
              <p className="mt-4 text-[28px] leading-[1.15]">HTML, CSS</p>
              <p className="mt-2 text-[16px] leading-[1.575] text-white/70">
                {t("stack.layoutType")}
              </p>
            </div>
            <div className="stack-col w-[200px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.quality")}
              </p>
              <p className="mt-4 text-[28px] leading-[1.15]">{t("stack.a11y")}</p>
              <p className="mt-2 text-[16px] leading-[1.575] text-white/70">
                {t("stack.performance")}
              </p>
            </div>
          </div>
          <div className="absolute top-[440px] left-[180px] h-px w-[1080px] bg-white/25" />
          <p className="reveal absolute top-[458px] left-1/2 w-[231.12px] -translate-x-1/2 text-center text-[13px] leading-[1.295] tracking-[1.82px] text-white/45 uppercase">
            {t("stack.alongside")}
          </p>
          <div className="absolute inset-x-[120px] top-[492px] flex justify-between">
            <div className="stack-col w-[240px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.angularEco")}
              </p>
              <p className="mt-3 text-[20px] leading-[1.25]">RxJS</p>
              <p className="mt-1 text-[16px] leading-[1.575] text-white/70">
                Sass, Nx
              </p>
            </div>
            <div className="stack-col w-[240px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.java")}
              </p>
              <p className="mt-3 text-[20px] leading-[1.25]">Spring Boot</p>
              <p className="mt-1 text-[16px] leading-[1.575] text-white/70">
                JPA, Hibernate
              </p>
            </div>
            <div className="stack-col w-[240px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.faces")}
              </p>
              <p className="mt-3 text-[20px] leading-[1.25]">JSF</p>
              <p className="mt-1 text-[16px] leading-[1.575] text-white/70">
                PrimeFaces
              </p>
            </div>
            <div className="stack-col w-[240px]">
              <p className="text-[13px] tracking-[1.82px] text-white/45 uppercase">
                {t("stack.cms")}
              </p>
              <p className="mt-3 text-[20px] leading-[1.25]">WordPress</p>
            </div>
          </div>
        </div>

        <img
          src="/images/logo-mark.svg"
          alt=""
          className="absolute"
          style={{
            left: 175.39,
            top: 3808.92,
            width: 304.797,
            height: 152.398,
          }}
        />

        <p
          data-anchor="education"
          className="reveal absolute top-[3871.12px] left-[720px] z-20 w-[231.12px] -translate-x-1/2 text-center text-[14px] leading-[1.295] tracking-[1.82px] uppercase"
        >
          {t("education.eyebrow")}
        </p>

        <PhotoFrame
          className="absolute z-0 overflow-hidden"
          style={{
            left: 920,
            top: 4019.62,
            width: 520,
            height: 572.631,
          }}
          overlay={
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[180px]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)",
              }}
            />
          }
        >
          <img
            src="/images/edu-right.png"
            alt=""
            className="size-full object-cover"
          />
        </PhotoFrame>

        <PhotoFrame
          className="absolute z-0 overflow-hidden"
          style={{
            left: -545.71,
            top: 4288.17,
            width: 1119.046,
            height: 597.893,
          }}
        >
          <img
            src="/images/edu-left.png"
            alt=""
            className="size-full object-cover object-bottom"
          />
        </PhotoFrame>

        <VLine x={720} y={3925.26} length={105.887} />
        <VLine x={720} y={4188} length={140} />

        <p className="reveal absolute top-[4054.39px] left-[684.32px] z-20 tracking-[1.82px] uppercase">
          <span className="text-[13px] leading-[1.295]">2016</span>
          <span className="text-[14px] leading-[1.295]">/</span>
          <span className="text-[24px] leading-[1.295]">2019</span>
        </p>
        <div className="reveal absolute top-[4096.51px] left-[738px] z-20 w-[170px] text-[14px] tracking-[1.82px] uppercase">
          <p className="mb-0 leading-[1.295]">{education[0].school}</p>
          <p className="leading-[1.295]">
            {t(`education.items.${education[0].id}.detail`)}
          </p>
        </div>

        <p className="reveal absolute top-[4365.8px] left-[675.99px] z-20 tracking-[1.82px] uppercase">
          <span className="text-[13px] leading-[1.295]">2009</span>
          <span className="text-[14px] leading-[1.295]">/</span>
          <span className="text-[24px] leading-[1.295]">2011</span>
        </p>
        <div className="reveal absolute top-[4407.35px] left-[702px] z-20 w-[170px] -translate-x-full text-right text-[14px] tracking-[1.82px] uppercase">
          <p className="mb-0 leading-[1.295]">{education[1].school}</p>
          <p className="leading-[1.295]">
            {t(`education.items.${education[1].id}.detail`)}
          </p>
        </div>

        <p
          data-anchor="workflow"
          className="reveal absolute top-[4620px] left-[720px] z-20 w-[231.12px] -translate-x-1/2 text-center text-[14px] leading-[1.295] tracking-[1.82px] uppercase"
        >
          {t("workflow.eyebrow")}
        </p>
        <p className="reveal absolute top-[4658px] left-[720px] z-20 w-[420px] -translate-x-1/2 text-center text-[16px] leading-[1.575]">
          {t("workflow.note")}
        </p>
        <VLine x={720} y={4736} length={32} />

        {workflow.map((step, index) => {
          const slot = [
            { numY: 4780, titleY: 4818, bodyY: 4854, align: "right" as const },
            { numY: 4930, titleY: 4968, bodyY: 5004, align: "left" as const },
            { numY: 5080, titleY: 5118, bodyY: 5154, align: "right" as const },
            { numY: 5230, titleY: 5268, bodyY: 5304, align: "left" as const },
          ][index]
          if (!slot) return null
          const left = slot.align === "left"
          const x = left ? 688 : 752
          const side = left ? "-translate-x-full text-right" : ""
          return (
            <div key={step.id}>
              {index > 0 ? (
                <VLine x={720} y={slot.numY - 48} length={32} />
              ) : null}
              <p
                className={`reveal absolute z-20 text-[24px] leading-[1.295] tracking-[1.82px] uppercase ${side}`}
                style={{ left: x, top: slot.numY }}
              >
                {step.index}
              </p>
              <p
                className={`reveal absolute z-20 w-[280px] text-[14px] tracking-[1.82px] uppercase ${side}`}
                style={{ left: x, top: slot.titleY }}
              >
                {t(`workflow.steps.${step.id}.title`)}
              </p>
              <p
                className={`reveal absolute z-20 w-[280px] text-[16px] leading-[1.575] ${side}`}
                style={{ left: x, top: slot.bodyY }}
              >
                {t(`workflow.steps.${step.id}.body`)}
              </p>
            </div>
          )
        })}

        <div
          data-anchor="contact"
          className="absolute overflow-hidden bg-[#f6f6f6]"
          style={{
            left: 533.51,
            top: 5366.29,
            width: 963.67,
            height: 524.579,
          }}
        >
          <img
            src="/images/footer-spiral.svg"
            alt=""
            className="absolute max-w-none"
            style={{
              left: -1457.454,
              top: -1004.226,
              width: 3891,
              height: 3240,
            }}
          />
        </div>
        <div
          className="absolute bg-black"
          style={{
            left: 0,
            top: 5474.12,
            width: 1204.778,
            height: 557.597,
          }}
        />
        <p className="absolute top-[5638.61px] left-[166.56px] w-[231.12px] text-[14px] leading-[1.295] tracking-[1.82px] text-white/50">
          {t("contact.linkedin")}
        </p>
        <p className="absolute top-[5747.6px] left-[166.56px] w-[231.12px] text-[14px] leading-[1.295] tracking-[1.82px] text-white/50 uppercase">
          {t("contact.address")}
        </p>
        <p className="absolute top-[5638.61px] left-[397.68px] w-[231.12px] text-[14px] leading-[1.295] tracking-[1.82px] text-white/50">
          {t("contact.label")}
        </p>
        <p className="absolute top-[5679.6px] left-[166.56px] w-[146.436px] text-[16px] leading-[1.295] text-white">
          <a href="https://www.linkedin.com/in/javier-baro-morales-75183717b">
            javier-baro-morales
          </a>
        </p>
        <p className="absolute top-[5788.58px] left-[166.56px] w-[146.436px] text-[16px] leading-[1.295] text-white">
          {t("contact.city")}
        </p>
        <p className="absolute top-[5679.6px] left-[397.68px] w-[238.806px] text-[16px] leading-[1.295] text-white">
          <a href="https://www.linkedin.com/in/javier-baro-morales-75183717b">
            {t("contact.open")}
          </a>
        </p>
        <img
          src="/images/footer-logo.svg"
          alt=""
          className="absolute"
          style={{
            left: 840.49,
            top: 5615.95,
            width: 152.516,
            height: 76.258,
          }}
        />
        <p className="absolute top-[5756.6px] left-[840.49px] w-[233.948px] text-[16px] leading-[1.575] font-light text-white">
          {t("contact.bio")}
        </p>
        <p className="absolute top-[5944.33px] left-[1322.94px] w-[121.161px] -translate-x-1/2 text-center text-[24px] leading-[1.575]">
          JBM
        </p>
      </div>
    </div>
  )
}
