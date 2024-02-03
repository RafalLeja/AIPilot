export class UI{
  constructor(fleet){
    this.fleet = fleet;

    this.active = true;
    this.init();
    
    // this.canvas = document.querySelector('#UI');
    // this.ctx = this.canvas.getContext('2d');
    // this.canvas.width = window.innerWidth*0.4;
    // this.canvas.height = window.innerHeight;
    // this.network = spaceship.network;
    // this.width = this.canvas.width;
    // this.height = this.canvas.height;
    // this.layerHeight = this.height / this.network.layers.length;
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

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next iteration';
    nextButton.style.position = 'absolute';
    nextButton.style.top = '10px';
    nextButton.style.left = '100px';
    nextButton.style.zIndex = '100';
    nextButton.onclick = () => {
      this.fleet.next();
    }

    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.style.position = 'absolute';
    resetButton.style.top = '10px';
    resetButton.style.left = '200px';
    resetButton.style.zIndex = '100';
    resetButton.onclick = () => {
      this.fleet.hardReset();
    }

    document.body.appendChild(button);
    document.body.appendChild(nextButton);
    document.body.appendChild(resetButton);

  }

  // update(){
  //   if (!this.active) return;
  //   for (let i = 0; i < this.network.layers.length; i++) {
  //     this.drawLayer(i);
  //   }
  // }

  // drawLayer(layerIndex){
  //   const input = this.network.layers[layerIndex].input;
  //   const output = this.network.layers[layerIndex].output;
  //   const weights = this.network.layers[layerIndex].weights;
  //   const biases = this.network.layers[layerIndex].biases;

  //   // draw input only for the first layer
  //   if (layerIndex === 0){
  //     const neuronWidth = 10;
  //     for (let i = 0; i < input.length; i++) {
  //       this.ctx.beginPath();
  //       this.ctx.arc(i*3*neuronWidth + neuronWidth, this.height - layerIndex*this.layerHeight, neuronWidth, 0, 2 * Math.PI);
  //       this.ctx.fillStyle = `rgba(252, 186, 3, 1)`;
  //       // this.ctx.fillStyle = `rgba(255, 255, 255, ${input[i]})`;
  //       this.ctx.fill();
  //     }
  //   }
  // } 
}