//import MoonIcon from '../../assets/icons/moon.svg'

export default class DarkMode {
    constructor({$app}) {

        this.$target = document.createElement('div');
        this.$target.className = "toggleMode";
        this.$target.innerHTML = '🌚';

        $app.appendChild(this.$target);
        this.$target.addEventListener('click', e => {
            this.toggleTheme();
        })
    }

    
    toggleTheme() {

        // 우선순위 1 : body dataset 조회 
        // 우선순위 2 : 브라우저 모드 조회 
        const originTheme = document.body.dataset.theme 
        || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        const toggleTheme = originTheme === 'dark' ? 'light' : 'dark';

        this.$target.innerHTML = originTheme === 'dark' ? '🌚' : '🌝';

        document.body.setAttribute('data-theme', toggleTheme);
    }
}