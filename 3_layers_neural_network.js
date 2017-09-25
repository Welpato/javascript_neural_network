class NeuralNetwork{
  constructor(){
    this.synaptic_weights = this.randomSynaptic( 3, 5 )
    this.synaptic_weights2 = this.randomSynaptic( 5, 4 )
    this.synaptic_weights3 = this.randomSynaptic( 4, 1 )
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

  //this method need to be redone
  dot( inputs, weights ){
    var returnValue = []
    for( var weight in weights ){
      var i = 0
      for( var w in weights[ weight ] ){
        if(inputs[weight][w])
        if( returnValue[ weight ] != undefined ){
          returnValue[ weight ] = returnValue[ weight ] + ( inputs[ weight ][ w ] * weights[ w ] )
        }else{
          returnValue.push( inputs[ weight ][ w ] * weights[ w ] )
        }
        i++
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

      //var output = this.think( training_set_inputs )
      //var error = []
      //for( var io in output ){
      //  error[ io ] = ( training_set_outputs[ io ] - output[ io ] ) * this.sigmoid( output[ io ], true )
      //}
      //var adjustment = this.dot( training_set_inputs, error )
      console.log(this.synaptic_weights)
      var a2 = new Array()
      for( var sw in this.synaptic_weights ){
        a2.push(this.dot(training_set_inputs, this.synaptic_weights[sw]))
      }
      console.log(a2)

      //Adjust weights
      /*for( var ia in this.synaptic_weights ){
        for( var sw in this.synaptic_weights[ ia ] ){
            this.synaptic_weights[ ia ][ sw ] += adjustment[ ia ][ sw ]
        }
      }

      for( var ia in this.synaptic_weights2 ){
        for( var sw in this.synaptic_weights2[ ia ] ){
            this.synaptic_weights2[ ia ][ sw ] += adjustment2[ ia ][ sw ]
        }
      }

      for( var ia in this.synaptic_weights3 ){
        for( var sw in this.synaptic_weights3[ ia ] ){
            this.synaptic_weights3[ ia ][ sw ] += adjustment3[ ia ][ sw ]
        }
      }*/

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
neural_network.train( training_set_inputs, training_set_outputs, 1 )
document.write( neural_network.synaptic_weights )
document.write( "<br>" )
document.write( "Result: " )
document.write( neural_network.think( new_situation ) )
