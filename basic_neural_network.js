class NeuralNetwork{
  constructor( synapsesTot = 3){
    this.synaptic_weights = this.randomSynaptic( synapsesTot )
    //this.synaptic_weights = [8,9,10]
  }

  randomSynaptic( synapsesTot ) {
    var randomSynaptic = []
    var control = 0
    while( control < synapsesTot ){
      randomSynaptic.push( 2 * Math.random() - 1 )
      control++
    }
    return randomSynaptic
  }

  sigmoid( x, derivate = false ){
    if( derivate == true ){
      return x * ( 1 - x )
    }
    return 1 / ( 1 + Math.pow( -x ) )
  }

  dot( inputs ){
    var returnValue = []
    for( var input in inputs ){
      for( var inpVal in inputs[ input ] ){
        if( returnValue[ input ] != undefined ){
          returnValue[ input ] = returnValue[ input ] + ( inputs[ input ][ inpVal ] * this.synaptic_weights[ inpVal ] )
        }else{
          returnValue.push( inputs[ input ][ inpVal ] * this.synaptic_weights[ inpVal ] )
        }
      }
    }
    return returnValue
  }

  think(inputs){
    //return this.sigmoid(this.dot(inputs)
    return this.dot(inputs)
  }

  train( training_set_inputs, training_set_outputs, number_of_iterations ){
    var i = 0
    while ( i < number_of_iterations){
      var output = this.think( training_set_inputs )
      console.log(output)
      i++
    }
  }
}

var training_set_inputs = [ [ 0,0,1 ], [ 1,1,1 ],[ 1,0,1 ],[ 0,1,1 ] ]
var training_set_outputs = [ [ 0,1,1,0 ] ]

var new_situation = [ 1,0,0 ]

var neural_network = new NeuralNetwork()

document.write( neural_network.train( training_set_inputs, training_set_outputs, 10 ) )
//document.write( "<br>" )
//document.write( neural_network.think( new_situation ) )
