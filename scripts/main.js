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
    heximg.setType('NORMAL');
    heximg.setSize(100, 115);
    heximg.setImagePosition(0,0);
    heximg.setCanvasPosition(0,0);
    heximg.set({
        type: 'NORMAL',
        size:{x:100,y:115},
        position:{
            image:{x:0,y:0},
        },
        opacity:0.7,
        animation:{
            type:'EASE',
            interval:8
        }
    });
    var heximg2 = new KImage('hexagon');
    heximg2.setType('NORMAL');
    heximg2.setSize(100, 115);
    heximg2.setImagePosition(0,0);
    heximg2.setCanvasPosition(0,0);
    KObject.connect(cs, 'update', heximg, 'update');
    KObject.connect(cs, 'draw', heximg, 'draw');
    KObject.connect(cs, 'update', heximg2, 'update');
    KObject.connect(cs, 'draw', heximg2, 'draw');
    cc.scene = cs;
    cc.setFrameRate(60);
    cc.start();
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
