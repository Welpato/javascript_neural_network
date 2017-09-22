class NeuralNetwork{
  constructor(){
    this.synaptic_weights = this.randomSynaptic( 3, 1 )
  }

  randomSynaptic( synapsesTot, axon ) {
    var randomSynaptic = new Array()
    var control = 0
    var arrAxon = new Array()
    while( control < synapsesTot ){
      var c = 0
      arrAxon = new Array()
      while( c < axon ){
        arrAxon.push( 2 * Math.random() - 1 )
        c++
      }
      randomSynaptic.push( arrAxon )
      control++
    }
    return randomSynaptic
  }

  sigmoid( x, derivate = false ){
    if( derivate == true ){
      return x * ( 1 - x )
    }
    return 1 / ( 1 + Math.pow( 2.718281, -x ) ) //Calculating the exponential with Euller's Number
  }

  dot( inputs, weights ){
    var returnValue = []
    for( var input in inputs ){
      for( var inpVal in inputs[ input ] ){
        if( returnValue[ input ] != undefined ){
          returnValue[ input ] = returnValue[ input ] + ( inputs[ input ][ inpVal ] * weights[ inpVal ] )
        }else{
          returnValue.push( inputs[ input ][ inpVal ] * weights[ inpVal ] )
        }
      }
    }
    return returnValue
  }

  think( inputs ){
    var output = this.dot( inputs, this.synaptic_weights )
    for( var i in output ){
      output[ i ] = this.sigmoid( output[ i ] )
    }
    return output
  }

  train( training_set_inputs, training_set_outputs, number_of_iterations ){
    var i = 0
    while ( i < number_of_iterations ){
      var output = this.think( training_set_inputs )
      var error = []
      for( var io in output ){
        error[ io ] = ( training_set_outputs[ io ] - output[ io ] ) * this.sigmoid( output[ io ], true )
      }
      var adjustment = this.dot( training_set_inputs, error )

      for( var ia in this.synaptic_weights ){
        this.synaptic_weights[ ia ] += adjustment[ ia ]
      }
      i++
    }
  }
}

var training_set_inputs = [ [ 0,0,1 ], [ 1,1,1 ],[ 1,0,1 ],[ 0,1,1 ] ]
var training_set_outputs = [ 0,1,1,0 ]

var new_situation = [ [ 1,0,0 ] ]

var neural_network = new NeuralNetwork()

document.write( "Old weights <br>")
document.write( neural_network.synaptic_weights )
document.write( "<br>" )
document.write( "New weights <br>" )
neural_network.train( training_set_inputs, training_set_outputs, 10000 )
document.write( neural_network.synaptic_weights )
document.write( "<br>" )
document.write( "Result: " )
document.write( neural_network.think( new_situation ) )
