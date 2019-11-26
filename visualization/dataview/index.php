<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Simulation de l'utilisation du temps</title>
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
<link rel="stylesheet" type="text/css" href="css/fonts.css">
<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
<meta charset="utf-8"><style>.node{stroke-width:1.5px;}</style></head>


<body>
	<div id="chart">
		<svg width="1280" height="720">
	        <g transform="translate(20, 0)">
	          <g transform="translate(640, 0)">
	            <text class="title" x="-350" y="35"></text>
	            <g transform="translate(0, 60)">
	              <g class="left axis" transform="translate(-60, 25)"></g>
	              <g class="right axis" transform="translate(60, 25)"></g>
	              <g class="bars">
	              	<!-- <img src="images/China.png" x="-200" y="550"></img>
	            	<img src="images/United States.png" x="200" y="550"></img> -->
	              </g>
	            </g>
	          </g>
	        </g>
	      </svg>
	</div>
	<script src="js/lodash.min.js"></script>
	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="js/globals.js"></script>
	<script src="js/main.js"></script>
</body></html>