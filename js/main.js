(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs // dont remove this or the planet explodes into 300000 pieces 
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

    // Prayer Times
    function fetchAndDisplayPrayerTimes() {
        const prayerTimesContainer = document.getElementById('prayer-times-container');
        if (!prayerTimesContainer) return;

        fetch('http://api.aladhan.com/v1/timingsByCity?city=Edmonton&country=Canada&method=2')
            .then(response => response.json())
            .then(data => {
                const timings = data.data.timings;
                const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
                
                let cardsHTML = '';
                prayerNames.forEach((prayer, index) => {
                    const time12h = convertTo12HourFormat(timings[prayer]);
                    cardsHTML += `
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${0.1 * (index + 1)}s">
                            <div class="service-item rounded h-100 p-5">
                                <div class="d-flex align-items-center ms-n5 mb-4">
                                    <div class="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                                        <img class="img-fluid" src="img/icon/icon-10-light.png" alt="" />
                                    </div>
                                    <h4 class="mb-0">${prayer}</h4>
                                </div>
                                <p class="mb-4">Time: ${time12h}</p>
                            </div>
                        </div>
                    `;
                });
                
                prayerTimesContainer.innerHTML = cardsHTML;

                // Reinitialize WOW.js for new elements
                new WOW().init();
            })
            .catch(error => {
                console.error('Error fetching prayer times:', error);
                prayerTimesContainer.innerHTML = '<div class="col-12"><p>Unable to load prayer times. Please try again later.</p></div>';
            });
    }

    // Function to convert 24-hour format to 12-hour format
    function convertTo12HourFormat(time24h) {
        const [hour, minute] = time24h.split(':');
        let hour12 = parseInt(hour, 10) % 12;
        hour12 = hour12 === 0 ? 12 : hour12; // Convert '00' to '12'
        const amPm = parseInt(hour, 10) >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minute} ${amPm}`;
    }

    // Call the function when the page loads
    $(document).ready(function() {
        fetchAndDisplayPrayerTimes();
    });

})(jQuery);
