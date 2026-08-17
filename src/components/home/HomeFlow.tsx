"use client"

import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useLocale, useTranslations } from "next-intl"
import { experience } from "@/content/experience"
import { education } from "@/content/education"
import { workflow } from "@/content/workflow"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const LINKEDIN = siteConfig.links.linkedin

function Still({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes,
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="hero-tilt relative size-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  )
}

function Spine({ className }: { className?: string }) {
  return (
    <div
      className={cn("spine mx-auto h-8 w-px origin-top bg-black md:h-10", className)}
      aria-hidden
    />
  )
}

function ExpDate({ start }: { start: string }) {
  const [month, year] = start.split("/")
  return (
    <p className="tracking-[0.12em] uppercase">
      <span className="text-[13px] leading-[1.3]">{month}</span>
      <span className="text-[14px] leading-[1.3]">/</span>
      <span className="text-2xl leading-[1.3]">{year}</span>
    </p>
  )
}

function StackCol({
  label,
  lead,
  rest,
}: {
  label: string
  lead: string
  rest?: string
}) {
  return (
    <div className="stack-col min-w-0">
      <p className="text-[13px] tracking-[0.12em] text-white/45 uppercase">
        {label}
      </p>
      <p className="mt-3 text-[1.5rem] leading-[1.15] md:mt-4 md:text-[1.75rem]">
        {lead}
      </p>
      {rest ? (
        <p className="mt-1 text-base leading-[1.575] text-white/70 md:mt-2">
          {rest}
        </p>
      ) : null}
    </div>
  )
}

export function HomeFlow() {
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
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
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
          }
          if (document.fonts.status === "loaded") playIntro()
          else void document.fonts.ready.then(playIntro)

          const travel = ctx.conditions.tablet ? -8 : 0
          if (travel) {
            gsap.utils
              .toArray<HTMLElement>(".hero-still", root.current)
              .forEach((photo, index) => {
                if (getComputedStyle(photo).display === "none") return
                gsap.to(photo, {
                  yPercent: travel * (index % 2 === 0 ? 1 : 0.55),
                  ease: "none",
                  scrollTrigger: {
                    trigger: photo,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                })
              })
          }

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
                y: ctx.conditions?.tablet ? 22 : 14,
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
            y: ctx.conditions.tablet ? 28 : 16,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: "#system",
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
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference) and (pointer: fine) and (hover: hover)",
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
      ref={root}
      data-layout="flow"
      className="overflow-x-clip bg-white text-black lg:hidden"
    >
      <section
        id="top"
        data-anchor="top"
        className="relative overflow-x-clip pt-[calc(3.75rem+env(safe-area-inset-top))] pb-8 md:pb-16"
      >
        <div
          className="pointer-events-none absolute top-[min(28%,11rem)] left-[max(1rem,env(safe-area-inset-left))] hidden h-[337px] w-16 flex-col items-center lg:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <p
            className="text-xs tracking-[0.22em] text-[#12262c] uppercase"
            style={{ transform: "rotate(180deg)" }}
          >
            {t("hero.scroll")}
          </p>
          <img
            src="/images/scroll-arrow.svg"
            alt=""
            className="mt-8 h-[94px] w-px"
          />
        </div>

        <div className="site-shell relative z-20">
          <h1 className="max-w-[18ch] text-[clamp(1.85rem,7.4vw,5.3rem)] leading-[1.05] font-normal text-pretty">
            {t("hero.headline")}
          </h1>
          <div className="hero-meta mt-6 flex min-w-0 flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <p className="max-w-[40rem] text-base leading-[1.4] whitespace-pre-wrap">
              {t("hero.supporting")}
            </p>
            <ul className="flex min-h-11 items-center gap-6 text-base leading-none xl:absolute xl:top-4 xl:right-[max(1rem,env(safe-area-inset-right))] xl:flex-col xl:items-end xl:gap-5">
              <li>
                <a
                  href={LINKEDIN}
                  className="inline-flex min-h-11 items-center"
                >
                  Lk
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center text-mute">
                Git
              </li>
              <li className="inline-flex min-h-11 items-center text-mute">
                Mail
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-2 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:mt-14 md:grid-cols-3 md:gap-3 md:px-[max(clamp(1rem,4vw,4.5rem),env(safe-area-inset-left))] md:pr-[max(clamp(1rem,4vw,4.5rem),env(safe-area-inset-right))]">
          <Still
            src="/images/hero-portrait.png"
            alt=""
            priority
            sizes="(min-width: 768px) 33vw, 100vw"
            className="hero-still aspect-[427/340] md:col-span-1"
          />
          <Still
            src="/images/hero-keyboard.png"
            alt=""
            sizes="(min-width: 768px) 33vw, 50vw"
            imageClassName="object-bottom"
            className="hero-still hidden aspect-[441/335] md:block"
          />
          <div className="hero-still hidden aspect-[346/421] overflow-hidden md:block">
            <div className="hero-tilt relative size-full">
              <img
                src="/images/hero-spiral.svg"
                alt=""
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell grid gap-12 py-10 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="reveal min-w-0">
          <p className="text-sm leading-[1.3] tracking-[0.13em]">
            {t("intro.leftEyebrow")}
          </p>
          <div className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)]">
            <p>
              <span className="leading-[1.3]">{t("intro.roleLead")} </span>
              <span className="leading-[0.95]">{t("intro.roleLeadRest")}</span>
            </p>
            {introRoles.map((role) => (
              <p key={role} className="leading-[1.3]">
                {role}
              </p>
            ))}
          </div>
        </div>
        <div className="reveal min-w-0">
          <p className="text-sm leading-[1.3] tracking-[0.13em]">
            {t("intro.rightEyebrow")}
          </p>
          <p className="mt-4 text-base leading-[1.575]">
            {t("intro.paragraph")}
          </p>
        </div>
      </section>

      <section
        id="experience"
        data-anchor="experience"
        className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top))] overflow-x-clip pb-8 md:pb-16"
      >
        <Still
          src="/images/exp-right.png"
          alt=""
          sizes="(min-width: 1280px) 38vw, 100vw"
          className="pointer-events-none absolute top-24 right-0 z-0 hidden h-[27rem] w-[min(38vw,33.75rem)] xl:block"
        />
        <Still
          src="/images/exp-left.png"
          alt=""
          sizes="(min-width: 1280px) 40vw, 100vw"
          imageClassName="-scale-y-100 rotate-180"
          className="pointer-events-none absolute top-[28rem] left-0 z-0 hidden h-[31rem] w-[min(40vw,35.8rem)] xl:block"
        />

        <p className="reveal px-4 text-center text-sm leading-[1.3] tracking-[0.13em] uppercase">
          {t("experience.eyebrow")}
        </p>
        <Spine className="mt-6" />

        <ol className="site-shell relative z-10 mt-2 max-w-3xl border-l border-black md:border-0">
          {experience.map((job, index) => {
            const detail = job.internship
              ? t("experience.internship")
              : t(`experience.jobs.${job.id}.role`)
            const right = index % 2 === 1
            return (
              <li key={job.id} className="relative">
                <Spine className="hidden md:block" />
                <div
                  className={cn(
                    "reveal py-6 pl-5 md:py-8 md:pl-0",
                    right
                      ? "md:ml-auto md:w-[calc(50%-1.25rem)] md:text-left"
                      : "md:mr-auto md:w-[calc(50%-1.25rem)] md:pr-2 md:text-right",
                  )}
                >
                  <ExpDate start={job.start} />
                  <div className="mt-3 text-sm tracking-[0.12em] uppercase">
                    <p className="leading-[1.3]">{job.company}</p>
                    <p className="leading-[1.3]">{detail}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section
        id="system"
        data-anchor="system"
        className="bg-black px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] text-white md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="reveal text-center text-sm leading-[1.3] tracking-[0.13em] uppercase">
            {t("stack.eyebrow")}
          </p>
          <div className="mx-auto mt-6 h-px max-w-5xl bg-white/25" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-[1.575] text-white/55">
            {t("stack.statement")}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-6">
            <StackCol
              label={t("stack.language")}
              lead="TypeScript"
              rest="JavaScript"
            />
            <StackCol
              label={t("stack.ui")}
              lead="Angular"
              rest={t("stack.components")}
            />
            <StackCol
              label={t("stack.also")}
              lead="React"
              rest="Next.js"
            />
            <StackCol
              label={t("stack.foundation")}
              lead="HTML, CSS"
              rest={t("stack.layoutType")}
            />
            <StackCol
              label={t("stack.quality")}
              lead={t("stack.a11y")}
              rest={t("stack.performance")}
            />
          </div>
          <div className="mx-auto mt-14 h-px max-w-5xl bg-white/25" />
          <p className="reveal mt-5 text-center text-[13px] leading-[1.3] tracking-[0.13em] text-white/45 uppercase">
            {t("stack.alongside")}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 xl:grid-cols-4">
            <StackCol
              label={t("stack.angularEco")}
              lead="RxJS"
              rest="Sass, Nx"
            />
            <StackCol
              label={t("stack.java")}
              lead="Spring Boot"
              rest="JPA, Hibernate"
            />
            <StackCol
              label={t("stack.faces")}
              lead="JSF"
              rest="PrimeFaces"
            />
            <StackCol label={t("stack.cms")} lead="WordPress" />
          </div>
        </div>
      </section>

      <section
        id="education"
        data-anchor="education"
        className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top))] overflow-x-clip py-20 md:py-28"
      >
        <img
          src="/images/logo-mark.svg"
          alt=""
          className="pointer-events-none absolute top-16 left-[max(1rem,env(safe-area-inset-left))] hidden w-[min(22vw,19rem)] xl:block"
        />
        <Still
          src="/images/edu-right.png"
          alt=""
          sizes="(min-width: 1280px) 36vw, 100vw"
          className="pointer-events-none absolute top-24 right-0 z-0 hidden h-[36rem] w-[min(36vw,32.5rem)] xl:block"
        />
        <Still
          src="/images/edu-left.png"
          alt=""
          sizes="(min-width: 1280px) 48vw, 100vw"
          imageClassName="object-bottom"
          className="pointer-events-none absolute top-[22rem] left-[-12%] z-0 hidden h-[37rem] w-[min(55vw,70rem)] xl:block"
        />

        <p className="reveal px-4 text-center text-sm leading-[1.3] tracking-[0.13em] uppercase">
          {t("education.eyebrow")}
        </p>
        <Spine className="mt-6" />

        <ol className="site-shell relative z-10 mt-2 max-w-3xl border-l border-black md:border-0">
          {education.map((item, index) => {
            const right = index % 2 === 1
            return (
              <li key={item.id} className="relative">
                <Spine className="hidden md:block" />
                <div
                  className={cn(
                    "reveal py-6 pl-5 md:py-10 md:pl-0",
                    right
                      ? "md:mr-auto md:w-[calc(50%-1.25rem)] md:pr-2 md:text-right"
                      : "md:ml-auto md:w-[calc(50%-1.25rem)] md:text-left",
                  )}
                >
                  <p className="tracking-[0.12em] uppercase">
                    <span className="text-[13px] leading-[1.3]">
                      {item.start}
                    </span>
                    <span className="text-[14px] leading-[1.3]">/</span>
                    <span className="text-2xl leading-[1.3]">{item.end}</span>
                  </p>
                  <div className="mt-3 text-sm tracking-[0.12em] uppercase">
                    <p className="leading-[1.3]">{item.school}</p>
                    <p className="leading-[1.3]">
                      {t(`education.items.${item.id}.detail`)}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section
        id="workflow"
        data-anchor="workflow"
        className="scroll-mt-[calc(5rem+env(safe-area-inset-top))] pb-20 md:pb-28"
      >
        <p className="reveal px-4 text-center text-sm leading-[1.3] tracking-[0.13em] uppercase">
          {t("workflow.eyebrow")}
        </p>
        <p className="reveal site-shell mt-4 max-w-md text-center text-base leading-[1.575]">
          {t("workflow.note")}
        </p>
        <Spine className="mt-8" />

        <ol className="site-shell relative mt-2 max-w-3xl border-l border-black md:border-0">
          {workflow.map((step, index) => {
            const right = index % 2 === 1
            return (
              <li key={step.id} className="relative">
                <Spine className="hidden md:block" />
                <div
                  className={cn(
                    "reveal py-6 pl-5 md:py-8 md:pl-0",
                    right
                      ? "md:ml-auto md:w-[calc(50%-1.25rem)] md:text-left"
                      : "md:mr-auto md:w-[calc(50%-1.25rem)] md:pr-2 md:text-right",
                  )}
                >
                  <p className="text-2xl leading-[1.3] tracking-[0.12em] uppercase">
                    {step.index}
                  </p>
                  <p className="mt-2 text-sm tracking-[0.12em] uppercase">
                    {t(`workflow.steps.${step.id}.title`)}
                  </p>
                  <p className="mt-3 text-base leading-[1.575]">
                    {t(`workflow.steps.${step.id}.body`)}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section
        id="contact"
        data-anchor="contact"
        className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top))] overflow-hidden bg-black pb-[max(3rem,env(safe-area-inset-bottom))] text-white"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[#f6f6f6] xl:block">
          <img
            src="/images/footer-spiral.svg"
            alt=""
            className="absolute top-[-40%] left-[-80%] h-[220%] w-[280%] max-w-none"
          />
        </div>
        <div className="site-shell relative grid gap-12 py-16 md:grid-cols-2 md:py-24 xl:grid-cols-[1fr_1fr_auto] xl:items-start">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 min-[480px]:grid-cols-2">
            <div>
              <p className="text-sm leading-[1.3] tracking-[0.13em] text-white/50">
                {t("contact.linkedin")}
              </p>
              <p className="mt-3 text-base leading-[1.3]">
                <a href={LINKEDIN} className="inline-flex min-h-11 items-center">
                  javier-baro-morales
                </a>
              </p>
            </div>
            <div>
              <p className="text-sm leading-[1.3] tracking-[0.13em] text-white/50 uppercase">
                {t("contact.label")}
              </p>
              <p className="mt-3 text-base leading-[1.3]">
                <a href={LINKEDIN} className="inline-flex min-h-11 items-center">
                  {t("contact.open")}
                </a>
              </p>
            </div>
            <div className="col-span-2 min-[480px]:col-span-1">
              <p className="text-sm leading-[1.3] tracking-[0.13em] text-white/50 uppercase">
                {t("contact.address")}
              </p>
              <p className="mt-3 text-base leading-[1.3]">
                {t("contact.city")}
              </p>
            </div>
          </div>
          <div className="min-w-0 xl:max-w-xs">
            <img
              src="/images/footer-logo.svg"
              alt=""
              className="h-[76px] w-[153px]"
            />
            <p className="mt-6 text-base leading-[1.575] font-light">
              {t("contact.bio")}
            </p>
          </div>
          <p className="text-2xl leading-[1.575] xl:self-end xl:text-right">
            JBM
          </p>
        </div>
      </section>
    </div>
  )
}
