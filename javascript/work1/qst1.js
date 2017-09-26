class Sorter{
	constructor(){}

	sort(list,reverse=false){
		return reverse ? list.sort().reverse() : list.sort();
	}
}

var sorter = new Sorter();

console.log(sorter.sort([1,5,0,-3],true))