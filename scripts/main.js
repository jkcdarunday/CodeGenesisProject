require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene",
        "KSmoothVariable": "KObject/KSmoothVariable",
        "KKeyboard": "KObject/KKeyboard"
    }
});

define(["KObject", "KThread", "KCanvas", "KScene", "KKeyboard", "KImage", "KBase"],function(KObject, KThread, KCanvas, KScene, KKeyboard, KImage, K){

    var cc = new KCanvas('#leCanvas');
    var cs = new KScene();

    var hexRotator = new KThread(function(){
        for(var i = -1; i < 2; i++){
            if(this.count%3-1 == i)
                this.hexes[i].set({opacity:1.0});
            else
                this.hexes[i].set({opacity:0.5});
        }
    }, 1000);
    hexRotator.hexes = {};
    hexRotator.count = 1000;
    for(var i = -1; i < 2; i++){
        hexRotator.hexes[i] = new KImage('hexagon');
        hexRotator.hexes[i].set({
            opacity:0.5,
            canvas:{
                attachment:'CENTER',
                tolerance:2,
                position:{
                    type:'EASE',
                    interval:10,
                    x:window.innerWidth/2+i*120,
                    y:window.innerHeight/2
                }
            },
            fade:{
                type:'EASE',
                interval:32,
                tolerance:0.01
            }
        });
        cs.addImage(hexRotator.hexes[i]);
    }
    hexRotator.slots = {
        start:hexRotator.start,
        move:function(key){
            console.log(key);
            if(key==37)
                this.count--;
            if(key==39)
                this.count++;
            this.run();
        }
    };
    hexRotator.run();
    var m = new KKeyboard(document.body, true);
    KObject.connect(m, 'keyDown', hexRotator, 'move');
    //KObject.connect(hexRotator.hexes[1], 'inPosition', hexRotator, 'start');

    cs.setBackground('fadeBG');
    cc.scene = cs;
    cc.start();
    cc.windowSet(window);
});
