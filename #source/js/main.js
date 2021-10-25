const reviewsSlider = document.querySelector('.reviews__slider-container');
mobileSwiper = new Swiper(reviewsSlider, {
	loop: false,
	slideClass: 'reviews__item',
	wrapperClass: 'reviews__slider-wrapper',
	parallax: true,
	pagination: {
		el: '.reviews__slider-pagination',
		type: "bullets",
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	speed: 1200,
	observer: true,
	observeParents: true,
	observeChildren: true,
	breakpoints: {
		300: {
			slidesPerView: 1,
			spaceBetween: 10,
			grid: {
				rows: 2,
			},
			parallax: false,
			initialSlide: 1,
			slidesPerGroup: 1,
		},
		760: {
			slidesPerView: 2,
			spaceBetween: 10,
			initialSlide: 2,
			slidesPerGroup: 2,
		},
		1100: {
			slidesPerView: 2,
			spaceBetween: 20,
			initialSlide: 2,
			slidesPerGroup: 2,
		},
	},
});

// MENU-BURGER
const iconMenu = document.querySelector('.menu__icon');
const menu = document.querySelector('.header__menu');
const headerBody = document.querySelector('.header__body');
const menuOverlay = document.querySelector('.menu-overlay')
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('active');
		menu.classList.toggle('active');
		headerBody.classList.toggle('index');
		menuOverlay.classList.toggle('show');
	});
}

// MODAL WINDOW
const modalButtons = document.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

modalButtons.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const modalId = this.dataset.modalButton;
		const modal = document.querySelector('#' + modalId);
		modal.classList.remove('hidden');
		modal.querySelector('.modal-window').addEventListener('click', function (e) {
			e.stopPropagation();
		});
	})
})
modalClosebuttons.forEach(function (item) {
	item.addEventListener('click', function () {
		const modal = this.closest('[data-modal]');
		modal.classList.add('hidden');
	})
})

allModals.forEach(function (item) {
	item.addEventListener('click', function () {
		this.classList.add('hidden');
	});
});

// INPUT MASK
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);



const animItems = document.querySelectorAll('._anim-items');
// Проверка длины объектов. Если она больше 0,то там объекты есть
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			// Получаем высоту объекта
			const animItemHeight = animItem.offsetHeight;
			// Получаем позицию объекта относительно верха. Насколько объект находится ниже, чем верх страницы
			const animItemOffset = offset(animItem).top;
			// Коэффициент,который регулирует момент старта анимации
			const animStart = 4;

			// Высчитываем высоту окна браузера. Отнимаем от высоты окна браузера высоту объекта,кот. анимаруется и делим на коэффицент
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			// Проверка: если высота объекта выше высоты окна браузера
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			// Добавление класса _active при определенном условии
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	// Функция для корректного и кроссбразуерного получения позиции объекта
	function offset(el) {
		const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

// Счетчик цифр
var time = 2,
cc = 1;
$(window).scroll(function() {
	$('.counter__items').each(function() {
		var cPos = $(this).offset().top,
		topWindow = $(window).scrollTop();
		if (cPos < topWindow + 450) {
			if (cc < 2) {
				$(".about-item__number").addClass("visible");
				$('div').each(function() {
					var i = 1,
						num =  $(this).data('num'),
						step = 1000 * time / num,
						that = $(this),
					int = setInterval(function() {
						if (i <= num) {
							that.html(i);
						} else {
							cc = cc + 2;
							clearInterval(int);
						}
						i++;
					}, step);
				});
			}
		}
	});
});
