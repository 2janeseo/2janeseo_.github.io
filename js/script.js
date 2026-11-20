/*
 * 12주차 인터랙티브반 공통 실습 시작 파일
 *
 * 현재 구현됨: 페이지 진입 애니메이션, 연도 A의 기본 표시.
 * 아직 구현하지 않음: 연도 B 클릭 시 수치·설명·그래프가 함께 바뀌는 기능.
 *
 * Copilot Agent 실습에서 수정할 부모: .compare-section
 * 선택 버튼: .year-button-a / .year-button-b
 * 변경 대상: .year-rate / .year-description / .year-chart
 */

// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

// 연도별 학습용 가상 데이터
const yearData = {
  A: {
    rate: '4.2',
    title: '연도 A의 실업률 변화',
    description: '연도 A를 선택한 화면입니다. 학습용 가상 수치를 기반으로 그래프와 설명이 표시됩니다.',
    image: 'images/year-a.svg',
    alt: '가상 데이터 연도 A 실업률 추이 그래프',
    status: '연도 A의 가상 데이터가 표시 중입니다.',
    footer: '연도 A'
  },
  B: {
    rate: '3.6',
    title: '연도 B의 실업률 변화',
    description: '연도 B를 선택한 화면입니다. 연도 A보다 낮은 가상 실업률을 비교할 수 있습니다.',
    image: 'images/year-b.svg',
    alt: '가상 데이터 연도 B 실업률 추이 그래프',
    status: '연도 B의 가상 데이터가 표시 중입니다.',
    footer: '연도 B'
  }
};

const buttonA = document.querySelector('.year-button-a');
const buttonB = document.querySelector('.year-button-b');
const yearRate = document.querySelector('.year-rate');
const metricTitle = document.querySelector('.metric-title');
const yearDescription = document.querySelector('.year-description');
const yearChart = document.querySelector('.year-chart');
const yearLabel = document.querySelector('.year-label');
const chartFooterLabel = document.querySelector('.chart-footer > span:first-child');
const chartStatus = document.querySelector('.chart-status');
const practiceStatus = document.querySelector('.practice-status');

function selectYear(year) {
  const data = yearData[year];

  yearRate.innerHTML = `${data.rate}<span>%</span>`;
  metricTitle.textContent = data.title;
  yearDescription.textContent = data.description;
  yearChart.src = data.image;
  yearChart.alt = data.alt;
  yearLabel.textContent = `YEAR ${year}`;
  chartFooterLabel.textContent = data.footer;
  chartStatus.textContent = data.status;
  practiceStatus.innerHTML = `<span class="status-dot"></span> 현재는 연도 ${year}의 학습용 가상 데이터가 표시됩니다.`;

  const isYearA = year === 'A';
  buttonA.classList.toggle('active', isYearA);
  buttonA.setAttribute('aria-pressed', String(isYearA));
  buttonB.classList.toggle('active', !isYearA);
  buttonB.setAttribute('aria-pressed', String(!isYearA));
}

buttonA.addEventListener('click', () => selectYear('A'));
buttonB.addEventListener('click', () => selectYear('B'));

selectYear('A');
