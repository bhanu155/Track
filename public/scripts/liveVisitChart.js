	
	let domesticUsers=1230
	let internationalUsers=580

	let domPer= Number( ((domesticUsers/(domesticUsers+internationalUsers)) * 100).toPrecision(2) );
	let intPer= Number( ((internationalUsers/(domesticUsers+internationalUsers)) * 100).toPrecision(2) );
	

	var ctx = document.getElementById('myChart2').getContext('2d');
	
	

	var myDoughnutChart = new Chart(ctx, {
		type: 'doughnut',
		data: {

			datasets: [{

				data: [domesticUsers, internationalUsers],
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)'

				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)'
				],
				borderWidth: 1
			}],
			labels: ['Domestic : ' + domPer + '%', 'International : ' + intPer + '%']
		},
		 options: {

			title: {
				display: true,
				text: 'Live Audience'
			},
			legend:{
				position:'right'
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



// console.log(myDoughnutChart.data.datasets[0].data[0])