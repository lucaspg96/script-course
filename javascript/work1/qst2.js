class Figura {
	constructor(){}

	perimetro(){return undefined;}

	area(){return undefined;}
}

class Retangulo extends Figura{
	constructor(h,l){
		super();
		this.l = l;
		this.h = h
	}

	perimetro(){return (this.l+this.h)*2;}

	area(){return this.l*this.h;}
}

class Quadrado extends Retangulo{
	constructor(l){
		super(l,l);
	}
}

var figura = new Figura()
console.log("Perimetro: "+figura.perimetro())
console.log("Area: "+figura.area())

figura = new Retangulo(2,5)
console.log("Perimetro: "+figura.perimetro())
console.log("Area: "+figura.area())

figura = new Quadrado(4)
console.log("Perimetro: "+figura.perimetro())
console.log("Area: "+figura.area())