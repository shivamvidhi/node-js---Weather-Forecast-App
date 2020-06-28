
		// for World Wide


		function myFunction() {
		  var input, filter, table, tr, td, i, txtValue;
		  input = document.getElementById("myInput");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("myTable");
		  tr = table.getElementsByTagName("tr");
		  for (i = 0; i < tr.length; i++)
		   {
		    	td = tr[i].getElementsByTagName("td")[0];
		    	if (td) 
		    	{
		      		txtValue = td.textContent || td.innerText;
		      		if (txtValue.toUpperCase().indexOf(filter) > -1) 
		      		{
		        		tr[i].style.display = "";
		      		}
		      		else
		      		{
		        		tr[i].style.display = "none";
		     	 	}
		    	}       
		  	}
		}

		function dateConvert(date1)
		{
			const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];




			var date = new Date(date1);
		    var yearName = date.getFullYear();
		    var dateName = date.getDate();
		    var dayIndex = date.getDay();
		    var dayName = days[dayIndex];
		    var monthIndex = date.getMonth();
		    var monthName = months[monthIndex];

		    var hourName = date.getHours();
		    var time = "am";
		    if(hourName>12)
		    {
		    	hourName = hourName - 12;
		    	time = "pm";
		    }
		    var minName = date.getMinutes();
		    if(hourName === 12)
		    {
		    	time = "pm";
		    }

		    if(minName<=9)
		    {
                if(hourName === 0) var formatted = `12:0${minName}${time} on ${dayName}, ${dateName} ${monthName} ${yearName}`;
		    	var formatted = `${hourName}:0${minName}${time} on ${dayName}, ${dateName} ${monthName} ${yearName}`;
		    }
		    else{
                if(hourName === 0) var formatted = `12:0${minName}${time} on ${dayName}, ${dateName} ${monthName} ${yearName}`;
		    	var formatted = `${hourName}:${minName}${time} on ${dayName}, ${dateName} ${monthName} ${yearName}`;
		    }

		    console.log(formatted);
		    return formatted;
		}





		loadData2();
		function loadData2()
		{
			fetch('https://api.covid19api.com/summary',
			{
				mode : 'cors',
				method : 'GET'
			}).then(response => {
				console.log(response);
				if(response.ok)
				{
					response.json().then(json =>{
						console.log(json);



						// setting updated date
						var id = document.getElementById('updatedTime');
						var text = document.createTextNode(dateConvert(json.Date)+" *");
						id.appendChild(text);



						// creating global analyses table

						var table = document.getElementById("myTable2");
						var tableBody = document.createElement('TBODY');
	             		table.appendChild(tableBody);

	             		var tr = document.createElement('TR');
			            tableBody.appendChild(tr);


			            var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.TotalConfirmed));
			            tr.appendChild(td);

			            
		                var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.TotalRecovered));
		                tr.appendChild(td);



		                 var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.TotalDeaths));
		                tr.appendChild(td);


		                var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.NewConfirmed+"	"));
			            if(json.Global.NewConfirmed>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
		                tr.appendChild(td);



		                var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.NewRecovered +"	"));
			            if(json.Global.NewRecovered>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
		                tr.appendChild(td);


		                var td = document.createElement('TD');
			            td.appendChild(document.createTextNode(json.Global.NewDeaths+"	"));
			            if(json.Global.NewDeaths>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
		                tr.appendChild(td);









		                // Now the below part will display the data of respective countries.

		                var list = json.Countries;
						console.log(list);

						list.sort((a,b) => a.TotalConfirmed < b.TotalConfirmed ?1 :(a.TotalConfirmed===b.TotalConfirmed)?((a.Country > b.Country)?1 :-1):-1); 
						console.log(list);

						var length = json.Countries.length;
						console.log(length);
						
						// creating arrays to store data of particular field.
						var country =[];
						var infected=[];
						var still = [];
						var deaths = [];
						var recovered = [];
						var newConfirmed = [];
						var newRecovered = [];
						var newDeaths = [];

						// inserting values into data.
						for(var i =0; i<length;i++)
						{
							country[i] = json.Countries[i].Country;
							infected[i] = json.Countries[i].TotalConfirmed;
							still[i] = json.Countries[i].TotalConfirmed - (json.Countries[i].TotalDeaths + json.Countries[i].TotalRecovered);
							deaths[i] = json.Countries[i].TotalDeaths;
							recovered[i] = json.Countries[i].TotalRecovered;
							newConfirmed[i] = json.Countries[i].NewConfirmed;
							newRecovered[i] = json.Countries[i].NewRecovered;
							newDeaths[i] = json.Countries[i].NewDeaths;
						}

						console.log(country);
						console.log(infected);
						console.log(deaths);
						console.log(recovered);


						var table = document.getElementById("myTable");
						var tableBody = document.createElement('TBODY');
	             		table.appendChild(tableBody);

	             		for (var i=0; i<length; i++)
			              {
			                var tr = document.createElement('TR');
			                tableBody.appendChild(tr);

			                // column 1 for country

			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode((i+1)+".	"+country[i]));
			                tr.appendChild(td);


			                // column 2 for Infected
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(infected[i]));
			                tr.appendChild(td);



			                // column 3 for Still Infected
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(still[i]));
			                tr.appendChild(td);



			                // column 4 for recovered
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(recovered[i]));
			                tr.appendChild(td);


			                // column 5 for deaths
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(deaths[i]));
			                tr.appendChild(td);


			                // column 6 for new confirmed
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(newConfirmed[i]+"	"));
			                if(newConfirmed[i]>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
			                tr.appendChild(td);



			                // column 7 for new recovered
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(newRecovered[i]+"	"));
			                 if(newRecovered[i]>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
			                tr.appendChild(td);




			                // column 8 for new deaths
			                var td = document.createElement('TD');
			                td.appendChild(document.createTextNode(newDeaths[i]+"	"));
			                 if(newDeaths[i]>0)
			                {
			                	var img = document.createElement("img");
			                	img.src = "https://media.giphy.com/media/3kIHVWHOIHi3ZqidmC/giphy.gif";
			                	img.width = 18;
			                	img.height = 18;
			                	td.appendChild(img);
			                }
			                tr.appendChild(td);
			            }
			        });
				}
			});
		}
	