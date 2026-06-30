'use client'

import { useEffect, useState, startTransition } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_EXIT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SPRING_STAR = { type: 'spring' as const, stiffness: 400, damping: 18, mass: 0.8 }

// ─── SVG transform styles ─────────────────────────────────────────────────────
// transform-box: fill-box + transform-origin: bottom enables scaleY(0→1) to
// grow each shape upward from its base — the "career ascent" visual effect.
const ASCEND_STYLE = { transformBox: 'fill-box' as const, transformOrigin: 'bottom' as const }
const STAR_STYLE   = { transformBox: 'fill-box' as const, transformOrigin: 'center' as const }

// ─── Module-level flags: survive React Strict Mode double-invocation ─────────
// React 18 Strict Mode fires every effect twice (mount → cleanup → mount).
// useState/useRef reset on the synthetic remount; module-scope vars do not.
// _sessionChecked: prevents the session-storage read from running twice —
//   the second run sees the key we just wrote and would wrongly set show=false.
// _timerStarted:   prevents duplicate timer creation on the second effect run.
let _sessionChecked = false
let _timerStarted   = false

type Phase = 'animate' | 'exit' | 'done'
// Merges the former `ready` + `show` booleans into one state to avoid
// cascading setState calls inside the effect (react-hooks/set-state-in-effect).
type InitState = 'pending' | 'hidden' | 'visible'

export function Preloader() {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('animate')
  const [initState, setInitState] = useState<InitState>('pending')
  const ready = initState !== 'pending'
  const show  = initState === 'visible'

  // Effect 1 — session gate, runs once per page load
  useEffect(() => {
    if (_sessionChecked) return
    _sessionChecked = true

    const key = 'ap-pl-v1'
    const seen = (() => {
      try { return !!sessionStorage.getItem(key) } catch { return false }
    })()

    if (!seen) {
      try { sessionStorage.setItem(key, '1') } catch { /* storage disabled */ }
    }

    startTransition(() => {
      setInitState(seen ? 'hidden' : 'visible')
    })
  }, [])

  // Effect 2 — animation timers, only when show=true
  useEffect(() => {
    if (!show || _timerStarted) return
    _timerStarted = true

    document.body.style.overflow = 'hidden'

    const exitAt = reducedMotion ? 350 : 2300
    const doneAt = reducedMotion ? 700 : 2750

    const t1 = setTimeout(() => setPhase('exit'), exitAt)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      _timerStarted = false   // allow re-arm after HMR module refresh
    }, doneAt)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
      // Reset so Strict Mode's second run (and any future re-arm) can start timers
      _timerStarted = false
    }
  }, [show, reducedMotion])

  // Not ready yet (SSR / first paint) or decided not to show
  if (!ready || !show || phase === 'done') return null

  const isExiting = phase === 'exit'

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        style={{ backgroundColor: '#001413' }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={isExiting ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0 }}
        aria-hidden="true"
      >
        {/* ── Ambient emerald glow ────────────────────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ delay: 0.15, duration: 1.1, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 56%, rgba(26,138,113,0.2) 0%, rgba(26,138,113,0.06) 55%, transparent 80%)',
          }}
        />

        {/* ── Logo container ──────────────────────────────────────────────── */}
        <motion.div
          style={{ width: 'min(78vw, 340px)', aspectRatio: '2380 / 1820', position: 'relative' }}
          animate={{ scale: isExiting ? 1.07 : 1, opacity: isExiting ? 0 : 1 }}
          transition={isExiting ? { duration: 0.48, ease: EASE_EXIT } : { duration: 0 }}
        >
          {/* ──────────────────────────────────────────────────────────────────
              INLINE SVG
              Source: For Dark BG_Transparent_Primary_V_Logo_Aeverexa.svg
              (also available at public/brand/logo-primary.svg)
              8 semantic layers, each animated independently.
          ────────────────────────────────────────────────────────────────── */}
          <svg
            viewBox="300 580 2420 1820"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="Averexa Placement"
          >
            <defs>
              <linearGradient id="pl-g0" x1="2137.38" y1="598.69" x2="957.832" y2="1522.48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A7F4DE"/><stop offset="0.25" stopColor="#99F0D7"/>
                <stop offset="0.5" stopColor="#8AEACC"/><stop offset="0.75" stopColor="#7CE3C2"/>
                <stop offset="1" stopColor="#69D7B5"/>
              </linearGradient>
              <linearGradient id="pl-g1" x1="2110.66" y1="629.228" x2="973.102" y2="1531.39" gradientUnits="userSpaceOnUse">
                <stop stopColor="#73DDBD"/><stop offset="0.3" stopColor="#55C7A7"/>
                <stop offset="0.6" stopColor="#37AE8D"/><stop offset="1" stopColor="#1F8A72"/>
              </linearGradient>
              <filter id="pl-f0" x="1571.15" y="659.767" width="167.961" height="165.929" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5.60162"/><feGaussianBlur stdDeviation="2.80081"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              </filter>
              <filter id="pl-f1" x="1021.79" y="1084.76" width="480.65" height="390.59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5.60162"/><feGaussianBlur stdDeviation="2.80081"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              </filter>
            </defs>

            {/* L1: Foundation — base anchors + bottom triangles */}
            <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55, ease: EASE }}>
              <path d="M891.666 1685.35L970.557 1528.84C1027.64 1554.88 1086.65 1580.82 1165.24 1569.56L1105.44 1682.81L891.666 1685.35Z" fill="#094A3B"/>
              <path d="M1624.59 1372.33L1823.09 1685.35H2051.03L1624.59 1372.33Z" fill="#0A4337"/>
              <path d="M1755.65 1259.08L2051.03 1685.35L1624.59 1372.33C1681.83 1331.76 1707.07 1311.67 1755.65 1259.08Z" fill="#07332A"/>
            </motion.g>

            {/* L2: Left arm — grows upward from base (scaleY 0→1, origin=bottom) */}
            <motion.g style={ASCEND_STYLE} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.32, duration: 0.78, ease: EASE }}>
              <path d="M1387.91 657.222L1415.91 1054.22L1520.25 1214.55L1642.4 1082.22L1387.91 657.222Z" fill="#0F5E48"/>
            </motion.g>

            {/* L3: Right arm — staggered 0.1s behind left arm */}
            <motion.g style={ASCEND_STYLE} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.42, duration: 0.78, ease: EASE }}>
              <path d="M993.461 1481.76L1387.92 657.222L1415.91 1054.22L1247.95 1400.32C1159.59 1442.14 1075.43 1466.52 993.461 1481.76Z" fill="#2A8867"/>
            </motion.g>

            {/* L4: Mint gradient sweep — the luminous bridge of opportunity */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68, duration: 0.65, ease: 'easeOut' }}>
              <path d="M978.191 1509.75C1091.44 1494.66 1210.23 1459.21 1339.56 1385.06C1548.83 1264.38 1711.04 1064.61 1856.17 822.638C1826.47 803.603 1800.39 788.563 1777.28 776.831C1856.58 737.309 1970.82 684.732 2092.85 629.228C1996.65 785.305 1969.42 849.36 1787.46 1082.22C1605.5 1315.07 1465.59 1385.54 1339.56 1444.86C1197.05 1526.02 1092.21 1536.32 973.102 1519.93L978.191 1509.75Z" fill="url(#pl-g0)"/>
              <path d="M2064.85 975.331C2038.36 950.111 2022.2 931.253 1996.14 912.981C1880.76 1084.45 1734.02 1241.27 1637.31 1318.89C1540.61 1396.51 1441.36 1456.31 1359.92 1490.67C1278.49 1525.02 1214.86 1539.02 1172.87 1545.38C1130.88 1551.74 1029.9 1550.24 973.102 1519.93C1102.36 1530.15 1205.11 1526.26 1419.24 1400.58C1633.38 1274.9 1712.65 1166.2 1791.28 1074.58C1894.83 934.256 1996.04 786.756 2090.33 630.374C2083.38 756.854 2075.26 874.478 2064.85 975.331Z" fill="url(#pl-g1)"/>
            </motion.g>

            {/* L5: White bridge — precision architecture, grows from base */}
            <motion.g filter="url(#pl-f1)" style={ASCEND_STYLE} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.92, duration: 0.55, ease: EASE }}>
              <path d="M1209.78 1084.76H1265.76V1125.48C1324.07 1188.44 1405.07 1219.41 1502.44 1227.27L1484.62 1242.54L1454.08 1240V1270.54L1446.45 1275.63L1443.91 1240L1410.82 1232.36L1415.91 1301.07L1405.73 1306.16L1400.64 1229.82L1373.92 1219.64L1377.74 1323.98L1365.01 1334.16L1358.65 1214.55C1349.84 1209.99 1333.03 1203.02 1326.84 1199.31L1337.02 1352L1321.75 1362.18L1309.03 1189.13C1294.75 1179.12 1281.08 1168.97 1268.31 1158.59L1291.21 1377.45L1236.01 1405.9L1217.41 1186.58L1176.69 1260.38L1189.62 1425.75L1171.6 1432.72L1161.42 1278.2L1123.25 1321.46L1131.52 1446.79L1113.22 1452.6L1105.41 1336.73L1064.69 1367.27L1069.2 1465.02L1050.21 1469.75L1046.85 1377.45L1021.79 1422.47L1058.51 1345.71C1125.57 1301.76 1178.98 1237.86 1209.73 1140.77V1084.79L1209.78 1084.76Z" fill="white"/>
            </motion.g>

            {/* L6: Star — springs to life at the apex */}
            <motion.g filter="url(#pl-f0)" style={STAR_STYLE} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.28, ...SPRING_STAR }}>
              <path d="M1634.77 720.844L1655.13 659.767L1674.09 720.844H1739.11L1686.94 758.635L1706.03 820.094L1655.13 781.921L1602.17 820.094L1622.05 759.017L1571.15 720.844H1634.77Z" fill="#56B09F"/>
            </motion.g>

            {/* L7: AVEREXA wordmark — rises from below */}
            <motion.g initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.55, ease: EASE }}>
              <path d="M362.332 2105.25H414.197L522.659 1914.39L629.493 2105.25H683.851L522.659 1807.5L362.332 2105.25Z" fill="white"/>
              <path d="M482.527 2105.25H562.462L522.507 2033.23L482.527 2105.25Z" fill="#1A8A71"/>
              <path d="M823.333 2105.25L997.886 1807.5H931.185L823.333 1987.96L714.184 1807.5H646.592L823.333 2105.25Z" fill="white"/>
              <path d="M1278.54 1807.5H1057.62V1853.26H1278.54V1807.5Z" fill="white"/>
              <path d="M1057.62 1928.64V2105.25H1278.54V2056.42L1105.44 2056.9V1972.92L1278.54 1972.82V1928.64H1057.62Z" fill="white"/>
              <path d="M1368.65 1807.5V1853.26H1529.79C1583.9 1863.49 1583.9 1932.2 1529.79 1942.92H1368.65V2105.25H1418.89V1990.73H1492.26L1574.41 2105.25H1637.21L1550.79 1988.19C1593.36 1975.16 1619.65 1948.36 1619.5 1899.12C1621.38 1846.34 1588.96 1815.14 1532.82 1807.5H1368.65Z" fill="white"/>
              <path d="M1930.89 1807.5H1710.4V1853.69H1930.89V1807.5Z" fill="white"/>
              <path d="M1710.4 1928.21V2105.25H1931.76V2056.85L1759.47 2056.9V1972.92L1932.52 1972.82V1928.21H1710.4Z" fill="white"/>
              <path d="M2001.08 1807.5L2113.2 1957.65H2176.49L2065.39 1807.5H2001.08Z" fill="white"/>
              <path d="M2227.62 1807.5L2159.01 1896.57L2192.1 1939.84L2291.3 1807.5H2227.62Z" fill="white"/>
              <path d="M2176.49 1957.65L2063.22 2105.25H2001.08L2113.2 1957.65H2176.49Z" fill="#1A8A71"/>
              <path d="M2156.47 2021.27L2218.31 2105.25H2286.31L2189.55 1978.01L2156.47 2021.27Z" fill="white"/>
              <path d="M2434.95 2105.25H2521.15L2478.04 2029.14L2434.95 2105.25Z" fill="#1A8A71"/>
              <path d="M2478.04 1807.5L2319.72 2105.25H2374.31L2478.04 1914.77L2581.79 2105.25H2637.22L2478.04 1807.5Z" fill="white"/>
            </motion.g>

            {/* L8: PLACEMENT tagline + flanking rules */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65, duration: 0.5, ease: 'easeOut' }}>
              <path d="M836.005 2325.86C832.451 2325.86 830.674 2324.09 830.674 2320.53V2201.53C830.674 2197.98 832.451 2196.2 836.005 2196.2H883.083C894.55 2196.2 903.201 2199.15 909.036 2205.05C914.937 2210.95 917.888 2219.64 917.888 2231.11V2237.14C917.888 2248.54 914.937 2257.19 909.036 2263.09C903.201 2268.99 894.55 2271.95 883.083 2271.95H841.236V2320.53C841.236 2324.09 839.493 2325.86 836.005 2325.86ZM841.236 2261.38H883.083C891.533 2261.38 897.669 2259.47 901.491 2255.65C905.381 2251.76 907.326 2245.59 907.326 2237.14V2231.11C907.326 2222.59 905.381 2216.42 901.491 2212.6C897.669 2208.71 891.533 2206.76 883.083 2206.76H841.236V2261.38ZM982.981 2325.86C979.426 2325.86 977.649 2324.09 977.649 2320.53V2201.53C977.649 2197.98 979.426 2196.2 982.981 2196.2C986.468 2196.2 988.211 2197.98 988.211 2201.53V2315.3H1049.37C1052.93 2315.3 1054.7 2317.04 1054.7 2320.53C1054.7 2324.09 1052.93 2325.86 1049.37 2325.86H982.981ZM1102.28 2325.36C1099.06 2323.95 1098.09 2321.6 1099.37 2318.32L1149.26 2200.32C1150.33 2197.57 1152.31 2196.2 1155.19 2196.2H1155.8C1158.55 2196.27 1160.49 2197.64 1161.63 2200.32L1211.53 2318.32C1212.87 2321.6 1211.93 2323.95 1208.71 2325.36C1205.42 2326.7 1203.14 2325.76 1201.87 2322.54L1188.49 2290.86H1122.6L1109.22 2322.54C1107.88 2325.76 1105.57 2326.7 1102.28 2325.36ZM1126.93 2280.29H1184.06L1155.5 2212.9L1126.93 2280.29ZM1307.49 2325.86C1292.94 2325.86 1282.31 2322.51 1275.6 2315.8C1268.9 2309.1 1265.54 2298.47 1265.54 2283.92V2238.15C1265.54 2223.46 1268.86 2212.8 1275.5 2206.16C1282.21 2199.52 1292.8 2196.2 1307.29 2196.2H1331.63C1343.97 2196.2 1353.16 2198.78 1359.19 2203.95C1365.23 2209.04 1368.55 2217.26 1369.15 2228.59C1369.35 2230.4 1368.99 2231.78 1368.05 2232.71C1367.18 2233.65 1365.87 2234.12 1364.12 2234.12C1360.77 2234.12 1358.93 2232.35 1358.59 2228.79C1358.12 2220.48 1355.84 2214.74 1351.75 2211.59C1347.66 2208.37 1340.95 2206.76 1331.63 2206.76H1307.29C1299.58 2206.76 1293.44 2207.77 1288.88 2209.78C1284.32 2211.72 1281.03 2215.01 1279.02 2219.64C1277.08 2224.2 1276.11 2230.37 1276.11 2238.15V2283.92C1276.11 2291.7 1277.11 2297.87 1279.12 2302.43C1281.14 2306.99 1284.42 2310.27 1288.98 2312.28C1293.54 2314.3 1299.71 2315.3 1307.49 2315.3H1331.63C1340.95 2315.3 1347.66 2313.73 1351.75 2310.57C1355.84 2307.35 1358.12 2301.59 1358.59 2293.27C1358.93 2289.72 1360.77 2287.94 1364.12 2287.94C1365.87 2287.94 1367.18 2288.44 1368.05 2289.45C1368.99 2290.39 1369.35 2291.73 1369.15 2293.47C1368.55 2304.81 1365.23 2313.05 1359.19 2318.22C1353.16 2323.31 1343.97 2325.86 1331.63 2325.86H1307.49ZM1441.59 2325.86C1438.03 2325.86 1436.26 2324.09 1436.26 2320.53V2201.53C1436.26 2197.98 1438.03 2196.2 1441.59 2196.2H1516.93C1520.49 2196.2 1522.26 2197.98 1522.26 2201.53C1522.26 2205.02 1520.49 2206.76 1516.93 2206.76H1446.82V2254.95H1493.19C1496.75 2254.95 1498.52 2256.69 1498.52 2260.18C1498.52 2263.73 1496.75 2265.51 1493.19 2265.51H1446.82V2315.3H1516.93C1520.49 2315.3 1522.26 2317.04 1522.26 2320.53C1522.26 2324.09 1520.49 2325.86 1516.93 2325.86H1441.59ZM1588.56 2325.86C1585.01 2325.86 1583.23 2324.09 1583.23 2320.53V2201.53C1583.23 2197.98 1585.01 2196.2 1588.56 2196.2C1591.11 2196.2 1593.12 2197.37 1594.6 2199.72L1644.69 2276.27L1642.28 2276.57L1692.37 2199.72C1693.78 2197.37 1695.9 2196.2 1698.71 2196.2C1701.86 2196.2 1703.44 2197.98 1703.44 2201.53V2320.53C1703.44 2324.09 1701.7 2325.86 1698.21 2325.86C1694.65 2325.86 1692.88 2324.09 1692.88 2320.53V2212.09L1696 2213.1L1649.52 2283.92C1648.05 2286.2 1645.93 2287.34 1643.18 2287.34C1640.77 2287.34 1638.83 2286.2 1637.35 2283.92L1590.88 2213.1L1593.79 2214.21V2320.53C1593.79 2324.09 1592.05 2325.86 1588.56 2325.86ZM1780.53 2325.86C1776.98 2325.86 1775.2 2324.09 1775.2 2320.53V2201.53C1775.2 2197.98 1776.98 2196.2 1780.53 2196.2H1855.87C1859.43 2196.2 1861.2 2197.98 1861.2 2201.53C1861.2 2205.02 1859.43 2206.76 1855.87 2206.76H1785.76V2254.95H1832.13C1835.69 2254.95 1837.46 2256.69 1837.46 2260.18C1837.46 2263.73 1835.69 2265.51 1832.13 2265.51H1785.76V2315.3H1855.87C1859.43 2315.3 1861.2 2317.04 1861.2 2320.53C1861.2 2324.09 1859.43 2325.86 1855.87 2325.86H1780.53ZM1927.5 2325.86C1923.95 2325.86 1922.17 2324.09 1922.17 2320.53V2201.53C1922.17 2197.98 1923.95 2196.2 1927.5 2196.2C1929.38 2196.2 1931.19 2197.24 1932.94 2199.32L2018.14 2308.76H2015.72V2201.53C2015.72 2197.98 2017.5 2196.2 2021.06 2196.2C2024.54 2196.2 2026.29 2197.98 2026.29 2201.53V2320.53C2026.29 2324.09 2024.54 2325.86 2021.06 2325.86C2019.11 2325.86 2017.3 2324.82 2015.62 2322.74L1930.32 2213.3H1932.74V2320.53C1932.74 2324.09 1930.99 2325.86 1927.5 2325.86ZM2136.36 2325.96C2134.75 2325.96 2133.44 2325.49 2132.43 2324.56C2131.49 2323.62 2131.02 2322.34 2131.02 2320.73V2206.66H2088.27C2086.66 2206.66 2085.35 2206.19 2084.35 2205.25C2083.41 2204.31 2082.94 2203.04 2082.94 2201.43C2082.94 2199.82 2083.41 2198.55 2084.35 2197.61C2085.35 2196.6 2086.66 2196.1 2088.27 2196.1H2184.44C2186.05 2196.1 2187.32 2196.6 2188.26 2197.61C2189.2 2198.55 2189.67 2199.82 2189.67 2201.43C2189.67 2203.04 2189.2 2204.31 2188.26 2205.25C2187.32 2206.19 2186.05 2206.66 2184.44 2206.66H2141.59V2320.73C2141.59 2322.28 2141.08 2323.55 2140.08 2324.56C2139.14 2325.49 2137.9 2325.96 2136.36 2325.96Z" fill="#918F8F"/>
              <line x1="2224.87" y1="2262.8" x2="2636.59" y2="2262.8" stroke="#918F8F" strokeWidth="4.20122"/>
              <line x1="362.332" y1="2262.8" x2="767.049" y2="2262.8" stroke="#7F7D7D" strokeWidth="4.20122"/>
            </motion.g>
          </svg>

          {/* Diagonal shimmer sweep — single pass at logo completion */}
          {!reducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.75, duration: 0.65, times: [0, 0.15, 0.7, 1] }}
            >
              <motion.div
                style={{
                  position: 'absolute', top: '-20%', left: 0,
                  width: '45%', height: '140%',
                  background: 'linear-gradient(112deg, transparent 0%, rgba(167,244,222,0.22) 50%, transparent 100%)',
                  transform: 'skewX(-12deg)',
                }}
                initial={{ x: '-60%' }}
                animate={{ x: '450%' }}
                transition={{ delay: 1.75, duration: 0.65, ease: [0.4, 0, 0.6, 1] }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Bottom caption */}
        <motion.p
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vh, 48px)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.22)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ delay: 1.85, duration: 0.6, ease: 'easeOut' }}
        >
          Your next career move starts here
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
