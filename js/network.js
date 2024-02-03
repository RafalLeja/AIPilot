export class Network{
  constructor(layerSizes){
    this.layers = [];
    for (let i = 0; i < layerSizes.length-1; i++) {
      if (i == layerSizes.length-2){
        this.layers.push(new Layer(layerSizes[i], layerSizes[i+1], true));
      }else{
      this.layers.push(new Layer(layerSizes[i], layerSizes[i+1]));
      }
    }
  }

  feedForward(input){
    let output = input;
    for (let i = 0; i < this.layers.length; i++) {
      output = this.layers[i].feedForward(output);
    }
    return output;
  }

  mutate(model, rate=1){
    this.layers = model.layers;
    for (let i = 0; i < model.layers.length; i++) {
      for (let j = 0; j < model.layers[i].outputSize; j++) {
        this.layers[i].biases[j] += Math.random()*rate*2-rate;
        for (let k = 0; k < model.layers[i].inputSize; k++) {
          this.layers[i].weights[j][k] += Math.random()*rate*2-rate;
        }
      }
    }
  }

  reset(){
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].init();
    }
  }
}

export class Layer{
  constructor(inputSize, outputSize, binary = false){
    this.binary = binary;
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.input = Array(inputSize);
    this.output = Array(outputSize);
    this.biases = Array(outputSize);
    this.weights = Array(outputSize).fill().map(() => Array(inputSize));

    this.init();
  }

  init(){
    for (let i = 0; i < this.outputSize; i++) {
      this.biases[i] = Math.random()*2-1;
      for (let j = 0; j < this.inputSize; j++) {
        this.weights[i][j] = Math.random()*2-1;
      }
    }
  }

  feedForward(input){
    this.input = input;
    for (let i = 0; i < this.outputSize; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputSize; j++) {
        sum += this.weights[i][j] * input[j];
      }
      if (this.binary) {
        this.output[i] = sum + this.biases[i] > 0 ? 1 : 0;
      }else{
        this.output[i] = this.sigmoid(sum + this.biases[i]);
      }
    }
    return this.output;
  }

  sigmoid(x){
    return 1/(1+Math.exp(-x));
  }
}