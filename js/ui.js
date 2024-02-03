export class UI{
  constructor(spaceship){
    this.spaceship = spaceship;
    this.network = spaceship.network;
    this.active = true;
    this.canvas = document.querySelector('#UI');
    this.canvas.width = window.innerWidth*0.4;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.init();

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.layerHeight = this.height / this.network.layers.length;
  }

  init(){
    const button = document.createElement('button');
    button.innerHTML = 'Show UI';
    button.style.position = 'absolute';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.zIndex = '100';
    button.onclick = () => {
      this.active = !this.active;
      if (this.active){
        document.querySelector('#UI').className = 'UI_active';
      }else{
        console.log('UI inactive');
        document.querySelector('#UI').className = 'UI_inactive';
      }
    }
    document.body.appendChild(button);

  }

  update(){
    if (!this.active) return;
    for (let i = 0; i < this.network.layers.length; i++) {
      this.drawLayer(i);
    }
  }

  drawLayer(layerIndex){
    const input = this.network.layers[layerIndex].input;
    const output = this.network.layers[layerIndex].output;
    const weights = this.network.layers[layerIndex].weights;
    const biases = this.network.layers[layerIndex].biases;

    // draw input only for the first layer
    if (layerIndex === 0){
      const neuronWidth = 10;
      for (let i = 0; i < input.length; i++) {
        this.ctx.beginPath();
        this.ctx.arc(i*3*neuronWidth + neuronWidth, this.height - layerIndex*this.layerHeight, neuronWidth, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(252, 186, 3, 1)`;
        // this.ctx.fillStyle = `rgba(255, 255, 255, ${input[i]})`;
        this.ctx.fill();
      }
    }
  } 
}