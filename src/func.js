function plot_landscape(json){
am4core.ready(function() {
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.data = json;
var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
xAxis.renderer.labels.template.rotation = 0;
xAxis.title.text="Wave Number (cm-1)";
xAxis.numberFormatter.numberFormat="#";
xAxis.renderer.inversed = true;
var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
yAxis.renderer.grid.template.disabled = true;
xAxis.renderer.grid.template.disabled = true;
//xAxis.renderer.minGridDistance = 50;
var series1 = chart.series.push(new am4charts.LineSeries());
yAxis.title.text="Transmittance";
series1.dataFields.valueX = "x";
series1.dataFields.valueY = "ay";
series1.strokeWidth = .5;
series1.stroke = am4core.color("black");
series1.tooltip.pointerOrientation = "up";
//series1.tooltip.background.fill = am4core.color("white");
series1.tooltip.background.cornerRadius = 20;
series1.tooltip.label.fontSize = 12;
series1.tooltip.label.rotation = 90;
series1.tooltip.label.layout = "vertical";
series1.tooltip.label.marginRight = 0;
chart.tooltip.label.textAlign = "end";
series1.tooltip.dy = 50; 
series1.tooltip.dx = 10;            
var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
bullet1.circle.stroke = am4core.color("black");
bullet1.fill=am4core.color("black")
//bullet1.circle.strokeWidth = 3;
bullet1.circle.radius = .01;
series1.heatRules.push({
  target: bullet1.circle,
  min: .0,
  max: .0,
  property: "radius"
});

bullet1.tooltipText = "{valueX.formatNumber('[blue]#.')}";
series1.tooltip.background.strokeOpacity = 0;
series1.tooltip.background.fillOpacity = 0;
chart.scrollbarY = new am4core.Scrollbar();

chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior="zoomY"
chart.cursor.lineY.disabled = true;
xAxis.cursorTooltipEnabled = false;
yAxis.cursorTooltipEnabled = false;



var listt=[];
status="active";
//single click on the plot
chart.events.on("hit", function(ev) {
	if (status=="active"){
 var ttr = Math.round((chart.cursor.point.x) * (series1.dataItems.values.length) / (series1.dataItems.last.point.x-series1.dataItems.first.point.x)) ;
 ttr-=2
 var pnt=series1.dataItems.values[ttr].dataContext.x ;
 listt.push(ttr);
  newpik=interpretIR_data(pnt);
  alert(newpik);
  document.getElementById('pik').value=document.getElementById('pik').value + "\r\n" + newpik;
	}
});



// Fix button click
document.getElementById("fixpeaks").onclick = function() {myFunction()};
function myFunction() {
	
    series1.tooltip.label.adapter.add("text",function(text,targett){
	if(targett.dataItem && listt.includes(targett.dataItem.index)) {
		return text;
	}
	else {
		return "";
	}
  });
alert("Press ok and wait a few seconds to show selected peaks on plot");
bullet1.showTooltipOn = "always";
  chart.scrollbarX = new am4core.Scrollbar();
  status="inactive";
  document.getElementById("fixpeaks").style.visibility = 'hidden';
}

//save as plot
chart.exporting.menu = new am4core.ExportMenu();
chart.exporting.menu.align = "left";
chart.exporting.menu.verticalAlign = "top";
chart.exporting.menu.items = [{
  "label": "...",
  "menu": [
    { "type": "png", "label": "PNG" },
    { "type": "csv", "label": "EXCEL" },
    { "label": "Print", "type": "print" }
  ]
}];

//chart.exporting.fileName="sdfgd";
//chart.exporting.export("png");
}); // end am4core.ready() 


function interpretIR_data(wave_number){
var k="";
// Carbonyl
  if (wave_number > 1600 & wave_number <1800) { 
  k=k+"(C=O stretching) "
};

// alkene
  if (wave_number > 1600 & wave_number <1650) { 
  k=k+"(C=C stretching) "
};

// acid halide
  if (wave_number > 1785 & wave_number <1815) { 
  k=k+"(acid_halide_C=O stretching) "
};

// alcohols
  if (wave_number > 3584 & wave_number <3700) { 
  k=k+"(alcohol_O-H stretching) "
};

// 
  if (wave_number > 3200 & wave_number <3550) { 
  k=k+"(alcohol_O-H stretching) "
};


// 
  if (wave_number > 1330 & wave_number <1420) { 
  k=k+"(O-C stretching) "
};

//aldehyde
  if (wave_number > 2695 & wave_number <2830) { 
  k=k+"(aldehyde_C-H stretching) "
};

// 
  if (wave_number > 1720 & wave_number <1740) { 
  k=k+"(C=O stretching) "
};

// aliphatic ether
  if (wave_number > 1085 & wave_number <1150) { 
  k=k+"(aliphatic_ether_C-O stretching) "
};

// aliphatic ketone
  if (wave_number > 1705 & wave_number <1725) { 
  k=k+"(aliphatic_ketone_C=O stretching) "
};

// aliphatic primary amine
  if (wave_number > 3300 & wave_number <3400) { 
  k=k+"(aliphatic_primary_amine_N-H stretching) "
};

// alkane 
  if (wave_number > 2840 & wave_number <3000) { 
  k=k+"(alkane_C-H stretching) "
};

// 
  if (wave_number == 1465) { 
  k=k+"(CH2 bending) "
};

// 
  if (wave_number == 1450) { 
  k=k+"(C-H bending) "
};

// 
  if (wave_number > 1380 & wave_number <1385) { 
  k=k+"(C-H bending) "
};

// 
  if (wave_number > 3000 & wave_number <3100) { 
  k=k+"(C-H stretching) "
};


//
  if (wave_number > 1668 & wave_number <1678) { 
  k=k+"(C=C stretching) "
};
// 
  if (wave_number > 1665 & wave_number <1675) { 
  k=k+"(C=C stretching) "
};

// 
  if (wave_number > 1626 & wave_number <1662) { 
  k=k+"(C=C stretching) "
};

// 
  if (wave_number > 1648 & wave_number <1658) { 
  k=k+"(C=C stretching) "
};

// 
  if (wave_number > 985 & wave_number <995) { 
  k=k+"(C=C bending) "
};

// 
  if (wave_number > 960 & wave_number <980) { 
  k=k+"(C=C bending) "
};

// 
  if (wave_number > 885 & wave_number <895) { 
  k=k+"(C=C bending) "
};

// 
  if (wave_number > 790 & wave_number <840) { 
  k=k+"(C=C bending) "
};

// 
  if (wave_number > 665 & wave_number <730) { 
  k=k+"(C=C bending) "
};

// alkyl aryl ether
  if (wave_number > 1200 & wave_number <1275) { 
  k=k+"(alkyl_aryl_ether_C-O stretching) "
};

// alkyne
  if (wave_number > 3267 & wave_number <3333) { 
  k=k+"(alkyne_C-H stretching) "
};

// 
  if (wave_number > 2100 & wave_number <2260) { 
  k=k+"(C≡C stretching) "
};


// allene
  if (wave_number > 1900 & wave_number <2000) { 
  k=k+"(C=C=C stretching) "
};

// amine
  if (wave_number > 1580 & wave_number <1650) { 
  k=k+"(N-H bending) "
};

// 
  if (wave_number > 1020 & wave_number <1250) { 
  k=k+"(C-N stretching) "
};

// amine salt
  if (wave_number > 2800 & wave_number <3000) { 
  k=k+"(amine_salt_N-H stretching) "
};

// anhydride
  if (wave_number == 1818) { 
  k=k+"(anhydride_C=O stretching) "
};

// 
  if (wave_number > 1040 & wave_number <1050) { 
  k=k+"(CO_O_CO stretching) "
};

//aromatic amine
  if (wave_number > 1266 & wave_number <1342) { 
  k=k+"(aromatic_amine_C-N stretching) "
};

// aromatic compound
  if (wave_number > 1650 & wave_number <2000) { 
  k=k+"(aromatic_overtone_C-H bending) "
};

// aromatic ester
  if (wave_number > 1250 & wave_number <1310) { 
  k=k+"(aromatic_ester_C-O stretching) "
};

// azide
  if (wave_number > 2120 & wave_number <2160) { 
  k=k+"(N=N=N stretching) "
};

// carbodiimide
  if (wave_number > 2120 & wave_number <2145) { 
  k=k+"(N=C=N stretching) "
};

// carboxylic acid
  if (wave_number > 2500 & wave_number <3300) { 
  k=k+"(Carboxylic_acid_O-H stretching) "
};


// 
  if (wave_number > 1706 & wave_number <1720) { 
  k=k+"(C=O stretching) "
};

// 
  if (wave_number > 1395 & wave_number <1440) { 
  k=k+"(O-H bending) "
};

// conjugated acid
  if (wave_number > 1680 & wave_number <1710) { 
  k=k+"(Conjugated_acid_C=O stretching) "
};


// conjugated acid halide
  if (wave_number > 1770 & wave_number <1800) { 
  k=k+"(Conjugated_acid_halide_C=O stretching) "
};


// conjugated aldehyde
  if (wave_number > 1685 & wave_number <1710) { 
  k=k+"(Conjugated_aldehyde_C=O stretching) "
};

// conjugated alkene
  if (wave_number > 1600 & wave_number <1650) { 
  k=k+"(Conjugated_alkene_C=C stretching) "
};

// conjugated ketone
  if (wave_number > 1666 & wave_number <1685) { 
  k=k+"(Conjugated_ketone_C=O stretching) "
};

// cyclic alkene
  if (wave_number > 1566 & wave_number <1650) { 
  k=k+"(Cyclic_alkene_C=C stretching) "
};

// ester
  if (wave_number > 1163 & wave_number <1210) { 
  k=k+"(Ester_C-O stretching) "
};

// esters
  if (wave_number > 1735 & wave_number <1750) { 
  k=k+"(Ester_C=O stretching) "
};

// fluoro compound
  if (wave_number > 1000 & wave_number <1400) { 
  k=k+"(C-F stretching) "
};


// halo compound
  if (wave_number > 550 & wave_number <850) { 
  k=k+"(C-Cl stretching) "
};



// halo compound
  if (wave_number > 515 & wave_number <690) { 
  k=k+"(C-Br stretching) "
};



// halo compound
  if (wave_number > 500 & wave_number <600) { 
  k=k+"(C-I stretching) "
};


// imine / oxime 
  if (wave_number > 1640 & wave_number <1690) { 
  k=k+"(imine_oxime_C=N stretching) "
};


// isocyanate
  if (wave_number > 2250 & wave_number <2275) { 
  k=k+"(N=C=O stretching) "
};


// isothiocyanate
  if (wave_number > 1990 & wave_number <2140) { 
  k=k+"(N=C=S stretching) "
};

// ketene
  if (wave_number == 2150 ) { 
  k=k+"(C=C=O stretching) "
};

// ketenimine
  if (wave_number == 2000 ) { 
  k=k+"(C=C=N stretching) "
};

// monosubstituted
  if (wave_number > 730 & wave_number <770) { 
  k=k+"(aromatic_mono_substituted_C-H bending ) "
};


// nitrile
  if (wave_number > 2223 & wave_number <2260) { 
  k=k+"(CΞN stretching ) "
};

// nitro compound
  if (wave_number > 1500 & wave_number <1550) { 
  k=k+"(nitro_N-O stretching) "
};

// phenol
  if (wave_number > 1310 & wave_number <1390) { 
  k=k+"(Phenol_O-H bending) "
};


// primary alcohol
  if (wave_number > 1050 & wave_number <1085) { 
  k=k+"(primary_alcohol_C-O stretching) "
};


// primary amide
  if (wave_number == 1690) { 
  k=k+"(primary_amide_C=O stretching) "
};


// 
  if (wave_number == 3500) { 
  k=k+"(N-H stretching) "
};



// secondary alcohol
  if (wave_number > 1087 & wave_number <1124) { 
  k=k+"(secondary_alcohol_C-O stretching) "
};




// secondary amide
  if (wave_number == 1680) { 
  k=k+"(secondary_amide_C=O stretching ) "
};


// secondary amine
  if (wave_number > 3310 & wave_number <3350) { 
  k=k+"(secondary_amine_N-H stretching ) "
};





// sulfate
  if (wave_number > 1380 & wave_number <1415) { 
  k=k+"(sulfate_S=O stretching) "
};


// sulfonamide
  if (wave_number > 1335 & wave_number <1370) { 
  k=k+"(sulfonamide_S=O stretching) "
};



// sulfonate
  if (wave_number > 1335 & wave_number <1372) { 
  k=k+"(sulfonate_S=O stretching) "
};



// sulfone
  if (wave_number > 1300 & wave_number <1350) { 
  k=k+"(sulfone_S=O stretching) "
};


// sulfonic acid 
  if (wave_number > 1342 & wave_number <1350) { 
  k=k+"(sulfonic_acid_S=O stretching) "
};


// sulfonyl chloride
  if (wave_number > 1380 & wave_number <1410) { 
  k=k+"(sulfonyl_chloride_S=O stretching) "
};


// sulfoxide
  if (wave_number > 1030 & wave_number <1070) { 
  k=k+"(sulfoxide_S=O stretching) "
};


// tertiary alcohol
  if (wave_number > 1124 & wave_number <1205) { 
  k=k+"(tertiray_aclcohol_C-O stretching) "
};


// tertiary amide
  if (wave_number == 1680 ) { 
  k=k+"(tertiary_amide_C=O stretching) "
};



// thiocyanate
  if (wave_number > 2140 & wave_number <2170 ) { 
  k=k+"(S-CΞN stretching) "
};





// thiol
  if (wave_number > 2550 & wave_number <2600) { 
  k=k+"(S-H stretching ) "
};


// vinyl / phenyl ester
  if (wave_number > 1770 & wave_number <1780) { 
  k=k+"(vinyl_phenyl_ester_C=O stretching ) "
};


// vinyl ether
  if (wave_number > 1200 & wave_number <1225) { 
  k=k+"(vinyl_ether_C-O stretching) "
};

// α,β-unsaturated ester
  if (wave_number > 1715 & wave_number <1730) { 
  k=k+"(Unsaturated_ester_C=O stretching) "
};


// α,β-unsaturated ketone
  if (wave_number > 1610 & wave_number <1620) { 
  k=k+"(Unstaturated_ketone_C=C stretching) "
};



// δ-lactone
  if (wave_number > 1735 & wave_number <1750) { 
  k=k+"(δ-lactone_C=O stretching) "
};


//1,2,3,4-tetrasubstituted



// 1,2,3-trisubstituted
  if (wave_number > 760 & wave_number <800) { 
  k=k+"(1,2,3-trisubstituted_C-H bending) "
};


// 
  if (wave_number > 860 & wave_number <900) { 
  k=k+"(C-H bending ) "
};


// 1,2-disubstituted
  if (wave_number > 735 & wave_number <775) { 
  k=k+"(1,2-disubstituted_C-H bending ) "
};


// 1,4-disubstituted
  if (wave_number > 790 & wave_number <830) { 
  k=k+"(1,4-disubstituted_C-H bending ) "
};
		
// put other IR groups bellow

return  Math.round(wave_number) + " (cm-1) : " + k ;	
};// end of ir_interpretation
} //end plot_landscpae

