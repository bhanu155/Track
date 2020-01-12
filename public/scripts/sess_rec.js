
let vdo=document.querySelector("#video_source");

let sourceList=document.querySelectorAll("li");

sourceList.forEach(function(item){
	item.addEventListener("click",function(){
		
		vdo.src=item.textContent;
		console.log(vdo.src);
		
	});
});

