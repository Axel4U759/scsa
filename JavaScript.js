const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (window.matchMedia('(prefers-color-scheme:   dark)').matches && !localStorage.getItem('theme'));

    if (isDark) {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '🟡<span class="tooltip">切换主题</span>';
    }
}

function toggleTheme() {
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '🌙<span class="tooltip">切换主题</span>';
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '🟡<span class="tooltip">切换主题</span>';
    }
}

themeToggle.addEventListener('click', toggleTheme);
initTheme();

const yiyanPanel = document.getElementById('yiyanPanel');
let yiyanVisible = false;

function loadYiyan() {
    fetch('https://international.v1.hitokoto.cn?c=j&c=k&c=l&encode=json&charset=utf-8')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.hitokoto').textContent = data.hitokoto;
            if (!yiyanVisible) toggleYiyan();
        })
        .catch(() => {
            document.querySelector('.hitokoto').textContent = "加载中，请稍候...";
        });
}

function toggleYiyan() {
    yiyanVisible = !yiyanVisible;
    yiyanPanel.classList.toggle('yiyan-active', yiyanVisible);
    if (yiyanVisible && document.querySelector('.hitokoto').textContent === "正在加载...") {
        loadYiyan();
    }
}

document.getElementById('yiyanBtn').addEventListener('click', toggleYiyan);

document.addEventListener('click', (e) => {
    if (yiyanVisible && !e.target.closest('.yiyan-panel') && !e.target.closest('#yiyanBtn')) {
        toggleYiyan();
    }
});

loadYiyan();

const timePanel = document.getElementById('timePanel');
let timeVisible = false;

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const dateStr = `${now.getFullYear()} 年${now.getMonth()+1} 月${now.getDate()} 日 星期${weekdays[now.getDay()]}`;

    document.getElementById('current-time').textContent = timeStr;
    document.getElementById('current-date').textContent = dateStr;
}

function toggleTime() {
    timeVisible = !timeVisible;
    timePanel.classList.toggle('time-active', timeVisible);
}

updateTime();
setInterval(updateTime, 1000);

document.getElementById('timeBtn').addEventListener('click', toggleTime);

document.addEventListener('click', (e) => {
    if (timeVisible && !e.target.closest('.time-panel') && !e.target.closest('#timeBtn')) {
        toggleTime();
    }
});