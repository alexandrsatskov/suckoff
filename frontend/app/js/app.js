
document.addEventListener("DOMContentLoaded", function() {
    const
        sidebar = document.getElementById('js-sidebar'),
        sidebar_svg = document.getElementById('js-sidebar-svg'),
        sidebar_rect = document.getElementById('js-sidebar-rect'),
        categories_male = document.getElementById('js-categories-male'),
        categories_female = document.getElementById('js-categories-female'),
        gender_male = document.getElementById('js-gender-male'),
        gender_female = document.getElementById('js-gender-female'),
        filter_bar_button = document.getElementById('js-filter-bar-button'),
        hamburger_menu = document.getElementById('js-hamburger'),
        hamburger_menu_wrapper = document.getElementById('js-hamburger-wrapper'),
        product_list = document.getElementById('js-product-list'),
        filter_bar_list = document.getElementById('js-filter-bar-list'),
        filter_bar_arrow = document.getElementById('js-filter-bar-arrow'),
        body = document.getElementById('js-body'),
        header = document.getElementById('js-header'),
        categories = document.getElementById('js-categories'),
        gender = document.getElementById('js-gender'),
        scroll_top = document.getElementById('js-button_go-top'),
        wrapper_scroll_top = document.getElementById('js-wrapper-button_go-top');

    sidebar_effects()


    gender_male.addEventListener('click', male_handler)
    gender_female.addEventListener('click', female_handler)
    window.addEventListener('resize', sidebar_effects);

    // Progress bar of items
    function filter_bar() {
        filter_bar_list.classList.toggle('is-open')
        filter_bar_arrow.classList.toggle('rotate')
    }
    filter_bar_button.addEventListener('click', filter_bar)
    filter_bar_button.addEventListener('blur',() => {
        filter_bar_list.classList.remove('is-open')
        filter_bar_arrow.classList.remove('rotate')
    })


    // HAMBURGER
    function hamburger() {
        hamburger_menu.classList.toggle('animate')

        // Remove content text while menu is open
        if(product_list.style.color === 'transparent')
            product_list.style.color = 'black';
        else
            product_list.style.color = 'transparent';


        sidebar.classList.toggle('is-open')

        sidebar_height()

        body.classList.toggle('blackout')
        body.classList.toggle('scroll-lock')
    }
    hamburger_menu_wrapper.addEventListener('click', hamburger)
    hamburger_menu_wrapper.addEventListener('blur', hamburger)


    function sidebar_height() {
        sidebar.style.height = 'auto';
        if ((sidebar.offsetHeight + header.offsetHeight) >= window.innerHeight)
            sidebar.style.height = '70vh';

        body.style.setProperty('--sidebar-height',
            sidebar.offsetHeight.toString() + 'px')
    }

    // Sidebar effects
    function sidebar_effects() {
        sidebar_svg.style.width =
            (sidebar.offsetWidth + 20).toString()
        sidebar_svg.style.height =
            (sidebar.offsetHeight + 20).toString()
        sidebar_rect.style.width =
            (sidebar.offsetWidth + 20).toString()
        sidebar_rect.style.height =
            (sidebar.offsetHeight + 20).toString()
        sidebar_rect.style.setProperty('--width',
            (sidebar.offsetWidth + 20).toString())
        sidebar_rect.style.setProperty('--height',
            (sidebar.offsetHeight + 20).toString())

        sidebar_height()
        if (document.documentElement.clientWidth > 768) {
            sidebar.classList.remove('is-open')
            body.classList.remove('blackout')
            hamburger_menu.classList.remove('animate')
            product_list.style.color = 'black'
        }

    }



    function male_handler() {
        gender_female.classList.remove('active')
        gender_male.classList.add('active')
        gender_male.style.setProperty('--right', '0')
        categories_female.classList.remove('active')
        categories_male.classList.add('active')

        sidebar_effects()

        sidebar_rect.style.setProperty('--gender', 0+'')

    }

    function female_handler() {
        gender_male.classList.remove('active')
        gender_female.classList.add('active')
        gender_female.style.setProperty('--left', '0')
        categories_male.classList.remove('active')
        categories_female.classList.add('active')

        sidebar_effects()

        sidebar_rect.style.setProperty('--gender',
            sidebar_rect.style.getPropertyValue('--height'))
    }

    // GO BACK TO TOP BUTTON
    wrapper_scroll_top.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
    let previous_scroll = 0, transform_clear;
    window.addEventListener('scroll', () => {
        let current_scroll = window.pageYOffset
        if (window.pageYOffset > 155) {
            wrapper_scroll_top.style.transform = 'translateX(0)'
            if ((current_scroll - previous_scroll) <= -100) {

                scroll_top.style.transform = 'translateX(0)';
                clearTimeout(transform_clear)
                transform_clear = setTimeout(() => {
                    scroll_top.style.transform = 'translateX(100%)'
                }, 3000)
            }
        }
        else {
            wrapper_scroll_top.style.transform = 'translateX(100%)'
            scroll_top.style.transform = 'translateX(100%)';
        }
        previous_scroll = current_scroll;
    });
});
