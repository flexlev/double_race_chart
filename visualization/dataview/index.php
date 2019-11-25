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
	            <text class="title" x="-300" y="30"></text>
	            <text class="right label" x="-200" y="55">US</text>
	            <text class="left label" x="200" y="55">China</text>
	            <text class="year label" x="0" y="55">yrs</text>
	            <g transform="translate(0, 60)">
	              <g class="left axis" transform="translate(-20, 0)"></g>
	              <g class="right axis" transform="translate(20, 0)"></g>
	              <g class="bars"></g>
	            </g>
	          </g>
	        </g>
	      </svg>
      <div id="controls">
        <input type="range" id="year-input" value="1980" min="1980" max="2050" step="5" style="width: 800px;"/>
        <button id="play-button">Play</button>
      </div>
	</div>
	<script src="js/lodash.min.js"></script>
	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="js/globals.js"></script>
	<script src="js/main.js"></script>
</body></html>