class NeuralNetwork{
  constructor(){
    this.synaptic_weights = this.randomSynaptic( 3, 5 )
    this.synaptic_weights2 = this.randomSynaptic( 5, 4 )
    this.synaptic_weights3 = this.randomSynaptic( 4, 1 )
  }

  randomSynaptic( synapsesTot, axon ) {
    var randomSynaptic = []
    var control = 0
    var arrAxon = []
    while( control < synapsesTot ){
      var c = 0
      arrAxon = []
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

  arraySigmoid( values, derivate = false){
    for ( var i in values ){
      for ( var x in values[ i ]){}
        values[ i ][ x ] =  this.sigmoid( values[ i ][ x ], derivate )
    }
    return values
  }


  dot( inputs, weights ){
    var returnValue = new Array()
    for( var input in inputs ){
      returnValue.push( new Array() )
      for( var vInput in inputs[ input ] )  {
        for( var vWeight in weights[ vInput ] ){
          if( returnValue[ input ][ vWeight ] == undefined ){
            returnValue[ input ].push( inputs[ input ][ vInput ] * weights[ vInput ][ vWeight ] )
          }else{
            returnValue[ input ][ vWeight ] += inputs[ input ][ vInput ] * weights[ vInput ][ vWeight ]
          }
        }
      }
    }
    return returnValue
  }

  think( inputs ){
    var a2 = this.dot( inputs, this.synaptic_weights )
    a2 = this.arraySigmoid( a2 )

    var a3 = this.dot( a2, this.synaptic_weights2 )
    a3 = this.arraySigmoid( a3 )

    var output = this.dot( a3, this.synaptic_weights3 )
    output = this.arraySigmoid( output )

    return output
  }

  train( training_set_inputs, training_set_outputs, number_of_iterations ){
    var i = 0
    while ( i < number_of_iterations ){

      var a2 = this.dot( training_set_inputs, this.synaptic_weights )
      a2 = this.arraySigmoid( a2 )

      var a3 = this.dot( a2, this.synaptic_weights2 )
      a3 = this.arraySigmoid( a3 )

      var output = this.dot( a3, this.synaptic_weights3 )
      output = this.arraySigmoid( output )

      var error4 = new Array()
      for( var x in output ){
        error4[ x ] = ( training_set_outputs[ x ] - output[ x ] ) * this.sigmoid( output[ x ], true )
      }
      console.log(error4)
      //The rest of this function need to be redone

      var error3 = this.dot( this.synaptic_weights3, error4 ) //This need to be right
      console.log(error3)

      i++
    }
  }
}

var training_set_inputs = [ [ 0,0,1 ], [ 1,1,1 ],[ 1,0,1 ],[ 0,1,1 ] ]
var training_set_outputs = [ 0,1,1,0 ]

var new_situation = [ [ 1,0,0 ] ]

var neural_network = new NeuralNetwork()

neural_network.train( training_set_inputs, training_set_outputs, 1 )
console.log( "Result: " )
//console.log( neural_network.think( new_situation ) )
