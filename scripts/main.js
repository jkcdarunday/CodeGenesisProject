require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene"
    }
});

define(["KObject", "KThread", "KCanvas", "KScene", "KImage", "KBase"],function(KObject, KThread, KCanvas, KScene, KImage, K){
    var m = new KThread(function(){
            this.docbody[0].innerHTML += "Test";
        },
        1000
    );
    m.docbody = K("body");
//     m.start();

    var cc = new KCanvas('#leCanvas', true);
    var cs = new KScene();
    var heximg = new KImage('hexagon');
    heximg.set({
        type: 'NORMAL',
        size:{x:100,y:115},
        position:{
            image:{x:0,y:0},
        },
        fade:{
            type:'EASE',
            interval:2
        },
        opacity:0.4,
        animation:{
            type:'EASE',
            interval:8
        }
    });
    KObject.connect(cs, 'update', heximg, 'update');
    KObject.connect(cs, 'draw', heximg, 'draw');
    cs.setBackground('fadeBG');
    cc.scene = cs;
    cc.start();
    cc.windowSet(window);
    var Positioner = KObject.extend({
        init:function(){
            this.count=0;
        },
        slots:{
            move:function(){
                if(this.count % 4 == 0) this.kimage.setTargetPosition(400,400);
                if(this.count % 4 == 1) this.kimage.setTargetPosition(400,100);
                if(this.count % 4 == 2) this.kimage.setTargetPosition(100,400);
                if(this.count % 4 == 3) this.kimage.setTargetPosition(100,100);
                this.count++;
            }
        }
    });
    var p = new Positioner();
    p.kimage = heximg;
    KObject.connect(heximg, "inPosition", p, "move");
    heximg.setTargetPosition(10,10);
});
