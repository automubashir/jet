var jet = document.querySelector("jet");
var missile = document.querySelector("missile");
var obstacle = document.querySelector("obstacle");
var speed = 1; // 01 - 10

window.addEventListener('mousemove',(e)=>{
if(e.pageX<window.innerWidth-10 && e.pageX>jet.clientWidth/2) {
	jet.setAttribute("style","left: "+e.pageX+"px;");
}
})

window.addEventListener('click',(e)=>{
	let el = missile.cloneNode(true);
	el.classList.remove("hidden");
	let l = jet.getBoundingClientRect().x + (jet.clientWidth/2);
	let t = (window.innerHeight-jet.getBoundingClientRect().y);
	el.setAttribute("style","left:"+l+"px;bottom: "+t+"px");
	document.body.appendChild(el);
	simulateMissile(el,l,t);
})

function simulateMissile(el,l,t) {
	let i = 0;
	let x = setInterval(()=>{
		i++;
		el.setAttribute("style","left:"+(l)+"px;bottom: "+(t+i)+"px");
		let collider = getCollider(el);
		if(collider) {
			collider.classList.add("destroyed");
			setTimeout(()=>{
				collider.remove();
			},500)
		}
		if(el.offsetTop<0 || collider) {
			clearInterval(x);
			el.remove();
		}
	},5)
}

function getCollider(target,obstacle="obstacle") {
	let obs = document.querySelectorAll(obstacle);
	let collider = null;
	obs.forEach(x=>{
		let a_dim = target.getBoundingClientRect();
		let b_dim = x.getBoundingClientRect();
		if((a_dim.x<=b_dim.x+b_dim.width) && (a_dim.x+a_dim.width>=b_dim.x)
			&& (a_dim.y<=b_dim.y+b_dim.height) && (a_dim.y+a_dim.height>=b_dim.y)) {
				collider = x;
			}
	})
	return collider;
}

function dropObstacle() {
	let x = Math.random() * (window.innerWidth - obstacle.clientWidth);
	let obs = obstacle.cloneNode(true);
	obs.classList.remove('hidden');
	obs.setAttribute("style","left:"+x+"px;");
	document.body.appendChild(obs);
	setTimeout(()=>{
		if(obs) {
			obs.remove();
		}
	},10000)
}

function startGame() {
	let startTime = Date.now();
	dropObstacle();
	setInterval(()=>{
		let elapsed = Date.now() - startTime;
		if(elapsed>=1000) { //1 minute
			startTime = Date.now();
			dropObstacle();
		}
	},0/(speed))
}

startGame();