const nav = document.querySelector('#header nav');
const toggles = document.querySelectorAll('nav .toggle');
const links = document.querySelectorAll('nav ul li a');
const backToTopButton  = document.querySelector('.back-to-top');
const header = document.querySelector('#header');
const navHeigth = header.offsetHeight;
const sections = document.querySelectorAll('main section[id]');

const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: true
});

for (const element of toggles){
    element.addEventListener('click', function(){
       nav.classList.toggle('show');
    });
}

for (const element of links){
    element.addEventListener('click',function(){
        nav.classList.remove('show');
    });
}

const swiper = new Swiper('.swiper', {

    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
    },

    mousewheel: true,
    keyboard:true,
    breakpoints: {
        767:{
            slidesPerView: 2,
            setWrapperSize: true,
        }
    },
    
    direction: 'horizontal',
    loop: true,
  
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });


scrollReveal.reveal(`
  #home .image, #home .text,
  #about .image, #about .text,
  #service header, #service .card,
  #testmonials header, #testmonials .testmonial,
  #contact .text, #contact .links,
  footer .brand, footer .social
`,{interval: 100});

function changeHeaderWhenScroll(){
    if(window.scrollY >= navHeigth){
        header.classList.add('scroll');
    }else{
        header.classList.remove('scroll');
    }
}

function backToTop(){
     if(window.scrollY >= 560){
        backToTopButton.classList.add('show');
    }else{
        backToTopButton.classList.remove('show');
    }
}

function activateMenuAtCurrentSection(){
    const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

    for(const section of sections){
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        const checkpointStart = checkpoint >= sectionTop;
        const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

        if(checkpointStart && checkpointEnd){
            document
                .querySelector('nav ul li a[href*=' +sectionId+ ']')
                .classList.add('active');
            
        }else{
            document
            .querySelector('nav ul li a[href*=' +sectionId+ ']')
            .classList.remove('active');
        }

    }
}

window.addEventListener('scroll', function(){
    changeHeaderWhenScroll();
    backToTop();
    activateMenuAtCurrentSection();
});