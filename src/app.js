import gsap from 'gsap';
import { createSVGElements } from './js/Helpers';

const App = () => {
	const svgContainer = document.getElementById('svgAnimation');
	const navLinks = document.querySelectorAll('.problem-solving-animation li:not(.tracker)');
	const navLinksTracker = document.querySelector('.problem-solving-animation li.tracker');
	const { width, height } = svgContainer.viewBox.baseVal;
	const tl = gsap.timeline();

	createSVGElements(svgContainer);

	navLinks.forEach((l) => {
		l.addEventListener('click', (ev) => {
			navLinks.forEach((navLink) => navLink.classList.remove('active'));

			l.classList.add('active');
			const targetScale = l.getBoundingClientRect().height;
			navLinksTracker.style.transform = 'translateY(' + (l.offsetTop + 20) + 'px)';

			gsap.timeline({
				onComplete: () => {
					// while (svgContainer.firstChild) {
					// 	svgContainer.removeChild(svgContainer.firstChild);
					// }

					// createSVGElements(svgContainer);
					tl.restart();
				},
			})
				.to(svgContainer.querySelectorAll('line'), {
					attr: {
						'stroke-dashoffset': (idx, target) => {
							return target.dataset.length;
						},
					},
					stagger: 0.05,
				})
				.to([...svgContainer.querySelectorAll('circle'), ...svgContainer.querySelectorAll('rect')], {
					rotation: 20,
					opacity: 0,
					svgOrigin: `${width / 2} ${height / 2}`,
					stagger: {
						amount: 0.75,
						from: 'random',
					},
				});
		});
	});

	tl.from([...svgContainer.querySelectorAll('circle'), ...svgContainer.querySelectorAll('rect')], {
		duration: 0.75,
		rotation: -20,
		svgOrigin: `${width / 2} ${height / 2}`,
		// attr: { cx: '+=50', cy: '-=50' },
		opacity: 0,
		stagger: {
			amount: 0.75,
			from: 'random',
		},
		ease: 'power3.easeOut',
	}).to(svgContainer.querySelectorAll('line'), {
		attr: { 'stroke-dashoffset': 0 },
		stagger: 0.05,
	});
};

window.addEventListener('DOMContentLoaded', App);
