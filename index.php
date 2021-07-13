<?php
$advisors = [
	[
		'class' => 'cris',
		'name' => 'Cris Cabanillas',
		'firstname' => 'Cris',
		'invested' => 'innovation.'
	],
	[
		'class' => 'rene',
		'name' => 'René Nourse',
		'firstname' => 'René',
		'invested' => 'making dreams happen.'
	],
	[
		'class' => 'janet',
		'name' => 'Janet Acheatel',
		'firstname' => 'Janet',
		'invested' => 'helping women.'
	],
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>8vc Animations</title>
	<link rel="stylesheet" href="dist/app.css" />
</head>

<body>

	<section class="problem-solving-animation">
		<div class="container">
			<div class="problem-solving-animation__content">
				<h3>Our build companies are tackling hard problems in:</h3>
				<ul>
					<li class="active"><button>Some problem here</button></li>
					<li><button>Some problem here</button></li>
					<li><button>Some problem here</button></li>
					<li><button>Some problem here</button></li>
				</ul>
			</div>

			<svg id="svgAnimation" viewbox="0 0 600 600" width="100%"></svg>
		</div>
	</section>

	<script src="dist/app.js"></script>
</body>

</html>
