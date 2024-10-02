const Motor=Matter.Engine,
      Mundo=Matter.World,
      Corpos=Matter.Bodies,
      Corpo=Matter.Bodie;
var motor,mundo
var plataformas = [] 
var jogador

function setup() {
  createCanvas(windowWidth,windowHeight)
  motor=Motor.create ()
  mundo=motor.world 
  plataformas.push(new Plataforma (400,height-300,100,25)) // Serve pra puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (60,height-200,100,20)) // Serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (600,height-400,100,20))
  jogador=new Player (60,200,15,10);
}

function draw() {

  background ("black")
  Motor.update (motor)
  jogador.aparecer ();
  for (var plataforma of plataformas){
    plataforma.mostrar () // Serve para mostrar a plataforma do outro grupo
    if (tocando_plataforma(jogador,plataforma)) {
      jogador.resetar_pulos ()
    }
  }
  
}

function windowResized () {

    resizeCanvas (windowWidth,windowHeight) // signficia a tela inteira

}

function keyPressed () {
  if (keyCode===RIGHT_ARROW){
    jogador.mover(0.005)
  }
  if (keyCode===LEFT_ARROW){
    jogador.mover(-0.005)
  }
  if (keyCode===32){
    jogador.pular()
  }
}

function tocando_plataforma (jogador,plataforma) {

  const posicao_jogador=jogador.corpo.position
  const posicao_plataforma=plataforma.corpo.position
  const tocando=posicao_jogador.y+jogador.altura/2>=posicao_plataforma.y-plataforma.altura/2&&
  posicao_jogador.x+jogador.altura/2>=posicao_plataforma.x-plataforma.largura/2&&
  posicao_jogador.x-jogador.largura/2<=posicao_plataforma.x+plataforma.largura/2;

  return tocando 
  
}