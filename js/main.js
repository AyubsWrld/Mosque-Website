(function ($) {
    "use strict";
    function fetchAndDisplayPrayerTimes() {
        const prayerTimesContainer = document.querySelector('.col-lg-7.px-5.text-start');
        if (!prayerTimesContainer) return;

        fetch('http://api.aladhan.com/v1/timingsByCity?city=Edmonton&country=Canada&method=2')
            .then(response => response.json())
            .then(data => {
                const timings = data.data.timings;
                const prayerTimesHTML = `
                    <div class="h-100 d-inline-flex align-items-center me-4">
                        <small class="far fa-clock me-2"></small>
                        <small>Fajr: ${timings.Fajr}</small>
                    </div>
                    <div class="h-100 d-inline-flex align-items-center me-4">
                        <small class="far fa-clock me-2"></small>
                        <small>Dhuhr: ${timings.Dhuhr}</small>
                    </div>
                    <div class="h-100 d-inline-flex align-items-center me-4">
                        <small class="far fa-clock me-2"></small>
                        <small>Asr: ${timings.Asr}</small>
                    </div>
                    <div class="h-100 d-inline-flex align-items-center me-4">
                        <small class="far fa-clock me-2"></small>
                        <small>Maghrib: ${timings.Maghrib}</small>
                    </div>
                    <div class="h-100 d-inline-flex align-items-center me-4">
                        <small class="far fa-clock me-2"></small>
                        <small>Isha: ${timings.Isha}</small>
                    </div>
                `;
                prayerTimesContainer.innerHTML = prayerTimesHTML;
            })
            .catch(error => console.error('Error fetching prayer times:', error));
    }

    fetchAndDisplayPrayerTimes();
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

