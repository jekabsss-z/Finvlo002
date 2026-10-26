const readStore = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getAccount = () => readStore("finvlo-account", { plan: "Free", tokens: 10 });
const saveAccount = (account) => writeStore("finvlo-account", account);
const getProfile = () => readStore("finvlo-profile", {});
const getWatchlist = () => readStore("finvlo-watchlist", []);

document.querySelectorAll(".mobile-menu").forEach((menu) => {
  menu.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", () => { menu.open = false; }));
});

const researchRoutes = new Set(["stocks.html", "etfs.html", "company.html", "fund.html", "checklist.html", "methodology.html", "profile.html"]);
if (researchRoutes.has(location.pathname.split("/").pop())) {
  document.body.classList.add("product-room");
  const roomLinks = [
    ["Stocks", "stocks.html"],
    ["Funds", "etfs.html"],
    ["Quality checklist", "checklist.html"],
    ["Methodology", "methodology.html"],
    ["Profile", "profile.html"],
    ["Plans & tokens", "pricing.html"],
  ];
  document.querySelectorAll(".main-nav, .mobile-menu nav").forEach((navigation) => {
    const links = roomLinks.map(([label, href]) => {
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.textContent = label;
      if (location.pathname.endsWith(href)) anchor.setAttribute("aria-current", "page");
      if (href === "pricing.html") anchor.className = "nav-cta";
      return anchor;
    });
    navigation.replaceChildren(...links);
    const mobileMenu = navigation.closest(".mobile-menu");
    if (mobileMenu) links.forEach((link) => link.addEventListener("click", () => { mobileMenu.open = false; }));
  });
}

const footer = document.querySelector(".site-footer, .research-footer");
if (footer) {
  footer.className = "product-footer";
  footer.innerHTML = `
    <div class="product-footer-main">
      <div class="footer-brand-block"><a class="footer-brand" href="index.html">Finvlo</a><p>Business quality, made clearer.</p><span>Quality analytics for your own research. Not financial advice.</span></div>
      <nav class="footer-link-group" aria-label="Product links"><strong>RESEARCH ROOM</strong><a href="stocks.html">Stocks</a><a href="etfs.html">Funds</a><a href="checklist.html">Quality checklist</a><a href="methodology.html">Scoring methodology</a></nav>
      <nav class="footer-link-group" aria-label="Finvlo links"><strong>FINVLO</strong><a href="pricing.html">Plans &amp; tokens</a><a href="profile.html">Profile</a><a href="learn.html">Learn</a><a href="mailto:hello@finvlo.com">Contact</a></nav>
      <nav class="footer-social-group" aria-label="Social platforms"><strong>FOLLOW FINVLO</strong><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X platform home; replace with Finvlo's profile"><span class="social-mark social-x" aria-hidden="true">X</span><span>X</span></a><a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok platform home; replace with Finvlo's profile"><span class="social-mark social-tiktok" aria-hidden="true">♪</span><span>TikTok</span></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn platform home; replace with Finvlo's profile"><span class="social-mark social-linkedin" aria-hidden="true">in</span><span>LinkedIn</span></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram platform home; replace with Finvlo's profile"><span class="social-mark social-instagram" aria-hidden="true"><i></i></span><span>Instagram</span></a></nav>
    </div>
    <div class="product-footer-bottom"><span>© ${new Date().getFullYear()} Finvlo</span><span>Social links currently point to platform homepages. Replace with official Finvlo profiles.</span><span>Sample market data is fictional.</span></div>`;
}

const stocks = [
  { ticker: "MSFT", name: "Microsoft", market: "NASDAQ · US", sector: "Technology", pillars: [94, 92, 90, 91, 84, 89, 88], roic: 31.4, roe: 37.2, margin: 68.5, marginVol: 1.8, revenue: 13.2, fcfGrowth: 11.8, growthVol: 3.1, debt: -0.4, interest: 38.2, altman: 8.4, piotroski: 8, fcf: 108, accruals: -1.4, capex: 13.1, yield: 1.1, retained: 18.6, share: 2.4, concentration: 18, rd: 12.8, beneish: -2.7, insider: 7.4, short: 0.8 },
  { ticker: "AAPL", name: "Apple", market: "NASDAQ · US", sector: "Technology", pillars: [91, 83, 87, 89, 92, 91, 85], roic: 46.8, roe: 157, margin: 46.2, marginVol: 1.2, revenue: 8.1, fcfGrowth: 9.4, growthVol: 5.2, debt: 0.2, interest: 29.6, altman: 7.8, piotroski: 7, fcf: 104, accruals: -0.9, capex: 3.2, yield: 2.4, retained: 21.2, share: 1.2, concentration: 21, rd: 8.1, beneish: -2.4, insider: 5.1, short: 0.7 },
  { ticker: "ASML", name: "ASML Holding", market: "Euronext · NL", sector: "Technology", pillars: [93, 89, 84, 86, 88, 96, 91], roic: 27.5, roe: 51, margin: 51.3, marginVol: 3.8, revenue: 17.4, fcfGrowth: 19.2, growthVol: 12.1, debt: 0.1, interest: 26.5, altman: 9.1, piotroski: 8, fcf: 96, accruals: 1.1, capex: 2.8, yield: 1.6, retained: 16.8, share: 8.2, concentration: 35, rd: 14.2, beneish: -2.2, insider: 0.1, short: 1.2 },
  { ticker: "NVO", name: "Novo Nordisk", market: "Copenhagen · DK", sector: "Healthcare", pillars: [94, 87, 82, 86, 83, 92, 86], roic: 67, roe: 78, margin: 83.1, marginVol: 2.3, revenue: 18.8, fcfGrowth: 20.4, growthVol: 8.4, debt: 0.2, interest: 41, altman: 12.1, piotroski: 8, fcf: 102, accruals: -0.5, capex: 4.5, yield: 1.4, retained: 24.3, share: 2.3, concentration: 29, rd: 14.1, beneish: -2.1, insider: 28, short: 0.6 },
  { ticker: "SAP", name: "SAP SE", market: "Xetra · DE", sector: "Technology", pillars: [86, 80, 82, 84, 88, 84, 87], roic: 14.8, roe: 13.1, margin: 72.4, marginVol: 2.4, revenue: 6.6, fcfGrowth: 9.5, growthVol: 2.8, debt: 0.8, interest: 11.5, altman: 5.3, piotroski: 7, fcf: 112, accruals: -0.8, capex: 4.1, yield: 1.8, retained: 11.5, share: 1.8, concentration: 17, rd: 16.2, beneish: -2.0, insider: 0.3, short: 0.9 },
  { ticker: "TSM", name: "Taiwan Semiconductor", market: "TWSE · TW", sector: "Technology", pillars: [92, 87, 88, 85, 80, 91, 88], roic: 25.7, roe: 29.5, margin: 56.1, marginVol: 4.2, revenue: 14.6, fcfGrowth: 13.7, growthVol: 7.8, debt: -0.2, interest: 81, altman: 13.4, piotroski: 8, fcf: 92, accruals: 1.7, capex: 37.2, yield: 1.9, retained: 14.7, share: 4.1, concentration: 39, rd: 8.5, beneish: -2.3, insider: 6.3, short: 0.2 },
  { ticker: "MC", name: "LVMH", market: "Euronext · FR", sector: "Consumer", pillars: [84, 81, 82, 83, 86, 87, 85], roic: 13.9, roe: 22.1, margin: 68.7, marginVol: 2.6, revenue: 9.2, fcfGrowth: 7.6, growthVol: 6.4, debt: 1.1, interest: 12.8, altman: 5.1, piotroski: 7, fcf: 91, accruals: 0.8, capex: 5.3, yield: 1.7, retained: 13.3, share: 1.1, concentration: 12, rd: 1.7, beneish: -2.0, insider: 49, short: 0.3 },
  { ticker: "RY", name: "Royal Bank of Canada", market: "TSX · CA", sector: "Financials", pillars: [81, 78, 74, 77, 80, 79, 83], roic: 12.4, roe: 15.8, margin: 0, marginVol: 0, revenue: 7.1, fcfGrowth: 8.3, growthVol: 4.5, debt: 0, interest: 0, altman: 0, piotroski: 6, fcf: 88, accruals: 0, capex: 0, yield: 4.1, retained: 12.1, share: 0.4, concentration: 0, rd: 0, beneish: -2.1, insider: 0.1, short: 0.5 },
  { ticker: "7203", name: "Toyota Motor", market: "Tokyo · JP", sector: "Consumer", pillars: [82, 77, 84, 78, 82, 81, 79], roic: 9.8, roe: 10.2, margin: 18.3, marginVol: 3.5, revenue: 7.8, fcfGrowth: 10.4, growthVol: 8.2, debt: 0.3, interest: 18.7, altman: 4.8, piotroski: 7, fcf: 95, accruals: 1.2, capex: 7.4, yield: 3.2, retained: 9.3, share: 1.6, concentration: 15, rd: 3.6, beneish: -2.0, insider: 12.4, short: 0.3 },
  { ticker: "SHEL", name: "Shell plc", market: "LSE · UK", sector: "Energy", pillars: [83, 69, 78, 74, 85, 75, 80], roic: 12.1, roe: 11.5, margin: 24.2, marginVol: 14.8, revenue: 3.5, fcfGrowth: 5.1, growthVol: 22.3, debt: 0.6, interest: 15.4, altman: 3.4, piotroski: 6, fcf: 123, accruals: -1.8, capex: 8.7, yield: 8.3, retained: 7.4, share: -0.8, concentration: 21, rd: 0.6, beneish: -2.0, insider: 0.2, short: 0.7 },
  { ticker: "RELIANCE", name: "Reliance Industries", market: "NSE · IN", sector: "Consumer", pillars: [78, 83, 72, 70, 81, 76, 74], roic: 9.1, roe: 9.8, margin: 17.5, marginVol: 4.9, revenue: 10.7, fcfGrowth: 12.8, growthVol: 9.6, debt: 1.7, interest: 6.8, altman: 3.9, piotroski: 6, fcf: 72, accruals: 3.1, capex: 11.3, yield: 0.6, retained: 8.5, share: 0.9, concentration: 26, rd: 0.8, beneish: -1.9, insider: 49, short: 0.1 },
  { ticker: "BHP", name: "BHP Group", market: "ASX · AU", sector: "Materials", pillars: [81, 70, 85, 78, 83, 77, 82], roic: 22.1, roe: 27.3, margin: 49.2, marginVol: 16.5, revenue: 5.8, fcfGrowth: 1.2, growthVol: 26.4, debt: 0.3, interest: 22.5, altman: 6.7, piotroski: 7, fcf: 118, accruals: -1.2, capex: 23.4, yield: 9.6, retained: 5.8, share: -1.1, concentration: 22, rd: 0.4, beneish: -2.3, insider: 0.1, short: 0.4 },
];
const funds = [
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", category: "US Equity", region: "United States", fee: 0.03, return: 12.4, holdings: 83, positions: [["MSFT", 7.2], ["AAPL", 6.1], ["NVDA", 5.5], ["AMZN", 3.8]] },
  { ticker: "VT", name: "Vanguard Total World Stock ETF", category: "International", region: "Global", fee: 0.07, return: 10.1, holdings: 79, positions: [["MSFT", 4.1], ["AAPL", 3.5], ["NVDA", 3.2], ["TSM", 1.8]] },
  { ticker: "QQQ", name: "Invesco QQQ Trust", category: "US Equity", region: "United States", fee: 0.20, return: 14.8, holdings: 82, positions: [["MSFT", 8.7], ["AAPL", 7.4], ["NVDA", 7.1], ["AVGO", 5.0]] },
  { ticker: "VXUS", name: "Vanguard Total International Stock ETF", category: "International", region: "Global ex-US", fee: 0.08, return: 7.3, holdings: 75, positions: [["TSM", 2.4], ["NVO", 1.2], ["ASML", 1.1], ["SAP", 0.9]] },
  { ticker: "IWM", name: "iShares Russell 2000 ETF", category: "US Equity", region: "United States", fee: 0.19, return: 8.8, holdings: 73, positions: [["Sample small-cap A", 0.4], ["Sample small-cap B", 0.3], ["Sample small-cap C", 0.3]] },
  { ticker: "EUNL", name: "iShares Core MSCI World UCITS ETF", category: "International", region: "Developed markets", fee: 0.20, return: 9.7, holdings: 80, positions: [["MSFT", 4.8], ["AAPL", 4.1], ["NVDA", 3.5], ["ASML", 1.0]] },
  { ticker: "EWJ", name: "iShares MSCI Japan ETF", category: "International", region: "Japan", fee: 0.50, return: 7.6, holdings: 77, positions: [["Toyota Motor", 5.1], ["Sony Group", 2.4], ["Mitsubishi UFJ", 2.1], ["Hitachi", 1.8]] },
  { ticker: "VUSA", name: "Vanguard S&P 500 UCITS ETF", category: "US Equity", region: "United States", fee: 0.07, return: 12.2, holdings: 83, positions: [["MSFT", 7.1], ["AAPL", 6.0], ["NVDA", 5.4], ["AMZN", 3.7]] },
  { ticker: "IEMG", name: "iShares Core MSCI Emerging Markets ETF", category: "International", region: "Emerging markets", fee: 0.09, return: 6.4, holdings: 72, positions: [["TSM", 8.3], ["Tencent", 3.8], ["Alibaba", 2.1], ["Reliance", 1.5]] },
  { ticker: "VEA", name: "Vanguard FTSE Developed Markets ETF", category: "International", region: "Developed markets", fee: 0.03, return: 8.2, holdings: 78, positions: [["Toyota Motor", 1.4], ["ASML", 1.3], ["Samsung Electronics", 1.1], ["Nestlé", 0.9]] },
];
const rankSampleMetric = (field, lowerIsBetter) => {
  const sorted = [...funds].sort((a, b) => lowerIsBetter ? a[field] - b[field] : b[field] - a[field]);
  const scores = new Map();
  sorted.forEach((fund, index) => {
    const ties = sorted.map((item, tieIndex) => item[field] === fund[field] ? tieIndex : -1).filter((tieIndex) => tieIndex >= 0);
    const averageRank = ties.reduce((sum, rank) => sum + rank, 0) / ties.length;
    scores.set(fund.ticker, Math.round(100 - (averageRank / (sorted.length - 1)) * 100));
  });
  return scores;
};
const feeRanks = rankSampleMetric("fee", true);
const returnRanks = rankSampleMetric("return", false);
funds.forEach((fund) => {
  fund.score = Math.round(feeRanks.get(fund.ticker) * 0.3 + returnRanks.get(fund.ticker) * 0.3 + fund.holdings * 0.4);
});

const percent = (value) => `${Number(value).toFixed(1)}%`;
const companyScore = (company) => Math.round(company.pillars.reduce((total, value) => total + value, 0) / company.pillars.length);
const scoreBadge = (score) => `<span class="score-cell ${score < 75 ? "score-mid" : ""}">${score}</span>`;
const getAccountTokens = () => Number(getAccount().tokens || 0);
const spendToken = () => {
  const account = getAccount();
  if (account.tokens < 1) return false;
  account.tokens -= 1;
  saveAccount(account);
  return true;
};
const setWatchlistButton = (button, item) => {
  if (!button) return;
  const update = () => {
    const saved = getWatchlist().some((entry) => entry.ticker === item.ticker);
    button.setAttribute("aria-pressed", String(saved));
    button.innerHTML = `<span aria-hidden="true">${saved ? "★" : "☆"}</span> ${saved ? "Saved to watchlist" : "Add to watchlist"}`;
  };
  update();
  button.addEventListener("click", () => {
    const list = getWatchlist();
    const exists = list.some((entry) => entry.ticker === item.ticker);
    const next = exists ? list.filter((entry) => entry.ticker !== item.ticker) : [...list, { ticker: item.ticker, name: item.name, url: item.url }];
    writeStore("finvlo-watchlist", next);
    update();
  });
};

const stockList = document.querySelector("#stock-list");
if (stockList) {
  let sector = "All";
  let sortBy = "score";
  const search = document.querySelector("#stock-search");
  const sort = document.querySelector("#stock-sort");
  const render = () => {
    const query = search.value.trim().toLowerCase();
    const rows = stocks.filter((stock) => (sector === "All" || stock.sector === sector) && `${stock.name} ${stock.ticker} ${stock.market}`.toLowerCase().includes(query));
    rows.sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : sortBy === "ticker" ? a.ticker.localeCompare(b.ticker) : companyScore(b) - companyScore(a));
    stockList.innerHTML = rows.map((stock) => {
      const score = companyScore(stock);
      const checks = Math.round((score / 100) * 22);
      return `<tr><td><div class="table-company"><span class="company-monogram">${stock.ticker.slice(0, 2)}</span><span class="company-name-cell"><strong>${stock.name}</strong><small>${stock.ticker}</small></span></div></td><td>${stock.market}</td><td>${stock.sector}</td><td>${scoreBadge(score)}</td><td>${percent(stock.roic)}</td><td>${percent(stock.revenue)}</td><td><span class="check-count">${checks} / 22</span><div class="quality-meter"><i style="width:${checks / 22 * 100}%"></i></div></td><td><a class="row-open" aria-label="Open ${stock.name}" href="company.html?ticker=${encodeURIComponent(stock.ticker)}">→</a></td></tr>`;
    }).join("");
    document.querySelector("#stock-count").textContent = `${rows.length} ${rows.length === 1 ? "company" : "companies"}`;
  };
  search.addEventListener("input", render);
  sort.addEventListener("change", () => { sortBy = sort.value; render(); });
  document.querySelectorAll("[data-sector]").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("[data-sector].is-active")?.classList.remove("is-active");
    button.classList.add("is-active");
    sector = button.dataset.sector;
    render();
  }));
  render();
}

const etfList = document.querySelector("#etf-list");
if (etfList) {
  let category = "All";
  const search = document.querySelector("#etf-search");
  const sort = document.querySelector("#etf-sort");
  const render = () => {
    const query = search.value.trim().toLowerCase();
    const rows = funds.filter((fund) => (category === "All" || fund.category === category) && `${fund.name} ${fund.ticker} ${fund.region}`.toLowerCase().includes(query));
    rows.sort((a, b) => sort.value === "fee" ? a.fee - b.fee : sort.value === "return" ? b.return - a.return : b.score - a.score);
    etfList.innerHTML = rows.map((fund) => `<tr><td><div class="table-company"><span class="fund-monogram">${fund.ticker.slice(0, 2)}</span><span class="company-name-cell"><strong>${fund.name}</strong><small>${fund.ticker}</small></span></div></td><td>${fund.category}</td><td>${fund.region}</td><td>${scoreBadge(fund.score)}</td><td>${fund.fee.toFixed(2)}%</td><td>${percent(fund.return)}</td><td>${fund.holdings ? scoreBadge(fund.holdings) : "N/A"}</td><td><a class="row-open" aria-label="Open ${fund.name}" href="fund.html?ticker=${encodeURIComponent(fund.ticker)}">→</a></td></tr>`).join("");
    document.querySelector("#etf-count").textContent = `${rows.length} ${rows.length === 1 ? "fund" : "funds"}`;
  };
  search.addEventListener("input", render);
  sort.addEventListener("change", render);
  document.querySelectorAll("[data-fund-category]").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("[data-fund-category].is-active")?.classList.remove("is-active");
    button.classList.add("is-active");
    category = button.dataset.fundCategory;
    render();
  }));
  render();
}

const bindDetailChartPeriods = () => {
  const svg = document.querySelector(".detail-chart svg");
  if (!svg) return;
  const series = {
    "1Y": { path: "M0 124 C55 116 79 129 130 104 S205 110 260 76 S330 90 380 68 S450 78 505 46 S595 58 650 28 S685 36 700 20", labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"] },
    "3Y": { path: "M0 145 C55 137 79 115 130 124 S205 94 260 101 S330 72 380 85 S450 61 505 70 S595 38 650 44 S685 31 700 25", labels: ["2023", "H2", "2024", "H2", "2025", "2026"] },
    "5Y": { path: "M0 158 C55 148 79 134 130 141 S205 111 260 120 S330 93 380 103 S450 71 505 83 S595 52 650 58 S685 33 700 20", labels: ["2021", "2022", "2023", "2024", "2025", "2026"] },
  };
  document.querySelectorAll("[data-chart-period]").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("[data-chart-period].is-active")?.classList.remove("is-active");
    button.classList.add("is-active");
    const selected = series[button.dataset.chartPeriod];
    svg.querySelector(".detail-line").setAttribute("d", selected.path);
    svg.querySelector(".detail-area").setAttribute("d", `${selected.path} L700 184 L0 184Z`);
    document.querySelectorAll(".chart-axis-labels span").forEach((label, index) => { label.textContent = selected.labels[index]; });
  }));
};

const companyName = document.querySelector("#company-name");
if (companyName) {
  const params = new URLSearchParams(location.search);
  const company = stocks.find((item) => item.ticker === params.get("ticker")) || stocks[0];
  const pillars = ["Profitability", "Growth", "Balance sheet", "Cash flow", "Capital allocation", "Moat", "Earnings integrity"];
  const score = companyScore(company);
  companyName.textContent = company.name;
  document.title = `${company.name} (${company.ticker}) | Finvlo demo`;
  document.querySelector("#company-meta").textContent = `${company.ticker} · ${company.market} · ${company.sector}`;
  document.querySelector("#open-checklist").href = `checklist.html?ticker=${encodeURIComponent(company.ticker)}`;
  document.querySelector("#company-score").textContent = score;
  document.querySelector("#company-gauge").style.background = `conic-gradient(var(--blue) ${score}%, #dfe8f4 ${score}% 100%)`;
  document.querySelector("#company-roic").textContent = percent(company.roic);
  document.querySelector("#company-growth").textContent = percent(company.revenue);
  document.querySelector("#company-cash").textContent = percent(company.fcf);
  document.querySelector("#pillar-list").innerHTML = pillars.map((name, index) => `<div class="pillar-row"><span>${name}</span><div class="pillar-bar"><i style="width:${company.pillars[index]}%"></i></div><strong>${company.pillars[index]}</strong></div>`).join("");
  const metrics = [
    ["ROIC", company.roic, ">12% guide", company.roic >= 12], ["ROE · 5y average", company.roe, "12–15% guide", company.roe >= 12], ["Gross margin", company.margin, "Compare in sector", company.margin >= 30], ["Gross margin volatility", company.marginVol, "Lower is steadier", company.marginVol <= 5],
    ["Revenue CAGR · 5y", company.revenue, "Positive growth", company.revenue > 0], ["FCF CAGR · 5y", company.fcfGrowth, "Positive growth", company.fcfGrowth > 0], ["Revenue growth volatility", company.growthVol, "Lower is steadier", company.growthVol <= 10],
    ["Net debt / EBITDA", company.debt, "<2x conservative", company.debt < 2], ["Interest coverage", company.interest, ">5x guide", company.interest > 5], ["Altman Z-score", company.altman, ">3 guide · sector limits", company.altman > 3], ["Piotroski F-score", company.piotroski, "8–9 strong", company.piotroski >= 8],
    ["FCF conversion", company.fcf, "~100% guide", company.fcf >= 90], ["Accruals ratio", company.accruals, "Lower is better", company.accruals < 3], ["CapEx intensity", company.capex, "Sector dependent", company.capex <= 15],
    ["Shareholder yield", company.yield, "Net dilution if <0", company.yield >= 0], ["Return on retained earnings", company.retained, ">10% guide", company.retained >= 10],
    ["Market share trend · 5y", company.share, "Positive is gaining", company.share > 0], ["Top-10 customer concentration", company.concentration, "Lower is less concentrated", company.concentration < 50], ["R&D / revenue", company.rd, "Sector dependent", company.rd > 0],
    ["Beneish M-score", company.beneish, "Above −1.78 flag", company.beneish <= -1.78], ["Insider ownership", company.insider, "Context dependent", company.insider > 0], ["Short interest", company.short, "Context dependent", company.short < 10],
  ];
  const metricBody = document.querySelector("#metric-list");
  metricBody.innerHTML = metrics.map(([name, value, guide, passed]) => `<tr><td>${name}</td><td>${Number(value).toFixed(1)}${["Net debt / EBITDA", "Interest coverage", "Altman Z-score", "Piotroski F-score"].includes(name) ? "" : "%"}</td><td>${guide}</td><td><span class="metric-result ${value === 0 ? "na" : passed ? "" : "review"}">${value === 0 ? "N/A" : passed ? "PASS" : "REVIEW"}</span></td></tr>`).join("");
  const watch = { ...company, url: `company.html?ticker=${encodeURIComponent(company.ticker)}` };
  setWatchlistButton(document.querySelector("#watchlist-button"), watch);
  const runButton = document.querySelector("#run-analysis");
  runButton.addEventListener("click", () => {
    if (!spendToken()) { runButton.innerHTML = `No tokens <span><a href="pricing.html">See plans</a></span>`; return; }
    document.querySelector("#company-score-note").textContent = `Fictional preview score uses equal pillar weights; production weights are not set. ${getAccountTokens()} demo tokens remain.`;
  });
  const priceToggle = document.querySelector("#price-context-toggle");
  const pricePanel = document.querySelector("#price-context-panel");
  const preference = readStore("finvlo-settings", { priceContext: false });
  const renderPriceContext = (visible) => {
    priceToggle.checked = visible;
    document.querySelector("#price-context-state")?.replaceChildren(document.createTextNode(visible ? "On" : "Off"));
    pricePanel.hidden = !visible;
    if (visible) {
      const values = [["P/E", "28.4x"], ["Forward P/E", "24.1x"], ["EV / EBITDA", "18.6x"], ["P / FCF", "31.2x"], ["PEG", "2.1x"], ["EV / Invested capital", "14.8x"]];
      pricePanel.innerHTML = values.map(([label, value]) => `<div><span>${label} · FICTIONAL</span><strong>${value}</strong></div>`).join("");
    }
  };
  renderPriceContext(Boolean(preference.priceContext));
  priceToggle.addEventListener("change", () => {
    const settings = readStore("finvlo-settings", {});
    settings.priceContext = priceToggle.checked;
    writeStore("finvlo-settings", settings);
    renderPriceContext(priceToggle.checked);
  });
  bindDetailChartPeriods();
}

const fundName = document.querySelector("#fund-name");
if (fundName) {
  const params = new URLSearchParams(location.search);
  const fund = funds.find((item) => item.ticker === params.get("ticker")) || funds[0];
  fundName.textContent = fund.name;
  document.title = `${fund.name} (${fund.ticker}) | Finvlo demo`;
  document.querySelector("#fund-meta").textContent = `${fund.ticker} · ${fund.region} · ${fund.category}`;
  document.querySelector("#fund-score").textContent = fund.score;
  document.querySelector("#fund-gauge").style.background = `conic-gradient(var(--blue) ${fund.score}%, #dfe8f4 ${fund.score}% 100%)`;
  document.querySelector("#fund-fee").textContent = `${fund.fee.toFixed(2)}%`;
  document.querySelector("#fund-return").textContent = percent(fund.return);
  document.querySelector("#fund-holdings").textContent = fund.holdings ? `${fund.holdings} / 100` : "N/A";
  document.querySelector("#fund-holding-list").innerHTML = fund.positions.map(([name, weight]) => `<div class="holding-row"><strong>${name}</strong><span>${weight}% position</span><i><b style="width:${Math.min(weight * 5, 100)}%"></b></i></div>`).join("");
  setWatchlistButton(document.querySelector("#fund-watchlist-button"), { ...fund, url: `fund.html?ticker=${encodeURIComponent(fund.ticker)}` });
  document.querySelector("#run-fund-analysis").addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.innerHTML = spendToken() ? `Score refreshed <span>${getAccountTokens()} left</span>` : `No tokens <span><a href="pricing.html">See plans</a></span>`;
  });
  bindDetailChartPeriods();
}

document.querySelectorAll("[data-plan]").forEach((button) => button.addEventListener("click", () => {
  const account = getAccount();
  account.plan = button.dataset.plan;
  account.tokens = Number(button.dataset.tokens);
  saveAccount(account);
  button.textContent = `${account.plan} selected · ${account.tokens} demo tokens`;
}));
document.querySelectorAll("[data-token-pack]").forEach((button) => button.addEventListener("click", () => {
  const account = getAccount();
  account.tokens += Number(button.dataset.tokenPack);
  saveAccount(account);
  button.textContent = `Added · ${account.tokens} demo tokens`;
}));

const profileForm = document.querySelector("#profile-form");
if (profileForm) {
  const profileStatus = document.querySelector("#profile-status");
  const profile = getProfile();
  for (const [key, value] of Object.entries(profile)) {
    const field = profileForm.elements.namedItem(key);
    if (field) field.value = value;
  }
  const displayName = profile.displayName?.trim();
  document.querySelector("#profile-heading-name").textContent = displayName ? `Hello, ${displayName}.` : "Your profile";
  document.querySelector("#profile-avatar").textContent = displayName ? displayName[0].toUpperCase() : "F";
  if (Object.keys(profile).length) profileStatus.textContent = "Profile loaded from this browser";
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const updated = Object.fromEntries(new FormData(profileForm));
    writeStore("finvlo-profile", updated);
    document.querySelector("#profile-heading-name").textContent = updated.displayName?.trim() ? `Hello, ${updated.displayName.trim()}.` : "Your profile";
    document.querySelector("#profile-avatar").textContent = updated.displayName?.trim() ? updated.displayName.trim()[0].toUpperCase() : "F";
    profileStatus.textContent = "Profile saved on this device";
  });
  const account = getAccount();
  document.querySelector("#profile-plan-name").textContent = account.plan;
  document.querySelector("#profile-token-balance").textContent = account.tokens;
  document.querySelector("#side-token-balance").textContent = account.tokens;
  const watchlist = getWatchlist();
  document.querySelector("#watchlist-count").textContent = `${watchlist.length} saved`;
  if (watchlist.length) document.querySelector("#profile-watchlist").innerHTML = watchlist.map((entry) => `<div class="watchlist-item"><span>${entry.name} <small>${entry.ticker}</small></span><a href="${entry.url}">Open →</a></div>`).join("");
  const settingsForm = document.querySelector("#research-settings");
  const priceContextToggle = settingsForm.elements.namedItem("priceContext");
  const settings = readStore("finvlo-settings", { priceContext: false });
  priceContextToggle.checked = Boolean(settings.priceContext);
  document.querySelector("#settings-status").textContent = settings.priceContext ? "Price context is on. It remains separate from quality." : "Price context is off.";
  priceContextToggle.addEventListener("change", () => {
    const updatedSettings = { ...readStore("finvlo-settings", {}), priceContext: priceContextToggle.checked };
    writeStore("finvlo-settings", updatedSettings);
    document.querySelector("#settings-status").textContent = priceContextToggle.checked ? "Price context is on. It remains separate from quality." : "Price context is off.";
  });
}

const metricSearch = document.querySelector("#metric-search");
if (metricSearch) metricSearch.addEventListener("input", () => {
  const query = metricSearch.value.trim().toLowerCase();
  document.querySelectorAll(".metric-card").forEach((card) => { card.hidden = !card.textContent.toLowerCase().includes(query); });
  document.querySelectorAll(".pillar-section").forEach((section) => { section.hidden = !section.querySelector(".metric-card:not([hidden])"); });
});

const qualityCheckForm = document.querySelector("#quality-check-form");
if (qualityCheckForm) {
  document.documentElement.style.scrollBehavior = "auto";
  const checklistMetrics = [
    { pillar: "Profitability", key: "roic", label: "ROIC", unit: "%", guide: "Guide: above 12%", op: ">=", threshold: 12 },
    { pillar: "Profitability", key: "roe", label: "ROE · five-year average", unit: "%", guide: "Guide: 12–15%+", op: ">=", threshold: 12 },
    { pillar: "Profitability", key: "margin", label: "Gross margin", unit: "%", guide: "Compare within sector", context: true },
    { pillar: "Profitability", key: "marginVol", label: "Gross margin standard deviation · five-year", unit: "pp", guide: "Lower is more stable", op: "<=", threshold: 5 },
    { pillar: "Growth", key: "revenue", label: "Revenue CAGR · five-year", unit: "%", guide: "Positive growth", op: ">", threshold: 0 },
    { pillar: "Growth", key: "fcfGrowth", label: "FCF CAGR · five-year", unit: "%", guide: "Positive growth", op: ">", threshold: 0 },
    { pillar: "Growth", key: "growthVol", label: "Revenue growth volatility", unit: "pp", guide: "Lower is steadier", op: "<=", threshold: 10 },
    { pillar: "Balance sheet", key: "debt", label: "Net debt / EBITDA", unit: "x", guide: "Below 2x is often conservative", op: "<=", threshold: 2 },
    { pillar: "Balance sheet", key: "interest", label: "Interest coverage", unit: "x", guide: "Above 5x is often comfortable", op: ">=", threshold: 5 },
    { pillar: "Balance sheet", key: "altman", label: "Altman Z-score", unit: "", guide: "Above 3; designed for manufacturers", op: ">", threshold: 3 },
    { pillar: "Balance sheet", key: "piotroski", label: "Piotroski F-score", unit: "/ 9", guide: "8–9 is strong", op: ">=", threshold: 8 },
    { pillar: "Cash flow quality", key: "fcf", label: "FCF conversion", unit: "%", guide: "Near or above 100%", op: ">=", threshold: 90 },
    { pillar: "Cash flow quality", key: "accruals", label: "Accruals ratio", unit: "% assets", guide: "Lower is generally better", op: "<=", threshold: 3 },
    { pillar: "Cash flow quality", key: "capex", label: "CapEx intensity", unit: "% revenue", guide: "Sector dependent", context: true },
    { pillar: "Capital allocation", key: "yield", label: "Shareholder yield", unit: "%", guide: "Negative can indicate dilution", op: ">=", threshold: 0 },
    { pillar: "Capital allocation", key: "retained", label: "Return on retained earnings", unit: "%", guide: "Above 10% can indicate productive reinvestment", op: ">=", threshold: 10 },
    { pillar: "Moat", key: "share", label: "Market share trend · five-year", unit: "pp", guide: "Positive means share gained", op: ">", threshold: 0 },
    { pillar: "Moat", key: "concentration", label: "Top-10 customer concentration", unit: "% revenue", guide: "Lower means less concentration", op: "<", threshold: 50 },
    { pillar: "Moat", key: "rd", label: "R&D / revenue", unit: "%", guide: "Sector dependent", context: true },
    { pillar: "Earnings integrity", key: "beneish", label: "Beneish M-score", unit: "", guide: "Above −1.78 flags possible manipulation", op: "<=", threshold: -1.78 },
    { pillar: "Earnings integrity", key: "insider", label: "Insider ownership", unit: "%", guide: "Context dependent", context: true },
    { pillar: "Earnings integrity", key: "short", label: "Short interest", unit: "% float", guide: "Context dependent", context: true },
  ];
  const pillarNames = [...new Set(checklistMetrics.map((metric) => metric.pillar))];
  const fields = document.querySelector("#checklist-fields");
  const sampleSelect = document.querySelector("#sample-company");
  const inputFor = (metric) => `<label class="metric-input"><span>${metric.label}<small>${metric.guide}</small></span><input type="number" step="any" data-check-value="${metric.key}" placeholder="Enter value" /><span class="na-field"><input type="checkbox" data-check-na="${metric.key}" /> N/A</span></label>`;
  fields.innerHTML = pillarNames.map((pillar, index) => `<section class="checklist-pillar"><div class="checklist-pillar-heading"><span>${String(index + 1).padStart(2, "0")}</span><h2>${pillar}</h2><p>${checklistMetrics.filter((metric) => metric.pillar === pillar).length} metrics</p></div><div class="checklist-metric-grid">${checklistMetrics.filter((metric) => metric.pillar === pillar).map(inputFor).join("")}</div></section>`).join("");
  stocks.forEach((stock) => {
    const option = document.createElement("option");
    option.value = stock.ticker;
    option.textContent = `${stock.name} (${stock.ticker}) · fictional`;
    sampleSelect.append(option);
  });
  sampleSelect.addEventListener("change", () => {
    const stock = stocks.find((entry) => entry.ticker === sampleSelect.value);
    document.querySelector("#checklist-company").value = stock ? `${stock.name} (${stock.ticker})` : "";
    checklistMetrics.forEach((metric) => {
      const input = fields.querySelector(`[data-check-value="${metric.key}"]`);
      const na = fields.querySelector(`[data-check-na="${metric.key}"]`);
      input.value = stock ? stock[metric.key] ?? "" : "";
      na.checked = stock && stock[metric.key] === 0;
      input.disabled = na.checked;
    });
  });
  const requestedTicker = new URLSearchParams(location.search).get("ticker");
  if (stocks.some((stock) => stock.ticker === requestedTicker)) {
    sampleSelect.value = requestedTicker;
    sampleSelect.dispatchEvent(new Event("change"));
  }
  fields.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-check-na]");
    if (checkbox) fields.querySelector(`[data-check-value="${checkbox.dataset.checkNa}"]`).disabled = checkbox.checked;
  });
  document.querySelector("#checklist-token-count").textContent = getAccountTokens();
  qualityCheckForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputs = checklistMetrics.map((metric) => {
      const value = fields.querySelector(`[data-check-value="${metric.key}"]`);
      const notApplicable = fields.querySelector(`[data-check-na="${metric.key}"]`).checked;
      return { metric, value: value.value === "" ? null : Number(value.value), notApplicable };
    });
    const supplied = inputs.filter((entry) => entry.value !== null || entry.notApplicable);
    if (!supplied.length) {
      document.querySelector("#result-title").textContent = "Add a few figures first";
      document.querySelector("#result-description").textContent = "Enter company values or mark metrics not applicable before running the checklist.";
      return;
    }
    const scored = supplied.filter((entry) => !entry.notApplicable && !entry.metric.context && entry.value !== null);
    const contextCount = supplied.filter((entry) => !entry.notApplicable && entry.metric.context && entry.value !== null).length;
    if (!scored.length) {
      document.querySelector("#result-title").textContent = "No threshold checks to assess";
      document.querySelector("#result-description").textContent = "Add threshold-based values or mark additional metrics not applicable. Context-only values are not pass/fail checks.";
      return;
    }
    if (!spendToken()) {
      document.querySelector("#result-title").textContent = "No demo tokens left";
      document.querySelector("#result-description").textContent = "Visit Plans & tokens to add demo usage. No payment is connected.";
      return;
    }
    const passed = scored.filter(({ metric, value }) => metric.op === ">=" ? value >= metric.threshold : metric.op === ">" ? value > metric.threshold : metric.op === "<=" ? value <= metric.threshold : value < metric.threshold);
    const label = document.querySelector("#checklist-company").value.trim() || "This company";
    document.querySelector("#pass-count").textContent = `${passed.length}/${scored.length}`;
    document.querySelector("#result-title").textContent = `${label}: ${passed.length} checks passed`;
    document.querySelector("#result-description").textContent = `${scored.length} threshold checks assessed; ${contextCount} context-only metrics need human review. ${getAccountTokens()} demo tokens remain. This is not the peer-ranked Quality Score.`;
    document.querySelector("#checklist-token-count").textContent = getAccountTokens();
  });
}