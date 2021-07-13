export const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const getSortedRelativeDistances = (point, points) => {
	const distances = [];

	points.forEach((coordinates, idx) => {
		const d = Math.pow(coordinates.x - point.x, 2) + Math.pow(coordinates.y - point.y, 2);

		d !== 0 &&
			distances.push({
				distance: Math.sqrt(d),
				idx: idx,
			});
	});

	distances.sort((a, b) => a.distance - b.distance);

	return distances;
};

/**
 *
 * @param {Number} count How many sets of coordinates you want
 * @param {Number} radius The node radius (if applicable, e.g. if you're building circles)
 * @param {Number} baseRadius The radius of the circle
 * @param {Number} xOffset Relative to the SVG top left corner
 * @param {Number} yOffset Relative to the SVG top left corner
 * @returns
 */
export const getCoordinatesAroundCircle = (count, radius, baseRadius, xOffset = 0, yOffset = 0) => {
	let coordinates = [];

	for (let i = 0; i < count; i++) {
		const angle = (i / (count / 2)) * Math.PI;

		coordinates.push({
			x: baseRadius * Math.cos(angle) + xOffset,
			y: baseRadius * Math.sin(angle) + yOffset,
			r: radius,
		});
	}

	return coordinates;
};

export const createLinesBetweenCircles = (circles) => {
	let tempCircles = [...circles];
	let lines = [];

	while (tempCircles.length > 0) {
		shuffle(tempCircles);

		const lineCoordinates = tempCircles.splice(0, 2);
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const randomFallbackCoordinates = circles[(circles.length * Math.random()) | 0];

		line.setAttribute('stroke', '#3f3f3f');
		line.setAttribute('stroke-width', '1');
		line.setAttribute('x1', lineCoordinates[0].x);
		line.setAttribute('y1', lineCoordinates[0].y);
		line.setAttribute('x2', lineCoordinates.length > 1 ? lineCoordinates[1].x : randomFallbackCoordinates.x);
		line.setAttribute('y2', lineCoordinates.length > 1 ? lineCoordinates[1].y : randomFallbackCoordinates.y);

		lines.push(line);
	}

	return lines;
};

export const createSVGElements = (svgContainer) => {
	if (!svgContainer) return console.warn('No #svgAnimation present.');

	const { width, height } = svgContainer.viewBox.baseVal;
	const circles = [
		...getCoordinatesAroundCircle(3, 15, 30, width / 2, height / 2),
		...getCoordinatesAroundCircle(7, 25, 270, width / 2, height / 2),
	];
	const rectangleCoordinates = getCoordinatesAroundCircle(9, null, 160, width / 2, height / 2);
	const lines = [
		...createLinesBetweenCircles(circles),
		...createLinesBetweenCircles(rectangleCoordinates),
		...createLinesBetweenCircles(circles),
	];

	rectangleCoordinates.forEach((r) => {
		const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const rectangleWidth = 70;
		const rectangleHeight = rectangleWidth;

		rectangle.setAttribute('fill', '#3f3f3f');
		rectangle.setAttribute('rx', 5);
		rectangle.setAttribute('x', r.x - rectangleWidth / 2);
		rectangle.setAttribute('y', r.y - rectangleHeight / 2);
		rectangle.setAttribute('width', rectangleWidth);
		rectangle.setAttribute('height', rectangleHeight);

		svgContainer.appendChild(rectangle);
	});

	// circles.forEach((circleCoordinates) => {
	// 	const distances = getSortedRelativeDistances(circleCoordinates, circles);

	// 	distances.splice(0, 4);

	// 	distances.forEach((d) => {
	// 		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	// 		line.setAttribute('stroke', '#3f3f3f');
	// 		line.setAttribute('stroke-width', '1');
	// 		line.setAttribute('x1', circleCoordinates.x);
	// 		line.setAttribute('y1', circleCoordinates.y);
	// 		line.setAttribute('x2', circles[d.idx].x);
	// 		line.setAttribute('y2', circles[d.idx].y);

	// 		svgContainer.appendChild(line);

	// 		line.setAttribute('stroke-dasharray', line.getTotalLength());
	// 		line.setAttribute('stroke-dashoffset', line.getTotalLength());
	// 	});
	// });

	lines.forEach((line) => {
		svgContainer.appendChild(line);

		line.setAttribute('data-length', line.getTotalLength());
		line.setAttribute('stroke-dasharray', line.getTotalLength());
		line.setAttribute('stroke-dashoffset', line.getTotalLength());
	});

	circles.forEach((n, idx) => {
		const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		c.setAttribute('cx', n.x);
		c.setAttribute('cy', n.y);
		c.setAttribute('r', n.r);
		c.setAttribute('fill', 'green');

		svgContainer.appendChild(c);
	});
};
