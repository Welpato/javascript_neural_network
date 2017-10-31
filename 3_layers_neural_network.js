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
      for ( var x in values[ i ]){
        values[ i ][ x ] =  this.sigmoid( values[ i ][ x ], derivate )
      }
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
    output = this.sigmoid( output )
    return output
  }

  transform( array ){
    var result = new Array()
    var x = 0
    while( x < array[0].length ){
      result.push( new Array() )
      var y = 0
      while( y < array.length ){
        result[ x ].push( array[ y ][ x ] )
        y++
      }
      x++
    }
    return result
  }

  adjust( adjust, weight ){
    for( var x in adjust ){
      for( var y in adjust[ x ] ){
        weight[ x ][ y ] += adjust[ x ][ y ]
      }
    }
    return weight
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

      var del4 = new Array()
      for( var x in output ){
        del4[ x ] = [( training_set_outputs[ x ] - output[ x ] ) * this.sigmoid( output[ x ], true )]
      }

      var del3 = this.dot( this.synaptic_weights3, this.transform( del4 ) )
      var sigA3 = this.transform( this.arraySigmoid( a3, true ) )
      for( var x in del3 ){
        for( var y in del3[ x ] ){
          del3[ x ][ y ] = del3[ x ][ y ] * sigA3[ x ][ y ]
        }
      }

      var del2 = this.dot( this.synaptic_weights2, del3 )
      var sigA2 = this.transform( this.arraySigmoid( a2, true ) )
      for( var x in del2 ){
        for ( var y in del2 ){
          del2[ x ][ y ] = del2[ x ][ y ] * sigA2[ x ][ y ]
        }
      }

      var adjustment3 = this.dot( this.transform( a3 ), del4 )
      var adjustment2 = this.dot( this.transform( a2 ), this.transform( del3 ) )
      var adjustment1 = this.dot( this.transform(  training_set_inputs ), this.transform( del2 ) )

      this.synaptic_weights = this.adjust( adjustment1, this.synaptic_weights )
      this.synaptic_weights2 = this.adjust( adjustment2, this.synaptic_weights2 )
      this.synaptic_weights3 = this.adjust( adjustment3, this.synaptic_weights3 )

      i++
    }
  }
}

var training_set_inputs = [ [ 0,0,1 ], [ 1,1,1 ],[ 1,0,1 ],[ 0,1,1 ] ]
var training_set_outputs = [ 0,1,1,0 ]

var new_situation = [ [ 0,1,1 ] ]

var neural_network = new NeuralNetwork()
document.write( "Old weights <br>")
document.write( neural_network.synaptic_weights )
document.write( "<br>" )
document.write( "New weights <br>" )
neural_network.train( training_set_inputs, training_set_outputs, 10000 )
document.write( neural_network.synaptic_weights )
document.write( "<br>" )
document.write( "<br>" )
document.write( "New situation: " )
document.write( new_situation )
document.write( "<br>" )
document.write( "Result: " )
document.write( neural_network.think( new_situation ) )
