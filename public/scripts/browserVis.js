let browsersData=[	
					{brw:'iPhone 7',sessions:1088, bounceRate:52.80},
					{brw:'iPhone X',sessions:200, bounceRate:47.54}, 
					{brw:'Pixel 3',sessions:2500, bounceRate:47.54},
					{brw:'Chrome',sessions:2005, bounceRate:47.54},
					{brw:'Safari',sessions:1555, bounceRate:47.54},
					{brw:'Firefox',sessions:1600, bounceRate:47.54},
					{brw:'Opera',sessions:1800, bounceRate:47.54}

				];

var ctx = document.getElementById('myChart3').getContext('2d');

var browserChart= new Chart(ctx, {
    type: 'polarArea',
    data : {
	    datasets: [{
	    	label:'session',
	        data: [ browsersData[0].sessions, browsersData[1].sessions, browsersData[2].sessions, browsersData[3].sessions, browsersData[4].sessions, browsersData[5].sessions, browsersData[6].sessions ],
	        backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor:'rgba(164, 8, 8, 0.2)'
	    }],

	    // These labels appear in the legend and in the tooltips when hovering different arcs
	    labels: [
	       browsersData[0].brw + ' (bounce rate : ' + browsersData[0].bounceRate + ')', 
	       browsersData[1].brw + ' (bounce rate : ' + browsersData[1].bounceRate + ')',
	       browsersData[2].brw + ' (bounce rate : ' + browsersData[2].bounceRate + ')',
	       browsersData[3].brw + ' (bounce rate : ' + browsersData[3].bounceRate + ')',
	       browsersData[4].brw + ' (bounce rate : ' + browsersData[4].bounceRate + ')',
	       browsersData[5].brw + ' (bounce rate : ' + browsersData[5].bounceRate + ')',
	       browsersData[6].brw + ' (bounce rate : ' + browsersData[6].bounceRate + ')'
	    ]
	},
 
    options: {
    	title: {
            display: true,
            text: 'Browser sessions'
        },
        legend:{
            position:'right',
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});